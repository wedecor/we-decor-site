import type { Metadata } from 'next';
import SchemaScript from '@/components/seo/SchemaScript';
import DecorationServicePage, {
  decorationServiceCrumbs,
} from '@/components/services/DecorationServicePage';
import { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import { absoluteUrl, pageMetadata } from '@/lib/metadata';
import { buildServiceDetailGraph, withBreadcrumb } from '@/lib/schema';
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

// Matches the graph shape emitted by app/services/[slug]/page.tsx for every
// dynamic sibling — WebPage + Service (+ FAQPage when the page renders FAQs).
const structuredData = withBreadcrumb(
  buildServiceDetailGraph({
    name: birthdayConfig.title,
    description: birthdayConfig.description,
    path: `/services/${birthdayConfig.slug}`,
    serviceType: birthdayConfig.serviceType,
    serviceId: birthdayConfig.coreServiceId ?? birthdayConfig.slug,
    image: absoluteUrl(birthdayConfig.ogImage),
    faqs: birthdayConfig.faqs,
    includeServiceFaq: !birthdayConfig.faqs?.length,
  }),
  siteBreadcrumbsToSchemaItems(decorationServiceCrumbs(birthdayConfig))
);

export default function BirthdayDecorationPage() {
  return (
    <>
      <SchemaScript data={structuredData} />
      <DecorationServicePage config={birthdayConfig} />
    </>
  );
}
