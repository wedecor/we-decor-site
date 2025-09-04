import type { Metadata } from "next";
import { JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Professional Photographers in Bangalore | We Decor",
  description: "Capture your most important moments with our professional photographers. Wedding, event, and portrait photography in Bangalore.",
  alternates: { canonical: "/services/photographers" },
  openGraph: {
    title: "Professional Photographers in Bangalore | We Decor",
    description: "Capture your most important moments with our professional photographers.",
    url: "/services/photographers",
    images: ["/services/photography.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Photographers in Bangalore | We Decor",
    description: "Capture your most important moments with our professional photographers.",
    images: ["/services/photography.jpg"],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Professional Photographers',
  description: 'Capture your most important moments with our professional photographers.',
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
  serviceType: 'Photography Services',
  offers: {
    '@type': 'Offer',
    description: 'Wedding photography, event photography, portrait sessions, and special occasions'
  }
};

export default function PhotographersPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Photographers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Capture your most important moments with our professional photographers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Photography Services:
            </h2>
            <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                Wedding Photography
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                Event Photography
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                Portrait Sessions
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                Corporate Events
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                Pre-wedding Shoots
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                Family & Group Photos
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-800/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Professional Photography
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our professional photographers use state-of-the-art equipment and techniques to capture every precious moment. We deliver high-quality photos that you'll treasure forever.
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Book your session</strong> and let us capture your special moments with professional expertise.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Capture Memories?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Contact us to book your photography session and let our professionals capture your most important moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
            >
              Book Now
            </a>
            <a
              href="tel:+918880544452"
              className="border border-teal-600 text-teal-600 dark:text-teal-400 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors duration-200"
            >
              Call +91 88805 44452
            </a>
          </div>
        </div>
      </main>
    </>
  );
}