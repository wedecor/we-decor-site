import React from 'react';
import { notFound } from 'next/navigation';
import { AREAS } from '@/app/(site)/_data/locations';
import { SITE_URL } from '@/lib/site';
import AreaHero from '@/components/areas/AreaHero';
import ServicesGrid from '@/components/areas/ServicesGrid';
import FAQAccordion from '@/components/areas/FAQAccordion';
import ContactCard from '@/components/areas/ContactCard';
import { FaqPageJsonLd } from '@/components/seo/FaqJsonLd';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);
  if (!area) return {};
  const base = SITE_URL.replace(/\/+$/, '');
  const title = `${area.name} Event Decoration | We Decor Events`;
  const description = `Premium birthday, engagement & wedding decor in ${area.name}. Professional event decoration services for weddings, birthdays, haldi, and more.`;
  return {
    title,
    description,
    alternates: { canonical: `${base}/areas/${area.slug}` },
    openGraph: { title, description, url: `${base}/areas/${area.slug}`, type: 'article' },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug) as any;
  if (!area) return notFound();
  const base = SITE_URL.replace(/\/+$/, '');
  const faqs = (area.uniqueFAQ || []).map((faq: { q: string; a: string }) => ({
    question: faq.q,
    answer: faq.a,
  }));
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: 'Areas', item: `${base}/areas` },
      { '@type': 'ListItem', position: 3, name: area.name, item: `${base}/areas/${area.slug}` },
    ],
  };
  const services = [
    'Wedding Decoration',
    'Birthday Decoration',
    'Haldi Decoration',
    'Engagement Decoration',
    'Baby Shower Decoration',
    'Anniversary Decoration',
    'Corporate Event Decoration',
    'Proposal Decoration',
    'Mehendi Décor',
    'Naming Ceremony Décor',
    'Housewarming Décor',
    'Theme Party Décor',
    'Festival Decoration',
    'Balloon Decoration',
  ];
  return (
    <>
      <AreaHero
        title={`Event Decoration in ${area.name}`}
        intro={area.heroTagline || `Professional event decoration services in ${area.name}`}
        locality={area.name}
      />
      <ServicesGrid locality={area.name} services={services} />
      <FAQAccordion locality={area.name} faqs={faqs} />
      <ContactCard locality={area.name} />
      {/* JSON-LD: FAQPage */}
      <FaqPageJsonLd faqs={faqs} url={`${base}/areas/${area.slug}`} />
      {/* JSON-LD: Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
