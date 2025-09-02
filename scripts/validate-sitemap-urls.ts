import assert from "node:assert/strict";
import fetch from "node-fetch";

const base = process.env.NEXT_PUBLIC_SITE_URL!;
const want = [
  "/areas/east-bangalore",
  "/areas/west-bangalore",
  "/areas/north-bangalore",
  "/areas/south-bangalore",
  "/areas/central-bangalore",
];

(async () => {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const u of want) {
    assert(xml.includes(`${base}${u}`), `Missing ${u} in sitemap`);
  }
  console.log("sitemap validation OK");
})();