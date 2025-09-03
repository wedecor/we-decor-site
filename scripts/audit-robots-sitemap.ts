#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
// Define constants directly to avoid import issues
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wedecorevents.com';

interface AuditResult {
  passed: boolean;
  message: string;
  details?: string;
}

async function auditRobotsAndSitemap(): Promise<void> {
  console.log('🔍 Robots.txt and Sitemap Audit\n');

  const results: Record<string, AuditResult> = {};

  // Check if robots.txt exists
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    results.robots_exists = {
      passed: false,
      message: '❌ robots.txt file not found',
      details: 'Create public/robots.txt file',
    };
  } else {
    results.robots_exists = {
      passed: true,
      message: '✅ robots.txt file exists',
    };

    // Check robots.txt content
    try {
      const robotsContent = fs.readFileSync(robotsPath, 'utf8');

      // Check for sitemap directive
      if (!robotsContent.includes('Sitemap:')) {
        results.robots_sitemap_directive = {
          passed: false,
          message: '❌ robots.txt missing Sitemap directive',
          details: 'Add "Sitemap: https://www.wedecorevents.com/api/sitemap.xml"',
        };
      } else {
        // Check if sitemap URL is correct
        const sitemapMatch = robotsContent.match(/Sitemap:\s*(.+)/);
        if (sitemapMatch) {
          const sitemapUrl = sitemapMatch[1].trim();
          const expectedUrl = `${SITE_URL}/api/sitemap.xml`;

          if (sitemapUrl !== expectedUrl) {
            results.robots_sitemap_url = {
              passed: false,
              message: '❌ robots.txt has incorrect sitemap URL',
              details: `Expected: ${expectedUrl}, Got: ${sitemapUrl}`,
            };
          } else {
            results.robots_sitemap_url = {
              passed: true,
              message: '✅ robots.txt has correct sitemap URL',
            };
          }
        }
      }

      // Check for user-agent directives
      if (!robotsContent.includes('User-agent:')) {
        results.robots_user_agent = {
          passed: false,
          message: '❌ robots.txt missing User-agent directive',
          details: 'Add proper User-agent and Allow/Disallow rules',
        };
      } else {
        results.robots_user_agent = {
          passed: true,
          message: '✅ robots.txt has User-agent directives',
        };
      }
    } catch (error) {
      results.robots_readable = {
        passed: false,
        message: '❌ Could not read robots.txt file',
        details: String(error),
      };
    }
  }

  // Check if sitemap API route exists
  const sitemapApiPath = path.join(process.cwd(), 'pages', 'api', 'sitemap.xml.ts');
  if (!fs.existsSync(sitemapApiPath)) {
    results.sitemap_api_exists = {
      passed: false,
      message: '❌ Sitemap API route not found',
      details: 'Create pages/api/sitemap.xml.ts',
    };
  } else {
    results.sitemap_api_exists = {
      passed: true,
      message: '✅ Sitemap API route exists',
    };

    // Check sitemap API content
    try {
      const sitemapContent = fs.readFileSync(sitemapApiPath, 'utf8');

      // Check if it uses SITE_URL
      if (!sitemapContent.includes('SITE_URL')) {
        results.sitemap_uses_site_url = {
          passed: false,
          message: '❌ Sitemap API not using SITE_URL',
          details: 'Import and use SITE_URL from lib/site.ts',
        };
      } else {
        results.sitemap_uses_site_url = {
          passed: true,
          message: '✅ Sitemap API uses SITE_URL',
        };
      }

      // Check for proper content-type header
      if (!sitemapContent.includes('Content-Type') && !sitemapContent.includes('application/xml')) {
        results.sitemap_content_type = {
          passed: false,
          message: '❌ Sitemap API missing proper content-type header',
          details: 'Set Content-Type: application/xml; charset=utf-8',
        };
      } else {
        results.sitemap_content_type = {
          passed: true,
          message: '✅ Sitemap API has proper content-type header',
        };
      }
    } catch (error) {
      results.sitemap_readable = {
        passed: false,
        message: '❌ Could not read sitemap API file',
        details: String(error),
      };
    }
  }

  // Display results
  let passedCount = 0;
  let totalCount = 0;

  for (const [key, result] of Object.entries(results)) {
    totalCount++;
    if (result.passed) passedCount++;

    console.log(`${result.message}`);
    if (result.details) {
      console.log(`   ${result.details}`);
    }
    console.log('');
  }

  // Summary
  console.log(`📊 Audit Summary: ${passedCount}/${totalCount} checks passed`);

  if (passedCount === totalCount) {
    console.log('🎉 All robots.txt and sitemap checks passed!');
    console.log('🚀 Ready for search engine discovery.');
    process.exit(0);
  } else {
    console.log('⚠️  Some checks failed. Fix before production deployment.');
    process.exit(1);
  }
}

// Run audit
auditRobotsAndSitemap().catch((error) => {
  console.error('❌ Audit failed:', error);
  process.exit(1);
});
