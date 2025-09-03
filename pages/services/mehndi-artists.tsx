import Layout from '../../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';

export default function MehndiArtistsServicePage() {
  return (
    <>
      <Head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Mehndi Artists',
              name: 'Mehndi Artists Services',
              description:
                'Skilled mehndi artists for weddings, festivals, and events in Bangalore. Intricate designs and creative styles.',
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
          title: 'Mehndi Artists in Bangalore | We Decor',
          description:
            'We Decor offers skilled mehndi artists for weddings, festivals, and events in Bangalore. Intricate designs and creative styles.',
        }}
      >
        <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Mehndi Artists
          </h1>
          <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">
            Our skilled mehndi artists create beautiful, intricate designs for all occasions. We
            offer a variety of styles to suit your preferences and event theme.
          </p>
          <p className="text-gray-800 dark:text-white mb-4">Our mehndi services include:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
            <li>Bridal Mehndi</li>
            <li>Arabic Mehndi</li>
            <li>Jewellery Mehndi</li>
            <li>Simple/Traditional Designs</li>
          </ul>
          <p className="text-gray-800 dark:text-white mb-8">
            Let us adorn your hands and feet with stunning mehndi art that will be remembered long
            after your event is over.
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
