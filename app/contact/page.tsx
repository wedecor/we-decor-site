import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import { pageMetadata } from '@/lib/metadata';
import { CONTACT } from '@/lib/contact';
import { formatPostalAddressText } from '@/lib/schema/_helpers';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildContactPageGraph, withBreadcrumb } from '@/lib/schema';
import SiteBreadcrumbs, { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import { getEventTypeOptions } from '@/lib/services/leads/eventTypeOptions';
import { AREAS_FOR_FORM } from '@/lib/services/leads/formAreas';

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
// Event types come from the app; refresh the static page hourly.
export const revalidate = 3600;

const CRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
];

export default async function ContactPage() {
  const eventTypes = await getEventTypeOptions();

  return (
    <div className="lux-page" data-has-sticky-wa>
      <SchemaScript
        data={withBreadcrumb(
          buildContactPageGraph({
            name: 'Contact We Decor Events',
            description: `Contact We Decor for professional event decoration services in Bangalore. WhatsApp: ${CONTACT.primary.display}. Birthday, wedding, haldi, and corporate event decorations.`,
          }),
          siteBreadcrumbsToSchemaItems(CRUMBS)
        )}
      />
      <div className="lux-container pb-2">
        <SiteBreadcrumbs items={CRUMBS} />
      </div>

      <section className="lux-section-tight pt-0 pb-14 md:pb-16 border-b border-white/[0.08]">
        <div className="lux-container">
          <div className="lux-reveal max-w-2xl">
            <p className="lux-eyebrow mb-6">Private enquiries</p>
            <h1 className="font-display text-[2.25rem] md:text-[2.85rem] font-light text-lux-ivory tracking-tight leading-[1.14]">
              Begin your consultation
            </h1>
            <p className="lux-body mt-7">
              Tell us the date, venue, and atmosphere you envision. We respond with a thoughtful
              proposal — most enquiries receive a reply within a few hours.
            </p>
            <address className="lux-body-sm mt-6 not-italic text-lux-secondary">
              {formatPostalAddressText()}
            </address>
            <div className="lux-divider mt-10 max-w-[8rem]" />
          </div>
        </div>
      </section>

      <section className="lux-section-tight pt-14 md:pt-16 pb-28 md:pb-36">
        <div className="lux-container">
          <div className="lux-reveal lux-reveal-delay-1 max-w-2xl">
            <p className="lux-eyebrow mb-8">Inquiry form</p>
            <ContactFormClient eventTypes={eventTypes} areas={AREAS_FOR_FORM} />
          </div>
          <p className="lux-body-sm mt-12 max-w-2xl">
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
