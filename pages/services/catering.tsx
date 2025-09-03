import Layout from '../../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';

export default function CateringServicePage() {
  return (
    <>
      <Head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Catering',
              name: 'Catering Services',
              description:
                'Catering services for events in Bangalore: diverse cuisines, menu planning, food and beverage management.',
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
          title: 'Catering Services in Bangalore | We Decor',
          description:
            'We Decor offers catering services for events in Bangalore: diverse cuisines, food and beverage management, and guest satisfaction.',
        }}
      >
        <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Catering Services
          </h1>
          <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">
            We Decor provides a full spectrum of catering services for all types of events. Our
            experienced team ensures delicious food and seamless service, so you can focus on your
            celebration.
          </p>
          <p className="text-gray-800 dark:text-white mb-4">Our catering options include:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
            <li>Veg Catering</li>
            <li>Non-Veg Catering</li>
            <li>Sweets & Desserts</li>
            <li>Regional and Custom Menus</li>
          </ul>
          <p className="text-gray-800 dark:text-white mb-8">
            From traditional Indian feasts to contemporary world cuisines, we tailor our menu to
            your preferences and dietary needs. Let us delight your guests with a memorable dining
            experience!
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
