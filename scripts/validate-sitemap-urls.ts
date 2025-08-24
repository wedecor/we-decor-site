import https from 'https';
import http from 'http';

// Define SITE_URL directly to avoid import issues
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

function head(url: string): Promise<number> {
  return new Promise((resolve) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    
    const req = client.request(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode || 0);
    });
    req.on('error', () => resolve(0));
    req.end();
  });
}

async function main() {
  console.log('🔍 Validating sitemap URLs for 200 status codes...\n');
  
  const smUrl = `${SITE_URL}/api/sitemap.xml`;
  console.log(`📋 Fetching sitemap from: ${smUrl}`);
  
  try {
    const response = await fetch(smUrl);
    if (!response.ok) {
      console.error(`❌ Failed to fetch sitemap: ${response.status} ${response.statusText}`);
      process.exit(1);
    }
    
    const xml = await response.text();
    const locs = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
    
    console.log(`📊 Found ${locs.length} URLs to validate\n`);
    
    let failed: string[] = [];
    let checked = 0;
    
    for (const url of locs) {
      checked++;
      process.stdout.write(`\r🔍 Checking ${checked}/${locs.length}: ${url}`);
      
      // Convert production URLs to local URLs for validation
      const localUrl = url.replace('https://www.wedecorevents.com', 'http://localhost:3000');
      const code = await head(localUrl);
      
      // Skip main domain validation as it's expected to redirect
      if (url === 'https://www.wedecorevents.com') {
        console.log(`\n⏭️  ${url} -> ${code} (expected redirect)`);
        continue;
      }
      
      if (code !== 200) {
        console.error(`\n❌ ${localUrl} -> ${code}`);
        failed.push(url);
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n'); // Clear the progress line
    
    if (failed.length > 0) {
      console.error(`\n❌ ${failed.length} URL(s) are not returning 200 OK:`);
      failed.forEach(url => console.error(`   - ${url}`));
      console.error('\n🚨 Fix these URLs before deploying!');
      process.exit(1);
    } else {
      console.log('✅ All sitemap URLs return 200 OK.');
      console.log('🚀 Ready for deployment!');
    }
    
  } catch (error) {
    console.error('❌ Error validating sitemap:', error);
    process.exit(1);
  }
}

main();
