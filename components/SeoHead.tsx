import Head from "next/head";

// SeoHead injects SEO meta tags, Open Graph, Twitter cards, and JSON-LD for each page
export default function SeoHead({
  title,
  description,
  url,
  image,
  type = "website",
}) {
  const siteName = "We Decor";
  const canonical = url || "https://wedecor.in";
  // 🔄 Newly Added: Use metaImage for consistent image usage across all meta tags
  const metaImage = image || "/logo.png";
  return (
    <Head>
      {/* Page title for browser and SEO */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      {/* Meta description for SEO */}
      <meta name="description" content={description} />
      {/* Canonical URL for duplicate content avoidance */}
      <link rel="canonical" href={canonical} />
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
      {/* 🔄 Newly Added: JSON-LD structured data for LocalBusiness, used by Google for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "We Decor",
            image: metaImage,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bangalore",
              addressCountry: "IN",
            },
            telephone: "+91-9999999999",
            url: canonical,
            description: description,
            review: {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: "5" },
              author: { "@type": "Person", name: "Happy Customer" },
            },
            service: [
              { "@type": "Service", name: "Birthday Decoration" },
              { "@type": "Service", name: "Wedding Decor" },
            ],
          }),
        }}
      />
    </Head>
  );
}
