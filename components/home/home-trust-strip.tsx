import Link from 'next/link';
import { CONTACT } from '@/lib/contact';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import { SERVED_AREA_COUNT } from '@/lib/local-seo/locality-count';
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '@/lib/local-seo/constants';

/**
 * Above-the-fold trust strip — reinforces the homepage SERP promise (price floor,
 * verified rating, event count, and locality reach).
 */
const trustItems = [
  { value: 'From ₹3,000', label: 'transparent packages', href: '/pricing' },
  { value: `${GOOGLE_RATING}★`, label: `${GOOGLE_REVIEW_COUNT}+ Google reviews`, href: '/reviews' },
  { value: '500+', label: 'events decorated', href: '/gallery' },
  { value: String(SERVED_AREA_COUNT), label: 'Bangalore areas served', href: '/locations' },
] as const;

export default function HomeTrustStrip() {
  return (
    <section aria-label="Why families trust We Decor" className="border-b border-white/[0.08]">
      <div className="lux-container py-8 md:py-10">
        <ul className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-3 gap-y-2 list-none p-0 m-0 text-center">
          {trustItems.map((item, i) => (
            <li key={item.label} className="flex items-center gap-3">
              {i > 0 ? (
                <span className="hidden sm:inline text-lux-gold/30" aria-hidden>
                  ·
                </span>
              ) : null}
              <Link
                href={item.href}
                className="text-sm text-lux-secondary whitespace-nowrap transition-colors duration-500 hover:text-lux-ivory"
              >
                <span className="text-lux-gold-soft font-medium">{item.value}</span> {item.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-3">
            <span className="hidden sm:inline text-lux-gold/30" aria-hidden>
              ·
            </span>
            <TrackedWhatsAppLink
              href={CONTACT.waUrlForHome()}
              source="home_trust_strip"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-lux-secondary whitespace-nowrap transition-colors duration-500 hover:text-lux-ivory"
            >
              <span className="text-lux-gold-soft font-medium">WhatsApp</span> replies within hours
            </TrackedWhatsAppLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
