import { readFile, writeFile } from 'node:fs/promises';

const csvPath = 'content/locations/locations.csv';
const outPath = 'app/(site)/_data/locations.ts';

const raw = await readFile(csvPath, 'utf8');

// Hand-written per-locality content (heroTagline / waPrefill / uniqueFAQ) that
// has no CSV column. This file exists because an earlier `locations:sync` run
// silently destroyed those fields: they lived only in the generated .ts, which
// the header tells everyone not to edit. Merged back in below.
const overrides = JSON.parse(await readFile('content/locations/overrides.json', 'utf8'));
const lines = raw.trim().split('\n');

// Skip header
const rows = lines.slice(1).map((line) => {
  const [slug, name, landmarks, venue_types, vibe, local_notes] = line.split('|');
  return { slug, name, landmarks, venue_types, vibe, local_notes };
});

function toArray(csvField) {
  return csvField
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

const AREAS = rows.map((r) => ({
  slug: r.slug.trim(),
  name: r.name.trim(),
  vibe: (r.vibe || '').trim() || undefined,
  landmarks: toArray(r.landmarks || ''),
  venueTypes: toArray(r.venue_types || ''),
  // local_notes is not exported (internal), but you can use it later
  ...(overrides[r.slug.trim()] ?? {}),
}));

const orphanOverrides = Object.keys(overrides).filter(
  (slug) => !AREAS.some((a) => a.slug === slug)
);
if (orphanOverrides.length) {
  console.error('❌ overrides.json has slugs with no CSV row: ' + orphanOverrides.join(', '));
  process.exit(1);
}

// Build TS file content with the same template engine you're using
const file = `/* AUTO-GENERATED: DO NOT EDIT. Edit ${csvPath} and run \`npm run locations:sync\`. */

export type ServiceKey =
  | 'Birthday'
  | 'Haldi'
  | 'Wedding'
  | 'Engagement'
  | 'Home Decor'
  | 'Baby Shower'
  | 'Balloon Decor'
  | 'Floral Decor'
  | 'Bridal Room'
  | 'Proposal'
  | 'Anniversary'
  | 'Car Decor'
  | 'Nikah'
  | 'Terrace Decor'
  | 'Cabana Tent'
  | 'Corporate';

export type Area = {
  slug: string;
  name: string;
  vibe?: string;
  landmarks?: string[];
  venueTypes?: string[];
  serviceDescriptions?: Record<ServiceKey, string>;
  // Locality-specific content to reduce duplication
  heroTagline?: string;
  uniqueFAQ?: Array<{ q: string; a: string }>;
  waPrefill?: string;
};

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.wedecorevents.com';
export const BUSINESS_NAME = 'We Decor';
export const CITY = 'Bengaluru';

export const SERVICES: ServiceKey[] = [
  'Birthday',
  'Home Decor',
  'Balloon Decor',
  'Car Decor',
  'Wedding',
  'Haldi',
  'Engagement',
  'Baby Shower',
  'Anniversary',
  'Proposal',
  'Floral Decor',
  'Bridal Room',
  'Nikah',
  'Terrace Decor',
  'Cabana Tent',
  'Corporate',
];

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
  'Home Decor': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      \`Damage-free home event decoration in \${name}, \${city} for intimate haldi, engagement, birthday, pooja, and baby shower celebrations. \` +
      \`Designed for apartments and independent houses\${lm ? \` near \${lm}\` : ''} using painter-safe adhesive tapes, spill-proof floor tarps for turmeric rituals, and compact backdrops that fit living rooms and balconies seamlessly.\`
    );
  },
  'Balloon Decor': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      \`Custom organic balloon garlands, arches, and backdrop ring setups in \${name}, \${city}. \` +
      \`Crafted with premium double-stuffed matte, pastel, and chrome balloons\${lm ? \` around \${lm}\` : ''} on sturdy free-standing frames with zero drilling or wall damage.\`
    );
  },
  'Car Decor': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      \`Paint-safe wedding and doli car decoration in \${name}, \${city} with silicone suction mounts and scratch-free satin ribbons. \` +
      \`We style sedans and SUVs at your doorstep\${lm ? \` near \${lm}\` : ''} using highway-speed wind-resistant floral cascades and neat bonnet designs.\`
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
  Haldi: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      \`Bright, traditional haldi decor in \${name}, \${city} with marigolds, haldi-friendly seating and easy cleanup. \` +
      \`We build compact, photo-rich stages for \${vt}\${vt ? ' ' : ''}\${lm ? \`around \${lm} \` : ''}\` +
      \`and coordinate entry, water points and floor protection so families can focus on the rituals.\`
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
  'Baby Shower': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      \`Soft, pastel baby-shower decor in \${name}, \${city} with balloon clouds, welcome boards and photo corners. \` +
      \`We plan stroller-friendly layouts for \${vt}\${vt ? ' ' : ''}\${lm ? \`near \${lm} \` : ''}\` +
      \`and ensure seating, cake table and gifts area are easy to access for guests and family.\`
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
  'Floral Decor': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      \`Fresh, fragrant floral decoration in \${name}, \${city} featuring fresh marigolds, tuberoses, jasmine strings, and premium roses. \` +
      \`Sourced fresh on the morning of your event\${lm ? \` near \${lm}\` : ''} for traditional temple ceremonies, housewarmings, and entryway styling.\`
    );
  },
  'Bridal Room': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      \`Elegant bridal room, wedding night, and surprise bedroom decor in \${name}, \${city}. \` +
      \`Styled with velvet draping, fairy lights, fresh rose petals, and custom message signage\${lm ? \` around \${lm}\` : ''} with discreet and punctual setup.\`
    );
  },
  Nikah: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      \`Dignified Nikah ceremony and stage decoration in \${name}, \${city}. \` +
      \`Featuring traditional white-and-gold drapes, fresh floral framing, couple seating, and modesty partitions tailored for banquet halls and home settings\${lm ? \` around \${lm}\` : ''}.\`
    );
  },
  'Terrace Decor': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      \`Atmospheric terrace and rooftop decoration in \${name}, \${city} with wind-anchored frames, festoon fairy light canopies, and cozy low seating across \${vt}\${vt ? ' ' : ''}\${lm ? \`near \${lm} \` : ''}.\`
    );
  },
  'Cabana Tent': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      \`Cozy cabana tent and balloon canopy setups in \${name}, \${city} for intimate dates, anniversaries, and surprise birthday celebrations\${lm ? \` around \${lm}\` : ''}. Complete with warm fairy lights and plush cushions.\`
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

const buildServiceDescriptions = (a: Area): Record<ServiceKey, string> => {
  const ctx: Ctx = { name: a.name, city: CITY, landmarks: a.landmarks ?? [], venueTypes: a.venueTypes ?? ['apartments','rooftops'], vibe: a.vibe };
  const out = {} as Record<ServiceKey, string>;
  for (const s of SERVICES) out[s] = TEMPLATES[s](ctx);
  return out;
};

export const AREAS: Area[] = ${JSON.stringify(AREAS, null, 2)};
export const AREAS_WITH_DESCRIPTIONS: Area[] = AREAS.map((a) => ({
  ...a,
  serviceDescriptions: buildServiceDescriptions(a),
}));

// Helper functions
// NOTE: looks up from AREAS_WITH_DESCRIPTIONS (not the raw AREAS array) so that
// \`serviceDescriptions\` — the landmark/venue-injected per-service copy — is
// actually populated. It was previously read from AREAS, which never carries
// that field, so this content silently never rendered anywhere on the site.
export const getAreaBySlug = (slug: string): Area | undefined => {
  return AREAS_WITH_DESCRIPTIONS.find((area) => area.slug === slug);
};

export const getAllAreaSlugs = (): string[] => {
  return AREAS.map((area) => area.slug);
};
`;

await writeFile(outPath, file, 'utf8');
console.log('✅ Wrote', outPath, 'from', csvPath);
