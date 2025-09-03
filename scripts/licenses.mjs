#!/usr/bin/env node

/**
 * License Compliance Script
 * Run license-checker, flag copyleft or unknown licenses
 * Usage: node scripts/licenses.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const ARTIFACTS_DIR = join(PROJECT_ROOT, 'artifacts');

// License categories
const LICENSE_CATEGORIES = {
  // Permissive licenses (generally safe)
  permissive: [
    'MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC',
    'Unlicense', '0BSD', 'CC0-1.0', 'WTFPL', 'Zlib'
  ],
  
  // Copyleft licenses (require attention)
  copyleft: [
    'GPL-2.0', 'GPL-3.0', 'AGPL-3.0', 'LGPL-2.1', 'LGPL-3.0',
    'MPL-2.0', 'EPL-1.0', 'EPL-2.0', 'CDDL-1.0', 'CDDL-1.1'
  ],
  
  // Commercial licenses (require review)
  commercial: [
    'Commercial', 'Proprietary', 'UNLICENSED'
  ],
  
  // Unknown or problematic
  unknown: [
    'Unknown', 'UNKNOWN', 'SEE LICENSE IN FILE', 'Custom'
  ]
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

function checkLicenseCheckerInstalled() {
  try {
    execSync('license-checker --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

function installLicenseChecker() {
  log('Installing license-checker...', 'blue');
  try {
    execSync('npm install -g license-checker', { stdio: 'inherit' });
    return true;
  } catch (error) {
    log('Failed to install license-checker globally. Trying local installation...', 'yellow');
    try {
      execSync('npm install --save-dev license-checker', { stdio: 'inherit', cwd: PROJECT_ROOT });
      return true;
    } catch (error) {
      log('Failed to install license-checker locally.', 'red');
      return false;
    }
  }
}

function runLicenseChecker() {
  try {
    const output = execSync('license-checker --json', { 
      stdio: 'pipe', 
      cwd: PROJECT_ROOT 
    }).toString();
    
    return JSON.parse(output);
  } catch (error) {
    log(`Failed to run license-checker: ${error.message}`, 'red');
    return null;
  }
}

function categorizeLicense(license) {
  if (!license || license === 'undefined') {
    return 'unknown';
  }
  
  const licenseStr = license.toString().toUpperCase();
  
  // Check for permissive licenses
  for (const permissive of LICENSE_CATEGORIES.permissive) {
    if (licenseStr.includes(permissive.toUpperCase())) {
      return 'permissive';
    }
  }
  
  // Check for copyleft licenses
  for (const copyleft of LICENSE_CATEGORIES.copyleft) {
    if (licenseStr.includes(copyleft.toUpperCase())) {
      return 'copyleft';
    }
  }
  
  // Check for commercial licenses
  for (const commercial of LICENSE_CATEGORIES.commercial) {
    if (licenseStr.includes(commercial.toUpperCase())) {
      return 'commercial';
    }
  }
  
  // Check for unknown licenses
  for (const unknown of LICENSE_CATEGORIES.unknown) {
    if (licenseStr.includes(unknown.toUpperCase())) {
      return 'unknown';
    }
  }
  
  return 'unknown';
}

function analyzeLicenses(licenseData) {
  const analysis = {
    total: 0,
    permissive: 0,
    copyleft: 0,
    commercial: 0,
    unknown: 0,
    packages: {
      permissive: [],
      copyleft: [],
      commercial: [],
      unknown: []
    },
    violations: [],
    warnings: []
  };
  
  for (const [packageName, packageInfo] of Object.entries(licenseData)) {
    analysis.total++;
    
    const license = packageInfo.licenses || packageInfo.license || 'Unknown';
    const category = categorizeLicense(license);
    
    analysis[category]++;
    analysis.packages[category].push({
      name: packageName,
      license: license,
      version: packageInfo.version || 'unknown',
      repository: packageInfo.repository || 'unknown'
    });
    
    // Flag violations and warnings
    if (category === 'copyleft') {
      analysis.violations.push({
        package: packageName,
        license: license,
        category: 'copyleft',
        message: `Package uses copyleft license: ${license}`
      });
    } else if (category === 'commercial') {
      analysis.violations.push({
        package: packageName,
        license: license,
        category: 'commercial',
        message: `Package uses commercial license: ${license}`
      });
    } else if (category === 'unknown') {
      analysis.warnings.push({
        package: packageName,
        license: license,
        category: 'unknown',
        message: `Package has unknown license: ${license}`
      });
    }
  }
  
  return analysis;
}

function generateReport(analysis) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: analysis,
    status: analysis.violations.length === 0 ? 'PASS' : 'FAIL'
  };
  
  // Console output
  log('\n📄 License Compliance Analysis', 'blue');
  log('='.repeat(50), 'blue');
  
  log(`\nTotal Packages: ${analysis.total}`);
  log(`Permissive: ${analysis.permissive}`);
  log(`Copyleft: ${analysis.copyleft}`);
  log(`Commercial: ${analysis.commercial}`);
  log(`Unknown: ${analysis.unknown}`);
  
  if (analysis.violations.length > 0) {
    log('\n❌ License Violations:', 'red');
    analysis.violations.forEach(violation => {
      log(`  • ${violation.package}: ${violation.message}`, 'red');
    });
  }
  
  if (analysis.warnings.length > 0) {
    log('\n⚠️ License Warnings:', 'yellow');
    analysis.warnings.forEach(warning => {
      log(`  • ${warning.package}: ${warning.message}`, 'yellow');
    });
  }
  
  // Show top packages by category
  if (analysis.packages.copyleft.length > 0) {
    log('\n📋 Copyleft Packages:', 'yellow');
    analysis.packages.copyleft.slice(0, 10).forEach(pkg => {
      log(`  • ${pkg.name}@${pkg.version} - ${pkg.license}`, 'yellow');
    });
    if (analysis.packages.copyleft.length > 10) {
      log(`  ... and ${analysis.packages.copyleft.length - 10} more`, 'yellow');
    }
  }
  
  if (analysis.packages.unknown.length > 0) {
    log('\n❓ Unknown License Packages:', 'blue');
    analysis.packages.unknown.slice(0, 10).forEach(pkg => {
      log(`  • ${pkg.name}@${pkg.version} - ${pkg.license}`, 'blue');
    });
    if (analysis.packages.unknown.length > 10) {
      log(`  ... and ${analysis.packages.unknown.length - 10} more`, 'blue');
    }
  }
  
  if (analysis.violations.length === 0 && analysis.warnings.length === 0) {
    log('\n✅ All licenses are compliant!', 'green');
  } else if (analysis.violations.length === 0) {
    log('\n⚠️ Some packages have unknown licenses, but no violations found.', 'yellow');
  } else {
    log('\n❌ License compliance issues found!', 'red');
  }
  
  // Save report
  const reportPath = join(ARTIFACTS_DIR, 'license_audit.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\n📄 Report saved to: ${reportPath}`);
  
  // Generate markdown summary
  const markdownSummary = generateMarkdownSummary(analysis);
  const markdownPath = join(ARTIFACTS_DIR, 'license_audit.md');
  writeFileSync(markdownPath, markdownSummary);
  log(`📄 Markdown summary saved to: ${markdownPath}`);
  
  return report;
}

function generateMarkdownSummary(analysis) {
  let summary = '# License Compliance Summary\n\n';
  summary += `**Total Packages**: ${analysis.total}\n`;
  summary += `**Permissive**: ${analysis.permissive}\n`;
  summary += `**Copyleft**: ${analysis.copyleft}\n`;
  summary += `**Commercial**: ${analysis.commercial}\n`;
  summary += `**Unknown**: ${analysis.unknown}\n\n`;
  
  if (analysis.packages.copyleft.length > 0) {
    summary += '## 🚨 Copyleft Licenses\n\n';
    summary += '| Package | Version | License |\n';
    summary += '|---------|---------|----------|\n';
    analysis.packages.copyleft.forEach(pkg => {
      summary += `| ${pkg.name} | ${pkg.version} | ${pkg.license} |\n`;
    });
    summary += '\n';
  }
  
  if (analysis.packages.unknown.length > 0) {
    summary += '## ❓ Unknown Licenses\n\n';
    summary += '| Package | Version | License |\n';
    summary += '|---------|---------|----------|\n';
    analysis.packages.unknown.forEach(pkg => {
      summary += `| ${pkg.name} | ${pkg.version} | ${pkg.license} |\n`;
    });
    summary += '\n';
  }
  
  summary += '## 📋 License Categories\n\n';
  summary += '- **Permissive**: MIT, Apache-2.0, BSD, ISC, Unlicense\n';
  summary += '- **Copyleft**: GPL, AGPL, LGPL, MPL, EPL, CDDL\n';
  summary += '- **Commercial**: Requires commercial license\n';
  summary += '- **Unknown**: License not recognized or missing\n';
  
  return summary;
}

function main() {
  try {
    log('Starting license compliance analysis...', 'blue');
    
    // Check if license-checker is installed
    if (!checkLicenseCheckerInstalled()) {
      log('license-checker not found. Installing...', 'yellow');
      if (!installLicenseChecker()) {
        log('Failed to install license-checker. Please install it manually.', 'red');
        process.exit(1);
      }
    }
    
    // Run license checker
    log('Running license-checker...', 'blue');
    const licenseData = runLicenseChecker();
    
    if (!licenseData) {
      log('Failed to get license data.', 'red');
      process.exit(1);
    }
    
    // Analyze licenses
    const analysis = analyzeLicenses(licenseData);
    
    // Generate report
    const report = generateReport(analysis);
    
    // Exit with error code if there are violations
    if (report.status === 'FAIL') {
      log('\n❌ License compliance check failed!', 'red');
      process.exit(1);
    }
    
    log('\n✅ License compliance check passed!', 'green');
    process.exit(0);
    
  } catch (error) {
    log(`\n❌ License compliance check failed: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

main();