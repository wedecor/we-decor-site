import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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