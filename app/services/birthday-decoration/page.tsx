import type { Metadata } from 'next';
import SchemaScript from '@/components/seo/SchemaScript';
import DecorationServicePage from '@/components/services/DecorationServicePage';
import { pageMetadata } from '@/lib/metadata';
import { buildServicePageSchemaFromCore } from '@/lib/local-seo';
import { getDecorationServicePage } from '@/lib/services/decoration-service-pages';

const config = getDecorationServicePage('birthday-decoration');
if (!config) {
  throw new Error('Missing birthday-decoration service config');
}
const birthdayConfig = config;

export const metadata: Metadata = pageMetadata({
  path: '/services/birthday-decoration',
  title: birthdayConfig.title,
  description: birthdayConfig.description,
  ogImage: birthdayConfig.ogImage,
});

const structuredData = buildServicePageSchemaFromCore('birthday-decoration');

export default function BirthdayDecorationPage() {
  return (
    <>
      {structuredData ? <SchemaScript data={structuredData} /> : null}
      <DecorationServicePage config={birthdayConfig} />
    </>
  );
}
