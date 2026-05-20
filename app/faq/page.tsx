import FAQ from '@/components/FAQ';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  path: '/faq',
  title: 'FAQ | We Decor Events',
  description: 'Answers to common questions about event decor, timelines, and customizations.',
});

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
      <FAQ />
    </main>
  );
}
