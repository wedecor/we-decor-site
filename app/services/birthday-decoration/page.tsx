import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Birthday Decoration Services in Bangalore | We Decor',
  description: 'Make birthdays unforgettable with our creative decor services in Bangalore. Professional birthday party decorations, themes, and setups.',
  openGraph: {
    title: 'Birthday Decoration Services in Bangalore | We Decor',
    description: 'Make birthdays unforgettable with our creative decor services in Bangalore.',
    images: ['/services/birthday.JPG'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Birthday Decoration Services in Bangalore | We Decor',
    description: 'Make birthdays unforgettable with our creative decor services in Bangalore.',
    images: ['/services/birthday.JPG'],
  },
  alternates: {
    canonical: '/services/birthday-decoration',
  },
};

export default function BirthdayDecorationPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Birthday Decoration',
    name: 'Birthday Decoration Services',
    description: 'Make birthdays unforgettable with our creative decor services in Bangalore.',
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Birthday Decoration Services</h1>
            <p className="text-xl md:text-2xl mb-8">
              Make every birthday celebration magical and memorable
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Why Choose Our Birthday Decorations?</h2>
                <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-3">🎈</span>
                    Creative themes and color schemes
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-3">🎂</span>
                    Custom cake table decorations
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-3">🎉</span>
                    Balloon arrangements and backdrops
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-3">✨</span>
                    Photo booth setups
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-4 dark:text-white">Get Your Quote</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Contact us for a personalized birthday decoration quote
                </p>
                <a
                  href="/contact"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors inline-block"
                >
                  Get Free Quote
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}