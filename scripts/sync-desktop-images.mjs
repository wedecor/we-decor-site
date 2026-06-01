#!/usr/bin/env node
/**
 * Copy & optimize images from ~/Desktop/Images/{event}/ into public/ for the site.
 *
 * Usage:
 *   node scripts/sync-desktop-images.mjs
 *   IMAGES_ROOT=/path/to/Images node scripts/sync-desktop-images.mjs
 */

import { mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const IMAGES_ROOT = process.env.IMAGES_ROOT || path.join(process.env.HOME || '', 'Desktop/Images');

/** [source relative to IMAGES_ROOT, output under public/, preset] */
const JOBS = [
  // Homepage "Recent atmospheres" grid
  ['haldi/IMG_20260128_181953.jpg', 'home-preview/haldi.webp', 'gallery'],
  ['birthday/IMG_20250723_162441.jpg', 'home-preview/birthday.webp', 'gallery'],
  ['reception/IMG_20260301_173308.jpg', 'home-preview/reception.webp', 'gallery'],
  ['proposal/IMG_20250802_123448.jpg', 'home-preview/outdoor.webp', 'gallery'],
  // Service cards on homepage
  ['birthday/IMG_20250723_162441.jpg', 'services/birthday.webp', 'service'],
  ['haldi/IMG_20260128_181953.jpg', 'services/haldi.webp', 'service'],
  ['engagement/IMG_20260113_222421.jpg', 'services/engagement.webp', 'service'],
  ['reception/IMG_20260301_173340.jpg', 'services/corporate.webp', 'service'],
  ['roomdecor/IMG_20260101_125537.jpg', 'services/room-decor.webp', 'service'],
  ['proposal/IMG_20250802_123448.jpg', 'services/tent-balloon.webp', 'service'],
];

const PRESETS = {
  service: { maxWidth: 800, maxHeight: 600, webpQuality: 82 },
  gallery: { maxWidth: 1280, maxHeight: 960, webpQuality: 80 },
};

async function optimize(inputPath, outputPath, presetName) {
  const preset = PRESETS[presetName];
  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(inputPath, { failOn: 'none' })
    .rotate()
    .resize({
      width: preset.maxWidth,
      height: preset.maxHeight,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: preset.webpQuality })
    .toFile(outputPath);
  const { size } = await import('fs/promises').then((fs) => fs.stat(outputPath));
  console.log(`✓ ${path.relative(ROOT, outputPath)} (${Math.round(size / 1024)} KB)`);
}

async function main() {
  console.log(`Source: ${IMAGES_ROOT}\n`);
  let ok = 0;
  for (const [relIn, relOut, preset] of JOBS) {
    const input = path.join(IMAGES_ROOT, relIn);
    const output = path.join(ROOT, 'public', relOut);
    try {
      await optimize(input, output, preset);
      ok++;
    } catch (e) {
      console.error(`✗ ${relIn} → ${relOut}: ${e.message}`);
    }
  }
  console.log(`\nDone: ${ok}/${JOBS.length} images`);
  if (ok === 0) process.exit(1);
}

main();
