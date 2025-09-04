import type { Metadata } from "next";
import { JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Professional Make-up Artists in Bangalore | We Decor",
  description: "Professional make-up for weddings, parties, and corporate events. Expert beauty services in Bangalore.",
  alternates: { canonical: "/services/makeup-artists" },
  openGraph: {
    title: "Professional Make-up Artists in Bangalore | We Decor",
    description: "Professional make-up for weddings, parties, and corporate events.",
    url: "/services/makeup-artists",
    images: ["/services/makeup.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Make-up Artists in Bangalore | We Decor",
    description: "Professional make-up for weddings, parties, and corporate events.",
    images: ["/services/makeup.jpg"],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Professional Make-up Artists',
  description: 'Professional make-up for weddings, parties, and corporate events.',
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
  serviceType: 'Make-up Services',
  offers: {
    '@type': 'Offer',
    description: 'Wedding make-up, party make-up, corporate events, and special occasions'
  }
};

export default function MakeupArtistsPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Make-up Artists
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional make-up for weddings, parties, and corporate events.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Make-up Services:
            </h2>
            <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Wedding Make-up
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Party & Event Make-up
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Corporate Event Styling
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Special Occasion Make-up
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Bridal Trial Sessions
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Group Make-up Services
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Expert Beauty Services
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our professional make-up artists are skilled in creating stunning looks for any occasion. We use high-quality products and stay updated with the latest beauty trends.
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Book your session</strong> and let our experts enhance your natural beauty for your special day.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Look Your Best?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Contact us to book your make-up session and let our professional artists create the perfect look for your event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
            >
              Book Now
            </a>
            <a
              href="tel:+918880544452"
              className="border border-purple-600 text-purple-600 dark:text-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200"
            >
              Call +91 88805 44452
            </a>
          </div>
        </div>
      </main>
    </>
  );
}