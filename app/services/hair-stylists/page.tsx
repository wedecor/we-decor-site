import type { Metadata } from "next";
import { JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Expert Hair Stylists in Bangalore | We Decor",
  description: "Expert hair styling for your special day or event. Professional hair services in Bangalore.",
  alternates: { canonical: "/services/hair-stylists" },
  openGraph: {
    title: "Expert Hair Stylists in Bangalore | We Decor",
    description: "Expert hair styling for your special day or event.",
    url: "/services/hair-stylists",
    images: ["/services/hair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Hair Stylists in Bangalore | We Decor",
    description: "Expert hair styling for your special day or event.",
    images: ["/services/hair.jpg"],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Expert Hair Stylists',
  description: 'Expert hair styling for your special day or event.',
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
  serviceType: 'Hair Styling Services',
  offers: {
    '@type': 'Offer',
    description: 'Wedding hair styling, party hairstyles, corporate events, and special occasions'
  }
};

export default function HairStylistsPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Expert Hair Stylists
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert hair styling for your special day or event.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Hair Services:
            </h2>
            <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Wedding Hair Styling
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Party & Event Hairstyles
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Corporate Event Styling
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Special Occasion Styling
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Bridal Hair Trials
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Group Hair Services
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-800/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Professional Hair Styling
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our expert hair stylists create beautiful, long-lasting hairstyles that complement your look and occasion. We work with all hair types and lengths.
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Book your appointment</strong> and let our stylists create the perfect hairstyle for your special day.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready for Perfect Hair?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Contact us to book your hair styling session and let our expert stylists create the perfect look for your event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              Book Now
            </a>
            <a
              href="tel:+918880544452"
              className="border border-indigo-600 text-indigo-600 dark:text-indigo-400 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-200"
            >
              Call +91 88805 44452
            </a>
          </div>
        </div>
      </main>
    </>
  );
}