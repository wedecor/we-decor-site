import { SCHEMA_IDS } from '@/lib/local-seo/constants';
import { pageId } from './_helpers';
import type { JsonLdNode } from './types';

export type WebPageOptions = {
  name: string;
  description: string;
  url: string;
  /** Defaults to WebPage; use AboutPage, ContactPage, CollectionPage, FAQPage types via dedicated builders. */
  type?: string | string[];
  primaryImage?: string;
  about?: JsonLdNode;
  mainEntity?: JsonLdNode | JsonLdNode[];
  hasPart?: JsonLdNode | JsonLdNode[];
  /** When false, omit breadcrumb @id (e.g. homepage with no trail). Default true. */
  includeBreadcrumb?: boolean;
};

export function buildWebPage(options: WebPageOptions): JsonLdNode {
  const url = options.url.replace(/\/+$/, '') || options.url;
  const node: JsonLdNode = {
    '@type': options.type ?? 'WebPage',
    '@id': pageId(url, 'webpage'),
    name: options.name,
    description: options.description,
    url,
    isPartOf: { '@id': SCHEMA_IDS.website },
    about: options.about ?? { '@id': SCHEMA_IDS.localBusiness },
    inLanguage: 'en-IN',
  };

  if (options.includeBreadcrumb !== false) {
    node.breadcrumb = { '@id': pageId(url, 'breadcrumb') };
  }

  if (options.primaryImage) {
    node.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: options.primaryImage,
      contentUrl: options.primaryImage,
    };
  }
  if (options.mainEntity) node.mainEntity = options.mainEntity;
  if (options.hasPart) node.hasPart = options.hasPart;

  return node;
}
