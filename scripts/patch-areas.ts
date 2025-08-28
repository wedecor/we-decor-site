// scripts/patch-areas.ts
import fs from "fs";
import path from "path";

const AREAS_DIR = path.join(process.cwd(), "app", "areas");

const encodeJs = (s: string) =>
  s.replace(/`/g, "\\`").replace(/\$/g, "\\$");

function patchFile(filePath: string) {
  let src = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  // 1) Upgrade WhatsApp CTA
  // Find <a href="https://wa.me/919591232166"> or variants and replace with dynamic encoded text
  if (!/encodeURIComponent\(/.test(src)) {
    // We rely on the const locality = "..."; already present in generated pages
    src = src.replace(
      /<a href="https:\/\/wa\.me\/919591232166">WhatsApp<\/a>/g,
      `<a href={"https://wa.me/919591232166?text=" + encodeURIComponent(\`Hi We Decor! I'm planning an event in \${locality}. Date: _____. Please share themes & pricing.\`) + "&utm_source=site&utm_medium=areas&utm_campaign=local-seo&utm_content=" + encodeURIComponent(locality)}>WhatsApp</a>`
    );
    src = src.replace(
      /\*\*\[WhatsApp]\(https:\/\/wa\.me\/919591232166\)\*\*/g,
      `**[WhatsApp]({"https://wa.me/919591232166?text=" + encodeURIComponent(\`Hi We Decor! I'm planning an event in \${locality}. Date: _____. Please share themes & pricing.\`) + "&utm_source=site&utm_medium=areas&utm_campaign=local-seo&utm_content=" + encodeURIComponent(locality)})**`
    );
    modified = true;
  }

  // 2) Append BreadcrumbList + Service JSON-LD if not present
  if (!/breadcrumb-schema/.test(src) || !/service-schema/.test(src)) {
    const breadcrumbLD = `
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Areas", "item": "https://wedecor.in/areas" },
              { "@type": "ListItem", "position": 2, "name": locality, "item": "https://wedecor.in/areas/" + locality.toLowerCase().replace(/[^a-z0-9]+/g, "-") }
            ]
          })
        }}
      />`;

    const serviceLD = `
      <script id="service-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Event Decoration",
            "areaServed": locality,
            "provider": { "@type": "LocalBusiness", "name": "We Decor" },
            "serviceType": "Event decoration, birthday decoration, wedding decor, balloon decor"
          })
        }}
      />`;

    // Insert both right before closing </main> or end of file
    if (src.includes("</main>")) {
      // Find the closing main tag and insert before it
      const mainEndIndex = src.lastIndexOf("</main>");
      if (mainEndIndex !== -1) {
        const beforeMain = src.substring(0, mainEndIndex);
        const afterMain = src.substring(mainEndIndex);
        src = beforeMain + breadcrumbLD + "\n" + serviceLD + "\n" + afterMain;
      }
    } else {
      // Append at end if main not found (unlikely)
      src += `\n${breadcrumbLD}\n${serviceLD}\n`;
    }
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, src, "utf-8");
    console.log("✔ patched", filePath);
  } else {
    console.log("• no changes", filePath);
  }
}

function run() {
  if (!fs.existsSync(AREAS_DIR)) {
    console.error("❌ app/areas not found.");
    process.exit(1);
  }

  for (const entry of fs.readdirSync(AREAS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const tsx = path.join(AREAS_DIR, entry.name, "page.tsx");
    if (fs.existsSync(tsx)) {
      patchFile(tsx);
    }
  }
  console.log("✅ Patch complete");
}
run(); 