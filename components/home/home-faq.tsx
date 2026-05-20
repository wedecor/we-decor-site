import SchemaScript from '@/components/seo/SchemaScript';
import { absoluteUrl } from '@/lib/metadata';
import { buildFaqPageSchema } from '@/lib/local-seo';

const faqs = [
  {
    question: 'What are your pricing packages?',
    answer:
      'Our decoration packages in Bengaluru start from ₹2,999 for basic setups and go up to ₹25,000+ for premium wedding decor. We provide custom quotes based on venue size, materials, and theme complexity.',
  },
  {
    question: 'How long does setup and decoration take?',
    answer:
      'Setup time varies: birthday decor (2–3 hours), wedding setups (4–6 hours), and large events (6–8 hours). We arrive early across Bangalore so everything is ready before guests arrive.',
  },
  {
    question: 'Which areas in Bangalore do you serve?',
    answer:
      'We serve Bengaluru including Koramangala, Whitefield, Indiranagar, Jayanagar, HSR Layout, Hebbal, Electronic City, and surrounding neighborhoods within ~50 km of the city.',
  },
  {
    question: 'Can you customize decorations for specific themes?',
    answer:
      'Yes — from traditional Indian weddings to modern minimal themes, Bollywood nights, and kids’ parties. We tailor decor to your venue and vision.',
  },
  {
    question: "What's the booking process?",
    answer:
      'Contact us on WhatsApp or phone, share event date and location, receive a custom quote, confirm with advance payment, and we handle setup and teardown on event day.',
  },
] as const;

export default function HomeFaq() {
  const faqSchema = buildFaqPageSchema(faqs, absoluteUrl('/'));

  return (
    <section className="max-w-4xl mx-auto py-16 px-6">
      {faqSchema ? <SchemaScript data={faqSchema} /> : null}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-700 dark:text-green-200">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Everything you need to know about our decoration services in Bengaluru
        </p>
      </div>
      <div className="space-y-4 rounded-2xl bg-gradient-to-br from-green-50 to-pink-50 dark:from-gray-900 dark:to-gray-900 p-6 shadow-lg">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-gray-900 dark:text-white hover:bg-green-50 dark:hover:bg-gray-900 rounded-lg [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span
                className="shrink-0 text-green-600 transition-transform group-open:rotate-180"
                aria-hidden
              >
                ▼
              </span>
            </summary>
            <p className="px-6 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
