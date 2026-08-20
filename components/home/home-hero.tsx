import { getImageProps } from 'next/image';
import Link from 'next/link';
import { HERO_IMAGES, HERO_IMAGES_PORTRAIT } from '@/lib/images';
import { CONTACT } from '@/lib/contact';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';

const HERO_ALT = 'Floral arch and engagement decoration setup in Bengaluru by We Decor Events';

/**
 * Art-directed homepage hero.
 * Mobile LCP uses the 1200×1600 portrait crop (preload + fetchPriority=high).
 * Desktop uses the 2400×1350 wide crop. Both stay at quality 65 and sizes=100vw
 * so phones are never served a 1920/2048 landscape encode.
 */
function HeroBackground() {
  const shared = { alt: HERO_ALT, sizes: '100vw', quality: 65 as const };

  const {
    props: { srcSet: mobileSrcSet, src: mobileSrc, sizes: mobileSizes, ...mobileRest },
  } = getImageProps({
    ...shared,
    src: HERO_IMAGES_PORTRAIT.arch,
    width: 1200,
    height: 1600,
  });

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...shared,
    src: HERO_IMAGES.arch,
    width: 2400,
    height: 1350,
  });

  // Drop width/height attrs — hero is position:absolute + object-fit cover.
  const { width: _w, height: _h, ...imgProps } = mobileRest;

  return (
    <div className="lux-hero-media">
      {/* Mobile-only preload — matches the Lighthouse LCP element */}
      <link
        rel="preload"
        as="image"
        imageSrcSet={mobileSrcSet}
        imageSizes="100vw"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
        <img
          {...imgProps}
          src={mobileSrc}
          srcSet={mobileSrcSet}
          sizes={mobileSizes}
          alt={HERO_ALT}
          decoding="async"
          fetchPriority="high"
          className="object-cover object-center lux-image-cinematic"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </picture>
    </div>
  );
}

export default function HomeHero() {
  return (
    <section className="lux-hero-root">
      <HeroBackground />
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
          Premium Event Decorations in Bangalore — for Weddings, Birthdays, Haldi &amp; Engagements
        </h1>
        <p className="lux-body mt-7 md:mt-8 max-w-md">
          We design and style every occasion across Bengaluru, from home celebrations to grand
          venues — trusted by families for thoughtful, calm execution.
        </p>
        <div className="mt-7 md:mt-12 flex flex-col sm:flex-row gap-4">
          <TrackedWhatsAppLink
            href={CONTACT.waUrlForHome()}
            source="home_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="lux-btn-primary"
          >
            WhatsApp for a quote
          </TrackedWhatsAppLink>
          <Link href="/gallery" className="lux-btn-secondary">
            View our work
          </Link>
        </div>
      </div>
    </section>
  );
}
