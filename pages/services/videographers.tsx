import Layout from '../../components/Layout'
import Link from 'next/link'
import Head from 'next/head';
import Script from 'next/script';

export default function VideographersServicePage() {
  return (
    <>
      <Head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Videographers",
            "name": "Videographers Services",
            "description": "Professional videographers for events in Bangalore: weddings, parties, corporate events, and more. Dynamic, impactful videos.",
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
          title: "Videographers in Bangalore | We Decor",
          description: "We Decor offers professional videographers for events in Bangalore: weddings, parties, corporate events, and more. Dynamic, impactful videos.",
        }}
      >
        <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">Videographers</h1>
          <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">Our talented videographers use high-tech equipment and creative skills to capture your event’s true essence. From weddings to corporate events, we create dynamic, impactful videos that keep you and your guests emotionally engaged with every memory.</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
            <li>Weddings, corporate events, birthdays, and more</li>
            <li>Professional video editing and production</li>
            <li>Story-driven, cinematic videos</li>
          </ul>
          <div className="text-center">
            <Link href="/services" className="text-blue-600 hover:underline">Back to Services</Link>
          </div>
        </section>
      </Layout>
    </>
  )
} 