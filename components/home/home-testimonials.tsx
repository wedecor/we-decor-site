import Link from 'next/link';
import { getGoogleReviews, getGoogleReviewsUrl } from '@/utils/googleReviews';
import Stars from '@/components/reviews/Stars';
import FadeIn from '@/components/lux/FadeIn';

/**
 * Live Google reviews on the homepage.
 *
 * Renders real reviews when the Places API is reachable; otherwise falls back
 * to a link to the Business Profile. Never shows fabricated quotes or ratings.
 */
export default async function HomeTestimonials() {
  const googleReviewsUrl = getGoogleReviewsUrl();
  const data = await getGoogleReviews();

  if (!data || data.reviews.length === 0) {
    return (
      <section className="lux-section bg-lux-surface">
        <div className="lux-container max-w-2xl mx-auto text-center">
          <p className="lux-eyebrow mb-3">Testimonials</p>
          <h2 className="lux-heading-sm mb-6">Voices from Bengaluru celebrations</h2>
          <p className="lux-body text-sm md:text-base mb-10">
            We invite you to read verified feedback on Google rather than placeholder reviews on
            this site. When you are ready to plan, our team is a WhatsApp message away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn-primary text-sm"
            >
              See Google reviews
            </a>
            <Link
              href="/reviews"
              className="text-lux-gold text-sm font-medium hover:underline underline-offset-4"
            >
              Reviews page →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const featured = data.reviews.slice(0, 3);

  return (
    <section className="lux-section bg-lux-surface" aria-labelledby="home-reviews-heading">
      <div className="lux-container">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <p className="lux-eyebrow mb-3">What families say</p>
            <h2 id="home-reviews-heading" className="lux-heading-sm">
              {data.rating.toFixed(1)} out of 5 on Google
            </h2>
            <div className="mt-5 flex flex-col items-center gap-2">
              <Stars rating={data.rating} size="md" />
              <p className="text-sm text-lux-secondary">
                From {data.total} review{data.total === 1 ? '' : 's'} across Bengaluru
              </p>
            </div>
          </div>
        </FadeIn>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 list-none p-0 m-0">
          {featured.map((review, index) => (
            <li key={`${review.author}-${review.datePublished}`}>
              <FadeIn delay={index * 0.05}>
                <figure className="lux-panel p-6 md:p-7 h-full flex flex-col">
                  <Stars rating={review.rating} className="mb-4" />
                  <blockquote className="text-[0.9375rem] text-lux-secondary font-light leading-[1.8] flex-1 line-clamp-6">
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
              </FadeIn>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link href="/reviews" className="lux-btn-secondary text-sm">
            All reviews
          </Link>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lux-btn-secondary text-sm"
          >
            See us on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
