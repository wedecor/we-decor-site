import Link from 'next/link';
import BrandWordmark from '@/components/lux/BrandWordmark';
import { CONTACT } from '@/lib/contact';
import { BRAND } from '@/lib/design/tokens';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import TrackedPhoneLink from '@/components/analytics/TrackedPhoneLink';
import TrackedCtaLink from '@/components/analytics/TrackedCtaLink';

export default function Footer() {
  const telLinks = CONTACT.telLinks();

  return (
    <footer className="lux-footer mt-auto relative z-10">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lux-gold/35 to-transparent"
        aria-hidden
      />
      <div className="lux-container px-6 md:px-10 py-20 md:py-28 relative z-[1]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5 space-y-7">
            <BrandWordmark asLink compact />
            <p className="font-display text-xl md:text-2xl font-light text-lux-ivory/95 italic leading-relaxed max-w-sm">
              Designed for unforgettable celebrations.
            </p>
            <p className="lux-body-sm max-w-xs text-lux-secondary">
              Luxury event decoration across {BRAND.city}.
            </p>
            <a
              href="https://instagram.com/wedecorbangalore"
              className="inline-flex items-center gap-3 rounded-full border border-lux-gold/25 bg-lux-elevated/40 px-5 py-3 text-sm text-lux-secondary hover:text-lux-ivory hover:border-lux-gold/45 hover:bg-lux-elevated/70 transition-all duration-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lux-muted/60 text-lux-gold">
                <svg width={15} height={15} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2a1 1 0 0 1 0-2z" />
                </svg>
              </span>
              @wedecorbangalore
            </a>
          </div>

          <nav className="md:col-span-3" aria-label="Footer navigation">
            <p className="lux-eyebrow mb-5">Explore</p>
            <ul className="space-y-3.5 text-sm font-light">
              {[
                ['About', '/about'],
                ['Services', '/services'],
                ['Gallery', '/gallery'],
                ['Locations', '/locations'],
                ['Pricing', '/pricing'],
                ['FAQ', '/faq'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="lux-footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="lux-eyebrow mb-5">Enquire</p>
            <ul className="space-y-3.5 text-sm font-light">
              <li>
                <TrackedPhoneLink
                  href={`tel:${telLinks[0].raw}`}
                  source="footer"
                  className="lux-footer-link"
                >
                  {telLinks[0].label}
                </TrackedPhoneLink>
              </li>
              <li>
                <TrackedWhatsAppLink
                  href={CONTACT.waUrl()}
                  source="footer"
                  className="lux-footer-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </TrackedWhatsAppLink>
              </li>
              <li>
                <TrackedCtaLink
                  href="/contact"
                  source="footer"
                  label="Contact form"
                  className="lux-footer-link"
                >
                  Contact form
                </TrackedCtaLink>
              </li>
              <li className="pt-2 lux-body-sm text-lux-text-muted">Bangalore · Mon–Sun, 9am–9pm</li>
            </ul>
          </div>
        </div>

        <div className="lux-divider mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-lux-secondary/80 font-light tracking-wide">
          <p>© {new Date().getFullYear()} We Decor Events</p>
          <p className="uppercase tracking-tagline text-lux-secondary/80">{BRAND.taglineDisplay}</p>
        </div>
      </div>
    </footer>
  );
}
