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

/** Every published locality page (all 50 in AREAS). Enforced by tests/unit/locality-links.test.ts. */
export const ALL_LOCALITY_LINKS: readonly InternalLink[] = [
  { href: '/locations/arekere', name: 'Arekere' },
  { href: '/locations/ashok-nagar', name: 'Ashok Nagar' },
  { href: '/locations/banashankari', name: 'Banashankari' },
  { href: '/locations/bangalore', name: 'Bangalore' },
  { href: '/locations/bannerghatta-road', name: 'Bannerghatta Road' },
  { href: '/locations/basavanagudi', name: 'Basavanagudi' },
  { href: '/locations/begur', name: 'Begur' },
  { href: '/locations/bellandur', name: 'Bellandur' },
  { href: '/locations/bilekahalli', name: 'Bilekahalli' },
  { href: '/locations/btm-layout', name: 'BTM Layout' },
  { href: '/locations/chamrajpet', name: 'Chamrajpet' },
  { href: '/locations/domlur', name: 'Domlur' },
  { href: '/locations/electronic-city', name: 'Electronic City' },
  { href: '/locations/girinagar', name: 'Girinagar' },
  { href: '/locations/gottigere', name: 'Gottigere' },
  { href: '/locations/hanumanthanagar', name: 'Hanumanthanagar' },
  { href: '/locations/hebbal', name: 'Hebbal' },
  { href: '/locations/hsr-layout', name: 'HSR Layout' },
  { href: '/locations/hulimavu', name: 'Hulimavu' },
  { href: '/locations/indiranagar', name: 'Indiranagar' },
  { href: '/locations/isro-layout', name: 'ISRO Layout' },
  { href: '/locations/jayanagar', name: 'Jayanagar' },
  { href: '/locations/jp-nagar', name: 'JP Nagar' },
  { href: '/locations/kanakapura-road', name: 'Kanakapura Road' },
  { href: '/locations/katriguppe', name: 'Katriguppe' },
  { href: '/locations/konanakunte', name: 'Konanakunte' },
  { href: '/locations/koramangala', name: 'Koramangala' },
  { href: '/locations/kumaraswamy-layout', name: 'Kumaraswamy Layout' },
  { href: '/locations/malleshwaram', name: 'Malleshwaram' },
  { href: '/locations/marathahalli', name: 'Marathahalli' },
  { href: '/locations/mathikere', name: 'Mathikere' },
  { href: '/locations/nagarbhavi', name: 'Nagarbhavi' },
  { href: '/locations/padmanabhanagar', name: 'Padmanabhanagar' },
  { href: '/locations/peenya', name: 'Peenya' },
  { href: '/locations/puttenahalli', name: 'Puttenahalli' },
  { href: '/locations/rajajinagar', name: 'Rajajinagar' },
  { href: '/locations/richmond-town', name: 'Richmond Town' },
  { href: '/locations/rt-nagar', name: 'RT Nagar' },
  { href: '/locations/sahakarnagar', name: 'Sahakarnagar' },
  { href: '/locations/sarjapur-road', name: 'Sarjapur Road' },
  { href: '/locations/shanti-nagar', name: 'Shanti Nagar' },
  { href: '/locations/thyagarajanagar', name: 'Thyagarajanagar' },
  { href: '/locations/ulsoor', name: 'Ulsoor' },
  { href: '/locations/uttarahalli', name: 'Uttarahalli' },
  { href: '/locations/vasanthapura', name: 'Vasanthapura' },
  { href: '/locations/vijayanagar', name: 'Vijayanagar' },
  { href: '/locations/whitefield', name: 'Whitefield' },
  { href: '/locations/wilson-garden', name: 'Wilson Garden' },
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
  { href: '/services/home-decoration', label: 'Home Decorations' },
  { href: '/services/terrace-decoration', label: 'Terrace Decorations' },
  { href: '/services/nikah-decoration', label: 'Nikah Decorations' },
  { href: '/services/car-decoration', label: 'Car Decorations' },
  { href: '/services/naming-ceremony-decoration', label: 'Naming Ceremony Decorations' },
  { href: '/services/reception-decoration', label: 'Reception Decorations' },
  { href: '/services/roka-decoration', label: 'Roka & Baat Pakki Decorations' },
  { href: '/services/valima-decoration', label: 'Valima & Shukrana Decorations' },
  { href: '/services/mehndi-decoration', label: 'Mehndi Decorations' },
  { href: '/services/bridal-shower-decoration', label: 'Bridal Shower Decorations' },
  { href: '/services/housewarming-decoration', label: 'Housewarming & Griha Pravesh Decorations' },
  { href: '/services/baat-pakki-decoration', label: 'Baat Pakki Decorations' },
  { href: '/services/shukrana-decoration', label: 'Shukrana Decorations' },
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
    '/services/home-decoration',
    '/services/balloon-decoration',
    '/services/room-decoration',
    '/services/baby-shower-decoration',
  ],
  '/services/wedding-setup': [
    '/services/home-decoration',
    '/services/haldi-decoration',
    '/services/engagement-decoration',
    '/services/floral-decoration',
  ],
  '/services/haldi-decoration': [
    '/services/home-decoration',
    '/services/floral-decoration',
    '/services/wedding-setup',
    '/services/engagement-decoration',
  ],
  '/services/engagement-decoration': [
    '/services/home-decoration',
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
    '/services/home-decoration',
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
  '/services/home-decoration': [
    '/services/haldi-decoration',
    '/services/engagement-decoration',
    '/services/birthday-decoration',
    '/services/baby-shower-decoration',
    '/services/wedding-setup',
    '/services/room-decoration',
  ],
  '/services/terrace-decoration': [
    '/services/proposal-decoration',
    '/services/tent-balloon-setup',
    '/services/birthday-decoration',
  ],
  '/services/nikah-decoration': [
    '/services/wedding-setup',
    '/services/floral-decoration',
    '/services/car-decoration',
  ],
  '/services/car-decoration': [
    '/services/wedding-setup',
    '/services/nikah-decoration',
    '/services/floral-decoration',
  ],
  '/services/naming-ceremony-decoration': [
    '/services/baby-shower-decoration',
    '/services/birthday-decoration',
    '/services/home-decoration',
    '/services/floral-decoration',
  ],
  '/services/reception-decoration': [
    '/services/wedding-setup',
    '/services/valima-decoration',
    '/services/engagement-decoration',
    '/services/car-decoration',
  ],
  '/services/roka-decoration': [
    '/services/engagement-decoration',
    '/services/haldi-decoration',
    '/services/home-decoration',
    '/services/wedding-setup',
  ],
  '/services/valima-decoration': [
    '/services/nikah-decoration',
    '/services/reception-decoration',
    '/services/wedding-setup',
    '/services/car-decoration',
  ],
  '/services/mehndi-decoration': [
    '/services/haldi-decoration',
    '/services/bridal-shower-decoration',
    '/services/wedding-setup',
    '/services/terrace-decoration',
  ],
  '/services/bridal-shower-decoration': [
    '/services/room-decoration',
    '/services/balloon-decoration',
    '/services/proposal-decoration',
    '/services/mehndi-decoration',
  ],
  '/services/housewarming-decoration': [
    '/services/floral-decoration',
    '/services/home-decoration',
    '/services/haldi-decoration',
    '/services/naming-ceremony-decoration',
  ],
  '/services/baat-pakki-decoration': [
    '/services/roka-decoration',
    '/services/engagement-decoration',
    '/services/home-decoration',
    '/services/wedding-setup',
  ],
  '/services/shukrana-decoration': [
    '/services/nikah-decoration',
    '/services/valima-decoration',
    '/services/home-decoration',
    '/services/floral-decoration',
  ],
};

/**
 * Per-service locality links (3–5). Not rendered by frozen templates yet —
 * FEATURED_LOCALITIES is what the UI shows today.
 */

/**
 * Nearby localities (max 5) — geographic peers for crawl equity. Every page in
 * AREAS must have an entry and be linked from at least one other entry
 * (tests/unit/locality-links.test.ts).
 */
export const NEARBY_LOCALITY_SLUGS: Record<string, readonly string[]> = {
  'ashok-nagar': ['bangalore', 'basavanagudi', 'richmond-town', 'shanti-nagar', 'ulsoor'],
  banashankari: ['basavanagudi', 'girinagar', 'jayanagar', 'katriguppe', 'padmanabhanagar'],
  bangalore: ['ashok-nagar', 'chamrajpet', 'indiranagar', 'richmond-town', 'wilson-garden'],
  'bannerghatta-road': ['arekere', 'bilekahalli', 'gottigere', 'hulimavu', 'jp-nagar'],
  basavanagudi: ['banashankari', 'chamrajpet', 'hanumanthanagar', 'jayanagar', 'thyagarajanagar'],
  bellandur: ['electronic-city', 'koramangala', 'marathahalli', 'sarjapur-road', 'whitefield'],
  'btm-layout': ['arekere', 'banashankari', 'bilekahalli', 'hsr-layout', 'jp-nagar'],
  domlur: ['indiranagar', 'koramangala', 'marathahalli', 'ulsoor', 'whitefield'],
  'electronic-city': ['bannerghatta-road', 'begur', 'bellandur', 'hsr-layout', 'sarjapur-road'],
  hebbal: ['mathikere', 'rt-nagar', 'sahakarnagar', 'yelahanka', 'yeshwanthpur'],
  'hsr-layout': ['begur', 'btm-layout', 'electronic-city', 'koramangala', 'sarjapur-road'],
  indiranagar: ['bangalore', 'domlur', 'koramangala', 'marathahalli', 'ulsoor'],
  jayanagar: ['banashankari', 'basavanagudi', 'btm-layout', 'thyagarajanagar', 'wilson-garden'],
  'jp-nagar': [
    'banashankari',
    'bannerghatta-road',
    'jayanagar',
    'kumaraswamy-layout',
    'puttenahalli',
  ],
  'kanakapura-road': ['banashankari', 'isro-layout', 'konanakunte', 'uttarahalli', 'vasanthapura'],
  koramangala: ['bellandur', 'btm-layout', 'domlur', 'hsr-layout', 'indiranagar'],
  malleshwaram: ['mathikere', 'peenya', 'rajajinagar', 'richmond-town', 'vijayanagar'],
  marathahalli: ['bellandur', 'domlur', 'indiranagar', 'sarjapur-road', 'whitefield'],
  mathikere: ['hebbal', 'malleshwaram', 'peenya', 'rajajinagar', 'rt-nagar'],
  peenya: ['malleshwaram', 'mathikere', 'rajajinagar', 'vijayanagar', 'yeshwanthpur'],
  rajajinagar: ['malleshwaram', 'mathikere', 'nagarbhavi', 'vijayanagar', 'yeshwanthpur'],
  'richmond-town': ['ashok-nagar', 'bangalore', 'shanti-nagar', 'ulsoor', 'wilson-garden'],
  'rt-nagar': ['hebbal', 'mathikere', 'sahakarnagar', 'yelahanka', 'yeshwanthpur'],
  sahakarnagar: ['hebbal', 'mathikere', 'rt-nagar', 'yelahanka', 'yeshwanthpur'],
  'sarjapur-road': [
    'bannerghatta-road',
    'bellandur',
    'electronic-city',
    'hsr-layout',
    'marathahalli',
  ],
  ulsoor: ['ashok-nagar', 'bangalore', 'domlur', 'indiranagar', 'richmond-town'],
  vijayanagar: ['basavanagudi', 'girinagar', 'hanumanthanagar', 'nagarbhavi', 'rajajinagar'],
  whitefield: ['bellandur', 'domlur', 'marathahalli', 'sahakarnagar', 'yelahanka'],
  yelahanka: ['hebbal', 'rt-nagar', 'sahakarnagar', 'whitefield', 'yeshwanthpur'],
  yeshwanthpur: ['peenya', 'rajajinagar', 'rt-nagar', 'sahakarnagar', 'yelahanka'],
  // Newer south / central pages (Oct 2026). Geographic peers; several point
  // back at JP Nagar, Banashankari and Kanakapura Road, which barely rank and
  // need inbound links more than anything else in the set.
  hanumanthanagar: ['basavanagudi', 'thyagarajanagar', 'girinagar', 'banashankari', 'katriguppe'],
  thyagarajanagar: ['basavanagudi', 'hanumanthanagar', 'jayanagar', 'banashankari', 'katriguppe'],
  puttenahalli: ['jp-nagar', 'konanakunte', 'kanakapura-road', 'arekere', 'bannerghatta-road'],
  chamrajpet: ['basavanagudi', 'wilson-garden', 'shanti-nagar', 'vijayanagar', 'hanumanthanagar'],
  'isro-layout': ['kumaraswamy-layout', 'vasanthapura', 'konanakunte', 'jp-nagar', 'banashankari'],
  'wilson-garden': ['shanti-nagar', 'richmond-town', 'chamrajpet', 'jayanagar', 'koramangala'],
  'shanti-nagar': ['richmond-town', 'ashok-nagar', 'wilson-garden', 'chamrajpet', 'koramangala'],
  bilekahalli: ['arekere', 'btm-layout', 'bannerghatta-road', 'hulimavu', 'jp-nagar'],
  girinagar: ['banashankari', 'katriguppe', 'hanumanthanagar', 'vijayanagar', 'nagarbhavi'],
  arekere: ['bilekahalli', 'hulimavu', 'puttenahalli', 'bannerghatta-road', 'btm-layout'],
  'kumaraswamy-layout': [
    'isro-layout',
    'padmanabhanagar',
    'banashankari',
    'jp-nagar',
    'konanakunte',
  ],
  padmanabhanagar: ['kumaraswamy-layout', 'banashankari', 'katriguppe', 'jp-nagar', 'uttarahalli'],
  katriguppe: [
    'banashankari',
    'girinagar',
    'hanumanthanagar',
    'padmanabhanagar',
    'thyagarajanagar',
  ],
  hulimavu: ['arekere', 'gottigere', 'bilekahalli', 'begur', 'bannerghatta-road'],
  konanakunte: [
    'kanakapura-road',
    'puttenahalli',
    'isro-layout',
    'vasanthapura',
    'kumaraswamy-layout',
  ],
  uttarahalli: [
    'vasanthapura',
    'padmanabhanagar',
    'konanakunte',
    'kanakapura-road',
    'banashankari',
  ],
  vasanthapura: [
    'uttarahalli',
    'isro-layout',
    'konanakunte',
    'kanakapura-road',
    'kumaraswamy-layout',
  ],
  gottigere: ['hulimavu', 'begur', 'arekere', 'bannerghatta-road', 'puttenahalli'],
  begur: ['hulimavu', 'gottigere', 'electronic-city', 'bilekahalli', 'hsr-layout'],
  nagarbhavi: ['vijayanagar', 'girinagar', 'rajajinagar', 'banashankari'],
};

/** Per-service locality links with diversified anchors (covers all 50 localities). */
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
    { href: '/locations/hulimavu', name: 'Hulimavu birthday decoration' },
    { href: '/locations/vasanthapura', name: 'Birthday decoration in Vasanthapura' },
    { href: '/locations/arekere', name: 'Arekere party decoration' },
    { href: '/locations/puttenahalli', name: 'Puttenahalli clubhouse birthdays' },
  ],
  '/services/wedding-setup': [
    { href: '/locations/whitefield', name: 'Wedding decoration in Whitefield' },
    { href: '/locations/jayanagar', name: 'Jayanagar wedding decoration' },
    { href: '/locations/sarjapur-road', name: 'Wedding decoration near Sarjapur Road' },
    { href: '/locations/electronic-city', name: 'Celebrations in Electronic City' },
    { href: '/locations/banashankari', name: 'Banashankari event décor' },
    { href: '/locations/jp-nagar', name: 'Wedding decoration across JP Nagar' },
    { href: '/locations/malleshwaram', name: 'Planning in Malleshwaram' },
    { href: '/locations/shanti-nagar', name: 'Shanti Nagar banquet weddings' },
    { href: '/locations/chamrajpet', name: 'Chamrajpet wedding stages' },
    { href: '/locations/nagarbhavi', name: 'Nagarbhavi reception decoration' },
    { href: '/locations/padmanabhanagar', name: 'Padmanabhanagar wedding décor' },
  ],
  '/services/haldi-decoration': [
    { href: '/locations/jayanagar', name: 'Haldi decoration in Jayanagar' },
    { href: '/locations/jp-nagar', name: 'JP Nagar haldi decoration' },
    { href: '/locations/banashankari', name: 'Haldi decoration near Banashankari' },
    { href: '/locations/basavanagudi', name: 'Celebrations in Basavanagudi' },
    { href: '/locations/vijayanagar', name: 'Vijayanagar event décor' },
    { href: '/locations/malleshwaram', name: 'Haldi decoration across Malleshwaram' },
    { href: '/locations/uttarahalli', name: 'Uttarahalli haldi decoration' },
    { href: '/locations/gottigere', name: 'Gottigere haldi backdrops' },
    { href: '/locations/hanumanthanagar', name: 'Hanumanthanagar home haldi' },
    { href: '/locations/thyagarajanagar', name: 'Thyagarajanagar haldi setups' },
    { href: '/locations/katriguppe', name: 'Katriguppe ceremony décor' },
  ],
  '/services/engagement-decoration': [
    { href: '/locations/indiranagar', name: 'Engagement decoration in Indiranagar' },
    { href: '/locations/koramangala', name: 'Koramangala engagement decoration' },
    { href: '/locations/whitefield', name: 'Engagement decoration near Whitefield' },
    { href: '/locations/hsr-layout', name: 'Celebrations in HSR Layout' },
    { href: '/locations/ulsoor', name: 'Ulsoor event décor' },
    { href: '/locations/richmond-town', name: 'Engagement decoration across Richmond Town' },
    { href: '/locations/isro-layout', name: 'ISRO Layout engagement décor' },
    { href: '/locations/girinagar', name: 'Girinagar ring ceremony setups' },
    { href: '/locations/hanumanthanagar', name: 'Hanumanthanagar engagement stages' },
    { href: '/locations/kumaraswamy-layout', name: 'Kumaraswamy Layout celebrations' },
  ],
  '/services/corporate-decoration': [
    { href: '/locations/whitefield', name: 'Corporate decoration in Whitefield' },
    { href: '/locations/electronic-city', name: 'Electronic City corporate decoration' },
    { href: '/locations/bellandur', name: 'Corporate decoration near Bellandur' },
    { href: '/locations/marathahalli', name: 'Celebrations in Marathahalli' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road event décor' },
    { href: '/locations/hebbal', name: 'Corporate decoration across Hebbal' },
    { href: '/locations/peenya', name: 'Planning in Peenya' },
    { href: '/locations/shanti-nagar', name: 'Shanti Nagar hotel events' },
    { href: '/locations/wilson-garden', name: 'Wilson Garden corporate décor' },
    { href: '/locations/bilekahalli', name: 'Bilekahalli office events' },
  ],
  '/services/room-decoration': [
    { href: '/locations/koramangala', name: 'Room decoration in Koramangala' },
    { href: '/locations/indiranagar', name: 'Indiranagar room decoration' },
    { href: '/locations/hsr-layout', name: 'Room decoration near HSR Layout' },
    { href: '/locations/jayanagar', name: 'Celebrations in Jayanagar' },
    { href: '/locations/btm-layout', name: 'BTM Layout event décor' },
    { href: '/locations/rajajinagar', name: 'Room decoration across Rajajinagar' },
    { href: '/locations/puttenahalli', name: 'Puttenahalli surprise room décor' },
    { href: '/locations/arekere', name: 'Arekere home surprises' },
    { href: '/locations/begur', name: 'Begur apartment room setups' },
    { href: '/locations/konanakunte', name: 'Konanakunte room decoration' },
  ],
  '/services/tent-balloon-setup': [
    { href: '/locations/sarjapur-road', name: 'Tent & balloon decoration in Sarjapur Road' },
    { href: '/locations/electronic-city', name: 'Electronic City tent & balloon decoration' },
    { href: '/locations/yelahanka', name: 'Tent & balloon decoration near Yelahanka' },
    { href: '/locations/bannerghatta-road', name: 'Celebrations in Bannerghatta Road' },
    { href: '/locations/hebbal', name: 'Hebbal event décor' },
    { href: '/locations/rt-nagar', name: 'Tent & balloon decoration across RT Nagar' },
    { href: '/locations/kanakapura-road', name: 'Planning in Kanakapura Road' },
    { href: '/locations/gottigere', name: 'Gottigere terrace canopy setups' },
    { href: '/locations/hulimavu', name: 'Hulimavu tent & balloon décor' },
    { href: '/locations/begur', name: 'Begur outdoor balloon setups' },
  ],
  '/services/balloon-decoration': [
    { href: '/locations/hsr-layout', name: 'Balloon decoration in HSR Layout' },
    { href: '/locations/btm-layout', name: 'BTM Layout balloon decoration' },
    { href: '/locations/marathahalli', name: 'Balloon decoration near Marathahalli' },
    { href: '/locations/jp-nagar', name: 'Celebrations in JP Nagar' },
    { href: '/locations/yeshwanthpur', name: 'Yeshwanthpur event décor' },
    { href: '/locations/bilekahalli', name: 'Bilekahalli balloon arches' },
    { href: '/locations/arekere', name: 'Arekere balloon decoration' },
    { href: '/locations/hulimavu', name: 'Hulimavu clubhouse balloons' },
    { href: '/locations/begur', name: 'Begur party balloon setups' },
    { href: '/locations/kumaraswamy-layout', name: 'Kumaraswamy Layout balloon décor' },
  ],
  '/services/baby-shower-decoration': [
    { href: '/locations/hsr-layout', name: 'Baby shower decoration in HSR Layout' },
    { href: '/locations/jayanagar', name: 'Jayanagar baby shower decoration' },
    { href: '/locations/indiranagar', name: 'Baby shower decoration near Indiranagar' },
    { href: '/locations/sahakarnagar', name: 'Celebrations in Sahakarnagar' },
    { href: '/locations/malleshwaram', name: 'Malleshwaram event décor' },
    { href: '/locations/banashankari', name: 'Baby shower decoration across Banashankari' },
    { href: '/locations/wilson-garden', name: 'Wilson Garden naming & baby showers' },
    { href: '/locations/padmanabhanagar', name: 'Padmanabhanagar seemantham décor' },
    { href: '/locations/girinagar', name: 'Girinagar baby shower setups' },
    { href: '/locations/nagarbhavi', name: 'Nagarbhavi cradle & shower décor' },
  ],
  '/services/floral-decoration': [
    { href: '/locations/jayanagar', name: 'Floral decoration in Jayanagar' },
    { href: '/locations/basavanagudi', name: 'Basavanagudi floral decoration' },
    { href: '/locations/indiranagar', name: 'Floral decoration near Indiranagar' },
    { href: '/locations/malleshwaram', name: 'Celebrations in Malleshwaram' },
    { href: '/locations/richmond-town', name: 'Richmond Town event décor' },
    { href: '/locations/chamrajpet', name: 'Chamrajpet fresh flower décor' },
    { href: '/locations/thyagarajanagar', name: 'Thyagarajanagar floral backdrops' },
    { href: '/locations/katriguppe', name: 'Katriguppe temple-side florals' },
    { href: '/locations/hanumanthanagar', name: 'Hanumanthanagar flower decoration' },
  ],
  '/services/anniversary-decoration': [
    { href: '/locations/koramangala', name: 'Anniversary decoration in Koramangala' },
    { href: '/locations/richmond-town', name: 'Richmond Town anniversary decoration' },
    { href: '/locations/ulsoor', name: 'Anniversary decoration near Ulsoor' },
    { href: '/locations/rajajinagar', name: 'Celebrations in Rajajinagar' },
    { href: '/locations/hebbal', name: 'Hebbal event décor' },
    { href: '/locations/puttenahalli', name: 'Puttenahalli anniversary setups' },
    { href: '/locations/isro-layout', name: 'ISRO Layout milestone dinners' },
    { href: '/locations/wilson-garden', name: 'Wilson Garden anniversary décor' },
    { href: '/locations/shanti-nagar', name: 'Shanti Nagar celebration styling' },
  ],
  '/services/proposal-decoration': [
    { href: '/locations/koramangala', name: 'Proposal decoration in Koramangala' },
    { href: '/locations/ulsoor', name: 'Ulsoor proposal decoration' },
    { href: '/locations/richmond-town', name: 'Proposal decoration near Richmond Town' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
    { href: '/locations/domlur', name: 'Domlur event décor' },
    { href: '/locations/bellandur', name: 'Proposal decoration across Bellandur' },
    { href: '/locations/bilekahalli', name: 'Bilekahalli surprise proposals' },
    { href: '/locations/shanti-nagar', name: 'Shanti Nagar rooftop proposals' },
    { href: '/locations/konanakunte', name: 'Konanakunte romantic setups' },
  ],
  '/services/nikah-decoration': [
    { href: '/locations/basavanagudi', name: 'Nikah decoration in Basavanagudi' },
    { href: '/locations/ashok-nagar', name: 'Ashok Nagar nikah decoration' },
    { href: '/locations/malleshwaram', name: 'Nikah decoration near Malleshwaram' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
    { href: '/locations/banashankari', name: 'Banashankari event décor' },
    { href: '/locations/chamrajpet', name: 'Chamrajpet nikah stages' },
    { href: '/locations/shanti-nagar', name: 'Shanti Nagar nikah decoration' },
    { href: '/locations/wilson-garden', name: 'Wilson Garden ceremony setups' },
    { href: '/locations/kumaraswamy-layout', name: 'Kumaraswamy Layout nikah décor' },
  ],
  '/services/home-decoration': [
    { href: '/locations/jp-nagar', name: 'Home decoration in JP Nagar' },
    { href: '/locations/yelahanka', name: 'Yelahanka home decoration' },
    { href: '/locations/rt-nagar', name: 'Home decoration near RT Nagar' },
    { href: '/locations/vijayanagar', name: 'Celebrations in Vijayanagar' },
    { href: '/locations/uttarahalli', name: 'Uttarahalli home celebrations' },
    { href: '/locations/vasanthapura', name: 'Vasanthapura housewarming décor' },
    { href: '/locations/konanakunte', name: 'Konanakunte home event styling' },
    { href: '/locations/padmanabhanagar', name: 'Padmanabhanagar home pujas' },
    { href: '/locations/girinagar', name: 'Girinagar residence decoration' },
    { href: '/locations/thyagarajanagar', name: 'Thyagarajanagar home rituals' },
  ],
  '/services/terrace-decoration': [
    { href: '/locations/bellandur', name: 'Terrace decoration in Bellandur' },
    { href: '/locations/domlur', name: 'Domlur terrace decoration' },
    { href: '/locations/marathahalli', name: 'Terrace decoration near Marathahalli' },
    { href: '/locations/btm-layout', name: 'Celebrations in BTM Layout' },
    { href: '/locations/isro-layout', name: 'ISRO Layout rooftop setups' },
    { href: '/locations/gottigere', name: 'Gottigere terrace parties' },
    { href: '/locations/uttarahalli', name: 'Uttarahalli rooftop haldi' },
    { href: '/locations/vasanthapura', name: 'Vasanthapura terrace dinners' },
    { href: '/locations/katriguppe', name: 'Katriguppe rooftop celebrations' },
  ],
  '/services/car-decoration': [
    { href: '/locations/rajajinagar', name: 'Car decoration in Rajajinagar' },
    { href: '/locations/yelahanka', name: 'Yelahanka car decoration' },
    { href: '/locations/mathikere', name: 'Car decoration near Mathikere' },
    { href: '/locations/peenya', name: 'Celebrations in Peenya' },
    { href: '/locations/rt-nagar', name: 'RT Nagar event décor' },
    { href: '/locations/sahakarnagar', name: 'Car decoration across Sahakarnagar' },
    { href: '/locations/sarjapur-road', name: 'Planning in Sarjapur Road' },
    { href: '/locations/nagarbhavi', name: 'Nagarbhavi wedding car styling' },
    { href: '/locations/chamrajpet', name: 'Chamrajpet bridal car florals' },
    { href: '/locations/yeshwanthpur', name: 'Yeshwanthpur celebration décor' },
  ],
  '/services/naming-ceremony-decoration': [
    { href: '/locations/hsr-layout', name: 'Naming ceremony in HSR Layout' },
    { href: '/locations/jayanagar', name: 'Jayanagar cradle decoration' },
    { href: '/locations/jp-nagar', name: 'JP Nagar naming ceremony décor' },
    { href: '/locations/btm-layout', name: 'BTM Layout Namakarana setup' },
    { href: '/locations/marathahalli', name: 'Marathahalli cradle florals' },
    { href: '/locations/bellandur', name: 'Bellandur naming ceremony' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road baby welcome' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
  ],
  '/services/reception-decoration': [
    { href: '/locations/malleshwaram', name: 'Reception stage in Malleshwaram' },
    { href: '/locations/nagarbhavi', name: 'Nagarbhavi reception décor' },
    { href: '/locations/indiranagar', name: 'Indiranagar banquet stages' },
    { href: '/locations/whitefield', name: 'Whitefield reception florals' },
    { href: '/locations/jp-nagar', name: 'JP Nagar wedding receptions' },
    { href: '/locations/marathahalli', name: 'Marathahalli banquet décor' },
    { href: '/locations/bellandur', name: 'Bellandur reception setups' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
  ],
  '/services/roka-decoration': [
    { href: '/locations/koramangala', name: 'Roka decoration in Koramangala' },
    { href: '/locations/indiranagar', name: 'Indiranagar Baat Pakki décor' },
    { href: '/locations/hsr-layout', name: 'HSR Layout home Roka setup' },
    { href: '/locations/whitefield', name: 'Whitefield Roka backdrop' },
    { href: '/locations/jp-nagar', name: 'JP Nagar intimate Roka' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road apartment Roka' },
    { href: '/locations/bellandur', name: 'Bellandur Roka florals' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
  ],
  '/services/valima-decoration': [
    { href: '/locations/shanti-nagar', name: 'Valima stage in Shanti Nagar' },
    { href: '/locations/richmond-town', name: 'Richmond Town Walima décor' },
    { href: '/locations/ashok-nagar', name: 'Ashok Nagar Shukrana setup' },
    { href: '/locations/rt-nagar', name: 'RT Nagar Walima reception' },
    { href: '/locations/chamrajpet', name: 'Chamrajpet Shadi Mahal décor' },
    { href: '/locations/btm-layout', name: 'BTM Layout Valima stages' },
    { href: '/locations/wilson-garden', name: 'Wilson Garden Shukrana florals' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
  ],
  '/services/mehndi-decoration': [
    { href: '/locations/indiranagar', name: 'Mehndi decoration in Indiranagar' },
    { href: '/locations/koramangala', name: 'Koramangala Mehndi setups' },
    { href: '/locations/hsr-layout', name: 'HSR Layout terrace Mehndi' },
    { href: '/locations/jayanagar', name: 'Jayanagar Mehndi florals' },
    { href: '/locations/jp-nagar', name: 'JP Nagar Mehndi canopies' },
    { href: '/locations/whitefield', name: 'Whitefield Mehndi & Sangeet' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
  ],
  '/services/bridal-shower-decoration': [
    { href: '/locations/ulsoor', name: 'Bridal shower in Ulsoor' },
    { href: '/locations/indiranagar', name: 'Indiranagar Bride-to-Be setups' },
    { href: '/locations/koramangala', name: 'Koramangala bridal showers' },
    { href: '/locations/bellandur', name: 'Bellandur bachelorette rooms' },
    { href: '/locations/marathahalli', name: 'Marathahalli bridal surprises' },
    { href: '/locations/whitefield', name: 'Whitefield hotel suite decor' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
  ],
  '/services/housewarming-decoration': [
    { href: '/locations/whitefield', name: 'Griha Pravesh in Whitefield' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road housewarming' },
    { href: '/locations/electronic-city', name: 'Electronic City Griha Pravesh' },
    { href: '/locations/yelahanka', name: 'Yelahanka housewarming florals' },
    { href: '/locations/jp-nagar', name: 'JP Nagar Griha Pravesh' },
    { href: '/locations/marathahalli', name: 'Marathahalli home pujas' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
  ],
  '/services/baat-pakki-decoration': [
    { href: '/locations/hsr-layout', name: 'Baat Pakki in HSR Layout' },
    { href: '/locations/koramangala', name: 'Koramangala Baat Pakki setups' },
    { href: '/locations/indiranagar', name: 'Indiranagar home ceremonies' },
    { href: '/locations/jayanagar', name: 'Jayanagar family setups' },
    { href: '/locations/whitefield', name: 'Whitefield home Baat Pakki' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road apartment decor' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
  ],
  '/services/shukrana-decoration': [
    { href: '/locations/shanti-nagar', name: 'Shukrana setup in Shanti Nagar' },
    { href: '/locations/richmond-town', name: 'Richmond Town Shukrana' },
    { href: '/locations/rt-nagar', name: 'RT Nagar home prayer decor' },
    { href: '/locations/chamrajpet', name: 'Chamrajpet Shukrana florals' },
    { href: '/locations/bangalore', name: 'Celebrations in Bangalore' },
    { href: '/locations/btm-layout', name: 'BTM Layout Shukrana florals' },
    { href: '/locations/wilson-garden', name: 'Wilson Garden family setups' },
    { href: '/locations/ashok-nagar', name: 'Ashok Nagar Shukrana decor' },
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
    { href: '/locations/hanumanthanagar', name: 'Hanumanthanagar celebrations' },
    { href: '/locations/puttenahalli', name: 'Décor in Puttenahalli' },
    { href: '/locations/wilson-garden', name: 'Wilson Garden events' },
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
    { href: '/locations/thyagarajanagar', name: 'Thyagarajanagar decorations' },
    { href: '/locations/isro-layout', name: 'Events around ISRO Layout' },
    { href: '/locations/shanti-nagar', name: 'Celebrate in Shanti Nagar' },
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
    { href: '/locations/chamrajpet', name: 'Chamrajpet setups' },
    { href: '/locations/bilekahalli', name: 'Parties in Bilekahalli' },
    { href: '/locations/girinagar', name: 'Décor in Girinagar' },
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
    { href: '/locations/arekere', name: 'Arekere events' },
    { href: '/locations/kumaraswamy-layout', name: 'Celebrate in Kumaraswamy Layout' },
    { href: '/locations/padmanabhanagar', name: 'Padmanabhanagar decorations' },
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
    { href: '/locations/katriguppe', name: 'Events around Katriguppe' },
    { href: '/locations/hulimavu', name: 'Hulimavu setups' },
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
    { href: '/locations/konanakunte', name: 'Parties in Konanakunte' },
    { href: '/locations/uttarahalli', name: 'Décor in Uttarahalli' },
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
    { href: '/locations/vasanthapura', name: 'Vasanthapura events' },
    { href: '/locations/gottigere', name: 'Celebrate in Gottigere' },
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
    { href: '/locations/begur', name: 'Begur decorations' },
    { href: '/locations/nagarbhavi', name: 'Events around Nagarbhavi' },
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
