import assert from "node:assert/strict";
const BASE = process.env.HEADERS_BASE || "http://localhost:3001";
const routes = ["/", "/sitemap.xml", "/robots.txt"];

const must = {
  "x-frame-options": (v) => v?.includes("SAMEORIGIN") || v?.includes("DENY"),
  "x-content-type-options": (v) => v === "nosniff",
  "referrer-policy": (v) => v?.startsWith("strict-origin-when-cross-origin"),
  "strict-transport-security": (v) => !v || v?.includes("max-age=31536000"),
};

const fetch = (await import("node-fetch")).default;

for (const r of routes) {
  const res = await fetch(`${BASE}${r}`);
  console.log(`Checking ${BASE}${r} → ${res.status}`);
  for (const [k, ok] of Object.entries(must)) {
    const v = res.headers.get(k);
    assert.ok(ok(v), `Header ${k} invalid on ${r}: ${v}`);
  }
}
console.log("✅ Headers OK");

