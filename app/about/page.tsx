import Link from 'next/link';
import type { Metadata } from 'next';
import { playfair, inter } from '@/app/fonts';

export const metadata: Metadata = {
  title: 'About We Decor | Event Management in Bangalore',
  description:
    "Learn about We Decor, Bangalore's trusted event decor and event management company. Discover our story, philosophy, and what sets us apart.",
  openGraph: {
    title: 'About We Decor | Event Management in Bangalore',
    description:
      "Learn about We Decor, Bangalore's trusted event decor and event management company.",
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About We Decor | Event Management in Bangalore',
    description:
      "Learn about We Decor, Bangalore's trusted event decor and event management company.",
    images: ['/logo.png'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <section className="max-w-screen-lg mx-auto py-14 md:py-16 px-6">
      <h1
        className={`${playfair.className} text-4xl md:text-5xl font-bold text-center mb-8 text-[#0f3d3e] dark:text-[#faf7f2]`}
      >
        About We Decor
      </h1>
      <p
        className={`${inter.className} text-lg text-[#0f3d3e]/80 dark:text-[#faf7f2]/80 leading-relaxed mb-8`}
      >
        Trying to keep calm while planning for a big event is hard—and we know how that feels. Allow
        us to take charge! Why take risks when We Decor is here at your service for a hassle-free
        experience? We assure you a full-fledged event management experience with the support of our
        efficient team, always ready to make your event seamless and memorable.
      </p>
      <h2
        className={`${playfair.className} text-2xl font-bold mb-4 text-[#0f3d3e] dark:text-[#faf7f2]`}
      >
        Together in Celebration
      </h2>
      <p
        className={`${inter.className} text-lg text-[#0f3d3e]/80 dark:text-[#faf7f2]/80 leading-relaxed mb-8`}
      >
        Let your event be celebrated in the most auspicious way as you sit back and enjoy. We Decor
        helps you save time, reduce costs, book organizers, and plan parties—all tailored to give
        you a seamless, fun, and innovative event experience.
      </p>
      <h2
        className={`${playfair.className} text-2xl font-bold mb-4 text-[#0f3d3e] dark:text-[#faf7f2]`}
      >
        Our Services
      </h2>
      <p
        className={`${inter.className} text-lg text-[#0f3d3e]/80 dark:text-[#faf7f2]/80 leading-relaxed mb-8`}
      >
        We Decor is a robust and flexible platform providing a curated list of services: Decoration,
        Catering, Photographers, Videographers, Florists, Make-up Artists, Hair Stylists, Mehendi
        Bookings, and more. We facilitate a variety of events, from weddings and corporate events to
        social gatherings. Our goal is to give you and your guests the joy of festivity through a
        memorable event.
      </p>
      <div className="text-center">
        <Link
          href="/services"
          className="inline-block rounded-full px-8 py-4 font-semibold mt-4 bg-[#ffd700] text-[#0f3d3e] hover:bg-[#ffdf33] transition-all duration-300 shadow-[0_8px_30px_rgba(255,215,0,0.35)] hover:shadow-[0_12px_40px_rgba(255,215,0,0.45)]"
        >
          Explore Our Services
        </Link>
      </div>
    </section>
  );
}
