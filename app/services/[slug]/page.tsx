import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaScript from '@/components/seo/SchemaScript';
import DecorationServicePage from '@/components/services/DecorationServicePage';
import { pageMetadata } from '@/lib/metadata';
import { buildServicePageSchema, buildServicePageSchemaFromCore } from '@/lib/local-seo';
import {
  DECORATION_SERVICE_SLUGS,
  getDecorationServicePage,
} from '@/lib/services/decoration-service-pages';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DECORATION_SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getDecorationServicePage(slug);
  if (!config) return { title: 'Service Not Found' };

  return pageMetadata({
    path: `/services/${slug}`,
    title: `${config.title} | We Decor Events`,
    description: config.description,
    ogImage: config.ogImage,
  });
}

export default async function DecorationServiceRoute({ params }: PageProps) {
  const { slug } = await params;
  const config = getDecorationServicePage(slug);
  if (!config) notFound();

  const structuredData = config.coreServiceId
    ? buildServicePageSchemaFromCore(config.coreServiceId)
    : buildServicePageSchema({
        name: config.title,
        serviceType: config.serviceType,
        description: config.description,
        path: `/services/${slug}`,
        serviceId: slug,
      });

  return (
    <>
      {structuredData ? <SchemaScript data={structuredData} /> : null}
      <DecorationServicePage config={config} />
    </>
  );
}
