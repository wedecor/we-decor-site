import { readdir } from 'fs/promises';
import path from 'path';

const BASE = path.join(process.cwd(), 'public', 'services');
const bad = [];
const RE_BAD = /\s|[^a-zA-Z0-9._/-]/; // spaces or odd chars

async function walk(dir, acc = []) {
  const ents = await readdir(dir, { withFileTypes: true });
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

try {
  const files = await walk(BASE, []);
  for (const f of files) {
    const rel = path.relative(process.cwd(), f);
    if (RE_BAD.test(rel)) bad.push(rel);
  }
  if (bad.length) {
    console.error('❌ Invalid filenames in /public/services (no spaces or special chars):');
    for (const b of bad) console.error('  -', b);
    process.exit(2);
  }
  console.log('✅ Filenames OK in /public/services');
} catch (e) {
  // If folder doesn't exist, don't block commit
  console.log('ℹ️  /public/services not found; skipping filename check');
}
