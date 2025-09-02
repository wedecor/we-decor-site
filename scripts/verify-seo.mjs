import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const fetch = (await import("node-fetch")).default;
const BASE = process.env.SEO_BASE || "http://localhost:3001";
const routes = ["/", "/gallery", "/contact"];

for (const r of routes) {
  const html = await (await fetch(`${BASE}${r}`)).text();
  const dom = new JSDOM(html);
  const d = dom.window.document;

  const title = d.querySelector("title")?.textContent?.trim();
  const desc = d.querySelector('meta[name="description"]')?.getAttribute("content");
  const canon = d.querySelector('link[rel="canonical"]')?.getAttribute("href");
  const og = d.querySelector('meta[property="og:title"]');
  const tw = d.querySelector('meta[name="twitter:card"]');
  assert.ok(title && title.length > 10, `${r}: title too short`);
  assert.ok(desc && desc.length > 50, `${r}: description too short`);
  assert.ok(canon?.startsWith("https://"), `${r}: canonical missing/invalid`);
  assert.ok(og, `${r}: missing OG tags`);
  assert.ok(tw, `${r}: missing Twitter card`);

  const hasJsonLd = [...d.querySelectorAll('script[type="application/ld+json"]')].some((s) => s.textContent?.includes("@context"));
  assert.ok(hasJsonLd, `${r}: missing JSON-LD`);
  console.log(`✅ SEO OK for ${r}`);
}
console.log("✅ SEO checks passed");

