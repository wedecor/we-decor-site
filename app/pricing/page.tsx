import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pricing | We Decor Events",
  description: "Transparent pricing for event decorations in Bangalore—birthday, engagement, home celebrations.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Pricing | We Decor Events", url: "/pricing" }
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <p className="mt-2 text-muted-foreground">
        Clear packages with room for customization. Contact us for tailored quotes.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white rounded-lg shadow border text-lg text-gray-700">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left font-bold">Package</th>
              <th className="py-3 px-4 text-left font-bold">Description</th>
              <th className="py-3 px-4 text-left font-bold">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4 font-semibold">Basic</td>
              <td className="py-3 px-4">Simple decorations for small events</td>
              <td className="py-3 px-4 font-bold text-green-600">₹2,999</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 font-semibold">Standard</td>
              <td className="py-3 px-4">Complete decoration setup for medium events</td>
              <td className="py-3 px-4 font-bold text-green-600">₹5,999</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 font-semibold">Premium</td>
              <td className="py-3 px-4">Luxury decorations for large events</td>
              <td className="py-3 px-4 font-bold text-green-600">₹9,999</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">Custom</td>
              <td className="py-3 px-4">Tailored decorations for special occasions</td>
              <td className="py-3 px-4 font-bold text-green-600">Quote on request</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          All packages include setup, cleanup, and basic consultation.
        </p>
        <p className="text-sm text-gray-500">
          Contact us for custom quotes and special requirements.
        </p>
      </div>
    </section>
  );
}