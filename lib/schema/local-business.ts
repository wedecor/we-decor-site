import { GEO, NAP, OPENING_HOURS, SCHEMA_IDS, getSameAsLinks } from '@/lib/local-seo/constants';
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
 * AggregateRating is attached only when real Google Places data is supplied.
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

  if (options?.aggregateRating) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: options.aggregateRating.ratingValue,
      reviewCount: options.aggregateRating.reviewCount,
      bestRating: options.aggregateRating.bestRating ?? 5,
      worstRating: options.aggregateRating.worstRating ?? 1,
    };
  }

  return node;
}
