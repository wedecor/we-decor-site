'use client';

import { useEffect, useState } from 'react';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import { readLeadWhatsAppUrl } from '@/lib/services/leads/thankYouHandoff';

/**
 * WhatsApp button on /thank-you. When the visitor arrived from the enquiry
 * form, it carries their pre-filled enquiry (handed off via sessionStorage)
 * so one tap sends it — a real click, so no popup blocker gets in the way.
 * Otherwise it is the plain WhatsApp link rendered on the server.
 */
export default function ThankYouWhatsAppLink({
  fallbackHref,
  className,
}: {
  fallbackHref: string;
  className?: string;
}) {
  const [href, setHref] = useState(fallbackHref);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    const url = readLeadWhatsAppUrl();
    if (url) {
      setHref(url);
      setPrefilled(true);
    }
  }, []);

  return (
    <TrackedWhatsAppLink
      href={href}
      source={prefilled ? 'thank_you_prefilled' : 'thank_you'}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {prefilled ? 'Send your enquiry on WhatsApp' : 'WhatsApp us'}
    </TrackedWhatsAppLink>
  );
}
