import { absoluteUrl } from '@/lib/metadata';
import { NAP, SCHEMA_IDS } from '@/lib/local-seo/constants';
import { asGraph, pageId } from './_helpers';
import { buildWebPage } from './webpage';
import type { GraphDocument, JsonLdNode } from './types';

export function buildBlogPostingGraph(options: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}): GraphDocument {
  const url = options.url.replace(/\/+$/, '') || options.url;
  const imageUrl = options.image.startsWith('http') ? options.image : absoluteUrl(options.image);
  const blogPostingId = pageId(url, 'blogposting');

  // Posts are authored by the studio itself, which is the same entity as the
  // publisher below — referenced by @id rather than restated, so the page
  // emits one Organization node instead of two.
  const author: JsonLdNode = { '@id': SCHEMA_IDS.organization };

  const blogPosting: JsonLdNode = {
    '@type': 'BlogPosting',
    '@id': blogPostingId,
    headline: options.title,
    description: options.description,
    url,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      contentUrl: imageUrl,
    },
    datePublished: options.datePublished,
    ...(options.dateModified ? { dateModified: options.dateModified } : {}),
    author,
    publisher: {
      '@type': 'Organization',
      '@id': SCHEMA_IDS.organization,
      name: NAP.name,
      logo: {
        '@type': 'ImageObject',
        url: NAP.logo,
        contentUrl: NAP.logo,
      },
    },
    inLanguage: 'en-IN',
    isPartOf: { '@id': SCHEMA_IDS.website },
  };

  const webPage = buildWebPage({
    name: options.title,
    description: options.description,
    url,
    primaryImage: imageUrl,
    mainEntity: { '@id': blogPostingId },
  });

  return asGraph(webPage, blogPosting);
}
