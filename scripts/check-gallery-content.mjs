import { fetch } from 'undici';
import { readFile } from 'node:fs/promises';

const HOST = process.env.HOST || 'http://localhost:3000';

console.log('🔍 Checking gallery content and word count on area pages...');

try {
  // Get all area slugs from locations.ts
  const areasTs = await readFile('app/(site)/_data/locations.ts', 'utf8');
  const slugs = [...areasTs.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]);

  console.log(`📋 Found ${slugs.length} areas to check...`);

  let totalProblems = 0;
  let checkedPages = 0;

  for (const slug of slugs.slice(0, 5)) {
    // Check first 5 for demo
    const url = `${HOST}/locations/${slug}`;
    console.log(`\n📄 Checking ${url}...`);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`❌ ${slug} returned ${res.status}`);
        totalProblems++;
        continue;
      }

      const html = await res.text();

      // Check for gallery section
      const hasGallery =
        html.includes('Recent Setups in') && html.includes('Browse our recent setups across');
      const hasGalleryImages = html.includes(
        'group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200'
      );

      // Check for localized content - look for actual patterns in the minified HTML
      const hasLocalizedAlt = html.includes(', Bengaluru') && html.includes('decoration');
      const hasLocalizedCaption = html.includes('— ') && html.includes('(');

      // Check for internal links
      const hasServicesLink = html.includes('href="/services"');
      const hasNearbyLink = html.includes('Also serving');

      // Count visible text (rough estimate)
      const textContent = html
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const wordCount = textContent.split(' ').length;

      const problems = [];
      if (!hasGallery) problems.push('Missing gallery section');
      if (!hasGalleryImages) problems.push('Missing gallery images');
      if (!hasLocalizedAlt) problems.push('Missing localized alt text');
      if (!hasLocalizedCaption) problems.push('Missing localized captions');
      if (!hasServicesLink) problems.push('Missing services link');
      if (!hasNearbyLink) problems.push('Missing nearby area link');
      if (wordCount < 200) problems.push(`Low word count: ${wordCount} words`);

      if (problems.length) {
        console.log(`❌ ${slug} - ${problems.length} issues:`);
        problems.forEach((p) => console.log(`   - ${p}`));
        totalProblems += problems.length;
      } else {
        console.log(`✅ ${slug} OK (gallery, localization, links, ${wordCount} words)`);
      }

      checkedPages++;
    } catch (error) {
      console.error(`❌ Error checking ${slug}:`, error.message);
      totalProblems++;
    }
  }

  console.log(`\n📊 Summary: ${totalProblems} total problems found across ${checkedPages} pages`);
  if (totalProblems > 0) {
    process.exitCode = 1;
  } else {
    console.log('🎉 All checked pages passed gallery content verification!');
  }
} catch (error) {
  console.error('❌ Error reading locations.ts:', error.message);
  process.exit(1);
}
