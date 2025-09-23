import React from 'react';
import { WHATSAPP_PRIMARY, CONTACT_PRIMARY } from '@/lib/site';

export default function StickyCTA() {
  const telHref = `tel:${CONTACT_PRIMARY.replace(/\D/g, '')}`;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="mx-auto mb-3 max-w-screen-sm">
        <div className="mx-3 rounded-xl bg-white/95 dark:bg-[#0f3d3e]/95 backdrop-blur shadow-lg ring-1 ring-emerald-500/20">
          <div className="flex divide-x divide-emerald-500/10">
            <a
              href={telHref}
              className="w-1/2 py-3 text-center text-white bg-emerald-600 hover:bg-emerald-700 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 rounded-l-xl"
            >
              Call
            </a>
            <a
              href={WHATSAPP_PRIMARY}
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 py-3 text-center text-white bg-emerald-600 hover:bg-emerald-700 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 rounded-r-xl"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
