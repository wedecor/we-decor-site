/**
 * Internal-link registries — curated service↔service and service→locality maps.
 * Prefer these over “first N of a fixed array”.
 *
 * RELATED_DECORATION_SERVICES / RELATED_SERVICES_BY_PATH only include routes that
 * exist in the committed decoration service catalog (avoid hub 404s).
 *
 * Phase 3: locality crawl equity via SERVICE_LOCALITIES_BY_PATH,
 * EXPLORE_LOCALITIES_BY_PAGE rotation, and reciprocal NEARBY_LOCALITY_SLUGS.
 */

export type InternalLink = { href: string; name: string };

/**
 * Default locality chips when a page key / service path has no curated set.
 * Kept small — prefer getExploreLocalitiesFor / getServiceLocalitiesFor.
 */
export const FEATURED_LOCALITIES: readonly InternalLink[] = [
  { href: '/locations/whitefield', name: 'Whitefield' },
  { href: '/locations/koramangala', name: 'Koramangala' },
  { href: '/locations/hsr-layout', name: 'HSR Layout' },
  { href: '/locations/bellandur', name: 'Bellandur' },
  { href: '/locations/jayanagar', name: 'Jayanagar' },
] as const;

export const ALL_LOCALITY_LINKS: readonly InternalLink[] = [
  { href: '/locations/ashok-nagar', name: 'Ashok Nagar' },
  { href: '/locations/banashankari', name: 'Banashankari' },
  { href: '/locations/bangalore', name: 'Bangalore' },
  { href: '/locations/bannerghatta-road', name: 'Bannerghatta Road' },
  { href: '/locations/basavanagudi', name: 'Basavanagudi' },
  { href: '/locations/bellandur', name: 'Bellandur' },
  { href: '/locations/btm-layout', name: 'BTM Layout' },
  { href: '/locations/domlur', name: 'Domlur' },
  { href: '/locations/electronic-city', name: 'Electronic City' },
  { href: '/locations/hebbal', name: 'Hebbal' },
  { href: '/locations/hsr-layout', name: 'HSR Layout' },
  { href: '/locations/indiranagar', name: 'Indiranagar' },
  { href: '/locations/jayanagar', name: 'Jayanagar' },
  { href: '/locations/jp-nagar', name: 'JP Nagar' },
  { href: '/locations/kanakapura-road', name: 'Kanakapura Road' },
  { href: '/locations/koramangala', name: 'Koramangala' },
  { href: '/locations/malleshwaram', name: 'Malleshwaram' },
  { href: '/locations/marathahalli', name: 'Marathahalli' },
  { href: '/locations/mathikere', name: 'Mathikere' },
  { href: '/locations/peenya', name: 'Peenya' },
  { href: '/locations/rajajinagar', name: 'Rajajinagar' },
  { href: '/locations/richmond-town', name: 'Richmond Town' },
  { href: '/locations/rt-nagar', name: 'RT Nagar' },
  { href: '/locations/sahakarnagar', name: 'Sahakarnagar' },
  { href: '/locations/sarjapur-road', name: 'Sarjapur Road' },
  { href: '/locations/ulsoor', name: 'Ulsoor' },
  { href: '/locations/vijayanagar', name: 'Vijayanagar' },
  { href: '/locations/whitefield', name: 'Whitefield' },
  { href: '/locations/yelahanka', name: 'Yelahanka' },
  { href: '/locations/yeshwanthpur', name: 'Yeshwanthpur' },
] as const;

/**
 * Standalone service landings outside the /services/[slug] catalog.
 * Referral verticals were retired — only in-house decoration remains.
 */
export const PARTNER_SERVICE_LINKS = [
  { href: '/services/decoration', label: 'Event decoration' },
] as const;

/**
 * Indexable decoration services present in the committed catalog.
 * Includes high-intent landings used for related-service labels.
 */
export const RELATED_DECORATION_SERVICES = [
  { href: '/services/birthday-decoration', label: 'Birthday Decorations' },
  { href: '/services/wedding-setup', label: 'Wedding Decorations' },
  { href: '/services/haldi-decoration', label: 'Haldi Decorations' },
  { href: '/services/engagement-decoration', label: 'Engagement Decorations' },
  { href: '/services/corporate-decoration', label: 'Corporate Decorations' },
  { href: '/services/room-decoration', label: 'Room Decorations' },
  { href: '/services/tent-balloon-setup', label: 'Tent & Balloon Decorations' },
  { href: '/services/balloon-decoration', label: 'Balloon Decorations' },
  { href: '/services/baby-shower-decoration', label: 'Baby Shower Decorations' },
  { href: '/services/floral-decoration', label: 'Floral Decorations' },
  { href: '/services/anniversary-decoration', label: 'Anniversary Decorations' },
  { href: '/services/proposal-decoration', label: 'Proposal Decorations' },
] as const;

const LABEL_BY_HREF = Object.fromEntries(
  RELATED_DECORATION_SERVICES.map((s) => [s.href, s.label])
) as Record<string, string>;

/**
 * Curated related services (3–5 each) among live routes only.
 * Cannibalized URLs (birthday-home, haldi-backdrop, wedding-stage) removed.
 */
export const RELATED_SERVICES_BY_PATH: Record<string, readonly string[]> = {
  '/services/birthday-decoration': [
    '/services/balloon-decoration',
    '/services/room-decoration',
    '/services/baby-shower-decoration',
  ],
  '/services/wedding-setup': [
    '/services/haldi-decoration',
    '/services/engagement-decoration',
    '/services/floral-decoration',
  ],
  '/services/haldi-decoration': [
    '/services/floral-decoration',
    '/services/wedding-setup',
    '/services/engagement-decoration',
  ],
  '/services/engagement-decoration': [
    '/services/wedding-setup',
    '/services/floral-decoration',
    '/services/room-decoration',
  ],
  '/services/corporate-decoration': [
    '/services/tent-balloon-setup',
    '/services/balloon-decoration',
    '/services/floral-decoration',
  ],
  '/services/room-decoration': [
    '/services/anniversary-decoration',
    '/services/proposal-decoration',
    '/services/birthday-decoration',
  ],
  '/services/tent-balloon-setup': [
    '/services/balloon-decoration',
    '/services/birthday-decoration',
    '/services/corporate-decoration',
  ],
  '/services/balloon-decoration': [
    '/services/birthday-decoration',
    '/services/tent-balloon-setup',
    '/services/baby-shower-decoration',
  ],
  '/services/floral-decoration': [
    '/services/haldi-decoration',
    '/services/wedding-setup',
    '/services/engagement-decoration',
  ],
  '/services/baby-shower-decoration': [
    '/services/birthday-decoration',
    '/services/balloon-decoration',
    '/services/room-decoration',
  ],
  '/services/anniversary-decoration': [
    '/services/room-decoration',
    '/services/floral-decoration',
    '/services/proposal-decoration',
  ],
  '/services/proposal-decoration': [
    '/services/room-decoration',
    '/services/anniversary-decoration',
    '/services/engagement-decoration',
  ],
};

/**
 * Per-service locality links (3–5). Not rendered by frozen templates yet —
 * FEATURED_LOCALITIES is what the UI shows today.
 */

/** Reciprocal nearby localities (max 5) — geographic peers for crawl equity. */
export const NEARBY_LOCALITY_SLUGS: Record<string, readonly string[]> = {
  'ashok-nagar': ['bangalore', 'basavanagudi', 'jayanagar', 'richmond-town', 'ulsoor'],
  banashankari: ['basavanagudi', 'btm-layout', 'jayanagar', 'jp-nagar', 'kanakapura-road'],
  bangalore: ['ashok-nagar', 'hsr-layout', 'indiranagar', 'richmond-town', 'ulsoor'],
  'bannerghatta-road': [
    'electronic-city',
    'hebbal',
    'jp-nagar',
    'kanakapura-road',
    'sarjapur-road',
  ],
  basavanagudi: ['ashok-nagar', 'banashankari', 'jayanagar', 'richmond-town', 'vijayanagar'],
  bellandur: ['electronic-city', 'koramangala', 'marathahalli', 'sarjapur-road', 'whitefield'],
  'btm-layout': ['banashankari', 'hsr-layout', 'jayanagar', 'jp-nagar', 'koramangala'],
  domlur: ['indiranagar', 'koramangala', 'marathahalli', 'ulsoor', 'whitefield'],
  'electronic-city': [
    'bannerghatta-road',
    'bellandur',
    'hsr-layout',
    'kanakapura-road',
    'sarjapur-road',
  ],
  hebbal: ['bannerghatta-road', 'mathikere', 'rt-nagar', 'sahakarnagar', 'yelahanka'],
  'hsr-layout': ['bangalore', 'btm-layout', 'electronic-city', 'koramangala', 'sarjapur-road'],
  indiranagar: ['bangalore', 'domlur', 'koramangala', 'marathahalli', 'ulsoor'],
  jayanagar: ['ashok-nagar', 'banashankari', 'basavanagudi', 'btm-layout', 'jp-nagar'],
  'jp-nagar': ['banashankari', 'bannerghatta-road', 'btm-layout', 'jayanagar', 'kanakapura-road'],
  'kanakapura-road': [
    'banashankari',
    'bannerghatta-road',
    'electronic-city',
    'jp-nagar',
    'vijayanagar',
  ],
  koramangala: ['bellandur', 'btm-layout', 'domlur', 'hsr-layout', 'indiranagar'],
  malleshwaram: ['mathikere', 'peenya', 'rajajinagar', 'richmond-town', 'vijayanagar'],
  marathahalli: ['bellandur', 'domlur', 'indiranagar', 'sarjapur-road', 'whitefield'],
  mathikere: ['hebbal', 'malleshwaram', 'peenya', 'rajajinagar', 'rt-nagar'],
  peenya: ['malleshwaram', 'mathikere', 'rajajinagar', 'vijayanagar', 'yeshwanthpur'],
  rajajinagar: ['malleshwaram', 'mathikere', 'peenya', 'vijayanagar', 'yeshwanthpur'],
  'richmond-town': ['ashok-nagar', 'bangalore', 'basavanagudi', 'malleshwaram', 'ulsoor'],
  'rt-nagar': ['hebbal', 'mathikere', 'sahakarnagar', 'yelahanka', 'yeshwanthpur'],
  sahakarnagar: ['hebbal', 'rt-nagar', 'whitefield', 'yelahanka', 'yeshwanthpur'],
  'sarjapur-road': [
    'bannerghatta-road',
    'bellandur',
    'electronic-city',
    'hsr-layout',
    'marathahalli',
  ],
  ulsoor: ['ashok-nagar', 'bangalore', 'domlur', 'indiranagar', 'richmond-town'],
  vijayanagar: ['basavanagudi', 'kanakapura-road', 'malleshwaram', 'peenya', 'rajajinagar'],
  whitefield: ['bellandur', 'domlur', 'marathahalli', 'sahakarnagar', 'yelahanka'],
  yelahanka: ['hebbal', 'rt-nagar', 'sahakarnagar', 'whitefield', 'yeshwanthpur'],
  yeshwanthpur: ['peenya', 'rajajinagar', 'rt-nagar', 'sahakarnagar', 'yelahanka'],
};

/** Per-service locality links with diversified anchors (covers all 30 localities). */
export const SERVICE_LOCALITIES_BY_PATH: Record<string, readonly InternalLink[]> = {
  '/services/birthday-decoration': [
    { href: '/locations/hsr-layout', name: 'Birthday decoration in HSR Layout' },
    { href: '/locations/whitefield', name: 'Whitefield birthday decoration' },
    { href: '/locations/jp-nagar', name: 'Birthday decoration near JP Nagar' },
    { href: '/locations/marathahalli', name: 'Celebrations in Marathahalli' },
    { href: '/locations/btm-layout', name: 'BTM Layout event décor' },
    { href: '/locations/indiranagar', name: 'Birthday decoration across Indiranagar' },
    { href: '/locations/yelahanka', name: 'Planning in Yelahanka' },
    { href: '/locations/koramangala', name: 'Koramangala venue styling' },
    { href: '/locations/ashok-nagar', name: 'Ashok Nagar celebration décor' },
    { href: '/locations/banashankari', name: 'Birthday decoration for Banashankari hosts' },
  ],
  '/services/wedding-setup': [
    { href: '/locations/whitefield', name: 'Wedding decoration in Whitefield' },
    { href: '/locations/jayanagar', name: 'Jayanagar wedding decoration' },
    { href: '/locations/sarjapur-road', name: 'Wedding decoration near Sarjapur Road' },
    { href: '/locations/electronic-city', name: 'Celebrations in Electronic City' },
    { href: '/locations/banashankari', name: 'Banashankari event décor' },
    { href: '/locations/jp-nagar', name: 'Wedding decoration across JP Nagar' },
    { href: '/locations/malleshwaram', name: 'Planning in Malleshwaram' },
    { href: '/locations/yelahanka', name: 'Yelahanka venue styling' },
    { href: '/locations/bangalore', name: 'Bangalore celebration décor' },
    {
      href: '/locations/bannerghatta-road',
      name: 'Wedding decoration for Bannerghatta Road hosts',
    },
  ],
  '/services/haldi-decoration': [
    { href: '/locations/jayanagar', name: 'Haldi decoration in Jayanagar' },
    { href: '/locations/jp-nagar', name: 'JP Nagar haldi decoration' },
    { href: '/locations/banashankari', name: 'Haldi decoration near Banashankari' },
    { href: '/locations/basavanagudi', name: 'Celebrations in Basavanagudi' },
    { href: '/locations/vijayanagar', name: 'Vijayanagar event décor' },
    { href: '/locations/malleshwaram', name: 'Haldi decoration across Malleshwaram' },
    { href: '/locations/rajajinagar', name: 'Planning in Rajajinagar' },
    { href: '/locations/kanakapura-road', name: 'Kanakapura Road venue styling' },
    { href: '/locations/bellandur', name: 'Bellandur celebration décor' },
    { href: '/locations/domlur', name: 'Haldi decoration for Domlur hosts' },
  ],
  '/services/engagement-decoration': [
    { href: '/locations/indiranagar', name: 'Engagement decoration in Indiranagar' },
    { href: '/locations/koramangala', name: 'Koramangala engagement decoration' },
    { href: '/locations/whitefield', name: 'Engagement decoration near Whitefield' },
    { href: '/locations/hsr-layout', name: 'Celebrations in HSR Layout' },
    { href: '/locations/ulsoor', name: 'Ulsoor event décor' },
    { href: '/locations/richmond-town', name: 'Engagement decoration across Richmond Town' },
    { href: '/locations/domlur', name: 'Planning in Domlur' },
    { href: '/locations/bellandur', name: 'Bellandur venue styling' },
    { href: '/locations/hebbal', name: 'Hebbal celebration décor' },
    { href: '/locations/mathikere', name: 'Engagement decoration for Mathikere hosts' },
  ],
  '/services/corporate-decoration': [
    { href: '/locations/whitefield', name: 'Corporate decoration in Whitefield' },
    { href: '/locations/electronic-city', name: 'Electronic City corporate decoration' },
    { href: '/locations/bellandur', name: 'Corporate decoration near Bellandur' },
    { href: '/locations/marathahalli', name: 'Celebrations in Marathahalli' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road event décor' },
    { href: '/locations/hebbal', name: 'Corporate decoration across Hebbal' },
    { href: '/locations/peenya', name: 'Planning in Peenya' },
    { href: '/locations/yeshwanthpur', name: 'Yeshwanthpur venue styling' },
    { href: '/locations/rt-nagar', name: 'RT Nagar celebration décor' },
    { href: '/locations/sahakarnagar', name: 'Corporate decoration for Sahakarnagar hosts' },
  ],
  '/services/room-decoration': [
    { href: '/locations/koramangala', name: 'Room decoration in Koramangala' },
    { href: '/locations/indiranagar', name: 'Indiranagar room decoration' },
    { href: '/locations/hsr-layout', name: 'Room decoration near HSR Layout' },
    { href: '/locations/jayanagar', name: 'Celebrations in Jayanagar' },
    { href: '/locations/btm-layout', name: 'BTM Layout event décor' },
    { href: '/locations/rajajinagar', name: 'Room decoration across Rajajinagar' },
    { href: '/locations/mathikere', name: 'Planning in Mathikere' },
    { href: '/locations/sahakarnagar', name: 'Sahakarnagar venue styling' },
    { href: '/locations/ashok-nagar', name: 'Ashok Nagar celebration décor' },
    { href: '/locations/bangalore', name: 'Room decoration for Bangalore hosts' },
  ],
  '/services/tent-balloon-setup': [
    { href: '/locations/sarjapur-road', name: 'Tent & balloon decoration in Sarjapur Road' },
    { href: '/locations/electronic-city', name: 'Electronic City tent & balloon decoration' },
    { href: '/locations/yelahanka', name: 'Tent & balloon decoration near Yelahanka' },
    { href: '/locations/bannerghatta-road', name: 'Celebrations in Bannerghatta Road' },
    { href: '/locations/hebbal', name: 'Hebbal event décor' },
    { href: '/locations/rt-nagar', name: 'Tent & balloon decoration across RT Nagar' },
    { href: '/locations/kanakapura-road', name: 'Planning in Kanakapura Road' },
    { href: '/locations/ashok-nagar', name: 'Ashok Nagar venue styling' },
    { href: '/locations/basavanagudi', name: 'Basavanagudi celebration décor' },
  ],
  '/services/balloon-decoration': [
    { href: '/locations/hsr-layout', name: 'Balloon decoration in HSR Layout' },
    { href: '/locations/btm-layout', name: 'BTM Layout balloon decoration' },
    { href: '/locations/marathahalli', name: 'Balloon decoration near Marathahalli' },
    { href: '/locations/jp-nagar', name: 'Celebrations in JP Nagar' },
    { href: '/locations/yeshwanthpur', name: 'Yeshwanthpur event décor' },
    { href: '/locations/ulsoor', name: 'Balloon decoration across Ulsoor' },
    { href: '/locations/bangalore', name: 'Planning in Bangalore' },
    { href: '/locations/whitefield', name: 'Whitefield venue styling' },
    { href: '/locations/peenya', name: 'Peenya celebration décor' },
  ],
  '/services/baby-shower-decoration': [
    { href: '/locations/hsr-layout', name: 'Baby shower decoration in HSR Layout' },
    { href: '/locations/jayanagar', name: 'Jayanagar baby shower decoration' },
    { href: '/locations/indiranagar', name: 'Baby shower decoration near Indiranagar' },
    { href: '/locations/sahakarnagar', name: 'Celebrations in Sahakarnagar' },
    { href: '/locations/malleshwaram', name: 'Malleshwaram event décor' },
    { href: '/locations/banashankari', name: 'Baby shower decoration across Banashankari' },
    { href: '/locations/domlur', name: 'Planning in Domlur' },
    { href: '/locations/richmond-town', name: 'Richmond Town venue styling' },
    { href: '/locations/vijayanagar', name: 'Vijayanagar celebration décor' },
  ],
  '/services/floral-decoration': [
    { href: '/locations/jayanagar', name: 'Floral decoration in Jayanagar' },
    { href: '/locations/basavanagudi', name: 'Basavanagudi floral decoration' },
    { href: '/locations/indiranagar', name: 'Floral decoration near Indiranagar' },
    { href: '/locations/malleshwaram', name: 'Celebrations in Malleshwaram' },
    { href: '/locations/richmond-town', name: 'Richmond Town event décor' },
    { href: '/locations/ashok-nagar', name: 'Floral decoration across Ashok Nagar' },
    { href: '/locations/ulsoor', name: 'Planning in Ulsoor' },
    { href: '/locations/vijayanagar', name: 'Vijayanagar venue styling' },
    { href: '/locations/bannerghatta-road', name: 'Bannerghatta Road celebration décor' },
  ],
  '/services/anniversary-decoration': [
    { href: '/locations/koramangala', name: 'Anniversary decoration in Koramangala' },
    { href: '/locations/richmond-town', name: 'Richmond Town anniversary decoration' },
    { href: '/locations/ulsoor', name: 'Anniversary decoration near Ulsoor' },
    { href: '/locations/rajajinagar', name: 'Celebrations in Rajajinagar' },
    { href: '/locations/hebbal', name: 'Hebbal event décor' },
    { href: '/locations/kanakapura-road', name: 'Anniversary decoration across Kanakapura Road' },
    { href: '/locations/mathikere', name: 'Planning in Mathikere' },
    { href: '/locations/peenya', name: 'Peenya venue styling' },
    { href: '/locations/rt-nagar', name: 'RT Nagar celebration décor' },
  ],
  '/services/proposal-decoration': [
    { href: '/locations/koramangala', name: 'Proposal decoration in Koramangala' },
    { href: '/locations/ulsoor', name: 'Ulsoor proposal decoration' },
    { href: '/locations/richmond-town', name: 'Proposal decoration near Richmond Town' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
    { href: '/locations/domlur', name: 'Domlur event décor' },
    { href: '/locations/bellandur', name: 'Proposal decoration across Bellandur' },
    { href: '/locations/yeshwanthpur', name: 'Planning in Yeshwanthpur' },
    { href: '/locations/bannerghatta-road', name: 'Bannerghatta Road venue styling' },
    { href: '/locations/basavanagudi', name: 'Basavanagudi celebration décor' },
  ],
  '/services/nikah-decoration': [
    { href: '/locations/basavanagudi', name: 'Nikah decoration in Basavanagudi' },
    { href: '/locations/ashok-nagar', name: 'Ashok Nagar nikah decoration' },
    { href: '/locations/malleshwaram', name: 'Nikah decoration near Malleshwaram' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
    { href: '/locations/banashankari', name: 'Banashankari event décor' },
    { href: '/locations/btm-layout', name: 'Nikah decoration across BTM Layout' },
    { href: '/locations/electronic-city', name: 'Planning in Electronic City' },
    { href: '/locations/kanakapura-road', name: 'Kanakapura Road venue styling' },
    { href: '/locations/marathahalli', name: 'Marathahalli celebration décor' },
  ],
  '/services/home-decoration': [
    { href: '/locations/jp-nagar', name: 'Home decoration in JP Nagar' },
    { href: '/locations/yelahanka', name: 'Yelahanka home decoration' },
    { href: '/locations/rt-nagar', name: 'Home decoration near RT Nagar' },
    { href: '/locations/vijayanagar', name: 'Celebrations in Vijayanagar' },
    { href: '/locations/mathikere', name: 'Mathikere event décor' },
    { href: '/locations/peenya', name: 'Home decoration across Peenya' },
    { href: '/locations/rajajinagar', name: 'Planning in Rajajinagar' },
    { href: '/locations/sahakarnagar', name: 'Sahakarnagar venue styling' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road celebration décor' },
  ],
  '/services/terrace-decoration': [
    { href: '/locations/bellandur', name: 'Terrace decoration in Bellandur' },
    { href: '/locations/domlur', name: 'Domlur terrace decoration' },
    { href: '/locations/marathahalli', name: 'Terrace decoration near Marathahalli' },
    { href: '/locations/btm-layout', name: 'Celebrations in BTM Layout' },
    { href: '/locations/hebbal', name: 'Hebbal event décor' },
    { href: '/locations/yeshwanthpur', name: 'Terrace decoration across Yeshwanthpur' },
    { href: '/locations/bannerghatta-road', name: 'Planning in Bannerghatta Road' },
    { href: '/locations/electronic-city', name: 'Electronic City venue styling' },
    { href: '/locations/kanakapura-road', name: 'Kanakapura Road celebration décor' },
  ],
  '/services/car-decoration': [
    { href: '/locations/rajajinagar', name: 'Car decoration in Rajajinagar' },
    { href: '/locations/yelahanka', name: 'Yelahanka car decoration' },
    { href: '/locations/mathikere', name: 'Car decoration near Mathikere' },
    { href: '/locations/peenya', name: 'Celebrations in Peenya' },
    { href: '/locations/rt-nagar', name: 'RT Nagar event décor' },
    { href: '/locations/sahakarnagar', name: 'Car decoration across Sahakarnagar' },
    { href: '/locations/sarjapur-road', name: 'Planning in Sarjapur Road' },
    { href: '/locations/vijayanagar', name: 'Vijayanagar venue styling' },
    { href: '/locations/yeshwanthpur', name: 'Yeshwanthpur celebration décor' },
  ],
};

/** Rotating explore-block localities per page key (sitewide coverage). */
export const EXPLORE_LOCALITIES_BY_PAGE: Record<string, readonly InternalLink[]> = {
  home: [
    { href: '/locations/hebbal', name: 'Hebbal' },
    { href: '/locations/whitefield', name: 'Décor in Whitefield' },
    { href: '/locations/basavanagudi', name: 'Basavanagudi events' },
    { href: '/locations/yeshwanthpur', name: 'Celebrate in Yeshwanthpur' },
    { href: '/locations/electronic-city', name: 'Electronic City setups' },
    { href: '/locations/koramangala', name: 'Parties in Koramangala' },
    { href: '/locations/bannerghatta-road', name: 'Bannerghatta Road decorations' },
    { href: '/locations/ashok-nagar', name: 'Events around Ashok Nagar' },
  ],
  'services-hub': [
    { href: '/locations/marathahalli', name: 'Marathahalli' },
    { href: '/locations/sarjapur-road', name: 'Décor in Sarjapur Road' },
    { href: '/locations/mathikere', name: 'Mathikere events' },
    { href: '/locations/yelahanka', name: 'Celebrate in Yelahanka' },
    { href: '/locations/kanakapura-road', name: 'Kanakapura Road setups' },
    { href: '/locations/domlur', name: 'Parties in Domlur' },
    { href: '/locations/richmond-town', name: 'Richmond Town decorations' },
    { href: '/locations/ulsoor', name: 'Events around Ulsoor' },
  ],
  pricing: [
    { href: '/locations/malleshwaram', name: 'Malleshwaram' },
    { href: '/locations/bellandur', name: 'Décor in Bellandur' },
    { href: '/locations/jayanagar', name: 'Jayanagar events' },
    { href: '/locations/peenya', name: 'Celebrate in Peenya' },
    { href: '/locations/banashankari', name: 'Banashankari setups' },
    { href: '/locations/rt-nagar', name: 'Parties in RT Nagar' },
    { href: '/locations/vijayanagar', name: 'Vijayanagar decorations' },
    { href: '/locations/bangalore', name: 'Events around Bangalore' },
  ],
  reviews: [
    { href: '/locations/btm-layout', name: 'BTM Layout' },
    { href: '/locations/rajajinagar', name: 'Décor in Rajajinagar' },
    { href: '/locations/jp-nagar', name: 'JP Nagar events' },
    { href: '/locations/sahakarnagar', name: 'Celebrate in Sahakarnagar' },
    { href: '/locations/indiranagar', name: 'Indiranagar setups' },
    { href: '/locations/hsr-layout', name: 'Parties in HSR Layout' },
    { href: '/locations/malleshwaram', name: 'Malleshwaram decorations' },
    { href: '/locations/bellandur', name: 'Events around Bellandur' },
  ],
  gallery: [
    { href: '/locations/btm-layout', name: 'BTM Layout' },
    { href: '/locations/rajajinagar', name: 'Décor in Rajajinagar' },
    { href: '/locations/jayanagar', name: 'Jayanagar events' },
    { href: '/locations/peenya', name: 'Celebrate in Peenya' },
    { href: '/locations/banashankari', name: 'Banashankari setups' },
    { href: '/locations/rt-nagar', name: 'Parties in RT Nagar' },
    { href: '/locations/vijayanagar', name: 'Vijayanagar decorations' },
    { href: '/locations/bangalore', name: 'Events around Bangalore' },
  ],
  about: [
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/basavanagudi', name: 'Décor in Basavanagudi' },
    { href: '/locations/yeshwanthpur', name: 'Yeshwanthpur events' },
    { href: '/locations/electronic-city', name: 'Celebrate in Electronic City' },
    { href: '/locations/koramangala', name: 'Koramangala setups' },
    { href: '/locations/bannerghatta-road', name: 'Parties in Bannerghatta Road' },
    { href: '/locations/ashok-nagar', name: 'Ashok Nagar decorations' },
    { href: '/locations/marathahalli', name: 'Events around Marathahalli' },
  ],
  'blog-hub': [
    { href: '/locations/hsr-layout', name: 'HSR Layout' },
    { href: '/locations/jp-nagar', name: 'Décor in JP Nagar' },
    { href: '/locations/sahakarnagar', name: 'Sahakarnagar events' },
    { href: '/locations/indiranagar', name: 'Celebrate in Indiranagar' },
    { href: '/locations/hebbal', name: 'Hebbal setups' },
    { href: '/locations/sarjapur-road', name: 'Parties in Sarjapur Road' },
    { href: '/locations/mathikere', name: 'Mathikere decorations' },
    { href: '/locations/yelahanka', name: 'Events around Yelahanka' },
  ],
  faq: [
    { href: '/locations/kanakapura-road', name: 'Kanakapura Road' },
    { href: '/locations/domlur', name: 'Décor in Domlur' },
    { href: '/locations/richmond-town', name: 'Richmond Town events' },
    { href: '/locations/ulsoor', name: 'Celebrate in Ulsoor' },
    { href: '/locations/electronic-city', name: 'Electronic City setups' },
    { href: '/locations/koramangala', name: 'Parties in Koramangala' },
    { href: '/locations/bannerghatta-road', name: 'Bannerghatta Road decorations' },
    { href: '/locations/ashok-nagar', name: 'Events around Ashok Nagar' },
  ],
  'blog-birthday-decoration-ideas-home-bangalore': [
    { href: '/locations/malleshwaram', name: 'Malleshwaram' },
    { href: '/locations/bellandur', name: 'Décor in Bellandur' },
    { href: '/locations/jayanagar', name: 'Jayanagar events' },
    { href: '/locations/peenya', name: 'Celebrate in Peenya' },
    { href: '/locations/banashankari', name: 'Banashankari setups' },
    { href: '/locations/rt-nagar', name: 'Parties in RT Nagar' },
    { href: '/locations/vijayanagar', name: 'Vijayanagar decorations' },
    { href: '/locations/bangalore', name: 'Events around Bangalore' },
  ],
  'blog-haldi-ceremony-decoration-checklist': [
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road' },
    { href: '/locations/mathikere', name: 'Décor in Mathikere' },
    { href: '/locations/yelahanka', name: 'Yelahanka events' },
    { href: '/locations/kanakapura-road', name: 'Celebrate in Kanakapura Road' },
    { href: '/locations/domlur', name: 'Domlur setups' },
    { href: '/locations/richmond-town', name: 'Parties in Richmond Town' },
    { href: '/locations/ulsoor', name: 'Ulsoor decorations' },
    { href: '/locations/hsr-layout', name: 'Events around HSR Layout' },
  ],
  'blog-wedding-decoration-budget-guide-bangalore': [
    { href: '/locations/btm-layout', name: 'BTM Layout' },
    { href: '/locations/rajajinagar', name: 'Décor in Rajajinagar' },
    { href: '/locations/jp-nagar', name: 'JP Nagar events' },
    { href: '/locations/sahakarnagar', name: 'Celebrate in Sahakarnagar' },
    { href: '/locations/indiranagar', name: 'Indiranagar setups' },
    { href: '/locations/hebbal', name: 'Parties in Hebbal' },
    { href: '/locations/whitefield', name: 'Whitefield decorations' },
    { href: '/locations/basavanagudi', name: 'Events around Basavanagudi' },
  ],
  'blog-balloon-decoration-trends-2025-2026': [
    { href: '/locations/yeshwanthpur', name: 'Yeshwanthpur' },
    { href: '/locations/marathahalli', name: 'Décor in Marathahalli' },
    { href: '/locations/malleshwaram', name: 'Malleshwaram events' },
    { href: '/locations/bellandur', name: 'Celebrate in Bellandur' },
    { href: '/locations/jayanagar', name: 'Jayanagar setups' },
    { href: '/locations/peenya', name: 'Parties in Peenya' },
    { href: '/locations/banashankari', name: 'Banashankari decorations' },
    { href: '/locations/rt-nagar', name: 'Events around RT Nagar' },
  ],
  'blog-choose-event-venue-bangalore': [
    { href: '/locations/vijayanagar', name: 'Vijayanagar' },
    { href: '/locations/bangalore', name: 'Décor in Bangalore' },
    { href: '/locations/jp-nagar', name: 'JP Nagar events' },
    { href: '/locations/sahakarnagar', name: 'Celebrate in Sahakarnagar' },
    { href: '/locations/indiranagar', name: 'Indiranagar setups' },
    { href: '/locations/hebbal', name: 'Parties in Hebbal' },
  ],
  'partner-decoration': [
    { href: '/locations/hsr-layout', name: 'HSR Layout' },
    { href: '/locations/btm-layout', name: 'Décor in BTM Layout' },
    { href: '/locations/rajajinagar', name: 'Rajajinagar events' },
    { href: '/locations/whitefield', name: 'Celebrate in Whitefield' },
    { href: '/locations/basavanagudi', name: 'Basavanagudi setups' },
    { href: '/locations/yeshwanthpur', name: 'Parties in Yeshwanthpur' },
  ],
};

export function getRelatedServiceHrefsFor(servicePath: string): string[] {
  const hrefs = RELATED_SERVICES_BY_PATH[servicePath];
  if (!hrefs?.length) {
    return RELATED_DECORATION_SERVICES.filter((s) => s.href !== servicePath)
      .slice(0, 5)
      .map((s) => s.href);
  }
  return hrefs.filter((href) => href !== servicePath && Boolean(LABEL_BY_HREF[href]));
}

export function getRelatedServiceLinksFor(servicePath: string): { href: string; label: string }[] {
  return getRelatedServiceHrefsFor(servicePath).map((href) => ({
    href,
    label: LABEL_BY_HREF[href] ?? href,
  }));
}

/** Locality chips for a decoration service page (falls back to featured set). */
export function getServiceLocalitiesFor(servicePath: string): InternalLink[] {
  const list = SERVICE_LOCALITIES_BY_PATH[servicePath];
  if (list?.length) return [...list];
  return [...FEATURED_LOCALITIES];
}

/** Rotating locality set for CoreExploreLinks — balances crawl equity sitewide. */
export function getExploreLocalitiesFor(pageKey: string): InternalLink[] {
  const list = EXPLORE_LOCALITIES_BY_PAGE[pageKey];
  if (list?.length) return [...list];
  // Deterministic fallback rotation across all localities
  const seed = Array.from(pageKey).reduce((n, ch) => n + ch.charCodeAt(0), 0);
  const pool = [...ALL_LOCALITY_LINKS];
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 6);
}

/** Reciprocal nearby locality slugs (max 5, never self). */
export function getNearbyLocalitySlugs(slug: string): readonly string[] {
  return NEARBY_LOCALITY_SLUGS[slug] ?? [];
}

/** @deprecated Prefer getRelatedServiceLinksFor. */
export function relatedServicesExcluding(currentPath: string) {
  return getRelatedServiceLinksFor(currentPath);
}
