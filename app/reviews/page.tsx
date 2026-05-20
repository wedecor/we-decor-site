import Testimonials from '@/components/Testimonials';
import { SimpleGoogleReviewsEmbed } from '@/components/GoogleReviewsWidget';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Customer Reviews
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        See what our clients say about our decoration services across Bangalore.
      </p>
      {placeId ? <SimpleGoogleReviewsEmbed placeId={placeId} /> : null}
      <Testimonials />
    </div>
  );
}
