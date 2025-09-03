import React from 'react';

type QA = { question: string; answer: string };

export interface FaqJsonLdProps {
  faqs: QA[];
  /** Optional canonical URL for this page; used to set a stable @id */
  url?: string;
}

function buildFaqLd(faqs: QA[], url?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(url ? { '@id': `${url.replace(/\/+$/, '')}#faq` } : {}),
    mainEntity: faqs.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer,
      },
    })),
  };
}

function InnerFaqJsonLd({ faqs, url }: FaqJsonLdProps) {
  if (!faqs || faqs.length === 0) return null;
  const json = buildFaqLd(faqs, url);
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}

// Default export (covers: `import FaqJsonLd from '.../FaqJsonLd'`)
export default InnerFaqJsonLd;

// Named alias (covers: `import { FaqPageJsonLd } from '.../FaqJsonLd'`)
export const FaqPageJsonLd = InnerFaqJsonLd;
