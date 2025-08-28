import fs from "fs";
import path from "path";

const AREAS_DIR = path.join(process.cwd(), "app", "areas");

function read(file: string) {
  return fs.readFileSync(file, "utf-8");
}
function write(file: string, src: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, src, "utf-8");
}

function extract<T=any>(src: string, varName: string): T | null {
  // Matches: const locality = "Koramangala";
  const strMatch = src.match(new RegExp(`const\\s+${varName}\\s*=\\s*"([^"]*)"`, "m")) ||
                   src.match(new RegExp(`const\\s+${varName}\\s*=\\s*'([^']*)'`, "m"));
  if (strMatch) return strMatch[1] as any;

  // Matches arrays/objects JSON-ish: const services: string[] = [ ... ];
  const anyMatch = src.match(new RegExp(`const\\s+${varName}[^=]*=\\s*([\\s\\S]*?);\\s*\\n`, "m"));
  if (anyMatch) {
    try {
      // Try to eval safely by converting TS to JS-ish
      const raw = anyMatch[1].trim();
      // best-effort: wrap in parentheses to JSON.parse after quotes normalization
      const ready = raw
        .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":') // keys to quoted
        .replace(/'/g, '"');
      return JSON.parse(ready);
    } catch {
      return null;
    }
  }
  return null;
}

function upgrade(file: string) {
  let src = read(file);

  // Ensure imports for components (idempotent)
  const imports = [
    `import AreaPageShell from "@/components/areas/AreaPageShell";`,
    `import AreaHero from "@/components/areas/AreaHero";`,
    `import ServicesGrid from "@/components/areas/ServicesGrid";`,
    `import ContactCard from "@/components/areas/ContactCard";`,
    `import CTAStickyBar from "@/components/areas/CTAStickyBar";`,
    `import FAQAccordion from "@/components/areas/FAQAccordion";`,
    `import NearbyChips from "@/components/areas/NearbyChips";`,
    `import Breadcrumbs from "@/components/areas/Breadcrumbs";`,
    `import GalleryStrip from "@/components/areas/GalleryStrip";`,
  ];

  for (const imp of imports) {
    if (!src.includes(imp)) {
      // Insert after first import line
      const idx = src.indexOf("import ");
      if (idx >= 0) {
        const lineEnd = src.indexOf("\n", idx);
        src = src.slice(0, lineEnd+1) + imp + "\n" + src.slice(lineEnd+1);
      } else {
        src = imp + "\n" + src;
      }
    }
  }

  // Extract values from the generated page
  const locality = extract<string>(src, "locality") || "Bangalore";
  const intro = extract<string>(src, "intro") || "";
  const services = extract<string[]>(src, "services") || [];
  const nearby = extract<any[]>(src, "nearby") || [];
  const faqs = extract<any[]>(src, "faqs") || [];

  // Replace <main ...> ... </main> block with componentized UI
  const mainRe = /<main[^>]*>[\s\S]*?<\/main>/m;
  const newMain = `
<main className="pt-20 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
  <AreaPageShell>
    <Breadcrumbs locality={locality} />
    <AreaHero title={metadata?.title as string ?? "Event Decoration"} intro={intro} />
    <ServicesGrid locality={locality} services={services} />
    <GalleryStrip />
    ${nearby.length ? `<NearbyChips nearby={nearby} />` : ``}
    <FAQAccordion faqs={faqs} />
    <ContactCard locality={locality} />
    <CTAStickyBar locality={locality} />
  </AreaPageShell>
</main>`.trim();

  if (mainRe.test(src)) {
    src = src.replace(mainRe, newMain);
  } else {
    // append if main not found
    src += "\n" + newMain + "\n";
  }

  write(file, src);
  console.log("✔ upgraded UI:", file);
}

function run() {
  if (!fs.existsSync(AREAS_DIR)) {
    console.error("❌ app/areas not found.");
    process.exit(1);
  }
  const entries = fs.readdirSync(AREAS_DIR, { withFileTypes: true });
  let count = 0;
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const page = path.join(AREAS_DIR, e.name, "page.tsx");
    if (fs.existsSync(page)) {
      upgrade(page);
      count++;
    }
  }
  console.log(`✅ Upgraded ${count} area pages`);
}
run(); 