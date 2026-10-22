import { CONTACT } from '@/lib/contact';
import { OPENING_HOURS } from '@/lib/local-seo/constants';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import TrackedPhoneLink from '@/components/analytics/TrackedPhoneLink';

export default function HomeContact() {
  const tel = CONTACT.telLinks();

  return (
    <section className="lux-section bg-lux-bg">
      <div className="lux-container">
        <div className="mb-10">
          <p className="lux-eyebrow mb-3">Connect</p>
          <h2 className="lux-heading-sm">Speak with our team</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="lux-surface p-8 flex flex-col">
            <p className="text-sm text-lux-secondary mb-2">Primary</p>
            <TrackedPhoneLink
              href={`tel:${tel[0].raw}`}
              source="home_contact_primary"
              className="font-display text-2xl text-lux-gold hover:underline"
            >
              {tel[0].label}
            </TrackedPhoneLink>
            <div className="mt-auto pt-6 flex min-h-11 items-center">
              <TrackedWhatsAppLink
                href={CONTACT.waUrlForHome()}
                source="home_contact"
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary text-sm w-fit"
              >
                WhatsApp
              </TrackedWhatsAppLink>
            </div>
          </div>
          <div className="lux-surface p-8 flex flex-col">
            <p className="text-sm text-lux-secondary mb-2">Secondary</p>
            <TrackedPhoneLink
              href={`tel:${tel[1].raw}`}
              source="home_contact_secondary"
              className="font-display text-2xl text-lux-ivory hover:text-lux-gold"
            >
              {tel[1].label}
            </TrackedPhoneLink>
            <p className="mt-auto pt-6 flex min-h-11 items-center text-sm text-lux-secondary">
              {OPENING_HOURS.displayHome}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
