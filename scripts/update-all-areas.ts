#!/usr/bin/env ts-node

import { promises as fs } from 'fs';
import path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.wedecorevents.com';

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

function getSection(
  src: string,
  label: string,
  nextLabels: string[]
): string {
  // Build a "stop" alternation like: ^(SERVICES:|WHY:|NEARBY:|FAQ:|CASE STUDY:|CTA:)\s*$
  const stop = nextLabels.length
    ? `^(${nextLabels.map(l => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')}):\\s*$`
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
      
      const m = src.match(faqRe);
      if (m) return m[1].trim();
      return '';
    }
    
    // For SERVICES specifically, use a more robust pattern that captures until the next section header
    if (label === 'SERVICES') {
      const servicesRe = new RegExp(
        String.raw`(?:^|\n)SERVICES:\s*\r?\n([\s\S]*?)(?=\r?\n(?:^WHY:|^NEARBY:|^FAQ:|^CASE STUDY:|^CTA:)\s*$)`,
        'm'
      );
      
      const m = src.match(servicesRe);
      if (m) return m[1].trim();
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

function parseLocalityBlock(block: string): LocalityData | null {
  try {
    // Extract locality name from the header first
    const localityMatch = block.match(/=== LOCALITY: (.+?) ===/);
    if (!localityMatch) {
      console.warn(`⚠️  Could not extract locality name from block`);
      return null;
    }
    
    const data: Partial<LocalityData> = {
      locality: localityMatch[1].trim()
    };
    
    // Use the robust getSection helper for all sections
    const TITLE = (block.match(/^TITLE:\s*(.+)$/m)?.[1] || '').trim();
    const META = (block.match(/^META:\s*(.+)$/m)?.[1] || '').trim();
    
    const INTRO = getSection(block, 'INTRO', ['SERVICES','WHY','NEARBY','FAQ','CASE STUDY','CTA']);
    const SERVICES = getSection(block, 'SERVICES', ['WHY','NEARBY','FAQ','CASE STUDY','CTA']);
    const WHY = getSection(block, 'WHY', ['NEARBY','FAQ','CASE STUDY','CTA']);
    const NEARBY = getSection(block, 'NEARBY', ['FAQ','CASE STUDY','CTA']);
    const FAQ = getSection(block, 'FAQ', ['CASE STUDY','CTA']);
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
    
    return data as LocalityData;
  } catch (error) {
    console.error(`❌ Error parsing locality block:`, error);
    return null;
  }
}

function generateUpdatedTSXContent(data: LocalityData): string {
  // Split services into array items
  const servicesArray = data.services.split('\n').filter(line => line.trim()).map(line => 
    `    "${line.trim()}"`
  ).join(',\n');

  // Split FAQ into array items
  const faqLines = data.faq.split('\n').filter(line => line.trim());
  const faqsArray = [];
  
  for (let i = 0; i < faqLines.length; i += 2) {
    if (faqLines[i] && faqLines[i + 1]) {
      const question = faqLines[i].replace(/^Q\.\s*/, '').trim();
      const answer = faqLines[i + 1].replace(/^A\.\s*/, '').trim();
      faqsArray.push(`    {
      "q": "${question}",
      "a": "${answer}"
    }`);
    }
  }

  // Split nearby into array items
  const nearbyArray = data.nearby.split(',').map(area => 
    `    { "name": "${area.trim()}", "slug": "${area.trim().toLowerCase().replace(/\s+/g, '-')}" }`
  ).join(',\n');

  return `import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GalleryStrip from "@/components/areas/GalleryStrip";
import Breadcrumbs from "@/components/areas/Breadcrumbs";
import NearbyChips from "@/components/areas/NearbyChips";
import FAQAccordion from "@/components/areas/FAQAccordion";
import CTAStickyBar from "@/components/areas/CTAStickyBar";
import ContactCard from "@/components/areas/ContactCard";
import ServicesGrid from "@/components/areas/ServicesGrid";
import AreaHero from "@/components/areas/AreaHero";
import AreaPageShell from "@/components/areas/AreaPageShell";
import Link from "next/link";

export const metadata: Metadata = {
  title: "${data.title}",
  description: "${data.meta}",
  alternates: { canonical: "${SITE_URL}/areas/${data.locality.toLowerCase().replace(/\s+/g, '-')}" },
  openGraph: {
    title: "${data.title}",
    description: "${data.meta}",
    url: "${SITE_URL}/areas/${data.locality.toLowerCase().replace(/\s+/g, '-')}",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "${data.title}",
    description: "${data.meta}",
  },
};

export default function Page() {
  const locality = "${data.locality}";
  const intro = \`${data.intro}\`;
  
  const services: string[] = [
${servicesArray}
  ];
  
  const why = \`${data.why}\`;
  
  const nearby: {name: string; slug: string}[] = [
${nearbyArray}
  ];
  
  const faqs: {q: string; a: string}[] = [
${faqsArray.join(',\n')}
  ];

  return (
    <>
  <Navbar />
  <main id="top" className="pt-20 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
    <AreaPageShell>
      <Breadcrumbs locality={locality} />
      <AreaHero title={metadata?.title as string ?? "Event Decoration"} intro={intro} />
      <ServicesGrid locality={locality} services={services} />
      <GalleryStrip />
      <NearbyChips nearby={nearby} />
      <FAQAccordion faqs={faqs} />
      <ContactCard locality={locality} />
      <CTAStickyBar locality={locality} />
    </AreaPageShell>
  </main>
  <Footer />
  
  {/* Sticky WhatsApp CTA */}
  <a
    href="https://wa.me/918880544452"
    className="fixed bottom-6 right-6 bg-gradient-to-r from-green-400 to-pink-400 text-white px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-3 hover:from-green-500 hover:to-pink-500 hover:scale-105 transition transform duration-200 animate-pulse hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
    target="_blank"
    rel="noopener"
    id="whatsapp-cta"
    data-gtm="click-whatsapp"
  >
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.87 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
    </svg>
    WhatsApp
  </a>
</>
  );
}`;
}

async function updateAllAreas(): Promise<void> {
  try {
    console.log('🔄 Starting to update all area pages...');
    
    // Read the master file
    const masterFilePath = path.join(__dirname, '../content/we_decor_bangalore_localities_full.txt');
    const content = await fs.readFile(masterFilePath, 'utf-8');
    
    // Split by locality delimiter and filter out empty blocks
    const localityBlocks = content.split('=== LOCALITY:').filter(block => block.trim());
    
    console.log(`📁 Found ${localityBlocks.length} locality blocks to process...`);
    
    // Ensure the areas directory exists
    const areasDir = path.join(__dirname, '../app/areas');
    
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
        const slug = localityData.locality.toLowerCase().replace(/\s+/g, '-');
        
        // Check if the .tsx file exists
        const tsxPath = path.join(areasDir, slug, 'page.tsx');
        try {
          await fs.access(tsxPath);
        } catch {
          console.log(`⚠️  Skipping ${localityData.locality} - no .tsx file found`);
          skipCount++;
          continue;
        }
        
        // Generate updated TSX content
        const updatedContent = generateUpdatedTSXContent(localityData);
        
        // Write the updated TSX file
        await fs.writeFile(tsxPath, updatedContent, 'utf-8');
        
        // Remove the duplicate .mdx file if it exists
        const mdxPath = path.join(areasDir, slug, 'page.mdx');
        try {
          await fs.unlink(mdxPath);
          console.log(`🗑️  Removed duplicate .mdx file for ${localityData.locality}`);
        } catch {
          // .mdx file doesn't exist, that's fine
        }
        
        console.log(`✅ Updated: ${localityData.locality} → /app/areas/${slug}/page.tsx`);
        successCount++;
        
      } catch (error) {
        console.error(`❌ Error processing locality block ${i + 1}:`, error);
        skipCount++;
      }
    }
    
    console.log('\n🎉 All area pages updated!');
    console.log(`📊 Summary:`);
    console.log(`   ✅ Successfully updated: ${successCount} pages`);
    console.log(`   ⚠️  Skipped: ${skipCount} pages`);
    console.log(`   🗑️  Removed duplicate .mdx files`);
    
    if (successCount > 0) {
      console.log(`\n🚀 You can now test your updated area pages!`);
      console.log(`   Visit: http://localhost:3000/areas/[slug]`);
    }
    
  } catch (error) {
    console.error('❌ Fatal error during update:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updateAllAreas().catch((error) => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}

export { updateAllAreas, parseLocalityBlock, generateUpdatedTSXContent }; 