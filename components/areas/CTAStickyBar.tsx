'use client';

import { CONTACT } from '@/lib/contact';

type Props = { locality: string };

export default function CTAStickyBar({ locality }: Props) {
  const wa = CONTACT.waUrlForLocality(locality);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.06] px-4 py-4 backdrop-blur-xl bg-lux-bg/95">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-lux-ivory">Decor in {locality}</p>
          <p className="text-xs text-lux-text-muted">Instant themes & pricing on WhatsApp</p>
        </div>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="lux-btn-primary text-sm shrink-0"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
