import Link from 'next/link';
import SchemaScript from '@/components/seo/SchemaScript';
import { absoluteUrl } from '@/lib/metadata';
import { buildFaqPageSchema } from '@/lib/local-seo';
import { SITE_FAQS } from '@/lib/content/site-faq';

const faqs = [
  {
    ...SITE_FAQS[0],
    link: { href: '/pricing', label: 'View full pricing' },
  },
  SITE_FAQS[1],
  SITE_FAQS[2],
  SITE_FAQS[3],
  SITE_FAQS[4],
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
