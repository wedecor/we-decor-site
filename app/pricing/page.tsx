import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { CONTACT } from '@/lib/contact';
import PageHero from '@/components/lux/PageHero';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import PricingPageView from '@/components/analytics/PricingPageView';
import SiteBreadcrumbs, { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildPricingPageGraph, withBreadcrumb } from '@/lib/schema';
import { PRICING_TIERS } from '@/lib/content/pricing-tiers';

export const metadata: Metadata = pageMetadata({
  path: '/pricing',
  title: 'Pricing',
  description:
    'Transparent pricing for event decorations in Bangalore—birthday, engagement, home celebrations.',
});

const experiences = PRICING_TIERS.map((tier) => ({
  name: tier.name,
  price: tier.priceLabel,
  desc: tier.description,
  features: [...tier.features],
  featured: 'featured' in tier ? tier.featured : false,
}));

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
            name: 'Event Decoration Pricing',
            description:
              'Transparent pricing for event decorations in Bangalore—birthday, engagement, home celebrations.',
          }),
          siteBreadcrumbsToSchemaItems(CRUMBS)
        )}
      />
      <PricingPageView />
      <div className="lux-container pt-[calc(var(--nav-height)+1.5rem)] pb-2">
        <SiteBreadcrumbs items={CRUMBS} />
      </div>
      <PageHero
        eyebrow="Investment"
        title="Curated experiences"
        description="Each celebration is composed individually. These are starting points for your private consultation."
      />

      <section
        className="lux-section pt-0 pb-16 md:pb-20 lux-section-alt"
        aria-labelledby="pricing-tiers"
      >
        <div className="lux-container max-w-3xl">
          <h2 id="pricing-tiers" className="lux-heading-sm text-center mb-12">
            Starting prices for Bengaluru celebrations
          </h2>
          <div className="space-y-0">
            {experiences.map((tier, i) => (
              <article
                key={tier.name}
                className={`lux-experience-block lux-reveal ${i > 0 ? `lux-reveal-delay-${Math.min(i, 2)}` : ''}`}
              >
                {'featured' in tier && tier.featured ? (
                  <p className="text-[10px] tracking-tagline uppercase text-lux-gold mb-4">
                    Most requested
                  </p>
                ) : (
                  <span className="block h-5" aria-hidden />
                )}
                <div className="lux-experience-header">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl md:text-[1.9rem] font-light text-lux-ivory">
                      {tier.name}
                    </h3>
                    <p className="lux-body mt-4 max-w-lg">{tier.desc}</p>
                  </div>
                  <div className="lux-experience-price-group pl-0 md:pl-6 md:border-l md:border-white/[0.08]">
                    <p className="lux-experience-from">Starting from</p>
                    <p className="lux-experience-price">{tier.price}</p>
                  </div>
                </div>
                <ul className="mt-8 space-y-2.5 text-sm text-lux-secondary font-light max-w-xl">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="text-lux-gold/60 shrink-0" aria-hidden>
                        —
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="lux-body text-center mt-20 max-w-md mx-auto">
            Every proposal is tailored to your venue, guest count, and creative ambition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <TrackedWhatsAppLink
              href={CONTACT.waUrl()}
              source="pricing_page"
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn-primary"
            >
              Request a consultation
            </TrackedWhatsAppLink>
            <Link href="/contact" className="lux-btn-secondary text-center">
              Private enquiry
            </Link>
          </div>
        </div>
      </section>
      <CoreExploreLinks context="hub" showLocalities pageKey="pricing" />
    </div>
  );
}
