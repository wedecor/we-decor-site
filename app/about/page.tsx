import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { BRAND } from '@/lib/design/tokens';
import { CONTACT } from '@/lib/contact';
import SiteBreadcrumbs from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import SchemaScript from '@/components/seo/SchemaScript';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import { buildAboutPageGraph } from '@/lib/schema';

const principles = [
  {
    title: 'Editorial restraint',
    text: 'We compose atmosphere with intention — every floral, drape, and light source serves the story of your day.',
  },
  {
    title: 'Venue intelligence',
    text: 'From intimate apartments to grand banquet halls, we scale creative direction to your space and timeline.',
  },
  {
    title: 'Calm delivery',
    text: 'Early installs, discreet teardown, and one coordinator from first enquiry to final photograph.',
  },
] as const;

export const metadata: Metadata = pageMetadata({
  path: '/about',
  title: 'About | Event Management in Bangalore',
  description:
    "Learn about We Decor, Bangalore's trusted event decor and event management company. Discover our story, philosophy, and what sets us apart.",
});

export default function AboutPage() {
  return (
    <div className="lux-page">
      <SchemaScript
        data={buildAboutPageGraph({
          name: 'About We Decor Events',
          description:
            "Learn about We Decor, Bangalore's trusted event decor and event management company. Discover our story, philosophy, and what sets us apart.",
        })}
      />
      <div className="lux-container pt-[calc(var(--nav-height)+1.5rem)] pb-2">
        <SiteBreadcrumbs
          withSchema
          items={[
            { name: 'Home', href: '/' },
            { name: 'About', href: '/about' },
          ]}
        />
      </div>
      <section
        className="relative overflow-hidden lux-section-tight pt-0 pb-16 md:pb-24 lux-section-glow border-b border-white/[0.08]"
        aria-labelledby="about-heading"
      >
        <p className="lux-brand-watermark pointer-events-none select-none" aria-hidden>
          {BRAND.monogram}
        </p>
        <div className="lux-container-narrow relative z-10 md:ml-[6%]">
          <div className="lux-reveal max-w-xl">
            <p className="lux-eyebrow mb-6 md:mb-8">Our story</p>
            <h1
              id="about-heading"
              className="font-display text-[2.35rem] md:text-[3rem] lg:text-[3.35rem] font-light text-lux-ivory leading-[1.14] tracking-tight"
            >
              We Decor — Bangalore&apos;s Celebration Atelier
            </h1>
            <p className="lux-body mt-8 md:mt-10 max-w-md">
              Editorial decoration for weddings, haldi, birthdays, and milestones — composed with
              calm execution across Bengaluru.
            </p>
          </div>
        </div>
      </section>

      <section
        className="lux-section-tight pt-16 md:pt-20 pb-12 md:pb-16 lux-section-alt border-b border-white/[0.08]"
        aria-labelledby="about-story"
      >
        <div className="lux-container max-w-4xl">
          <h2 id="about-story" className="lux-heading-sm mb-10 md:ml-[6%]">
            How we work in Bengaluru
          </h2>
          <div className="lux-reveal lux-reveal-delay-1 space-y-9 text-[1.0625rem] md:text-lg text-lux-secondary font-light leading-[1.88] max-w-2xl md:ml-[6%]">
            <p>
              We Decor was founded in Bengaluru with one belief: every celebration deserves a
              thoughtfully composed atmosphere — not a catalogue setup.
            </p>
            <p>
              From intimate home birthdays in Jayanagar to grand wedding receptions in Whitefield,
              we have styled over 500 celebrations across the city.
            </p>
            <p>
              Our team brings editorial taste and calm execution to every event — arriving early,
              coordinating quietly, and leaving your space spotless.
            </p>
            <p className="font-display text-[1.65rem] md:text-[1.85rem] text-lux-gold-soft italic leading-snug pt-2">
              {BRAND.tagline}
            </p>
          </div>

          <div className="lux-reveal lux-reveal-delay-2 mt-14 md:mt-16 grid grid-cols-3 gap-6 max-w-2xl md:ml-[6%] border-t border-white/[0.08] pt-10">
            {[
              { value: '500+', label: 'Events Decorated' },
              { value: '25+', label: 'Bangalore Areas Served' },
              { value: 'Same-day', label: 'Quote Responses' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl text-lux-gold-soft">{stat.value}</p>
                <p className="mt-2 text-xs md:text-sm uppercase tracking-wide text-lux-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="lux-section-tight pt-12 md:pt-16 pb-16 md:pb-20"
        aria-labelledby="about-approach"
      >
        <div className="lux-container">
          <p className="lux-eyebrow mb-4 md:ml-[6%]">Our approach</p>
          <h2 id="about-approach" className="lux-heading-sm mb-10 md:ml-[6%]">
            Principles behind every celebration
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl md:ml-[6%]">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className={`lux-editorial-card p-8 h-full lux-reveal ${i === 1 ? 'lux-reveal-delay-1' : i === 2 ? 'lux-reveal-delay-2' : ''}`}
              >
                <h3 className="font-display text-xl text-lux-ivory mb-3">{p.title}</h3>
                <p className="text-sm text-lux-secondary leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="lux-reveal lux-reveal-delay-2 mt-16 md:mt-20 md:ml-[6%]">
            <div className="lux-divider mb-10 max-w-[10rem]" />
            <Link href="/contact" className="lux-btn-primary">
              Begin your celebration
            </Link>
          </div>
        </div>
      </section>

      <section className="lux-section bg-lux-bg border-t border-white/[0.06]">
        <div className="lux-container max-w-3xl text-center">
          <p className="lux-eyebrow mb-3">Work with us</p>
          <h2 className="lux-heading-sm mb-4">Let&apos;s plan your event</h2>
          <p className="text-lux-muted leading-relaxed mb-10">
            Share your date, venue, and vision — we&apos;ll put together a personalised proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedWhatsAppLink
              href={CONTACT.waUrlForHome()}
              source="about_cta"
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn-primary"
            >
              WhatsApp for a quote
            </TrackedWhatsAppLink>
            <Link href="/contact" className="lux-btn-secondary">
              Enquire online
            </Link>
          </div>
        </div>
      </section>

      <CoreExploreLinks context="content" showLocalities />
    </div>
  );
}
