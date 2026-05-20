import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  path: '/about',
  title: 'About We Decor | Event Management in Bangalore',
  description:
    "Learn about We Decor, Bangalore's trusted event decor and event management company. Discover our story, philosophy, and what sets us apart.",
});

export default function AboutPage() {
  return (
    <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        About We Decor
      </h1>
      <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">
        Trying to keep calm while planning for a big event is hard—and we know how that feels.
        Allow us to take charge! Why take risks when We Decor is here at your service for a
        hassle-free experience? We assure you a full-fledged event management experience with the
        best decor, catering, and entertainment.
      </p>
      <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">
        We Decor is a Bangalore-based event decoration company specializing in weddings, birthdays,
        haldi ceremonies, engagements, and corporate events. Our team brings creativity, attention
        to detail, and a passion for making your celebrations unforgettable.
      </p>
      <div className="text-center">
        <Link
          href="/contact"
          className="inline-block bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
