import { NAP, SCHEMA_IDS } from '@/lib/local-seo/constants';
import type { JsonLdNode } from './types';

/**
 * WebSite schema. SearchAction omitted — site has no dedicated on-site search results page.
 */
export function buildWebSite(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    url: NAP.url,
    name: NAP.name,
    description: NAP.description,
    publisher: { '@id': SCHEMA_IDS.localBusiness },
    inLanguage: 'en-IN',
  };
}
