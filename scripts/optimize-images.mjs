#!/usr/bin/env node
/**
 * Production image optimization pipeline.
 * Resizes, compresses, and emits WebP (+ optional AVIF) with a JSON manifest.
 *
 * Usage:
 *   node scripts/optimize-images.mjs              # services, logo, hero
 *   node scripts/optimize-images.mjs --gallery      # include public/gallery (slow)
 *   node scripts/optimize-images.mjs --remove-originals
 */

import { readdir, mkdir, rename, stat, writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const ORIGINALS = path.join(PUBLIC, '_originals');
const MANIFEST_PATH = path.join(ROOT, 'artifacts', 'image-optimization-manifest.json');

const args = new Set(process.argv.slice(2));
const INCLUDE_GALLERY = args.has('--gallery');
const REMOVE_ORIGINALS = args.has('--remove-originals');

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.JPG', '.JPEG', '.PNG']);

/** Max dimension + WebP quality by usage category */
const PRESETS = {
  service: { maxWidth: 800, maxHeight: 600, webpQuality: 82 },
  hero: { maxWidth: 1920, maxHeight: 1080, webpQuality: 85 },
  logo: { maxWidth: 144, maxHeight: 144, webpQuality: 90 },
  gallery: { maxWidth: 1280, maxHeight: 960, webpQuality: 80 },
  default: { maxWidth: 1200, maxHeight: 900, webpQuality: 80 },
};

/** Homepage service cards: legacy path → optimized asset */
const SERVICE_IMAGE_MAP = {
  '/services/birthday.JPG': '/services/birthday.webp',
  '/services/haldi.jpg': '/services/haldi.webp',
  '/services/engagement.jpg': '/services/engagement.webp',
  '/services/corporate.JPG': '/services/corporate.webp',
  '/services/tent and baloon.jpg': '/services/tent-balloon.webp',
  '/services/room decor.jpg': '/services/room-decor.webp',
};

const SERVICE_OUTPUTS = [
  { input: 'birthday.JPG', output: 'birthday.webp', preset: 'service' },
  { input: 'haldi.jpg', output: 'haldi.webp', preset: 'service' },
  { input: 'engagement.jpg', output: 'engagement.webp', preset: 'service' },
  { input: 'corporate.JPG', output: 'corporate.webp', preset: 'service' },
  { input: 'tent and baloon.jpg', output: 'tent-balloon.webp', preset: 'service' },
  { input: 'room decor.jpg', output: 'room-decor.webp', preset: 'service' },
];

async function fileSize(filePath) {
  try {
    const s = await stat(filePath);
    return s.size;
  } catch {
    return 0;
  }
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

async function optimizeFile(inputPath, outputPath, presetName) {
  const preset = PRESETS[presetName] || PRESETS.default;
  const before = await fileSize(inputPath);

  const pipeline = sharp(inputPath, { failOn: 'none' })
    .rotate()
    .resize({
      width: preset.maxWidth,
      height: preset.maxHeight,
      fit: 'inside',
      withoutEnlargement: true,
    });

  await pipeline.webp({ quality: preset.webpQuality, effort: 4 }).toFile(outputPath);

  const after = await fileSize(outputPath);
  const meta = await sharp(outputPath).metadata();

  return {
    input: path.relative(ROOT, inputPath),
    output: path.relative(ROOT, outputPath),
    before,
    after,
    width: meta.width,
    height: meta.height,
    ratio: before > 0 ? ((1 - after / before) * 100).toFixed(1) : '0',
  };
}

async function archiveOriginal(filePath) {
  const rel = path.relative(PUBLIC, filePath);
  const dest = path.join(ORIGINALS, rel);
  await mkdir(path.dirname(dest), { recursive: true });
  await rename(filePath, dest);
}

async function walkImages(dir) {
  const files = [];
  async function walk(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.name === '_originals' || entry.name.startsWith('.')) continue;
      if (entry.isDirectory()) await walk(full);
      else if (IMAGE_EXT.has(path.extname(entry.name))) files.push(full);
    }
  }
  await walk(dir);
  return files;
}

async function optimizeServices(manifest) {
  const servicesDir = path.join(PUBLIC, 'services');
  for (const { input, output, preset } of SERVICE_OUTPUTS) {
    const inputPath = path.join(servicesDir, input);
    const outputPath = path.join(servicesDir, output);
    try {
      await stat(inputPath);
    } catch {
      if (await fileSize(outputPath)) {
        console.log(`SKIP (already optimized): ${output}`);
        continue;
      }
      console.warn(`MISSING: ${input}`);
      continue;
    }
    const row = await optimizeFile(inputPath, outputPath, preset);
    manifest.push({ ...row, category: 'service' });
    console.log(
      `SERVICE ${output}: ${formatBytes(row.before)} → ${formatBytes(row.after)} (−${row.ratio}%)`
    );
    if (REMOVE_ORIGINALS) await archiveOriginal(inputPath);
  }
}

async function optimizeBrandAssets(manifest) {
  const logoIn = path.join(PUBLIC, 'logo.png');
  const logoWebp = path.join(PUBLIC, 'logo.webp');
  const logoPngSmall = path.join(PUBLIC, 'logo-optimized.png');

  if (await fileSize(logoIn)) {
    manifest.push({ ...(await optimizeFile(logoIn, logoWebp, 'logo')), category: 'logo-webp' });
    await sharp(logoIn)
      .resize(144, 144, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 90, compressionLevel: 9, palette: true })
      .toFile(logoPngSmall);
    const pngAfter = await fileSize(logoPngSmall);
    const pngBefore = await fileSize(logoIn);
    manifest.push({
      input: 'public/logo.png',
      output: 'public/logo-optimized.png',
      before: pngBefore,
      after: pngAfter,
      category: 'logo-png',
      ratio: pngBefore > 0 ? ((1 - pngAfter / pngBefore) * 100).toFixed(1) : '0',
    });
    await rename(logoPngSmall, logoIn);
    console.log(`LOGO PNG: ${formatBytes(pngBefore)} → ${formatBytes(pngAfter)}`);
    console.log(`LOGO WEBP: ${formatBytes(await fileSize(logoWebp))}`);
  }

  const heroIn = path.join(PUBLIC, 'og-banner.jpg');
  const heroWebp = path.join(PUBLIC, 'og-banner.webp');
  if (await fileSize(heroIn)) {
    const row = await optimizeFile(heroIn, heroWebp, 'hero');
    manifest.push({ ...row, category: 'hero-webp' });
    const heroJpgOpt = path.join(PUBLIC, 'og-banner-opt.jpg');
    await sharp(heroIn)
      .rotate()
      .resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(heroJpgOpt);
    await rename(heroJpgOpt, heroIn);
    const jpgAfter = await fileSize(heroIn);
    manifest.push({
      input: row.input,
      output: 'public/og-banner.jpg',
      before: row.before,
      after: jpgAfter,
      category: 'hero-jpg',
    });
    console.log(`HERO: webp ${formatBytes(row.after)}, jpg ${formatBytes(jpgAfter)}`);
  }
}

async function optimizeGallery(manifest) {
  const galleryDir = path.join(PUBLIC, 'gallery');
  const images = await walkImages(galleryDir);
  console.log(`Gallery: ${images.length} files to process…`);

  for (const file of images) {
    if (file.endsWith('.webp') || file.endsWith('.avif')) continue;
    const ext = path.extname(file);
    const base = file.slice(0, -ext.length);
    const out = `${base}.webp`;
    if ((await fileSize(out)) > 0 && (await fileSize(file)) === 0) continue;

    try {
      const row = await optimizeFile(file, out, 'gallery');
      manifest.push({ ...row, category: 'gallery' });
      console.log(`GALLERY ${path.basename(out)}: −${row.ratio}%`);
      if (REMOVE_ORIGINALS) await archiveOriginal(file);
    } catch (e) {
      console.warn(`FAIL ${file}:`, e.message);
    }
  }
}

(async () => {
  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  if (REMOVE_ORIGINALS) await mkdir(ORIGINALS, { recursive: true });

  const manifest = [];
  const started = Date.now();

  console.log('=== We Decor image optimization ===\n');
  await optimizeBrandAssets(manifest);
  await optimizeServices(manifest);
  if (INCLUDE_GALLERY) await optimizeGallery(manifest);

  const totalBefore = manifest.reduce((s, r) => s + (r.before || 0), 0);
  const totalAfter = manifest.reduce((s, r) => s + (r.after || 0), 0);

  const summary = {
    generatedAt: new Date().toISOString(),
    durationMs: Date.now() - started,
    files: manifest.length,
    totalBefore,
    totalAfter,
    savedBytes: totalBefore - totalAfter,
    savedPercent: totalBefore > 0 ? ((1 - totalAfter / totalBefore) * 100).toFixed(1) : '0',
    items: manifest,
  };

  await writeFile(MANIFEST_PATH, JSON.stringify(summary, null, 2));
  console.log('\n=== Summary ===');
  console.log(`Files: ${manifest.length}`);
  console.log(`Total: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (−${summary.savedPercent}%)`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
})();
