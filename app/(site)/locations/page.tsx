import Link from 'next/link';
import type { Metadata } from 'next';
import { CLUSTERS } from '../_data/clusters';
import { AREAS, SITE, BUSINESS_NAME, CITY, PHONE_DISPLAY } from '../_data/locations';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata: Metadata = {
  title: 'Areas We Serve | We Decor — Event Decorators in Bangalore',
  description:
    'We Decor serves Bengaluru across North, South, East, Central and West Bangalore. Explore Koramangala, Whitefield, Indiranagar, Jayanagar, Hebbal, Malleshwaram and more.',
  alternates: { canonical: `${SITE}/locations` },
};

// Map slug → area name for quick lookups
const areaNameBySlug = new Map(AREAS.map((a) => [a.slug, a.name]));

function ClusterSection({
  keyId,
  title,
  blurb,
  areaSlugs,
  mentions,
}: {
  keyId: string;
  title: string;
  blurb: string;
  areaSlugs: string[];
  mentions: string[];
}) {
  return (
    <section id={keyId} className="scroll-mt-24">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <Link
          href="#top"
          className="text-sm underline opacity-70 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
        >
          Back to top
        </Link>
      </div>
      <p className="mb-5 opacity-90 text-gray-700 dark:text-gray-300">{blurb}</p>

      {/* Linked major areas */}
      <ul className="mb-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {areaSlugs.map((slug) => {
          const areaName = areaNameBySlug.get(slug);
          if (!areaName) return null; // Skip if area doesn't exist

          return (
            <li
              key={slug}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-3">
                <Link
                  href={`/locations/${slug}`}
                  className="font-medium hover:underline text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400"
                >
                  {areaName}
                </Link>
                <Link
                  href={`/locations/${slug}`}
                  className="rounded-xl border border-green-200 dark:border-green-700 px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  View
                </Link>
              </div>
              <p className="mt-2 text-sm opacity-70 text-gray-600 dark:text-gray-400">
                Serving home, apartment, clubhouse and venue decor in {areaName}.
              </p>
            </li>
          );
        })}
      </ul>

      {/* Mentions: plain text (no pages) */}
      {mentions?.length ? (
        <p className="mb-10 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium text-gray-700 dark:text-gray-300">We also serve:</span>{' '}
          {mentions.join(', ')}.
        </p>
      ) : null}
    </section>
  );
}

export default function LocationsHubPage() {
  return (
    <>
      <Navbar />
      <main
        id="top"
        className="pt-20 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          {/* Hero */}
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Event Decoration Across Bangalore — Areas We Serve
            </h1>
            <p className="mt-2 text-lg opacity-90 text-gray-700 dark:text-gray-300">
              Explore our coverage across North, South, East, Central and West Bengaluru. Each area
              page includes local service details, photos and quick booking options.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`}
                className="rounded-xl border border-green-200 dark:border-green-700 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                Call
              </a>
              <a
                href={`https://wa.me/918880544452?text=Hi! I need decoration services in ${CITY}`}
                target="_blank"
                className="rounded-xl border border-green-200 dark:border-green-700 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <Link
                href="/services"
                className="rounded-xl border border-green-200 dark:border-green-700 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                See Services
              </Link>
            </div>
          </header>

          {/* In-page TOC */}
          <nav
            aria-label="Clusters"
            className="mb-8 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow-sm"
          >
            <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Jump to a region:
            </p>
            <ul className="flex flex-wrap gap-3">
              {CLUSTERS.map((c) => (
                <li key={c.key}>
                  <a
                    href={`#${c.key}`}
                    className="rounded-full border border-gray-200 dark:border-gray-600 px-3 py-1 text-sm hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 transition-colors"
                  >
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cluster sections */}
          <div className="space-y-10">
            {CLUSTERS.map((c) => (
              <ClusterSection
                key={c.key}
                keyId={c.key}
                title={c.title}
                blurb={c.blurb}
                areaSlugs={c.areaSlugs}
                mentions={c.mentions}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <section className="mt-12 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Ready to book Bangalore decor?
            </h2>
            <p className="mb-4 opacity-90 text-gray-700 dark:text-gray-300">
              Tell us your area and event date — we'll share themes and pricing right away.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`}
                className="rounded-xl border border-green-200 dark:border-green-700 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                Call
              </a>
              <a
                href={`https://wa.me/918880544452?text=Hi! I need decoration services in ${CITY}`}
                target="_blank"
                className="rounded-xl border border-green-200 dark:border-green-700 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <Link
                href="/contact"
                className="rounded-xl border border-green-200 dark:border-green-700 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </section>

          {/* JSON-LD: CollectionPage */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Areas We Serve — Bangalore',
                hasPart: CLUSTERS.flatMap((c) =>
                  c.areaSlugs
                    .map((slug) => {
                      const areaName = areaNameBySlug.get(slug);
                      if (!areaName) return null;

                      return {
                        '@type': 'WebPage',
                        url: `${SITE}/locations/${slug}`,
                        name: areaName,
                      };
                    })
                    .filter(Boolean)
                ),
              }),
            }}
          />
        </div>
      </main>
      <Footer />

      {/* Sticky WhatsApp CTA */}
      <a
        href="https://wa.me/918880544452"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-400 to-pink-400 text-white px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-3 hover:from-green-500 hover:to-pink-500 hover:scale-105 transition transform duration-200 animate-pulse hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-cta"
        data-gtm="click-whatsapp"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48ZM12 22a10 10 0 1 1 10-10A10 10 0 0 1 12 22Zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.62.14-.71.9-.87 1.09-.32.21-.6.07a8.18 8.18 0 0 1-2.4-1.48 9.09 9.18 0 0 1-1.67-2.07c-.17-.29 0-.44.13-.58.13-.13.29-.34.43-.51a.52.52 0 0 0 .07-.54c-.07-.14-.62-1.5-.85-2.06s-.45-.45-.62-.46h-.53a1.06 1.06 0 0 0-.77.36A3.22 3.22 0 0 0 6.1 9.6c-.2.34-.3.74-.3 1.16a6.13 6.13 0 0 0 1.31 3.13 10.94 10.94 0 0 0 4.13 3.6c.58.25 1.15.41 1.54.53a3.7 3.7 0 0 0 1.7.11c.52-.08 1.65-.67 1.88-1.32s.23-1.21.16-1.32-.25-.19-.53-.33Z" />
        </svg>
        <span className="font-bold text-base hidden sm:inline">WhatsApp Us</span>
      </a>

      {/* Sticky Call Now CTA */}
      <a
        href="tel:+918880544452"
        className="fixed bottom-24 right-6 bg-gradient-to-r from-pink-400 to-green-400 text-white px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-3 hover:from-pink-500 hover:to-green-500 hover:scale-105 transition transform duration-200 animate-pulse hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
        id="callnow-cta"
        data-gtm="click-callnow"
        aria-label="Call us now"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.35.27 2.67.76 3.88a1 1 0 0 1-.21 1.11l-2.2 2.2Z" />
        </svg>
        <span className="font-bold text-base hidden sm:inline">Call Now</span>
      </a>
    </>
  );
}
