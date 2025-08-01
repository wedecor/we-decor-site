import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-84ZEGJ7DD1';
  const isProduction = process.env.NODE_ENV === 'production';
  
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://browser.sentry-cdn.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        
        {/* Service Worker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
        
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
        
        {/* Sentry Browser SDK - Only in production */}
        {isProduction && (
          <>
            <script
              src="https://browser.sentry-cdn.com/7.92.0/bundle.tracing.min.js"
              integrity="sha384-+Qw6Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw=="
              crossOrigin="anonymous"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  Sentry.init({
                    dsn: 'https://your-sentry-dsn@sentry.io/project-id',
                    tracesSampleRate: 1.0,
                    environment: 'production',
                  });
                `,
              }}
            />
          </>
        )}
        
        {/* Base meta tags */}
        <meta name="description" content="We Decor – Bangalore's trusted wedding and event decorators. Elegant haldi, birthday, and stage decor starting from ₹2999." />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="We Decor" />
        <meta name="theme-color" content="#10B981" />
        
        {/* Open Graph */}
        <meta property="og:title" content="We Decor - Bringing Dreams to Life" />
        <meta property="og:description" content="Bangalore's trusted decor experts for weddings, birthdays, haldi, and more. Professional event decoration services starting from ₹2999." />
        <meta property="og:image" content="https://www.wedecorevents.com/og-banner.jpg" />
        <meta property="og:url" content="https://www.wedecorevents.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="We Decor" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="We Decor - Bringing Dreams to Life" />
        <meta name="twitter:description" content="Bangalore's trusted decor experts for weddings, birthdays, haldi, and more." />
        <meta name="twitter:image" content="https://www.wedecorevents.com/og-banner.jpg" />
        
        {/* Additional SEO */}
        <meta name="keywords" content="wedding decoration, birthday decoration, haldi decoration, event decorators, Bangalore decorators, stage decoration, tent setup, balloon decoration" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.wedecorevents.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 