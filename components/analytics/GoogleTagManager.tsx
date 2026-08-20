import Script from 'next/script';
import { GA_MEASUREMENT_ID, GTM_ID, isAnalyticsEnabled } from '@/lib/analytics/config';

/**
 * Loads Google Tag Manager (and, through it, GA4). Renders nothing outside
 * of production or when `NEXT_PUBLIC_GTM_ID` is unset, so GTM never loads
 * during local development.
 *
 * Uses `lazyOnload` (not `afterInteractive`) so gtm.js / gtag.js do not
 * contend with LCP on mobile. Analytics still fire after `window.load`.
 * The inline bootstrap stays async — never a synchronous head script.
 */
export default function GoogleTagManager() {
  if (!isAnalyticsEnabled()) return null;

  return (
    <>
      {/*
        Seed the GA4 Measurement ID onto the dataLayer *before* GTM loads, so
        the GA4 Configuration tag inside GTM can reference it via a Data
        Layer Variable (e.g. {{DLV - GA4 Measurement ID}}) instead of a
        hardcoded ID in the GTM web console. See docs/analytics.md.
      */}
      <Script id="gtm-datalayer-seed" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ga4MeasurementId: ${JSON.stringify(GA_MEASUREMENT_ID)} });`}
      </Script>
      <Script id="gtm-init" strategy="lazyOnload">
        {`(function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),
      dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
