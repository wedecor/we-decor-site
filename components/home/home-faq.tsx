import Link from 'next/link';
import { HOME_PAGE_FAQS } from '@/lib/content/site-faq';

const FAQ_LINKS: Record<string, { href: string; label: string }> = {
  [HOME_PAGE_FAQS[0].question]: { href: '/pricing', label: 'View full pricing' },
  [HOME_PAGE_FAQS[5].question]: {
    href: '/services/haldi-decoration',
    label: 'Explore haldi decoration',
  },
  [HOME_PAGE_FAQS[6].question]: {
    href: '/services/birthday-decoration',
    label: 'Explore birthday decoration',
  },
};

const faqs = HOME_PAGE_FAQS.map((item) => ({
  ...item,
  link: FAQ_LINKS[item.question],
}));

export default function HomeFaq() {
  return (
    <section className="lux-section bg-lux-bg">
      <div className="lux-container">
        <div className="mb-10">
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
