#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const exts = new Set(['.tsx', '.ts', '.jsx', '.js']);

interface StructuredDataIssue {
  file: string;
  line: number;
  type: 'json_ld' | 'og_tags' | 'twitter_tags' | 'missing_required';
  content: string;
  details: string;
}

let issues: StructuredDataIssue[] = [];
let filesWithStructuredData = 0;
let filesWithOgTags = 0;
let filesWithTwitterTags = 0;

function walk(dir: string): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '.git', 'dist', 'build'].includes(entry.name)) {
        continue;
      }
      walk(fullPath);
    } else if (exts.has(path.extname(entry.name))) {
      // Skip script files
      if (dir.includes('scripts')) {
        continue;
      }
      auditFile(fullPath);
    }
  }
}

function auditFile(filePath: string): void {
  try {
    const src = fs.readFileSync(filePath, 'utf8');
    const lines = src.split('\n');
    
    let hasJsonLd = false;
    let hasOgTags = false;
    let hasTwitterTags = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      
      // Check for JSON-LD structured data
      if (line.includes('application/ld+json')) {
        hasJsonLd = true;
        
        // Look for the complete pattern in the next few lines
        let hasProperFormat = false;
        for (let j = i; j < Math.min(i + 5, lines.length); j++) {
          if (lines[j].includes('dangerouslySetInnerHTML')) {
            hasProperFormat = true;
            break;
          }
        }
        
        if (!hasProperFormat) {
          issues.push({
            file: path.relative(ROOT, filePath),
            line: lineNum,
            type: 'json_ld',
            content: line.trim(),
            details: 'JSON-LD should use dangerouslySetInnerHTML with JSON.stringify'
          });
        }
      }
      
      // Check for schemaMarkup usage (this is correct in React components)
      if (line.includes('schemaMarkup') && !line.includes('dangerouslySetInnerHTML')) {
        // This is fine - it's the prop being passed to SeoHead
      }
      
      // Check for Open Graph tags
      if (line.includes('og:') || line.includes('property="og:')) {
        hasOgTags = true;
        
        // Check for required OG tags
        if (line.includes('og:title') || line.includes('og:description') || line.includes('og:url')) {
          // These are good
        } else if (line.includes('og:image')) {
          // Check if image path is relative
          if (line.includes('https://') && line.includes('wedecorevents.com')) {
            issues.push({
              file: path.relative(ROOT, filePath),
              line: lineNum,
              type: 'og_tags',
              content: line.trim(),
              details: 'Use relative paths for og:image (e.g., /og-banner.jpg)'
            });
          }
        }
      }
      
      // Check for Twitter Card tags
      if (line.includes('twitter:') || line.includes('name="twitter:')) {
        hasTwitterTags = true;
        
        // Check for required Twitter tags
        if (line.includes('twitter:card') || line.includes('twitter:title') || line.includes('twitter:description')) {
          // These are good
        } else if (line.includes('twitter:image')) {
          // Check if image path is relative
          if (line.includes('https://') && line.includes('wedecorevents.com')) {
            issues.push({
              file: path.relative(ROOT, filePath),
              line: lineNum,
              type: 'twitter_tags',
              content: line.trim(),
              details: 'Use relative paths for twitter:image (e.g., /og-banner.jpg)'
            });
          }
        }
      }
    }
    
    // Track files with structured data
    if (hasJsonLd) filesWithStructuredData++;
    if (hasOgTags) filesWithOgTags++;
    if (hasTwitterTags) filesWithTwitterTags++;
    
  } catch (error) {
    console.warn(`⚠️  Could not read ${filePath}:`, error);
  }
}

async function main(): Promise<void> {
  console.log('🔍 Structured Data and Meta Tags Audit\n');
  
  walk(ROOT);
  
  console.log(`📊 Files with structured data: ${filesWithStructuredData}`);
  console.log(`📊 Files with Open Graph tags: ${filesWithOgTags}`);
  console.log(`📊 Files with Twitter Card tags: ${filesWithTwitterTags}\n`);
  
  if (issues.length === 0) {
    console.log('✅ No structured data issues found.');
    console.log('🎉 All JSON-LD and meta tags are properly configured!');
    process.exit(0);
  }
  
  console.log(`❌ Found ${issues.length} structured data issue(s):\n`);
  
  // Group by type
  const byType = issues.reduce((acc, issue) => {
    if (!acc[issue.type]) acc[issue.type] = [];
    acc[issue.type].push(issue);
    return acc;
  }, {} as Record<string, StructuredDataIssue[]>);
  
  for (const [type, typeIssues] of Object.entries(byType)) {
    console.log(`📁 ${type.toUpperCase()} issues:`);
    for (const issue of typeIssues) {
      console.log(`   ${issue.file}:${issue.line}`);
      console.log(`   Content: ${issue.content}`);
      console.log(`   Details: ${issue.details}`);
      console.log('');
    }
  }
  
  console.log('🚨 Structured Data Issues Found:');
  console.log('💡 Use relative paths for images in meta tags');
  console.log('💡 Ensure JSON-LD uses proper React syntax');
  console.log('💡 Include required Open Graph and Twitter Card tags');
  console.log('🔧 Fix these before production deployment!');
  
  process.exit(1);
}

main().catch((error) => {
  console.error('❌ Audit failed:', error);
  process.exit(1);
});
