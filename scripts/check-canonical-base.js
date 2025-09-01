// scripts/check-canonical-base.js
// Fails CI if NEXT_PUBLIC_SITE_URL (or default) isn't canonical
const envSite = process.env.NEXT_PUBLIC_SITE_URL || "";
const resolved = (envSite || "https://www.wedecorevents.com").trim().replace(/\/+$/, "");

if (!/^https:\/\/www\.wedecorevents\.com$/.test(resolved)) {
  console.error(`❌ Non-canonical NEXT_PUBLIC_SITE_URL: "${resolved}"`);
  console.error(`Expected: https://www.wedecorevents.com`);
  console.error(`Got: ${resolved}`);
  process.exit(1);
}
console.log(`✅ Canonical base OK: ${resolved}`); 