#!/usr/bin/env node
const fetch = (...a) => import("node-fetch").then(({default:f}) => f(...a));

(async () => {
  const base = process.env.HEADERS_BASE || "http://localhost:3000";
  const res = await fetch(base);
  const need = [
    "content-security-policy",
    "referrer-policy",
    "permissions-policy",
    "x-frame-options",
    "x-content-type-options"
  ];
  let failed = false;
  for (const h of need) {
    const v = res.headers.get(h);
    if (!v) { 
      console.error("Missing header:", h); 
      failed = true; 
    }
  }
  if (failed) process.exit(1);
  console.log("Security headers present");
})();