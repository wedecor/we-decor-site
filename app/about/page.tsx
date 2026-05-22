import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { BRAND } from '@/lib/design/tokens';

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
  title: 'About We Decor | Event Management in Bangalore',
  description:
    "Learn about We Decor, Bangalore's trusted event decor and event management company. Discover our story, philosophy, and what sets us apart.",
});

export default function AboutPage() {
  return (
    <div className="lux-page">
      <section className="relative overflow-hidden lux-section-tight pt-0 pb-16 md:pb-24 lux-section-glow border-b border-white/[0.08]">
        <p className="lux-brand-watermark pointer-events-none select-none" aria-hidden>
          {BRAND.monogram}
        </p>
        <div className="lux-container-narrow relative z-10 md:ml-[6%]">
          <div className="lux-reveal max-w-xl">
            <p className="lux-eyebrow mb-6 md:mb-8">Our story</p>
            <h1 className="font-display text-[2.35rem] md:text-[3rem] lg:text-[3.35rem] font-light text-lux-ivory leading-[1.14] tracking-tight">
              A studio for celebration atmosphere
            </h1>
            <p className="lux-body mt-8 md:mt-10 max-w-md">
              Editorial decoration for weddings, haldi, birthdays, and milestones — composed with
              calm execution across Bengaluru.
            </p>
          </div>
        </div>
      </section>

      <section className="lux-section-tight pt-16 md:pt-20 pb-12 md:pb-16 lux-section-alt border-b border-white/[0.08]">
        <div className="lux-container max-w-4xl">
          <div className="lux-reveal lux-reveal-delay-1 space-y-9 text-[1.0625rem] md:text-lg text-lux-secondary font-light leading-[1.88] max-w-2xl md:ml-[6%]">
            <p>
              Planning a celebration in Bengaluru should feel exciting — not overwhelming. We exist
              so you can entrust the atmosphere while you remain present for the people who matter.
            </p>
            <p>
              We are a decoration atelier specialising in weddings, birthdays, haldi ceremonies,
              engagements, and corporate milestones. Our work is guided by editorial taste, calm
              execution, and an obsession with the details guests photograph.
            </p>
            <p className="font-display text-[1.65rem] md:text-[1.85rem] text-lux-gold-soft italic leading-snug pt-2">
              {BRAND.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="lux-section-tight pt-12 md:pt-16 pb-28 md:pb-36">
        <div className="lux-container">
          <p className="lux-eyebrow mb-10 md:ml-[6%]">Our approach</p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl md:ml-[6%]">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className={`lux-editorial-card p-8 h-full lux-reveal ${i === 1 ? 'lux-reveal-delay-1' : i === 2 ? 'lux-reveal-delay-2' : ''}`}
              >
                <h2 className="font-display text-xl text-lux-ivory mb-3">{p.title}</h2>
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
    </div>
  );
}
