#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';

interface QAMetrics {
  page: string;
  wordCount: number;
  hasFAQJsonLd: boolean;
  faqCount: number;
  usesNextImage: boolean;
  hasBreadcrumbList: boolean;
  hasLocalBusiness: boolean;
  issues: string[];
}

const AREAS_DIR = path.join(__dirname, '../app/areas');
const LOCATIONS_DIR = path.join(__dirname, '../app/(site)/locations');

function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

function checkFAQJsonLd(content: string): { hasFAQ: boolean; count: number } {
  const faqMatches = content.match(/FAQPage/g);
  const hasFAQ = faqMatches !== null;
  const count = faqMatches ? faqMatches.length : 0;
  return { hasFAQ, count };
}

function checkSchemaTypes(content: string): { 
  hasBreadcrumb: boolean; 
  hasLocalBusiness: boolean; 
  hasFAQ: boolean 
} {
  return {
    hasBreadcrumb: content.includes('BreadcrumbList'),
    hasLocalBusiness: content.includes('LocalBusiness'),
    hasFAQ: content.includes('FAQPage')
  };
}

function checkImageUsage(content: string): boolean {
  // Check if <img> tags are used instead of Next.js Image
  const imgTags = content.match(/<img[^>]*>/g);
  const nextImageTags = content.match(/<Image[^>]*>/g);
  
  if (imgTags && !nextImageTags) {
    return false; // Only <img> tags found
  }
  
  return true; // Either no <img> tags or Next.js Image is used
}

function analyzePage(filePath: string): QAMetrics {
  const content = fs.readFileSync(filePath, 'utf-8');
  const pageName = path.basename(filePath, '.tsx');
  
  // Extract visible text content (remove JSX, imports, etc.)
  const textContent = content
    .replace(/import.*?from.*?['"];?\n?/g, '')
    .replace(/export.*?function.*?{/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  const wordCount = countWords(textContent);
  const { hasFAQ: hasFAQJsonLd, count: faqCount } = checkFAQJsonLd(content);
  const { hasBreadcrumb, hasLocalBusiness, hasFAQ } = checkSchemaTypes(content);
  const usesNextImage = checkImageUsage(content);
  
  const issues: string[] = [];
  
  if (wordCount < 200) {
    issues.push(`Low word count: ${wordCount} words (minimum: 200)`);
  }
  
  if (!hasFAQJsonLd) {
    issues.push('Missing FAQ JSON-LD schema');
  }
  
  if (faqCount < 3) {
    issues.push(`Insufficient FAQ count: ${faqCount} (minimum: 3)`);
  }
  
  if (!usesNextImage) {
    issues.push('Uses <img> tags instead of Next.js Image component');
  }
  
  if (!hasBreadcrumb) {
    issues.push('Missing BreadcrumbList JSON-LD schema');
  }
  
  if (!hasLocalBusiness) {
    issues.push('Missing LocalBusiness JSON-LD schema');
  }
  
  return {
    page: pageName,
    wordCount,
    hasFAQJsonLd,
    faqCount,
    usesNextImage,
    hasBreadcrumbList: hasBreadcrumb,
    hasLocalBusiness,
    issues
  };
}

function runQAAnalysis(): void {
  console.log('🔍 Running SEO QA Analysis...\n');
  
  const metrics: QAMetrics[] = [];
  
  // Analyze area pages
  if (fs.existsSync(AREAS_DIR)) {
    const areaFiles = fs.readdirSync(AREAS_DIR)
      .filter(file => file.endsWith('.tsx') && file !== 'page.tsx' && file !== 'layout.tsx');
    
    for (const file of areaFiles) {
      const filePath = path.join(AREAS_DIR, file);
      if (fs.statSync(filePath).isFile()) {
        metrics.push(analyzePage(filePath));
      }
    }
  }
  
  // Analyze location pages (dynamic route)
  if (fs.existsSync(LOCATIONS_DIR)) {
    const slugDir = path.join(LOCATIONS_DIR, '[slug]');
    if (fs.existsSync(slugDir)) {
      const slugFiles = fs.readdirSync(slugDir)
        .filter(file => file.endsWith('.tsx'));
      
      for (const file of slugFiles) {
        const filePath = path.join(slugDir, file);
        if (fs.statSync(filePath).isFile()) {
          metrics.push(analyzePage(filePath));
        }
      }
    }
  }
  
  // Generate report
  console.log('📊 SEO QA Report:\n');
  
  let totalIssues = 0;
  let pagesWithIssues = 0;
  
  metrics.forEach(metric => {
    console.log(`📍 ${metric.page}`);
    console.log(`   Words: ${metric.wordCount}`);
    console.log(`   FAQ JSON-LD: ${metric.hasFAQJsonLd ? '✅' : '❌'} (${metric.faqCount} FAQs)`);
    console.log(`   Next.js Image: ${metric.usesNextImage ? '✅' : '❌'}`);
    console.log(`   BreadcrumbList: ${metric.hasBreadcrumbList ? '✅' : '❌'}`);
    console.log(`   LocalBusiness: ${metric.hasLocalBusiness ? '✅' : '❌'}`);
    
    if (metric.issues.length > 0) {
      pagesWithIssues++;
      totalIssues += metric.issues.length;
      console.log(`   Issues:`);
      metric.issues.forEach(issue => console.log(`     ❌ ${issue}`));
    } else {
      console.log(`   ✅ All checks passed`);
    }
    console.log('');
  });
  
  // Summary
  console.log('📈 Summary:');
  console.log(`   Total pages analyzed: ${metrics.length}`);
  console.log(`   Pages with issues: ${pagesWithIssues}`);
  console.log(`   Total issues found: ${totalIssues}`);
  
  if (totalIssues === 0) {
    console.log('   🎉 All pages pass SEO QA checks!');
  } else {
    console.log('   ⚠️  Some pages need attention');
    process.exit(1); // Exit with error code for CI/CD
  }
}

// Run if called directly
if (require.main === module) {
  runQAAnalysis();
}

export { runQAAnalysis, analyzePage };
export type { QAMetrics }; 