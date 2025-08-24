import { GetStaticProps } from 'next';
import { NextPage } from 'next';
import SeoHead from '../../components/SeoHead';
import { locationPages } from '../../lib/data/locationPages';

interface LocationsIndexProps {
  locations: typeof locationPages;
}

const LocationsIndex: NextPage<LocationsIndexProps> = ({ locations }) => {
  const pageTitle = "Event Decoration Services Across Bangalore | We Decor";
  const pageDescription = "Find professional event decoration services in your area. We serve Whitefield, Jayanagar, Indiranagar, Koramangala, HSR Layout, RT Nagar, Hebbal, and Electronic City. Book now!";
  const canonicalPath = "/locations";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "We Decor",
    "description": "Professional event decoration services across Bangalore",
    "url": "/",
    "telephone": "+91 8880544452",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Bangalore",
      "addressCountry": "IN"
    },
    "areaServed": locations.map(location => ({
      "@type": "City",
      "name": location.locationName
    })),
    "serviceType": ["Event Decoration", "Birthday Decor", "Wedding Setup", "Haldi Decoration", "Room Decoration"],
    "priceRange": "₹₹"
  };

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonicalPath={canonicalPath}
        schemaMarkup={schemaMarkup}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-pink-600 to-purple-600 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Event Decoration Across Bangalore
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional decoration services in your neighborhood. From birthday parties to weddings, we bring creativity to every celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+918880544452"
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                📞 Call Now +91 8880544452
              </a>
              <a
                href="https://wa.me/918880544452?text=Hi! I need decoration services in Bangalore"
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
            Our Service Areas in Bangalore
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <div
                key={location.slug}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {location.locationName}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {location.description.substring(0, 150)}...
                  </p>
                  
                  {/* Event Types */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Services Available:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {location.eventTypes.slice(0, 4).map((eventType, index) => (
                        <span
                          key={index}
                          className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {eventType}
                        </span>
                      ))}
                      {location.eventTypes.length > 4 && (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                          +{location.eventTypes.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Testimonial Preview */}
                  <div className="bg-pink-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-2">
                      {[...Array(location.testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-gray-700 italic text-sm">
                      "{location.testimonial.text.substring(0, 100)}..."
                    </blockquote>
                    <cite className="text-gray-600 text-sm font-medium">
                      — {location.testimonial.author}
                    </cite>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3">
                    <a
                      href={`/locations/${location.slug}`}
                      className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-pink-700 transition-colors"
                    >
                      View Details & Gallery
                    </a>
                    <a
                      href={`https://wa.me/918880544452?text=Hi! I need decoration services in ${location.locationName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-green-600 transition-colors"
                    >
                      WhatsApp for {location.locationName}
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
              Why Choose We Decor Across Bangalore?
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
                <p className="text-gray-600">We understand the unique needs and preferences of each Bangalore neighborhood.</p>
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
                href="tel:+918880544452"
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                📞 Call +91 8880544452
              </a>
              <a
                href="https://wa.me/918880544452?text=Hi! I need decoration services in Bangalore"
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
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      locations: locationPages,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default LocationsIndex;
