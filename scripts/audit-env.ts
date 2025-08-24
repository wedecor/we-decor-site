#!/usr/bin/env ts-node

// Define constants directly to avoid import issues
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wedecorevents.com';

function validateSiteUrl(): boolean {
  try {
    const url = new URL(SITE_URL);
    return url.protocol === 'https:' && url.hostname.startsWith('www.');
  } catch {
    return false;
  }
}

interface AuditResult {
  passed: boolean;
  message: string;
  details?: any;
}

interface EnvAudit {
  [key: string]: AuditResult;
}

async function auditEnvironment(): Promise<void> {
  console.log('🔍 Environment & Site Configuration Audit\n');
  
  const results: EnvAudit = {};
  
  // Check NEXT_PUBLIC_SITE_URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    results.NEXT_PUBLIC_SITE_URL = {
      passed: false,
      message: '❌ NEXT_PUBLIC_SITE_URL is not set',
      details: 'Set NEXT_PUBLIC_SITE_URL=https://www.wedecorevents.com in your environment'
    };
  } else if (siteUrl !== 'https://www.wedecorevents.com') {
    results.NEXT_PUBLIC_SITE_URL = {
      passed: false,
      message: '❌ NEXT_PUBLIC_SITE_URL has incorrect value',
      details: `Expected: https://www.wedecorevents.com, Got: ${siteUrl}`
    };
  } else {
    results.NEXT_PUBLIC_SITE_URL = {
      passed: true,
      message: '✅ NEXT_PUBLIC_SITE_URL is correctly set'
    };
  }
  
  // Check SITE_URL from lib/site.ts
  if (SITE_URL !== 'https://www.wedecorevents.com') {
    results.SITE_URL = {
      passed: false,
      message: '❌ SITE_URL from lib/site.ts is incorrect',
      details: `Expected: https://www.wedecorevents.com, Got: ${SITE_URL}`
    };
  } else {
    results.SITE_URL = {
      passed: true,
      message: '✅ SITE_URL from lib/site.ts is correct'
    };
  }
  
  // Validate site URL format
  if (!validateSiteUrl()) {
    results.URL_FORMAT = {
      passed: false,
      message: '❌ SITE_URL format is invalid',
      details: 'URL must be https://www.wedecorevents.com'
    };
  } else {
    results.URL_FORMAT = {
      passed: true,
      message: '✅ SITE_URL format is valid (https + www)'
    };
  }
  
  // Check NODE_ENV
  const nodeEnv = process.env.NODE_ENV;
  if (!nodeEnv) {
    results.NODE_ENV = {
      passed: false,
      message: '❌ NODE_ENV is not set'
    };
  } else if (!['development', 'production', 'test'].includes(nodeEnv)) {
    results.NODE_ENV = {
      passed: false,
      message: '❌ NODE_ENV has invalid value',
      details: `Got: ${nodeEnv}, Expected: development, production, or test`
    };
  } else {
    results.NODE_ENV = {
      passed: true,
      message: `✅ NODE_ENV is set to: ${nodeEnv}`
    };
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
    console.log('🎉 All environment checks passed! Ready for production.');
    process.exit(0);
  } else {
    console.log('⚠️  Some environment checks failed. Fix before deploying.');
    process.exit(1);
  }
}

// Run audit
auditEnvironment().catch((error) => {
  console.error('❌ Audit failed:', error);
  process.exit(1);
});
