import { CONTACT } from '@/lib/contact';

export default function HomeContact() {
  const tel = CONTACT.telLinks();

  return (
    <section className="lux-section bg-lux-bg">
      <div className="lux-container">
        <div className="text-center mb-10">
          <p className="lux-eyebrow mb-3">Connect</p>
          <h2 className="lux-heading-sm">Speak with our team</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="lux-surface p-8 text-center">
            <p className="text-sm text-lux-secondary mb-2">Primary</p>
            <a
              href={`tel:${tel[0].raw}`}
              className="font-display text-2xl text-lux-gold hover:underline"
            >
              {tel[0].label}
            </a>
            <a
              href={CONTACT.waUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 lux-btn-primary text-sm mx-auto w-fit"
            >
              WhatsApp
            </a>
          </div>
          <div className="lux-surface p-8 text-center">
            <p className="text-sm text-lux-secondary mb-2">Secondary</p>
            <a
              href={`tel:${tel[1].raw}`}
              className="font-display text-2xl text-lux-ivory hover:text-lux-gold"
            >
              {tel[1].label}
            </a>
            <p className="mt-4 text-sm text-lux-secondary">Bengaluru · Mon–Sun 9am–9pm</p>
          </div>
        </div>
      </div>
    </section>
  );
}
