#!/usr/bin/env node
const fs = require("node:fs");
const log = fs.existsSync(".next/build-log.txt") ? fs.readFileSync(".next/build-log.txt", "utf8") : "";
if (/images\.domains is deprecated/i.test(log)) {
  console.error("Found deprecated images.domains usage in build output");
  process.exit(1);
}
console.log("deny-deprecations: OK");