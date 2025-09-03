#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { SITE_URL } from '../lib/site';

interface LighthouseScore {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

interface LighthouseResult {
  url: string;
  scores: LighthouseScore;
  passed: boolean;
  details: string;
}

async function runLighthouseAudit(): Promise<void> {
  console.log('🏗️  Lighthouse Performance Audit\n');
  console.log(`🌐 Auditing: ${SITE_URL}\n`);

  // Check if Lighthouse CI is installed
  try {
    execSync('lhci --version', { stdio: 'pipe' });
  } catch (error) {
    console.log('⚠️  Lighthouse CI not installed. Installing...');
    try {
      execSync('npm install -g @lhci/cli', { stdio: 'pipe' });
      console.log('✅ Lighthouse CI installed successfully\n');
    } catch (installError) {
      console.log('❌ Failed to install Lighthouse CI');
      console.log('💡 You can install it manually with: npm install -g @lhci/cli');
      console.log('💡 Or run individual audits with: npm run audit:performance');
      process.exit(1);
    }
  }

  const results: LighthouseResult[] = [];

  // Define audit targets
  const auditTargets = [
    { url: '/', name: 'Homepage' },
    { url: '/services', name: 'Services Page' },
    { url: '/locations', name: 'Locations Page' },
    { url: '/contact', name: 'Contact Page' },
    { url: '/gallery', name: 'Gallery Page' },
  ];

  console.log('🔍 Running Lighthouse audits...\n');

  for (const target of auditTargets) {
    console.log(`📊 Auditing ${target.name}...`);

    try {
      const fullUrl = `${SITE_URL}${target.url}`;

      // Run Lighthouse audit
      const output = execSync(`lhci autorun --url="${fullUrl}" --collect.numberOfRuns=1`, {
        stdio: 'pipe',
        encoding: 'utf8',
      });

      // Parse scores from output
      const scores = parseLighthouseScores(output);

      // Check if scores meet minimum thresholds
      const passed =
        scores.performance >= 70 &&
        scores.accessibility >= 90 &&
        scores.bestPractices >= 80 &&
        scores.seo >= 80;

      results.push({
        url: fullUrl,
        scores,
        passed,
        details: passed
          ? 'All scores meet minimum thresholds'
          : 'Some scores below minimum thresholds',
      });

      console.log(`   Performance: ${scores.performance}/100`);
      console.log(`   Accessibility: ${scores.accessibility}/100`);
      console.log(`   Best Practices: ${scores.bestPractices}/100`);
      console.log(`   SEO: ${scores.seo}/100`);
      console.log(`   Status: ${passed ? '✅ PASS' : '❌ FAIL'}\n`);
    } catch (error) {
      console.log(`   ❌ Failed to audit ${target.name}: ${error}`);
      results.push({
        url: `${SITE_URL}${target.url}`,
        scores: { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 },
        passed: false,
        details: `Audit failed: ${error}`,
      });
    }
  }

  // Display Results
  console.log('📊 Lighthouse Audit Results\n');
  console.log('='.repeat(80));

  let passedCount = 0;
  let totalCount = results.length;

  for (const result of results) {
    const status = result.passed ? '✅' : '❌';
    const url = new URL(result.url).pathname;
    console.log(`${status} ${url}`);
    console.log(`   Performance: ${result.scores.performance}/100`);
    console.log(`   Accessibility: ${result.scores.accessibility}/100`);
    console.log(`   Best Practices: ${result.scores.bestPractices}/100`);
    console.log(`   SEO: ${result.scores.seo}/100`);
    console.log(`   Details: ${result.details}`);
    console.log('');

    if (result.passed) passedCount++;
  }

  console.log('='.repeat(80));
  console.log(
    `📈 Overall Score: ${passedCount}/${totalCount} (${Math.round((passedCount / totalCount) * 100)}%)`
  );

  // Performance recommendations
  console.log('\n💡 Performance Recommendations:');
  console.log('   • Ensure images are optimized and use WebP format');
  console.log('   • Minimize JavaScript bundle size');
  console.log('   • Use Next.js Image component for automatic optimization');
  console.log('   • Implement proper caching strategies');
  console.log('   • Consider using a CDN for static assets');

  if (passedCount === totalCount) {
    console.log('\n🎉 All pages meet performance standards!');
    console.log('🚀 Your website is optimized for speed and user experience.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some pages need performance improvements.');
    console.log('🔧 Review the detailed reports and optimize accordingly.');
    process.exit(1);
  }
}

function parseLighthouseScores(output: string): LighthouseScore {
  // Default scores if parsing fails
  const defaultScores: LighthouseScore = {
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
  };

  try {
    // Look for score patterns in the output
    const performanceMatch = output.match(/Performance:\s*(\d+)/);
    const accessibilityMatch = output.match(/Accessibility:\s*(\d+)/);
    const bestPracticesMatch = output.match(/Best Practices:\s*(\d+)/);
    const seoMatch = output.match(/SEO:\s*(\d+)/);

    return {
      performance: performanceMatch ? parseInt(performanceMatch[1]) : 0,
      accessibility: accessibilityMatch ? parseInt(accessibilityMatch[1]) : 0,
      bestPractices: bestPracticesMatch ? parseInt(bestPracticesMatch[1]) : 0,
      seo: seoMatch ? parseInt(seoMatch[1]) : 0,
    };
  } catch (error) {
    console.warn('⚠️  Could not parse Lighthouse scores, using defaults');
    return defaultScores;
  }
}

// Run Lighthouse audit
runLighthouseAudit().catch((error) => {
  console.error('❌ Lighthouse audit failed:', error);
  process.exit(1);
});
