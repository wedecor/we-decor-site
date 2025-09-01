/* scripts/generate-areas.ts
 * Reads content/we_decor_bangalore_localities.pdf
 * Splits into locality blocks and generates Next.js 14 pages:
 * - /app/areas/[slug]/page.mdx  (primary)
 * - Fallback to /app/areas/[slug]/page.tsx when MDX is risky
 * Also creates /app/areas/page.tsx index if missing.
 */

import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

type FAQ = { q: string; a: string };
type LocalityDoc = {
  locality: string;
  slug: string;
  titleH1: string;
  metaDescription: string;
  intro: string;
  services: string[];
  why: string;
  nearby: string[];
  faqs: FAQ[];
};

const PDF_PATH = "content/we_decor_bangalore_localities.pdf";
const AREAS_DIR = "app/areas";
const PHONE = "+919591232166";
const WA = "https://wa.me/919591232166";
const SITE = "https://www.wedecorevents.com";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");

/** Basic slugify (no extra deps) */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

/** Escape MDX special braces and angle brackets */
function escapeMDX(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/{/g, "&#123;")
    .replace(/}/g, "&#125;");
}

function normalizeLine(line: string): string {
  return line.replace(/\s+/g, " ").trim();
}

/** Split text into blocks starting with "Event Decoration in X – We Decor Bangalore" */
function splitIntoLocalityBlocks(text: string): string[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim());
  const blocks: string[] = [];
  let current: string[] = [];

  const isLocalityHeader = (l: string) =>
    /^Event Decoration in .+ – We Decor Bangalore$/.test(l);

  for (const line of lines) {
    if (isLocalityHeader(line)) {
      if (current.length) blocks.push(current.join("\n"));
      current = [line];
    } else {
      if (current.length) current.push(line);
    }
  }
  if (current.length) blocks.push(current.join("\n"));

  return blocks;
}

function parseBlock(block: string): LocalityDoc | null {
  const getMatch = (re: RegExp) => {
    const m = block.match(re);
    return m ? m[1].trim() : "";
  };

  const titleH1Locality = getMatch(/^Event Decoration in (.+) – We Decor Bangalore$/m);
  if (!titleH1Locality) return null;

  const localityName = titleH1Locality;
  const metaDescription = getMatch(/^Meta Description:\s*(.+)$/m);

  const servicesAnchor = /Our Event Decoration Services:/m;
  const whyAnchor = /Why Choose We Decor\?/m;
  const nearbyAnchor = /Nearby Areas We Also Serve:/m;
  const faqAnchor = /FAQs:/m;

  const idxServices = block.search(servicesAnchor);
  const idxWhy = block.search(whyAnchor);
  const idxNearby = block.search(nearbyAnchor);
  const idxFaq = block.search(faqAnchor);

  const titleLineIdx = block.search(/^Event Decoration in .+ – We Decor Bangalore$/m);
  let intro = "";
  if (idxServices > -1) {
    intro = block
      .slice(titleLineIdx)
      .split("\n")
      .slice(1)
      .join("\n")
      .split("Our Event Decoration Services:")[0]
      .trim();
  }

  let services: string[] = [];
  if (idxServices > -1) {
    const after = block.slice(idxServices).split("\n").slice(1);
    let take: string[] = [];
    for (const l of after) {
      if (/^Why Choose We Decor\?/.test(l) || /^Nearby Areas We Also Serve:/.test(l) || /^FAQs:/.test(l)) break;
      if (!l.trim()) continue;
      take.push(normalizeLine(l.replace(/^[-•●]+\s*/, "")));
    }
    services = take.filter(Boolean);
  }

  let why = "";
  if (idxWhy > -1) {
    const after = block.slice(idxWhy).split("\n").slice(1);
    const lines: string[] = [];
    for (const l of after) {
      if (/^Nearby Areas We Also Serve:/.test(l) || /^FAQs:/.test(l)) break;
      if (!l.trim()) continue;
      lines.push(normalizeLine(l.replace(/[✔✓]+\s*/g, "")));
    }
    why = lines.join(" ");
  }

  let nearby: string[] = [];
  if (idxNearby > -1) {
    const after = block.slice(idxNearby).split("\n").slice(1);
    const lines: string[] = [];
    for (const l of after) {
      if (/^FAQs:/.test(l)) break;
      if (!l.trim()) continue;
      lines.push(l);
    }
    const joined = lines.join(" ");
    nearby = joined
      .split(/[,•|]/)
      .map((x) => x.trim())
      .filter(Boolean);
  }

  let faqs: FAQ[] = [];
  if (idxFaq > -1) {
    const after = block.slice(idxFaq).split("\n").slice(1);
    let q = "";
    for (const l of after) {
      if (!l.trim()) continue;
      if (/^Q\.\s*/i.test(l)) {
        q = normalizeLine(l.replace(/^Q\.\s*/i, ""));
      } else if (/^A\.\s*/i.test(l)) {
        const a = normalizeLine(l.replace(/^A\.\s*/i, ""));
        if (q) {
          faqs.push({ q, a });
          q = "";
        }
      } else {
        if (/Call Now:/i.test(l)) break;
      }
    }
  }

  intro = intro.replace(/^Meta Description:.*$/m, "").trim();

  const slug = slugify(localityName);

  return {
    locality: localityName,
    slug,
    titleH1: `Event Decoration in ${localityName} – We Decor Bangalore`,
    metaDescription: metaDescription || `Premium event decoration in ${localityName}: birthdays, weddings, haldi, and corporate setups. Call now for quick booking.`,
    intro,
    services: services.length ? services : [
      `Birthday Decoration in ${localityName} — Theme balloons, LED backdrops, kids' parties, milestone birthdays.`,
      `Wedding & Engagement Décor in ${localityName} — Floral mandaps, stage setups, bridal room décor.`,
      `Haldi & Mehendi Decoration in ${localityName} — Marigold backdrops, traditional props.`,
      `Balloon Decoration in ${localityName} — Home, clubhouses & banquet halls.`,
      `Corporate Event Decoration in ${localityName} — Office parties, team events, festive décor.`
    ],
    why: why || `Local team in ${localityName}. Quick setup at homes, apartments & community halls. Custom themes & budget-friendly packages.`,
    nearby,
    faqs: faqs.slice(0, 3)
  };
}

function buildMDX(doc: LocalityDoc): string {
  const esc = escapeMDX;
  const servicesList = doc.services.map((s) => `- ${esc(s)}`).join("\n");
  const nearbyList =
    doc.nearby.length > 0
      ? doc.nearby
          .map((n) => {
            const s = slugify(n);
            return `- [${esc(n)}](/areas/${s})`;
          })
          .join("\n")
      : "";

  const faqVar = `const faqs = ${JSON.stringify(doc.faqs, null, 2)};`;

  return `export const metadata = {
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
  }
};

import Script from "next/script";
import Link from "next/link";

# ${esc(doc.titleH1)}

${esc(doc.intro)}

## Our Event Decoration Services in ${esc(doc.locality)}
${servicesList}

## Why Choose We Decor in ${esc(doc.locality)}?
${esc(doc.why)}

${doc.nearby.length ? `## Nearby Areas We Also Serve
${nearbyList}

` : ""}## FAQs – ${esc(doc.locality)}
${doc.faqs
  .map(
    (f) =>
      `### ${esc(f.q)}
${esc(f.a)}`
  )
  .join("\n\n")}

---

### Ready to book decoration in ${esc(doc.locality)}?
Call us or ping on WhatsApp — we'll share themes & pricing instantly.

- 📞 **[Call Now](tel:${PHONE})**
- 💬 **[WhatsApp](${WA})**
- ✉️ **[Get a Quote](/contact?area=${doc.slug})**

---

_We Decor – Bringing Dreams to Life across Bangalore. Follow us on Instagram: [@wedecorbangalore](https://instagram.com/wedecorbangalore)_

<p className="mt-6 text-sm opacity-70">
  <Link href="/areas" className="underline">Areas</Link> / ${esc(doc.locality)}
</p>

{/* FAQ Schema */}
${faqVar}
<Script id="faq-schema" type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(({q, a}) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": {"@type":"Answer","text": a}
  }))
})}
</Script>
`;
}

function buildTSX(doc: LocalityDoc): string {
  const esc = (s: string) => s.replace(/`/g, "\\`");
  const servicesArray = JSON.stringify(doc.services, null, 2);
  const nearbyArray = JSON.stringify(
    doc.nearby.map((n) => ({ name: n, slug: slugify(n) })),
    null,
    2
  );
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
        <li><a href="${WA}">WhatsApp</a></li>
        <li><Link href={"/contact?area=${doc.slug}"}>Get a Quote</Link></li>
      </ul>

      <p className="mt-6 text-sm opacity-70">
        We Decor – Bringing Dreams to Life across Bangalore.{" "}
        <a href="https://instagram.com/wedecorbangalore" target="_blank" rel="noopener noreferrer">
          @wedecorbangalore
        </a>
      </p>

      <p className="mt-6 text-sm opacity-70">
        <Link href="/areas" className="underline">Areas</Link> / {locality}
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f: any) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          })
        }}
      />
    </main>
  );
}
`;
}

function writePage(doc: LocalityDoc) {
  const dir = path.join(AREAS_DIR, doc.slug);
  const mdxPath = path.join(dir, "page.mdx");
  const tsxPath = path.join(dir, "page.tsx");

  if (DRY_RUN) {
    console.log(`[dry] ${doc.locality} -> ${mdxPath}`);
    return { path: mdxPath, type: "mdx" as const };
  }

  fs.mkdirSync(dir, { recursive: true });
  const mdx = buildMDX(doc);

  const looksRisky = /<\s*\/?\s*script/i.test(mdx) || mdx.length > 25000;

  try {
    if (!looksRisky) {
      fs.writeFileSync(mdxPath, mdx, "utf-8");
      return { path: mdxPath, type: "mdx" as const };
    } else {
      const tsx = buildTSX(doc);
      fs.writeFileSync(tsxPath, tsx, "utf-8");
      return { path: tsxPath, type: "tsx" as const };
    }
  } catch (e) {
    const tsx = buildTSX(doc);
    fs.writeFileSync(tsxPath, tsx, "utf-8");
    return { path: tsxPath, type: "tsx" as const };
  }
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

(async function run() {
  if (!fs.existsSync(PDF_PATH)) {
    console.error(`❌ PDF not found at ${PDF_PATH}. Please upload it and re-run.`);
    process.exit(1);
  }

  const buf = fs.readFileSync(PDF_PATH);
  const parsed = await pdf(buf);
  const text = parsed.text;

  const blocks = splitIntoLocalityBlocks(text);
  if (!blocks.length) {
    console.error("❌ No locality blocks found. Check PDF formatting.");
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

  const summary: Array<{ locality: string; slug: string; path: string; type: "mdx" | "tsx" }> = [];

  for (const doc of docs) {
    const res = writePage(doc);
    summary.push({ locality: doc.locality, slug: doc.slug, path: res.path, type: res.type });
  }

  ensureAreasIndex(docs);

  console.log("\n✅ Generation complete:");
  console.table(
    summary.map((s) => ({
      Locality: s.locality,
      Slug: s.slug,
      File: s.path,
      Format: s.type.toUpperCase(),
    }))
  );
})(); 