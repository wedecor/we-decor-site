import Image from 'next/image';
import Link from 'next/link';
import { CONTACT } from '@/lib/contact';
import type { DecorationServicePageConfig } from '@/lib/services/decoration-service-pages';

type Props = {
  config: DecorationServicePageConfig;
};

const WHY_CHOOSE = [
  {
    title: 'Editorial styling',
    text: 'Palettes, florals, and proportions composed like a couture set — never catalogue clutter.',
  },
  {
    title: 'Venue intelligence',
    text: 'Apartments, terraces, clubhouses, and banquet halls across Bengaluru — sized and timed correctly.',
  },
  {
    title: 'Calm delivery',
    text: 'Early installs, discreet teardown, and one coordinator from quote to celebration.',
  },
] as const;

const DEFAULT_FAQ = [
  {
    q: 'How far in advance should we book?',
    a: 'Peak wedding and festival weekends fill quickly. We recommend reaching out 2–4 weeks ahead for home celebrations and earlier for large venue styling.',
  },
  {
    q: 'Do you travel across Bangalore?',
    a: 'Yes — we serve localities across Bengaluru and surrounding areas within approximately 50 km, subject to team availability.',
  },
  {
    q: 'Can the decor match our theme or colours?',
    a: 'Every setup is tailored. Share references, Pinterest boards, or a mood — we translate it into florals, backdrops, and accents that photograph beautifully.',
  },
] as const;

function idealOccasionsFor(config: DecorationServicePageConfig): string[] {
  const t = config.serviceType.toLowerCase();
  if (t.includes('haldi'))
    return ['Home haldi', 'Terrace mornings', 'Pre-wedding brunches', 'Intimate family gatherings'];
  if (t.includes('birthday'))
    return ['Milestone birthdays', 'Kids celebrations', 'Surprise home decor', 'Clubhouse parties'];
  if (t.includes('wedding') || t.includes('engagement'))
    return ['Engagement stages', 'Reception styling', 'Mandap accents', 'Couple photography zones'];
  if (t.includes('corporate'))
    return ['Brand launches', 'Award evenings', 'Team celebrations', 'Executive dinners'];
  return [
    'Family celebrations',
    'Festive gatherings',
    'Photo-ready moments',
    'Private venue styling',
  ];
}

export default function DecorationServicePage({ config }: Props) {
  const whatsappHref = CONTACT.waUrl(config.waPrefill);
  const phoneHref = `tel:${CONTACT.PRIMARY_NUMBER}`;
  const occasions = idealOccasionsFor(config);

  return (
    <article className="bg-lux-bg text-lux-ivory">
      {/* Cinematic hero */}
      <section className="relative min-h-[78vh] md:min-h-[82vh] flex items-end overflow-hidden pt-[var(--nav-height)]">
        <Image
          src={config.ogImage}
          alt={`${config.headline} — We Decor Events, Bangalore`}
          fill
          priority
          className="object-cover object-center lux-image-cinematic"
          sizes="100vw"
          quality={82}
        />
        <div className="absolute inset-0 lux-overlay-gradient" aria-hidden />
        <div className="absolute inset-0 lux-hero-cinematic-side opacity-85" aria-hidden />
        <div className="absolute inset-0 lux-hero-vignette" aria-hidden />

        <div className="relative z-10 w-full lux-container px-6 pb-16 md:pb-24">
          <p className="lux-eyebrow mb-4">{config.eyebrow}</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-light leading-[1.12] max-w-3xl tracking-tight">
            {config.headline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-lux-muted max-w-2xl leading-relaxed">
            {config.subheadline}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn-primary"
            >
              WhatsApp for a quote
            </a>
            <a href="/contact" className="lux-btn-secondary">
              Enquire online
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-lux-muted">
            {config.trustSignals.map((signal) => (
              <li key={signal} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-lux-gold/80" aria-hidden />
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Floating story panel */}
      <section className="relative z-20 -mt-10 md:-mt-16 px-6">
        <div className="lux-container">
          <div className="lux-panel p-8 md:p-12 grid lg:grid-cols-12 gap-10 md:gap-14">
            <div className="lg:col-span-4">
              <h2 className="lux-heading-sm">{config.storyTitle}</h2>
              <p className="lux-eyebrow mt-5 text-lux-muted normal-case tracking-normal text-sm">
                We Decor Events · Bengaluru
              </p>
            </div>
            <div className="lg:col-span-8 space-y-6 text-lg text-lux-muted leading-relaxed">
              {config.storyParagraphs.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="lux-section bg-lux-bg">
        <div className="lux-container">
          <p className="lux-eyebrow text-center mb-3">Why families choose us</p>
          <h2 className="lux-heading-sm text-center mb-14 md:mb-16 max-w-2xl mx-auto">
            A studio approach to celebration design
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {WHY_CHOOSE.map((item, i) => (
              <div key={item.title} className="text-center md:text-left">
                <span className="font-display text-4xl text-lux-gold/25">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-xl text-lux-ivory">{item.title}</h3>
                <p className="mt-3 text-sm text-lux-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience highlights */}
      <section className="lux-section lux-section-alt border-y border-white/[0.06]">
        <div className="lux-container">
          <p className="lux-eyebrow text-center mb-3">The experience</p>
          <h2 className="lux-heading-sm text-center mb-14 md:mb-16">What we bring to your event</h2>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {config.highlights.map((item, index) => (
              <div
                key={item.title}
                className="lux-surface p-8 md:p-10 hover:border-lux-gold/20 transition-colors duration-300"
              >
                <span className="text-lux-gold/60 text-xs tracking-lux uppercase">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-xl md:text-2xl text-lux-ivory">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-lux-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal occasions */}
      <section className="lux-section bg-lux-bg">
        <div className="lux-container grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <p className="lux-eyebrow mb-3">Occasions</p>
            <h2 className="lux-heading-sm">Perfect for</h2>
          </div>
          <ul className="lg:col-span-7 flex flex-wrap gap-3 list-none p-0 m-0">
            {occasions.map((o) => (
              <li
                key={o}
                className="rounded-full border border-white/[0.08] bg-lux-surface px-5 py-2.5 text-sm text-lux-muted"
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="lux-section lux-section-alt border-t border-white/[0.06]">
        <div className="lux-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
            <div>
              <p className="lux-eyebrow mb-2">Portfolio</p>
              <h2 className="lux-heading-sm">Setup gallery</h2>
            </div>
            <Link
              href="/gallery"
              className="text-lux-gold text-sm font-medium hover:underline shrink-0"
            >
              Full gallery →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {config.gallery.map((img, i) => (
              <figure
                key={img.src}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] ${
                  i === 0 ? 'md:col-span-2 aspect-[16/10]' : 'aspect-[4/5]'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                  sizes={i === 0 ? '66vw' : '33vw'}
                  loading={i === 0 ? undefined : 'lazy'}
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-lux-deep to-transparent">
                  <p className="text-sm text-lux-muted">{img.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="lux-section bg-lux-bg">
        <div className="lux-container max-w-3xl text-center">
          <p className="font-display text-5xl text-lux-gold/25 mb-6" aria-hidden>
            &ldquo;
          </p>
          <blockquote className="font-display text-2xl md:text-[1.75rem] leading-[1.35] text-lux-ivory">
            {config.testimonial.quote}
          </blockquote>
          <cite className="mt-8 block text-sm text-lux-muted not-italic tracking-wide">
            — {config.testimonial.attribution}
          </cite>
        </div>
      </section>

      {/* FAQ */}
      <section className="lux-section-tight lux-section-alt border-t border-white/[0.06]">
        <div className="lux-container max-w-3xl">
          <p className="lux-eyebrow text-center mb-3">Guidance</p>
          <h2 className="lux-heading-sm text-center mb-10">Common questions</h2>
          <div className="space-y-3">
            {DEFAULT_FAQ.map((faq) => (
              <details key={faq.q} className="lux-surface group">
                <summary className="cursor-pointer list-none px-6 py-5 font-medium text-lux-ivory flex justify-between items-center gap-4">
                  {faq.q}
                  <span className="text-lux-gold text-lg group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-sm text-lux-muted leading-relaxed -mt-1">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lux-section bg-lux-bg">
        <div className="lux-container max-w-3xl">
          <div className="lux-panel p-10 md:p-14 text-center">
            <p className="lux-eyebrow mb-4">Begin</p>
            <h2 className="lux-heading-sm mb-5">Tell us about your date</h2>
            <p className="text-lux-muted leading-relaxed max-w-lg mx-auto">
              Share venue, guest count, and the atmosphere you envision. We reply with ideas and a
              clear quote — usually within a few hours.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary"
              >
                Chat on WhatsApp
              </a>
              <a href={phoneHref} className="lux-btn-secondary">
                Call {CONTACT.displayNumbers[0]}
              </a>
            </div>
            <p className="mt-8 text-sm text-lux-muted">
              <a href="/contact" className="text-lux-gold hover:underline">
                Enquiry form
              </a>
              <span className="mx-2 opacity-40">·</span>
              <a href="/locations" className="text-lux-gold hover:underline">
                Areas we serve
              </a>
            </p>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 inset-x-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden bg-lux-bg/96 border-t border-white/[0.06]">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="lux-btn-primary w-full text-center text-sm py-3.5"
        >
          WhatsApp quote
        </a>
      </div>
      <div className="h-24 md:hidden" aria-hidden />
    </article>
  );
}
