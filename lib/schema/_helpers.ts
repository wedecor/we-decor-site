import { AREAS } from '@/app/(site)/_data/locations';
import { GEO, NAP, SCHEMA_IDS } from '@/lib/local-seo/constants';
import type { GraphDocument, JsonLdNode } from './types';

function areaEntityId(fragment: string): string {
  return `${NAP.url}/#${fragment}`;
}

/** Full City / AdministrativeArea / Place nodes — emit once per graph that owns them. */
export function buildAreaServedEntities(): JsonLdNode[] {
  return [
    {
      '@type': 'City',
      '@id': areaEntityId('place-city'),
      name: GEO.city,
      alternateName: GEO.cityAlternate,
      sameAs: 'https://en.wikipedia.org/wiki/Bangalore',
    },
    {
      '@type': 'AdministrativeArea',
      '@id': areaEntityId('place-region'),
      name: GEO.region,
      containedInPlace: { '@type': 'Country', name: GEO.countryName },
    },
    ...AREAS.map((a) => ({
      '@type': 'Place',
      '@id': areaEntityId(`place-${a.slug}`),
      name: `${a.name}, ${GEO.city}`,
    })),
  ];
}

/** areaServed as @id refs only — definitions live on buildAreaServedEntities(). */
export function bangaloreAreaServed(extraLocality?: string): JsonLdNode[] {
  const entities = buildAreaServedEntities();
  const refs: JsonLdNode[] = entities.map((n) => ({ '@id': n['@id'] as string }));
  if (!extraLocality) return refs;

  const match = AREAS.find((a) => a.name === extraLocality);
  if (match) return refs;

  const extraId = areaEntityId(
    `place-${extraLocality
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}`
  );
  if (refs.some((r) => r['@id'] === extraId)) return refs;
  return [{ '@id': extraId }, ...refs];
}

export function buildPostalAddress(locality?: string): JsonLdNode {
  const isPremises = !locality || locality === NAP.addressLocality;
  const node: JsonLdNode = {
    '@type': 'PostalAddress',
    addressLocality: locality ?? NAP.addressLocality,
    addressRegion: NAP.addressRegion,
    addressCountry: NAP.addressCountry,
  };
  if (isPremises) {
    node.streetAddress = NAP.streetAddress;
    node.postalCode = NAP.postalCode;
  }
  return node;
}

/** Visible NAP line using the same fields PostalAddress publishes for the premises. */
export function formatPostalAddressText(): string {
  const a = buildPostalAddress();
  return [a.streetAddress, a.addressLocality, a.addressRegion, a.postalCode, a.addressCountry]
    .filter((part): part is string => typeof part === 'string' && part.length > 0)
    .join(', ');
}

export function buildGeoCoordinates(): JsonLdNode {
  return {
    '@type': 'GeoCoordinates',
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  };
}

/**
 * Compact business entity for pages that only *reference* the business.
 *
 * Every WebPage, Service and BlogPosting points at `/#localbusiness` (via
 * `about`, `provider`, `publisher`) and `/#website` (via `isPartOf`), but
 * until Nov 2026 only the homepage graph defined those nodes. Google resolves
 * cross-page @ids, so it coped; an AI crawler reading one locality page saw
 * `provider: { "@id": ".../#localbusiness" }` and nothing else — no name, no
 * phone, no address. This node is the minimum that makes a single page
 * self-describing. It deliberately carries no AggregateRating: that lives on
 * the homepage only (see CLAUDE.md).
 */
export function buildBusinessReferenceNode(): JsonLdNode {
  return {
    '@type': 'LocalBusiness',
    '@id': SCHEMA_IDS.localBusiness,
    name: NAP.name,
    url: NAP.url,
    telephone: NAP.telephone,
    ...optionalEmail(NAP.email),
    logo: { '@type': 'ImageObject', url: NAP.logo },
    image: NAP.image,
    address: buildPostalAddress(),
  };
}

export function buildWebsiteReferenceNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    url: NAP.url,
    name: NAP.name,
    publisher: { '@id': SCHEMA_IDS.localBusiness },
  };
}

function hasNodeWithId(nodes: JsonLdNode[], id: string): boolean {
  return nodes.some((n) => n['@id'] === id);
}

/** Does any node in the graph reference `id` (at any depth) without defining it? */
function referencesId(value: unknown, id: string): boolean {
  if (Array.isArray(value)) return value.some((v) => referencesId(v, id));
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (obj['@id'] === id && Object.keys(obj).length === 1) return true;
    return Object.values(obj).some((v) => referencesId(v, id));
  }
  return false;
}

/**
 * Build a `@graph` document. Appends the compact business / website nodes when
 * the page references them but does not define them, so the full homepage
 * graph (which defines both) is left untouched and no page ends up with two
 * competing definitions.
 */
export function asGraph(...nodes: Array<JsonLdNode | null | undefined>): GraphDocument {
  const graph = nodes.filter((n): n is JsonLdNode => Boolean(n));

  if (
    !hasNodeWithId(graph, SCHEMA_IDS.localBusiness) &&
    referencesId(graph, SCHEMA_IDS.localBusiness)
  ) {
    graph.push(buildBusinessReferenceNode());
  }
  if (!hasNodeWithId(graph, SCHEMA_IDS.website) && referencesId(graph, SCHEMA_IDS.website)) {
    graph.push(buildWebsiteReferenceNode());
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function pageId(pageUrl: string, fragment: string): string {
  const clean = pageUrl.replace(/\/+$/, '') || pageUrl;
  return `${clean}#${fragment}`;
}

/** Attach email only when a non-empty value is configured. */
export function optionalEmail(email?: string): { email: string } | Record<string, never> {
  const trimmed = email?.trim();
  return trimmed ? { email: trimmed } : {};
}
