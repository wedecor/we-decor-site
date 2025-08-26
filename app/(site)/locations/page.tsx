import { Metadata } from 'next';
import { AREAS, SITE, BUSINESS_NAME, CITY, PHONE } from '../_data/locations';

export const metadata: Metadata = {
  title: `Event Decoration Services Across ${CITY} | ${BUSINESS_NAME}`,
  description: `Find professional event decoration services in your area. We serve ${AREAS.length} areas across ${CITY}. Book now!`,
  alternates: {
    canonical: `${SITE}/locations`,
  },
};

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Event Decoration Across {CITY}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Professional decoration services in your neighborhood. From birthday parties to weddings, we bring creativity to every celebration.
          </p>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Our Service Areas in {CITY}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AREAS.map((area) => (
            <div
              key={area.slug}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {area.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Professional event decoration services in {area.name}. From birthday parties to weddings, we bring creativity and style to every celebration.
                </p>
                
                <div className="flex flex-col gap-3">
                  <a
                    href={`/locations/${area.slug}`}
                    className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-pink-700 transition-colors"
                  >
                    View Services in {area.name}
                  </a>
                  <a
                    href={`https://wa.me/918880544452?text=Hi! I need decoration services in ${area.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-green-600 transition-colors"
                  >
                    WhatsApp for {area.name}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 