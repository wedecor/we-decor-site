import SchemaScript from '@/components/seo/SchemaScript';
import { absoluteUrl } from '@/lib/metadata';
import { buildLocalityPageGraph, buildLocalityServiceSchema, withBreadcrumb } from '@/lib/schema';

/** Mirrors the trail SiteBreadcrumbs renders on a locality page. */
export function localityCrumbs(areaName: string, slug: string) {
  return [
    { name: 'Home', href: '/' },
    { name: 'Locations', href: '/locations' },
    { name: areaName, href: `/locations/${slug}` },
  ];
}

type Props = {
  areaName: string;
  slug: string;
  landmark?: string;
  description?: string;
  faqs?: ReadonlyArray<{ question: string; answer: string }>;
};

export default function LocalBizJsonLd({ areaName, slug, landmark, description, faqs }: Props) {
  const pageUrl = absoluteUrl(`/locations/${slug}`);
  const serviceNode = buildLocalityServiceSchema(areaName, slug, { landmark });

  return (
    <SchemaScript
      data={withBreadcrumb(
        buildLocalityPageGraph({
          name: `Event Decorations in ${areaName}`,
          description:
            description ??
            `Professional wedding, birthday, haldi, balloon, and themed event decoration in ${areaName}, Bengaluru.`,
          url: pageUrl,
          serviceNode,
          faqs,
        }),
        localityCrumbs(areaName, slug).map((c) => ({ name: c.name, path: c.href }))
      )}
    />
  );
}
