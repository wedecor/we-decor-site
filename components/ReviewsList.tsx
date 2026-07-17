import { getGoogleReviewsUrl } from '@/utils/googleReviews';

/**
 * Reviews list without fabricated quotes or star ratings.
 * Directs visitors to Google when live Places data is not wired.
 */
export default function ReviewsList() {
  const googleReviewsUrl = getGoogleReviewsUrl();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="lux-panel p-8 md:p-10">
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
