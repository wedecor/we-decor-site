#!/usr/bin/env tsx

/**
 * Accessibility Testing Script
 * Playwright + axe scan for key pages, failing only on serious/critical violations
 * Usage: tsx scripts/axe-run.mts [--url=http://localhost:3001]
 */

import { chromium, Browser, Page } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const ARTIFACTS_DIR = join(PROJECT_ROOT, 'artifacts');

// Default URL
const DEFAULT_URL = 'http://localhost:3001';

// Pages to test for accessibility
const TEST_PAGES = [
  '/',
  '/gallery',
  '/services',
  '/pricing',
  '/contact'
];

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
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

async function runAxeOnPage(page: Page, url: string, route: string) {
  const fullUrl = `${url}${route}`;
  
  try {
    log(`  Testing ${route}...`, 'blue');
    
    // Set reduced motion for consistent testing
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('main', { state: 'attached', timeout: 10000 });

    // Inject axe from node_modules. The previous jsDelivr <script> never
    // loaded under production CSP (jsdelivr was dropped) and had no onerror,
    // so this job hung the first time Checks reached the a11y gate.
    const axeResults = await new AxeBuilder({ page }).analyze();
    
    // Filter for serious and critical violations only
    const seriousViolations = axeResults.violations.filter((violation: any) => 
      ['serious', 'critical'].includes(violation.impact?.toLowerCase())
    );
    
    return {
      url: fullUrl,
      route,
      success: true,
      totalViolations: axeResults.violations.length,
      seriousViolations: seriousViolations.length,
      violations: axeResults.violations,
      seriousViolationsList: seriousViolations,
      passes: axeResults.passes,
      incomplete: axeResults.incomplete,
      inapplicable: axeResults.inapplicable
    };
    
  } catch (error) {
    log(`    ❌ Failed to test ${route}: ${error instanceof Error ? error.message : 'Unknown error'}`, 'red');
    return {
      url: fullUrl,
      route,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      totalViolations: 0,
      seriousViolations: 0,
      violations: [],
      seriousViolationsList: [],
      passes: [],
      incomplete: [],
      inapplicable: []
    };
  }
}

async function main() {
  let browser: Browser | null = null;
  
  try {
    const { url } = parseArgs();
    
    log('Starting accessibility testing...', 'blue');
    log(`Target URL: ${url}`, 'blue');
    
    // Launch browser
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      userAgent: 'Accessibility-Tester/1.0'
    });
    
    const page = await context.newPage();
    
    const results = {
      timestamp: new Date().toISOString(),
      url,
      pages: [] as any[],
      summary: {
        totalPages: 0,
        successfulPages: 0,
        totalViolations: 0,
        totalSeriousViolations: 0,
        status: 'PASS' as 'PASS' | 'FAIL'
      }
    };

    // Test each page
    log('\n🔍 Running accessibility tests...', 'blue');
    for (const route of TEST_PAGES) {
      const pageResult = await runAxeOnPage(page, url, route);
      results.pages.push(pageResult);
      results.summary.totalPages++;
      
      if (pageResult.success) {
        results.summary.successfulPages++;
        results.summary.totalViolations += pageResult.totalViolations;
        results.summary.totalSeriousViolations += pageResult.seriousViolations;
      }
    }

    // Determine overall status (fail only on serious/critical violations)
    results.summary.status = results.summary.totalSeriousViolations === 0 ? 'PASS' : 'FAIL';

    // Console output
    log('\n♿ Accessibility Analysis', 'blue');
    log('='.repeat(50), 'blue');
    
    log(`\nTotal Pages Tested: ${results.summary.totalPages}`);
    log(`Successful Pages: ${results.summary.successfulPages}`);
    log(`Total Violations: ${results.summary.totalViolations}`);
    log(`Serious/Critical Violations: ${results.summary.totalSeriousViolations}`);

    // Show detailed results for each page
    results.pages.forEach(pageResult => {
      if (pageResult.success) {
        const status = pageResult.seriousViolations === 0 ? '✅' : '❌';
        log(`\n${status} ${pageResult.route}:`, pageResult.seriousViolations === 0 ? 'green' : 'red');
        log(`  Total violations: ${pageResult.totalViolations}`);
        log(`  Serious/Critical: ${pageResult.seriousViolations}`);
        
        if (pageResult.seriousViolations > 0) {
          pageResult.seriousViolationsList.forEach((violation: any) => {
            log(`    • ${violation.id}: ${violation.description} (${violation.impact})`, 'red');
            violation.nodes?.forEach((node: any) => {
              log(`      - ${node.html}`, 'red');
            });
          });
        }
      } else {
        log(`\n❌ ${pageResult.route}: ${pageResult.error}`, 'red');
      }
    });

    if (results.summary.status === 'PASS') {
      log('\n✅ All accessibility tests passed!', 'green');
    } else {
      log('\n❌ Accessibility tests failed due to serious/critical violations!', 'red');
    }

    // Save report
    const reportPath = join(ARTIFACTS_DIR, 'axe_results.json');
    writeFileSync(reportPath, JSON.stringify(results, null, 2));
    log(`\n📄 Report saved to: ${reportPath}`);

    // Exit with error code if there are serious violations
    if (results.summary.status === 'FAIL') {
      process.exit(1);
    }

    process.exit(0);

  } catch (error) {
    log(`\n❌ Accessibility testing failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'red');
    console.error(error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

main();