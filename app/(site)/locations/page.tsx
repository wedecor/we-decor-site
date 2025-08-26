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
  alternates: { canonical: `${SITE}/locations` }
};

// Map slug → area name for quick lookups
const areaNameBySlug = new Map(AREAS.map(a => [a.slug, a.name]));

function ClusterSection({ keyId, title, blurb, areaSlugs, mentions }:{
  keyId: string, title: string, blurb: string, areaSlugs: string[], mentions: string[]
}) {
  return (
    <section id={keyId} className="scroll-mt-24">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Link href="#top" className="text-sm underline opacity-70">Back to top</Link>
      </div>
      <p className="mb-5 opacity-90">{blurb}</p>

      {/* Linked major areas */}
      <ul className="mb-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {areaSlugs.map(slug => {
          const areaName = areaNameBySlug.get(slug);
          if (!areaName) return null; // Skip if area doesn't exist
          
          return (
            <li key={slug} className="rounded-2xl border p-4">
              <div className="flex items-center justify-between gap-3">
                <Link href={`/locations/${slug}`} className="font-medium hover:underline">
                  {areaName}
                </Link>
                <Link href={`/locations/${slug}`} className="rounded-xl border px-3 py-1 text-sm">
                  View
                </Link>
              </div>
              <p className="mt-2 text-sm opacity-70">
                Serving home, apartment, clubhouse and venue decor in {areaName}.
              </p>
            </li>
          );
        })}
      </ul>

      {/* Mentions: plain text (no pages) */}
      {mentions?.length ? (
        <p className="mb-10 text-sm">
          <span className="font-medium">We also serve:</span>{' '}
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
      <main id="top" className="mx-auto max-w-6xl px-4 py-10 md:py-12 pt-20">
        {/* Hero */}
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl font-semibold">Event Decoration Across Bangalore — Areas We Serve</h1>
          <p className="mt-2 text-lg opacity-90">
            Explore our coverage across North, South, East, Central and West Bengaluru.
            Each area page includes local service details, photos and quick booking options.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} className="rounded-xl border px-4 py-2">Call</a>
            <a href={`https://wa.me/918880544452?text=Hi! I need decoration services in ${CITY}`} target="_blank" className="rounded-xl border px-4 py-2">WhatsApp</a>
            <Link href="/services" className="rounded-xl border px-4 py-2">See Services</Link>
          </div>
        </header>

        {/* In-page TOC */}
        <nav aria-label="Clusters" className="mb-8 rounded-2xl border p-4">
          <p className="mb-2 text-sm font-medium">Jump to a region:</p>
          <ul className="flex flex-wrap gap-3">
            {CLUSTERS.map(c => (
              <li key={c.key}>
                <a href={`#${c.key}`} className="rounded-full border px-3 py-1 text-sm hover:bg-neutral-50">
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Cluster sections */}
        <div className="space-y-10">
          {CLUSTERS.map(c => (
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
        <section className="mt-12 rounded-2xl border p-6">
          <h2 className="text-xl font-semibold mb-2">Ready to book Bangalore decor?</h2>
          <p className="mb-4 opacity-90">
            Tell us your area and event date — we'll share themes and pricing right away.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} className="rounded-xl border px-4 py-2">Call</a>
            <a href={`https://wa.me/918880544452?text=Hi! I need decoration services in ${CITY}`} target="_blank" className="rounded-xl border px-4 py-2">WhatsApp</a>
            <Link href="/contact" className="rounded-xl border px-4 py-2">Get a Quote</Link>
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
              hasPart: CLUSTERS.flatMap(c =>
                c.areaSlugs.map(slug => {
                  const areaName = areaNameBySlug.get(slug);
                  if (!areaName) return null;
                  
                  return {
                    '@type': 'WebPage',
                    url: `${SITE}/locations/${slug}`,
                    name: areaName
                  };
                }).filter(Boolean)
              )
            })
          }}
        />
      </main>
      <Footer />
    </>
  );
} 