import { Metadata } from 'next';
import { AREAS, SITE, BUSINESS_NAME, CITY, PHONE_DISPLAY } from '../_data/locations';

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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`}
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              📞 Call Now {PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/918880544452?text=Hi! I need decoration services in ${CITY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-colors"
            >
              💬 WhatsApp Us to Book
            </a>
          </div>
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
                {area.vibe && (
                  <p className="text-pink-600 font-medium mb-3">
                    {area.vibe}
                  </p>
                )}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Professional event decoration services in {area.name}. From birthday parties to weddings, we bring creativity and style to every celebration.
                </p>
                
                {area.landmarks && area.landmarks.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Popular Venues:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {area.landmarks.slice(0, 3).map((landmark, index) => (
                        <span
                          key={index}
                          className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {landmark}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
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

      {/* Why Choose We Decor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Choose {BUSINESS_NAME} Across {CITY}?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Local Expertise</h3>
              <p className="text-gray-600">We understand the unique needs and preferences of each {CITY} neighborhood.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Response</h3>
              <p className="text-gray-600">Fast setup and takedown with our experienced local teams across all areas.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Service</h3>
              <p className="text-gray-600">Custom decoration designs that reflect your style and the local culture.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl text-white text-center p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Event?
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
              href={`https://wa.me/918880544452?text=Hi! I need decoration services in ${CITY}`}
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