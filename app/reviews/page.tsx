import ReviewsList from '@/components/ReviewsList';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '@/lib/local-seo/constants';
import PageHero from '@/components/lux/PageHero';
import SiteBreadcrumbs, { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildReviewsPageGraph, withBreadcrumb } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/reviews',
  title: `Customer Reviews — ${GOOGLE_RATING}★ Rated Event Decorators in Bangalore`,
  description: `Read ${GOOGLE_REVIEW_COUNT}+ verified customer reviews (${GOOGLE_RATING}★ rating) for We Decor Bangalore across birthday, haldi, wedding stage & balloon decoration setups.`,
  ogImage: '/og-banner.jpg',
});

const CRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Reviews', href: '/reviews' },
];

export default async function ReviewsPage() {
  return (
    <div className="lux-page">
      <SchemaScript
        data={withBreadcrumb(
          buildReviewsPageGraph({
            name: 'Customer Reviews',
            description: `Read ${GOOGLE_REVIEW_COUNT}+ verified customer reviews (${GOOGLE_RATING}★ rating) for We Decor Bangalore across birthday, haldi, wedding stage & balloon decoration setups.`,
          }),
          siteBreadcrumbsToSchemaItems(CRUMBS)
        )}
      />
      <div className="lux-container pb-2">
        <SiteBreadcrumbs items={CRUMBS} />
      </div>
      <PageHero
        eyebrow="Testimonials"
        title="Client voices"
        description="Authentic feedback from celebrations we have styled across Bengaluru — for families researching wedding, birthday, and event decoration partners."
      />
      <section
        className="lux-section pt-0 pb-16 md:pb-20 bg-lux-bg"
        aria-labelledby="reviews-embed"
      >
        <div className="lux-container">
          <h2 id="reviews-embed" className="lux-heading-sm mb-10 ">
            Verified Google & client feedback
          </h2>
          <ReviewsList />
        </div>
      </section>
      <CoreExploreLinks
        context="content"
        showLocalities
        pageKey="reviews"
        heading="Continue planning"
      />
    </div>
  );
}
