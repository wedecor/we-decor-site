import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata';
import {
  AREAS,
  CITY,
  PHONE_DISPLAY,
  getAreaBySlug,
  SERVICES,
  type ServiceKey,
} from '../../_data/locations';
import { GALLERY_ITEMS, localize } from '../../_data/gallery';
import { faqsForArea } from '../../_data/faqs';
import { getGeneratedArea, buildLocationMetaDescription } from '../../_data/location-content';
import { getLocalityPageMeta } from '../../_data/location-metadata';
import { getNearbyLocalitySlugs } from '@/lib/seo/internal-links';
import LocationGallery from '../../../../components/LocationGallery';
import LocalBizJsonLd from '../../_components/LocalBizJsonLd';
import SiteBreadcrumbs from '@/components/seo/SiteBreadcrumbs';
import Link from 'next/link';
import { CONTACT } from '@/lib/contact';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import TrackedPhoneLink from '@/components/analytics/TrackedPhoneLink';

/** Unique, hand-written meta descriptions for our highest-traffic location pages */
const CUSTOM_META_DESCRIPTIONS: Record<string, string> = {
  koramangala:
    'Premium event decoration in Koramangala, Bengaluru. Birthday setups, engagement stages, and corporate decor for apartments, clubhouses & rooftops. WhatsApp for a free quote.',
  whitefield:
    'Event decoration services in Whitefield, Bengaluru. Wedding decor, birthday parties & corporate events for villas, gated communities & tech park venues. Call We Decor today.',
  indiranagar:
    'Elegant event decoration in Indiranagar, Bengaluru. Proposal setups, anniversary decor & engagement styling at rooftops, cafes & residences. We Decor — Bringing Dreams to Life.',
  'hsr-layout':
    'Birthday & wedding decoration in HSR Layout, Bengaluru. Home parties, clubhouse events & surprise setups by We Decor. Balloon décor from ₹3,000. WhatsApp us now.',
  jayanagar:
    'Traditional & modern event decoration in Jayanagar, Bengaluru. Haldi, engagement, birthday & wedding decor for homes, halls & community spaces. We Decor Events.',
};

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
    title: `Event decoration in ${area.name}, ${CITY} | We Decor`,
    description:
      pageMeta?.description ??
      CUSTOM_META_DESCRIPTIONS[area.slug] ??
      buildLocationMetaDescription(area.name, getGeneratedArea(area.slug)),
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

  // Create localized gallery items
  const localizedItems = GALLERY_ITEMS.map((m) => ({ ...m, ...localize(m, area) }));

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
          CUSTOM_META_DESCRIPTIONS[area.slug] ??
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
              withSchema
              items={[
                { name: 'Home', href: '/' },
                { name: 'Locations', href: '/locations' },
                { name: areaName, href: `/locations/${slug}` },
              ]}
            />
            <p className="lux-eyebrow mb-3 md:mb-4">Bengaluru · {area.name}</p>
            <h1 className="font-display text-3xl md:text-6xl font-medium mb-4 md:mb-6 text-lux-ivory">
              Event decoration in {area.name}, {CITY}
            </h1>
            <p className="text-base md:text-2xl mb-6 md:mb-8 text-lux-muted max-w-3xl mx-auto">
              {heroTagline
                ? `${heroTagline}. `
                : `Professional decoration services in ${area.name}. `}
              From birthday parties to weddings, we bring creativity to every celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TrackedPhoneLink
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`}
                source={`location:${slug}`}
                className="lux-btn-secondary px-8 py-4"
              >
                Call {PHONE_DISPLAY}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const servicePage = SERVICE_LINKS[service];
              return (
                <div key={service} className="lux-panel lux-panel-hover p-6 flex flex-col h-full">
                  <h3 className="font-display text-xl text-lux-ivory mb-3">{service}</h3>
                  {area.serviceDescriptions ? (
                    <p className="text-lux-muted mb-4 text-sm flex-1">
                      {area.serviceDescriptions[service]}
                    </p>
                  ) : null}
                  <div className="mt-auto flex flex-col gap-3">
                    {servicePage ? (
                      <Link
                        href={servicePage.href}
                        className="text-sm text-lux-gold hover:underline font-medium text-center"
                      >
                        {serviceAnchor(servicePage.label)} details →
                      </Link>
                    ) : null}
                    <TrackedWhatsAppLink
                      href={CONTACT.waUrl(`Hi! I need ${service} in ${area.name}`)}
                      source={`location:${slug}:${service}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lux-btn-primary text-center"
                    >
                      Get quote
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
            <div className="lux-surface p-5 sm:p-8 md:p-12">
              <h2 className="lux-heading-sm text-center mb-8">Landmarks near {area.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {area.landmarks.map((landmark, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-lux-elevated rounded-xl border border-white/10"
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
          <div className="lux-surface p-5 sm:p-8 md:p-12">
            <h2 className="lux-heading-sm text-center mb-8">Recent setups in {areaName}</h2>
            <p className="text-lg text-lux-muted text-center mb-12 max-w-3xl mx-auto">
              Browse our recent setups across {areaName} — from apartments and rooftops to
              clubhouses and banquet halls.
            </p>

            <LocationGallery items={localizedItems} />
          </div>
        </div>

        {/* Explore more — consolidated internal linking */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="lux-surface p-5 sm:p-8 md:p-12">
            <h2 className="lux-heading-sm text-center mb-8">Explore more</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto text-center">
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
                    <Link href="/contact" className="text-lux-gold hover:underline font-medium">
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
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`}
                source={`location:${slug}_cta`}
                className="lux-btn-secondary px-8 py-4"
              >
                Call {PHONE_DISPLAY}
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
