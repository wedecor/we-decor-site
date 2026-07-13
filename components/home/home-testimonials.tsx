import { fallbackTestimonials, getGoogleReviewsUrl } from '@/utils/googleReviews';

export default function HomeTestimonials() {
  const featured = fallbackTestimonials.slice(0, 3);
  const googleReviewsUrl = getGoogleReviewsUrl();

  return (
    <section className="lux-section bg-lux-surface">
      <div className="lux-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="lux-eyebrow mb-3">Testimonials</p>
          <h2 className="lux-heading-sm">Voices from Bengaluru celebrations</h2>
        </div>
        <ul className="grid md:grid-cols-3 gap-6 list-none p-0 m-0">
          {featured.map((t) => (
            <li key={t.name} className="lux-panel p-9 flex flex-col h-full">
              <p className="font-display text-4xl text-lux-gold/40 leading-none mb-4" aria-hidden>
                &ldquo;
              </p>
              <p className="text-lux-secondary leading-relaxed flex-1 text-sm md:text-base">
                {t.feedback}
              </p>
              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <p className="font-medium text-lux-ivory">{t.name}</p>
                {t.event ? <p className="text-xs text-lux-muted mt-1">{t.event}</p> : null}
              </div>
            </li>
          ))}
        </ul>
        <p className="text-center mt-8">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lux-gold text-sm font-medium hover:underline underline-offset-4"
          >
            Read our Google reviews →
          </a>
        </p>
      </div>
    </section>
  );
}
