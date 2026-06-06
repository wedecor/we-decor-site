import Link from 'next/link';
import type { Metadata } from 'next';
import { CLUSTERS } from '../_data/clusters';
import { AREAS, BUSINESS_NAME, CITY, PHONE_DISPLAY } from '../_data/locations';
import { absoluteUrl, pageMetadata } from '@/lib/metadata';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildCollectionPageSchema } from '@/lib/local-seo';
import { CONTACT } from '@/lib/contact';
import PageHero from '@/components/lux/PageHero';

export const metadata: Metadata = pageMetadata({
  path: '/locations',
  title: 'Areas We Serve | We Decor — Event Decorators in Bangalore',
  description:
    'We Decor serves Bengaluru across North, South, East, Central and West Bangalore. Explore Koramangala, Whitefield, Indiranagar, Jayanagar, Hebbal, Malleshwaram and more.',
  ogImage: '/og-banner.webp',
});

const areaNameBySlug = new Map(AREAS.map((a) => [a.slug, a.name]));

function ClusterSection({
  keyId,
  title,
  blurb,
  areaSlugs,
  mentions,
  index,
}: {
  keyId: string;
  title: string;
  blurb: string;
  areaSlugs: string[];
  mentions: string[];
  index: number;
}) {
  const alt = index % 2 === 1;

  return (
    <section
      id={keyId}
      className={`scroll-mt-28 py-16 md:py-20 px-6 ${alt ? 'bg-lux-elevated' : 'bg-lux-bg'}`}
    >
      <div className="lux-container">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="lux-heading-sm">{title}</h2>
          <a
            href="#top"
            className="text-sm text-lux-secondary hover:text-lux-gold transition-colors"
          >
            Back to top
          </a>
        </div>
        <p className="lux-body mb-12 max-w-2xl">{blurb}</p>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
          {areaSlugs.map((slug) => {
            const areaName = areaNameBySlug.get(slug);
            if (!areaName) return null;

            return (
              <li key={slug}>
                <Link
                  href={`/locations/${slug}`}
                  className="lux-panel lux-panel-hover block p-7 md:p-8 h-full group"
                >
                  <h3 className="font-display text-xl text-lux-ivory group-hover:text-lux-gold transition-colors">
                    {areaName}
                  </h3>
                  <p className="text-sm text-lux-secondary mt-3 leading-relaxed">
                    Curated home, apartment, and venue decor across {areaName}.
                  </p>
                  <span className="inline-block mt-6 text-[10px] tracking-tagline uppercase text-lux-gold/75">
                    Explore locality →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {mentions?.length ? (
          <p className="mt-10 text-sm text-lux-secondary">
            <span className="text-lux-ivory/90">Also nearby:</span> {mentions.join(', ')}.
          </p>
        ) : null}
      </div>
    </section>
  );
}

export default function LocationsHubPage() {
  return (
    <div className="lux-page" id="top">
      <PageHero
        eyebrow="Bengaluru coverage"
        title="Areas we serve"
        description={`Discover decoration across ${CITY} — each locality page includes services, recent setups, and booking for ${BUSINESS_NAME}.`}
      >
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} className="lux-btn-secondary">
            Call {PHONE_DISPLAY}
          </a>
          <a
            href={CONTACT.waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="lux-btn-primary"
          >
            WhatsApp
          </a>
        </div>
      </PageHero>

      <nav aria-label="Regions" className="lux-container px-6 -mt-4 mb-4">
        <div className="lux-surface p-6 md:p-8">
          <p className="lux-eyebrow mb-4">Regions</p>
          <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
            {CLUSTERS.map((c) => (
              <li key={c.key}>
                <a href={`#${c.key}`} className="lux-filter-pill lux-filter-pill-inactive">
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {CLUSTERS.map((c, i) => (
        <ClusterSection
          key={c.key}
          keyId={c.key}
          title={c.title}
          blurb={c.blurb}
          areaSlugs={c.areaSlugs}
          mentions={c.mentions}
          index={i}
        />
      ))}

      <section className="lux-section bg-lux-bg">
        <div className="lux-container">
          <div className="lux-panel p-10 md:p-14 text-center max-w-2xl mx-auto">
            <h2 className="lux-heading-sm mb-4">Ready to book?</h2>
            <p className="lux-body mb-10">
              Share your locality and date — we respond with themes and pricing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={CONTACT.waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary"
              >
                WhatsApp
              </a>
              <Link href="/contact" className="lux-btn-secondary">
                Contact form
              </Link>
            </div>
          </div>
          <SchemaScript
            data={buildCollectionPageSchema({
              name: `Areas We Serve — ${CITY}`,
              pageUrl: absoluteUrl('/locations'),
              localityUrls: AREAS.map((a) => ({ name: a.name, slug: a.slug })),
            })}
          />
        </div>
      </section>
    </div>
  );
}
