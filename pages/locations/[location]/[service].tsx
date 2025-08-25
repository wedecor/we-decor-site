import { GetStaticPaths, GetStaticProps } from 'next';
import { NextPage } from 'next';
import React from 'react';
import Layout from '../../../components/Layout';
import SeoHead from '../../../components/SeoHead';
import LocationServicePage from '../../../components/LocationServicePage';
import { locations } from '../../../lib/data/locations';
import { services } from '../../../lib/data/services';
import { getLocationServiceImages, getLocationImages, getServiceImages } from '../../../lib/data/gallery-map';
import { buildLocationServiceUrl, SITE_URL, SITE_PHONE } from '../../../lib/site';

interface LocationServicePageProps {
  location: {
    slug: string;
    displayName: string;
    nearby: string[];
  };
  service: {
    slug: string;
    name: string;
    path: string;
    blurb: string;
  };
  images: Array<{
    src: string;
    alt: string;
    category?: string;
    tags?: string[];
    locationTags?: string[];
  }>;
  nearby: Array<{
    slug: string;
    displayName: string;
  }>;
}

const LocationServicePageRoute: NextPage<LocationServicePageProps> = ({ 
  location, 
  service, 
  images, 
  nearby 
}) => {
  const pageTitle = `${service.name} in ${location.displayName} | We Decor Bangalore`;
  const pageDescription = `Professional ${service.name.toLowerCase()} services in ${location.displayName}, Bangalore. ${service.blurb} Book now for your special occasion.`;
  const canonicalPath = `/locations/${location.slug}/${service.slug}`;

  return (
    <Layout seo={{
      title: pageTitle,
      description: pageDescription,
      canonicalPath: canonicalPath,
      schemaMarkup: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "We Decor",
        "description": `${service.name} services in ${location.displayName}, Bangalore`,
        "url": SITE_URL,
        "telephone": SITE_PHONE,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": location.displayName,
          "addressRegion": "Bangalore",
          "addressCountry": "IN"
        },
        "areaServed": {
          "@type": "City",
          "name": location.displayName
        },
        "serviceType": service.name,
        "priceRange": "₹₹",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150+"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${service.name} Services`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service.name,
                "description": service.blurb
              }
            }
          ]
        }
      }
    }}>
      <LocationServicePage
        location={location}
        service={service}
        images={images}
        nearby={nearby}
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate all location × service combinations
  const paths: Array<{ params: { location: string; service: string } }> = [];
  
  locations.forEach(location => {
    services.forEach(service => {
      paths.push({
        params: {
          location: location.slug,
          service: service.slug
        }
      });
    });
  });

  return {
    paths,
    fallback: false, // All paths are pre-generated
  };
};

export const getStaticProps: GetStaticProps<LocationServicePageProps> = async ({ params }) => {
  const locationSlug = params?.location as string;
  const serviceSlug = params?.service as string;

  // Find the location and service data
  const location = locations.find(loc => loc.slug === locationSlug);
  const service = services.find(srv => srv.slug === serviceSlug);

  if (!location || !service) {
    return {
      notFound: true,
    };
  }

  // Get images for this location-service combination
  const locationServiceImages = getLocationServiceImages(locationSlug, serviceSlug);
  
  // If no specific images, fall back to service images
  const images = locationServiceImages.length > 0 
    ? locationServiceImages 
    : getServiceImages(serviceSlug);

  // Get nearby locations with display names
  const nearby = location.nearby
    .map(nearbySlug => {
      const nearbyLocation = locations.find(loc => loc.slug === nearbySlug);
      return nearbyLocation ? {
        slug: nearbyLocation.slug,
        displayName: nearbyLocation.displayName
      } : null;
    })
    .filter(Boolean) as Array<{ slug: string; displayName: string }>;

  // Prepare the location data for the component
  const locationData = {
    slug: location.slug,
    displayName: location.displayName,
    nearby: location.nearby
  };

  // Prepare the service data for the component
  const serviceData = {
    slug: service.slug,
    name: service.name,
    path: service.path,
    blurb: service.blurb
  };

  return {
    props: {
      location: locationData,
      service: serviceData,
      images,
      nearby
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default LocationServicePageRoute;
