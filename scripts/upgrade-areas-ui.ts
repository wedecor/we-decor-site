import fs from 'fs';
import path from 'path';

const AREAS_DIR = path.join(process.cwd(), 'app', 'areas');

function read(file: string) {
  return fs.readFileSync(file, 'utf-8');
}
function write(file: string, src: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, src, 'utf-8');
}

function extract<T = any>(src: string, varName: string): T | null {
  // Matches: const locality = "Koramangala";
  const strMatch =
    src.match(new RegExp(`const\\s+${varName}\\s*=\\s*"([^"]*)"`, 'm')) ||
    src.match(new RegExp(`const\\s+${varName}\\s*=\\s*'([^']*)'`, 'm'));
  if (strMatch) return strMatch[1] as any;

  // Matches arrays/objects JSON-ish: const services: string[] = [ ... ];
  const anyMatch = src.match(new RegExp(`const\\s+${varName}[^=]*=\\s*([\\s\\S]*?);\\s*\\n`, 'm'));
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
    `import Navbar from "@/components/Navbar";`,
    `import Footer from "@/components/Footer";`,
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
      const idx = src.indexOf('import ');
      if (idx >= 0) {
        const lineEnd = src.indexOf('\n', idx);
        src = src.slice(0, lineEnd + 1) + imp + '\n' + src.slice(lineEnd + 1);
      } else {
        src = imp + '\n' + src;
      }
    }
  }

  // Extract values from the generated page
  const locality = extract<string>(src, 'locality') || 'Bangalore';
  const intro = extract<string>(src, 'intro') || '';
  const services = extract<string[]>(src, 'services') || [];
  const nearby = extract<any[]>(src, 'nearby') || [];
  const faqs = extract<any[]>(src, 'faqs') || [];

  // Replace <main ...> ... </main> block with componentized UI
  const mainRe = /<main[^>]*>[\s\S]*?<\/main>/m;
  const newMain = `
<>
  <Navbar />
  <main id="top" className="pt-20 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
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
  </main>
  <Footer />
  
  {/* Sticky WhatsApp CTA */}
  <a
    href="https://wa.me/918880544452"
    className="fixed bottom-6 right-6 bg-gradient-to-r from-green-400 to-pink-400 text-white px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-3 hover:from-green-500 hover:to-pink-500 hover:scale-105 transition transform duration-200 animate-pulse hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
    target="_blank"
    rel="noopener"
    id="whatsapp-cta"
    data-gtm="click-whatsapp"
  >
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
    </svg>
    WhatsApp
  </a>
</>`.trim();

  if (mainRe.test(src)) {
    src = src.replace(mainRe, newMain);
  } else {
    // append if main not found
    src += '\n' + newMain + '\n';
  }

  write(file, src);
  console.log('✔ upgraded UI:', file);
}

function run() {
  if (!fs.existsSync(AREAS_DIR)) {
    console.error('❌ app/areas not found.');
    process.exit(1);
  }
  const entries = fs.readdirSync(AREAS_DIR, { withFileTypes: true });
  let count = 0;
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const page = path.join(AREAS_DIR, e.name, 'page.tsx');
    if (fs.existsSync(page)) {
      upgrade(page);
      count++;
    }
  }
  console.log(`✅ Upgraded ${count} area pages`);
}
run();
