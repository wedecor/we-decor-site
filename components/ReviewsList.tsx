import { fallbackTestimonials, getGoogleReviewsUrl } from '@/utils/googleReviews';

export default function ReviewsList() {
  const googleReviewsUrl = getGoogleReviewsUrl();

  return (
    <div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
        {fallbackTestimonials.map((t) => (
          <li key={t.name} className="lux-panel p-8 flex flex-col h-full">
            <div className="flex items-center mb-5">
              <div className="text-3xl mr-3" aria-hidden>
                {t.avatar}
              </div>
              <div>
                <p className="font-medium text-lux-ivory">{t.name}</p>
                {t.event ? <p className="text-xs text-lux-text-muted mt-0.5">{t.event}</p> : null}
                {t.date ? <p className="text-xs text-lux-text-muted mt-0.5">{t.date}</p> : null}
              </div>
            </div>
            <p className="font-display text-3xl text-lux-gold/30 leading-none mb-3" aria-hidden>
              &ldquo;
            </p>
            <p className="text-lux-muted leading-relaxed flex-1 text-sm md:text-base">
              {t.feedback}
            </p>
            <div className="flex mt-5 gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
              {[...Array(t.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-lux-gold"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <p className="text-center mt-10">
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="lux-btn-primary inline-flex items-center text-sm"
        >
          View all reviews on Google →
        </a>
      </p>
    </div>
  );
}
