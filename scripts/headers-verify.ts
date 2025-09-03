#!/usr/bin/env tsx

/**
 * Security Headers Verification Script
 * Fetches key pages and validates security headers + cache-control + robots/sitemap
 * Usage: tsx scripts/headers-verify.ts [--url=http://localhost:3001]
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const ARTIFACTS_DIR = join(PROJECT_ROOT, 'artifacts');

// Default URL
const DEFAULT_URL = 'http://localhost:3001';

// Required security headers
const REQUIRED_HEADERS = {
  'content-security-policy': {
    required: true,
    description: 'Content Security Policy to prevent XSS attacks',
    severity: 'high'
  },
  'strict-transport-security': {
    required: true,
    description: 'HTTP Strict Transport Security to enforce HTTPS',
    severity: 'high'
  },
  'x-content-type-options': {
    required: true,
    description: 'Prevents MIME type sniffing',
    severity: 'medium'
  },
  'x-frame-options': {
    required: true,
    description: 'Prevents clickjacking attacks',
    severity: 'medium'
  },
  'referrer-policy': {
    required: true,
    description: 'Controls referrer information sent with requests',
    severity: 'medium'
  },
  'permissions-policy': {
    required: true,
    description: 'Controls browser features and APIs',
    severity: 'medium'
  }
};

// Optional but recommended headers
const RECOMMENDED_HEADERS = {
  'x-xss-protection': {
    description: 'XSS protection (legacy browsers)',
    severity: 'low'
  },
  'cache-control': {
    description: 'Caching directives for performance',
    severity: 'low'
  }
};

// Pages to test
const TEST_PAGES = [
  '/',
  '/gallery',
  '/services',
  '/pricing',
  '/contact',
  '/about',
  '/faq'
];

// Special pages to test
const SPECIAL_PAGES = [
  { path: '/robots.txt', expectedStatus: 200, description: 'Robots.txt file' },
  { path: '/sitemap.xml', expectedStatus: 200, description: 'Sitemap file' },
  { path: '/favicon.ico', expectedStatus: 200, description: 'Favicon file' }
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

async function fetchHeaders(url: string, path: string) {
  const fullUrl = `${url}${path}`;
  
  try {
    const response = await fetch(fullUrl, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Security-Headers-Verifier/1.0'
      }
    });
    
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });
    
    return {
      url: fullUrl,
      status: response.status,
      headers,
      success: true
    };
  } catch (error) {
    return {
      url: fullUrl,
      status: 0,
      headers: {},
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

function validateHeaders(headers: Record<string, string>, page: string) {
  const results = {
    violations: [] as Array<{
      header: string;
      severity: string;
      message: string;
      page: string;
    }>,
    warnings: [] as Array<{
      header: string;
      severity: string;
      message: string;
      page: string;
    }>,
    present: [] as string[],
    missing: [] as string[]
  };

  // Check required headers
  for (const [header, config] of Object.entries(REQUIRED_HEADERS)) {
    if (headers[header]) {
      results.present.push(header);
      
      // Validate specific header values
      const value = headers[header];
      switch (header) {
        case 'content-security-policy':
          if (!value.includes("'self'") && !value.includes('*')) {
            results.violations.push({
              header,
              severity: config.severity,
              message: `CSP should include 'self' or specific domains`,
              page
            });
          }
          break;
          
        case 'strict-transport-security':
          if (!value.includes('max-age=')) {
            results.violations.push({
              header,
              severity: config.severity,
              message: `HSTS should include max-age directive`,
              page
            });
          }
          break;
          
        case 'x-content-type-options':
          if (value !== 'nosniff') {
            results.violations.push({
              header,
              severity: config.severity,
              message: `X-Content-Type-Options should be 'nosniff'`,
              page
            });
          }
          break;
          
        case 'x-frame-options':
          if (!['DENY', 'SAMEORIGIN'].includes(value) && !value.includes('ALLOW-FROM')) {
            results.violations.push({
              header,
              severity: config.severity,
              message: `X-Frame-Options should be 'DENY', 'SAMEORIGIN', or 'ALLOW-FROM'`,
              page
            });
          }
          // Check for redundancy with CSP frame-ancestors
          if (headers['content-security-policy'] && headers['content-security-policy'].includes('frame-ancestors')) {
            results.warnings.push({
              header,
              severity: 'low',
              message: `X-Frame-Options is redundant with CSP frame-ancestors directive`,
              page
            });
          }
          break;
      }
    } else {
      results.missing.push(header);
      results.violations.push({
        header,
        severity: config.severity,
        message: `Required security header '${header}' is missing`,
        page
      });
    }
  }

  // Check recommended headers
  for (const [header, config] of Object.entries(RECOMMENDED_HEADERS)) {
    if (headers[header]) {
      results.present.push(header);
    } else {
      results.warnings.push({
        header,
        severity: config.severity,
        message: `Recommended header '${header}' is missing`,
        page
      });
    }
  }

  return results;
}

function checkSpecialPages(url: string) {
  return Promise.all(
    SPECIAL_PAGES.map(async (page) => {
      try {
        const response = await fetch(`${url}${page.path}`, { method: 'HEAD' });
        return {
          path: page.path,
          description: page.description,
          status: response.status,
          success: response.status === page.expectedStatus,
          headers: Object.fromEntries(response.headers.entries())
        };
      } catch (error) {
        return {
          path: page.path,
          description: page.description,
          status: 0,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    })
  );
}

async function main() {
  try {
    const { url } = parseArgs();
    
    log('Starting security headers verification...', 'blue');
    log(`Target URL: ${url}`, 'blue');
    
    const results = {
      timestamp: new Date().toISOString(),
      url,
      pages: [] as any[],
      specialPages: [] as any[],
      summary: {
        totalPages: 0,
        pagesWithViolations: 0,
        totalViolations: 0,
        totalWarnings: 0,
        status: 'PASS' as 'PASS' | 'FAIL'
      }
    };

    // Test each page
    log('\n🔍 Testing security headers on pages...', 'blue');
    for (const page of TEST_PAGES) {
      log(`  Testing ${page}...`, 'blue');
      
      const response = await fetchHeaders(url, page);
      if (!response.success) {
        log(`    ❌ Failed to fetch ${page}: ${response.error}`, 'red');
        results.pages.push({
          path: page,
          success: false,
          error: response.error
        });
        continue;
      }

      const validation = validateHeaders(response.headers, page);
      const pageResult = {
        path: page,
        success: response.success,
        status: response.status,
        headers: response.headers,
        validation
      };

      results.pages.push(pageResult);
      results.summary.totalPages++;
      
      if (validation.violations.length > 0) {
        results.summary.pagesWithViolations++;
        results.summary.totalViolations += validation.violations.length;
      }
      results.summary.totalWarnings += validation.warnings.length;
    }

    // Test special pages
    log('\n🔍 Testing special pages...', 'blue');
    results.specialPages = await checkSpecialPages(url);

    // Determine overall status
    results.summary.status = results.summary.totalViolations === 0 ? 'PASS' : 'FAIL';

    // Console output
    log('\n🛡️ Security Headers Analysis', 'blue');
    log('='.repeat(50), 'blue');
    
    log(`\nTotal Pages Tested: ${results.summary.totalPages}`);
    log(`Pages with Violations: ${results.summary.pagesWithViolations}`);
    log(`Total Violations: ${results.summary.totalViolations}`);
    log(`Total Warnings: ${results.summary.totalWarnings}`);

    // Show violations
    if (results.summary.totalViolations > 0) {
      log('\n❌ Security Header Violations:', 'red');
      results.pages.forEach(page => {
        if (page.validation?.violations.length > 0) {
          page.validation.violations.forEach((violation: any) => {
            log(`  • ${page.path} - ${violation.header}: ${violation.message}`, 'red');
          });
        }
      });
    }

    // Show warnings
    if (results.summary.totalWarnings > 0) {
      log('\n⚠️ Security Header Warnings:', 'yellow');
      results.pages.forEach(page => {
        if (page.validation?.warnings.length > 0) {
          page.validation.warnings.forEach((warning: any) => {
            log(`  • ${page.path} - ${warning.header}: ${warning.message}`, 'yellow');
          });
        }
      });
    }

    // Show special pages status
    log('\n📄 Special Pages:', 'blue');
    results.specialPages.forEach(page => {
      const status = page.success ? '✅' : '❌';
      log(`  ${status} ${page.path} (${page.description}): ${page.status}`, page.success ? 'green' : 'red');
    });

    if (results.summary.status === 'PASS') {
      log('\n✅ All security headers are properly configured!', 'green');
    } else {
      log('\n❌ Security headers verification failed!', 'red');
    }

    // Save report
    const reportPath = join(ARTIFACTS_DIR, 'headers_verification.json');
    writeFileSync(reportPath, JSON.stringify(results, null, 2));
    log(`\n📄 Report saved to: ${reportPath}`);

    // Exit with error code if there are violations
    if (results.summary.status === 'FAIL') {
      process.exit(1);
    }

    process.exit(0);

  } catch (error) {
    log(`\n❌ Security headers verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

main();