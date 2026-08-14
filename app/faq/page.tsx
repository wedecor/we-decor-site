import FAQ from '@/components/FAQ';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/lux/PageHero';
import SiteBreadcrumbs, { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildFaqSitePageGraph, withBreadcrumb } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/faq',
  title: 'FAQ',
  description: 'Answers to common questions about event decor, timelines, and customizations.',
});

const CRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'FAQ', href: '/faq' },
];

export default function FAQPage() {
  return (
    <div className="lux-page">
      <SchemaScript
        data={withBreadcrumb(
          buildFaqSitePageGraph({
            name: 'Frequently Asked Questions',
            description:
              'Answers to common questions about event decor, timelines, and customizations.',
          }),
          siteBreadcrumbsToSchemaItems(CRUMBS)
        )}
      />
      <div className="lux-container pt-[calc(var(--nav-height)+1.5rem)] pb-2">
        <SiteBreadcrumbs items={CRUMBS} />
      </div>
      <PageHero
        eyebrow="Guidance"
        title="Frequently asked questions"
        description="Everything you need to know about timelines, pricing, and custom celebrations in Bengaluru."
      />
      <section className="lux-section pt-0 pb-12 bg-lux-bg" aria-labelledby="faq-list-heading">
        <div className="lux-container max-w-3xl">
          <h2 id="faq-list-heading" className="sr-only">
            Answers about We Decor event decoration
          </h2>
          <FAQ />
        </div>
      </section>
      <CoreExploreLinks
        context="content"
        showLocalities
        pageKey="faq"
        heading="Related planning pages"
      />
    </div>
  );
}
