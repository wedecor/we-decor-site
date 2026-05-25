import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { absoluteUrl, pageMetadata } from '@/lib/metadata';
import {
  AREAS,
  BUSINESS_NAME,
  CITY,
  PHONE_DISPLAY,
  getAreaBySlug,
  SERVICES,
  AREAS_WITH_DESCRIPTIONS,
} from '../../_data/locations';
import { GALLERY_ITEMS, localize } from '../../_data/gallery';
import { CLUSTERS } from '../../_data/clusters';
import { faqsForArea } from '../../_data/faqs';
import LocationGallery from '../../../../components/LocationGallery';
import FAQJsonLd from '../../_components/FAQJsonLd';
import LocalBizJsonLd from '../../_components/LocalBizJsonLd';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildBreadcrumbSchema } from '@/lib/local-seo';
import Link from 'next/link';
import { CONTACT } from '@/lib/contact';

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
    title: `Event Decoration Services in ${area.name}, ${CITY} | ${BUSINESS_NAME}`,
    description: `Professional event decoration services in ${area.name}, ${CITY}. Birthday decor, wedding setup, haldi decoration, room decoration.`,
  });
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  // Get area name for display
  const areaName = area.name;

  // Create localized gallery items
  const localizedItems = GALLERY_ITEMS.map((m) => ({ ...m, ...localize(m, area) }));

  // Find nearby area from the same cluster
  const currentCluster = CLUSTERS.find((c) => c.areaSlugs.includes(slug));
  const nearbyArea = currentCluster?.areaSlugs.find((areaSlug) => areaSlug !== slug);
  const nearbyAreaName = nearbyArea ? getAreaBySlug(nearbyArea)?.name : null;

  // Get FAQ items for this area
  const faqItems = faqsForArea(slug, areaName);

  return (
    <>
      {/* JSON-LD Schema */}
      <LocalBizJsonLd areaName={areaName} slug={slug} />
      <FAQJsonLd
        items={faqItems.map((f) => ({
          question: f.q,
          answer: f.a,
        }))}
        pagePath={`/locations/${slug}`}
      />
      <SchemaScript
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/locations' },
          { name: areaName, path: `/locations/${slug}` },
        ])}
      />

      <div className="lux-page">
        <div className="relative bg-lux-elevated border-b border-white/[0.06] text-lux-ivory py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="lux-eyebrow mb-4">Bengaluru · {area.name}</p>
            <h1 className="font-display text-4xl md:text-6xl font-medium mb-6 text-lux-ivory">
              Event decoration in {area.name}, {CITY}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-lux-muted max-w-3xl mx-auto">
              Professional decoration services in {area.name}. From birthday parties to weddings, we
              bring creativity to every celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`}
                className="lux-btn-secondary px-8 py-4"
              >
                Call {PHONE_DISPLAY}
              </a>
              <a
                href={CONTACT.waUrl(`Hi! I need decoration services in ${area.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary px-8 py-4"
              >
                WhatsApp us to book
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="lux-heading-sm text-center mb-12">Our services in {area.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div key={service} className="lux-panel lux-panel-hover p-6 flex flex-col h-full">
                <h3 className="font-display text-xl text-lux-ivory mb-3">{service}</h3>
                {area.serviceDescriptions ? (
                  <p className="text-lux-muted mb-4 text-sm flex-1">
                    {area.serviceDescriptions[service]}
                  </p>
                ) : null}
                <a
                  href={CONTACT.waUrl(`Hi! I need ${service} in ${area.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lux-btn-primary text-center mt-auto"
                >
                  Get quote
                </a>
              </div>
            ))}
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
                {faqsForArea(slug, areaName).map((faq, index) => (
                  <div key={index} className="border-b border-white/10 pb-6 last:border-b-0">
                    <dt className="text-lg font-medium text-lux-ivory mb-3">{faq.q}</dt>
                    <dd className="text-lux-muted leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>

              {/* FAQ Internal Links */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                  <Link href="/services" className="text-lux-gold hover:underline font-medium">
                    View All Services →
                  </Link>
                  <Link href="/gallery" className="text-lux-gold hover:underline font-medium">
                    Browse Gallery →
                  </Link>
                  {nearbyAreaName ? (
                    <Link
                      href={`/locations/${nearbyArea}`}
                      className="text-lux-gold hover:underline font-medium"
                    >
                      Also serving {nearbyAreaName} →
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Area-specific information */}
        {area.landmarks && area.landmarks.length > 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="lux-surface p-8 md:p-12">
              <h2 className="lux-heading-sm text-center mb-8">Popular venues in {area.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {area.landmarks.map((landmark, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-lux-muted rounded-xl border border-white/10"
                  >
                    <h3 className="text-lg font-medium text-lux-ivory mb-2">{landmark}</h3>
                    <p className="text-lux-muted text-sm">Perfect for events</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="lux-surface border-lux-gold/20 text-center p-8 md:p-12">
            <h2 className="lux-heading-sm mb-4">Ready to transform your event in {areaName}?</h2>
            <p className="text-lg text-lux-muted mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote for your area
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`}
                className="lux-btn-secondary px-8 py-4"
              >
                Call {PHONE_DISPLAY}
              </a>
              <a
                href={CONTACT.waUrl(`Hi! I need decoration services in ${areaName}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary px-8 py-4"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="lux-surface p-8 md:p-12">
            <h2 className="lux-heading-sm text-center mb-8">Recent setups in {areaName}</h2>
            <p className="text-lg text-lux-muted text-center mb-12 max-w-3xl mx-auto">
              Browse our recent setups across {areaName} — from apartments and rooftops to
              clubhouses and banquet halls.
            </p>

            <LocationGallery items={localizedItems} />

            {/* Internal Links */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/services" className="text-lux-gold hover:underline font-medium">
                  View All Services →
                </Link>
                {nearbyAreaName ? (
                  <Link
                    href={`/locations/${nearbyArea}`}
                    className="text-lux-gold hover:underline font-medium"
                  >
                    Also serving {nearbyAreaName} →
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
