import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  AREAS,
  SITE,
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
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import LocationGallery from '../../../../components/LocationGallery';
import FAQJsonLd from '../../_components/FAQJsonLd';
import LocalBizJsonLd from '../../_components/LocalBizJsonLd';
import Link from 'next/link';

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

  return {
    title: `Event Decoration Services in ${area.name}, ${CITY} | ${BUSINESS_NAME}`,
    description: `Professional event decoration services in ${area.name}, ${CITY}. Birthday decor, wedding setup, haldi decoration, room decoration.`,
    alternates: { canonical: `${SITE}/locations/${area.slug}` },
  };
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
      <LocalBizJsonLd areaName={areaName} />
      <FAQJsonLd
        items={faqItems.map((f) => ({
          question: f.q,
          answer: f.a,
        }))}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Locations', item: `${SITE}/locations` },
              {
                '@type': 'ListItem',
                position: 2,
                name: areaName,
                item: `${SITE}/locations/${slug}`,
              },
            ],
          }),
        }}
      />

      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-20">
        <div className="relative bg-gradient-to-r from-pink-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Event Decoration in {area.name}, {CITY}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Professional decoration services in {area.name}. From birthday parties to weddings, we
              bring creativity to every celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`}
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                📞 Call Now {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/918880544452?text=Hi! I need decoration services in ${area.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-colors"
              >
                💬 WhatsApp Us to Book
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Our Services in {area.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service} className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service}</h3>
                {area.serviceDescriptions ? (
                  <p className="text-gray-600 mb-4 text-sm">{area.serviceDescriptions[service]}</p>
                ) : null}
                <a
                  href={`https://wa.me/918880544452?text=Hi! I need ${service} in ${area.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                >
                  Get Quote
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Frequently Asked Questions for {areaName}
            </h2>
            <div className="max-w-4xl mx-auto">
              <dl className="space-y-6">
                {faqsForArea(slug, areaName).map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <dt className="text-lg font-semibold text-gray-800 mb-3">{faq.q}</dt>
                    <dd className="text-gray-600 leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>

              {/* FAQ Internal Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                  <Link
                    href="/services"
                    className="text-pink-600 hover:text-pink-700 font-medium underline"
                  >
                    View All Services →
                  </Link>
                  <Link
                    href="/gallery"
                    className="text-green-600 hover:text-green-700 font-medium underline"
                  >
                    Browse Gallery →
                  </Link>
                  {nearbyAreaName ? (
                    <Link
                      href={`/locations/${nearbyArea}`}
                      className="text-blue-600 hover:text-blue-700 font-medium underline"
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
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                Popular Venues in {area.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {area.landmarks.map((landmark, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{landmark}</h3>
                    <p className="text-gray-600 text-sm">Perfect for events</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl text-white text-center p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Event in {areaName}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contact us today for a free consultation and quote for your area
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`}
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                📞 Call {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/918880544452?text=Hi! I need decoration services in ${areaName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-colors"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Recent Setups in {areaName}
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Browse our recent setups across {areaName} — from apartments and rooftops to
              clubhouses and banquet halls.
            </p>

            <LocationGallery items={localizedItems} />

            {/* Internal Links */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/services"
                  className="text-pink-600 hover:text-pink-700 font-medium underline"
                >
                  View All Services →
                </Link>
                {nearbyAreaName ? (
                  <Link
                    href={`/locations/${nearbyArea}`}
                    className="text-green-600 hover:text-green-700 font-medium underline"
                  >
                    Also serving {nearbyAreaName} →
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
