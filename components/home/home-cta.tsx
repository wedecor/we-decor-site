import Link from 'next/link';
import { CONTACT } from '@/lib/contact';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';

export default function HomeCta() {
  return (
    <section className="lux-section lux-section-elevated border-y border-white/[0.06]">
      <div className="lux-container text-center max-w-3xl mx-auto">
        <p className="lux-eyebrow mb-3">Begin your celebration</p>
        <h2 className="lux-heading-sm mb-4">Tell us the date. We&apos;ll design the atmosphere.</h2>
        <p className="lux-body mb-8">
          Share your venue, guest count, and the feeling you want. We respond on WhatsApp with ideas
          and a clear quote — usually within a few hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <TrackedWhatsAppLink
            href={CONTACT.waUrlForHome()}
            source="home_cta"
            target="_blank"
            rel="noopener noreferrer"
            className="lux-btn-primary"
          >
            Chat on WhatsApp
          </TrackedWhatsAppLink>
          <Link href="/contact" className="lux-btn-secondary">
            Send an enquiry
          </Link>
        </div>
        <p className="mt-7 text-sm text-lux-secondary">
          Packages start from <span className="text-lux-gold-soft font-medium">₹2,999</span> —{' '}
          <Link
            href="/pricing"
            className="text-lux-gold hover:underline underline-offset-4 font-medium"
          >
            view full pricing
          </Link>
        </p>
      </div>
    </section>
  );
}
