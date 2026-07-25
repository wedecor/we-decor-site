import { absoluteUrl } from '@/lib/metadata';
import {
  CORE_DECORATION_SERVICES,
  NAP,
  OPENING_HOURS,
  SCHEMA_IDS,
  getSameAsLinks,
} from '@/lib/local-seo/constants';
import { bangaloreAreaServed, buildGeoCoordinates, buildPostalAddress } from './_helpers';
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
    logo: {
      '@type': 'ImageObject',
      url: NAP.logo,
      contentUrl: NAP.logo,
    },
    image: {
      '@type': 'ImageObject',
      url: NAP.image,
      contentUrl: NAP.image,
    },
    email: NAP.email,
    telephone: NAP.telephone,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: ['Cash', 'Credit Card', 'UPI', 'Bank Transfer'],
    address: buildPostalAddress(),
    geo: buildGeoCoordinates(),
    openingHoursSpecification: buildOpeningHoursSpecification(),
    areaServed: bangaloreAreaServed(locality),
    sameAs: getSameAsLinks(),
    parentOrganization: { '@id': SCHEMA_IDS.organization },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      '@id': SCHEMA_IDS.serviceCatalog,
      name: 'Event Decoration Services in Bengaluru',
      itemListElement: CORE_DECORATION_SERVICES.map((svc, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          '@id': `${NAP.url}/#service-${svc.id}`,
          name: svc.name,
          serviceType: svc.serviceType,
          description: svc.description,
          url: absoluteUrl(svc.path),
          provider: { '@id': SCHEMA_IDS.localBusiness },
          areaServed: bangaloreAreaServed(),
        },
      })),
    },
  };

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
