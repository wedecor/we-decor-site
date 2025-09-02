import { readdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const BASE = path.join(ROOT, "public", "services");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function badName(name) {
  return /\s|[^a-zA-Z0-9._/-]/.test(name);
}

(async () => {
  try {
    for await (const file of walk(BASE)) {
      const ext = path.extname(file).toLowerCase();
      if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

      if (badName(file)) {
        console.warn(`WARN: Suspicious filename (spaces/specials): ${file}`);
      }

      const img = sharp(file).rotate();

      const webpOut = file.replace(ext, ".webp");
      const avifOut = file.replace(ext, ".avif");

      await img.webp({ quality: 82 }).toFile(webpOut);
      await img.avif({ quality: 50 }).toFile(avifOut);

      console.log(`Converted: ${path.relative(ROOT, file)} -> .webp & .avif`);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

