import { GetStaticPaths, GetStaticProps } from 'next';
import { NextPage } from 'next';
import React from 'react';
import SeoHead from '../../components/SeoHead';
import LocationGallery from '../../components/LocationGallery';
import CTA from '../../components/CTA';
import { getLocationBySlug, getAllLocationSlugs, getRandomNearbyLocations } from '../../lib/data/locationPages';
import type { LocationPage } from '../../lib/data/locationPages';
import { getGalleryImages } from '../../utils/gallery';

interface LocationPageProps {
  location: LocationPage;
  locationImages: any[];
}

const LocationPage: NextPage<LocationPageProps> = ({ location, locationImages }) => {
  const pageTitle = `Event Decoration in ${location.locationName} | We Decor Bangalore`;
  const pageDescription = `Looking for birthday, haldi, or room decor in ${location.locationName}, Bangalore? We Decor brings your vision to life. Book Now.`;
  const canonicalPath = `/locations/${location.slug}`;

  // Analytics tracking for location page views
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Track location page view
      console.log(`Location page viewed: ${location.locationName} (${location.slug})`);
      
      // Send to analytics if available
      if ((window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_title: pageTitle,
          page_location: canonicalPath,
          custom_parameter: location.locationName,
          event_category: 'location_page',
          event_label: location.slug
        });
      }
    }
  }, [location.locationName, location.slug, pageTitle, canonicalPath]);

  // Generate schema markup for LocalBusiness
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "We Decor",
    "description": `Professional event decoration services in ${location.locationName}, Bangalore`,
    "url": "/",
    "telephone": "+91 8880544452",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.locationName,
      "addressRegion": "Bangalore",
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "City",
      "name": location.locationName
    },
    "serviceType": location.eventTypes,
    "priceRange": "₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150+"
    }
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
              Event Decoration in {location.locationName}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transform your celebrations in {location.locationName} with our creative decoration services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+918880544452"
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                📞 Call Now +91 8880544452
              </a>
              <a
                href="https://wa.me/918880544452?text=Hi! I need decoration services in {location.locationName}"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-colors"
              >
                💬 WhatsApp Us to Book in {location.locationName}
              </a>
            </div>
          </div>
        </div>

        {/* Location Description */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Why Choose We Decor in {location.locationName}?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {location.description}
            </p>
            
            {/* Event Types */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Services in {location.locationName}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {location.eventTypes.map((eventType, index) => (
                  <div
                    key={index}
                    className="bg-pink-50 border border-pink-200 rounded-lg p-4 text-center"
                  >
                    <span className="text-pink-700 font-medium">{eventType}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border-l-4 border-pink-500">
              <div className="flex items-center mb-4">
                {[...Array(location.testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-700 italic text-lg mb-4">
                "{location.testimonial.text}"
              </blockquote>
              <cite className="text-gray-600 font-medium">
                — {location.testimonial.author}
              </cite>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {locationImages.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Our Work in {location.locationName}
            </h2>
            <LocationGallery images={locationImages} />
          </div>
        )}

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <CTA />
        </div>

        {/* Nearby Locations */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Also Serving Nearby Areas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {getRandomNearbyLocations(location.locationName, 4).map((nearbyLocation, index) => (
                <a
                  key={index}
                  href={`/locations/${nearbyLocation.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-lg p-4 text-center transition-colors"
                >
                  <span className="text-pink-700 font-medium">{nearbyLocation}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllLocationSlugs();
  
  const paths = slugs.map((slug) => ({
    params: { location: slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.location as string;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      notFound: true,
    };
  }

  // Get images that match the location tags
  const allImages = getGalleryImages();
  const locationImages = allImages.filter(image => 
    location.galleryTags.some(tag => 
      image.tags?.includes(tag) || 
      image.category?.toLowerCase().includes(tag.toLowerCase())
    )
  );

  return {
    props: {
      location,
      locationImages: locationImages.slice(0, 12), // Limit to 12 images
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default LocationPage;
