#!/usr/bin/env node

/**
 * Bundle Size Analysis Script
 * Parses Next.js build output and analyzes route First Load JS against budgets.
 * Usage: node scripts/bundle-budgets.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const ARTIFACTS_DIR = join(PROJECT_ROOT, 'artifacts');

// Bundle size thresholds (in bytes) — compared to Next "First Load JS" per route
const BUNDLE_BUDGETS = {
  main: 1500 * 1024, // 1.5MB hard cap for any route first-load
  main_warning: 1200 * 1024, // 1.2MB warning
  page: 1200 * 1024, // page-only JS (Size column) hard cap
};

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function toBytes(value, unit) {
  const n = parseFloat(value);
  if (unit === 'B') return n;
  if (unit === 'kB' || unit === 'KB') return n * 1024;
  if (unit === 'MB') return n * 1024 * 1024;
  return n * 1024;
}

function parseRoutesFromBuildLog(buildLog) {
  const routes = [];
  // Next 15 table rows look like:
  // ┌ ○ /                  1.21 kB         235 kB
  // ├ ƒ /api/contact         334 B         187 kB
  // ├ ● /blog/[slug]         963 B         195 kB
  const routeRegex =
    /^[┌├└]\s*([○●ƒλ])\s+(\S+)\s+([\d.]+)\s+(B|kB|KB|MB)\s+([\d.]+)\s+(B|kB|KB|MB)\s*$/gm;

  let match;
  while ((match = routeRegex.exec(buildLog)) !== null) {
    const [, type, route, sizeVal, sizeUnit, firstLoadVal, firstLoadUnit] = match;
    const sizeBytes = toBytes(sizeVal, sizeUnit);
    const firstLoadBytes = toBytes(firstLoadVal, firstLoadUnit);
    routes.push({
      type: type.trim(),
      route: route.trim(),
      sizeKB: sizeBytes / 1024,
      firstLoadKB: firstLoadBytes / 1024,
      sizeBytes,
      firstLoadBytes,
    });
  }

  return routes;
}

function findBuildLog() {
  const candidates = [
    join(PROJECT_ROOT, '.next', 'build-log.txt'),
    join(ARTIFACTS_DIR, 'build-log.txt'),
    join(PROJECT_ROOT, '.next', 'build-log.txt.txt'),
  ];
  for (const path of candidates) {
    if (existsSync(path)) return path;
  }
  return null;
}

function parseNextBuildOutput() {
  const buildLogPath = findBuildLog();
  if (!buildLogPath) {
    log(
      'No Next.js build log found (.next/build-log.txt). ' +
        'Re-run the production build with log capture (verify.sh / build:log).',
      'red'
    );
    return null;
  }

  const buildLog = readFileSync(buildLogPath, 'utf8');
  const routes = parseRoutesFromBuildLog(buildLog);

  if (routes.length === 0) {
    log(`Build log at ${buildLogPath} did not contain a parsable route table.`, 'red');
    return null;
  }

  log(`Parsed ${routes.length} routes from ${buildLogPath}`, 'green');
  return routes;
}

function analyzeBundleSizes(routes) {
  const analysis = {
    totalRoutes: routes.length,
    totalSize: 0,
    totalFirstLoad: 0,
    violations: [],
    warnings: [],
    summary: {
      main: { size: 0, firstLoad: 0, routes: [] },
      pages: { size: 0, firstLoad: 0, routes: [] },
      chunks: { size: 0, firstLoad: 0, routes: [] },
    },
  };

  for (const route of routes) {
    // First-load already includes shared JS; do not sum across routes for budgets.
    analysis.totalSize += route.sizeBytes;
    analysis.totalFirstLoad = Math.max(analysis.totalFirstLoad, route.firstLoadBytes);

    if (route.route === '/') {
      analysis.summary.main.size += route.sizeBytes;
      analysis.summary.main.firstLoad += route.firstLoadBytes;
      analysis.summary.main.routes.push(route);
    } else if (route.route.startsWith('/') && !route.route.includes('_')) {
      analysis.summary.pages.size += route.sizeBytes;
      analysis.summary.pages.firstLoad = Math.max(
        analysis.summary.pages.firstLoad,
        route.firstLoadBytes
      );
      analysis.summary.pages.routes.push(route);
    } else {
      analysis.summary.chunks.size += route.sizeBytes;
      analysis.summary.chunks.firstLoad = Math.max(
        analysis.summary.chunks.firstLoad,
        route.firstLoadBytes
      );
      analysis.summary.chunks.routes.push(route);
    }

    if (route.firstLoadBytes > BUNDLE_BUDGETS.main) {
      analysis.violations.push({
        type: 'hard',
        route: route.route,
        size: route.firstLoadBytes,
        threshold: BUNDLE_BUDGETS.main,
        message: `First Load JS exceeds main bundle budget (${formatBytes(route.firstLoadBytes)} > ${formatBytes(BUNDLE_BUDGETS.main)})`,
      });
    } else if (route.firstLoadBytes > BUNDLE_BUDGETS.main_warning) {
      analysis.warnings.push({
        type: 'warning',
        route: route.route,
        size: route.firstLoadBytes,
        threshold: BUNDLE_BUDGETS.main_warning,
        message: `First Load JS exceeds warning threshold (${formatBytes(route.firstLoadBytes)} > ${formatBytes(BUNDLE_BUDGETS.main_warning)})`,
      });
    }

    if (route.sizeBytes > BUNDLE_BUDGETS.page) {
      analysis.violations.push({
        type: 'hard',
        route: route.route,
        size: route.sizeBytes,
        threshold: BUNDLE_BUDGETS.page,
        message: `Page size exceeds budget (${formatBytes(route.sizeBytes)} > ${formatBytes(BUNDLE_BUDGETS.page)})`,
      });
    }
  }

  return analysis;
}

function generateReport(analysis) {
  const report = {
    timestamp: new Date().toISOString(),
    budgets: BUNDLE_BUDGETS,
    analysis,
    status: analysis.violations.length === 0 ? 'PASS' : 'FAIL',
  };

  log('\n📦 Bundle Size Analysis', 'blue');
  log('='.repeat(50), 'blue');

  log(`\nTotal Routes: ${analysis.totalRoutes}`);
  log(`Largest First Load: ${formatBytes(analysis.totalFirstLoad)}`);

  log('\n📊 Summary by Category:', 'blue');
  log(
    `Home (/): ${formatBytes(analysis.summary.main.firstLoad)} (${analysis.summary.main.routes.length} routes)`
  );
  log(
    `Pages (max first-load): ${formatBytes(analysis.summary.pages.firstLoad)} (${analysis.summary.pages.routes.length} routes)`
  );

  if (analysis.violations.length > 0) {
    log('\n❌ Bundle Size Violations:', 'red');
    analysis.violations.forEach((violation) => {
      log(`  • ${violation.route}: ${violation.message}`, 'red');
    });
  }

  if (analysis.warnings.length > 0) {
    log('\n⚠️ Bundle Size Warnings:', 'yellow');
    analysis.warnings.forEach((warning) => {
      log(`  • ${warning.route}: ${warning.message}`, 'yellow');
    });
  }

  if (analysis.violations.length === 0 && analysis.warnings.length === 0) {
    log('\n✅ All bundle sizes are within budgets!', 'green');
  }

  mkdirSync(ARTIFACTS_DIR, { recursive: true });
  const reportPath = join(ARTIFACTS_DIR, 'bundle_analysis.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\n📄 Detailed report saved to: ${reportPath}`);

  const markdownPath = join(ARTIFACTS_DIR, 'bundle_analysis.md');
  writeFileSync(markdownPath, generateMarkdownTable(analysis));
  log(`📄 Markdown table saved to: ${markdownPath}`);

  return report;
}

function generateMarkdownTable(analysis) {
  let table = '# Bundle Size Analysis\n\n';
  table += '| Route | Type | Size (KB) | First Load (KB) | Status |\n';
  table += '|-------|------|-----------|-----------------|--------|\n';

  const all = [...analysis.summary.main.routes, ...analysis.summary.pages.routes];
  all.forEach((route) => {
    const status =
      route.firstLoadBytes > BUNDLE_BUDGETS.main
        ? '❌'
        : route.firstLoadBytes > BUNDLE_BUDGETS.main_warning
          ? '⚠️'
          : '✅';
    table += `| ${route.route} | ${route.type} | ${route.sizeKB.toFixed(1)} | ${route.firstLoadKB.toFixed(1)} | ${status} |\n`;
  });

  table += '\n## Thresholds\n';
  table += `- **Main Bundle (First Load JS)**: ${formatBytes(BUNDLE_BUDGETS.main)} (hard limit)\n`;
  table += `- **Warning**: ${formatBytes(BUNDLE_BUDGETS.main_warning)}\n`;
  table += `- **Page-only Size**: ${formatBytes(BUNDLE_BUDGETS.page)}\n`;

  return table;
}

function main() {
  try {
    log('Starting bundle size analysis...', 'blue');

    const routes = parseNextBuildOutput();
    if (!routes) {
      process.exit(1);
    }

    const analysis = analyzeBundleSizes(routes);
    const report = generateReport(analysis);

    if (report.status === 'FAIL') {
      log('\n❌ Bundle size analysis failed!', 'red');
      process.exit(1);
    }

    log('\n✅ Bundle size analysis passed!', 'green');
    process.exit(0);
  } catch (error) {
    log(`\n❌ Bundle size analysis failed: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

main();
