import Head from "next/head";
import { SITE_URL } from "../lib/site";

interface SeoHeadProps {
  title?: string;
  description?: string;
  // canonicalPath should begin with "/", no trailing slash
  canonicalPath?: string; // e.g. "/locations/whitefield"
  image?: string;
  type?: string;
  schemaMarkup?: any;
}

// SeoHead injects SEO meta tags, Open Graph, Twitter cards, and JSON-LD for each page
export default function SeoHead({
  title,
  description,
  canonicalPath,
  image,
  type = "website",
  schemaMarkup,
}: SeoHeadProps) {
  const siteName = "We Decor";
  // Build canonical URL using SITE_URL and canonicalPath, ensuring no trailing slash
  const canonical = canonicalPath 
    ? `${SITE_URL}${canonicalPath.replace(/\/+$/, '')}` 
    : SITE_URL;
  
  // 🔄 Newly Added: Use metaImage for consistent image usage across all meta tags
  const metaImage = image || "/logo.png";
  
  return (
    <Head>
      {/* Page title for browser and SEO */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      {/* Meta description for SEO */}
      {description && <meta name="description" content={description} />}
      {/* Canonical URL for duplicate content avoidance */}
      <link rel="canonical" href={canonical} />
      
      {/* PWA Manifest */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#10b981" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="We Decor" />
      
      {/* Local SEO meta tags */}
      <meta name="geo.region" content="IN-KA" />
      <meta name="geo.placename" content="Bangalore" />
      <meta name="geo.position" content="12.9716;77.5946" />
      <meta name="ICBM" content="12.9716, 77.5946" />
      
      {/* Open Graph tags for rich link previews on Facebook, WhatsApp, etc. */}
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      {/* 🔄 Newly Added: og:image uses metaImage, which is pulled from frontmatter.image if present */}
      <meta property="og:image" content={metaImage} />
      {/* Twitter card tags for Twitter link previews */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description} />
      {/* 🔄 Newly Added: twitter:image uses metaImage for consistency */}
      <meta name="twitter:image" content={metaImage} />
      {/* JSON-LD structured data - use custom schema if provided, otherwise default */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaMarkup || {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "We Decor",
            image: metaImage,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bangalore",
              addressRegion: "Karnataka",
              addressCountry: "IN",
            },
            telephone: "+918880544452",
            url: canonical,
            description: description,
            areaServed: {
              "@type": "City",
              name: "Bangalore"
            },
            openingHours: "Mo-Su 09:00-21:00",
            review: {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: "5" },
              author: { "@type": "Person", name: "Happy Customer" },
            },
            service: [
              { "@type": "Service", name: "Birthday Decoration" },
              { "@type": "Service", name: "Wedding Decor" },
              { "@type": "Service", name: "Haldi Decoration" },
              { "@type": "Service", name: "Tent & Balloon Setup" },
            ],
          }),
        }}
      />
    </Head>
  );
}
