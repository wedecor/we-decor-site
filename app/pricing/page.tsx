import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { CONTACT } from '@/lib/contact';
import PageHero from '@/components/lux/PageHero';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import TrackedPhoneLink from '@/components/analytics/TrackedPhoneLink';
import PricingPageView from '@/components/analytics/PricingPageView';
import SiteBreadcrumbs, { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildPricingPageGraph, withBreadcrumb } from '@/lib/schema';
import {
  PRICING_CATEGORIES,
  PRICING_FACTORS,
  PRICING_FAQS,
  PRICING_PACKAGES,
} from '@/lib/content/pricing-tiers';

export const metadata: Metadata = pageMetadata({
  path: '/pricing',
  title: 'Decoration Packages & Prices in Bangalore — From ₹2,500',
  description:
    'Starting prices for wedding, engagement, haldi, baby shower, birthday & car decoration in Bangalore. Car from ₹2,500, birthday from ₹3,000, events from ₹5,000.',
});

const CRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Pricing', href: '/pricing' },
];

export default function PricingPage() {
  return (
    <div className="lux-page">
      <SchemaScript
        data={withBreadcrumb(
          buildPricingPageGraph({
            name: 'Decoration Packages & Prices in Bangalore',
            description:
              'Transparent starting prices for wedding, engagement, haldi, baby shower, birthday, and car decoration in Bangalore.',
          }),
          siteBreadcrumbsToSchemaItems(CRUMBS)
        )}
      />
      <PricingPageView />
      <div className="lux-container pb-2">
        <SiteBreadcrumbs items={CRUMBS} />
      </div>
      <PageHero
        eyebrow="Pricing & Packages · Bengaluru"
        title="Decoration Packages & Prices in Bangalore"
        description="Transparent starting prices. Free site visit. Serving all of Bangalore."
      >
        <p className="mt-4 text-xs md:text-sm text-lux-muted">
          <span className="text-lux-gold font-medium">4.9★ (82 Google reviews)</span> · Open 24
          hours · Free site visit across all 50+ Bengaluru neighbourhoods
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <TrackedWhatsAppLink
            href={CONTACT.waUrl(
              'Hi We Decor! I saw your pricing page and want a quote for ___ (event) on ___ (date) in ___ (area).'
            )}
            source="pricing_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="lux-btn-primary text-center"
            aria-label="Get a decoration quote on WhatsApp"
          >
            Get a quote
          </TrackedWhatsAppLink>
          <Link href="/services" className="lux-btn-secondary text-center">
            Explore all services
          </Link>
        </div>
      </PageHero>

      <section className="lux-section pt-0 pb-16 md:pb-20 lux-section-alt" aria-label="Packages">
        <div className="lux-container space-y-16">
          {PRICING_CATEGORIES.map((category) => {
            const items = PRICING_PACKAGES.filter((pkg) => pkg.category === category);
            const headingId = `pricing-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            return (
              <div key={category} aria-labelledby={headingId}>
                <h2 id={headingId} className="lux-heading-sm mb-8">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {items.map((pkg) => {
                    const formatted = pkg.priceFrom.toLocaleString('en-IN');
                    const prefill = `Hi We Decor, I'm interested in ${pkg.name} (from ₹${formatted}). Event date: ___ Location: ___`;
                    return (
                      <article
                        key={pkg.slug}
                        className="lux-surface p-7 md:p-8 flex flex-col justify-between gap-6 hover:border-lux-gold/25 transition-colors duration-300"
                      >
                        <div>
                          <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-display text-xl text-lux-ivory leading-snug">
                              {pkg.name}
                            </h3>
                          </div>
                          <p className="mt-3 font-display text-2xl text-lux-gold">
                            From ₹{formatted}
                          </p>
                          <p className="mt-3 text-sm text-lux-muted leading-relaxed">
                            {pkg.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-3">
                          <Link
                            href={pkg.servicePageHref}
                            className="text-sm text-lux-ivory hover:text-lux-gold transition-colors"
                            aria-label={`View designs for ${pkg.name}`}
                          >
                            View designs →
                          </Link>
                          <TrackedWhatsAppLink
                            href={CONTACT.waUrl(prefill)}
                            source={`pricing_card:${pkg.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lux-btn-secondary text-center text-xs py-2.5 px-4"
                            aria-label={`Get a WhatsApp quote for ${pkg.name}`}
                          >
                            WhatsApp for quote
                          </TrackedWhatsAppLink>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="lux-section bg-lux-bg border-t border-white/[0.06]"
        aria-labelledby="pricing-factors"
      >
        <div className="lux-container lux-measure">
          <p className="lux-eyebrow mb-3">How quotes work</p>
          <h2 id="pricing-factors" className="lux-heading-sm mb-8">
            What changes the price
          </h2>
          <ul className="space-y-4 text-sm md:text-base text-lux-secondary leading-relaxed">
            {PRICING_FACTORS.map((factor) => (
              <li key={factor.slice(0, 32)} className="flex gap-3">
                <span className="text-lux-gold/70 shrink-0" aria-hidden>
                  —
                </span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="lux-section lux-section-alt border-t border-white/[0.06]"
        aria-labelledby="pricing-faq"
      >
        <div className="lux-container lux-measure">
          <p className="lux-eyebrow mb-3">Pricing FAQs</p>
          <h2 id="pricing-faq" className="lux-heading-sm mb-10">
            Common pricing questions
          </h2>
          <dl className="space-y-8">
            {PRICING_FAQS.map((faq) => (
              <div key={faq.question} className="border-b border-white/[0.06] pb-6">
                <dt className="font-display text-lg md:text-xl text-lux-ivory">{faq.question}</dt>
                <dd className="mt-3 text-sm md:text-base text-lux-muted leading-relaxed">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 pt-8 border-t border-white/[0.06]">
            <p className="lux-body max-w-lg">
              Share your event date, Bengaluru locality, and space photos for a custom quote with no
              hidden charges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <TrackedWhatsAppLink
                href={CONTACT.waUrl(
                  'Hi We Decor! I checked your packages on /pricing and need a quote for ___ (event) on ___ (date) in ___ (area).'
                )}
                source="pricing_page_bottom"
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary text-center"
                aria-label="Request a quote on WhatsApp"
              >
                WhatsApp for quote
              </TrackedWhatsAppLink>
              <TrackedPhoneLink
                href={`tel:${CONTACT.PRIMARY_NUMBER}`}
                source="pricing_page_call"
                className="lux-btn-secondary text-center"
                aria-label={`Call ${CONTACT.primary.display}`}
              >
                Call {CONTACT.primary.display}
              </TrackedPhoneLink>
            </div>
          </div>
        </div>
      </section>

      <CoreExploreLinks context="hub" showLocalities pageKey="pricing" />
    </div>
  );
}
