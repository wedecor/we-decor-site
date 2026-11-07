/* AUTO-GENERATED: DO NOT EDIT. Edit content/locations/locations.csv and run `npm run locations:sync`. */

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
const joinList = (items: string[]): string =>
  items.length === 0 ? '' : items.length === 1 ? items[0] : `${items[0]} and ${items[1]}`;

const TEMPLATES: Record<ServiceKey, (c: Ctx) => string> = {
  Birthday: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Celebrate birthdays in ${name}, ${city} with stylish balloon arches, fairy lights and photo-ready backdrops. ` +
      `We tailor setups for ${vt}${vt ? ' ' : ''}${lm ? `near ${lm} ` : ''}` +
      `and keep access, power and space in mind. From intimate home parties to chic cafés, We Decor makes it effortless to host and enjoy.`
    );
  },
  'Home Decor': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      `Damage-free home event decoration in ${name}, ${city} for intimate haldi, engagement, birthday, pooja, and baby shower celebrations. ` +
      `Designed for apartments and independent houses${lm ? ` near ${lm}` : ''} using painter-safe adhesive tapes, spill-proof floor tarps for turmeric rituals, and compact backdrops that fit living rooms and balconies seamlessly.`
    );
  },
  'Balloon Decor': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      `Custom organic balloon garlands, arches, and backdrop ring setups in ${name}, ${city}. ` +
      `Crafted with premium double-stuffed matte, pastel, and chrome balloons${lm ? ` around ${lm}` : ''} on sturdy free-standing frames with zero drilling or wall damage.`
    );
  },
  'Car Decor': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      `Paint-safe wedding and doli car decoration in ${name}, ${city} with silicone suction mounts and scratch-free satin ribbons. ` +
      `We style sedans and SUVs at your doorstep${lm ? ` near ${lm}` : ''} using highway-speed wind-resistant floral cascades and neat bonnet designs.`
    );
  },
  Wedding: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Elegant wedding decor in ${name}, ${city}, blending florals, drapes and warm lighting for timeless photos. ` +
      `We adapt mandap and stage designs to ${vt}${vt ? ' ' : ''}${lm ? `near ${lm} ` : ''}` +
      `and manage logistics—vendor timings, load-in and power—so ceremonies run beautifully on schedule.`
    );
  },
  Haldi: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Bright, traditional haldi decor in ${name}, ${city} with marigolds, haldi-friendly seating and easy cleanup. ` +
      `We build compact, photo-rich stages for ${vt}${vt ? ' ' : ''}${lm ? `around ${lm} ` : ''}` +
      `and coordinate entry, water points and floor protection so families can focus on the rituals.`
    );
  },
  Engagement: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Chic engagement setups in ${name}, ${city} with floral arches, pastel palettes and modern signage. ` +
      `Perfect for ${vt}${vt ? ' ' : ''}${lm ? `around ${lm} ` : ''}` +
      `our layouts emphasise couple portraits, ring exchange flow and guest movement for effortless celebrations.`
    );
  },
  'Baby Shower': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Soft, pastel baby-shower decor in ${name}, ${city} with balloon clouds, welcome boards and photo corners. ` +
      `We plan stroller-friendly layouts for ${vt}${vt ? ' ' : ''}${lm ? `near ${lm} ` : ''}` +
      `and ensure seating, cake table and gifts area are easy to access for guests and family.`
    );
  },
  Anniversary: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Romantic anniversary decor in ${name}, ${city}: candles, subtle florals and cosy lighting for memorable dinners. ` +
      `We style intimate corners across ${vt}${vt ? ' ' : ''}${lm ? `near ${lm} ` : ''}` +
      `and include compact backdrop ideas that photograph beautifully without crowding smaller spaces.`
    );
  },
  Proposal: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Dreamy proposal setups in ${name}, ${city} with fairy-lit tents, flowers and custom signage. ` +
      `Designed for discreet arrival and quick reveal, our layouts suit ${vt}${vt ? ' ' : ''}${lm ? `around ${lm} ` : ''}` +
      `so the moment feels private, elegant and perfectly photographed.`
    );
  },
  'Floral Decor': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      `Fresh, fragrant floral decoration in ${name}, ${city} featuring fresh marigolds, tuberoses, jasmine strings, and premium roses. ` +
      `Sourced fresh on the morning of your event${lm ? ` near ${lm}` : ''} for traditional temple ceremonies, housewarmings, and entryway styling.`
    );
  },
  'Bridal Room': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      `Elegant bridal room, wedding night, and surprise bedroom decor in ${name}, ${city}. ` +
      `Styled with velvet draping, fairy lights, fresh rose petals, and custom message signage${lm ? ` around ${lm}` : ''} with discreet and punctual setup.`
    );
  },
  Nikah: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return (
      `Dignified Nikah ceremony and stage decoration in ${name}, ${city}. ` +
      `Featuring traditional white-and-gold drapes, fresh floral framing, couple seating, and modesty partitions tailored for banquet halls and home settings${lm ? ` around ${lm}` : ''}.`
    );
  },
  'Terrace Decor': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return `Atmospheric terrace and rooftop decoration in ${name}, ${city} with wind-anchored frames, festoon fairy light canopies, and cozy low seating across ${vt}${vt ? ' ' : ''}${lm ? `near ${lm} ` : ''}.`;
  },
  'Cabana Tent': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    return `Cozy cabana tent and balloon canopy setups in ${name}, ${city} for intimate dates, anniversaries, and surprise birthday celebrations${lm ? ` around ${lm}` : ''}. Complete with warm fairy lights and plush cushions.`;
  },
  Corporate: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Crisp corporate decor in ${name}, ${city} for launches, townhalls and team parties. ` +
      `We deliver brand-aligned backdrops and photo walls tailored to ${vt}${vt ? ' ' : ''}${lm ? `around ${lm} ` : ''}` +
      `with clean cabling, quick turnaround and minimal disruption to workspaces.`
    );
  },
};

const buildServiceDescriptions = (a: Area): Record<ServiceKey, string> => {
  const ctx: Ctx = {
    name: a.name,
    city: CITY,
    landmarks: a.landmarks ?? [],
    venueTypes: a.venueTypes ?? ['apartments', 'rooftops'],
    vibe: a.vibe,
  };
  const out = {} as Record<ServiceKey, string>;
  for (const s of SERVICES) out[s] = TEMPLATES[s](ctx);
  return out;
};

export const AREAS: Area[] = [
  {
    slug: 'bangalore',
    name: 'Bangalore',
    vibe: 'city-wide',
    landmarks: ['MG Road', 'Cubbon Park', 'UB City'],
    venueTypes: ['apartments', 'banquet halls', 'rooftops', 'villas'],
    heroTagline: 'Top-Rated Event Decorators in Bangalore',
    waPrefill: 'Hi We Decor! I need event decoration in Bangalore. Occasion: _____. Date: _____.',
  },
  {
    slug: 'koramangala',
    name: 'Koramangala',
    vibe: 'rooftop, café, and compact Instagram-ready celebrations',
    landmarks: ['Forum Mall', '80 Feet Road', 'Koramangala Club'],
    venueTypes: ['rooftops', 'cafes', 'apartments', 'banquet halls', 'clubhouses', 'event spaces'],
    heroTagline: 'Koramangala Decor That Owns the Frame',
    waPrefill: 'Hi! Need Koramangala café/rooftop decor for an evening celebration.',
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
    waPrefill:
      'Hi We Decor! Planning a Whitefield villa/clubhouse celebration — can you help with a customized quote?',
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
    waPrefill: 'Hi! Jayanagar traditional/family function — can you help with customized decor?',
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
    waPrefill:
      'Hi! Looking for HSR Layout apartment/clubhouse birthday decor. Sharing details next.',
  },
  {
    slug: 'rt-nagar',
    name: 'RT Nagar',
    vibe: 'residential sprawl',
    landmarks: ['RT Nagar Main Road', 'Ganganagar', 'Hebbal'],
    venueTypes: ['apartments', 'community halls', 'temples'],
    heroTagline: 'Top-Rated Event Decorators in RT Nagar',
    waPrefill: 'Hi We Decor! I need event decoration in RT Nagar. Occasion: _____. Date: _____.',
  },
  {
    slug: 'hebbal',
    name: 'Hebbal',
    vibe: 'lakeside views',
    landmarks: ['Hebbal Lake', 'Manyata Flyover', 'Manyata Tech Park'],
    venueTypes: ['apartments', 'clubhouses', 'lakeside venues'],
    heroTagline: 'Top-Rated Event Decorators in Hebbal',
    waPrefill: 'Hi We Decor! I need event decoration in Hebbal. Occasion: _____. Date: _____.',
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
    waPrefill: 'Hi! Electronic City Phase 1/2 event — need decor planned around campus access.',
  },
  {
    slug: 'btm-layout',
    name: 'BTM Layout',
    vibe: 'student & family mix',
    landmarks: ['Silk Board', 'Mico Layout', 'BTM Lake'],
    venueTypes: ['apartments', 'rooftops', 'community halls'],
    heroTagline: 'Top-Rated Event Decorators in BTM Layout',
    waPrefill: 'Hi We Decor! I need event decoration in BTM Layout. Occasion: _____. Date: _____.',
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
    waPrefill: 'Hi! Marathahalli event coming up near ORR — need decor timed to our access window.',
  },
  {
    slug: 'bellandur',
    name: 'Bellandur',
    vibe: 'IT lake belt and high-rise community living',
    landmarks: ['Bellandur Lake', 'EcoSpace', 'Embassy TechVillage'],
    venueTypes: ['condo clubhouses', 'apartments', 'rooftops', 'office event spaces'],
    heroTagline: 'Celebrations Styled for Bellandur’s Fast Lane',
    waPrefill: 'Hi! Bellandur clubhouse/condo celebration — can we discuss a custom setup?',
  },
  {
    slug: 'sarjapur-road',
    name: 'Sarjapur Road',
    vibe: 'villa-township and gated-society corridor',
    landmarks: ['Wipro SEZ', 'Decathlon Sarjapur', 'Carmelaram'],
    venueTypes: ['villas', 'gated societies', 'clubhouses', 'banquet halls'],
    heroTagline: 'Personalised Décor Along Sarjapur Road',
    waPrefill: 'Hi! Sarjapur Road villa/society event — looking for personalized decoration.',
  },
  {
    slug: 'domlur',
    name: 'Domlur',
    vibe: 'mixed commercial',
    landmarks: ['Domlur Bridge', 'Indiranagar Metro', 'Old Airport Road'],
    venueTypes: ['apartments', 'offices', 'restaurants'],
    heroTagline: 'Top-Rated Event Decorators in Domlur',
    waPrefill: 'Hi We Decor! I need event decoration in Domlur. Occasion: _____. Date: _____.',
  },
  {
    slug: 'ulsoor',
    name: 'Ulsoor',
    vibe: 'lakeside & cantonment',
    landmarks: ['Ulsoor Lake', 'Halasuru', 'MG Road Metro'],
    venueTypes: ['apartments', 'banquet halls', 'lakeside venues'],
    heroTagline: 'Top-Rated Event Decorators in Ulsoor',
    waPrefill: 'Hi We Decor! I need event decoration in Ulsoor. Occasion: _____. Date: _____.',
  },
  {
    slug: 'richmond-town',
    name: 'Richmond Town',
    vibe: 'colonial charm',
    landmarks: ['Richmond Road', 'Langford Road', "St Mark's Road"],
    venueTypes: ['banquet halls', 'restaurants', 'heritage venues'],
    heroTagline: 'Top-Rated Event Decorators in Richmond Town',
    waPrefill:
      'Hi We Decor! I need event decoration in Richmond Town. Occasion: _____. Date: _____.',
  },
  {
    slug: 'ashok-nagar',
    name: 'Ashok Nagar',
    vibe: 'heritage residential',
    landmarks: ['Ashok Nagar Main Road', 'Richmond Circle', "St Joseph's"],
    venueTypes: ['apartments', 'community halls', 'churches'],
    heroTagline: 'Top-Rated Event Decorators in Ashok Nagar',
    waPrefill: 'Hi We Decor! I need event decoration in Ashok Nagar. Occasion: _____. Date: _____.',
  },
  {
    slug: 'banashankari',
    name: 'Banashankari',
    vibe: 'large residential blocks',
    landmarks: ['BSK 2nd Stage', 'Banashankari Temple', 'BSK 3rd Stage'],
    venueTypes: ['community halls', 'apartments', 'temples'],
    heroTagline: 'Top-Rated Event Decorators in Banashankari',
    waPrefill:
      'Hi We Decor! I need event decoration in Banashankari. Occasion: _____. Date: _____.',
  },
  {
    slug: 'basavanagudi',
    name: 'Basavanagudi',
    vibe: 'classic Bengaluru',
    landmarks: ['Bugle Rock', 'Gandhi Bazaar', 'Bull Temple'],
    venueTypes: ['community halls', 'apartments', 'temples'],
    heroTagline: 'Top-Rated Event Decorators in Basavanagudi',
    waPrefill:
      'Hi We Decor! I need event decoration in Basavanagudi. Occasion: _____. Date: _____.',
  },
  {
    slug: 'jp-nagar',
    name: 'JP Nagar',
    vibe: 'family residential neighbourhood with green gathering spaces',
    landmarks: ['JP Nagar Mini Forest', 'JP Nagar Metro Station', 'Sarakki Signal'],
    venueTypes: ['family homes', 'community halls', 'banquet halls', 'apartments'],
    heroTagline: 'Top-Rated Event Decorators in JP Nagar',
    waPrefill: 'Hi! JP Nagar family celebration — need warm custom decor for home/hall.',
  },
  {
    slug: 'bannerghatta-road',
    name: 'Bannerghatta Road',
    vibe: 'green & educational',
    landmarks: ['Bannerghatta National Park', 'JP Nagar', 'IIM Bangalore'],
    venueTypes: ['apartments', 'villas', 'educational institutions'],
    heroTagline: 'Top-Rated Event Decorators in Bannerghatta Road',
    waPrefill:
      'Hi We Decor! I need event decoration in Bannerghatta Road. Occasion: _____. Date: _____.',
  },
  {
    slug: 'kanakapura-road',
    name: 'Kanakapura Road',
    vibe: 'developing residential',
    landmarks: ['Bannerghatta Road', 'JP Nagar', 'Kanakapura Junction'],
    venueTypes: ['apartments', 'villas', 'community halls'],
    heroTagline: 'Top-Rated Event Decorators in Kanakapura Road',
    waPrefill:
      'Hi We Decor! I need event decoration in Kanakapura Road. Occasion: _____. Date: _____.',
  },
  {
    slug: 'malleshwaram',
    name: 'Malleshwaram',
    vibe: 'heritage pockets',
    landmarks: ['8th Cross', 'Sankey Tank', 'Malleshwaram Metro'],
    venueTypes: ['community halls', 'apartments', 'temples'],
    heroTagline: 'Top-Rated Event Decorators in Malleshwaram',
    waPrefill:
      'Hi We Decor! I need event decoration in Malleshwaram. Occasion: _____. Date: _____.',
  },
  {
    slug: 'rajajinagar',
    name: 'Rajajinagar',
    vibe: 'old & new mix',
    landmarks: ['Orion Mall', 'World Trade Center', 'Rajajinagar Metro'],
    venueTypes: ['banquet halls', 'apartments', 'malls'],
    heroTagline: 'Top-Rated Event Decorators in Rajajinagar',
    waPrefill: 'Hi We Decor! I need event decoration in Rajajinagar. Occasion: _____. Date: _____.',
  },
  {
    slug: 'vijayanagar',
    name: 'Vijayanagar',
    vibe: 'traditional residential',
    landmarks: ['Vijayanagar Metro', 'Rajajinagar', 'Malleshwaram'],
    venueTypes: ['apartments', 'community halls', 'temples'],
    heroTagline: 'Top-Rated Event Decorators in Vijayanagar',
    waPrefill: 'Hi We Decor! I need event decoration in Vijayanagar. Occasion: _____. Date: _____.',
  },
  {
    slug: 'yelahanka',
    name: 'Yelahanka',
    vibe: 'airy layouts',
    landmarks: ['Allalasandra Lake', 'Yelahanka New Town', 'Airport Road'],
    venueTypes: ['villas', 'apartments', 'lakeside venues'],
    heroTagline: 'Top-Rated Event Decorators in Yelahanka',
    waPrefill: 'Hi We Decor! I need event decoration in Yelahanka. Occasion: _____. Date: _____.',
  },
  {
    slug: 'sahakarnagar',
    name: 'Sahakarnagar',
    vibe: 'quiet residential',
    landmarks: ['Hebbal', 'RT Nagar', 'Yelahanka'],
    venueTypes: ['apartments', 'community halls', 'temples'],
    heroTagline: 'Top-Rated Event Decorators in Sahakarnagar',
    waPrefill:
      'Hi We Decor! I need event decoration in Sahakarnagar. Occasion: _____. Date: _____.',
  },
  {
    slug: 'mathikere',
    name: 'Mathikere',
    vibe: 'student area',
    landmarks: ['Yeshwanthpur', 'Rajajinagar', 'Mathikere Lake'],
    venueTypes: ['apartments', 'community halls', 'educational institutions'],
    heroTagline: 'Top-Rated Event Decorators in Mathikere',
    waPrefill: 'Hi We Decor! I need event decoration in Mathikere. Occasion: _____. Date: _____.',
  },
  {
    slug: 'yeshwanthpur',
    name: 'Yeshwanthpur',
    vibe: 'industrial residential',
    landmarks: ['Peenya', 'Rajajinagar', 'Yeshwanthpur Metro'],
    venueTypes: ['apartments', 'community halls', 'industrial areas'],
    heroTagline: 'Top-Rated Event Decorators in Yeshwanthpur',
    waPrefill:
      'Hi We Decor! I need event decoration in Yeshwanthpur. Occasion: _____. Date: _____.',
  },
  {
    slug: 'peenya',
    name: 'Peenya',
    vibe: 'industrial belt',
    landmarks: ['Peenya Industrial Area', 'Jalahalli', 'Yeshwanthpur'],
    venueTypes: ['community halls', 'offices', 'industrial venues'],
    heroTagline: 'Top-Rated Event Decorators in Peenya',
    waPrefill: 'Hi We Decor! I need event decoration in Peenya. Occasion: _____. Date: _____.',
  },
  {
    slug: 'hanumanthanagar',
    name: 'Hanumanthanagar',
    vibe: 'older residential',
    landmarks: ['Hanumanthanagar Circle', 'Gali Anjaneya Temple', 'Chord Road'],
    venueTypes: ['community halls', 'apartments', 'independent homes'],
    heroTagline: 'Top-Rated Event Decorators in Hanumanthanagar',
    waPrefill:
      'Hi We Decor! I need event decoration in Hanumanthanagar. Occasion: _____. Date: _____.',
  },
  {
    slug: 'thyagarajanagar',
    name: 'Thyagarajanagar',
    vibe: 'traditional streets',
    landmarks: ['Thyagaraja Nagar Market', 'Madhavan Park', 'South End Circle'],
    venueTypes: ['community halls', 'apartments', 'temples'],
    heroTagline: 'Top-Rated Event Decorators in Thyagarajanagar',
    waPrefill:
      'Hi We Decor! I need event decoration in Thyagarajanagar. Occasion: _____. Date: _____.',
  },
  {
    slug: 'puttenahalli',
    name: 'Puttenahalli',
    vibe: 'lakeside apartments',
    landmarks: ['Puttenahalli Lake', 'Brigade Millennium', 'JP Nagar 7th Phase'],
    venueTypes: ['apartments', 'clubhouses', 'community halls'],
    heroTagline: 'Top-Rated Event Decorators in Puttenahalli',
    waPrefill:
      'Hi We Decor! I need event decoration in Puttenahalli. Occasion: _____. Date: _____.',
  },
  {
    slug: 'chamrajpet',
    name: 'Chamrajpet',
    vibe: 'heritage quarter',
    landmarks: ['Makkala Koota Park', 'Fort High School', 'Albert Victor Road'],
    venueTypes: ['community halls', 'independent homes', 'temples'],
    heroTagline: 'Top-Rated Event Decorators in Chamrajpet',
    waPrefill: 'Hi We Decor! I need event decoration in Chamrajpet. Occasion: _____. Date: _____.',
  },
  {
    slug: 'isro-layout',
    name: 'ISRO Layout',
    vibe: 'quiet layouts',
    landmarks: ['ISRO Layout Main Road', 'RBI Layout', 'Jaraganahalli'],
    venueTypes: ['apartments', 'independent homes', 'community halls'],
    heroTagline: 'Top-Rated Event Decorators in ISRO Layout',
    waPrefill: 'Hi We Decor! I need event decoration in ISRO Layout. Occasion: _____. Date: _____.',
  },
  {
    slug: 'wilson-garden',
    name: 'Wilson Garden',
    vibe: 'central residential',
    landmarks: ['Hombegowda Nagar', 'Lalbagh West Gate', 'Double Road'],
    venueTypes: ['apartments', 'community halls', 'independent homes'],
    heroTagline: 'Top-Rated Event Decorators in Wilson Garden',
    waPrefill:
      'Hi We Decor! I need event decoration in Wilson Garden. Occasion: _____. Date: _____.',
  },
  {
    slug: 'shanti-nagar',
    name: 'Shanti Nagar',
    vibe: 'inner city',
    landmarks: ['Shanti Nagar Bus Station', 'Richmond Circle', 'Double Road'],
    venueTypes: ['hotels', 'banquet halls', 'apartments'],
    heroTagline: 'Top-Rated Event Decorators in Shanti Nagar',
    waPrefill:
      'Hi We Decor! I need event decoration in Shanti Nagar. Occasion: _____. Date: _____.',
  },
  {
    slug: 'bilekahalli',
    name: 'Bilekahalli',
    vibe: 'apartment corridor',
    landmarks: ['IIM Bangalore', 'Arekere Gate', 'Bannerghatta Road'],
    venueTypes: ['apartments', 'gated communities', 'clubhouses'],
    heroTagline: 'Top-Rated Event Decorators in Bilekahalli',
    waPrefill: 'Hi We Decor! I need event decoration in Bilekahalli. Occasion: _____. Date: _____.',
  },
  {
    slug: 'girinagar',
    name: 'Girinagar',
    vibe: 'settled layouts',
    landmarks: ['Girinagar Main Road', 'Banashankari Temple', 'Hosakerehalli'],
    venueTypes: ['apartments', 'community halls', 'independent homes'],
    heroTagline: 'Top-Rated Event Decorators in Girinagar',
    waPrefill: 'Hi We Decor! I need event decoration in Girinagar. Occasion: _____. Date: _____.',
  },
  {
    slug: 'arekere',
    name: 'Arekere',
    vibe: 'lakeside layouts',
    landmarks: ['Arekere Lake', 'Arekere Gate', 'Bannerghatta Road'],
    venueTypes: ['apartments', 'gated communities', 'clubhouses'],
    heroTagline: 'Top-Rated Event Decorators in Arekere',
    waPrefill: 'Hi We Decor! I need event decoration in Arekere. Occasion: _____. Date: _____.',
  },
  {
    slug: 'kumaraswamy-layout',
    name: 'Kumaraswamy Layout',
    vibe: 'college belt',
    landmarks: ['Dayananda Sagar College', 'Chunchughatta', 'Kumaraswamy Layout Main Road'],
    venueTypes: ['apartments', 'community halls', 'independent homes'],
    heroTagline: 'Top-Rated Event Decorators in Kumaraswamy Layout',
    waPrefill:
      'Hi We Decor! I need event decoration in Kumaraswamy Layout. Occasion: _____. Date: _____.',
  },
  {
    slug: 'padmanabhanagar',
    name: 'Padmanabhanagar',
    vibe: 'family layouts',
    landmarks: ['Padmanabhanagar Main Road', 'Kadirenahalli', 'Yarab Nagar'],
    venueTypes: ['community halls', 'apartments', 'independent homes'],
    heroTagline: 'Top-Rated Event Decorators in Padmanabhanagar',
    waPrefill:
      'Hi We Decor! I need event decoration in Padmanabhanagar. Occasion: _____. Date: _____.',
  },
  {
    slug: 'katriguppe',
    name: 'Katriguppe',
    vibe: 'temple-side streets',
    landmarks: ['Katriguppe Main Road', 'Banashankari Temple', 'Vidyapeetha Circle'],
    venueTypes: ['community halls', 'apartments', 'temples'],
    heroTagline: 'Top-Rated Event Decorators in Katriguppe',
    waPrefill: 'Hi We Decor! I need event decoration in Katriguppe. Occasion: _____. Date: _____.',
  },
  {
    slug: 'hulimavu',
    name: 'Hulimavu',
    vibe: 'mall-side apartments',
    landmarks: ['Hulimavu Lake', 'Meenakshi Mall', 'Bannerghatta Road'],
    venueTypes: ['apartments', 'gated communities', 'banquet halls'],
    heroTagline: 'Top-Rated Event Decorators in Hulimavu',
    waPrefill: 'Hi We Decor! I need event decoration in Hulimavu. Occasion: _____. Date: _____.',
  },
  {
    slug: 'konanakunte',
    name: 'Konanakunte',
    vibe: 'newer layouts',
    landmarks: ['Konanakunte Cross', 'Vajarahalli', 'Kanakapura Road'],
    venueTypes: ['apartments', 'independent homes', 'community halls'],
    heroTagline: 'Top-Rated Event Decorators in Konanakunte',
    waPrefill: 'Hi We Decor! I need event decoration in Konanakunte. Occasion: _____. Date: _____.',
  },
  {
    slug: 'uttarahalli',
    name: 'Uttarahalli',
    vibe: 'suburban layouts',
    landmarks: ['Uttarahalli Main Road', 'Subramanyapura', 'Chikkalasandra'],
    venueTypes: ['community halls', 'apartments', 'independent homes'],
    heroTagline: 'Top-Rated Event Decorators in Uttarahalli',
    waPrefill: 'Hi We Decor! I need event decoration in Uttarahalli. Occasion: _____. Date: _____.',
  },
  {
    slug: 'vasanthapura',
    name: 'Vasanthapura',
    vibe: 'quiet suburbs',
    landmarks: ['Vasanthapura Main Road', 'Thalaghattapura', 'Uttarahalli'],
    venueTypes: ['apartments', 'independent homes', 'community halls'],
    heroTagline: 'Top-Rated Event Decorators in Vasanthapura',
    waPrefill:
      'Hi We Decor! I need event decoration in Vasanthapura. Occasion: _____. Date: _____.',
  },
  {
    slug: 'gottigere',
    name: 'Gottigere',
    vibe: 'lake-side suburbs',
    landmarks: ['Gottigere Lake', 'Bannerghatta Road', 'Hulimavu Gate'],
    venueTypes: ['apartments', 'independent homes', 'community halls'],
    heroTagline: 'Top-Rated Event Decorators in Gottigere',
    waPrefill: 'Hi We Decor! I need event decoration in Gottigere. Occasion: _____. Date: _____.',
  },
  {
    slug: 'begur',
    name: 'Begur',
    vibe: 'lake suburbs',
    landmarks: ['Begur Lake', 'Naganathapura', 'Begur Road'],
    venueTypes: ['apartments', 'gated communities', 'community halls'],
    heroTagline: 'Top-Rated Event Decorators in Begur',
    waPrefill: 'Hi We Decor! I need event decoration in Begur. Occasion: _____. Date: _____.',
  },
  {
    slug: 'nagarbhavi',
    name: 'Nagarbhavi',
    vibe: 'university belt',
    landmarks: ['Nagarbhavi Circle', 'Bangalore University', 'Chandra Layout'],
    venueTypes: ['community halls', 'apartments', 'independent homes'],
    heroTagline: 'Top-Rated Event Decorators in Nagarbhavi',
    waPrefill: 'Hi We Decor! I need event decoration in Nagarbhavi. Occasion: _____. Date: _____.',
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
