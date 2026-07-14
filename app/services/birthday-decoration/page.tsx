import type { Metadata } from 'next';
import SchemaScript from '@/components/seo/SchemaScript';
import DecorationServicePage from '@/components/services/DecorationServicePage';
import { pageMetadata } from '@/lib/metadata';
import { buildServicePageSchemaFromCore } from '@/lib/local-seo';
import { DECORATION_SERVICE_PAGES } from '@/lib/services/decoration-service-pages';

const config = DECORATION_SERVICE_PAGES['birthday-decoration'];

export const metadata: Metadata = pageMetadata({
  path: '/services/birthday-decoration',
  title: config.title,
  description: config.description,
  ogImage: config.ogImage,
});

const structuredData = buildServicePageSchemaFromCore('birthday-decoration');

export default function BirthdayDecorationPage() {
  return (
    <>
      {structuredData ? <SchemaScript data={structuredData} /> : null}
      <DecorationServicePage config={config} />
    </>
  );
}
