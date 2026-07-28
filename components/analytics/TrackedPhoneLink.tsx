'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackPhoneClick } from '@/lib/analytics/events';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  /** Identifies which CTA was clicked, e.g. "footer", "home_contact_primary". */
  source: string;
  children: ReactNode;
};

/**
 * Drop-in replacement for a `tel:` `<a>` link. Renders and behaves
 * identically to a plain anchor — only adds `phone_click` tracking.
 */
export default function TrackedPhoneLink({ href, source, onClick, children, ...rest }: Props) {
  return (
    <a
      href={href}
      onClick={(e) => {
        trackPhoneClick(source);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
