import Layout from '../../components/Layout'
import Link from 'next/link'
import Head from 'next/head';
import Script from 'next/script';

export default function DecorationServicePage() {
  return (
    <>
      <Head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Decoration",
            "name": "Decoration Services",
            "description": "Event planning and party decor for all occasions in Bangalore. Theme-based, wedding, party, stage, birthday, devotional, and floral decorations.",
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
          }) }}
        />
      </Head>
      <Layout
        seo={{
          title: "Decoration Services in Bangalore | We Decor",
          description: "Discover We Decor's event decoration services in Bangalore: weddings, parties, corporate events, and more. Theme-based, floral, stage, and custom decorations.",
        }}
      >
        <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">Decoration Services</h1>
          <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">Explore event planning and party decor with We Decor. Discover unparalleled event ideas, organized and well planned by our experts. Beauty lies in the eyes of the beholder, but at We Decor we make beauty come alive with our intricate array of decoration.</p>
          <p className="text-gray-800 dark:text-white mb-4">Whether you’re looking for a humble garnish or an elaborate royal adornment, we bring your vision to life. We handle decorations for weddings, corporate events, inaugurations, baby showers, and more. Our categories include:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
            <li>Theme-based decorations</li>
            <li>Wedding decorations</li>
            <li>Party decorations</li>
            <li>Stage decorations</li>
            <li>Birthday decorations</li>
            <li>Devotional decorations</li>
            <li>Floral decorations</li>
          </ul>
          <p className="text-gray-800 dark:text-white mb-8">For each category, we focus on the finest details to create the most exquisite and grand event you’re looking forward to. Rest assured as we set the pace based on your demand and our creative proposals—all within your budget.</p>
          <div className="text-center">
            <Link href="/services" className="text-blue-600 hover:underline">Back to Services</Link>
          </div>
        </section>
      </Layout>
    </>
  )
} 