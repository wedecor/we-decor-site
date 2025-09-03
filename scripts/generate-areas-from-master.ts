#!/usr/bin/env ts-node

import { promises as fs } from 'fs';
import path from 'path';

function getSection(src: string, label: string, nextLabels: string[]): string {
  // Build a "stop" alternation like: ^(SERVICES:|WHY:|NEARBY:|FAQ:|CASE STUDY:|CTA:)\s*$
  const stop = nextLabels.length
    ? `^(${nextLabels.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')}):\\s*$`
    : `$^`; // matches nothing

  // For sections that should always be multi-line (contain newlines), only try multi-line format
  const multiLineOnlySections = ['INTRO', 'SERVICES', 'WHY', 'FAQ', 'CASE STUDY', 'CTA'];

  if (multiLineOnlySections.includes(label)) {
    // For FAQ specifically, use a more robust pattern that captures until the next section header
    if (label === 'FAQ') {
      const faqRe = new RegExp(
        String.raw`(?:^|\n)FAQ:\s*\r?\n([\s\S]*?)(?=\r?\n(?:^CASE STUDY:|^CTA:)\s*$)`,
        'm'
      );

      if (process.argv.includes('--debug')) {
        console.log(`[DEBUG] FAQ regex pattern:`, faqRe.source);
        console.log(
          `[DEBUG] FAQ source block preview:`,
          src.substring(src.indexOf('FAQ:'), src.indexOf('FAQ:') + 200)
        );
      }

      const m = src.match(faqRe);
      if (m) {
        if (process.argv.includes('--debug')) {
          console.log(`[DEBUG] FAQ match found, length:`, m[1].length);
          console.log(`[DEBUG] FAQ match preview:`, m[1].substring(0, 100));
        }
        return m[1].trim();
      }

      if (process.argv.includes('--debug')) {
        console.log(`[DEBUG] FAQ no match found`);
      }
      return '';
    }

    // For other multi-line sections, use the standard pattern
    const multiLineRe = new RegExp(
      String.raw`(?:^|\n)${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\s*\r?\n([\s\S]*?)(?=\r?\n${stop}|\r?\n?$)`,
      'm'
    );

    const m = src.match(multiLineRe);
    if (m) return m[1].trim();
    return '';
  }

  // For sections that might be single-line (like NEARBY), try both formats
  // First try: multi-line format (LABEL:\ncontent)
  const multiLineRe = new RegExp(
    String.raw`(?:^|\n)${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\s*\r?\n([\s\S]*?)(?=\r?\n${stop}|\r?\n?$)`,
    'm'
  );

  let m = src.match(multiLineRe);
  if (m) return m[1].trim();

  // Second try: single-line format (LABEL: content)
  const singleLineRe = new RegExp(
    String.raw`(?:^|\n)${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\s*([^\n]*?)(?=\r?\n${stop}|\r?\n?$)`,
    'm'
  );

  m = src.match(singleLineRe);
  if (m) return m[1].trim();

  return '';
}

function stripHeaderPrefix(s: string, label: string) {
  return s.replace(new RegExp(`^\\s*${label}:\\s*`, 'i'), '').trim();
}

interface LocalityData {
  title: string;
  meta: string;
  intro: string;
  services: string;
  why: string;
  nearby: string;
  faq: string;
  caseStudy: string;
  cta: string;
  locality: string;
}

function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function parseLocalityBlock(block: string): LocalityData | null {
  try {
    // Extract locality name from the header first
    const localityMatch = block.match(/=== LOCALITY: (.+?) ===/);
    if (!localityMatch) {
      console.warn(`⚠️  Could not extract locality name from block`);
      return null;
    }

    const data: Partial<LocalityData> = {
      locality: localityMatch[1].trim(),
    };

    // Use the robust getSection helper for all sections
    const TITLE = (block.match(/^TITLE:\s*(.+)$/m)?.[1] || '').trim();
    const META = (block.match(/^META:\s*(.+)$/m)?.[1] || '').trim();

    const INTRO = getSection(block, 'INTRO', [
      'SERVICES',
      'WHY',
      'NEARBY',
      'FAQ',
      'CASE STUDY',
      'CTA',
    ]);
    const SERVICES = getSection(block, 'SERVICES', ['WHY', 'NEARBY', 'FAQ', 'CASE STUDY', 'CTA']);
    const WHY = getSection(block, 'WHY', ['NEARBY', 'FAQ', 'CASE STUDY', 'CTA']);
    const NEARBY = getSection(block, 'NEARBY', ['FAQ', 'CASE STUDY', 'CTA']);
    const FAQ = getSection(block, 'FAQ', ['CASE STUDY', 'CTA']);
    const CASE_STUDY = getSection(block, 'CASE STUDY', ['CTA']);
    const CTA = getSection(block, 'CTA', []);

    // Assign to data object
    data.title = TITLE;
    data.meta = META;
    data.intro = INTRO;
    data.services = SERVICES;
    data.why = WHY;
    data.nearby = NEARBY;
    data.faq = FAQ;
    data.caseStudy = CASE_STUDY;
    data.cta = CTA;

    // Add debug output if --debug flag is present
    if (process.argv.includes('--debug')) {
      console.log('[DEBUG] Sample extraction:');
      console.log('INTRO:', INTRO.slice(0, 80));
      console.log('SERVICES:', SERVICES.slice(0, 80));
      console.log('WHY:', WHY.slice(0, 80));
      console.log('NEARBY:', NEARBY.slice(0, 80));
      console.log('FAQ:', FAQ.slice(0, 80));
      console.log('FAQ length:', FAQ.length);
      console.log('FAQ contains newlines:', FAQ.includes('\n'));
      console.log('CASE_STUDY:', CASE_STUDY.slice(0, 80));
      console.log('CTA:', CTA.slice(0, 80));
    }

    // Validate that we have all required fields
    if (
      !data.title ||
      !data.meta ||
      !data.intro ||
      !data.services ||
      !data.why ||
      !data.nearby ||
      !data.faq ||
      !data.caseStudy ||
      !data.cta ||
      !data.locality
    ) {
      console.warn(`⚠️  Missing required fields for locality: ${data.locality || 'Unknown'}`);
      console.warn(
        `   Missing: ${Object.entries(data)
          .filter(([k, v]) => !v)
          .map(([k]) => k)
          .join(', ')}`
      );
      return null;
    }

    return data as LocalityData;
  } catch (error) {
    console.error(`❌ Error parsing locality block:`, error);
    return null;
  }
}

function generateMDXContent(data: LocalityData): string {
  return `---
title: "${data.title}"
description: "${data.meta}"
---

import { ContactCard } from "@/components/areas/ContactCard"
import { GalleryStrip } from "@/components/areas/GalleryStrip"

# ${data.locality}

## Introduction
${data.intro}

## Services We Offer in ${data.locality}
${data.services}

## Why Choose Us
${data.why}

## Nearby Areas
${data.nearby}

## FAQs
${data.faq}

## Case Study
${data.caseStudy}

<ContactCard />
<GalleryStrip locality="${data.locality}" />
`;
}

async function generateAreasFromMaster(): Promise<void> {
  try {
    console.log('🔄 Starting area generation from master file...');

    // Read the master file
    const masterFilePath = path.join(
      __dirname,
      '../content/we_decor_bangalore_localities_full.txt'
    );
    const content = await fs.readFile(masterFilePath, 'utf-8');

    // Split by locality delimiter and filter out empty blocks
    const localityBlocks = content.split('=== LOCALITY:').filter((block) => block.trim());

    console.log(`📁 Found ${localityBlocks.length} locality blocks to process...`);

    // Ensure the areas directory exists
    const areasDir = path.join(__dirname, '../app/areas');
    await fs.mkdir(areasDir, { recursive: true });

    let successCount = 0;
    let skipCount = 0;

    for (let i = 0; i < localityBlocks.length; i++) {
      try {
        const block = localityBlocks[i];

        // Skip the first block if it's just a region header
        if (i === 0 && block.trim().startsWith('#')) {
          console.log(`⏭️  Skipping region header block`);
          continue;
        }

        // Add back the delimiter for parsing
        const fullBlock = `=== LOCALITY:${block}`;
        const localityData = parseLocalityBlock(fullBlock);

        if (!localityData) {
          skipCount++;
          continue;
        }

        // Generate slug
        const slug = toKebabCase(localityData.locality);

        // Create directory for this locality
        const localityDir = path.join(areasDir, slug);
        await fs.mkdir(localityDir, { recursive: true });

        // Generate MDX content
        const mdxContent = generateMDXContent(localityData);

        // Write the MDX file
        const mdxPath = path.join(localityDir, 'page.mdx');
        await fs.writeFile(mdxPath, mdxContent, 'utf-8');

        console.log(`✅ Generated: ${localityData.locality} → /app/areas/${slug}/page.mdx`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error processing locality block ${i + 1}:`, error);
        skipCount++;
      }
    }

    console.log('\n🎉 Area generation completed!');
    console.log(`📊 Summary:`);
    console.log(`   ✅ Successfully generated: ${successCount} pages`);
    console.log(`   ⚠️  Skipped: ${skipCount} pages`);
    console.log(`   📁 Output directory: /app/areas/[slug]/page.mdx`);

    if (successCount > 0) {
      console.log(`\n🚀 You can now run: npm run dev`);
      console.log(`   Visit: http://localhost:3000/areas/[slug]`);
    }
  } catch (error) {
    console.error('❌ Fatal error during generation:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateAreasFromMaster().catch((error) => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}

export { generateAreasFromMaster, parseLocalityBlock, generateMDXContent };
