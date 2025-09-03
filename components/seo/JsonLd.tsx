import React from 'react';
import { SITE_URL } from '@/lib/site';

export interface ContactInfo {
  displayNumbers: string[];
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

// Default contact info - can be overridden
const DEFAULT_CONTACT: ContactInfo = {
  displayNumbers: ['+91 8880544452', '+91 9591232166'],
  whatsappNumber: '+91 8880544452',
  email: 'info@wedecorevents.com',
  address: 'Bangalore',
  city: 'Bangalore',
  state: 'Karnataka',
  country: 'IN',
};

export function LocalBusinessJsonLd({
  name,
  area,
  contact = DEFAULT_CONTACT,
  services = ['Event Decoration', 'Wedding Setup', 'Birthday Decoration', 'Haldi Decoration'],
}: {
  name: string;
  area?: string;
  contact?: Partial<ContactInfo>;
  services?: string[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: name,
    url: SITE_URL,
    telephone: contact.displayNumbers || DEFAULT_CONTACT.displayNumbers,
    email: contact.email || DEFAULT_CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: contact.city || DEFAULT_CONTACT.city,
      addressRegion: contact.state || DEFAULT_CONTACT.state,
      addressCountry: contact.country || DEFAULT_CONTACT.country,
    },
    areaServed: area || 'Bengaluru',
    serviceArea: {
      '@type': 'City',
      name: area || 'Bengaluru',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Event Decoration Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
          description: `Professional ${service.toLowerCase()} services in ${area || 'Bengaluru'}`,
        },
      })),
    },
    sameAs: [
      'https://www.instagram.com/wedecorbangalore/',
      'https://www.facebook.com/wedecorevents',
    ],
    openingHours: 'Mo-Su 09:00-21:00',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI, Bank Transfer',
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function BreadcrumbsJsonLd({ crumbs }: { crumbs: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function FAQJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'We Decor Events',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Bangalore's trusted event decoration experts for weddings, birthdays, haldi, and more.",
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8880544452',
      contactType: 'customer service',
      availableLanguage: 'English, Hindi, Kannada',
    },
    sameAs: [
      'https://www.instagram.com/wedecorbangalore/',
      'https://www.facebook.com/wedecorevents',
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'We Decor Events',
    url: SITE_URL,
    description: 'Professional event decoration services in Bangalore',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
