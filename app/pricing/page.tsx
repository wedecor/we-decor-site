import type { Metadata } from 'next';
import { playfair, inter } from '@/app/fonts';

export const metadata: Metadata = {
  title: 'Pricing | We Decor Events',
  description:
    'Transparent pricing for event decorations in Bangalore—birthday, engagement, home celebrations.',
  alternates: { canonical: '/pricing' },
  openGraph: { title: 'Pricing | We Decor Events', url: '/pricing' },
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14 md:py-16">
      <h1
        className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#0f3d3e] dark:text-[#faf7f2]`}
      >
        Pricing
      </h1>
      <p className={`${inter.className} mt-2 text-[#0f3d3e]/80 dark:text-[#faf7f2]/80`}>
        Clear packages with room for customization. Contact us for tailored quotes.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white dark:bg-[#0f3d3e] rounded-xl shadow-[0_10px_30px_rgba(15,61,62,0.08)] border border-[#0f3d3e14] text-lg text-[#0f3d3e] dark:text-[#faf7f2]">
          <thead>
            <tr className="bg-[#faf7f2] dark:bg-[#0e3334]">
              <th className="py-3 px-4 text-left font-bold">Package</th>
              <th className="py-3 px-4 text-left font-bold">Description</th>
              <th className="py-3 px-4 text-left font-bold">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#0f3d3e14]">
              <td className="py-3 px-4 font-semibold">Basic</td>
              <td className="py-3 px-4">Simple decorations for small events</td>
              <td className="py-3 px-4 font-bold text-[#0f3d3e] dark:text-[#ffd700]">₹2,999</td>
            </tr>
            <tr className="border-b border-[#0f3d3e14]">
              <td className="py-3 px-4 font-semibold">Standard</td>
              <td className="py-3 px-4">Complete decoration setup for medium events</td>
              <td className="py-3 px-4 font-bold text-[#0f3d3e] dark:text-[#ffd700]">₹5,999</td>
            </tr>
            <tr className="border-b border-[#0f3d3e14]">
              <td className="py-3 px-4 font-semibold">Premium</td>
              <td className="py-3 px-4">Luxury decorations for large events</td>
              <td className="py-3 px-4 font-bold text-[#0f3d3e] dark:text-[#ffd700]">₹9,999</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">Custom</td>
              <td className="py-3 px-4">Tailored decorations for special occasions</td>
              <td className="py-3 px-4 font-bold text-[#0f3d3e] dark:text-[#ffd700]">
                Quote on request
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <p className="text-[#0f3d3e]/80 dark:text-[#faf7f2]/80 mb-4">
          All packages include setup, cleanup, and basic consultation.
        </p>
        <p className="text-sm text-[#0f3d3e]/70 dark:text-[#faf7f2]/70">
          Contact us for custom quotes and special requirements.
        </p>
      </div>
    </main>
  );
}
