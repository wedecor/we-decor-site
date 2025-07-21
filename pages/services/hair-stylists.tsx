import Layout from '../../components/Layout'
import Link from 'next/link'
import Head from 'next/head';
import Script from 'next/script';

export default function HairStylistsServicePage() {
  return (
    <>
      <Head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Hair Stylists",
            "name": "Hair Stylists Services",
            "description": "Professional hair styling for events in Bangalore: cuts, colors, braids, and more. Latest trends and flexible service.",
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
          title: "Hair Stylists in Bangalore | We Decor",
          description: "We Decor offers professional hair styling for events in Bangalore: cuts, colors, braids, and more. Latest trends and flexible service.",
        }}
      >
        <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">Hair Stylists</h1>
          <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">Our expert hair stylists offer a wide range of services to help you achieve the perfect look for any event. We use the latest tools and trends to ensure your hair is styled to perfection.</p>
          <p className="text-gray-800 dark:text-white mb-4">Our hair styling services include:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
            <li>Haircut & Styling</li>
            <li>Braids, Weaves, Bleach, Dye</li>
            <li>Event-specific Styling</li>
          </ul>
          <p className="text-gray-800 dark:text-white mb-8">From classic cuts to creative styles, our team will work with you to create a look that matches your personality and the occasion.</p>
          <div className="text-center">
            <Link href="/services" className="text-blue-600 hover:underline">Back to Services</Link>
          </div>
        </section>
      </Layout>
    </>
  )
} 