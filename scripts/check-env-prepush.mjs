#!/usr/bin/env node
// Fails if NEXT_PUBLIC_SITE_URL is missing/invalid (https) before push.
const url = process.env.NEXT_PUBLIC_SITE_URL || "";
const isValid = (() => {
  try {
    const u = new URL(url);
    return ["https:"].includes(u.protocol) && !!u.hostname;
  } catch {
    return false;
  }
})();
if (!isValid) {
  console.error("❌ NEXT_PUBLIC_SITE_URL is missing or invalid. Example:");
  console.error('   export NEXT_PUBLIC_SITE_URL="https://www.wedecorevents.com"');
  process.exit(2);
}
console.log("✅ NEXT_PUBLIC_SITE_URL OK:", url);

