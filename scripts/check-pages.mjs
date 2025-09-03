import { fetch } from 'undici';
import * as cheerio from 'cheerio';

const HOST = process.env.HOST || 'http://localhost:3000';
const PAGES = [
  '/locations',
  '/locations/koramangala',
  '/locations/whitefield',
  '/locations/indiranagar',
];

function textLen(s) {
  return (s || '').trim().length;
}

console.log(`🔍 Checking ${PAGES.length} pages for navbar, footer, and SEO elements...`);

let totalProblems = 0;

for (const p of PAGES) {
  console.log(`\n📄 Checking ${p}...`);

  try {
    const res = await fetch(HOST + p);
    if (!res.ok) {
      console.error(`❌ ${p} returned ${res.status}`);
      totalProblems++;
      continue;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Check for Navbar/Footer components
    const hasNav = $('nav, .navbar, [class*="navbar"], [class*="Navbar"]').length > 0;
    const hasFooter = $('footer, .footer, [class*="footer"], [class*="Footer"]').length > 0;

    // Check SEO elements
    const title = $('title').first().text();
    const desc = $('meta[name="description"]').attr('content') || '';
    const canonical = $('link[rel="canonical"]').attr('href') || '';
    const h1 = $('h1').first().text();

    const problems = [];
    if (!hasNav) problems.push('Navbar missing');
    if (!hasFooter) problems.push('Footer missing');
    if (textLen(title) < 20) problems.push(`Short <title>: "${title}"`);
    if (textLen(desc) < 60) problems.push(`Short <meta description>: "${desc}"`);
    if (!canonical) problems.push('Missing canonical');
    if (textLen(h1) < 5) problems.push(`Weak/empty H1: "${h1}"`);

    if (problems.length) {
      console.log(`❌ ${p} - ${problems.length} issues:`);
      problems.forEach((p) => console.log(`   - ${p}`));
      totalProblems += problems.length;
    } else {
      console.log(`✅ ${p} OK (title/desc/canonical/H1/nav/footer)`);
      console.log(`   Title: "${title}"`);
      console.log(`   Description: "${desc.substring(0, 80)}..."`);
      console.log(`   H1: "${h1}"`);
    }
  } catch (error) {
    console.error(`❌ Error checking ${p}:`, error.message);
    totalProblems++;
  }
}

console.log(`\n📊 Summary: ${totalProblems} total problems found`);
if (totalProblems > 0) {
  process.exitCode = 1;
} else {
  console.log('🎉 All pages passed checks!');
}
