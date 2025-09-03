#!/usr/bin/env node

/**
 * Lighthouse Performance Testing Script
 * Runs Lighthouse against local production server for both desktop & mobile
 * Usage: node scripts/lighthouse.mjs [--url=http://localhost:3001]
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const ARTIFACTS_DIR = join(PROJECT_ROOT, 'artifacts');

// Lighthouse thresholds
const THRESHOLDS = {
  performance: 85,
  bestPractices: 90,
  seo: 90,
  accessibility: 90,
  pwa: 80, // Only if PWA is enabled
};

// Default URL
const DEFAULT_URL = 'http://localhost:3001';
const BASE = DEFAULT_URL;

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

function parseArgs() {
  const args = process.argv.slice(2);
  let url = DEFAULT_URL;
  
  for (const arg of args) {
    if (arg.startsWith('--url=')) {
      url = arg.split('=')[1];
    }
  }
  
  return { url };
}

function checkLighthouseInstalled() {
  try {
    execSync('lighthouse --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

function installLighthouse() {
  log('Installing Lighthouse...', 'blue');
  try {
    execSync('npm install -g lighthouse', { stdio: 'inherit' });
    return true;
  } catch (error) {
    log('Failed to install Lighthouse globally. Trying local installation...', 'yellow');
    try {
      execSync('npm install --save-dev lighthouse', { stdio: 'inherit', cwd: PROJECT_ROOT });
      return true;
    } catch (error) {
      log('Failed to install Lighthouse locally.', 'red');
      return false;
    }
  }
}

function runLighthouse(url, device = 'desktop') {
  const outputDir = join(ARTIFACTS_DIR, `lh-${device}`);
  const htmlPath = join(outputDir, 'report.html');
  const jsonPath = join(outputDir, 'report.json');
  
  // Create output directory
  execSync(`mkdir -p "${outputDir}"`, { stdio: 'pipe' });
  
  const command = [
    'lighthouse',
    `"${url}"`,
    '--output=html,json',
    `--output-path="${outputDir}/report"`,
    '--chrome-flags="--headless --no-sandbox --disable-gpu"',
    '--quiet',
    '--no-enable-error-reporting',
    device === 'mobile' ? '--form-factor=mobile' : '--form-factor=desktop',
    device === 'mobile' ? '--throttling-method=devtools' : '',
  ].filter(Boolean).join(' ');
  
  log(`Running Lighthouse for ${device}...`, 'blue');
  
  try {
    execSync(command, { stdio: 'pipe', timeout: 120000 }); // 2 minute timeout
    return { htmlPath, jsonPath };
  } catch (error) {
    log(`Lighthouse failed for ${device}: ${error.message}`, 'red');
    return null;
  }
}

function parseLighthouseResults(jsonPath) {
  if (!existsSync(jsonPath)) {
    return null;
  }
  
  try {
    const data = JSON.parse(readFileSync(jsonPath, 'utf8'));
    const categories = data.categories;
    
    return {
      performance: Math.round(categories.performance?.score * 100) || 0,
      bestPractices: Math.round(categories['best-practices']?.score * 100) || 0,
      seo: Math.round(categories.seo?.score * 100) || 0,
      accessibility: Math.round(categories.accessibility?.score * 100) || 0,
      pwa: Math.round(categories.pwa?.score * 100) || 0,
      audits: data.audits,
      runWarnings: data.runWarnings || [],
    };
  } catch (error) {
    log(`Failed to parse Lighthouse results: ${error.message}`, 'red');
    return null;
  }
}

function checkThresholds(results, device) {
  const violations = [];
  const warnings = [];
  
  for (const [category, threshold] of Object.entries(THRESHOLDS)) {
    const score = results[category];
    if (score === undefined) continue;
    
    if (score < threshold) {
      violations.push({
        category,
        score,
        threshold,
        device,
        message: `${category} score ${score} is below threshold ${threshold}`
      });
    } else if (score < threshold + 5) {
      warnings.push({
        category,
        score,
        threshold,
        device,
        message: `${category} score ${score} is close to threshold ${threshold}`
      });
    }
  }
  
  return { violations, warnings };
}

function generateReport(desktopResults, mobileResults) {
  const report = {
    timestamp: new Date().toISOString(),
    thresholds: THRESHOLDS,
    desktop: desktopResults,
    mobile: mobileResults,
    summary: {
      desktop: {
        violations: desktopResults?.violations || [],
        warnings: desktopResults?.warnings || [],
        status: (desktopResults?.violations?.length || 0) === 0 ? 'PASS' : 'FAIL'
      },
      mobile: {
        violations: mobileResults?.violations || [],
        warnings: mobileResults?.warnings || [],
        status: (mobileResults?.violations?.length || 0) === 0 ? 'PASS' : 'FAIL'
      }
    }
  };
  
  // Overall status
  report.status = report.summary.desktop.status === 'PASS' && report.summary.mobile.status === 'PASS' ? 'PASS' : 'FAIL';
  
  // Console output
  log('\n🚀 Lighthouse Performance Analysis', 'blue');
  log('='.repeat(50), 'blue');
  
  if (desktopResults) {
    log('\n📊 Desktop Results:', 'blue');
    log(`  Performance: ${desktopResults.performance}/100`);
    log(`  Best Practices: ${desktopResults.bestPractices}/100`);
    log(`  SEO: ${desktopResults.seo}/100`);
    log(`  Accessibility: ${desktopResults.accessibility}/100`);
    if (desktopResults.pwa > 0) {
      log(`  PWA: ${desktopResults.pwa}/100`);
    }
  }
  
  if (mobileResults) {
    log('\n📱 Mobile Results:', 'blue');
    log(`  Performance: ${mobileResults.performance}/100`);
    log(`  Best Practices: ${mobileResults.bestPractices}/100`);
    log(`  SEO: ${mobileResults.seo}/100`);
    log(`  Accessibility: ${mobileResults.accessibility}/100`);
    if (mobileResults.pwa > 0) {
      log(`  PWA: ${mobileResults.pwa}/100`);
    }
  }
  
  // Show violations and warnings
  const allViolations = [...(desktopResults?.violations || []), ...(mobileResults?.violations || [])];
  const allWarnings = [...(desktopResults?.warnings || []), ...(mobileResults?.warnings || [])];
  
  if (allViolations.length > 0) {
    log('\n❌ Threshold Violations:', 'red');
    allViolations.forEach(violation => {
      log(`  • ${violation.device} ${violation.category}: ${violation.message}`, 'red');
    });
  }
  
  if (allWarnings.length > 0) {
    log('\n⚠️ Threshold Warnings:', 'yellow');
    allWarnings.forEach(warning => {
      log(`  • ${warning.device} ${warning.category}: ${warning.message}`, 'yellow');
    });
  }
  
  if (allViolations.length === 0 && allWarnings.length === 0) {
    log('\n✅ All Lighthouse thresholds met!', 'green');
  }
  
  // Save report
  const reportPath = join(ARTIFACTS_DIR, 'lighthouse_report.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\n📄 Report saved to: ${reportPath}`);
  
  return report;
}

async function main() {
  try {
    const { url } = parseArgs();
    const targetUrl = url || BASE;
    
    log('Starting Lighthouse performance analysis...', 'blue');
    log(`Target URL: ${targetUrl}`, 'blue');
    
    // Check if Lighthouse is installed
    if (!checkLighthouseInstalled()) {
      log('Lighthouse not found. Installing...', 'yellow');
      if (!installLighthouse()) {
        log('Failed to install Lighthouse. Please install it manually.', 'red');
        process.exit(1);
      }
    }
    
    // Run Lighthouse for desktop and mobile
    const desktopOutput = runLighthouse(targetUrl, 'desktop');
    const mobileOutput = runLighthouse(targetUrl, 'mobile');
    
    if (!desktopOutput && !mobileOutput) {
      log('Failed to run Lighthouse for both desktop and mobile.', 'red');
      process.exit(1);
    }
    
    // Parse results
    const desktopResults = desktopOutput ? parseLighthouseResults(desktopOutput.jsonPath) : null;
    const mobileResults = mobileOutput ? parseLighthouseResults(mobileOutput.jsonPath) : null;
    
    if (!desktopResults && !mobileResults) {
      log('Failed to parse Lighthouse results.', 'red');
      process.exit(1);
    }
    
    // Check thresholds
    if (desktopResults) {
      const desktopChecks = checkThresholds(desktopResults, 'desktop');
      desktopResults.violations = desktopChecks.violations;
      desktopResults.warnings = desktopChecks.warnings;
    }
    
    if (mobileResults) {
      const mobileChecks = checkThresholds(mobileResults, 'mobile');
      mobileResults.violations = mobileChecks.violations;
      mobileResults.warnings = mobileChecks.warnings;
    }
    
    // Generate report
    const report = generateReport(desktopResults, mobileResults);
    
    // Exit with error code if there are violations
    if (report.status === 'FAIL') {
      log('\n❌ Lighthouse analysis failed!', 'red');
      process.exit(1);
    }
    
    log('\n✅ Lighthouse analysis passed!', 'green');
    process.exit(0);
    
  } catch (error) {
    log(`\n❌ Lighthouse analysis failed: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

main();