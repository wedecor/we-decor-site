'use client';

import Link from 'next/link';
import { CONTACT } from '@/lib/contact';
import { AREAS } from '@/app/(site)/_data/locations';

type Props = { locality: string };

export default function ContactCard({ locality }: Props) {
  const areaData = AREAS.find((area) => area.name.toLowerCase() === locality.toLowerCase());
  const waPrefill = areaData?.waPrefill;
  const wa = waPrefill ? CONTACT.waUrl(waPrefill) : CONTACT.waUrlForLocality(locality);
  const telLinks = CONTACT.telLinks();

  return (
    <section className="lux-panel p-8 md:p-10 mb-14">
      <h3 className="font-display text-2xl text-lux-ivory mb-3">Book decoration in {locality}</h3>
      <p className="lux-body text-sm md:text-base mb-8">
        Call or message on WhatsApp — we share themes and pricing for your locality.
      </p>
      <div className="flex flex-wrap gap-4">
        <a href={`tel:${telLinks[0].raw}`} className="lux-btn-secondary text-sm">
          {telLinks[0].label}
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="lux-btn-primary text-sm">
          WhatsApp
        </a>
        <Link
          href={`/contact?area=${encodeURIComponent(locality.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}`}
          className="lux-btn-secondary text-sm"
        >
          Enquiry form
        </Link>
      </div>
    </section>
  );
}
