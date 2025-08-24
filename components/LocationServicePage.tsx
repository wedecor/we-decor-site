import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaPhone, FaWhatsapp, FaStar, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { MdPhone, MdWhatsapp } from 'react-icons/md';
import { buildLocationServiceUrl, SITE_PHONE, SITE_WHATSAPP, buildWhatsAppUrl, buildPhoneUrl } from '../lib/site';

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

export default function LocationServicePage({
  location,
  service,
  images,
  nearby
}: LocationServicePageProps) {
    const pageTitle = `${service.name} in ${location.displayName} | We Decor Bangalore`;
  const pageDescription = `Professional ${service.name.toLowerCase()} services in ${location.displayName}, Bangalore. ${service.blurb} Book now for your special occasion.`;
  const pageUrl = buildLocationServiceUrl(location.slug, service.slug);

  // JSON-LD Schema for LocalBusiness and Service
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "We Decor",
    "description": `${service.name} services in ${location.displayName}, Bangalore`,
    "url": "/",
    "telephone": "+91 9591232166",
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
  };

  // Reasons to choose We Decor
  const reasonsToChoose = [
    {
      icon: "🎨",
      title: "Creative Excellence",
      description: "Unique and innovative decoration designs that make your event memorable"
    },
    {
      icon: "⚡",
      title: "Same Day Setup",
      description: "Quick and efficient decoration services with professional quality"
    },
    {
      icon: "👥",
      title: "Expert Team",
      description: "Experienced decorators with attention to every detail"
    },
    {
      icon: "💰",
      title: "Affordable Pricing",
      description: "Premium quality decorations starting from ₹2999"
    },
    {
      icon: "📱",
      title: "24/7 Support",
      description: "Round the clock customer support for all your queries"
    },
    {
      icon: "⭐",
      title: "150+ Reviews",
      description: "Trusted by hundreds of satisfied customers across Bangalore"
    }
  ];

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-pink-600 to-purple-600 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {service.name} in {location.displayName}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {service.blurb}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href={buildPhoneUrl()}
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <FaPhone className="text-xl" />
                Call Now {SITE_PHONE}
              </a>
              <a
                href={buildWhatsAppUrl(`Hi! I need ${service.name.toLowerCase()} services in ${location.displayName}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp Us
              </a>
            </motion.div>
          </div>
        </div>

        {/* Gallery Grid Section */}
        {images.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                Our {service.name} Work in {location.displayName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="aspect-w-4 aspect-h-3">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-semibold text-sm">{image.alt}</p>
                        {image.category && (
                          <span className="text-xs bg-pink-500 px-2 py-1 rounded-full">
                            {image.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Reasons to Choose We Decor */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Why Choose We Decor for {service.name} in {location.displayName}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reasonsToChoose.map((reason, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{reason.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Service Details */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                About Our {service.name} Services
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {service.blurb}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-pink-500" />
                    Service Area
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We provide {service.name.toLowerCase()} services across {location.displayName} and surrounding areas in Bangalore.
                  </p>
                  <div className="flex items-center gap-2 text-pink-600 font-medium">
                    <FaCheckCircle />
                    Same day setup available
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaStar className="text-pink-500" />
                    What We Offer
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-sm" />
                      Professional consultation
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-sm" />
                      Custom design options
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-sm" />
                      Quality materials
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-sm" />
                      On-time delivery
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Nearby Locations */}
        {nearby.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                Also Serving Nearby Areas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {nearby.map((nearbyLocation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  >
                    <Link
                      href={`/locations/${nearbyLocation.slug}/services/${service.slug}`}
                      className="bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-lg p-4 text-center transition-colors block"
                    >
                      <span className="text-pink-700 font-medium">
                        {nearbyLocation.displayName}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Final CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl text-white p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Book Your {service.name} in {location.displayName}?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your requirements and get a free quote for your special occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildPhoneUrl()}
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <MdPhone className="text-xl" />
                Call {SITE_PHONE}
              </a>
              <a
                href={buildWhatsAppUrl(`Hi! I need ${service.name.toLowerCase()} services in ${location.displayName}. Can you provide a quote?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <MdWhatsapp className="text-xl" />
                WhatsApp Quote
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};


