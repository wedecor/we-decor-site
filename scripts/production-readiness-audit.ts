#!/usr/bin/env ts-node

import { execSync } from 'child_process';
// Define constants directly to avoid import issues
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wedecorevents.com';

interface AuditResult {
  name: string;
  passed: boolean;
  message: string;
  details?: string;
}

async function runProductionReadinessAudit(): Promise<void> {
  console.log('🚀 Production Readiness Audit for We Decor Website\n');
  console.log(`🌐 Target Domain: ${SITE_URL}\n`);
  
  const results: AuditResult[] = [];
  
  // 1. Environment Variables Audit
  console.log('1️⃣  Checking Environment Variables...');
  try {
    execSync('npm run audit:env', { stdio: 'pipe' });
    results.push({
      name: 'Environment Variables',
      passed: true,
      message: '✅ All environment variables are properly configured'
    });
  } catch (error) {
    results.push({
      name: 'Environment Variables',
      passed: false,
      message: '❌ Environment variables have issues',
      details: 'Run "npm run audit:env" for details'
    });
  }
  
  // 2. Vercel.app References Audit
  console.log('2️⃣  Checking for .vercel.app References...');
  try {
    execSync('npm run audit:vercel', { stdio: 'pipe' });
    results.push({
      name: 'Vercel.app References',
      passed: true,
      message: '✅ No .vercel.app references found'
    });
  } catch (error) {
    results.push({
      name: 'Vercel.app References',
      passed: false,
      message: '❌ .vercel.app references found',
      details: 'Run "npm run audit:vercel" for details'
    });
  }
  
  // 3. SEO Tags Audit
  console.log('3️⃣  Checking SEO Tags and Canonical URLs...');
  try {
    execSync('npm run audit:seo', { stdio: 'pipe' });
    results.push({
      name: 'SEO Tags',
      passed: true,
      message: '✅ All SEO tags are properly configured'
    });
  } catch (error) {
    results.push({
      name: 'SEO Tags',
      passed: false,
      message: '❌ SEO tag issues found',
      details: 'Run "npm run audit:seo" for details'
    });
  }
  
  // 4. Robots.txt and Sitemap Audit
  console.log('4️⃣  Checking Robots.txt and Sitemap...');
  try {
    execSync('npm run audit:robots', { stdio: 'pipe' });
    results.push({
      name: 'Robots.txt & Sitemap',
      passed: true,
      message: '✅ Robots.txt and sitemap are properly configured'
    });
  } catch (error) {
    results.push({
      name: 'Robots.txt & Sitemap',
      passed: false,
      message: '❌ Robots.txt or sitemap issues found',
      details: 'Run "npm run audit:robots" for details'
    });
  }
  
  // 5. Structured Data Audit
  console.log('5️⃣  Checking Structured Data and Meta Tags...');
  try {
    execSync('npm run audit:structured-data', { stdio: 'pipe' });
    results.push({
      name: 'Structured Data',
      passed: true,
      message: '✅ All structured data is properly configured'
    });
  } catch (error) {
    results.push({
      name: 'Structured Data',
      passed: false,
      message: '❌ Structured data issues found',
      details: 'Run "npm run audit:structured-data" for details'
    });
  }
  
  // 6. Internal Links Audit
  console.log('6️⃣  Checking Internal Links...');
  try {
    execSync('npm run audit:links', { stdio: 'pipe' });
    results.push({
      name: 'Internal Links',
      passed: true,
      message: '✅ All internal links are properly formatted'
    });
  } catch (error) {
    results.push({
      name: 'Internal Links',
      passed: false,
      message: '❌ Internal link issues found',
      details: 'Run "npm run audit:links" for details'
    });
  }
  
  // 7. Sitemap URL Validation
  console.log('7️⃣  Validating Sitemap URLs...');
  try {
    execSync('npm run predeploy:validate', { stdio: 'pipe' });
    results.push({
      name: 'Sitemap URLs',
      passed: true,
      message: '✅ All sitemap URLs return 200 OK'
    });
  } catch (error) {
    results.push({
      name: 'Sitemap URLs',
      passed: false,
      message: '❌ Some sitemap URLs have issues',
      details: 'Run "npm run predeploy:validate" for details'
    });
  }
  
  // 8. Build Test
  console.log('8️⃣  Testing Build Process...');
  try {
    execSync('npm run build', { stdio: 'pipe' });
    results.push({
      name: 'Build Process',
      passed: true,
      message: '✅ Build process completes successfully'
    });
  } catch (error) {
    results.push({
      name: 'Build Process',
      passed: false,
      message: '❌ Build process fails',
      details: 'Run "npm run build" for details'
    });
  }
  
  // Display Results
  console.log('\n📊 Production Readiness Audit Results\n');
  console.log('='.repeat(60));
  
  let passedCount = 0;
  let totalCount = results.length;
  
  for (const result of results) {
    const status = result.passed ? '✅' : '❌';
    console.log(`${status} ${result.name}`);
    console.log(`   ${result.message}`);
    if (result.details) {
      console.log(`   💡 ${result.details}`);
    }
    console.log('');
    
    if (result.passed) passedCount++;
  }
  
  console.log('='.repeat(60));
  console.log(`📈 Overall Score: ${passedCount}/${totalCount} (${Math.round((passedCount/totalCount)*100)}%)`);
  
  if (passedCount === totalCount) {
    console.log('\n🎉 CONGRATULATIONS! Your website is production-ready!');
    console.log('🚀 You can deploy with confidence.');
    console.log('🔍 Remember to run these audits before each deployment.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some checks failed. Please fix the issues before deploying.');
    console.log('🔧 Run individual audit commands for detailed information:');
    console.log('   npm run audit:env          - Environment variables');
    console.log('   npm run audit:vercel       - Vercel.app references');
    console.log('   npm run audit:seo          - SEO tags');
    console.log('   npm run audit:robots       - Robots.txt & sitemap');
    console.log('   npm run audit:structured-data - Structured data');
    console.log('   npm run audit:links        - Internal links');
    console.log('   npm run predeploy:validate - Sitemap URLs');
    console.log('   npm run build              - Build process');
    process.exit(1);
  }
}

// Run comprehensive audit
runProductionReadinessAudit().catch((error) => {
  console.error('❌ Production readiness audit failed:', error);
  process.exit(1);
});
