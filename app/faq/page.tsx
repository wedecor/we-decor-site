import FAQ from '@/components/FAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "FAQ | We Decor Events",
  description: "Answers to common questions about event decor, timelines, and customizations.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "FAQ | We Decor Events", url: "/faq" }
};

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
      <FAQ />
    </main>
  );
}