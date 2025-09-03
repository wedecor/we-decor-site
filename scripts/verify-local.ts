#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { SITE_URL } from '../lib/site';

console.log('🔍 Local Verification for PR\n');

// Check 1: Build
console.log('1️⃣  Checking build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful\n');
} catch (error) {
  console.log('❌ Build failed');
  process.exit(1);
}

// Check 2: No wedecor.in references
console.log('2️⃣  Checking for wedecor.in references...');
try {
  const result = execSync(
    'grep -R "wedecor\\.in" -n . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next || true',
    {
      encoding: 'utf8',
    }
  );

  if (result.trim()) {
    console.log('❌ Found wedecor.in references:');
    console.log(result);
    process.exit(1);
  } else {
    console.log('✅ No wedecor.in references found\n');
  }
} catch (error) {
  console.log('✅ No wedecor.in references found\n');
}

// Check 3: Local sitemap verification
console.log('3️⃣  Verifying local sitemap...');
try {
  execSync('BASE_URL=http://localhost:3000 npm run verify:sitemap', { stdio: 'inherit' });
  console.log('✅ Local sitemap verification passed\n');
} catch (error) {
  console.log('❌ Local sitemap verification failed');
  console.log('💡 Make sure to run: npm run start & (in another terminal)');
  process.exit(1);
}

// Check 4: Cache headers in next.config.js
console.log('4️⃣  Checking cache headers in next.config.js...');
try {
  const config = execSync('cat next.config.js', { encoding: 'utf8' });
  if (config.includes('Cache-Control') && config.includes('sitemap.xml')) {
    console.log('✅ Cache headers found for sitemap.xml');
  } else {
    console.log('❌ Cache headers missing for sitemap.xml');
    process.exit(1);
  }

  if (config.includes('Cache-Control') && config.includes('robots.txt')) {
    console.log('✅ Cache headers found for robots.txt\n');
  } else {
    console.log('❌ Cache headers missing for robots.txt');
    process.exit(1);
  }
} catch (error) {
  console.log('❌ Could not read next.config.js');
  process.exit(1);
}

// Check 5: Robots.txt format
console.log('5️⃣  Checking robots.txt format...');
try {
  const robots = execSync('cat app/robots.ts', { encoding: 'utf8' });
  if (robots.includes('sitemap:') && robots.includes('SITE_URL')) {
    console.log('✅ Robots.ts points to canonical sitemap\n');
  } else {
    console.log('❌ Robots.ts format incorrect');
    process.exit(1);
  }
} catch (error) {
  console.log('❌ Could not read app/robots.ts');
  process.exit(1);
}

console.log('🎉 All local checks passed! Ready for PR.');
console.log('\n📋 Next steps:');
console.log('1. Create PR on GitHub');
console.log('2. Ensure CI workflow passes (will skip prod checks on PR)');
console.log('3. Merge to main when ready');
console.log('4. CI will verify production after deployment');
