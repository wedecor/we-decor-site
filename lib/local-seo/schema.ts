import { AREAS } from '@/app/(site)/_data/locations';
import { absoluteUrl } from '@/lib/metadata';
import {
  CORE_DECORATION_SERVICES,
  GEO,
  NAP,
  OPENING_HOURS,
  SCHEMA_IDS,
  getSameAsLinks,
} from './constants';

type FaqInput = { question: string; answer: string };

type FaqInputList = ReadonlyArray<FaqInput>;

function bangaloreAreaServed(extraLocality?: string) {
  const localities = AREAS.slice(0, 20).map((a) => ({
    '@type': 'Place' as const,
    name: `${a.name}, ${GEO.city}`,
  }));
  const served = [
    {
      '@type': 'City' as const,
      name: GEO.city,
      alternateName: GEO.cityAlternate,
    },
    {
      '@type': 'AdministrativeArea' as const,
      name: GEO.region,
      containedInPlace: { '@type': 'Country', name: GEO.countryName },
    },
    ...localities,
  ];
  if (extraLocality) {
    served.unshift({
      '@type': 'Place' as const,
      name: `${extraLocality}, ${GEO.city}`,
    });
  }
  return served;
}

export function buildPostalAddress(locality: string = GEO.city) {
  return {
    '@type': 'PostalAddress',
    addressLocality: locality,
    addressRegion: GEO.region,
    addressCountry: GEO.country,
  };
}

export function buildGeoCoordinates() {
  return {
    '@type': 'GeoCoordinates',
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  };
}

export function buildOpeningHoursSpecification() {
  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [...OPENING_HOURS.dayOfWeek],
    opens: OPENING_HOURS.opens,
    closes: OPENING_HOURS.closes,
  };
}

/** Primary LocalBusiness entity — service-area business in Bengaluru */
export function buildLocalBusiness(locality?: string) {
  return {
    '@type': 'LocalBusiness',
    '@id': SCHEMA_IDS.localBusiness,
    name: NAP.name,
    alternateName: NAP.alternateName,
    description: locality
      ? `Event decoration services in ${locality}, ${GEO.city}, ${GEO.region}. ${NAP.description}`
      : NAP.description,
    url: NAP.url,
    logo: NAP.logo,
    image: NAP.image,
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
}

export function buildOrganization() {
  return {
    '@type': 'Organization',
    '@id': SCHEMA_IDS.organization,
    name: NAP.name,
    alternateName: NAP.alternateName,
    url: NAP.url,
    logo: { '@type': 'ImageObject', url: NAP.logo },
    email: NAP.email,
    telephone: NAP.telephone,
    address: buildPostalAddress(),
    sameAs: getSameAsLinks(),
  };
}

export function buildWebSite() {
  return {
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    url: NAP.url,
    name: NAP.name,
    description: NAP.description,
    publisher: { '@id': SCHEMA_IDS.organization },
    inLanguage: 'en-IN',
  };
}

/** Individual Service nodes for homepage @graph */
export function buildCoreServiceNodes() {
  return CORE_DECORATION_SERVICES.map((svc) => ({
    '@type': 'Service',
    '@id': `${NAP.url}/#service-${svc.id}`,
    name: svc.name,
    serviceType: svc.serviceType,
    description: svc.description,
    url: absoluteUrl(svc.path),
    provider: { '@id': SCHEMA_IDS.localBusiness },
    areaServed: bangaloreAreaServed(),
  }));
}

/** Homepage linked data graph — single script, no duplicate LocalBusiness */
export function buildHomePageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganization(),
      buildLocalBusiness(),
      buildWebSite(),
      ...buildCoreServiceNodes(),
    ],
  };
}

export function buildFaqPageSchema(faqs: FaqInputList, pageUrl: string) {
  if (!faqs.length) return null;
  const cleanUrl = pageUrl.replace(/\/+$/, '') || NAP.url;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${cleanUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function buildBreadcrumbSchema(
  crumbs: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/**
 * Locality page: Service scoped to neighborhood (references canonical LocalBusiness).
 * Avoids duplicate LocalBusiness entities per Google guidelines.
 */
export function buildLocalityServiceSchema(areaName: string, slug: string) {
  const pageUrl = absoluteUrl(`/locations/${slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `Event Decoration in ${areaName}`,
    serviceType: 'Event decoration',
    description: `Professional wedding, birthday, haldi, balloon, and themed event decoration in ${areaName}, ${GEO.city}, ${GEO.region}.`,
    url: pageUrl,
    provider: { '@id': SCHEMA_IDS.localBusiness },
    areaServed: {
      '@type': 'Place',
      name: `${areaName}, ${GEO.city}`,
      address: buildPostalAddress(areaName),
    },
  };
}

export function buildLocationServiceSchema(options: {
  locationName: string;
  locationSlug: string;
  serviceName: string;
  serviceSlug: string;
  serviceDescription: string;
}) {
  const pageUrl = absoluteUrl(
    `/locations/${options.locationSlug}/services/${options.serviceSlug}`
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `${options.serviceName} in ${options.locationName}`,
    serviceType: options.serviceName,
    description: options.serviceDescription,
    url: pageUrl,
    provider: { '@id': SCHEMA_IDS.localBusiness },
    areaServed: {
      '@type': 'Place',
      name: `${options.locationName}, ${GEO.city}`,
    },
  };
}

export function buildCollectionPageSchema(options: {
  name: string;
  pageUrl: string;
  localityUrls: { name: string; slug: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: options.name,
    url: options.pageUrl,
    about: { '@id': SCHEMA_IDS.localBusiness },
    hasPart: options.localityUrls.map((loc) => ({
      '@type': 'WebPage',
      name: loc.name,
      url: absoluteUrl(`/locations/${loc.slug}`),
    })),
  };
}

/** Google-safe default LocalBusiness for legacy SeoHead (no fake reviews) */
export function buildSeoHeadDefaultSchema(canonical: string, description?: string) {
  return {
    '@context': 'https://schema.org',
    ...buildLocalBusiness(),
    url: canonical,
    description: description ?? NAP.description,
  };
}

/** Service detail pages — provider links to canonical LocalBusiness @id */
export function buildServicePageSchema(options: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  serviceId?: string;
}) {
  const pageUrl = absoluteUrl(options.path);
  const id =
    options.serviceId ?? options.path.replace(/\//g, '-').replace(/^-/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: options.name,
    serviceType: options.serviceType,
    description: options.description,
    url: pageUrl,
    provider: { '@id': SCHEMA_IDS.localBusiness },
    areaServed: bangaloreAreaServed(),
  };
}

export function buildServicePageSchemaFromCore(serviceId: string) {
  const svc = CORE_DECORATION_SERVICES.find((s) => s.id === serviceId);
  if (!svc) return null;
  return buildServicePageSchema({
    serviceId: svc.id,
    name: svc.name,
    serviceType: svc.serviceType,
    description: svc.description,
    path: svc.path,
  });
}
