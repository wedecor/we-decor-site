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
import { CLUSTERS } from '../../_data/clusters';
import { faqsForArea } from '../../_data/faqs';
import { getGeneratedArea, buildLocationMetaDescription } from '../../_data/location-content';
import LocationGallery from '../../../../components/LocationGallery';
import FAQJsonLd from '../../_components/FAQJsonLd';
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
    'Birthday & wedding decoration in HSR Layout, Bengaluru. Home parties, clubhouse events & surprise setups by We Decor. Packages from ₹2,999. WhatsApp us now.',
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
  // Closest existing service pages until dedicated occasion URLs ship in a later phase
  Anniversary: { href: '/services/room-decoration', label: 'Anniversary & room styling' },
  Proposal: { href: '/services/engagement-decoration', label: 'Proposal & engagement styling' },
  'Baby Shower': {
    href: '/services/birthday-home-decoration',
    label: 'Baby shower & home styling',
  },
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

  return pageMetadata({
    path: `/locations/${area.slug}`,
    title: `Event Decoration Services in ${area.name}, ${CITY}`,
    description:
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

  // Nearby areas from the same regional cluster — used for internal linking
  const currentCluster = CLUSTERS.find((c) => c.areaSlugs.includes(slug));
  const clusterSlugs = (currentCluster?.areaSlugs ?? []).filter((s) => s !== slug);
  // Alphabetical ring guarantees reciprocal crawl paths across all localities
  const allSlugs = AREAS.map((a) => a.slug).filter((s) => s !== slug);
  const ringStart = allSlugs.findIndex((s) => s > slug);
  const ringOrdered =
    ringStart === -1 ? allSlugs : [...allSlugs.slice(ringStart), ...allSlugs.slice(0, ringStart)];
  // Keep cluster preference but always reserve ring slots for reciprocal crawl edges
  const fromCluster = clusterSlugs.slice(0, 3);
  const fromRing = ringOrdered
    .filter((s) => !fromCluster.includes(s))
    .slice(0, MAX_NEARBY_AREAS - fromCluster.length);
  const nearbyAreaSlugs = [...fromCluster, ...fromRing];
  const nearbyAreas = nearbyAreaSlugs
    .map((s) => ({ slug: s, name: getAreaBySlug(s)?.name }))
    .filter((a): a is { slug: string; name: string } => Boolean(a.name));

  // Combined FAQ list — shared baseline questions plus this area's genuinely
  // unique questions. Rendered exactly once and reused for both the visible
  // page and the FAQPage JSON-LD so structured data always matches content.
  const combinedFaqs = [...faqsForArea(slug, areaName), ...uniqueFaqItems];

  return (
    <>
      {/* JSON-LD Schema */}
      <LocalBizJsonLd areaName={areaName} slug={slug} landmark={primaryLandmark} />
      <FAQJsonLd
        items={combinedFaqs.map((f) => ({
          question: f.q,
          answer: f.a,
        }))}
        pagePath={`/locations/${slug}`}
      />
      <div className="lux-page">
        <div className="relative bg-lux-elevated border-b border-white/[0.06] text-lux-ivory py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SiteBreadcrumbs
              className="mb-8 justify-center"
              withSchema
              items={[
                { name: 'Home', href: '/' },
                { name: 'Locations', href: '/locations' },
                { name: areaName, href: `/locations/${slug}` },
              ]}
            />
            <p className="lux-eyebrow mb-4">Bengaluru · {area.name}</p>
            <h1 className="font-display text-4xl md:text-6xl font-medium mb-6 text-lux-ivory">
              Event decoration in {area.name}, {CITY}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-lux-muted max-w-3xl mx-auto">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="lux-surface p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="lux-heading-sm mb-6">Decorating celebrations in {area.name}</h2>
              <p className="text-lux-muted leading-relaxed">{generatedArea.bodyCopy}</p>
            </div>
          </div>
        ) : null}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="lux-heading-sm text-center mb-4">Our services in {area.name}</h2>
          <p className="text-center text-sm text-lux-muted mb-12">
            Packages start from <span className="text-lux-gold font-medium">₹2,999</span> —{' '}
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
                        {servicePage.label} details →
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="lux-surface p-8 md:p-12">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="lux-surface p-8 md:p-12">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="lux-surface p-8 md:p-12">
            <h2 className="lux-heading-sm text-center mb-8">Recent setups in {areaName}</h2>
            <p className="text-lg text-lux-muted text-center mb-12 max-w-3xl mx-auto">
              Browse our recent setups across {areaName} — from apartments and rooftops to
              clubhouses and banquet halls.
            </p>

            <LocationGallery items={localizedItems} />
          </div>
        </div>

        {/* Explore more — consolidated internal linking */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="lux-surface p-8 md:p-12">
            <h2 className="lux-heading-sm text-center mb-8">Explore more</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto text-center">
              <div>
                <h3 className="text-sm uppercase tracking-wide text-lux-muted mb-3">
                  Services in {areaName}
                </h3>
                <ul className="space-y-2 list-none p-0 m-0">
                  {Object.values(SERVICE_LINKS).map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link href={link.href} className="text-lux-gold hover:underline font-medium">
                        {link.label}
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
                    {nearbyAreas.map((nearby) => (
                      <li key={nearby.slug}>
                        <Link
                          href={`/locations/${nearby.slug}`}
                          className="text-lux-gold hover:underline font-medium"
                        >
                          {nearby.name}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
