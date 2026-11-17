/**
 * Single source of truth for public pricing copy and starting amounts.
 * Import from here only — do not hardcode ₹ amounts or fixed-bundle language elsewhere.
 */

export const CAR_START_INR = 2500;
export const BALLOON_START_INR = 3000;
export const FLORAL_START_INR = 5000;

export const PRICING_BALLOON_LINE = 'Balloon Decorations starts from ₹3,000.';
export const PRICING_FLORAL_LINE = 'Floral Decorations starts from ₹5,000.';
export const PRICING_CUSTOMIZED_LINE =
  'Pricing is customized based on venue, decoration style, event size, materials, and customer requirements.';

/** Full three-line pricing statement for FAQs, metas, and long-form copy. */
export const PRICING_SUMMARY = `${PRICING_BALLOON_LINE} ${PRICING_FLORAL_LINE} ${PRICING_CUSTOMIZED_LINE}`;

/** Lowest public starting price (balloon) — used for generic Service Offer JSON-LD. */
export const SERVICE_STARTING_PRICE_INR = BALLOON_START_INR;

export type PricingCategory =
  | 'Weddings & Ceremonies'
  | 'Family Celebrations'
  | 'Birthdays, Balloons & Surprises'
  | 'Car & Corporate';

export const PRICING_CATEGORIES: readonly PricingCategory[] = [
  'Weddings & Ceremonies',
  'Family Celebrations',
  'Birthdays, Balloons & Surprises',
  'Car & Corporate',
];

export type PricingPackage = {
  slug: string;
  name: string;
  category: PricingCategory;
  priceFrom: 2500 | 3000 | 5000;
  description: string;
  servicePageHref: string;
};

/**
 * Complete catalog of verified starting prices rendered on /pricing and OfferCatalog.
 * Every service page and JSON-LD Offer reads from here so prices live in one place.
 */
export const PRICING_PACKAGES: readonly PricingPackage[] = [
  {
    slug: 'wedding-setup',
    name: 'Wedding Stage & Mandap Setup',
    category: 'Weddings & Ceremonies',
    priceFrom: FLORAL_START_INR,
    description:
      'Custom mandap florals, reception backdrops, warm lighting, and venue-safe stage installations.',
    servicePageHref: '/services/wedding-setup',
  },
  {
    slug: 'reception-decoration',
    name: 'Wedding Reception Stage Decoration',
    category: 'Weddings & Ceremonies',
    priceFrom: FLORAL_START_INR,
    description:
      'Wide-frame couple stages, cascading floral arches, 3200K portrait lighting, and banquet entrance styling.',
    servicePageHref: '/services/reception-decoration',
  },
  {
    slug: 'engagement-decoration',
    name: 'Engagement & Ring Ceremony Decoration',
    category: 'Weddings & Ceremonies',
    priceFrom: FLORAL_START_INR,
    description:
      'Floral ring-exchange backdrops, couple seating frames, and warm ambient lighting for homes and halls.',
    servicePageHref: '/services/engagement-decoration',
  },
  {
    slug: 'roka-decoration',
    name: 'Roka Ceremony Decoration',
    category: 'Weddings & Ceremonies',
    priceFrom: FLORAL_START_INR,
    description:
      'Apartment-friendly floral rings, ivory drapes, and shagun corner styling for intimate home ceremonies.',
    servicePageHref: '/services/roka-decoration',
  },
  {
    slug: 'baat-pakki-decoration',
    name: 'Baat Pakki & Mangni Decoration',
    category: 'Weddings & Ceremonies',
    priceFrom: FLORAL_START_INR,
    description:
      'Compact living-room sofa backdrops, brass urlis, and platter table accents for formal family alliances.',
    servicePageHref: '/services/baat-pakki-decoration',
  },
  {
    slug: 'haldi-decoration',
    name: 'Home Haldi Decoration',
    category: 'Weddings & Ceremonies',
    priceFrom: FLORAL_START_INR,
    description:
      'Fresh marigold backdrops, brass urlis, and turmeric-safe floor protection for homes, terraces, and lawns.',
    servicePageHref: '/services/haldi-decoration',
  },
  {
    slug: 'mehndi-decoration',
    name: 'Mehendi & Sangeet Decoration',
    category: 'Weddings & Ceremonies',
    priceFrom: FLORAL_START_INR,
    description:
      'Vibrant Rajasthani drapes, marigold canopies, and seating backdrops tailored for bride and artist comfort.',
    servicePageHref: '/services/mehndi-decoration',
  },
  {
    slug: 'nikah-decoration',
    name: 'Nikah & Walima Decoration',
    category: 'Weddings & Ceremonies',
    priceFrom: FLORAL_START_INR,
    description:
      'Dignified floral backdrops, Aqd signing table setups, and parda-friendly layouts for homes and Shadi Mahals.',
    servicePageHref: '/services/nikah-decoration',
  },
  {
    slug: 'valima-decoration',
    name: 'Valima & Walima Stage Decoration',
    category: 'Weddings & Ceremonies',
    priceFrom: FLORAL_START_INR,
    description:
      'Grand evening banquet stage frames, crystal chandeliers, and fresh rose-and-hydrangea arrangements.',
    servicePageHref: '/services/valima-decoration',
  },
  {
    slug: 'shukrana-decoration',
    name: 'Shukrana Ceremony Decoration',
    category: 'Weddings & Ceremonies',
    priceFrom: FLORAL_START_INR,
    description:
      'Serene ivory backdrops, fragrant jasmine strands, and brass urlis for home prayer and thanksgiving dinners.',
    servicePageHref: '/services/shukrana-decoration',
  },
  {
    slug: 'floral-decoration',
    name: 'Fresh Floral Stage Decoration',
    category: 'Weddings & Ceremonies',
    priceFrom: FLORAL_START_INR,
    description:
      'Bespoke fresh flower walls, entrance torans, mandap garlands, and botanical arches across Bengaluru.',
    servicePageHref: '/services/floral-decoration',
  },
  {
    slug: 'baby-shower-decoration',
    name: 'Baby Shower & Seemantham Decoration',
    category: 'Family Celebrations',
    priceFrom: FLORAL_START_INR,
    description:
      'Traditional Seemantham and Godh Bharai floral backdrops, blessing chair nooks, and pastel photo frames.',
    servicePageHref: '/services/baby-shower-decoration',
  },
  {
    slug: 'naming-ceremony-decoration',
    name: 'Naming Ceremony (Namakarana) Decoration',
    category: 'Family Celebrations',
    priceFrom: FLORAL_START_INR,
    description:
      'Fresh floral cradle (thottil) styling, custom baby name signage, and apartment-safe backdrop frames.',
    servicePageHref: '/services/naming-ceremony-decoration',
  },
  {
    slug: 'housewarming-decoration',
    name: 'Housewarming (Gruhapravesha) Decoration',
    category: 'Family Celebrations',
    priceFrom: FLORAL_START_INR,
    description:
      'Traditional mango-leaf and marigold doorway torans, staircase garlands, and puja room backdrops.',
    servicePageHref: '/services/housewarming-decoration',
  },
  {
    slug: 'home-decoration',
    name: 'Home Event Decoration',
    category: 'Family Celebrations',
    priceFrom: BALLOON_START_INR,
    description:
      'Living-room and terrace setups scaled for 2BHK/3BHK apartments and villas with zero wall damage.',
    servicePageHref: '/services/home-decoration',
  },
  {
    slug: 'birthday-decoration',
    name: 'Birthday Decoration at Home',
    category: 'Birthdays, Balloons & Surprises',
    priceFrom: BALLOON_START_INR,
    description:
      'Organic balloon garlands, kids character themes, adult milestone backdrops, and cake-table styling.',
    servicePageHref: '/services/birthday-decoration',
  },
  {
    slug: 'balloon-decoration',
    name: 'Balloon Arch & Backdrop Decoration',
    category: 'Birthdays, Balloons & Surprises',
    priceFrom: BALLOON_START_INR,
    description:
      'Pastel and chrome organic balloon arches, ring frames, and freestanding photo zones for homes and clubhouses.',
    servicePageHref: '/services/balloon-decoration',
  },
  {
    slug: 'tent-balloon-setup',
    name: 'Cabana Tent & Balloon Decoration',
    category: 'Birthdays, Balloons & Surprises',
    priceFrom: FLORAL_START_INR,
    description:
      'Fabric cabana drapes, fairy-lit canopies, and balloon styling for lawns, terraces, and outdoor parties.',
    servicePageHref: '/services/tent-balloon-setup',
  },
  {
    slug: 'anniversary-decoration',
    name: 'Anniversary Decoration',
    category: 'Birthdays, Balloons & Surprises',
    priceFrom: FLORAL_START_INR,
    description:
      'Romantic rose-and-candlelight room reveals, metallic balloon backdrops, and intimate dinner table styling.',
    servicePageHref: '/services/anniversary-decoration',
  },
  {
    slug: 'proposal-decoration',
    name: 'Romantic Proposal Decoration',
    category: 'Birthdays, Balloons & Surprises',
    priceFrom: FLORAL_START_INR,
    description:
      'Marry Me neon backdrops, floral heart arches, candlelit pathways, and private rooftop or room setups.',
    servicePageHref: '/services/proposal-decoration',
  },
  {
    slug: 'bridal-shower-decoration',
    name: 'Bridal Shower & Bride-to-Be Decoration',
    category: 'Birthdays, Balloons & Surprises',
    priceFrom: FLORAL_START_INR,
    description:
      'Bride-to-Be neon signs, champagne-and-blush balloon rings, and dessert table styling for homes and hotels.',
    servicePageHref: '/services/bridal-shower-decoration',
  },
  {
    slug: 'room-decoration',
    name: 'Bridal Room & First Night Decoration',
    category: 'Birthdays, Balloons & Surprises',
    priceFrom: FLORAL_START_INR,
    description:
      'Fresh rose petal canopies, warm fairy lights, and discreet surprise bedroom setups.',
    servicePageHref: '/services/room-decoration',
  },
  {
    slug: 'terrace-decoration',
    name: 'Terrace & Rooftop Party Decoration',
    category: 'Birthdays, Balloons & Surprises',
    priceFrom: FLORAL_START_INR,
    description:
      'Weather-aware fairy-light canopies, lounge corners, and focal backdrops for private rooftops.',
    servicePageHref: '/services/terrace-decoration',
  },
  {
    slug: 'car-decoration',
    name: 'Car Decoration (Wedding Car)',
    category: 'Car & Corporate',
    priceFrom: CAR_START_INR,
    description:
      'Paint-safe fresh rose, orchid, and ribbon bonnet arrangements installed at your doorstep.',
    servicePageHref: '/services/car-decoration',
  },
  {
    slug: 'corporate-decoration',
    name: 'Corporate Event Decoration',
    category: 'Car & Corporate',
    priceFrom: FLORAL_START_INR,
    description:
      'Brand-colour balloon arches, stage backdrops, office festival decor, and GST-invoiced installations.',
    servicePageHref: '/services/corporate-decoration',
  },
];

export const PRICING_FACTORS: readonly string[] = [
  'Size of the setup — a single living-room focal backdrop requires fewer structures and stems than a wide banquet stage with entrance and aisle styling.',
  'Fresh vs artificial flowers — dense fresh rose, orchid, hydrangea, or jasmine work varies with seasonal market supply and stem count.',
  'Venue type (home, hall, terrace) — ceiling height, lift access, outdoor weighting for wind, and society or hotel setup windows shape installation scope.',
  'Extra add-ons — couple sofas, neon signage, cake pedestals, welcome easels, and additional photo corners are quoted only when selected.',
  'Travel & timing within Bangalore — early-morning muhurat setups, late-night banquet teardowns, and cross-city logistics are factored transparently.',
];

export const PRICING_FAQS: readonly { question: string; answer: string }[] = [
  {
    question: 'How much does wedding stage decoration cost in Bangalore?',
    answer:
      'Wedding stage and mandap decoration in Bangalore starts from ₹5,000 for intimate ceremonies. The final quote depends on stage width, fresh flower density, lighting, and whether entrance arches or couple seating are included. We offer a free site visit before quoting.',
  },
  {
    question: 'What is the price of engagement decoration?',
    answer:
      'Engagement, Roka, and ring ceremony decoration starts from ₹5,000 across Bangalore homes, clubhouses, and banquet halls. Compact living-room backdrops sit near the starting floor, while wider banquet stages with fresh florals and lighting are custom quoted.',
  },
  {
    question: 'How much does birthday decoration at home cost?',
    answer:
      'Birthday decoration at home in Bangalore starts from ₹3,000, covering an apartment-safe balloon garland or ring backdrop and cake-table styling. Custom character cutouts, neon signs, shimmer walls, and additional zones can be added based on your room size.',
  },
  {
    question: 'How much is wedding car decoration?',
    answer:
      'Wedding car decoration starts from ₹2,500 across Bangalore using paint-safe ribbons, floral clusters, and hood styling. Full fresh-rose or orchid coverage across the bonnet, roof, and doors is quoted based on the floral design you pick.',
  },
  {
    question: 'Do you offer budget decoration packages?',
    answer:
      'Yes. Our packages start at ₹2,500 for wedding car decor, ₹3,000 for home birthdays and balloon setups, and ₹5,000 for haldi, engagement, wedding, baby shower, and all other events, and we customise every setup to fit your exact space and budget.',
  },
];

const PACKAGE_BY_SLUG = new Map(PRICING_PACKAGES.map((pkg) => [pkg.slug, pkg]));

const EXTRA_STARTING_PRICE_BY_SLUG: Record<string, number> = {
  'birthday-home-decoration': BALLOON_START_INR,
  'haldi-backdrop-decor': FLORAL_START_INR,
  'wedding-stage-decor': FLORAL_START_INR,
};

/** Returns the verified starting INR amount for any decoration service slug. */
export function getStartingPriceForServiceSlug(slug: string): number {
  return (
    PACKAGE_BY_SLUG.get(slug)?.priceFrom ?? EXTRA_STARTING_PRICE_BY_SLUG[slug] ?? FLORAL_START_INR
  );
}

/**
 * Legacy summary categories kept for compatibility with shared copy modules.
 * Not fixed bundles — guidance floors plus customized quotes.
 */
export const PRICING_TIERS = [
  {
    name: 'Balloon Decorations',
    lowPrice: BALLOON_START_INR,
    priceLabel: '₹3,000+',
    description: PRICING_BALLOON_LINE,
    features: [
      'Arches, garlands, and photo corners',
      'Apartment- and clubhouse-friendly layouts',
      'Colours matched to your brief',
    ],
  },
  {
    name: 'Floral Decorations',
    lowPrice: FLORAL_START_INR,
    priceLabel: '₹5,000+',
    description: PRICING_FLORAL_LINE,
    features: [
      'Fresh or mixed floral treatments',
      'Entrances, stages, and table accents',
      'Seasonal stems selected for the venue',
    ],
    featured: true,
  },
  {
    name: 'Custom event décor',
    lowPrice: BALLOON_START_INR,
    priceLabel: 'Custom quote',
    description: PRICING_CUSTOMIZED_LINE,
    features: [
      'Weddings, haldi, engagements, and more',
      'Scoped after venue and materials review',
      'Written quote before you confirm',
    ],
  },
] as const;

/** Short CTA line for homepage / explore links. */
export const PRICING_CTA_SHORT = 'Balloon décor from ₹3,000 · Floral from ₹5,000';
