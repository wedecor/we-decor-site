import Image from 'next/image';
import Link from 'next/link';
import { HERO_BANNER_SRC } from '@/lib/images';

export default function HomeHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      <Image
        src={HERO_BANNER_SRC}
        alt="We Decor event decoration services in Bangalore — weddings, birthdays, and celebrations"
        fill
        priority
        fetchPriority="high"
        quality={80}
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60"
        aria-hidden
      />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-16 md:py-20">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">We Decor</h1>
        <p className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 tracking-wide">
          Bringing Dreams to Life
        </p>
        <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
          Bangalore&apos;s trusted decor experts for weddings, birthdays, haldi, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-800 transition-colors duration-200 shadow-lg"
          >
            Get a Quote
          </Link>
          <Link
            href="/gallery"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-700 transition-colors duration-200"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
