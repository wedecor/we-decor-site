import fs from 'node:fs';
import { GENERATED_LOCATIONS } from '@/app/(site)/_data/locations.generated';

function jaccard(a: string, b: string) {
  const A = new Set(a.toLowerCase().split(/\W+/).filter(Boolean));
  const B = new Set(b.toLowerCase().split(/\W+/).filter(Boolean));
  const inter = Array.from(A).filter((x) => B.has(x)).length;
  const uni = new Set([...Array.from(A), ...Array.from(B)]).size;
  return uni ? inter / uni : 0;
}

function run() {
  console.log('🔍 Checking content uniqueness across all localities...');

  const pairs = [];
  let totalComparisons = 0;

  for (let i = 0; i < GENERATED_LOCATIONS.length; i++) {
    for (let j = i + 1; j < GENERATED_LOCATIONS.length; j++) {
      totalComparisons++;
      const s = jaccard(GENERATED_LOCATIONS[i].bodyCopy, GENERATED_LOCATIONS[j].bodyCopy);
      if (s > 0.8) {
        pairs.push([
          GENERATED_LOCATIONS[i].slug,
          GENERATED_LOCATIONS[j].slug,
          Number(s.toFixed(3)),
        ]);
      }
    }
  }

  // Create reports directory
  fs.mkdirSync('reports/seo', { recursive: true });

  // Generate similarity report
  const report = {
    generated: new Date().toISOString(),
    totalLocalities: GENERATED_LOCATIONS.length,
    totalComparisons,
    flaggedPairs: pairs,
    summary: {
      highSimilarity: pairs.length,
      uniqueContent: GENERATED_LOCATIONS.length - pairs.length,
      uniquenessScore: Math.round(
        ((GENERATED_LOCATIONS.length - pairs.length) / GENERATED_LOCATIONS.length) * 100
      ),
    },
  };

  fs.writeFileSync('reports/seo/similarity-summary.json', JSON.stringify(report, null, 2));

  // Console output
  console.log(`\n📊 Content Uniqueness Report:`);
  console.log(`   Total localities: ${GENERATED_LOCATIONS.length}`);
  console.log(`   Total comparisons: ${totalComparisons}`);
  console.log(`   High similarity pairs (>80%): ${pairs.length}`);
  console.log(`   Uniqueness score: ${report.summary.uniquenessScore}%`);

  if (pairs.length > 0) {
    console.log(`\n⚠️  FLAGGED PAIRS (High Similarity):`);
    pairs.forEach(([a, b, score]) => {
      console.log(`   ${a} ↔ ${b}: ${(Number(score) * 100).toFixed(1)}% similar`);
    });
    console.log(`\n❌ Content uniqueness check FAILED. Please review flagged pairs.`);
    process.exit(1);
  } else {
    console.log(`\n✅ Content uniqueness check PASSED! All localities have unique content.`);
  }

  // Additional content analysis
  const wordCounts = GENERATED_LOCATIONS.map((l) => ({
    slug: l.slug,
    name: l.name,
    bodyWords: l.bodyCopy.split(/\s+/).length,
    faqCount: l.uniqueFAQ?.length || 0,
  }));

  const avgBodyWords = Math.round(
    wordCounts.reduce((sum, l) => sum + l.bodyWords, 0) / wordCounts.length
  );
  const avgFaqs = Math.round(
    wordCounts.reduce((sum, l) => sum + l.faqCount, 0) / wordCounts.length
  );

  console.log(`\n📝 Content Quality Metrics:`);
  console.log(`   Average body copy: ${avgBodyWords} words`);
  console.log(`   Average FAQs per locality: ${avgFaqs}`);

  // Save detailed analysis
  const analysis = {
    ...report,
    contentAnalysis: {
      wordCounts,
      averages: { bodyWords: avgBodyWords, faqs: avgFaqs },
    },
  };

  fs.writeFileSync('reports/seo/content-analysis.json', JSON.stringify(analysis, null, 2));
  console.log(`\n📁 Reports saved to:`);
  console.log(`   reports/seo/similarity-summary.json`);
  console.log(`   reports/seo/content-analysis.json`);
}

run();
