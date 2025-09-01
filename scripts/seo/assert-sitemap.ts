/* eslint-disable no-console */
const SITEMAP_BASE = process.env.SEO_BASE_URL ?? "http://localhost:3000";

async function get(path: string) {
  const r = await fetch(`${SITEMAP_BASE.replace(/\/+$/, "")}${path}`);
  return { status: r.status, text: await r.text() };
}

(async () => {
  const sm = await get("/sitemap.xml");
  if (sm.status !== 200) throw new Error("sitemap.xml not 200");
  const txt = sm.text;
  const hasAreas = /\/areas\/[\w-]+</.test(txt);
  const hasGallery = /\/gallery</.test(txt);
  if (!hasAreas) throw new Error("sitemap.xml missing /areas/* URLs");
  if (!hasGallery) throw new Error("sitemap.xml missing /gallery");

  const robots = await get("/robots.txt");
  if (robots.status !== 200) throw new Error("robots.txt not 200");
  const mentions = /Sitemap:\s*https?:\/\/[^\s]+\/sitemap\.xml/i.test(robots.text);
  if (!mentions) throw new Error("robots.txt missing Sitemap: line");

  console.log("✅ sitemap.xml & robots.txt look good");
})(); 