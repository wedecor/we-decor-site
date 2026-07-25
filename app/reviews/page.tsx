import ReviewsList from '@/components/ReviewsList';
import { SimpleGoogleReviewsEmbed } from '@/components/GoogleReviewsWidget';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/lux/PageHero';
import SiteBreadcrumbs from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildReviewsPageGraph } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/reviews',
  title: 'Customer Reviews',
  description:
    'Read authentic customer reviews and testimonials for We Decor Bangalore. See what our clients say about our wedding decorations, birthday parties, and event services.',
  ogImage: '/og-banner.jpg',
});

export default function ReviewsPage() {
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '';

  return (
    <div className="lux-page">
      <SchemaScript
        data={buildReviewsPageGraph({
          name: 'Customer Reviews',
          description:
            'Read authentic customer reviews and testimonials for We Decor Bangalore. See what our clients say about our wedding decorations, birthday parties, and event services.',
        })}
      />
      <div className="lux-container pt-[calc(var(--nav-height)+1.5rem)] pb-2">
        <SiteBreadcrumbs
          withSchema
          items={[
            { name: 'Home', href: '/' },
            { name: 'Reviews', href: '/reviews' },
          ]}
        />
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
          <h2 id="reviews-embed" className="lux-heading-sm mb-10 text-center">
            Google reviews
          </h2>
          <div className="mb-16">
            <SimpleGoogleReviewsEmbed placeId={placeId} />
          </div>
          <h2 className="lux-heading-sm mb-10 text-center">More client feedback</h2>
          <ReviewsList />
        </div>
      </section>
      <CoreExploreLinks context="content" showLocalities heading="Continue planning" />
    </div>
  );
}
