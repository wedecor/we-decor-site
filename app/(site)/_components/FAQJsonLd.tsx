import SchemaScript from '@/components/seo/SchemaScript';
import { absoluteUrl } from '@/lib/metadata';
import { buildFaqPageSchema } from '@/lib/local-seo';

type Props = {
  items: { question: string; answer: string }[];
  pagePath?: string;
};

export default function FAQJsonLd({ items, pagePath }: Props) {
  const url = pagePath ? absoluteUrl(pagePath) : undefined;
  const schema = buildFaqPageSchema(
    items.map((i) => ({ question: i.question, answer: i.answer })),
    url ?? absoluteUrl('/')
  );
  if (!schema) return null;
  return <SchemaScript data={schema} />;
}
