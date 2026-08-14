import { SITE_URL, SITE_EMAIL } from '@/lib/site';
import { CONTACT } from '@/lib/contact';
import { absoluteUrl } from '@/lib/metadata';
import { LOGO_SRC, HERO_BANNER_SRC } from '@/lib/images';

/** Stable @id anchors for JSON-LD graph linking */
export const SCHEMA_IDS = {
  /** Single business entity. LocalBusiness is an Organization subtype. */
  localBusiness: `${SITE_URL}/#localbusiness`,
  /** Alias of localBusiness — no separate parent company exists. */
  organization: `${SITE_URL}/#localbusiness`,
  website: `${SITE_URL}/#website`,
  serviceCatalog: `${SITE_URL}/#service-catalog`,
} as const;

/** NAP — keep identical across site, schema, and Google Business Profile */
export const NAP = {
  name: 'We Decor Events',
  alternateName: ['We Decor', 'We Decor - Event Planner & Decorator in Bangalore'],
  description:
    'Professional event decoration services in Bengaluru (Bangalore), Karnataka — weddings, birthdays, haldi, proposals, balloon decor, and themed celebrations.',
  url: SITE_URL,
  email: SITE_EMAIL,
  telephone: CONTACT.PRIMARY_NUMBER,
  telephoneDisplay: CONTACT.displayNumbers[0],
  secondaryTelephone: CONTACT.SECONDARY_NUMBER,
  streetAddress: 'Royal Manor, Ranoji Rao Road, Basavanagudi',
  addressLocality: 'Bengaluru',
  addressRegion: 'Karnataka',
  postalCode: '560004',
  addressCountry: 'IN',
  logo: absoluteUrl(LOGO_SRC),
  image: absoluteUrl(HERO_BANNER_SRC),
  /** ISO 8601 year-month (GBP: opened June 2022). */
  foundingDate: '2022-06',
} as const;

export const GEO = {
  city: 'Bengaluru',
  cityAlternate: 'Bangalore',
  region: 'Karnataka',
  regionCode: 'IN-KA',
  country: 'IN',
  countryName: 'India',
  // GBP pin for Royal Manor, Ranoji Rao Road, Basavanagudi — do not edit without checking the live Google Business Profile.
  latitude: 12.941671,
  longitude: 77.578531,
} as const;

/** Canonical social & entity URLs — align with live profiles */
export const SOCIAL_PROFILES = {
  instagram: 'https://www.instagram.com/wedecorbangalore/',
  facebook: 'https://www.facebook.com/we.decor.events/',
  googleMaps: (placeId?: string) =>
    placeId ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : undefined,
} as const;

export function getSameAsLinks(): string[] {
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim();
  const links: string[] = [SOCIAL_PROFILES.instagram, SOCIAL_PROFILES.facebook];
  const maps = SOCIAL_PROFILES.googleMaps(placeId);
  if (maps) links.push(maps);
  return links;
}

/** Core decoration services for Service + Offer schema */
export const CORE_DECORATION_SERVICES = [
  {
    id: 'wedding-decoration',
    name: 'Wedding Decoration',
    serviceType: 'Wedding decoration',
    description:
      'Complete wedding and reception decor in Bengaluru — mandap, stage, floral, and venue styling.',
    path: '/services/wedding-setup',
  },
  {
    id: 'birthday-decoration',
    name: 'Birthday Decoration',
    serviceType: 'Birthday decoration',
    description:
      'Creative birthday party decoration at homes, apartments, and clubhouses across Bangalore.',
    path: '/services/birthday-decoration',
  },
  {
    id: 'balloon-decoration',
    name: 'Balloon Decoration',
    serviceType: 'Balloon decoration',
    description:
      'Balloon arches, backdrops, and themed balloon decor for celebrations in Bengaluru.',
    path: '/services/balloon-decoration',
  },
  {
    id: 'proposal-decoration',
    name: 'Proposal Decoration',
    serviceType: 'Proposal decoration',
    description: 'Romantic proposal and engagement setups with lights, florals, and custom themes.',
    path: '/services/proposal-decoration',
  },
  {
    id: 'haldi-decoration',
    name: 'Haldi Decoration',
    serviceType: 'Haldi decoration',
    description:
      'Traditional and contemporary haldi ceremony decor with marigold, yellow themes, and backdrops.',
    path: '/services/haldi-decoration',
  },
  {
    id: 'bridal-room-decoration',
    name: 'Bridal Room Decoration',
    serviceType: 'Bridal room decoration',
    description:
      'Elegant bridal room and pre-wedding room decor with flowers, drapes, and ambient lighting.',
    path: '/services/room-decoration',
  },
  {
    id: 'theme-decoration',
    name: 'Theme Decoration',
    serviceType: 'Theme party decoration',
    description:
      'Custom theme party and event decoration tailored to your venue and occasion in Bangalore.',
    // Catalog-only: no page owns #service-theme-decoration. Do not point path
    // at /services/decoration — that URL is the umbrella #service-decoration.
  },
] as const;

export const OPENING_HOURS = {
  dayOfWeek: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ] as const,
  // Schema.org convention for a 24-hour business (GBP: Open 24 hours).
  opens: '00:00',
  closes: '23:59',
  replyAnytime: 'We reply any time',
  displayHome: `${GEO.city} · We reply any time`,
  displayFooter: `${GEO.cityAlternate} · We reply any time`,
} as const;
