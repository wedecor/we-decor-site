/* scripts/seo/assert-no-static-areas.ts */
import { readdirSync, statSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const AREAS = join(ROOT, "app", "areas");
const offenders: string[] = [];

for (const name of readdirSync(AREAS)) {
  if (name === "[slug]") continue;
  const dir = join(AREAS, name);
  if (statSync(dir).isDirectory()) {
    // flag any directory that looks like a page
    try {
      const files = readdirSync(dir);
      if (files.includes("page.tsx") || files.includes("page.jsx")) {
        offenders.push(`app/areas/${name}`);
      }
    } catch {}
  }
}

if (offenders.length) {
  console.error(
    `Found static area routes that will override the dynamic [slug] route:\n` +
    offenders.map((o) => ` - ${o}`).join("\n")
  );
  process.exit(1);
} else {
  console.log("OK: no static area routes found.");
} 