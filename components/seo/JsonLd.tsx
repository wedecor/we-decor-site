import SchemaScript from '@/components/seo/SchemaScript';
import { absoluteUrl } from '@/lib/metadata';
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildLocalBusiness,
  buildOrganization,
  buildWebSite,
  NAP,
} from '@/lib/local-seo';

export interface ContactInfo {
  displayNumbers: string[];
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

/** @deprecated Prefer homepage @graph via HomeJsonLd; kept for legacy pages */
export function LocalBusinessJsonLd({
  name = NAP.name,
  area,
}: {
  name?: string;
  area?: string;
  contact?: Partial<ContactInfo>;
  services?: string[];
}) {
  const data = {
    '@context': 'https://schema.org',
    ...buildLocalBusiness(area),
    name,
  };
  return <SchemaScript data={data} />;
}

export function BreadcrumbsJsonLd({ crumbs }: { crumbs: { name: string; url: string }[] }) {
  const mapped = crumbs.map((c) => ({
    name: c.name,
    path: c.url.startsWith('http') ? new URL(c.url).pathname : c.url,
  }));
  return <SchemaScript data={buildBreadcrumbSchema(mapped)} />;
}

export function FAQJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema = buildFaqPageSchema(
    faqs.map((f) => ({ question: f.q, answer: f.a })),
    absoluteUrl('/')
  );
  return <SchemaScript data={schema} />;
}

export function OrganizationJsonLd() {
  return (
    <SchemaScript
      data={{
        '@context': 'https://schema.org',
        ...buildOrganization(),
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <SchemaScript
      data={{
        '@context': 'https://schema.org',
        ...buildWebSite(),
      }}
    />
  );
}
