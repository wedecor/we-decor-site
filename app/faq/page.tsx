import FAQ from '@/components/FAQ';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/lux/PageHero';

export const metadata: Metadata = pageMetadata({
  path: '/faq',
  title: 'FAQ | We Decor Events',
  description: 'Answers to common questions about event decor, timelines, and customizations.',
});

export default function FAQPage() {
  return (
    <div className="lux-page">
      <PageHero
        eyebrow="Guidance"
        title="Frequently asked questions"
        description="Everything you need to know about timelines, pricing, and custom celebrations in Bengaluru."
      />
      <section className="lux-section pt-0 pb-20 bg-lux-bg">
        <div className="lux-container max-w-3xl">
          <FAQ />
        </div>
      </section>
    </div>
  );
}
