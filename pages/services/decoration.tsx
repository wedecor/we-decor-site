import Layout from '../../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';

export default function DecorationServicePage() {
  return (
    <>
      <Head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Decoration',
              name: 'Decoration Services',
              description:
                'Event planning and party decor for all occasions in Bangalore. Theme-based, wedding, party, stage, birthday, devotional, and floral decorations.',
              provider: {
                '@type': 'Organization',
                name: 'We Decor',
                areaServed: 'Bangalore, India',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Bangalore',
                  addressCountry: 'IN',
                },
                telephone: '+917019169442',
              },
              areaServed: {
                '@type': 'City',
                name: 'Bangalore',
              },
            }),
          }}
        />
      </Head>
      <Layout
        seo={{
          title: 'Decoration Services in Bangalore | We Decor',
          description:
            "Discover We Decor's event decoration services in Bangalore: weddings, parties, corporate events, and more. Theme-based, floral, stage, and custom decorations.",
        }}
      >
        <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Decoration Services
          </h1>
          <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">
            We Decor offers a complete range of decoration services for every occasion. Whether
            you’re planning a birthday, wedding, haldi, or corporate event, our team brings your
            vision to life with creativity and attention to detail.
          </p>
          <p className="text-gray-800 dark:text-white mb-4">Our decoration services include:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
            <li>Birthday Decoration</li>
            <li>Wedding Decoration</li>
            <li>Haldi Decoration</li>
            <li>Stage Decoration</li>
            <li>Party Decoration</li>
            <li>Devotional Decoration</li>
            <li>Floral Decoration</li>
            <li>Corporate Event Decoration</li>
            <li>Room Decoration</li>
            <li>Tent & Balloon Setup</li>
            <li>Baby Shower Decoration</li>
            <li>Inauguration Ceremonies</li>
          </ul>
          <p className="text-gray-800 dark:text-white mb-8">
            From simple and elegant to grand and thematic, we tailor our decorations to your
            preferences and budget. Let us transform your event space into something truly
            memorable!
          </p>
          <div className="text-center">
            <Link href="/services" className="text-blue-600 hover:underline">
              Back to Services
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
