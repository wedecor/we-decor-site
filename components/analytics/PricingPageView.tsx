'use client';

import { useEffect } from 'react';
import { trackPricingVisit } from '@/lib/analytics/events';

/**
 * Fires a `pricing_visit` event once when the pricing page mounts.
 * Renders nothing and has no effect on layout or UX.
 */
export default function PricingPageView() {
  useEffect(() => {
    trackPricingVisit();
  }, []);

  return null;
}
