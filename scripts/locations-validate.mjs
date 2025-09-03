import { readFile } from 'node:fs/promises';

const csvPath = 'content/locations/locations.csv';
const raw = await readFile(csvPath, 'utf8');
const lines = raw.trim().split('\n');

// Skip header
const rows = lines.slice(1).map((line) => {
  const [slug, name, landmarks, venue_types, vibe, local_notes] = line.split('|');
  return { slug, name, landmarks, venue_types, vibe, local_notes };
});

const seen = new Set();
const errs = [];

rows.forEach((r, i) => {
  const row = i + 2; // header is row 1
  const slug = (r.slug || '').trim();
  const name = (r.name || '').trim();
  if (!slug) errs.push(`Row ${row}: missing slug`);
  if (!name) errs.push(`Row ${row}: missing name`);
  if (slug && seen.has(slug)) errs.push(`Row ${row}: duplicate slug "${slug}"`);
  seen.add(slug);

  if ((r.landmarks || '').split(',').filter((s) => s.trim()).length === 0)
    errs.push(`Row ${row}: please add at least 1 landmark`);
  if ((r.venue_types || '').split(',').filter((s) => s.trim()).length === 0)
    errs.push(`Row ${row}: please add at least 1 venue_type`);
});

if (rows.length !== 30)
  errs.push(`Expected 30 data rows; found ${rows.length} (${lines.length} total lines)`);

if (errs.length) {
  console.error('❌ Validation failed:\n- ' + errs.join('\n- '));
  process.exit(1);
}
console.log('✅ locations.csv looks good:', rows.length, 'data rows');
