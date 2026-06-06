import Link from 'next/link';
import { fallbackTestimonials } from '@/utils/googleReviews';
import { fetchGoogleReviewsApi } from '@/lib/google-reviews-client';

type FeaturedReview = {
  name: string;
  feedback: string;
  event?: string;
  rating: number;
};

function fromFallback(): FeaturedReview[] {
  return fallbackTestimonials.slice(0, 3).map((t) => ({
    name: t.name,
    feedback: t.feedback,
    event: t.event,
    rating: t.rating,
  }));
}

async function getFeaturedReviews(): Promise<FeaturedReview[]> {
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim();
  if (!placeId) return fromFallback();

  const data = await fetchGoogleReviewsApi(placeId);
  if (!data?.reviews?.length) return fromFallback();

  return [...data.reviews]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map((review) => ({
      name: review.author_name,
      feedback: review.text,
      rating: review.rating,
    }));
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mt-3" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5"
          style={{ color: i < rating ? '#C9A84C' : 'rgba(201, 168, 76, 0.25)' }}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default async function HomeTestimonials() {
  const featured = await getFeaturedReviews();

  return (
    <section className="lux-section bg-lux-surface">
      <div className="lux-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="lux-eyebrow mb-3">Testimonials</p>
          <h2 className="lux-heading-sm">Voices from Bengaluru celebrations</h2>
        </div>
        <ul className="grid md:grid-cols-3 gap-6 list-none p-0 m-0">
          {featured.map((t, index) => (
            <li key={`${t.name}-${index}`} className="lux-panel p-9 flex flex-col h-full">
              <p className="font-display text-4xl text-lux-gold/40 leading-none mb-4" aria-hidden>
                &ldquo;
              </p>
              <p className="text-lux-secondary leading-relaxed flex-1 text-sm md:text-base">
                {t.feedback}
              </p>
              <StarRow rating={t.rating} />
              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <p className="font-medium text-lux-ivory">{t.name}</p>
                {t.event ? <p className="text-xs text-lux-muted mt-1">{t.event}</p> : null}
              </div>
            </li>
          ))}
        </ul>
        <p className="text-center mt-8">
          <Link
            href="/reviews"
            className="text-lux-gold text-sm font-medium hover:underline underline-offset-4"
          >
            More on Google →
          </Link>
        </p>
      </div>
    </section>
  );
}
