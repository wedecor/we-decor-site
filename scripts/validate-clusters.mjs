import { readFile } from 'node:fs/promises';

console.log('🔍 Validating cluster areaSlugs against AREAS...');

try {
  const areasTs = await readFile('app/(site)/_data/locations.ts', 'utf8');
  const clustersTs = await readFile('app/(site)/_data/clusters.ts', 'utf8');

  // Extract slugs from locations.ts (using double quotes pattern)
  const slugs = new Set([...areasTs.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]));
  console.log(`📋 Found ${slugs.size} areas in locations.ts`);

  // Extract areaSlugs from clusters.ts
  const wanted = [...clustersTs.matchAll(/areaSlugs:\s*\[([\s\S]*?)\]/g)].flatMap((m) =>
    [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1])
  );

  console.log(`🎯 Found ${wanted.length} areaSlugs in clusters.ts`);

  // Check for missing slugs
  const missing = wanted.filter((s) => !slugs.has(s));

  if (missing.length) {
    console.error('❌ areaSlugs not found in AREAS:', missing);
    console.error('\n💡 These slugs need to be added to locations.ts or removed from clusters.ts');
    process.exit(1);
  }

  console.log('✅ All cluster areaSlugs exist in AREAS');

  // Show some stats
  const usedSlugs = new Set(wanted);
  const unusedSlugs = [...slugs].filter((s) => !usedSlugs.has(s));

  console.log(`\n📊 Coverage Summary:`);
  console.log(`   - Total areas: ${slugs.size}`);
  console.log(`   - Used in clusters: ${usedSlugs.size}`);
  console.log(`   - Unused areas: ${unusedSlugs.length}`);

  if (unusedSlugs.length > 0) {
    console.log(`\nℹ️  Unused areas (not in any cluster):`);
    unusedSlugs.slice(0, 10).forEach((slug) => console.log(`   - ${slug}`));
    if (unusedSlugs.length > 10) {
      console.log(`   ... and ${unusedSlugs.length - 10} more`);
    }
  }
} catch (error) {
  console.error('❌ Error validating clusters:', error.message);
  process.exit(1);
}
