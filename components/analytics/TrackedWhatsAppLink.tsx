'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackQuoteRequest, trackWhatsAppClick } from '@/lib/analytics/events';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  /** Identifies which CTA was clicked, e.g. "home_hero", "footer", "location:koramangala". */
  source: string;
  children: ReactNode;
};

/**
 * Drop-in replacement for a WhatsApp `<a>` link. Renders and behaves
 * identically to a plain anchor — only adds `whatsapp_click` +
 * `quote_request` tracking (every WhatsApp CTA on this site represents a
 * quote request) before the browser navigates to WhatsApp. Never blocks,
 * delays, or otherwise changes navigation.
 */
export default function TrackedWhatsAppLink({ href, source, onClick, children, ...rest }: Props) {
  return (
    <a
      href={href}
      onClick={(e) => {
        trackWhatsAppClick(source);
        trackQuoteRequest(source);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
