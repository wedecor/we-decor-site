import fs from 'node:fs';
import { globSync } from 'glob';

const AREAS_DIR = 'app/areas';

function fixImports(filePath: string) {
  console.log(`🔧 Fixing imports in: ${filePath}`);

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix the import statement
  content = content.replace(
    /import \{ LocalBusinessJsonLd, BreadcrumbsJsonLd, FAQJsonLd \} from "@\/components\/seo\/JsonLd";/g,
    'import { LocalBusinessJsonLd, BreadcrumbsJsonLd } from "@/components/seo/JsonLd";\nimport { FaqPageJsonLd } from "@/components/seo/FaqJsonLd";'
  );

  // Fix the component usage
  content = content.replace(
    /<FAQJsonLd faqs={faqs} \/>/g,
    '<FaqPageJsonLd faqs={faqs} url={url} />'
  );

  // Remove unused GeneratedLocation import
  content = content.replace(
    /import \{ GENERATED_LOCATIONS, GeneratedLocation \} from "@\/app\/\(site\)\/_data\/locations\.generated";/g,
    'import { GENERATED_LOCATIONS } from "@/app/(site)/_data/locations.generated";'
  );

  fs.writeFileSync(filePath, content);
  console.log(`   ✅ Fixed imports`);
}

function main() {
  console.log('🔧 Fixing import and usage issues in all area pages...');

  // Find all area page files
  const areaPages = globSync(`${AREAS_DIR}/*/page.tsx`);

  console.log(`Found ${areaPages.length} area pages`);

  for (const filePath of areaPages) {
    fixImports(filePath);
  }

  console.log(`\n✅ Fixed imports in ${areaPages.length} area pages!`);
  console.log(`   Next: Run 'npm run build' to verify the build works`);
}

main();
