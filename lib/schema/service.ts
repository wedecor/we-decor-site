import { absoluteUrl } from '@/lib/metadata';
import { CORE_DECORATION_SERVICES, NAP, SCHEMA_IDS } from '@/lib/local-seo/constants';
import { SERVICE_STARTING_PRICE_INR } from '@/lib/content/pricing-tiers';
import { bangaloreAreaServed, buildPostalAddress } from './_helpers';
import { buildServiceOffer } from './offer';
import { buildImageObject } from './image';
import type { JsonLdNode } from './types';

export function buildCoreServiceNodes(): JsonLdNode[] {
  return CORE_DECORATION_SERVICES.map((svc) =>
    buildServiceSchema({
      name: svc.name,
      serviceType: svc.serviceType,
      description: svc.description,
      path: 'path' in svc ? svc.path : undefined,
      serviceId: svc.id,
      useSiteScopedId: true,
    })
  );
}

/**
 * OfferCatalog of the core decoration services, referenced by the same
 * site-scoped @ids the homepage catalog defines. Reference-only (@id + name)
 * so a single node stays authoritative for each service's full description.
 */
export function buildCoreServiceCatalog(catalogId: string): JsonLdNode {
  return {
    '@type': 'OfferCatalog',
    '@id': catalogId,
    name: 'Event Decoration Services in Bengaluru',
    itemListElement: CORE_DECORATION_SERVICES.map((svc, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        '@id': `${NAP.url}/#service-${svc.id}`,
        name: svc.name,
      },
    })),
  };
}

const FIVE_K_SERVICE_KEYS = new Set([
  'haldi-decoration',
  'wedding-setup',
  'floral-decoration',
  'nikah-decoration',
  '/services/haldi-decoration',
  '/services/wedding-setup',
  '/services/floral-decoration',
  '/services/nikah-decoration',
]);

function resolveStartingPriceInr(
  serviceId?: string,
  path?: string,
  explicitLowPrice?: number
): number {
  if (typeof explicitLowPrice === 'number') return explicitLowPrice;
  if (
    (serviceId && FIVE_K_SERVICE_KEYS.has(serviceId)) ||
    (path && FIVE_K_SERVICE_KEYS.has(path))
  ) {
    return 5000;
  }
  return SERVICE_STARTING_PRICE_INR;
}

export function buildServiceSchema(options: {
  name: string;
  /** Longer marketing title when it differs from the canonical `name`. */
  alternateName?: string;
  serviceType: string;
  description: string;
  /** Dedicated page path. Omit for catalog-only services that have no URL. */
  path?: string;
  serviceId?: string;
  /** When true, @id is `/#service-{id}` so homepage catalog and detail page share one entity. */
  useSiteScopedId?: boolean;
  image?: string;
  audienceName?: string;
  /** Nested catalog for umbrella services that encompass narrower ones. */
  hasOfferCatalog?: JsonLdNode;
  lowPrice?: number;
}): JsonLdNode {
  const pageUrl = options.path ? absoluteUrl(options.path) : undefined;
  const id =
    options.useSiteScopedId && options.serviceId
      ? `${NAP.url}/#service-${options.serviceId}`
      : `${pageUrl ?? NAP.url}#service`;
  const lowPrice = resolveStartingPriceInr(options.serviceId, options.path, options.lowPrice);
  const formattedLow = lowPrice === 5000 ? '₹5,000' : '₹3,000';

  const node: JsonLdNode = {
    '@type': 'Service',
    '@id': id,
    name: options.name,
    ...(options.alternateName ? { alternateName: options.alternateName } : {}),
    serviceType: options.serviceType,
    description: options.description,
    ...(pageUrl ? { url: pageUrl } : {}),
    provider: { '@id': SCHEMA_IDS.localBusiness },
    areaServed: bangaloreAreaServed(),
    audience: {
      '@type': 'Audience',
      audienceType: options.audienceName ?? 'Event hosts and celebrants in Bengaluru',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: absoluteUrl('/contact'),
      servicePhone: NAP.telephone,
    },
    priceRange: `${formattedLow} - ₹15,999+`,
    ...(pageUrl
      ? {
          offers: buildServiceOffer({
            name: options.name,
            url: pageUrl,
            lowPrice,
          }),
        }
      : {}),
  };

  if (options.image) {
    node.image = buildImageObject({
      url: options.image,
      caption: `${options.name} by ${NAP.name}`,
    });
  }

  if (options.hasOfferCatalog) node.hasOfferCatalog = options.hasOfferCatalog;

  return node;
}

export function buildServicePageSchema(options: {
  name: string;
  serviceType: string;
  description: string;
  path?: string;
  serviceId?: string;
  image?: string;
}): JsonLdNode {
  const core = options.serviceId
    ? CORE_DECORATION_SERVICES.find((s) => s.id === options.serviceId)
    : undefined;

  return buildServiceSchema({
    ...options,
    useSiteScopedId: Boolean(core),
    serviceId: core?.id ?? options.serviceId,
  });
}

export function buildServicePageSchemaFromCore(serviceId: string): JsonLdNode | null {
  const svc = CORE_DECORATION_SERVICES.find((s) => s.id === serviceId);
  if (!svc) return null;
  return buildServicePageSchema({
    serviceId: svc.id,
    name: svc.name,
    serviceType: svc.serviceType,
    description: svc.description,
    path: 'path' in svc ? svc.path : undefined,
  });
}

export function buildLocalityServiceSchema(
  areaName: string,
  slug: string,
  options?: { landmark?: string }
): JsonLdNode {
  const pageUrl = absoluteUrl(`/locations/${slug}`);
  const landmarkText = options?.landmark ? ` near ${options.landmark}` : '';
  return {
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `Event Decorators in ${areaName}`,
    serviceType: 'Event decoration',
    description: `Professional wedding, birthday, haldi, balloon, and themed event decoration in ${areaName}${landmarkText}, Bengaluru, Karnataka.`,
    url: pageUrl,
    provider: { '@id': SCHEMA_IDS.localBusiness },
    areaServed: {
      '@type': 'Place',
      name: `${areaName}, Bengaluru`,
      address: buildPostalAddress(areaName),
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: absoluteUrl('/contact'),
      servicePhone: NAP.telephone,
    },
    offers: buildServiceOffer({
      name: `Event Decorations in ${areaName}`,
      url: pageUrl,
      lowPrice: SERVICE_STARTING_PRICE_INR,
    }),
  };
}
