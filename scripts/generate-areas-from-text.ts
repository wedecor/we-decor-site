/* scripts/generate-areas-from-text.ts
 * Reads content/we_decor_bangalore_localities.txt where each locality block is structured as:
 *
 * === LOCALITY: Jayanagar ===
 * TITLE: Event Decoration in Jayanagar – We Decor Bangalore
 * META: ...
 *
 * INTRO:
 * <paragraphs...>
 *
 * SERVICES:
 * - service line
 * - service line
 *
 * WHY:
 * lines beginning with ✔ or plain text
 *
 * NEARBY: A, B, C   (optional)
 *
 * FAQ:
 * Q. question
 * A. answer
 * Q. question
 * A. answer
 * Q. question
 * A. answer
 *
 * Outputs /app/areas/[slug]/page.tsx (TSX for stability).
 * Creates /app/areas/page.tsx index if missing.
 */

import fs from "fs";
import path from "path";

type FAQ = { q: string; a: string };
type LocalityDoc = {
  locality: string;
  slug: string;
  titleH1: string;
  metaDescription: string;
  intro: string;
  services: string[];
  why: string;
  nearby: { name: string; slug: string }[];
  faqs: FAQ[];
};

const TXT_PATH = "content/we_decor_bangalore_localities.txt";
const AREAS_DIR = "app/areas";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.wedecorevents.com";
const PHONE = "+919591232166";
const WA = "https://wa.me/919591232166";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

function readTxt(filepath: string): string {
  if (!fs.existsSync(filepath)) {
    throw new Error(`TXT not found at ${filepath}`);
  }
  return fs.readFileSync(filepath, "utf-8");
}

function splitBlocks(txt: string): string[] {
  // Split on === LOCALITY: Name ===
  const parts = txt.split(/\n={3}\s*LOCALITY:\s*.+?={3}\n?/g);
  // The split drops the headers; we should match with headers to get names
  // Easier approach: match blocks with their headers
  const regex = /={3}\s*LOCALITY:\s*([^\n]+)\s*={3}\s*\n([\s\S]*?)(?=(?:\n={3}\s*LOCALITY:)|$)/g;
  const blocks: string[] = [];
  let m;
  while ((m = regex.exec(txt)) !== null) {
    const name = m[1].trim();
    const body = m[2];
    blocks.push(`LOCALITY_NAME: ${name}\n${body}`);
  }
  return blocks;
}

function pickLine(block: string, key: string): string {
  const re = new RegExp("^" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ":\\s*(.+)$", "m");
  const m = block.match(re);
  return m ? m[1].trim() : "";
}

function pickSection(block: string, key: string): string {
  // Sections like INTRO:, SERVICES:, WHY:, FAQ:
  // Capture from KEY: until next ALL-CAPS KEY or end
  const re = new RegExp(
    `^${key}:\\s*\\n([\\s\\S]*?)(?=^([A-Z]{3,}|NEARBY:|FAQ:|INTRO:|SERVICES:|WHY:|TITLE:|META:|LOCALITY_NAME:)\\s*\\n|\\Z)`,
    "m"
  );
  const m = block.match(re);
  return m ? m[1].trim() : "";
}

function parseNearby(line: string): { name: string; slug: string }[] {
  if (!line) return [];
  return line
    .split(/[,|]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name) => ({ name, slug: slugify(name) }));
}

function parseFaq(section: string): FAQ[] {
  const lines = section.split(/\r?\n/).map((l) => l.trim());
  const faqs: FAQ[] = [];
  let q = "";
  for (const l of lines) {
    if (/^Q\.\s*/i.test(l)) {
      q = l.replace(/^Q\.\s*/i, "").trim();
    } else if (/^A\.\s*/i.test(l)) {
      const a = l.replace(/^A\.\s*/i, "").trim();
      if (q) {
        faqs.push({ q, a });
        q = "";
      }
    }
  }
  return faqs.slice(0, 3);
}

function parseServices(section: string): string[] {
  return section
    .split(/\r?\n/)
    .map((l) => l.replace(/^[-•●]\s*/, "").trim())
    .filter(Boolean);
}

function parseWhy(section: string): string {
  return section
    .split(/\r?\n/)
    .map((l) => l.replace(/^[✔✓]\s*/, "").trim())
    .filter(Boolean)
    .join(" ");
}

function parseBlock(block: string): LocalityDoc | null {
  const locality = pickLine(block, "LOCALITY_NAME");
  if (!locality) return null;

  const title = pickLine(block, "TITLE") || `Event Decoration in ${locality} – We Decor Bangalore`;
  const meta = pickLine(block, "META") || `Premium event decoration in ${locality}: birthdays, weddings, haldi & corporate. Call now.`;

  const intro = pickSection(block, "INTRO");
  const services = parseServices(pickSection(block, "SERVICES"));
  const why = parseWhy(pickSection(block, "WHY"));
  const nearby = parseNearby(pickLine(block, "NEARBY"));
  const faqs = parseFaq(pickSection(block, "FAQ"));

  const slug = slugify(locality);

  return {
    locality,
    slug,
    titleH1: title,
    metaDescription: meta,
    intro,
    services: services.length ? services : [
      `Birthday Decoration in ${locality} — Theme balloons, LED backdrops.`,
      `Wedding & Engagement Décor in ${locality} — Floral mandaps, stage setups.`,
      `Haldi & Mehendi Decoration in ${locality} — Marigold backdrops, traditional props.`,
      `Balloon Decoration in ${locality} — Home, clubhouses & banquet halls.`,
      `Corporate Event Decoration in ${locality} — Office parties, team events.`
    ],
    why: why || `Local team in ${locality}. Quick setup. Custom themes & budget-friendly packages.`,
    nearby,
    faqs
  };
}

function buildTSX(doc: LocalityDoc): string {
  const esc = (s: string) => s.replace(/`/g, "\\`");
  const servicesArray = JSON.stringify(doc.services, null, 2);
  const nearbyArray = JSON.stringify(doc.nearby, null, 2);
  const faqsArray = JSON.stringify(doc.faqs, null, 2);

  return `import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "${esc(doc.titleH1)}",
  description: "${esc(doc.metaDescription)}",
  alternates: { canonical: "${SITE}/areas/${doc.slug}" },
  openGraph: {
    title: "${esc(doc.titleH1)}",
    description: "${esc(doc.metaDescription)}",
    url: "${SITE}/areas/${doc.slug}",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "${esc(doc.titleH1)}",
    description: "${esc(doc.metaDescription)}",
  },
};

export default function Page() {
  const locality = "${esc(doc.locality)}";
  const intro = \`${esc(doc.intro)}\`;
  const services: string[] = ${servicesArray};
  const why = \`${esc(doc.why)}\`;
  const nearby: {name: string; slug: string}[] = ${nearbyArray};
  const faqs: {q: string; a: string}[] = ${faqsArray};

  return (
    <main className="prose prose-invert max-w-none">
      <h1>${esc(doc.titleH1)}</h1>

      <p>{intro}</p>

      <h2>Our Event Decoration Services in {locality}</h2>
      <ul>
        {services.map((s, i) => <li key={i}>{s}</li>)}
      </ul>

      <h2>Why Choose We Decor in {locality}?</h2>
      <p>{why}</p>

      {nearby.length ? (
        <>
          <h2>Nearby Areas We Also Serve</h2>
          <ul>
            {nearby.map((nb) => (
              <li key={nb.slug}>
                <Link href={"/areas/" + nb.slug}>{nb.name}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2>FAQs – {locality}</h2>
      {faqs.map((f, i) => (
        <section key={i}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </section>
      ))}

      <hr className="my-8" />

      <h3>Ready to book decoration in {locality}?</h3>
      <ul>
        <li><a href="tel:${PHONE}">Call Now</a></li>
        <li><a href="${WA}?text=">WhatsApp</a></li>
        <li><Link href={"/contact?area=${doc.slug}"}>Get a Quote</Link></li>
      </ul>
    </main>
  );
}
`;
}

function writePage(doc: LocalityDoc) {
  const dir = path.join(AREAS_DIR, doc.slug);
  const tsxPath = path.join(dir, "page.tsx");

  if (DRY_RUN) {
    console.log(`[dry] ${doc.locality} -> ${tsxPath}`);
    return { path: tsxPath, type: "tsx" as const };
  }

  fs.mkdirSync(dir, { recursive: true });
  const tsx = buildTSX(doc);
  fs.writeFileSync(tsxPath, tsx, "utf-8");
  return { path: tsxPath, type: "tsx" as const };
}

function ensureAreasIndex(docs: LocalityDoc[]) {
  const indexPath = path.join(AREAS_DIR, "page.tsx");
  if (DRY_RUN) {
    console.log(`[dry] would ensure index at ${indexPath}`);
    return;
  }
  if (fs.existsSync(indexPath)) return;

  const list = docs
    .sort((a, b) => a.locality.localeCompare(b.locality))
    .map((d) => `{"name":"${d.locality}","slug":"${d.slug}"}`)
    .join(",");

  const file = `import Link from "next/link";

export default function AreasIndex() {
  const areas = [${list}];
  return (
    <main className="prose prose-invert max-w-none">
      <h1>Event Decoration Across Bangalore — Areas We Serve</h1>
      <p>Explore our coverage across South, East, North, Central and West Bengaluru. Each area page includes local service details, photos and quick booking options.</p>
      <ul>
        {areas.map(a => (
          <li key={a.slug}>
            <Link href={"/areas/" + a.slug}>{a.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
`;
  fs.mkdirSync(AREAS_DIR, { recursive: true });
  fs.writeFileSync(indexPath, file, "utf-8");
}

(function run() {
  try {
    if (!fs.existsSync(TXT_PATH)) {
      console.error(`❌ TXT not found at ${TXT_PATH}. Please add it and re-run.`);
      process.exit(1);
    }

    const raw = readTxt(TXT_PATH);
    const blocks = splitBlocks(raw);
    if (!blocks.length) {
      console.error("❌ No locality blocks found. Check TXT formatting.");
      process.exit(1);
    }

    const docs: LocalityDoc[] = [];
    for (const block of blocks) {
      const doc = parseBlock(block);
      if (doc) docs.push(doc);
    }
    if (!docs.length) {
      console.error("❌ Could not parse any locality sections.");
      process.exit(1);
    }

    const summary: Array<{ locality: string; slug: string; path: string; type: "tsx" }> = [];
    for (const doc of docs) {
      const out = writePage(doc);
      summary.push({ locality: doc.locality, slug: doc.slug, path: out.path, type: out.type });
    }

    ensureAreasIndex(docs);

    console.log("\\n✅ Generation complete (TXT):");
    console.table(
      summary.map((s) => ({
        Locality: s.locality,
        Slug: s.slug,
        File: s.path,
        Format: s.type.toUpperCase(),
      }))
    );
  } catch (e: any) {
    console.error("❌ Error:", e?.message || e);
    process.exit(1);
  }
})(); 