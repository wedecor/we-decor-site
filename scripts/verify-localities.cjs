#!/usr/bin/env node
const assert = (cond, msg) => { if (!cond) { console.error(msg); process.exit(1); } };
const targets = [
  "/areas/east-bangalore",
  "/areas/west-bangalore",
  "/areas/north-bangalore",
  "/areas/south-bangalore",
  "/areas/central-bangalore",
  "/areas/basavanagudi",
  "/areas/whitefield",
  "/areas/koramangala",
];
console.log("Verifying locality routes & sections…");
const hasRequired = (html) =>
  /<h2[^>]*>[^<]*Case Study/i.test(html) && /<h2[^>]*>[^<]*Call to Action/i.test(html);

(async () => {
  const { spawn } = await import("node:child_process");
  const server = spawn("npm", ["run", "start:testenv"], { stdio: "inherit", shell: true });
  setTimeout(async () => {
    const fetch = (await import("undici")).fetch;
    for (const url of targets) {
      const res = await fetch(`http://localhost:3000${url}`);
      const html = await res.text();
      assert(res.status === 200, `Route failed: ${url}`);
      assert(hasRequired(html), `Missing Case Study / CTA on: ${url}`);
    }
    console.log("Locality verification passed.");
    server.kill();
    process.exit(0);
  }, 2500);
})();

