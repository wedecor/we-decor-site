import Link from 'next/link';
import { CONTACT } from '@/lib/contact';

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
          <a
            href={CONTACT.waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="lux-btn-primary"
          >
            Chat on WhatsApp
          </a>
          <Link href="/contact" className="lux-btn-secondary">
            Send an enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
