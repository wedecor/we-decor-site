import type { Metadata } from "next";
import { JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Mehndi Artists in Bangalore | We Decor",
  description: "Intricate mehndi designs for all events and festivals. Professional mehndi artists in Bangalore.",
  alternates: { canonical: "/services/mehndi-artists" },
  openGraph: {
    title: "Mehndi Artists in Bangalore | We Decor",
    description: "Intricate mehndi designs for all events and festivals.",
    url: "/services/mehndi-artists",
    images: ["/services/mehndi.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehndi Artists in Bangalore | We Decor",
    description: "Intricate mehndi designs for all events and festivals.",
    images: ["/services/mehndi.jpg"],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mehndi Artists',
  description: 'Intricate mehndi designs for all events and festivals.',
  provider: {
    '@type': 'Organization',
    name: 'We Decor',
    url: 'https://www.wedecorevents.com',
    telephone: '+91 88805 44452',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressCountry: 'IN'
    }
  },
  areaServed: {
    '@type': 'City',
    name: 'Bangalore'
  },
  serviceType: 'Mehndi Art Services',
  offers: {
    '@type': 'Offer',
    description: 'Wedding mehndi, festival designs, party mehndi, and special occasions'
  }
};

export default function MehndiArtistsPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mehndi Artists
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Intricate mehndi designs for all events and festivals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Mehndi Services:
            </h2>
            <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Wedding Mehndi Designs
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Festival Mehndi Art
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Party & Event Mehndi
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Bridal Mehndi Sessions
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Group Mehndi Services
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Custom Design Consultations
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Intricate Mehndi Art
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our skilled mehndi artists create beautiful, intricate designs using traditional and contemporary patterns. We use high-quality henna for long-lasting, rich color.
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Book your session</strong> and let our artists create stunning mehndi designs for your special occasion.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready for Beautiful Mehndi?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Contact us to book your mehndi session and let our expert artists create intricate designs for your event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-200"
            >
              Book Now
            </a>
            <a
              href="tel:+918880544452"
              className="border border-amber-600 text-amber-600 dark:text-amber-400 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors duration-200"
            >
              Call +91 88805 44452
            </a>
          </div>
        </div>
      </main>
    </>
  );
}