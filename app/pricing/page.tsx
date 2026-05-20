import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  path: '/pricing',
  title: 'Pricing | We Decor Events',
  description:
    'Transparent pricing for event decorations in Bangalore—birthday, engagement, home celebrations.',
});

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <p className="mt-2 text-muted-foreground">
        Clear packages with room for customization. Contact us for tailored quotes.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">Basic</h2>
          <p className="mt-2 text-2xl font-bold">₹2,999+</p>
          <p className="mt-2 text-sm opacity-80">Balloon decor, simple backdrops</p>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">Standard</h2>
          <p className="mt-2 text-2xl font-bold">₹7,999+</p>
          <p className="mt-2 text-sm opacity-80">Themed setups, floral accents</p>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">Premium</h2>
          <p className="mt-2 text-2xl font-bold">₹15,999+</p>
          <p className="mt-2 text-sm opacity-80">Full venue transformation</p>
        </div>
      </div>
      <p className="mt-8 text-sm opacity-70">
        Final pricing depends on venue size, materials, and customization. WhatsApp us for an exact
        quote.
      </p>
    </main>
  );
}
