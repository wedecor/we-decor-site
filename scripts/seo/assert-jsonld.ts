/* eslint-disable no-console */
const JSONLD_BASE = process.env.SEO_BASE_URL ?? "http://localhost:3000";

async function fetchUrl(u: string) {
  const r = await fetch(u);
  const html = await r.text();
  return { status: r.status, html };
}

function extractJsonLd(html: string) {
  const scripts = Array.from(html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi));
  const blocks: any[] = [];
  for (const m of scripts) {
    const raw = m[1].trim();
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) blocks.push(...parsed);
      else blocks.push(parsed);
    } catch {}
  }
  return blocks;
}

(async () => {
  const base = JSONLD_BASE.replace(/\/+$/, "");

  // Home: expect LocalBusiness
  const home = await fetchUrl(`${base}/`);
  if (home.status !== 200) throw new Error("Home not 200");
  const homeLd = extractJsonLd(home.html);
  const hasLocalBusiness = homeLd.some(b => b["@type"] === "LocalBusiness" || (Array.isArray(b["@type"]) && b["@type"].includes("LocalBusiness")));
  if (!hasLocalBusiness) throw new Error("LocalBusiness JSON-LD missing on home");

  // Gallery: expect BreadcrumbList
  const gal = await fetchUrl(`${base}/gallery`);
  if (gal.status !== 200) throw new Error("Gallery not 200");
  const galLd = extractJsonLd(gal.html);
  const hasBreadcrumbs = galLd.some(b => b["@type"] === "BreadcrumbList");
  if (!hasBreadcrumbs) throw new Error("BreadcrumbList JSON-LD missing on /gallery");

  // Area: pick one slug likely present (koramangala), fallback to first
  const candidates = ["koramangala", "indiranagar", "whitefield"];
  let slug = candidates.find(Boolean) || "koramangala";
  const area = await fetchUrl(`${base}/areas/${slug}`);
  if (area.status !== 200) throw new Error(`/areas/${slug} not 200`);
  const areaLd = extractJsonLd(area.html);
  const hasFaq = areaLd.some(b => b["@type"] === "FAQPage");
  if (!hasFaq) throw new Error(`FAQPage JSON-LD missing on /areas/${slug}`);

  console.log("✅ JSON-LD present: LocalBusiness (home), BreadcrumbList (gallery), FAQPage (area)");
})(); 