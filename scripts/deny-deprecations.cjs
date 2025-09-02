#!/usr/bin/env node
const fs = require("node:fs");
const p = ".next/build-log.txt";
if (!fs.existsSync(p)) {
  console.error("Build log missing:", p);
  process.exit(1);
}
const log = fs.readFileSync(p, "utf8");
if (/images\.domains is deprecated/i.test(log)) {
  console.error("Found deprecated images.domains usage");
  process.exit(1);
}
console.log("No deprecated Next.js warnings");

