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
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 list-none p-0 m-0">
        {data.reviews.map((review) => (
          <li key={`${review.author}-${review.datePublished}`}>
            <figure className="lux-panel p-6 md:p-7 h-full flex flex-col">
              <Stars rating={review.rating} className="mb-4" />
              <blockquote className="text-[0.9375rem] text-lux-secondary font-light leading-[1.8] flex-1">
                {review.text}
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-white/[0.08] flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lux-elevated border border-lux-border font-display text-sm text-lux-gold-soft"
                >
                  {review.author.charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-lux-ivory truncate">{review.author}</span>
                  <span className="block text-xs text-lux-text-muted">
                    Google review · {review.relativeTime}
                  </span>
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
