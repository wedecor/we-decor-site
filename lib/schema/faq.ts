import { NAP } from '@/lib/local-seo/constants';
import { pageId } from './_helpers';
import type { FaqItem, JsonLdNode } from './types';

export function buildFaqPageSchema(
  faqs: ReadonlyArray<FaqItem>,
  pageUrl: string
): JsonLdNode | null {
  if (!faqs.length) return null;
  const cleanUrl = pageUrl.replace(/\/+$/, '') || NAP.url;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': pageId(cleanUrl, 'faq'),
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** Graph node without @context. */
export function buildFaqPageNode(faqs: ReadonlyArray<FaqItem>, pageUrl: string): JsonLdNode | null {
  const schema = buildFaqPageSchema(faqs, pageUrl);
  if (!schema) return null;
  const { '@context': _ctx, ...node } = schema;
  return node;
}
