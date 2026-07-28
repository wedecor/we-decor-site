'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics/events';

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    /** Identifies where the CTA lives, e.g. "navbar_desktop", "footer". */
    source: string;
    /** Human-readable label for the CTA, e.g. "Enquire", "Contact form". */
    label: string;
    children: ReactNode;
  };

/**
 * Drop-in replacement for an internal `next/link` CTA (e.g. navbar
 * "Enquire", footer "Contact form"). Adds a `cta_click` tracking event on
 * click; navigation behaves exactly like a plain `<Link>`.
 */
export default function TrackedCtaLink({ source, label, onClick, children, ...rest }: Props) {
  return (
    <Link
      onClick={(e) => {
        trackEvent('cta_click', { cta_source: source, cta_label: label });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
