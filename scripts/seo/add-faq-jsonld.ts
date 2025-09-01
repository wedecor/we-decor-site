import fs from "node:fs";
import path from "node:path";
import { globSync } from "glob";

const AREAS_DIR = "app/areas";

function addFaqJsonLdToFile(filePath: string) {
  console.log(`📝 Processing: ${filePath}`);
  
  const content = fs.readFileSync(filePath, "utf8");
  
  // Check if FAQ JSON-LD is already present
  if (content.includes("FaqPageJsonLd") || content.includes("FAQJsonLd")) {
    console.log(`   ✅ Already has FAQ JSON-LD`);
    return false;
  }
  
  // Check if it's a valid area page with FAQ content
  if (!content.includes("faqs") && !content.includes("FAQ")) {
    console.log(`   ⚠️  No FAQ content found, skipping`);
    return false;
  }
  
  // Add import for FaqPageJsonLd
  let newContent = content;
  
  if (!content.includes("import.*FaqPageJsonLd")) {
    const importLine = 'import { FaqPageJsonLd } from "@/components/seo/FaqJsonLd";';
    const importIndex = content.lastIndexOf("import");
    if (importIndex !== -1) {
      const nextLineIndex = content.indexOf("\n", importIndex) + 1;
      newContent = content.slice(0, nextLineIndex) + importLine + "\n" + content.slice(nextLineIndex);
    }
  }
  
  // Add SITE_URL import if not present
  if (!content.includes("import.*SITE_URL")) {
    const importLine = 'import { SITE_URL } from "@/lib/site";';
    const importIndex = newContent.lastIndexOf("import");
    if (importIndex !== -1) {
      const nextLineIndex = newContent.indexOf("\n", importIndex) + 1;
      newContent = newContent.slice(0, nextLineIndex) + importLine + "\n" + newContent.slice(nextLineIndex);
    }
  }
  
  // Find the closing tag of the main component
  const closingTagIndex = newContent.lastIndexOf("</>");
  if (closingTagIndex === -1) {
    console.log(`   ⚠️  Could not find closing tag, skipping`);
    return false;
  }
  
  // Extract the slug from the file path
  const slug = path.basename(path.dirname(filePath));
  
  // Add FAQ JSON-LD before the closing tag
  const faqJsonLd = `
      {/* SEO: FAQ JSON-LD */}
      <FaqPageJsonLd
        faqs={locality.uniqueFAQ || []}
        url={\`\${SITE_URL.replace(/\\/+$/, "")}/areas/\${slug}\`}
      />
    </>`;
  
  newContent = newContent.replace("</>", faqJsonLd);
  
  // Write the updated content
  fs.writeFileSync(filePath, newContent);
  console.log(`   ✅ Added FAQ JSON-LD`);
  
  return true;
}

function main() {
  console.log("🚀 Adding FAQ JSON-LD to all area pages...");
  
  // Find all area page files
  const areaPages = globSync(`${AREAS_DIR}/*/page.tsx`);
  
  console.log(`Found ${areaPages.length} area pages`);
  
  let updated = 0;
  
  for (const filePath of areaPages) {
    if (addFaqJsonLdToFile(filePath)) {
      updated++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Total area pages: ${areaPages.length}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Already had JSON-LD: ${areaPages.length - updated}`);
  
  if (updated > 0) {
    console.log(`\n✅ Successfully added FAQ JSON-LD to ${updated} area pages!`);
    console.log(`   Next: Run 'npm run seo:jsonld:new' to verify all pages have structured data`);
  } else {
    console.log(`\n✅ All area pages already have FAQ JSON-LD!`);
  }
}

main(); 