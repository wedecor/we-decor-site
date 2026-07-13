import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { CONTACT } from '@/lib/contact';
import PageHero from '@/components/lux/PageHero';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import PricingPageView from '@/components/analytics/PricingPageView';

export const metadata: Metadata = pageMetadata({
  path: '/pricing',
  title: 'Pricing | We Decor Events',
  description:
    'Transparent pricing for event decorations in Bangalore—birthday, engagement, home celebrations.',
});

const experiences = [
  {
    name: 'Intimate',
    price: '₹2,999+',
    desc: 'Thoughtful atmospheres for home gatherings and milestone evenings.',
    features: ['Up to 50 guests', '2–3 hour setup', 'Palette consultation'],
  },
  {
    name: 'Celebration',
    price: '₹7,999+',
    desc: 'Our most requested experience — florals, backdrops, and cohesive styling.',
    features: ['Clubhouse & residence venues', 'Photography zones', 'Dedicated creative direction'],
    featured: true,
  },
  {
    name: 'Grand',
    price: '₹15,999+',
    desc: 'Full venue transformation for weddings, receptions, and grand occasions.',
    features: ['Mandap & stage composition', 'Multi-zone styling', 'On-site coordinator'],
  },
] as const;

export default function PricingPage() {
  return (
    <div className="lux-page">
      <PricingPageView />
      <PageHero
        eyebrow="Investment"
        title="Curated experiences"
        description="Each celebration is composed individually. These are starting points for your private consultation."
      />

      <section className="lux-section pt-0 pb-28 md:pb-36 lux-section-alt">
        <div className="lux-container max-w-3xl">
          <div className="space-y-0">
            {experiences.map((tier, i) => (
              <article
                key={tier.name}
                className={`lux-experience-block lux-reveal ${i > 0 ? `lux-reveal-delay-${Math.min(i, 2)}` : ''}`}
              >
                {'featured' in tier && tier.featured ? (
                  <p className="text-[10px] tracking-tagline uppercase text-lux-gold mb-4">
                    Most requested
                  </p>
                ) : (
                  <span className="block h-5" aria-hidden />
                )}
                <div className="lux-experience-header">
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-2xl md:text-[1.9rem] font-light text-lux-ivory">
                      {tier.name}
                    </h2>
                    <p className="lux-body mt-4 max-w-lg">{tier.desc}</p>
                  </div>
                  <div className="lux-experience-price-group pl-0 md:pl-6 md:border-l md:border-white/[0.08]">
                    <p className="lux-experience-from">Starting from</p>
                    <p className="lux-experience-price">{tier.price}</p>
                  </div>
                </div>
                <ul className="mt-8 space-y-2.5 text-sm text-lux-secondary font-light max-w-xl">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="text-lux-gold/60 shrink-0" aria-hidden>
                        —
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="lux-body text-center mt-20 max-w-md mx-auto">
            Every proposal is tailored to your venue, guest count, and creative ambition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <TrackedWhatsAppLink
              href={CONTACT.waUrl()}
              source="pricing_page"
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn-primary"
            >
              Request a consultation
            </TrackedWhatsAppLink>
            <Link href="/contact" className="lux-btn-secondary text-center">
              Private enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
