import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-84ZEGJ7DD1"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-84ZEGJ7DD1');
            `,
          }}
        />
        {/* Sentry Browser SDK */}
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
              });
            `,
          }}
        />
        <meta name="description" content="We Decor – Bangalore’s trusted wedding and event decorators. Elegant haldi, birthday, and stage decor starting from ₹2999." />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="We Decor - Bringing Dreams to Life" />
        <meta property="og:description" content="Beautiful wedding, haldi, and birthday decor by We Decor in Bangalore." />
        <meta property="og:image" content="/og-banner.jpg" />
        <meta property="og:url" content="https://we-decor-site.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 