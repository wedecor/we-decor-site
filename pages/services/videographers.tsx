import Layout from '../../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';

export default function VideographersServicePage() {
  return (
    <>
      <Head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Videographers',
              name: 'Videographers Services',
              description:
                'Professional videographers for events in Bangalore: weddings, parties, corporate events, and more. Dynamic, impactful videos.',
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
          title: 'Videographers in Bangalore | We Decor',
          description:
            'We Decor offers professional videographers for events in Bangalore: weddings, parties, corporate events, and more. Dynamic, impactful videos.',
        }}
      >
        <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Videographers
          </h1>
          <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">
            Our talented videographers create dynamic, impactful videos for all types of events. We
            use the latest equipment and techniques to capture every important moment.
          </p>
          <p className="text-gray-800 dark:text-white mb-4">Our videography services include:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
            <li>Wedding Videography</li>
            <li>Event Videography</li>
            <li>Corporate Videos</li>
          </ul>
          <p className="text-gray-800 dark:text-white mb-8">
            Let us tell your story through cinematic video that you and your guests will enjoy for
            years to come.
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
