#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const exts = new Set(['.tsx', '.ts', '.jsx', '.js', '.json', '.md', '.txt']);

interface VercelReference {
  file: string;
  line: number;
  content: string;
  type: 'hardcoded' | 'comment' | 'string';
}

let issues: VercelReference[] = [];

function walk(dir: string): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules, .next, and other build directories
      if (['node_modules', '.next', '.git', 'dist', 'build', 'scripts'].includes(entry.name)) {
        continue;
      }
      walk(fullPath);
    } else if (exts.has(path.extname(entry.name))) {
      // Skip documentation and report files
      if (entry.name.includes('lighthouse-report') || 
          entry.name.includes('PRODUCTION_READINESS_AUDIT') ||
          entry.name.includes('README')) {
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
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      
      // Check for .vercel.app references
      if (line.includes('.vercel.app')) {
        let type: 'hardcoded' | 'comment' | 'string' = 'hardcoded';
        
        // Determine if it's a comment
        if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
          type = 'comment';
        }
        // Determine if it's in a string
        else if (line.includes("'") || line.includes('"') || line.includes('`')) {
          type = 'string';
        }
        
        issues.push({
          file: path.relative(ROOT, filePath),
          line: lineNum,
          content: line.trim(),
          type
        });
      }
      
      // Also check for vercel.app (without dot)
      if (line.includes('vercel.app') && !line.includes('.vercel.app')) {
        issues.push({
          file: path.relative(ROOT, filePath),
          line: lineNum,
          content: line.trim(),
          type: 'hardcoded'
        });
      }
    }
  } catch (error) {
    console.warn(`⚠️  Could not read ${filePath}:`, error);
  }
}

async function main(): Promise<void> {
  console.log('🔍 Auditing for .vercel.app references...\n');
  
  walk(ROOT);
  
  if (issues.length === 0) {
    console.log('✅ No .vercel.app references found in codebase.');
    console.log('🎉 Codebase is clean and production-ready!');
    process.exit(0);
  }
  
  console.log(`❌ Found ${issues.length} .vercel.app reference(s):\n`);
  
  // Group by type
  const byType = issues.reduce((acc, issue) => {
    if (!acc[issue.type]) acc[issue.type] = [];
    acc[issue.type].push(issue);
    return acc;
  }, {} as Record<string, VercelReference[]>);
  
  for (const [type, typeIssues] of Object.entries(byType)) {
    console.log(`📁 ${type.toUpperCase()} references:`);
    for (const issue of typeIssues) {
      console.log(`   ${issue.file}:${issue.line} - ${issue.content}`);
    }
    console.log('');
  }
  
  console.log('🚨 CRITICAL: Remove all .vercel.app references before production deployment!');
  console.log('💡 These references can cause SEO issues and redirect problems.');
  console.log('🔧 Use environment variables and lib/site.ts for dynamic URLs.');
  
  process.exit(1);
}

main().catch((error) => {
  console.error('❌ Audit failed:', error);
  process.exit(1);
});
