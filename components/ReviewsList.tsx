import { getGoogleReviews, getGoogleReviewsUrl } from '@/utils/googleReviews';
import Stars from '@/components/reviews/Stars';

/**
 * Live Google reviews, fetched server-side and revalidated daily.
 *
 * Never renders placeholder ratings or invented testimonials — if the Places
 * API is unavailable the component falls back to a link to the Business Profile.
 */
export default async function ReviewsList() {
  const googleReviewsUrl = getGoogleReviewsUrl();
  const data = await getGoogleReviews();

  if (!data || data.reviews.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="lux-panel p-6 sm:p-8 md:p-10">
          <p className="lux-body text-sm md:text-base mb-8">
            We do not publish placeholder ratings or invented testimonials on this page. For the
            latest verified customer feedback, visit our Google Business Profile.
          </p>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lux-btn-primary inline-flex items-center text-sm"
          >
            View all reviews on Google →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Aggregate */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-4xl md:text-5xl text-lux-gold-soft leading-none">
            {data.rating.toFixed(1)}
          </span>
          <Stars rating={data.rating} size="md" />
        </div>
        <p className="mt-3 text-sm text-lux-secondary">
          Based on {data.total} Google review{data.total === 1 ? '' : 's'}
        </p>
      </div>

      {/* Reviews */}
      {/*
        Was boxed panels with a circular avatar holding the first letter of a
        name printed directly beside it — decoration carrying no information,
        and aria-hidden by its own admission. Same correction as the homepage
        testimonials: hairline rules, nothing competing with the words.
      */}
      <ul className="list-none p-0 m-0 border-t border-white/[0.08] md:grid md:grid-cols-2 lg:grid-cols-3">
        {data.reviews.map((review) => (
          <li
            key={`${review.author}-${review.datePublished}`}
            className="border-b border-white/[0.08] md:border-r md:last:border-r-0 lg:[&:nth-child(3n)]:border-r-0"
          >
            <figure className="flex h-full flex-col py-9 md:px-7 lg:px-8">
              <Stars rating={review.rating} className="mb-5" />
              <blockquote className="flex-1 text-[1rem] font-light leading-[1.85] text-lux-secondary">
                {review.text}
              </blockquote>
              <figcaption className="mt-7 min-w-0">
                <span className="block truncate text-sm text-lux-ivory">{review.author}</span>
                <span className="mt-1 block text-xs tracking-wide text-lux-text-muted">
                  Google review · {review.relativeTime}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <p className="text-center mt-12">
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="lux-btn-secondary inline-flex items-center text-sm"
        >
          Read all reviews on Google →
        </a>
      </p>
    </div>
  );
}
