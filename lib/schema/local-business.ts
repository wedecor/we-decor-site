import {
  DEFAULT_GOOGLE_PLACE_ID,
  GEO,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  NAP,
  OPENING_HOURS,
  SCHEMA_IDS,
  SOCIAL_PROFILES,
  getSameAsLinks,
} from '@/lib/local-seo/constants';
import {
  bangaloreAreaServed,
  buildGeoCoordinates,
  buildPostalAddress,
  optionalEmail,
} from './_helpers';
import { buildCoreServiceCatalog } from './service';
import type { JsonLdNode } from './types';
import type { AggregateRatingInput } from './review';

export function buildOpeningHoursSpecification(): JsonLdNode {
  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [...OPENING_HOURS.dayOfWeek],
    opens: OPENING_HOURS.opens,
    closes: OPENING_HOURS.closes,
  };
}

/**
 * LocalBusiness for an event decoration company.
 * AggregateRating defaults to the GBP figures in `GOOGLE_RATING` /
 * `GOOGLE_REVIEW_COUNT`. Pass `aggregateRating: null` to omit, or supply
 * live Places values to override. Never invent individual Review nodes.
 */
export function buildLocalBusiness(options?: {
  locality?: string;
  aggregateRating?: AggregateRatingInput | null;
}): JsonLdNode {
  const locality = options?.locality;
  const node: JsonLdNode = {
    '@type': 'LocalBusiness',
    '@id': SCHEMA_IDS.localBusiness,
    name: NAP.name,
    legalName: NAP.name,
    alternateName: NAP.alternateName,
    description: locality
      ? `Event decoration services in ${locality}, Bengaluru, Karnataka. ${NAP.description}`
      : NAP.description,
    url: NAP.url,
    foundingDate: NAP.foundingDate,
    logo: {
      '@type': 'ImageObject',
      '@id': `${NAP.url}/#logo`,
      url: NAP.logo,
      contentUrl: NAP.logo,
      caption: `${NAP.name} logo`,
    },
    image: {
      '@type': 'ImageObject',
      url: NAP.image,
      contentUrl: NAP.image,
      caption: `${NAP.name} — event decorations in ${GEO.city}`,
    },
    telephone: NAP.telephone,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    address: buildPostalAddress(),
    geo: buildGeoCoordinates(),
    openingHoursSpecification: buildOpeningHoursSpecification(),
    areaServed: bangaloreAreaServed(locality),
    hasMap: SOCIAL_PROFILES.googleMaps(DEFAULT_GOOGLE_PLACE_ID),
    knowsAbout: [
      'Event Decoration in Bangalore',
      'Home Event Decoration in Bangalore',
      'Haldi Decoration in Bangalore',
      'Home Haldi Decoration in Bangalore',
      'Birthday Balloon Decoration in Bangalore',
      'Birthday Decoration at Home in Bangalore',
      'Wedding Stage and Mandap Decoration in Bangalore',
      'Intimate Home Wedding Decoration in Bangalore',
      'Engagement and Ring Ceremony Decoration in Bangalore',
      'Home Engagement Decoration in Bangalore',
      'Baby Shower and Seemantham Decoration in Bangalore',
      'Baby Shower Decoration at Home in Bangalore',
      'Bridal Room and First Night Decoration in Bangalore',
      'Romantic Proposal Decoration in Bangalore',
      'Wedding Car Decoration in Bangalore',
      'Fresh Floral Decoration in Bangalore',
      'Nikah Stage Decoration in Bangalore',
      'Housewarming (Griha Pravesh) Floral Decoration',
      'Apartment Event Decoration in Bangalore',
      'Event Decorators in JP Nagar Bangalore',
      'Event Decorators in Jayanagar Bangalore',
      'Event Decorators in Basavanagudi Bangalore',
      'Event Decorators in Whitefield Bangalore',
      'Event Decorators in HSR Layout Bangalore',
      'Event Decorators in Koramangala Bangalore',
      'Event Decorators in Indiranagar Bangalore',
      'Event Decorators in Banashankari Bangalore',
      'Event Decorators in BTM Layout Bangalore',
      'Event Decorators in Bellandur Bangalore',
      'Event Decorators in Sarjapur Road Bangalore',
      'Event Decorators in Electronic City Bangalore',
      'Event Decorators in Malleshwaram Bangalore',
      'Event Decorators in Rajajinagar Bangalore',
      'Event Decorators in Hebbal Bangalore',
      'Event Decorators in Yelahanka Bangalore',
      'Birthday Decoration in JP Nagar',
      'Haldi Decoration in JP Nagar Bangalore',
      'Wedding Decorators in JP Nagar',
    ],
    sameAs: getSameAsLinks(),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: NAP.telephone,
        ...optionalEmail(NAP.email),
        // Primary CTA and WhatsApp — quotes and bookings.
        contactType: 'sales',
        areaServed: GEO.country,
        availableLanguage: ['English', 'Hindi', 'Kannada'],
      },
      {
        '@type': 'ContactPoint',
        telephone: NAP.secondaryTelephone,
        // Alternate business line listed on the site, not the WhatsApp CTA.
        contactType: 'customer service',
        areaServed: GEO.country,
        availableLanguage: ['English', 'Hindi', 'Kannada'],
      },
    ],
    hasOfferCatalog: buildCoreServiceCatalog(SCHEMA_IDS.serviceCatalog),
  };

  Object.assign(node, optionalEmail(NAP.email));

  const aggregateRating =
    options?.aggregateRating === undefined
      ? { ratingValue: GOOGLE_RATING, reviewCount: GOOGLE_REVIEW_COUNT }
      : options.aggregateRating;

  if (aggregateRating) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating ?? 5,
      worstRating: aggregateRating.worstRating ?? 1,
    };
  }

  return node;
}
