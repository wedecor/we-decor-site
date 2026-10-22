import Image from 'next/image';
import Link from 'next/link';
import { HERO_IMAGES } from '@/lib/images';
import { CONTACT } from '@/lib/contact';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';

const HERO_ALT =
  'White rose floral canopy over a draped wedding stage at a Bengaluru banquet hall, by We Decor Events';

/**
 * Full-bleed hero with the copy overlaid, as before — only the photograph
 * changed.
 *
 * Two differences from the version this replaces, both forced by "show the
 * whole frame":
 *
 * 1. The section is a 16:9 box rather than `min-height: 88vh`. At 88vh on a
 *    1512px viewport the container is ~2.02:1 against a 1.78:1 image, so
 *    object-cover was cropping the top and bottom off. A 16:9 box shows the
 *    frame complete at every width.
 * 2. No portrait art direction. There is no portrait crop of this frame that
 *    is still the whole frame, so one source serves every breakpoint.
 *
 * LCP: sole `priority` image on `/`. It was once `loading="lazy"`, which cost
 * 11.8s on mobile — do not reintroduce that.
 */
export default function HomeHero() {
  return (
    <section className="lux-hero-root">
      {/*
        `quality` must be one of next.config.js `images.qualities`. Next 16
        rejects any value not declared there and the frame renders blank with
        no error in the page — 74 cost a round trip to find. Hero is 80 (in
        the allow-list) so the LCP frame is not re-encoded softer than the
        2400px source.
      */}
      <div className="lux-hero-media">
        <Image
          src={HERO_IMAGES.banquet}
          alt={HERO_ALT}
          fill
          priority
          fetchPriority="high"
          quality={80}
          /*
            100svh on a phone is a portrait box. object-cover of a 16:9 frame
            into that box displays the image at ~180vw, not 100vw — sizes
            "100vw" was requesting ~828px and stretching it, which is why the
            banquet looked soft. 180vh tracks the covered width.
          */
          sizes="(max-width: 767px) 180vh, 100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-[1] lux-hero-scrim pointer-events-none" aria-hidden />
      <div
        className="absolute inset-0 z-[1] lux-hero-cinematic-side opacity-80 pointer-events-none hidden md:block"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] lux-hero-vignette opacity-70 md:opacity-100 pointer-events-none"
        aria-hidden
      />

      <div className="lux-hero-content">
        <p className="lux-eyebrow mb-5 md:mb-6">Bengaluru · Celebrations reimagined</p>
        <h1
          className="font-display font-light text-lux-ivory max-w-2xl leading-[1.18] tracking-tight"
          style={{ fontSize: 'clamp(2.125rem, 4.5vw, 3.65rem)' }}
        >
          Premium Event Decorations in Bangalore — for Weddings, Birthdays, Haldi &amp; Engagements
        </h1>
        <p className="mt-7 md:mt-8 max-w-md text-[0.9375rem] md:text-base font-light leading-[1.85] text-lux-ivory">
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
