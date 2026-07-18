import React from 'react';
import { WHATSAPP_PRIMARY, CONTACT_PRIMARY } from '@/lib/site';

export default function StickyCTA() {
  const telHref = `tel:${CONTACT_PRIMARY.replace(/\D/g, '')}`;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="mx-auto mb-3 max-w-screen-sm">
        <div className="mx-3 rounded-xl bg-white/95 dark:bg-[#1e3a5f]/95 backdrop-blur shadow-[0_4px_24px_rgba(26,77,62,0.12)] ring-1 ring-[#1e3a5f]/15 dark:ring-white/10">
          <div className="flex divide-x divide-[#1e3a5f]/10 dark:divide-white/10">
            <a
              href={telHref}
              className="w-1/2 py-3 text-center text-white bg-[#b76e7a] hover:bg-[#c98a94] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b76e7a] rounded-l-xl transition-colors"
            >
              Call
            </a>
            <a
              href={WHATSAPP_PRIMARY}
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 py-3 text-center text-white bg-[#1e3a5f] hover:bg-[#162544] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1e3a5f] rounded-r-xl transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
