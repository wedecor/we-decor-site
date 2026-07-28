import { getGoogleReviewsUrl } from '@/utils/googleReviews';

/**
 * Testimonials CTA — no fabricated quotes or star ratings.
 */
export default function Testimonials() {
  const googleReviewsUrl = getGoogleReviewsUrl();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="lux-panel p-8 md:p-10">
        <p className="lux-body text-sm md:text-base mb-8">
          Customer ratings and written reviews are shown on Google when available. We do not display
          placeholder star scores on this site.
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
