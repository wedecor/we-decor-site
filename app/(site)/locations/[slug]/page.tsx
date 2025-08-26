import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AREAS, SITE, BUSINESS_NAME, CITY, PHONE_DISPLAY, getAreaBySlug, SERVICES } from '../../_data/locations';

interface LocationPageProps {
  params: { slug: string; };
}

export async function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const area = getAreaBySlug(params.slug);
  if (!area) return { title: 'Location Not Found' };

  return {
    title: `Event Decoration Services in ${area.name}, ${CITY} | ${BUSINESS_NAME}`,
    description: `Professional event decoration services in ${area.name}, ${CITY}. Birthday decor, wedding setup, haldi decoration, room decoration.`,
    alternates: { canonical: `${SITE}/locations/${area.slug}` },
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const area = getAreaBySlug(params.slug);
  if (!area) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="relative bg-gradient-to-r from-pink-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Event Decoration in {area.name}, {CITY}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Professional decoration services in {area.name}. From birthday parties to weddings, we bring creativity to every celebration.
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
              {area.serviceDescriptions && (
                <p className="text-gray-600 mb-4 text-sm">
                  {area.serviceDescriptions[service]}
                </p>
              )}
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

      {/* Area-specific information */}
      {area.landmarks && area.landmarks.length > 0 && (
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
      )}

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl text-white text-center p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Event in {area.name}?
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
              href={`https://wa.me/918880544452?text=Hi! I need decoration services in ${area.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-colors"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 