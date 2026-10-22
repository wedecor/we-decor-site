/**
 * Upload ~/Desktop/wedecor images/web-images/ to Cloudinary as we-decor/web-set/,
 * keeping occasion subfolders. Credentials come from .env.local — never hardcode.
 *
 *   node scripts/upload-web-set.mjs
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { v2 as cloudinary } from 'cloudinary';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE =
  process.env.WEB_SET_DIR ||
  path.join(process.env.HOME || '', 'Desktop/wedecor images/web-images');
const PREFIX = 'we-decor/web-set';
const CONCURRENCY = 5;

async function loadEnvLocal() {
  const text = await readFile(path.join(ROOT, '.env.local'), 'utf8');
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const i = line.indexOf('=');
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

async function listWebp(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await listWebp(full, acc);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.webp')) acc.push(full);
  }
  return acc;
}

function publicIdFor(filePath) {
  const rel = path.relative(SOURCE, filePath).split(path.sep).join('/');
  return `${PREFIX}/${rel.replace(/\.webp$/i, '')}`;
}

async function uploadOne(filePath, attempt = 1) {
  const publicId = publicIdFor(filePath);
  try {
    await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      unique_filename: false,
      resource_type: 'image',
      invalidate: true,
    });
  } catch (err) {
    if (attempt >= 4) throw err;
    const wait = attempt * 1500;
    await new Promise((r) => setTimeout(r, wait));
    return uploadOne(filePath, attempt + 1);
  }
}

async function main() {
  await loadEnvLocal();
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD ||
    'dux3m2saz';
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiKey || !apiSecret) {
    console.error('Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET in .env.local');
    process.exit(1);
  }
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

  const srcStat = await stat(SOURCE).catch(() => null);
  if (!srcStat?.isDirectory()) {
    console.error(`Source folder not found: ${SOURCE}`);
    process.exit(1);
  }

  const files = await listWebp(SOURCE);
  console.log(`Uploading ${files.length} files from web-images/ → ${PREFIX}/`);

  let done = 0;
  let failed = 0;
  const errors = [];
  let index = 0;

  async function worker() {
    while (index < files.length) {
      const i = index;
      index += 1;
      const file = files[i];
      try {
        await uploadOne(file);
        done += 1;
        if (done % 25 === 0 || done === files.length) {
          console.log(`  ${done}/${files.length} uploaded`);
        }
      } catch (err) {
        failed += 1;
        errors.push(`${path.relative(SOURCE, file)}: ${err.message || err}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log(`Done. uploaded=${done} failed=${failed}`);
  if (errors.length) {
    console.error(errors.slice(0, 20).join('\n'));
    process.exit(1);
  }
}

main();
