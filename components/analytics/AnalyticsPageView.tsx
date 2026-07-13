'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics/events';

function AnalyticsPageViewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the very first render: GTM's own container-load trigger already
    // accounts for the initial page view. Tracking it again here would
    // create a duplicate `page_view` event in GA4.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!pathname) return;
    const query = searchParams?.toString();
    trackPageView(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Tracks client-side (SPA) route changes as GA4 "virtual" page views via
 * GTM. The initial page load is intentionally NOT tracked here — GTM
 * already fires a page view when its container loads on first paint. Only
 * subsequent in-app navigations are sent, avoiding double-counted landing
 * pages.
 *
 * Wrapped in its own `Suspense` boundary (required for `useSearchParams` in
 * the App Router) so it never forces the rest of the tree into client-side
 * rendering or breaks static generation of pages that use this in a shared
 * layout.
 */
export default function AnalyticsPageView() {
  return (
    <Suspense fallback={null}>
      <AnalyticsPageViewInner />
    </Suspense>
  );
}
