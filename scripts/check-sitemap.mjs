import { fetch } from 'undici';
import * as cheerio from 'cheerio';
import { readFile } from 'node:fs/promises';

const HOST = process.env.HOST || 'http://localhost:3000';

console.log(`🔍 Checking sitemap.xml at ${HOST}/sitemap.xml...`);

try {
  const res = await fetch(`${HOST}/sitemap.xml`);
  if (!res.ok) {
    console.error('❌ sitemap.xml not reachable', res.status);
    process.exit(1);
  }

  const xml = await res.text();
  const $ = cheerio.load(xml, { xmlMode: true });
  const locs = $('url > loc')
    .map((_, el) => $(el).text())
    .get();

  console.log(`📊 Found ${locs.length} total URLs in sitemap`);

  // Extract location URLs
  const locationUrls = locs.filter((l) => l.includes('/locations/'));
  console.log(`📍 Found ${locationUrls.length} location URLs in sitemap`);

  // Try to parse locations.ts to get expected area slugs
  let areas;
  try {
    const ts = await readFile('app/(site)/_data/locations.ts', 'utf8');
    areas = [...ts.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]);
    console.log(`📋 Expected areas from locations.ts: ${areas.length} areas`);
  } catch (error) {
    console.log('⚠️ Could not parse locations.ts; falling back to presence of /locations/');
    areas = null;
  }

  if (areas && areas.length) {
    const missing = areas.filter(
      (slug) =>
        !locs.some((l) => l.endsWith(`/locations/${slug}`) || l.endsWith(`/locations/${slug}/`))
    );

    if (missing.length) {
      console.error('❌ Missing in sitemap:', missing);
      console.error('   Expected URLs:');
      missing.forEach((slug) => console.error(`     ${HOST}/locations/${slug}`));
      process.exit(1);
    }

    console.log(`✅ Sitemap contains all ${areas.length} expected location URLs`);

    // Show some examples
    const sampleUrls = locationUrls.slice(0, 5);
    console.log('   Sample location URLs:');
    sampleUrls.forEach((url) => console.log(`     ${url}`));
    if (locationUrls.length > 5) {
      console.log(`     ... and ${locationUrls.length - 5} more`);
    }
  } else {
    console.log(`ℹ️ Found ${locationUrls.length} /locations/ URLs in sitemap`);
    if (locationUrls.length > 0) {
      console.log('   Sample URLs:');
      locationUrls.slice(0, 5).forEach((url) => console.log(`     ${url}`));
    }
  }
} catch (error) {
  console.error('❌ Error checking sitemap:', error.message);
  process.exit(1);
}
