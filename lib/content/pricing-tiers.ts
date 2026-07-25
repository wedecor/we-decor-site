/**
 * Single source of truth for public pricing copy and starting amounts.
 * Import from here only — do not hardcode ₹ amounts or fixed-bundle language elsewhere.
 */

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

/**
 * Starting points shown on /pricing and OfferCatalog.
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
