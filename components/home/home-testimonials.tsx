import Link from 'next/link';
import { getGoogleReviewsUrl } from '@/utils/googleReviews';

/**
 * Home testimonials CTA — no fabricated quotes or star ratings.
 */
export default function HomeTestimonials() {
  const googleReviewsUrl = getGoogleReviewsUrl();

  return (
    <section className="lux-section bg-lux-surface">
      <div className="lux-container max-w-2xl mx-auto text-center">
        <p className="lux-eyebrow mb-3">Testimonials</p>
        <h2 className="lux-heading-sm mb-6">Voices from Bengaluru celebrations</h2>
        <p className="lux-body text-sm md:text-base mb-10">
          We invite you to read verified feedback on Google rather than placeholder reviews on this
          site. When you are ready to plan, our team is a WhatsApp message away.
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
