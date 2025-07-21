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
          <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">We Decor provides an assortment of beauty service professionals, highly specialized in the fashioning and treatment of hair. Our hair stylists are equipped with the latest tools and trends to give you the perfect look.</p>
          <p className="text-gray-800 dark:text-white mb-4">From cuts and colors to braids and styling, we offer flexible, customer-focused hair services for your special event—all at compelling prices. Our stylists have strong communication and customer service skills to deliver your desired look.</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
            <li>Shampoo, cut, color, and style</li>
            <li>Braids, weaves, bleach, and dye</li>
            <li>Current trends and flexible hours</li>
          </ul>
          <div className="text-center">
            <Link href="/services" className="text-blue-600 hover:underline">Back to Services</Link>
          </div>
        </section>
      </Layout>
    </>
  )
} 