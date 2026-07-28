import Image from 'next/image';
import Link from 'next/link';
import { CONTACT } from '@/lib/contact';
import { PRICING_SUMMARY } from '@/lib/content/pricing-tiers';
import type { DecorationServicePageConfig } from '@/lib/services/decoration-service-pages';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import TrackedPhoneLink from '@/components/analytics/TrackedPhoneLink';
import SiteBreadcrumbs from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import { getServiceLocalitiesFor, RELATED_DECORATION_SERVICES } from '@/lib/seo/internal-links';
import type { ExploreLink } from '@/lib/seo/core-explore-links';
import { SERVICE_PAGE_FAQS } from '@/lib/content/service-faq';

type Props = {
  config: DecorationServicePageConfig;
};

const DEFAULT_WHY_CHOOSE = [
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

function idealOccasionsFor(config: DecorationServicePageConfig): string[] {
  if (config.idealOccasions?.length) return config.idealOccasions;
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

function faqsFor(config: DecorationServicePageConfig) {
  if (config.faqs?.length) {
    return config.faqs.map((f) => ({ q: f.question, a: f.answer }));
  }
  return SERVICE_PAGE_FAQS.map((faq) => ({ q: faq.question, a: faq.answer }));
}

function relatedFor(config: DecorationServicePageConfig, servicePath: string): ExploreLink[] {
  if (config.relatedHrefs?.length) {
    return config.relatedHrefs.map((href) => {
      const known = RELATED_DECORATION_SERVICES.find((s) => s.href === href);
      if (known) return { href: known.href, label: known.label };
      return {
        href,
        label: href
          .replace('/services/', '')
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
      };
    });
  }
  return RELATED_DECORATION_SERVICES.filter((s) => s.href !== servicePath)
    .slice(0, 8)
    .map((s) => ({
      href: s.href,
      label: s.label,
    }));
}

export default function DecorationServicePage({ config }: Props) {
  const whatsappHref = CONTACT.waUrl(config.waPrefill);
  const phoneHref = `tel:${CONTACT.PRIMARY_NUMBER}`;
  const occasions = idealOccasionsFor(config);
  const source = `service:${config.slug}`;
  const servicePath = `/services/${config.slug}`;
  const relatedServices = relatedFor(config, servicePath);
  const serviceLocalities = getServiceLocalitiesFor(servicePath);
  const whyChoose = config.whyChoose ?? DEFAULT_WHY_CHOOSE;
  const faqs = faqsFor(config);
  const isLongForm = Boolean(
    config.styles?.length ||
      config.included?.length ||
      config.pricingOverview ||
      config.budgetConsiderations ||
      config.howWeCustomize?.length ||
      config.popularDecorationOptions?.length ||
      config.themes?.length ||
      (config.faqs && config.faqs.length >= 6)
  );

  return (
    <article className="bg-lux-bg text-lux-ivory" data-has-sticky-wa>
      {/* Hero */}
      <section className="relative min-h-[78vh] md:min-h-[82vh] flex items-end overflow-hidden pt-[var(--nav-height)]">
        <Image
          src={config.ogImage}
          alt={`${config.title} — We Decor Events`}
          fill
          priority
          className="object-cover object-center lux-image-cinematic"
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 lux-overlay-gradient" aria-hidden />
        <div className="absolute inset-0 lux-hero-cinematic-side opacity-85" aria-hidden />
        <div className="absolute inset-0 lux-hero-vignette" aria-hidden />

        <div className="relative z-10 w-full lux-container px-6 pb-16 md:pb-24">
          <SiteBreadcrumbs
            className="mb-6 text-lux-muted/90"
            withSchema
            items={[
              { name: 'Home', href: '/' },
              { name: 'Services', href: '/services' },
              { name: config.title.replace(/ in Bangalore$/i, ''), href: servicePath },
            ]}
          />
          <p className="lux-eyebrow mb-4">{config.eyebrow}</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-light leading-[1.12] max-w-3xl tracking-tight">
            {config.headline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-lux-muted max-w-2xl leading-relaxed">
            {config.subheadline}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <TrackedWhatsAppLink
              href={whatsappHref}
              source={source}
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

      {/* Service overview */}
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

      {/* Why choose */}
      <section className="lux-section bg-lux-bg">
        <div className="lux-container">
          <p className="lux-eyebrow text-center mb-3">
            {config.whyChooseUsEyebrow ?? 'Why families choose us'}
          </p>
          <h2 className="lux-heading-sm text-center mb-14 md:mb-16 max-w-2xl mx-auto">
            {isLongForm
              ? `Why choose We Decor for ${config.serviceType.toLowerCase()}`
              : 'A studio approach to celebration design'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {whyChoose.map((item, i) => (
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

      {/* Decoration styles */}
      {config.styles?.length ? (
        <section className="lux-section lux-section-alt border-y border-white/[0.06]">
          <div className="lux-container">
            <p className="lux-eyebrow text-center mb-3">Styles</p>
            <h2 className="lux-heading-sm text-center mb-14 md:mb-16">Decoration styles</h2>
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {config.styles.map((item, index) => (
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
      ) : (
        <section className="lux-section lux-section-alt border-y border-white/[0.06]">
          <div className="lux-container">
            <p className="lux-eyebrow text-center mb-3">The experience</p>
            <h2 className="lux-heading-sm text-center mb-14 md:mb-16">
              What we bring to your event
            </h2>
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
      )}

      {/* Highlights as "what's distinctive" when styles already shown */}
      {config.styles?.length ? (
        <section className="lux-section bg-lux-bg">
          <div className="lux-container">
            <p className="lux-eyebrow text-center mb-3">The experience</p>
            <h2 className="lux-heading-sm text-center mb-14 md:mb-16">
              What we bring to your event
            </h2>
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
      ) : null}

      {/* Ideal occasions */}
      <section className="lux-section bg-lux-bg">
        <div className="lux-container grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <p className="lux-eyebrow mb-3">Occasions</p>
            <h2 className="lux-heading-sm">Ideal occasions</h2>
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

      {/* How we customize */}
      {config.howWeCustomize?.length ? (
        <section className="lux-section lux-section-alt border-y border-white/[0.06]">
          <div className="lux-container">
            <p className="lux-eyebrow text-center mb-3">Bespoke planning</p>
            <h2 className="lux-heading-sm text-center mb-6">How we customize your decoration</h2>
            <p className="text-center text-lux-muted max-w-2xl mx-auto mb-12 leading-relaxed">
              Every setup is planned around your brief — not a fixed catalogue. We shape the décor
              after reviewing requirements, venue, style, event size, budget, and materials.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {config.howWeCustomize.map((item, index) => (
                <div key={item.title} className="lux-surface p-8">
                  <span className="text-lux-gold/60 text-xs tracking-lux uppercase">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-lux-ivory">{item.title}</h3>
                  <p className="mt-3 text-sm text-lux-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Popular decoration options */}
      {config.popularDecorationOptions?.length ? (
        <section className="lux-section bg-lux-bg">
          <div className="lux-container">
            <p className="lux-eyebrow text-center mb-3">Directions</p>
            <h2 className="lux-heading-sm text-center mb-14">Popular decoration options</h2>
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {config.popularDecorationOptions.map((item) => (
                <div key={item.title} className="border-b border-white/[0.08] pb-6">
                  <h3 className="font-display text-xl text-lux-ivory">{item.title}</h3>
                  <p className="mt-3 text-sm text-lux-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Suitable venues */}
      {config.suitableVenues?.length ? (
        <section className="lux-section lux-section-alt border-y border-white/[0.06]">
          <div className="lux-container grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <p className="lux-eyebrow mb-3">Venues</p>
              <h2 className="lux-heading-sm">Suitable venues</h2>
            </div>
            <ul className="lg:col-span-7 flex flex-wrap gap-3 list-none p-0 m-0">
              {config.suitableVenues.map((venue) => (
                <li
                  key={venue}
                  className="rounded-full border border-white/[0.08] bg-lux-surface px-5 py-2.5 text-sm text-lux-muted"
                >
                  {venue}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* What's included */}
      {config.included?.length ? (
        <section className="lux-section bg-lux-bg">
          <div className="lux-container max-w-3xl">
            <p className="lux-eyebrow text-center mb-3">Scope</p>
            <h2 className="lux-heading-sm text-center mb-10">What&apos;s included</h2>
            <ul className="space-y-3 list-none p-0 m-0">
              {config.included.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm md:text-base text-lux-muted leading-relaxed"
                >
                  <span className="text-lux-gold/70 shrink-0" aria-hidden>
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Optional add-ons */}
      {config.optionalAddOns?.length ? (
        <section className="lux-section lux-section-alt border-y border-white/[0.06]">
          <div className="lux-container max-w-3xl">
            <p className="lux-eyebrow text-center mb-3">Extras</p>
            <h2 className="lux-heading-sm text-center mb-10">Optional add-ons</h2>
            <ul className="space-y-3 list-none p-0 m-0">
              {config.optionalAddOns.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm md:text-base text-lux-muted leading-relaxed"
                >
                  <span className="text-lux-gold/70 shrink-0" aria-hidden>
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Budget considerations — bespoke quotes */}
      {config.budgetConsiderations || config.pricingOverview ? (
        <section className="lux-section bg-lux-bg">
          <div className="lux-container">
            <p className="lux-eyebrow text-center mb-3">Investment</p>
            <h2 className="lux-heading-sm text-center mb-6">Budget considerations</h2>
            <p className="text-center text-lux-muted max-w-2xl mx-auto mb-12 leading-relaxed">
              {config.budgetConsiderations?.intro ??
                config.pricingOverview?.intro ??
                PRICING_SUMMARY}{' '}
              <Link href="/pricing" className="text-lux-gold hover:underline">
                View pricing guidance
              </Link>
              .
            </p>
            {config.budgetConsiderations?.points?.length ? (
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {config.budgetConsiderations.points.map((point) => (
                  <div key={point.title} className="lux-surface p-8 text-center md:text-left">
                    <h3 className="font-display text-xl text-lux-ivory">{point.title}</h3>
                    <p className="mt-4 text-sm text-lux-muted leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : config.pricingOverview?.tiers?.length ? (
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {config.pricingOverview.tiers.map((tier) => (
                  <div key={tier.name} className="lux-surface p-8 text-center md:text-left">
                    <h3 className="font-display text-xl text-lux-ivory">{tier.name}</h3>
                    <p className="mt-4 font-display text-2xl text-lux-gold">{tier.priceLabel}</p>
                    <p className="mt-4 text-sm text-lux-muted leading-relaxed">{tier.note}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Booking process */}
      {config.bookingProcess?.length ? (
        <section className="lux-section lux-section-alt border-t border-white/[0.06]">
          <div className="lux-container max-w-3xl">
            <p className="lux-eyebrow text-center mb-3">Next steps</p>
            <h2 className="lux-heading-sm text-center mb-10">Booking process</h2>
            <ol className="space-y-6 list-none p-0 m-0">
              {config.bookingProcess.map((item, index) => (
                <li key={item.step} className="flex gap-5">
                  <span className="font-display text-2xl text-lux-gold/40 shrink-0 w-10">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-lux-ivory">{item.step}</h3>
                    <p className="mt-2 text-sm text-lux-muted leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Setup timeline */}
      {config.setupTimeline?.length ? (
        <section className="lux-section bg-lux-bg">
          <div className="lux-container max-w-3xl">
            <p className="lux-eyebrow text-center mb-3">On the day</p>
            <h2 className="lux-heading-sm text-center mb-10">Preparation &amp; setup timeline</h2>
            <ol className="space-y-6 list-none p-0 m-0">
              {config.setupTimeline.map((item, index) => (
                <li key={item.step} className="flex gap-5">
                  <span className="font-display text-2xl text-lux-gold/40 shrink-0 w-10">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-lux-ivory">{item.step}</h3>
                    <p className="mt-2 text-sm text-lux-muted leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Popular themes */}
      {config.themes?.length ? (
        <section className="lux-section lux-section-alt border-t border-white/[0.06]">
          <div className="lux-container">
            <p className="lux-eyebrow text-center mb-3">Inspiration</p>
            <h2 className="lux-heading-sm text-center mb-14">Popular themes</h2>
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {config.themes.map((theme) => (
                <div key={theme.name} className="border-b border-white/[0.08] pb-6">
                  <h3 className="font-display text-xl text-lux-ivory">{theme.name}</h3>
                  <p className="mt-3 text-sm text-lux-muted leading-relaxed">{theme.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Gallery */}
      <section className="lux-section lux-section-alt border-t border-white/[0.06]">
        <div className="lux-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
            <div>
              <p className="lux-eyebrow mb-2">Portfolio</p>
              <h2 className="lux-heading-sm">Gallery</h2>
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
                key={`${i}-${img.caption}`}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] ${
                  i === 0 ? 'md:col-span-2 aspect-[16/10]' : 'aspect-[4/5]'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                  sizes={
                    i === 0
                      ? '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px'
                      : '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px'
                  }
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-lux-deep to-transparent">
                  <p className="text-sm text-lux-muted">{img.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Areas we serve */}
      {isLongForm ? (
        <section className="lux-section bg-lux-bg">
          <div className="lux-container">
            <p className="lux-eyebrow text-center mb-3">Coverage</p>
            <h2 className="lux-heading-sm text-center mb-6">Areas we serve</h2>
            <p className="text-center text-lux-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              {config.areasIntro ??
                'We decorate in Bangalore neighbourhoods citywide. Explore locality pages for area-specific details.'}{' '}
              <Link href="/locations" className="text-lux-gold hover:underline">
                All areas
              </Link>
            </p>
            <ul className="flex flex-wrap justify-center gap-3 list-none p-0 m-0">
              {serviceLocalities.map((loc) => (
                <li key={loc.href}>
                  <Link
                    href={loc.href}
                    className="inline-block rounded-full border border-white/[0.08] bg-lux-surface px-5 py-2.5 text-sm text-lux-muted hover:border-lux-gold/30 hover:text-lux-ivory transition-colors"
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Reviews */}
      <section className="lux-section lux-section-alt border-y border-white/[0.06]">
        <div className="lux-container max-w-3xl text-center">
          <p className="lux-eyebrow mb-3">Reviews</p>
          <h2 className="lux-heading-sm mb-8">What hosts say</h2>
          <p className="font-display text-5xl text-lux-gold/25 mb-6" aria-hidden>
            &ldquo;
          </p>
          <blockquote className="font-display text-2xl md:text-[1.75rem] leading-[1.35] text-lux-ivory">
            {config.testimonial.quote}
          </blockquote>
          <cite className="mt-8 block text-sm text-lux-muted not-italic tracking-wide">
            — {config.testimonial.attribution}
          </cite>
          <p className="mt-10">
            <Link href="/reviews" className="text-lux-gold text-sm font-medium hover:underline">
              Read more client reviews →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="lux-section-tight bg-lux-bg">
        <div className="lux-container max-w-3xl">
          <p className="lux-eyebrow text-center mb-3">Guidance</p>
          <h2 className="lux-heading-sm text-center mb-10">Customer FAQs</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
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
          <p className="mt-8 text-center text-sm text-lux-muted">
            More answers on our{' '}
            <Link href="/faq" className="text-lux-gold hover:underline">
              FAQ page
            </Link>
            .
          </p>
        </div>
      </section>

      <CoreExploreLinks
        context="service"
        related={relatedServices}
        relatedTitle="Related services"
        showLocalities={!isLongForm}
        pageKey={`service-${config.slug}`}
      />

      {/* Contact / CTA */}
      <section className="lux-section bg-lux-bg" id="contact">
        <div className="lux-container max-w-3xl">
          <div className="lux-panel p-10 md:p-14 text-center">
            <p className="lux-eyebrow mb-4">Contact</p>
            <h2 className="lux-heading-sm mb-5">Tell us about your date</h2>
            <p className="text-lux-muted leading-relaxed max-w-lg mx-auto">
              {config.ctaBody ??
                'Share venue, guest count, and the atmosphere you envision. We reply with ideas and a clear quote — usually within a few hours.'}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <TrackedWhatsAppLink
                href={whatsappHref}
                source={source}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary"
              >
                Chat on WhatsApp
              </TrackedWhatsAppLink>
              <TrackedPhoneLink href={phoneHref} source={source} className="lux-btn-secondary">
                Call {CONTACT.displayNumbers[0]}
              </TrackedPhoneLink>
            </div>
            <p className="mt-8 text-sm text-lux-muted">
              <Link href="/contact" className="text-lux-gold hover:underline">
                Enquiry form
              </Link>
              <span className="mx-2 opacity-40">·</span>
              <Link href="/pricing" className="text-lux-gold hover:underline">
                Pricing
              </Link>
              <span className="mx-2 opacity-40">·</span>
              <Link href="/gallery" className="text-lux-gold hover:underline">
                Gallery
              </Link>
              <span className="mx-2 opacity-40">·</span>
              <Link href="/locations" className="text-lux-gold hover:underline">
                Areas we serve
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 inset-x-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden bg-lux-bg/96 border-t border-white/[0.06]">
        <TrackedWhatsAppLink
          href={whatsappHref}
          source={`${source}_sticky_bar`}
          target="_blank"
          rel="noopener noreferrer"
          className="lux-btn-primary w-full text-center text-sm py-3.5"
        >
          WhatsApp quote
        </TrackedWhatsAppLink>
      </div>
      <div className="h-24 md:hidden" aria-hidden />
    </article>
  );
}
