'use client';

import dynamic from 'next/dynamic';

const StickyWhatsApp = dynamic(() => import('@/components/StickyWhatsApp'), {
  ssr: false,
  loading: () => null,
});

const WebVitalsReporter = dynamic(() => import('@/components/WebVitalsReporter'), {
  ssr: false,
  loading: () => null,
});

const AnalyticsPageView = dynamic(() => import('@/components/analytics/AnalyticsPageView'), {
  ssr: false,
  loading: () => null,
});

/**
 * Below-the-fold / non-SEO client islands deferred out of the initial JS graph.
 * Must live in a Client Component — `next/dynamic` + `ssr:false` is illegal in RSC.
 */
export default function DeferredClientWidgets() {
  return (
    <>
      <StickyWhatsApp />
      <WebVitalsReporter />
      <AnalyticsPageView />
    </>
  );
}
