import ReviewsList from '@/components/ReviewsList';
import { SimpleGoogleReviewsEmbed } from '@/components/GoogleReviewsWidget';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/lux/PageHero';

export const metadata: Metadata = pageMetadata({
  path: '/reviews',
  title: 'Customer Reviews - We Decor Bangalore',
  description:
    'Read authentic customer reviews and testimonials for We Decor Bangalore. See what our clients say about our wedding decorations, birthday parties, and event services.',
  ogImage: '/images/reviews-og.jpg',
});

export default function ReviewsPage() {
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '';

  return (
    <div className="lux-page">
      <PageHero
        eyebrow="Testimonials"
        title="Client voices"
        description="Authentic feedback from celebrations we have styled across Bengaluru."
      />
      <section className="lux-section pt-0 pb-24 md:pb-32 bg-lux-bg">
        <div className="lux-container">
          <div className="mb-16">
            <SimpleGoogleReviewsEmbed placeId={placeId} />
          </div>
          <ReviewsList />
        </div>
      </section>
    </div>
  );
}
