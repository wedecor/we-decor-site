/**
 * Backward-compatible re-exports + thin wrappers.
 * Canonical builders live in `@/lib/schema`.
 */
import { absoluteUrl } from '@/lib/metadata';
import { NAP } from './constants';
import {
  buildLocalBusiness as buildLocalBusinessNode,
  buildOrganization,
  buildWebSite,
  buildHomePageGraph,
  buildFaqPageSchema,
  buildBreadcrumbSchema,
  buildLocalityServiceSchema,
  buildLocationServiceSchema,
  buildServicePageSchema,
  buildServicePageSchemaFromCore,
  buildCoreServiceNodes,
  buildOpeningHoursSpecification,
  buildPostalAddress,
  buildGeoCoordinates,
  buildLocationsCollectionSchema,
} from '@/lib/schema';

export {
  buildOrganization,
  buildWebSite,
  buildHomePageGraph,
  buildFaqPageSchema,
  buildBreadcrumbSchema,
  buildLocalityServiceSchema,
  buildLocationServiceSchema,
  buildServicePageSchema,
  buildServicePageSchemaFromCore,
  buildCoreServiceNodes,
  buildOpeningHoursSpecification,
  buildPostalAddress,
  buildGeoCoordinates,
};

export function buildLocalBusiness(locality?: string) {
  return buildLocalBusinessNode(locality ? { locality } : undefined);
}

/** Locations hub — CollectionPage + ItemList (Phase 2). */
export function buildCollectionPageSchema(options: {
  name: string;
  pageUrl: string;
  localityUrls: { name: string; slug: string }[];
  description?: string;
}) {
  const [collection] = buildLocationsCollectionSchema(options);
  return {
    '@context': 'https://schema.org' as const,
    ...collection,
  };
}

/** Google-safe default LocalBusiness for legacy SeoHead (no fake reviews) */
export function buildSeoHeadDefaultSchema(canonical: string, description?: string) {
  return {
    '@context': 'https://schema.org' as const,
    ...buildLocalBusiness(),
    url: canonical,
    description: description ?? NAP.description,
  };
}

/** Absolute URL helper retained for locale callers */
export { absoluteUrl };
