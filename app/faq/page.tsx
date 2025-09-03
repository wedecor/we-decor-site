import FAQ from '@/components/FAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | We Decor Bangalore',
  description: 'Find answers to common questions about our decoration services in Bangalore. Birthday, wedding, and event decoration FAQs.',
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | We Decor Bangalore',
    description: 'Find answers to common questions about our decoration services in Bangalore.',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Frequently Asked Questions | We Decor Bangalore',
    description: 'Find answers to common questions about our decoration services in Bangalore.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <FAQ />
    </div>
  );
}