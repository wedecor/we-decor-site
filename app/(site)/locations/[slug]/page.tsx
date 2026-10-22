import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata';
import { AREAS, CITY, getAreaBySlug, SERVICES, type ServiceKey } from '../../_data/locations';
import { workHeading, workShownOn } from '../../_data/work-images';
import { workTiles } from '@/lib/work-tiles';
import { faqsForArea } from '../../_data/faqs';
import { getGeneratedArea, buildLocationMetaDescription } from '../../_data/location-content';
import { getLocalityPageMeta } from '../../_data/location-metadata';
import { getNearbyLocalitySlugs } from '@/lib/seo/internal-links';
import LocationGallery from '../../../../components/LocationGallery';
import LocalBizJsonLd, { localityCrumbs } from '../../_components/LocalBizJsonLd';
import SiteBreadcrumbs from '@/components/seo/SiteBreadcrumbs';
import Link from 'next/link';
import { CONTACT } from '@/lib/contact';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import TrackedPhoneLink from '@/components/analytics/TrackedPhoneLink';

/** Dedicated decoration-service pages worth cross-linking from every locality page. */
const SERVICE_LINKS: Partial<Record<ServiceKey, { href: string; label: string }>> = {
  Birthday: { href: '/services/birthday-decoration', label: 'Birthday Decoration' },
  Wedding: { href: '/services/wedding-setup', label: 'Wedding Decoration' },
  Haldi: { href: '/services/haldi-decoration', label: 'Haldi Decoration' },
  Engagement: { href: '/services/engagement-decoration', label: 'Engagement Decoration' },
  Corporate: { href: '/services/corporate-decoration', label: 'Corporate Decoration' },
  Anniversary: { href: '/services/anniversary-decoration', label: 'Anniversary Decorations' },
  Proposal: { href: '/services/proposal-decoration', label: 'Proposal Decorations' },
  'Baby Shower': { href: '/services/baby-shower-decoration', label: 'Baby Shower Decorations' },
};

const MAX_NEARBY_AREAS = 5;

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return { title: 'Location Not Found' };

  const pageMeta = getLocalityPageMeta(area.slug);

  return pageMetadata({
    path: `/locations/${area.slug}`,
    // "Event Decorators" matches how people search ("event decorators near me"
    // is this site's largest non-brand query at 603 impressions); "Event
    // decoration in X" did not. The offer earns the click at position ~10.
    // The brand suffix is appended by withBrandTitle — do not add it here.
    title: `Event Decorators in ${area.name} — Free Site Visit`,
    // All 30 areas have a hand-written snippet in LOCALITY_PAGE_META; the
    // generated fallback only fires if someone adds an area without one, which
    // tests/unit/serp-metadata.test.ts fails the build for.
    description:
      pageMeta?.description ?? buildLocationMetaDescription(area.name, getGeneratedArea(area.slug)),
    ogImage: '/og-banner.jpg',
  });
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  // Get area name for display
  const areaName = area.name;
  const generatedArea = getGeneratedArea(slug);
  const primaryLandmark = area.landmarks?.[0];

  // Hand-curated per-area overrides (set directly on the Area entry in
  // locations.ts) take priority over the bulk auto-generated equivalents.
  const heroTagline = area.heroTagline ?? generatedArea?.heroTagline;
  const waPrefill = area.waPrefill ?? generatedArea?.waPrefill;
  const uniqueFaqItems = area.uniqueFAQ ?? generatedArea?.uniqueFAQ ?? [];

  const shown = workShownOn(slug);
  const galleryItems = workTiles([...shown.local, ...shown.nearby]);
  const heading = workHeading(slug, area.name);

  // Reciprocal geographic nearby set (max 5) — balances peer crawl equity
  const nearbyAreaSlugs = getNearbyLocalitySlugs(slug).slice(0, MAX_NEARBY_AREAS);
  const nearbyAreas = nearbyAreaSlugs
    .map((s) => ({ slug: s, name: getAreaBySlug(s)?.name }))
    .filter((a): a is { slug: string; name: string } => Boolean(a.name));

  const nearbyAnchor = (name: string, index: number) => {
    const patterns = [
      `Event décor in ${name}`,
      `${name} celebrations`,
      `Decorators near ${name}`,
      `${name} venue styling`,
      `Parties in ${name}`,
    ];
    return patterns[index % patterns.length];
  };

  const serviceAnchor = (label: string) => {
    const base = label.replace(/ Decorations$/i, ' decoration');
    return `${base} in ${areaName}`;
  };

  const exploreServiceAnchor = (label: string, index: number) => {
    const short = label.replace(/ Decorations$/i, '');
    const patterns = [
      `${short} décor for ${areaName}`,
      `Plan ${short.toLowerCase()} in ${areaName}`,
      `${areaName} ${short.toLowerCase()} ideas`,
      `${short} setups around ${areaName}`,
    ];
    return patterns[index % patterns.length];
  };
  // Combined FAQ list — shared baseline questions plus this area's genuinely
  // unique questions. Rendered exactly once and reused for both the visible
  // page and the FAQPage JSON-LD so structured data always matches content.
  const combinedFaqs = [...faqsForArea(slug, areaName), ...uniqueFaqItems];

  return (
    <>
      {/* JSON-LD: WebPage + locality Service + FAQPage (single graph; no duplicate FAQ script) */}
      <LocalBizJsonLd
        areaName={areaName}
        slug={slug}
        landmark={primaryLandmark}
        description={
          getLocalityPageMeta(area.slug)?.description ??
          buildLocationMetaDescription(area.name, getGeneratedArea(area.slug))
        }
        faqs={combinedFaqs.map((f) => ({
          question: f.q,
          answer: f.a,
        }))}
      />
      <div className="lux-page">
        <div className="relative bg-lux-elevated border-b border-white/[0.06] text-lux-ivory py-12 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SiteBreadcrumbs
              className="mb-6 justify-center"
              items={localityCrumbs(areaName, slug)}
            />
            <p className="lux-eyebrow mb-3 md:mb-4">Bengaluru · {area.name}</p>
            <h1 className="font-display text-3xl md:text-6xl font-medium mb-4 md:mb-6 text-lux-ivory">
              Event decorators in {area.name}, {CITY}
            </h1>
            <p className="text-base md:text-2xl mb-6 md:mb-8 text-lux-muted max-w-3xl mx-auto">
              {heroTagline
                ? `${heroTagline}. `
                : `Professional decoration services in ${area.name}. `}
              From birthday parties to weddings, we bring creativity to every celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TrackedPhoneLink
                href={`tel:${CONTACT.PRIMARY_NUMBER}`}
                source={`location:${slug}`}
                className="lux-btn-secondary px-8 py-4"
              >
                Call {CONTACT.primary.display}
              </TrackedPhoneLink>
              <TrackedWhatsAppLink
                href={CONTACT.waUrl(waPrefill ?? `Hi! I need decoration services in ${area.name}`)}
                source={`location:${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary px-8 py-4"
              >
                WhatsApp us to book
              </TrackedWhatsAppLink>
            </div>
          </div>
        </div>

        {/* Unique locality copy — real landmarks/venue/vibe data, genuinely
            different per area (see scripts/generate-locality-content.ts) */}
        {generatedArea?.bodyCopy ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            <div className="lux-surface p-5 sm:p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="lux-heading-sm mb-6">Decorating celebrations in {area.name}</h2>
              <p className="text-lux-muted leading-relaxed">{generatedArea.bodyCopy}</p>
            </div>
          </div>
        ) : null}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <h2 className="lux-heading-sm text-center mb-4">Our services in {area.name}</h2>
          <p className="text-center text-sm text-lux-muted mb-12">
            Balloon décor from <span className="text-lux-gold font-medium">₹3,000</span> · Floral
            from <span className="text-lux-gold font-medium">₹5,000</span> —{' '}
            <Link href="/pricing" className="text-lux-gold hover:underline font-medium">
              view full pricing
            </Link>
          </p>

          {/*
            Every one of these cards used to carry a full-width solid gold
            "Get quote" button. Rendered, that is seven to ten primary buttons
            stacked down one page — at which point none of them is primary and
            the eye has nowhere to land. A primary button is a scarcity
            signal; spending it per card spends it on nothing.

            The card's real job is to explain the service and route to its
            page, so the detail link carries the weight and the WhatsApp
            action sits beside it as quiet text. The page keeps one primary
            button, in the CTA band below, plus the sticky WhatsApp affordance.

            The boxes went at the same time: hairline rules separate these as
            well as panels did, without a grid of floating cards.
          */}
          <div className="grid grid-cols-1 border-t border-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const servicePage = SERVICE_LINKS[service];
              return (
                <div
                  key={service}
                  className="flex h-full flex-col border-b border-white/[0.08] py-7 md:border-r md:px-7 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
                >
                  <h3 className="font-display text-xl text-lux-ivory mb-3">{service}</h3>
                  {area.serviceDescriptions ? (
                    <p className="text-lux-secondary mb-6 text-sm leading-relaxed flex-1">
                      {area.serviceDescriptions[service]}
                    </p>
                  ) : null}
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
                    {servicePage ? (
                      <Link
                        href={servicePage.href}
                        className="border-b border-lux-gold/30 pb-0.5 text-sm font-medium text-lux-gold transition-colors duration-300 hover:border-lux-gold"
                      >
                        {serviceAnchor(servicePage.label)} →
                      </Link>
                    ) : null}
                    <TrackedWhatsAppLink
                      href={CONTACT.waUrl(`Hi! I need ${service} in ${area.name}`)}
                      source={`location:${slug}:${service}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-lux-text-muted transition-colors duration-300 hover:text-lux-ivory"
                    >
                      Ask on WhatsApp
                    </TrackedWhatsAppLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="lux-surface p-5 sm:p-8 md:p-12">
            <h2 className="lux-heading-sm text-center mb-8">
              Frequently asked questions — {areaName}
            </h2>
            <div className="max-w-4xl mx-auto">
              <dl className="space-y-6">
                {combinedFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-white/10 pb-6 last:border-b-0">
                    <dt className="text-lg font-medium text-lux-ivory mb-3">{faq.q}</dt>
                    <dd className="text-lux-muted leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Area-specific information */}
        {area.landmarks && area.landmarks.length > 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            {/* Was boxed cards inside a panel — a card in a card. The rule
                between them does the separating. */}
            <div>
              <h2 className="lux-heading-sm mb-8">Landmarks near {area.name}</h2>
              <div className="grid grid-cols-1 border-t border-white/[0.08] md:grid-cols-3">
                {area.landmarks.map((landmark, index) => (
                  <div
                    key={index}
                    className="border-b border-white/[0.08] py-7 md:border-b-0 md:border-r md:px-7 md:last:border-r-0"
                  >
                    <h3 className="text-lg font-medium text-lux-ivory mb-2">{landmark}</h3>
                    <p className="text-lux-secondary text-sm">
                      We regularly set up celebrations near {landmark}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Gallery Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div>
            <h2 className="lux-heading-sm mb-8">{heading}</h2>
            <p className="text-lg text-lux-secondary mb-12 max-w-3xl">
              {shown.cityWideOnly
                ? `Setups we have built across Bengaluru — apartments and rooftops through to clubhouses and banquet halls. We work across ${areaName} and the surrounding areas.`
                : `Photographs from jobs we dressed in ${areaName}. Nearby work, if shown, is captioned with where it was actually shot.`}
            </p>

            <LocationGallery items={galleryItems} priorityCount={3} />
          </div>
        </div>

        {/* Explore more — consolidated internal linking */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="border-t border-white/[0.08] pt-12">
            <h2 className="lux-heading-sm mb-8">Explore more</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="text-sm uppercase tracking-wide text-lux-muted mb-3">
                  Services in {areaName}
                </h3>
                <ul className="space-y-2 list-none p-0 m-0">
                  {Object.values(SERVICE_LINKS).map((link, index) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link href={link.href} className="text-lux-gold hover:underline font-medium">
                        {exploreServiceAnchor(link.label, index)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wide text-lux-muted mb-3">
                  Plan your event
                </h3>
                <ul className="space-y-2 list-none p-0 m-0">
                  <li>
                    <Link href="/pricing" className="text-lux-gold hover:underline font-medium">
                      View pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery" className="text-lux-gold hover:underline font-medium">
                      Browse gallery
                    </Link>
                  </li>
                  <li>
                    <Link href="/reviews" className="text-lux-gold hover:underline font-medium">
                      Customer reviews
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-lux-gold hover:underline font-medium">
                      About We Decor
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/contact?area=${encodeURIComponent(slug)}`}
                      className="text-lux-gold hover:underline font-medium"
                    >
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-lux-gold hover:underline font-medium">
                      All services
                    </Link>
                  </li>
                  <li>
                    <Link href="/locations" className="text-lux-gold hover:underline font-medium">
                      All Bangalore areas
                    </Link>
                  </li>
                </ul>
              </div>
              {nearbyAreas.length > 0 ? (
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-lux-muted mb-3">
                    Also serving nearby
                  </h3>
                  <ul className="space-y-2 list-none p-0 m-0">
                    {nearbyAreas.map((nearby, index) => (
                      <li key={nearby.slug}>
                        <Link
                          href={`/locations/${nearby.slug}`}
                          className="text-lux-gold hover:underline font-medium"
                        >
                          {nearbyAnchor(nearby.name, index)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="lux-surface border-lux-gold/20 text-center p-8 md:p-12">
            <h2 className="lux-heading-sm mb-4">Ready to transform your event in {areaName}?</h2>
            <p className="text-lg text-lux-muted mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote for your area
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TrackedPhoneLink
                href={`tel:${CONTACT.PRIMARY_NUMBER}`}
                source={`location:${slug}_cta`}
                className="lux-btn-secondary px-8 py-4"
              >
                Call {CONTACT.primary.display}
              </TrackedPhoneLink>
              <TrackedWhatsAppLink
                href={CONTACT.waUrl(waPrefill ?? `Hi! I need decoration services in ${areaName}`)}
                source={`location:${slug}_cta`}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary px-8 py-4"
              >
                WhatsApp us
              </TrackedWhatsAppLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
