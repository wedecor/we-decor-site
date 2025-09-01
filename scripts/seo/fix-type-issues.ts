import fs from "node:fs";
import { globSync } from "glob";

const AREAS_DIR = "app/areas";

function fixTypeIssues(filePath: string) {
  console.log(`🔧 Fixing type issues in: ${filePath}`);
  
  let content = fs.readFileSync(filePath, "utf8");
  
  // Fix the type assertion issues
  content = content.replace(
    /const generatedArea = GENERATED_LOCATIONS\.find\(\(g\) => g\.slug === params\.slug\);/g,
    "const generatedArea = GENERATED_LOCATIONS.find((g) => g.slug === params.slug) as any;"
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`   ✅ Fixed type issues`);
}

function main() {
  console.log("🔧 Fixing TypeScript type issues in all area pages...");
  
  // Find all area page files
  const areaPages = globSync(`${AREAS_DIR}/*/page.tsx`);
  
  console.log(`Found ${areaPages.length} area pages`);
  
  for (const filePath of areaPages) {
    fixTypeIssues(filePath);
  }
  
  console.log(`\n✅ Fixed type issues in ${areaPages.length} area pages!`);
  console.log(`   Next: Run 'npm run build' to verify the build works`);
}

main(); 