import { AREAS } from '@/app/(site)/_data/locations';
import { GEO, NAP } from '@/lib/local-seo/constants';
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

export function asGraph(...nodes: Array<JsonLdNode | null | undefined>): GraphDocument {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter((n): n is JsonLdNode => Boolean(n)),
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
