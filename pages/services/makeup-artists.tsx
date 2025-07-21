import Layout from '../../components/Layout'
import Link from 'next/link'
import Head from 'next/head';
import Script from 'next/script';

export default function MakeupArtistsServicePage() {
  return (
    <>
      <Head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Make-up Artists",
            "name": "Make-up Artists Services",
            "description": "Professional make-up artists for weddings, parties, and events in Bangalore. Latest trends, top brands, and creative looks.",
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
          title: "Make-up Artists in Bangalore | We Decor",
          description: "We Decor provides professional make-up artists for weddings, parties, and events in Bangalore. Latest trends, top brands, and creative looks.",
        }}
      >
        <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">Make-up Artists</h1>
          <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">Our professional make-up artists help you look your best for any occasion. We use top brands and the latest techniques to create stunning looks that match your style and event.</p>
          <p className="text-gray-800 dark:text-white mb-4">Our make-up services include:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
            <li>Wedding Make-up</li>
            <li>Classic/Party Make-up</li>
            <li>Celebrity/Corporate Looks</li>
          </ul>
          <p className="text-gray-800 dark:text-white mb-8">Whether you want a natural glow or a glamorous transformation, our artists will ensure you feel confident and beautiful for your big day or special event.</p>
          <div className="text-center">
            <Link href="/services" className="text-blue-600 hover:underline">Back to Services</Link>
          </div>
        </section>
      </Layout>
    </>
  )
} 