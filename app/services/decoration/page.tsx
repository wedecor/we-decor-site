import type { Metadata } from 'next';
import SchemaScript from '@/components/seo/SchemaScript';
import { pageMetadata } from '@/lib/metadata';
import { buildServicePageSchemaFromCore } from '@/lib/local-seo';

export const metadata: Metadata = pageMetadata({
  path: '/services/decoration',
  title: 'Event Decoration Services in Bangalore | We Decor Events',
  description:
    'Creative event and party decor for all occasions. Weddings, birthdays, haldi, and more. Professional decoration services in Bengaluru.',
  ogImage: '/services/decoration.jpg',
});

const structuredData = buildServicePageSchemaFromCore('theme-decoration');

export default function DecorationPage() {
  return (
    <>
      {structuredData ? <SchemaScript data={structuredData} /> : null}
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Event Decoration Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Creative event and party decor for all occasions. Weddings, birthdays, haldi, and more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
              Decoration Services Include:
            </h2>
            <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                Wedding &amp; Engagement Decor
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                Birthday &amp; Theme Parties
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                Haldi &amp; Traditional Ceremonies
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                Corporate &amp; Venue Styling
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-purple-100 dark:from-pink-900/20 dark:to-purple-800/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Custom Themes &amp; Backdrops
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              From balloon arches to floral mandaps, we design setups that match your vision and
              venue—homes, apartments, clubhouses, and banquet halls across Bangalore.
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Contact us today</strong> for a free decoration quote tailored to your
                event.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Decorate Your Event?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Contact us for a free consultation and let us bring your celebration to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-200"
            >
              Get Free Quote
            </a>
            <a
              href="tel:+919880544452"
              className="border border-pink-600 text-pink-600 dark:text-pink-400 px-8 py-3 rounded-lg font-semibold hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors duration-200"
            >
              Call +91 88805 44452
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
