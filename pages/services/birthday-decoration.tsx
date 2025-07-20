import Layout from '../../components/Layout'
import Head from 'next/head'
import Script from 'next/script'

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Birthday Decoration",
    "name": "Birthday Decoration Services",
    "description": "Make birthdays unforgettable with our creative decor services in Bangalore.",
    "provider": {
      "@type": "Organization",
      "name": "We Decor",
      "areaServed": "Bangalore, India",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressCountry": "IN"
      },
              "telephone": "+917019169442"
    },
    "areaServed": {
      "@type": "City",
      "name": "Bangalore"
    }
  };

  return (
    <>
      <Head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Layout
        seo={{
          title: "Birthday Decoration",
          description: "Make birthdays unforgettable with our creative decor services in Bangalore.",
          image: "/gallery/birthday1.webp",
        }}
      >
        <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 dark:text-white">
            Birthday Decoration
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            We Decor specializes in vibrant, creative birthday decorations for all ages. From balloon arches to themed setups, we make your celebration memorable.
          </p>
        </section>
      </Layout>
    </>
  )
} 