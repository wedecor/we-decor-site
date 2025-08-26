import { fetch } from 'undici';
import * as cheerio from 'cheerio';

const HOST = process.env.HOST || 'http://localhost:3000';
const page = process.env.PAGE || '/locations';

console.log(`🔍 Checking links on ${HOST}${page}...`);

const res = await fetch(HOST + page, { redirect: 'manual' });
if (!res.ok) {
  console.error(`❌ ${page} returned ${res.status}`);
  process.exit(1);
}

const html = await res.text();
const $ = cheerio.load(html);
const links = [...new Set($('a[href]').map((_, el) => $(el).attr('href')).get())]
  .filter(h => !h.startsWith('mailto:') && !h.startsWith('tel:') && !h.startsWith('#') && !h.includes('instagram.com'));

console.log(`📊 Found ${links.length} links to check...`);

let fails = 0;
let checked = 0;

for (const href of links) {
  const url = href.startsWith('http') ? href : HOST + href;
  try {
    const r = await fetch(url, { redirect: 'manual' });
    if (r.status >= 400) {
      console.log(`⚠️  ${href} → ${r.status}`);
      fails++;
    }
    checked++;
    if (checked % 10 === 0) {
      console.log(`   Progress: ${checked}/${links.length} links checked...`);
    }
  } catch (e) {
    console.log(`⚠️  ${href} → error: ${e.message}`);
    fails++;
    checked++;
  }
}

if (fails) {
  console.error(`❌ Broken/failed links: ${fails}`);
  process.exit(1);
} else {
  console.log(`✅ No broken links on ${page} (${links.length} checked)`);
} 