import { JsonLd } from '@/lib/seo';

const faqs = [
  {
    question: 'What are your pricing packages?',
    answer:
      'Our pricing starts from ₹2,999 for basic decorations and goes up to ₹25,000+ for premium wedding setups. We offer custom quotes based on your specific requirements, venue size, and decoration complexity. Contact us for a detailed quote!',
  },
  {
    question: 'How long does setup and decoration take?',
    answer:
      'Setup time varies by event type: Birthday decorations (2-3 hours), Wedding setups (4-6 hours), and large events (6-8 hours). We always arrive early to ensure everything is perfect before your guests arrive.',
  },
  {
    question: 'Which areas in Bangalore do you serve?',
    answer:
      'We serve all areas of Bangalore including Whitefield, Koramangala, Indiranagar, Jayanagar, Malleshwaram, and surrounding areas. We also travel up to 50km from Bangalore city center for special events.',
  },
  {
    question: 'Can you customize decorations for specific themes?',
    answer:
      'Absolutely! We specialize in custom themes - from Bollywood glamour to rustic garden parties, Disney themes to traditional Indian celebrations. We work closely with you to bring your vision to life.',
  },
  {
    question: "What's the booking process?",
    answer:
      'Booking is simple: 1) Contact us via WhatsApp or call, 2) Share your event details and requirements, 3) Get a custom quote, 4) Confirm with a 50% advance payment, 5) We handle everything on your special day!',
  },
] as const;

export default function HomeFaq() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <section className="max-w-4xl mx-auto py-16 px-6">
      <JsonLd data={faqLd} />
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-700 dark:text-green-200">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Everything you need to know about our decoration services
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
