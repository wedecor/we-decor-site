import { readFile, writeFile } from 'node:fs/promises';

const csvPath = 'content/locations/locations.csv';
const outPath = 'app/(site)/_data/locations.ts';

const raw = await readFile(csvPath, 'utf8');
const lines = raw.trim().split('\n');

// Skip header
const rows = lines.slice(1).map(line => {
  const [slug, name, landmarks, venue_types, vibe, local_notes] = line.split('|');
  return { slug, name, landmarks, venue_types, vibe, local_notes };
});

function toArray(csvField) {
  return csvField.split(',').map(s => s.trim()).filter(Boolean);
}

const AREAS = rows.map(r => ({
  slug: r.slug.trim(),
  name: r.name.trim(),
  vibe: (r.vibe || '').trim() || undefined,
  landmarks: toArray(r.landmarks || ''),
  venueTypes: toArray(r.venue_types || ''),
  // local_notes is not exported (internal), but you can use it later
}));

// Build TS file content with the same template engine you're using
const file = `/* AUTO-GENERATED: DO NOT EDIT. Edit ${csvPath} and run \`npm run locations:sync\`. */

export type ServiceKey =
  | 'Birthday'
  | 'Haldi'
  | 'Wedding'
  | 'Engagement'
  | 'Anniversary'
  | 'Proposal'
  | 'Baby Shower'
  | 'Corporate';

export type Area = {
  slug: string;
  name: string;
  vibe?: string;
  landmarks?: string[];
  venueTypes?: string[];
  serviceDescriptions?: Record<ServiceKey, string>;
};

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.wedecorevents.com';
export const BUSINESS_NAME = 'We Decor';
export const CITY = 'Bengaluru';
export const PHONE_DISPLAY = '+91 8880544452';

export const SERVICES: ServiceKey[] = ['Birthday','Haldi','Wedding','Engagement','Anniversary','Proposal','Baby Shower','Corporate'];

type Ctx = { name: string; city: string; landmarks: string[]; venueTypes: string[]; vibe?: string };

const pick = (arr: string[] | undefined, n = 2): string[] => (arr ?? []).slice(0, n);
const joinList = (items: string[]): string => items.length === 0 ? '' : items.length === 1 ? items[0] : \`\${items[0]} and \${items[1]}\`;

const TEMPLATES: Record<ServiceKey, (c: Ctx) => string> = {
  Birthday: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      \`Celebrate birthdays in \${name}, \${city} with stylish balloon arches, fairy lights and photo-ready backdrops. \` +
      \`We tailor setups for \${vt}\${vt ? ' ' : ''}\${lm ? \`near \${lm} \` : ''}\` +
      \`and keep access, power and space in mind. From intimate home parties to chic cafés, We Decor makes it effortless to host and enjoy.\`
    );
  },
  Haldi: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      \`Bright, traditional haldi decor in \${name}, \${city} with marigolds, haldi-friendly seating and easy cleanup. \` +
      \`We build compact, photo-rich stages for \${vt}\${vt ? ' ' : ''}\${lm ? \`around \${lm} \` : ''}\` +
      \`and coordinate entry, water points and floor protection so families can focus on the rituals.\`
    );
  },
  Wedding: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      \`Elegant wedding decor in \${name}, \${city}, blending florals, drapes and warm lighting for timeless photos. \` +
      \`We adapt mandap and stage designs to \${vt}\${vt ? ' ' : ''}\${lm ? \`near \${lm} \` : ''}\` +
      \`and manage logistics—vendor timings, load-in and power—so ceremonies run beautifully on schedule.\`
    );
  },
  Engagement: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      \`Chic engagement setups in \${name}, \${city} with floral arches, pastel palettes and modern signage. \` +
      \`Perfect for \${vt}\${vt ? ' ' : ''}\${lm ? \`around \${lm} \` : ''}\` +
      \`our layouts emphasise couple portraits, ring exchange flow and guest movement for effortless celebrations.\`
    );
  },
  Anniversary: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      \`Romantic anniversary decor in \${name}, \${city}: candles, subtle florals and cosy lighting for memorable dinners. \` +
      \`We style intimate corners across \${vt}\${vt ? ' ' : ''}\${lm ? \`near \${lm} \` : ''}\` +
      \`and include compact backdrop ideas that photograph beautifully without crowding smaller spaces.\`
    );
  },
  Proposal: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      \`Dreamy proposal setups in \${name}, \${city} with fairy-lit tents, flowers and custom signage. \` +
      \`Designed for discreet arrival and quick reveal, our layouts suit \${vt}\${vt ? ' ' : ''}\${lm ? \`around \${lm} \` : ''}\` +
      \`so the moment feels private, elegant and perfectly photographed.\`
    );
  },
  'Baby Shower': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      \`Soft, pastel baby-shower decor in \${name}, \${city} with balloon clouds, welcome boards and photo corners. \` +
      \`We plan stroller-friendly layouts for \${vt}\${vt ? ' ' : ''}\${lm ? \`near \${lm} \` : ''}\` +
      \`and ensure seating, cake table and gifts area are easy to access for guests and family.\`
    );
  },
  Corporate: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      \`Crisp corporate decor in \${name}, \${city} for launches, townhalls and team parties. \` +
      \`We deliver brand-aligned backdrops and photo walls tailored to \${vt}\${vt ? ' ' : ''}\${lm ? \`around \${lm} \` : ''}\` +
      \`with clean cabling, quick turnaround and minimal disruption to workspaces.\`
    );
  },
};

const buildServiceDescriptions = (a) => {
  const ctx = { name: a.name, city: CITY, landmarks: a.landmarks ?? [], venueTypes: a.venueTypes ?? ['apartments','rooftops'], vibe: a.vibe };
  const out = {};
  for (const s of SERVICES) out[s] = TEMPLATES[s](ctx);
  return out;
};

export const AREAS: Area[] = ${JSON.stringify(AREAS, null, 2)};
export const AREAS_WITH_DESCRIPTIONS: Area[] = AREAS.map(a => ({ ...a, serviceDescriptions: buildServiceDescriptions(a) }));
`;

await writeFile(outPath, file, 'utf8');
console.log('✅ Wrote', outPath, 'from', csvPath); 