import Link from 'next/link';
import SchemaScript from '@/components/seo/SchemaScript';
import { absoluteUrl } from '@/lib/metadata';
import { buildFaqPageSchema } from '@/lib/local-seo';

const faqs = [
  {
    question: 'What are your pricing packages?',
    answer:
      'Packages in Bengaluru start from ₹2,999 for intimate setups and extend to ₹25,000+ for premium wedding decor. We quote based on venue, materials, and creative scope.',
    link: { href: '/pricing', label: 'View full pricing' },
  },
  {
    question: 'How long does setup take?',
    answer:
      'Birthday decor typically 2–3 hours; weddings 4–8 hours. We arrive early so your celebration begins on time.',
  },
  {
    question: 'Which Bangalore areas do you serve?',
    answer:
      'Koramangala, Whitefield, Indiranagar, Jayanagar, HSR, Hebbal, Electronic City, and neighborhoods within ~50 km of the city.',
  },
  {
    question: 'Can you match a specific theme?',
    answer:
      'Yes — traditional, minimal, Bollywood, floral luxury, or kids’ themes. We build a mood board before install.',
  },
  {
    question: 'How do I book?',
    answer:
      'WhatsApp or phone → share date and venue → receive a quote → confirm with advance → we handle setup and teardown.',
  },
] as const;

export default function HomeFaq() {
  const faqSchema = buildFaqPageSchema(faqs, absoluteUrl('/'));

  return (
    <section className="lux-section bg-lux-bg">
      {faqSchema ? <SchemaScript data={faqSchema} /> : null}
      <div className="lux-container max-w-3xl">
        <div className="text-center mb-12">
          <p className="lux-eyebrow mb-3">FAQ</p>
          <h2 className="lux-heading-sm">Questions before you enquire</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group lux-accordion overflow-hidden transition-colors duration-500 hover:border-lux-gold/25"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-6 font-display text-lg font-light text-lux-ivory hover:text-lux-gold-soft transition-colors [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span
                  className="text-lux-gold transition-transform group-open:rotate-180"
                  aria-hidden
                >
                  ▾
                </span>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-sm text-lux-secondary leading-relaxed">{faq.answer}</p>
                {'link' in faq && faq.link ? (
                  <Link
                    href={faq.link.href}
                    className="mt-3 inline-block text-sm text-lux-gold hover:underline underline-offset-4 font-medium"
                  >
                    {faq.link.label} →
                  </Link>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
