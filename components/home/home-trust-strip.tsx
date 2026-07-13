import Link from 'next/link';
import { CONTACT } from '@/lib/contact';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';

/**
 * Above-the-fold trust strip. Figures mirror the existing, published claims on
 * `/about` (500+ Events Decorated, 75+ Five-Star Reviews, 25+ Bangalore Areas
 * Served) — nothing here is a new or independently-fabricated number. Each
 * item doubles as a natural internal link to the page that substantiates it.
 */
const trustItems = [
  { value: '500+', label: 'events decorated', href: '/gallery' },
  { value: '75+', label: 'five-star reviews', href: '/reviews' },
  { value: '25+', label: 'Bangalore areas served', href: '/locations' },
] as const;

export default function HomeTrustStrip() {
  return (
    <section aria-label="Why families trust We Decor" className="border-b border-white/[0.08]">
      <div className="lux-container py-8 md:py-10">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 list-none p-0 m-0 text-center">
          {trustItems.map((item, i) => (
            <li key={item.label} className="flex items-center gap-3">
              {i > 0 ? (
                <span className="text-lux-gold/30" aria-hidden>
                  ·
                </span>
              ) : null}
              <Link
                href={item.href}
                className="text-sm text-lux-secondary transition-colors duration-500 hover:text-lux-ivory"
              >
                <span className="text-lux-gold-soft font-medium">{item.value}</span> {item.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-3">
            <span className="text-lux-gold/30" aria-hidden>
              ·
            </span>
            <TrackedWhatsAppLink
              href={CONTACT.waUrlForHome()}
              source="home_trust_strip"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-lux-secondary transition-colors duration-500 hover:text-lux-ivory"
            >
              <span className="text-lux-gold-soft font-medium">WhatsApp</span> replies within hours
            </TrackedWhatsAppLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
