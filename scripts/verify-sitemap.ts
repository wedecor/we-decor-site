// scripts/verify-sitemap.ts
/* eslint-disable no-console */
import { writeFileSync } from "node:fs";

const BASE = process.env.BASE_URL || "https://www.wedecorevents.com";
const REPORT = "reports/sitemap-diagnosis.txt";
const LIMIT = Number(process.env.SITEMAP_CHECK_LIMIT ?? 20);

type FetchInfo = { url: string; status: number; contentType?: string; len?: number; note?: string };

async function headStatus(u: string) {
  const r = await fetch(u, { method: "HEAD", redirect: "manual" });
  return { url: u, status: r.status };
}

async function get(u: string): Promise<FetchInfo & { text?: string }> {
  const r = await fetch(u, { redirect: "manual" });
  const ct = r.headers.get("content-type") ?? "";
  const text = await r.text();
  return { url: u, status: r.status, contentType: ct, len: text.length, text };
}

function isXml(ct?: string) {
  return !!ct && /xml/i.test(ct);
}

function looksLikeSitemap(xml: string) {
  return /<(urlset|sitemapindex)\b/i.test(xml);
}

function extractUrls(xml: string): string[] {
  // naive, but robust enough for validation
  const urls: string[] = [];
  const urlRegex = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m: RegExpExecArray | null;
  while ((m = urlRegex.exec(xml))) urls.push(m[1].trim());
  return urls;
}

(async () => {
  let out: string[] = [];
  const ensure = (ok: boolean, msg: string) => out.push(`${ok ? "✓" : "✗"} ${msg}`);

  // 1) Check /sitemap.xml
  const live = await get(`${BASE}/sitemap.xml`);
  ensure(live.status === 200, `/sitemap.xml returns 200 (got ${live.status})`);
  ensure(isXml(live.contentType), `content-type is XML (got "${live.contentType}")`);
  ensure(live.text ? looksLikeSitemap(live.text) : false, "XML contains <urlset> or <sitemapindex>");

  let urls: string[] = [];
  if (live.text) {
    urls = extractUrls(live.text);
    ensure(urls.length > 0, `extracted URLs > 0 (found ${urls.length})`);
    const nonCanonical = urls.filter(u => !u.startsWith(BASE));
    ensure(nonCanonical.length === 0, `all <loc> start with ${BASE} (non-canonical: ${nonCanonical.length})`);
  }

  // 2) Legacy /api/sitemap.xml behavior (should 301/308 to /sitemap.xml)
  const legacy = await fetch(`${BASE}/api/sitemap.xml`, { redirect: "manual" });
  const legacyRedirect = legacy.status === 301 || legacy.status === 308 || legacy.status === 307;
  ensure(legacyRedirect, `/api/sitemap.xml redirects (got ${legacy.status})`);

  // 3) HEAD check first N URLs
  const sample = urls.slice(0, LIMIT);
  const headResults = await Promise.all(sample.map(u => headStatus(u)));
  const bad = headResults.filter(h => h.status !== 200);
  ensure(bad.length === 0, `first ${sample.length} URLs return 200 (bad: ${bad.length})`);

  // 4) Size sanity
  ensure((urls.length || 0) <= 50000, `URL count <= 50,000 (found ${urls.length})`);

  // Write report
  out.push("");
  out.push(`Checked: ${BASE}/sitemap.xml`);
  out.push(`Status: ${live.status}, Content-Type: ${live.contentType}, Length: ${live.len}`);
  out.push(`URL Count: ${urls.length}`);
  if (bad.length) {
    out.push(`Bad URLs:`);
    bad.slice(0, 10).forEach(b => out.push(` - ${b.url} -> ${b.status}`));
  }
  writeFileSync(REPORT, out.join("\n"));
  console.log(out.join("\n"));
})().catch(e => {
  console.error("Verifier failed:", e);
  process.exit(1);
});