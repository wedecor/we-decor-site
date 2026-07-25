import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import SchemaScript from '@/components/seo/SchemaScript';
import DecorationServicePage from '@/components/services/DecorationServicePage';
import { absoluteUrl, pageMetadata } from '@/lib/metadata';
import { buildServiceDetailGraph } from '@/lib/schema';
import {
  DECORATION_SERVICE_SLUGS,
  getDecorationServicePage,
} from '@/lib/services/decoration-service-pages';

type PageProps = { params: Promise<{ slug: string }> };

/** Cannibalized legacy slugs — always 301 to the canonical service page. */
const REDIRECTED_SLUGS: Record<string, string> = {
  'birthday-home-decoration': '/services/birthday-decoration',
  'haldi-backdrop-decor': '/services/haldi-decoration',
  'wedding-stage-decor': '/services/wedding-setup',
};

export function generateStaticParams() {
  return DECORATION_SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (REDIRECTED_SLUGS[slug]) {
    return pageMetadata({
      path: REDIRECTED_SLUGS[slug],
      title: 'Redirecting',
      description: 'This page has moved.',
      noindex: true,
    });
  }
  const config = getDecorationServicePage(slug);
  if (!config) return { title: 'Service Not Found' };

  return pageMetadata({
    path: `/services/${slug}`,
    title: config.title,
    description: config.description,
    ogImage: config.ogImage,
  });
}

export default async function DecorationServiceRoute({ params }: PageProps) {
  const { slug } = await params;
  const target = REDIRECTED_SLUGS[slug];
  if (target) permanentRedirect(target);

  const config = getDecorationServicePage(slug);
  if (!config) notFound();

  return (
    <>
      <SchemaScript
        data={buildServiceDetailGraph({
          name: config.title,
          description: config.description,
          path: `/services/${config.slug}`,
          serviceType: config.serviceType,
          serviceId: config.coreServiceId ?? slug,
          image: absoluteUrl(config.ogImage),
          faqs: config.faqs,
          includeServiceFaq: !config.faqs?.length,
        })}
      />
      <DecorationServicePage config={config} />
    </>
  );
}
