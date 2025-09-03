import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';

const AREAS_DIR = 'app/areas';
const TEMPLATE_FILE = 'app/areas/[slug]/page.tsx';

function updateAreaPage(filePath: string) {
  console.log(`📝 Processing: ${filePath}`);

  // Skip the template file itself
  if (filePath === TEMPLATE_FILE) {
    console.log(`   ⏭️  Skipping template file`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Check if this is an old-style page that needs updating
  if (content.includes('locality.uniqueFAQ') || content.includes('locality: string')) {
    console.log(`   ✅ Already updated to new template`);
    return false;
  }

  // Read the template
  const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');

  // Extract the slug from the file path
  const slug = path.basename(path.dirname(filePath));

  // Replace the entire content with the template
  fs.writeFileSync(filePath, template);

  console.log(`   ✅ Updated to new template structure`);
  return true;
}

function main() {
  console.log('🚀 Updating all area pages to new template structure...');

  // Find all area page files
  const areaPages = globSync(`${AREAS_DIR}/*/page.tsx`);

  console.log(`Found ${areaPages.length} area pages`);

  let updated = 0;

  for (const filePath of areaPages) {
    if (updateAreaPage(filePath)) {
      updated++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total area pages: ${areaPages.length}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Already updated: ${areaPages.length - updated}`);

  if (updated > 0) {
    console.log(`\n✅ Successfully updated ${updated} area pages!`);
    console.log(`   Next: Run 'npm run build' to verify the build works`);
  } else {
    console.log(`\n✅ All area pages are already updated!`);
  }
}

main();
