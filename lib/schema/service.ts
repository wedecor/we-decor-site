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
      path: svc.path,
      serviceId: svc.id,
      useSiteScopedId: true,
    })
  );
}

export function buildServiceSchema(options: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  serviceId?: string;
  /** When true, @id is `/#service-{id}` so homepage catalog and detail page share one entity. */
  useSiteScopedId?: boolean;
  image?: string;
  audienceName?: string;
}): JsonLdNode {
  const pageUrl = absoluteUrl(options.path);
  const id =
    options.useSiteScopedId && options.serviceId
      ? `${NAP.url}/#service-${options.serviceId}`
      : `${pageUrl}#service`;

  const node: JsonLdNode = {
    '@type': 'Service',
    '@id': id,
    name: options.name,
    serviceType: options.serviceType,
    description: options.description,
    url: pageUrl,
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
    priceRange: '₹3,000 - ₹15,999+',
    offers: buildServiceOffer({
      name: options.name,
      url: pageUrl,
      lowPrice: SERVICE_STARTING_PRICE_INR,
    }),
  };

  if (options.image) {
    node.image = buildImageObject({
      url: options.image,
      caption: `${options.name} by ${NAP.name}`,
    });
  }

  return node;
}

export function buildServicePageSchema(options: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
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
    path: svc.path,
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
    name: `Event Decoration in ${areaName}`,
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

export function buildLocationServiceSchema(options: {
  locationName: string;
  locationSlug: string;
  serviceName: string;
  serviceSlug: string;
  serviceDescription: string;
}): JsonLdNode {
  const pageUrl = absoluteUrl(`/locations/${options.locationSlug}/services/${options.serviceSlug}`);
  return {
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `${options.serviceName} in ${options.locationName}`,
    serviceType: options.serviceName,
    description: options.serviceDescription,
    url: pageUrl,
    provider: { '@id': SCHEMA_IDS.localBusiness },
    areaServed: {
      '@type': 'Place',
      name: `${options.locationName}, Bengaluru`,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: absoluteUrl('/contact'),
      servicePhone: NAP.telephone,
    },
    offers: buildServiceOffer({
      name: `${options.serviceName} in ${options.locationName}`,
      url: pageUrl,
      lowPrice: SERVICE_STARTING_PRICE_INR,
    }),
  };
}
