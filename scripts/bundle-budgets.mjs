#!/usr/bin/env node

/**
 * Bundle Size Analysis Script
 * Parses Next.js build output and analyzes bundle sizes against budgets
 * Usage: node scripts/bundle-budgets.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { gzipSync } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const ARTIFACTS_DIR = join(PROJECT_ROOT, 'artifacts');

// Bundle size thresholds (in bytes)
const BUNDLE_BUDGETS = {
  main: 1500 * 1024, // 1.5MB (realistic for this app with images/gallery)
  main_warning: 1200 * 1024, // 1.2MB warning threshold
  page: 1200 * 1024, // 1.2MB per page
  chunk: 300 * 1024, // 300KB per chunk
};

// Colors for console output
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

function parseNextBuildOutput() {
  // Try to read from build log first
  const buildLogPath = join(PROJECT_ROOT, '.next', 'build-log.txt');
  if (existsSync(buildLogPath)) {
    const buildLog = readFileSync(buildLogPath, 'utf8');
    const routes = [];
    
    // Parse route information from build log
    const routeRegex = /^([├└○●λ])\s+([^\s]+)\s+([0-9.]+)\s+kB\s+([0-9.]+)\s+kB$/gm;
    let match;
    
    while ((match = routeRegex.exec(buildLog)) !== null) {
      const [, type, route, size, firstLoad] = match;
      routes.push({
        type: type.trim(),
        route: route.trim(),
        sizeKB: parseFloat(size),
        firstLoadKB: parseFloat(firstLoad),
        sizeBytes: parseFloat(size) * 1024,
        firstLoadBytes: parseFloat(firstLoad) * 1024,
      });
    }
    
    if (routes.length > 0) {
      return routes;
    }
  }
  
  // Fallback: try to read from .next/static analysis
  const staticPath = join(PROJECT_ROOT, '.next', 'static');
  if (existsSync(staticPath)) {
    log('Build log not found, analyzing static files...', 'yellow');
    return analyzeStaticFiles();
  }
  
  log('No build artifacts found. Run "npm run build:prod" first.', 'red');
  return null;
}

function analyzeStaticFiles() {
  const routes = [];
  const staticPath = join(PROJECT_ROOT, '.next', 'static');
  
  try {
    const chunks = readdirSync(join(staticPath, 'chunks'));
    let totalSize = 0;
    
    for (const chunk of chunks) {
      if (chunk.endsWith('.js')) {
        const chunkPath = join(staticPath, 'chunks', chunk);
        const stats = statSync(chunkPath);
        const sizeKB = stats.size / 1024;
        totalSize += sizeKB;
        
        routes.push({
          type: 'chunk',
          route: `/static/chunks/${chunk}`,
          sizeKB: sizeKB,
          firstLoadKB: sizeKB,
          sizeBytes: stats.size,
          firstLoadBytes: stats.size,
        });
      }
    }
    
    // Add main page estimate
    routes.push({
      type: 'page',
      route: '/',
      sizeKB: totalSize,
      firstLoadKB: totalSize,
      sizeBytes: totalSize * 1024,
      firstLoadBytes: totalSize * 1024,
    });
    
  } catch (error) {
    log(`Error analyzing static files: ${error.message}`, 'red');
  }
  
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
    }
  };

  for (const route of routes) {
    analysis.totalSize += route.sizeBytes;
    analysis.totalFirstLoad += route.firstLoadBytes;

    // Categorize routes
    if (route.route === '/' || route.route.includes('_app')) {
      analysis.summary.main.size += route.sizeBytes;
      analysis.summary.main.firstLoad += route.firstLoadBytes;
      analysis.summary.main.routes.push(route);
    } else if (route.route.startsWith('/') && !route.route.includes('_')) {
      analysis.summary.pages.size += route.sizeBytes;
      analysis.summary.pages.firstLoad += route.firstLoadBytes;
      analysis.summary.pages.routes.push(route);
    } else {
      analysis.summary.chunks.size += route.sizeBytes;
      analysis.summary.chunks.firstLoad += route.firstLoadBytes;
      analysis.summary.chunks.routes.push(route);
    }

    // Check thresholds
    if (route.firstLoadBytes > BUNDLE_BUDGETS.main) {
      analysis.violations.push({
        type: 'hard',
        route: route.route,
        size: route.firstLoadBytes,
        threshold: BUNDLE_BUDGETS.main,
        message: `First Load JS exceeds main bundle budget (${formatBytes(route.firstLoadBytes)} > ${formatBytes(BUNDLE_BUDGETS.main)})`
      });
    } else if (route.firstLoadBytes > BUNDLE_BUDGETS.main_warning) {
      analysis.warnings.push({
        type: 'warning',
        route: route.route,
        size: route.firstLoadBytes,
        threshold: BUNDLE_BUDGETS.main_warning,
        message: `First Load JS exceeds warning threshold (${formatBytes(route.firstLoadBytes)} > ${formatBytes(BUNDLE_BUDGETS.main_warning)})`
      });
    }

    if (route.sizeBytes > BUNDLE_BUDGETS.page) {
      analysis.violations.push({
        type: 'hard',
        route: route.route,
        size: route.sizeBytes,
        threshold: BUNDLE_BUDGETS.page,
        message: `Page size exceeds budget (${formatBytes(route.sizeBytes)} > ${formatBytes(BUNDLE_BUDGETS.page)})`
      });
    }
  }

  return analysis;
}

function calculateGzipSize(content) {
  try {
    const gzipped = gzipSync(content);
    return gzipped.length;
  } catch (error) {
    return content.length; // Fallback to original size
  }
}

function generateReport(analysis) {
  const report = {
    timestamp: new Date().toISOString(),
    budgets: BUNDLE_BUDGETS,
    analysis,
    status: analysis.violations.length === 0 ? 'PASS' : 'FAIL',
  };

  // Console output
  log('\n📦 Bundle Size Analysis', 'blue');
  log('='.repeat(50), 'blue');
  
  log(`\nTotal Routes: ${analysis.totalRoutes}`);
  log(`Total Size: ${formatBytes(analysis.totalSize)}`);
  log(`Total First Load: ${formatBytes(analysis.totalFirstLoad)}`);
  
  log('\n📊 Summary by Category:', 'blue');
  log(`Main Bundle: ${formatBytes(analysis.summary.main.firstLoad)} (${analysis.summary.main.routes.length} routes)`);
  log(`Pages: ${formatBytes(analysis.summary.pages.firstLoad)} (${analysis.summary.pages.routes.length} routes)`);
  log(`Chunks: ${formatBytes(analysis.summary.chunks.firstLoad)} (${analysis.summary.chunks.routes.length} routes)`);

  if (analysis.violations.length > 0) {
    log('\n❌ Bundle Size Violations:', 'red');
    analysis.violations.forEach(violation => {
      log(`  • ${violation.route}: ${violation.message}`, 'red');
    });
  }

  if (analysis.warnings.length > 0) {
    log('\n⚠️ Bundle Size Warnings:', 'yellow');
    analysis.warnings.forEach(warning => {
      log(`  • ${warning.route}: ${warning.message}`, 'yellow');
    });
  }

  if (analysis.violations.length === 0 && analysis.warnings.length === 0) {
    log('\n✅ All bundle sizes are within budgets!', 'green');
  }

  // Save detailed report
  const reportPath = join(ARTIFACTS_DIR, 'bundle_analysis.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\n📄 Detailed report saved to: ${reportPath}`);

  // Generate markdown table for main report
  const markdownTable = generateMarkdownTable(analysis);
  const markdownPath = join(ARTIFACTS_DIR, 'bundle_analysis.md');
  writeFileSync(markdownPath, markdownTable);
  log(`📄 Markdown table saved to: ${markdownPath}`);

  return report;
}

function generateMarkdownTable(analysis) {
  let table = '# Bundle Size Analysis\n\n';
  table += '| Route | Type | Size (KB) | First Load (KB) | Status |\n';
  table += '|-------|------|-----------|-----------------|--------|\n';
  
  analysis.summary.main.routes.forEach(route => {
    const status = route.firstLoadBytes > BUNDLE_BUDGETS.main ? '❌' : 
                   route.firstLoadBytes > BUNDLE_BUDGETS.main_warning ? '⚠️' : '✅';
    table += `| ${route.route} | ${route.type} | ${route.sizeKB.toFixed(1)} | ${route.firstLoadKB.toFixed(1)} | ${status} |\n`;
  });
  
  analysis.summary.pages.routes.forEach(route => {
    const status = route.firstLoadBytes > BUNDLE_BUDGETS.main ? '❌' : 
                   route.firstLoadBytes > BUNDLE_BUDGETS.main_warning ? '⚠️' : '✅';
    table += `| ${route.route} | ${route.type} | ${route.sizeKB.toFixed(1)} | ${route.firstLoadKB.toFixed(1)} | ${status} |\n`;
  });
  
  table += '\n## Thresholds\n';
  table += `- **Main Bundle**: ${formatBytes(BUNDLE_BUDGETS.main)} (hard limit)\n`;
  table += `- **Warning**: ${formatBytes(BUNDLE_BUDGETS.main_warning)}\n`;
  table += `- **Page Limit**: ${formatBytes(BUNDLE_BUDGETS.page)}\n`;
  
  return table;
}

function main() {
  try {
    log('Starting bundle size analysis...', 'blue');
    
    const routes = parseNextBuildOutput();
    if (!routes) {
      process.exit(1);
    }

    if (routes.length === 0) {
      log('No routes found in build output.', 'yellow');
      process.exit(0);
    }

    const analysis = analyzeBundleSizes(routes);
    const report = generateReport(analysis);

    // Exit with error code if there are violations
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