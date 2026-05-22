import Image from 'next/image';
import Link from 'next/link';
import { HERO_BACKGROUND_SRC } from '@/lib/images';
import { CONTACT } from '@/lib/contact';

export default function HomeHero() {
  return (
    <section className="lux-hero-root">
      <div className="lux-hero-media">
        <Image
          src={HERO_BACKGROUND_SRC}
          alt="Luxury engagement and wedding decoration in Bengaluru by We Decor Events"
          fill
          priority
          className="object-cover object-center lux-image-cinematic"
          sizes="100vw"
          quality={82}
        />
      </div>
      <div
        className="absolute inset-0 z-[1] lux-overlay-gradient pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] lux-hero-cinematic-side opacity-80 pointer-events-none"
        aria-hidden
      />
      <div className="absolute inset-0 z-[1] lux-hero-vignette pointer-events-none" aria-hidden />

      <div className="lux-hero-content">
        <p className="lux-eyebrow mb-5 md:mb-6">Bengaluru · Celebrations reimagined</p>
        <h1
          className="font-display font-light text-lux-ivory max-w-2xl leading-[1.18] tracking-tight"
          style={{ fontSize: 'clamp(2.125rem, 4.5vw, 3.65rem)' }}
        >
          Where every celebration becomes a memory
        </h1>
        <p className="lux-body mt-7 md:mt-8 max-w-md">
          Immersive wedding, haldi, and engagement atmospheres — composed with editorial restraint.
        </p>
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">
          <a
            href={CONTACT.waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="lux-btn-primary"
          >
            WhatsApp for a quote
          </a>
          <Link href="/gallery" className="lux-btn-secondary">
            View our work
          </Link>
        </div>
      </div>
    </section>
  );
}
