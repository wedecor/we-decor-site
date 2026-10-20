/* AUTO-GENERATED: DO NOT EDIT. Edit content/locations/locations.csv and run `npm run locations:sync`. */

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
  'Haldi',
  'Wedding',
  'Engagement',
  'Anniversary',
  'Proposal',
  'Baby Shower',
  'Corporate',
];

type Ctx = { name: string; city: string; landmarks: string[]; venueTypes: string[]; vibe?: string };

const pick = (arr: string[] | undefined, n = 2): string[] => (arr ?? []).slice(0, n);
const joinList = (items: string[]): string =>
  items.length === 0 ? '' : items.length === 1 ? items[0] : `${items[0]} and ${items[1]}`;

const TEMPLATES: Record<ServiceKey, (c: Ctx) => string> = {
  Birthday: ({ name, city, landmarks, venueTypes, vibe }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    const where = lm ? `Near ${lm} in ${name}` : `In ${name}, ${city}`;
    return (
      `${where} we set birthday balloon arches, fairy lights and photo-ready backdrops` +
      `${vibe ? ` that match a ${vibe} neighbourhood` : ''}. ` +
      `Layouts fit ${vt || 'homes and halls'} and keep access, power and space in mind so hosting stays easy.`
    );
  },
  Haldi: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    const where = lm ? `Around ${lm}` : `In ${name}, ${city}`;
    return (
      `${where}, haldi setups use marigolds, ritual-friendly seating and easy cleanup. ` +
      `We build compact photo stages for ${vt || 'homes and courtyards'} and coordinate entry, water and floor protection so families can stay with the rituals.`
    );
  },
  Wedding: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    const where = lm ? `Close to ${lm}` : `Across ${name}, ${city}`;
    return (
      `${where} we style wedding mandaps and stages with florals, drapes and warm light. ` +
      `Designs adapt to ${vt || 'banquets and homes'} and we handle load-in, vendor timing and power so ceremonies stay on schedule.`
    );
  },
  Engagement: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    const where = lm ? `${name} venues around ${lm}` : `Engagement venues in ${name}`;
    return (
      `${where} get floral arches, pastel palettes and modern signage. ` +
      `Layouts for ${vt || 'hotels and homes'} emphasise couple portraits, the ring exchange and guest flow.`
    );
  },
  Anniversary: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    const where = lm ? `Quiet corners near ${lm}` : `Intimate rooms in ${name}, ${city}`;
    return (
      `${where} take candles, subtle florals and compact backdrops for anniversary dinners. ` +
      `We style ${vt || 'homes and restaurants'} so the set photographs well without crowding the table.`
    );
  },
  Proposal: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    const where = lm ? `A discreet reveal near ${lm}` : `A private setup in ${name}`;
    return (
      `${where} uses fairy-lit tents, flowers and custom signage. ` +
      `Arrival and reveal are planned for ${vt || 'rooftops and gardens'} so the moment stays quiet and well photographed.`
    );
  },
  'Baby Shower': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    const where = lm ? `Family rooms near ${lm}` : `Baby showers in ${name}, ${city}`;
    return (
      `${where} get balloon clouds, welcome boards and photo corners in soft pastels. ` +
      `Stroller-friendly paths through ${vt || 'apartments and halls'} keep seating, cake and gifts easy to reach.`
    );
  },
  Corporate: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    const where = lm ? `Offices and halls near ${lm}` : `Workplaces in ${name}, ${city}`;
    return (
      `${where} get brand-aligned backdrops for launches, townhalls and team parties. ` +
      `We cable cleanly across ${vt || 'lobbies and conference floors'} with a fast turnaround and little disruption.`
    );
  },
};

const buildServiceDescriptions = (a: Area) => {
  const ctx = {
    name: a.name,
    city: CITY,
    landmarks: a.landmarks ?? [],
    venueTypes: a.venueTypes ?? ['apartments', 'rooftops'],
    vibe: a.vibe,
  };
  const out: Record<ServiceKey, string> = {} as Record<ServiceKey, string>;
  for (const s of SERVICES) out[s] = TEMPLATES[s](ctx);
  return out;
};

export const AREAS: Area[] = [
  {
    slug: 'ashok-nagar',
    name: 'Ashok Nagar',
    vibe: 'heritage residential',
    landmarks: ['Ashok Nagar Main Road', 'Richmond Circle', "St Joseph's"],
    venueTypes: ['apartments', 'community halls', 'churches'],
  },
  {
    slug: 'banashankari',
    name: 'Banashankari',
    vibe: 'large residential blocks',
    landmarks: ['BSK 2nd Stage', 'Banashankari Temple', 'BSK 3rd Stage'],
    venueTypes: ['community halls', 'apartments', 'temples'],
  },
  {
    slug: 'bangalore',
    name: 'Bangalore',
    vibe: 'city-wide',
    landmarks: ['MG Road', 'Cubbon Park', 'UB City'],
    venueTypes: ['apartments', 'banquet halls', 'rooftops', 'villas'],
  },
  {
    slug: 'bannerghatta-road',
    name: 'Bannerghatta Road',
    vibe: 'green & educational',
    landmarks: ['Bannerghatta National Park', 'JP Nagar', 'IIM Bangalore'],
    venueTypes: ['apartments', 'villas', 'educational institutions'],
  },
  {
    slug: 'basavanagudi',
    name: 'Basavanagudi',
    vibe: 'classic Bengaluru',
    landmarks: ['Bugle Rock', 'Gandhi Bazaar', 'Bull Temple'],
    venueTypes: ['community halls', 'apartments', 'temples'],
  },
  {
    slug: 'bellandur',
    name: 'Bellandur',
    vibe: 'IT lake belt and high-rise community living',
    landmarks: ['Bellandur Lake', 'EcoSpace', 'Embassy TechVillage'],
    venueTypes: ['condo clubhouses', 'apartments', 'rooftops', 'office event spaces'],
    heroTagline: 'Celebrations Styled for Bellandur’s Fast Lane',
    uniqueFAQ: [],
    waPrefill: 'Hi! Bellandur clubhouse/condo celebration — can we discuss a custom setup?',
  },
  {
    slug: 'btm-layout',
    name: 'BTM Layout',
    vibe: 'student & family mix',
    landmarks: ['Silk Board', 'Mico Layout', 'BTM Lake'],
    venueTypes: ['apartments', 'rooftops', 'community halls'],
  },
  {
    slug: 'domlur',
    name: 'Domlur',
    vibe: 'mixed commercial',
    landmarks: ['Domlur Bridge', 'Indiranagar Metro', 'Old Airport Road'],
    venueTypes: ['apartments', 'offices', 'restaurants'],
  },
  {
    slug: 'electronic-city',
    name: 'Electronic City',
    vibe: 'campus-calendar hub with residential villa pockets',
    landmarks: [
      'Electronic City Phase 1',
      'Infosys Campus area',
      'Electronic City Elevated Expressway',
    ],
    venueTypes: ['apartments', 'villas', 'banquet halls', 'corporate event spaces'],
    heroTagline: 'Event Décor Timed to Electronic City',
    uniqueFAQ: [],
    waPrefill: 'Hi! Electronic City Phase 1/2 event — need decor planned around campus access.',
  },
  {
    slug: 'hebbal',
    name: 'Hebbal',
    vibe: 'lakeside views',
    landmarks: ['Hebbal Lake', 'Manyata Flyover', 'Manyata Tech Park'],
    venueTypes: ['apartments', 'clubhouses', 'lakeside venues'],
  },
  {
    slug: 'hsr-layout',
    name: 'HSR Layout',
    vibe: 'young-family apartment sectors and clubhouse birthdays',
    landmarks: ['27th Main', 'Agara Lake', 'HSR BDA Complex area'],
    venueTypes: [
      'apartments',
      'clubhouses',
      'community halls',
      'houses',
      'banquet halls',
      'event spaces',
    ],
    heroTagline: 'Thoughtful HSR Layout Decor for Family Moments',
    uniqueFAQ: [],
    waPrefill:
      'Hi! Looking for HSR Layout apartment/clubhouse birthday decor. Sharing details next.',
  },
  {
    slug: 'indiranagar',
    name: 'Indiranagar',
    vibe: 'dining-led evenings and polished residential celebrations',
    landmarks: ['CMH Road', '100 Feet Road', 'Defence Colony side'],
    venueTypes: [
      'restaurants',
      'apartments',
      'residential societies',
      'banquet halls',
      'rooftops',
      'event spaces',
    ],
    heroTagline: 'Indiranagar Evenings, Beautifully Marked',
    uniqueFAQ: [],
    waPrefill:
      'Hi! Planning an Indiranagar dinner/ring-ceremony setup — need a tailored decor plan.',
  },
  {
    slug: 'jayanagar',
    name: 'Jayanagar',
    vibe: 'traditional neighbourhood celebrations and family rituals',
    landmarks: ['Jayanagar 4th Block', 'South End Circle', 'Jayanagar Shopping Complex'],
    venueTypes: ['community halls', 'family homes', 'banquet halls', 'temple-adjacent venues'],
    heroTagline: 'Thoughtful Décor for Jayanagar Traditions',
    uniqueFAQ: [],
    waPrefill: 'Hi! Jayanagar traditional/family function — can you help with customized decor?',
  },
  {
    slug: 'jp-nagar',
    name: 'JP Nagar',
    vibe: 'family residential neighbourhood with green gathering spaces',
    landmarks: ['JP Nagar Mini Forest', 'JP Nagar Metro Station', 'Sarakki Signal'],
    venueTypes: ['family homes', 'community halls', 'banquet halls', 'apartments'],
    heroTagline: 'Warm Family Celebrations in JP Nagar',
    uniqueFAQ: [],
    waPrefill: 'Hi! JP Nagar family celebration — need warm custom decor for home/hall.',
  },
  {
    slug: 'kanakapura-road',
    name: 'Kanakapura Road',
    vibe: 'developing residential',
    landmarks: ['Bannerghatta Road', 'JP Nagar', 'Kanakapura Junction'],
    venueTypes: ['apartments', 'villas', 'community halls'],
  },
  {
    slug: 'koramangala',
    name: 'Koramangala',
    vibe: 'rooftop, café, and compact Instagram-ready celebrations',
    landmarks: ['Forum Mall', '80 Feet Road', 'Koramangala Club'],
    venueTypes: ['rooftops', 'cafes', 'apartments', 'banquet halls', 'clubhouses', 'event spaces'],
    heroTagline: 'Koramangala Decor That Owns the Frame',
    uniqueFAQ: [],
    waPrefill: 'Hi! Need Koramangala café/rooftop decor for an evening celebration.',
  },
  {
    slug: 'malleshwaram',
    name: 'Malleshwaram',
    vibe: 'heritage pockets',
    landmarks: ['8th Cross', 'Sankey Tank', 'Malleshwaram Metro'],
    venueTypes: ['community halls', 'apartments', 'temples'],
  },
  {
    slug: 'marathahalli',
    name: 'Marathahalli',
    vibe: 'tower-apartment celebrations and ORR team events',
    landmarks: ['Marathahalli Bridge', 'Outer Ring Road', 'Innovative Multiplex area'],
    venueTypes: [
      'apartments',
      'tower apartments',
      'clubhouses',
      'offices',
      'banquet halls',
      'event spaces',
    ],
    heroTagline: 'Marathahalli Decor Planned Around Real Setup Windows',
    uniqueFAQ: [],
    waPrefill: 'Hi! Marathahalli event coming up near ORR — need decor timed to our access window.',
  },
  {
    slug: 'mathikere',
    name: 'Mathikere',
    vibe: 'student area',
    landmarks: ['Yeshwanthpur', 'Rajajinagar', 'Mathikere Lake'],
    venueTypes: ['apartments', 'community halls', 'educational institutions'],
  },
  {
    slug: 'peenya',
    name: 'Peenya',
    vibe: 'industrial belt',
    landmarks: ['Peenya Industrial Area', 'Jalahalli', 'Yeshwanthpur'],
    venueTypes: ['community halls', 'offices', 'industrial venues'],
  },
  {
    slug: 'rajajinagar',
    name: 'Rajajinagar',
    vibe: 'old & new mix',
    landmarks: ['Orion Mall', 'World Trade Center', 'Rajajinagar Metro'],
    venueTypes: ['banquet halls', 'apartments', 'malls'],
  },
  {
    slug: 'richmond-town',
    name: 'Richmond Town',
    vibe: 'colonial charm',
    landmarks: ['Richmond Road', 'Langford Road', "St Mark's Road"],
    venueTypes: ['banquet halls', 'restaurants', 'heritage venues'],
  },
  {
    slug: 'rt-nagar',
    name: 'RT Nagar',
    vibe: 'residential sprawl',
    landmarks: ['RT Nagar Main Road', 'Ganganagar', 'Hebbal'],
    venueTypes: ['apartments', 'community halls', 'temples'],
  },
  {
    slug: 'sahakarnagar',
    name: 'Sahakarnagar',
    vibe: 'quiet residential',
    landmarks: ['Hebbal', 'RT Nagar', 'Yelahanka'],
    venueTypes: ['apartments', 'community halls', 'temples'],
  },
  {
    slug: 'sarjapur-road',
    name: 'Sarjapur Road',
    vibe: 'villa-township and gated-society corridor',
    landmarks: ['Wipro SEZ', 'Decathlon Sarjapur', 'Carmelaram'],
    venueTypes: ['villas', 'gated societies', 'clubhouses', 'banquet halls'],
    heroTagline: 'Personalised Décor Along Sarjapur Road',
    uniqueFAQ: [],
    waPrefill: 'Hi! Sarjapur Road villa/society event — looking for personalized decoration.',
  },
  {
    slug: 'ulsoor',
    name: 'Ulsoor',
    vibe: 'lakeside & cantonment',
    landmarks: ['Ulsoor Lake', 'Halasuru', 'MG Road Metro'],
    venueTypes: ['apartments', 'banquet halls', 'lakeside venues'],
  },
  {
    slug: 'vijayanagar',
    name: 'Vijayanagar',
    vibe: 'traditional residential',
    landmarks: ['Vijayanagar Metro', 'Rajajinagar', 'Malleshwaram'],
    venueTypes: ['apartments', 'community halls', 'temples'],
  },
  {
    slug: 'whitefield',
    name: 'Whitefield',
    vibe: 'villa weekends and tech-park evenings',
    landmarks: ['VR Bengaluru', 'Phoenix Marketcity', 'ITPL'],
    venueTypes: [
      'villas',
      'apartments',
      'gated communities',
      'clubhouses',
      'banquet halls',
      'event spaces',
    ],
    heroTagline: 'Whitefield Celebrations, Styled Around Your Weekend',
    uniqueFAQ: [],
    waPrefill:
      'Hi We Decor! Planning a Whitefield villa/clubhouse celebration — can you help with a customized quote?',
  },
  {
    slug: 'yelahanka',
    name: 'Yelahanka',
    vibe: 'airy layouts',
    landmarks: ['Allalasandra Lake', 'Yelahanka New Town', 'Airport Road'],
    venueTypes: ['villas', 'apartments', 'lakeside venues'],
  },
  {
    slug: 'yeshwanthpur',
    name: 'Yeshwanthpur',
    vibe: 'industrial residential',
    landmarks: ['Peenya', 'Rajajinagar', 'Yeshwanthpur Metro'],
    venueTypes: ['apartments', 'community halls', 'industrial areas'],
  },
];

export const AREAS_WITH_DESCRIPTIONS: Area[] = AREAS.map((a) => ({
  ...a,
  serviceDescriptions: buildServiceDescriptions(a),
}));

// Helper functions
// NOTE: looks up from AREAS_WITH_DESCRIPTIONS (not the raw AREAS array) so that
// `serviceDescriptions` — the landmark/venue-injected per-service copy — is
// actually populated. It was previously read from AREAS, which never carries
// that field, so this content silently never rendered anywhere on the site.
export const getAreaBySlug = (slug: string): Area | undefined => {
  return AREAS_WITH_DESCRIPTIONS.find((area) => area.slug === slug);
};

export const getAllAreaSlugs = (): string[] => {
  return AREAS.map((area) => area.slug);
};
