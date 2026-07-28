import type { ReactNode } from 'react';
import Link from 'next/link';
import PageHero from '@/components/lux/PageHero';
import FadeIn from '@/components/lux/FadeIn';
import { CONTACT } from '@/lib/contact';
import TrackedPhoneLink from '@/components/analytics/TrackedPhoneLink';
import SiteBreadcrumbs from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import { PARTNER_SERVICE_LINKS, RELATED_DECORATION_SERVICES } from '@/lib/seo/internal-links';

export type PartnerServiceConfig = {
  title: string;
  description: string;
  listTitle: string;
  items: string[];
  highlightTitle: string;
  highlightBody: string;
  highlightNote: string;
  ctaTitle: string;
  ctaBody: string;
};

type Props = {
  config: PartnerServiceConfig;
  schema?: ReactNode;
  /** Canonical path for breadcrumbs (e.g. /services/catering). */
  path: string;
};

export default function PartnerServicePage({ config, schema, path }: Props) {
  const tel = CONTACT.PRIMARY_NUMBER;

  return (
    <>
      {schema}
      <div className="lux-page">
        <div className="lux-container pt-[calc(var(--nav-height)+1.5rem)] pb-2">
          <SiteBreadcrumbs
            withSchema
            items={[
              { name: 'Home', href: '/' },
              { name: 'Services', href: '/services' },
              { name: config.title, href: path },
            ]}
          />
        </div>
        <PageHero
          eyebrow="Partner services"
          title={config.title}
          description={config.description}
        />

        <section className="lux-section pt-6 pb-24 md:pb-32 bg-lux-bg">
          <div className="lux-container">
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start mb-20">
              <FadeIn>
                <h2 className="lux-heading-sm mb-8">{config.listTitle}</h2>
                <ul className="space-y-5">
                  {config.items.map((item) => (
                    <li key={item} className="flex items-start gap-4 text-lux-muted font-light">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lux-gold/80"
                        aria-hidden
                      />
                      <span className="text-base md:text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn delay={0.08}>
                <div className="lux-panel p-8 md:p-10 h-full">
                  <h3 className="font-display text-2xl text-lux-ivory mb-4">
                    {config.highlightTitle}
                  </h3>
                  <p className="lux-body text-sm md:text-base mb-6">{config.highlightBody}</p>
                  <p className="text-sm text-lux-text-muted leading-relaxed border-t border-white/[0.06] pt-6">
                    {config.highlightNote}
                  </p>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.1}>
              <CoreExploreLinks
                context="partner"
                related={[
                  ...PARTNER_SERVICE_LINKS.filter((l) => l.href !== path),
                  ...RELATED_DECORATION_SERVICES.slice(0, 2),
                ]}
                relatedTitle="Related services"
                showLocalities
                pageKey={`partner-${path.replace('/services/', '')}`}
                className="mb-4 border-0 lux-section-tight lux-section-alt"
              />
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="lux-panel p-10 md:p-14 text-center max-w-2xl mx-auto">
                <h2 className="lux-heading-sm mb-4">{config.ctaTitle}</h2>
                <p className="lux-body mb-10">{config.ctaBody}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="lux-btn-primary">
                    Enquire online
                  </Link>
                  <TrackedPhoneLink
                    href={`tel:${tel}`}
                    source="partner_service_page"
                    className="lux-btn-secondary"
                  >
                    Call {CONTACT.primary.display}
                  </TrackedPhoneLink>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  );
}
