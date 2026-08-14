import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import { pageMetadata } from '@/lib/metadata';
import { CONTACT } from '@/lib/contact';
import { formatPostalAddressText } from '@/lib/schema/_helpers';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildContactPageGraph, withBreadcrumb } from '@/lib/schema';
import SiteBreadcrumbs, { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';

const ContactFormClient = nextDynamic(() => import('@/components/contact/ContactFormClient'), {
  loading: () => (
    <div className="space-y-8 py-4" aria-busy="true" aria-label="Loading enquiry form">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="h-10 border-b border-white/[0.08] animate-pulse" />
      ))}
    </div>
  ),
});

export const metadata: Metadata = pageMetadata({
  path: '/contact',
  title: 'Contact | Event Decoration Services in Bangalore',
  description: `Contact We Decor for professional event decoration services in Bangalore. WhatsApp: ${CONTACT.primary.display}. Birthday, wedding, haldi, and corporate event decorations.`,
});

export const dynamic = 'force-static';

const CRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
];

export default function ContactPage() {
  return (
    <div className="lux-page relative overflow-hidden">
      <SchemaScript
        data={withBreadcrumb(
          buildContactPageGraph({
            name: 'Contact We Decor Events',
            description: `Contact We Decor for professional event decoration services in Bangalore. WhatsApp: ${CONTACT.primary.display}. Birthday, wedding, haldi, and corporate event decorations.`,
          }),
          siteBreadcrumbsToSchemaItems(CRUMBS)
        )}
      />
      <div
        className="lux-ambient-glow w-[420px] h-[420px] -top-32 right-0"
        style={{ background: 'rgba(200, 169, 107, 0.06)' }}
        aria-hidden
      />

      <div className="lux-container pt-[calc(var(--nav-height)+1.5rem)] pb-2 relative z-10">
        <SiteBreadcrumbs items={CRUMBS} />
      </div>

      <section className="lux-section-tight pt-0 pb-14 md:pb-16 border-b border-white/[0.08] relative z-10 lux-section-glow">
        <div className="lux-container-narrow">
          <div className="lux-reveal">
            <p className="lux-eyebrow mb-6">Private enquiries</p>
            <h1 className="font-display text-[2.25rem] md:text-[2.85rem] font-light text-lux-ivory tracking-tight leading-[1.14] max-w-md">
              Begin your consultation
            </h1>
            <p className="lux-body mt-7 max-w-md">
              Tell us the date, venue, and atmosphere you envision. We respond with a thoughtful
              proposal — most enquiries receive a reply within a few hours.
            </p>
            <address className="lux-body-sm mt-6 max-w-md not-italic text-lux-secondary">
              {formatPostalAddressText()}
            </address>
            <div className="lux-divider mt-10 max-w-[8rem]" />
          </div>
        </div>
      </section>

      <section className="lux-section-tight pt-14 md:pt-16 pb-28 md:pb-36 relative z-10">
        <div className="lux-container max-w-2xl">
          <div className="lux-reveal lux-reveal-delay-1">
            <p className="lux-eyebrow mb-8">Inquiry form</p>
            <ContactFormClient />
          </div>
          <p className="lux-body-sm mt-12 text-center md:text-left">
            Prefer a direct line?{' '}
            <TrackedWhatsAppLink
              href={CONTACT.waUrl()}
              source="contact_page"
              className="text-lux-gold hover:text-lux-gold-soft transition-colors duration-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp {CONTACT.primary.display}
            </TrackedWhatsAppLink>
          </p>
        </div>
      </section>
    </div>
  );
}
