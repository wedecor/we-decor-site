/* eslint-disable no-console */
import { GENERATED_LOCATIONS } from "../../app/(site)/_data/locations.generated";

const BASE = process.env.SEO_BASE_URL ?? "http://localhost:3000";
const LIMIT = Number(process.env.SEO_AREAS_LIMIT ?? 0); // 0 = all

async function head(url: string) {
  const r = await fetch(url, { method: "HEAD", redirect: "manual" });
  return { url, status: r.status };
}

(async () => {
  const slugs = GENERATED_LOCATIONS.map(a => a.slug);
  const sample = LIMIT > 0 ? slugs.slice(0, LIMIT) : slugs;
  const urls = sample.map(s => `${BASE.replace(/\/+$/,"")}/areas/${s}`);
  const results = await Promise.all(urls.map(u => head(u)));
  const bad = results.filter(r => r.status !== 200);
  if (bad.length) {
    console.error("❌ Area URL HEAD failures:", bad.slice(0, 10));
    process.exit(1);
  }
  console.log(`✅ ${results.length} area URLs returned 200`);
})(); 