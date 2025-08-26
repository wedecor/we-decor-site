import { fetch } from 'undici';

const HOST = process.env.HOST || 'http://localhost:3000';

console.log(`🔍 Checking robots.txt at ${HOST}/robots.txt...`);

try {
  const r = await fetch(`${HOST}/robots.txt`);
  if (!r.ok) { 
    console.error('❌ robots.txt not reachable', r.status);
    process.exit(1); 
  }
  
  const text = await r.text();
  console.log('📄 robots.txt content:');
  console.log('─'.repeat(50));
  console.log(text);
  console.log('─'.repeat(50));
  
  let issues = 0;
  
  // Check for blocking all content
  if (/^\s*Disallow:\s*\/\s*$/im.test(text)) { 
    console.error('❌ robots blocks all content (Disallow: /)');
    issues++;
  }
  
  // Check for sitemap reference
  if (!/^\s*Sitemap:\s*https?:\/\//im.test(text)) { 
    console.error('⚠️ robots missing Sitemap: line');
    issues++;
  } else {
    const sitemapMatch = text.match(/^\s*Sitemap:\s*(https?:\/\/[^\s]+)/im);
    if (sitemapMatch) {
      console.log(`✅ Found Sitemap: ${sitemapMatch[1]}`);
    }
  }
  
  // Check for user-agent
  if (!/^\s*User-agent:\s*\*/im.test(text)) {
    console.log('ℹ️ No User-agent: * found (optional but recommended)');
  }
  
  // Check for any disallow rules
  const disallowRules = text.match(/^\s*Disallow:\s*(.+)$/gim);
  if (disallowRules) {
    console.log(`📋 Found ${disallowRules.length} Disallow rules:`);
    disallowRules.forEach(rule => {
      const path = rule.replace(/^\s*Disallow:\s*/i, '').trim();
      console.log(`   - ${path}`);
    });
  }
  
  if (issues === 0) {
    console.log('✅ robots.txt looks OK');
  } else {
    console.error(`❌ Found ${issues} issues with robots.txt`);
    process.exitCode = 1;
  }
  
} catch (error) {
  console.error('❌ Error checking robots.txt:', error.message);
  process.exit(1);
} 