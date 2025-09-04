import type { Metadata } from "next";
import { JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Catering Services in Bangalore | We Decor",
  description: "We Decor provides a full spectrum of catering services for all types of events. Our experienced team ensures delicious food and seamless service, so you can focus on your celebration.",
  alternates: { canonical: "/services/catering" },
  openGraph: {
    title: "Catering Services in Bangalore | We Decor",
    description: "We Decor provides a full spectrum of catering services for all types of events.",
    url: "/services/catering",
    images: ["/services/catering.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catering Services in Bangalore | We Decor",
    description: "We Decor provides a full spectrum of catering services for all types of events.",
    images: ["/services/catering.jpg"],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Catering Services',
  description: 'We Decor provides a full spectrum of catering services for all types of events. Our experienced team ensures delicious food and seamless service.',
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
  serviceType: 'Catering Services',
  offers: {
    '@type': 'Offer',
    description: 'Veg Catering, Non-Veg Catering, Sweets & Desserts, Regional and Custom Menus'
  }
};

export default function CateringPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Catering Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We Decor provides a full spectrum of catering services for all types of events. Our experienced team ensures delicious food and seamless service, so you can focus on your celebration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Catering Options Include:
            </h2>
            <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Veg Catering
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Non-Veg Catering
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Sweets & Desserts
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Regional and Custom Menus
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Customized Experience
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              From traditional Indian feasts to contemporary world cuisines, we tailor our menu to your preferences and dietary needs. Let us delight your guests with a memorable dining experience!
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Contact us today</strong> for a personalized catering quote that fits your event perfectly.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Plan Your Event?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Contact us for a free consultation and let us create the perfect catering experience for your special day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200"
            >
              Get Free Quote
            </a>
            <a
              href="tel:+918880544452"
              className="border border-orange-600 text-orange-600 dark:text-orange-400 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors duration-200"
            >
              Call +91 88805 44452
            </a>
          </div>
        </div>
      </main>
    </>
  );
}