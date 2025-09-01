#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const areasDir = path.join(process.cwd(), 'app', 'areas');

function fixAreaPage(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Fix AreaHero component
  let updatedContent = content.replace(
    /<AreaHero title=\{metadata\?\.title as string \?\? "Event Decoration"\} intro=\{intro\} \/>/g,
    '<AreaHero title={metadata?.title as string ?? "Event Decoration"} intro={intro} locality={locality} />'
  );
  
  // Fix FAQAccordion component
  updatedContent = updatedContent.replace(
    /<FAQAccordion faqs=\{faqs\} \/>/g,
    '<FAQAccordion faqs={faqs} locality={locality} />'
  );
  
  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`✅ Fixed: ${path.basename(filePath)}`);
  } else {
    console.log(`⏭️  Already fixed: ${path.basename(filePath)}`);
  }
}

function main(): void {
  console.log('🔧 Fixing area pages...\n');
  
  if (!fs.existsSync(areasDir)) {
    console.error('❌ Areas directory not found');
    process.exit(1);
  }
  
  const areaFolders = fs.readdirSync(areasDir).filter(item => {
    const itemPath = path.join(areasDir, item);
    return fs.statSync(itemPath).isDirectory();
  });
  
  const pageFiles: string[] = [];
  
  for (const folder of areaFolders) {
    const pagePath = path.join(areasDir, folder, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      pageFiles.push(pagePath);
    }
  }
  
  console.log(`Found ${pageFiles.length} area pages to fix:\n`);
  
  for (const filePath of pageFiles) {
    fixAreaPage(filePath);
  }
  
  console.log('\n🎉 All area pages fixed!');
}

main(); 