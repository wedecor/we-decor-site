import type { Metadata } from "next";
import { JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Professional Videographers in Bangalore | We Decor",
  description: "Dynamic, impactful event videos for weddings, parties, and more. Professional videography services in Bangalore.",
  alternates: { canonical: "/services/videographers" },
  openGraph: {
    title: "Professional Videographers in Bangalore | We Decor",
    description: "Dynamic, impactful event videos for weddings, parties, and more.",
    url: "/services/videographers",
    images: ["/services/videography.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Videographers in Bangalore | We Decor",
    description: "Dynamic, impactful event videos for weddings, parties, and more.",
    images: ["/services/videography.jpg"],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Professional Videographers',
  description: 'Dynamic, impactful event videos for weddings, parties, and more.',
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
  serviceType: 'Videography Services',
  offers: {
    '@type': 'Offer',
    description: 'Wedding videography, event videos, corporate videos, and special occasions'
  }
};

export default function VideographersPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Videographers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dynamic, impactful event videos for weddings, parties, and more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Videography Services:
            </h2>
            <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                Wedding Videography
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                Event Video Coverage
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                Corporate Videos
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                Pre-wedding Videos
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                Highlight Reels
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                Live Event Streaming
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-800/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Professional Videography
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our professional videographers create dynamic, cinematic videos that tell your story beautifully. We use advanced equipment and editing techniques to deliver stunning results.
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Book your session</strong> and let us create memorable videos of your special moments.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Create Amazing Videos?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Contact us to book your videography session and let our professionals create dynamic videos of your event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors duration-200"
            >
              Book Now
            </a>
            <a
              href="tel:+918880544452"
              className="border border-rose-600 text-rose-600 dark:text-rose-400 px-8 py-3 rounded-lg font-semibold hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors duration-200"
            >
              Call +91 88805 44452
            </a>
          </div>
        </div>
      </main>
    </>
  );
}