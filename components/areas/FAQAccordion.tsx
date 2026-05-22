'use client';

import { AREAS } from '@/app/(site)/_data/locations';

type FAQ = { q: string; a: string };

type Props = {
  faqs: FAQ[];
  locality: string;
};

export default function FAQAccordion({ faqs, locality }: Props) {
  const areaData = AREAS.find((area) => area.name.toLowerCase() === locality.toLowerCase());
  const uniqueFAQ = areaData?.uniqueFAQ;
  const displayFAQs = uniqueFAQ && uniqueFAQ.length > 0 ? uniqueFAQ : faqs;

  if (!displayFAQs?.length) return null;

  return (
    <section className="mb-14">
      <h2 className="lux-heading-sm mb-8">FAQs — {locality}</h2>
      <div className="space-y-4">
        {displayFAQs.map((f) => (
          <details
            key={f.q}
            className="group lux-accordion overflow-hidden transition-colors duration-500 hover:border-lux-gold/25"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-6 font-display text-lg font-light text-lux-ivory hover:text-lux-gold-soft transition-colors [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <span
                className="text-lux-gold transition-transform group-open:rotate-180"
                aria-hidden
              >
                ▾
              </span>
            </summary>
            <p className="px-7 pb-6 text-sm text-lux-muted leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
