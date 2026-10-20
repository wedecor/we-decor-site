import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { CONTACT } from '@/lib/contact';
import { SITE_EMAIL } from '@/lib/site';
import PageHero from '@/components/lux/PageHero';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';

/**
 * Post-enquiry confirmation.
 *
 * Exists mainly as an unambiguous conversion anchor. GA4 already fires
 * `generate_lead` from the form, but an event alone is hard to audit — in
 * Sep 2026 the property showed "24 key events / 7 days" with no way to tell
 * whether those were real enquiries or page views someone had marked as key.
 * A dedicated URL is verifiable in GA4, Looker and Search Console at a glance.
 *
 * `noindex` — a confirmation page has no search value, and indexing it would
 * let people land here without having submitted anything.
 */
export const metadata: Metadata = pageMetadata({
  path: '/thank-you',
  title: 'Thank you — we have your enquiry',
  description: 'We have received your enquiry and will reply shortly.',
  noindex: true,
});

const STEPS = [
  {
    title: 'We read it properly',
    body: 'Your enquiry goes to Ilyas and Zakir directly, not to a queue. We look at the date, the venue and what you have described before replying.',
  },
  {
    title: 'We reply within a few hours',
    body: 'Usually on WhatsApp, because it is quicker for sharing photos and working through options. If you wrote in the evening, expect a reply the next morning.',
  },
  {
    title: 'We suggest a free site visit',
    body: 'For anything beyond a simple setup we would rather see the space first — lift access, ceiling height and power points change what is actually possible.',
  },
];

export default function ThankYouPage() {
  return (
    <div className="lux-page">
      <PageHero
        eyebrow="Enquiry received"
        title="Thank you — we have your details"
        description="Someone from We Decor will get back to you shortly. Here is what happens next."
      />

      <section className="lux-section-tight">
        <div className="mx-auto w-full max-w-[40rem]">
          <ol className="list-none p-0 m-0 space-y-10">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span
                  aria-hidden
                  className="shrink-0 font-display text-lux-gold text-2xl leading-none pt-1"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="font-display text-xl md:text-2xl text-lux-ivory font-light mb-2">
                    {step.title}
                  </h2>
                  <p className="text-lux-secondary font-light leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 pt-10 border-t border-white/[0.08]">
            <p className="text-lux-secondary font-light leading-relaxed mb-6">
              If it is urgent, or you would rather talk it through now, message us directly — we
              answer WhatsApp faster than anything else.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TrackedWhatsAppLink
                href={CONTACT.waUrl()}
                source="thank_you"
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary"
              >
                WhatsApp us
              </TrackedWhatsAppLink>
              <Link href="/gallery" className="lux-btn-secondary">
                Browse our work
              </Link>
            </div>
            <p className="mt-8 text-sm text-lux-text-muted font-light">
              Prefer email?{' '}
              <a href={`mailto:${SITE_EMAIL}`} className="lux-footer-link">
                {SITE_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
