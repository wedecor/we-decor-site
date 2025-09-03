#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
// Define constants directly to avoid import issues
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wedecorevents.com';

const ROOT = process.cwd();
const exts = new Set(['.tsx', '.ts', '.jsx', '.js']);

interface SeoIssue {
  file: string;
  line: number;
  type: 'canonical' | 'og_url' | 'twitter_url' | 'hardcoded_url';
  content: string;
  expected: string;
}

let issues: SeoIssue[] = [];

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
      auditFile(fullPath);
    }
  }
}

function auditFile(filePath: string): void {
  try {
    const src = fs.readFileSync(filePath, 'utf8');
    const lines = src.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Check for hardcoded absolute URLs (but exclude redirect configurations)
      const hardcodedUrlMatch = line.match(/["'`](https?:\/\/[^"'`]+)["'`]/g);
      if (hardcodedUrlMatch) {
        for (const match of hardcodedUrlMatch) {
          const url = match.slice(1, -1);
          if (url.includes('wedecorevents.com') && url !== SITE_URL) {
            // Skip redirect destinations in next.config.js
            if (filePath.includes('next.config.js') && line.includes('destination:')) {
              continue;
            }
            issues.push({
              file: path.relative(ROOT, filePath),
              line: lineNum,
              type: 'hardcoded_url',
              content: line.trim(),
              expected: 'Use relative paths or lib/site.ts helpers',
            });
          }
        }
      }

      // Check for canonical tags
      if (line.includes('canonical') || line.includes('canonicalPath')) {
        // Look for hardcoded canonical URLs
        if (line.includes('https://') && line.includes('wedecorevents.com')) {
          issues.push({
            file: path.relative(ROOT, filePath),
            line: lineNum,
            type: 'canonical',
            content: line.trim(),
            expected: 'Use canonicalPath prop with SeoHead component',
          });
        }
      }

      // Check for Open Graph URLs
      if (line.includes('og:url') || line.includes('og:url')) {
        if (line.includes('https://') && line.includes('wedecorevents.com')) {
          issues.push({
            file: path.relative(ROOT, filePath),
            line: lineNum,
            type: 'og_url',
            content: line.trim(),
            expected: 'Use relative paths or lib/site.ts helpers',
          });
        }
      }

      // Check for Twitter Card URLs
      if (line.includes('twitter:url') || line.includes('twitter:url')) {
        if (line.includes('https://') && line.includes('wedecorevents.com')) {
          issues.push({
            file: path.relative(ROOT, filePath),
            line: lineNum,
            type: 'twitter_url',
            content: line.trim(),
            expected: 'Use relative paths or lib/site.ts helpers',
          });
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️  Could not read ${filePath}:`, error);
  }
}

async function main(): Promise<void> {
  console.log('🔍 Auditing SEO tags and canonical URLs...\n');

  walk(ROOT);

  if (issues.length === 0) {
    console.log('✅ No SEO tag issues found.');
    console.log('🎉 All canonical tags and OG URLs are properly configured!');
    process.exit(0);
  }

  console.log(`❌ Found ${issues.length} SEO tag issue(s):\n`);

  // Group by type
  const byType = issues.reduce(
    (acc, issue) => {
      if (!acc[issue.type]) acc[issue.type] = [];
      acc[issue.type].push(issue);
      return acc;
    },
    {} as Record<string, SeoIssue[]>
  );

  for (const [type, typeIssues] of Object.entries(byType)) {
    console.log(`📁 ${type.toUpperCase()} issues:`);
    for (const issue of typeIssues) {
      console.log(`   ${issue.file}:${issue.line}`);
      console.log(`   Content: ${issue.content}`);
      console.log(`   Expected: ${issue.expected}`);
      console.log('');
    }
  }

  console.log('🚨 SEO Issues Found:');
  console.log('💡 Use relative paths (/) instead of absolute URLs');
  console.log('💡 Use canonicalPath prop with SeoHead component');
  console.log('💡 Use lib/site.ts helpers for dynamic URLs');
  console.log('🔧 Fix these before production deployment!');

  process.exit(1);
}

main().catch((error) => {
  console.error('❌ Audit failed:', error);
  process.exit(1);
});
