import { AREAS } from '@/app/(site)/_data/locations';
import { GEO } from '@/lib/local-seo/constants';
import type { GraphDocument, JsonLdNode } from './types';

export function bangaloreAreaServed(extraLocality?: string): JsonLdNode[] {
  const localities = AREAS.slice(0, 20).map((a) => ({
    '@type': 'Place',
    name: `${a.name}, ${GEO.city}`,
  }));
  const served: JsonLdNode[] = [
    {
      '@type': 'City',
      name: GEO.city,
      alternateName: GEO.cityAlternate,
      sameAs: 'https://en.wikipedia.org/wiki/Bangalore',
    },
    {
      '@type': 'AdministrativeArea',
      name: GEO.region,
      containedInPlace: { '@type': 'Country', name: GEO.countryName },
    },
    ...localities,
  ];
  if (extraLocality) {
    served.unshift({
      '@type': 'Place',
      name: `${extraLocality}, ${GEO.city}`,
    });
  }
  return served;
}

export function buildPostalAddress(locality: string = GEO.city): JsonLdNode {
  return {
    '@type': 'PostalAddress',
    addressLocality: locality,
    addressRegion: GEO.region,
    addressCountry: GEO.country,
  };
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
