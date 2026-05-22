import SchemaScript from '@/components/seo/SchemaScript';
import { buildFaqPageSchema, NAP } from '@/lib/local-seo';

type QA = { question: string; answer: string };

export interface FaqJsonLdProps {
  faqs: QA[];
  /** Canonical URL for this page */
  url?: string;
}

function InnerFaqJsonLd({ faqs, url }: FaqJsonLdProps) {
  if (!faqs?.length) return null;
  const schema = buildFaqPageSchema(faqs, url?.replace(/\/+$/, '') || NAP.url);
  return <SchemaScript data={schema} />;
}

export default InnerFaqJsonLd;
export const FaqPageJsonLd = InnerFaqJsonLd;
