'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

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
      'Absolutely! We specialize in custom themes - from Bollywood glamour to rustic garden parties, Disney themes to traditional Indian celebrations. We work closely with you to bring your vision to life with unique, personalized decorations.',
  },
  {
    question: "What's the booking process?",
    answer:
      'Booking is simple: 1) Contact us via WhatsApp or call, 2) Share your event details and requirements, 3) Get a custom quote, 4) Confirm with a 50% advance payment, 5) We handle everything on your special day!',
  },
];

export default function FAQ() {
  return (
    <section className="max-w-4xl mx-auto py-14 md:py-16 px-6 bg-[#faf7f2] dark:bg-[#0f3d3e] rounded-2xl shadow-[0_20px_60px_rgba(15,61,62,0.1)] border border-[#0f3d3e14]">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0f3d3e] dark:text-[#faf7f2]">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-[#0f3d3e]/80 dark:text-[#faf7f2]/80">
          Everything you need to know about our decoration services
        </p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="bg-white dark:bg-[#0e3334] rounded-xl shadow-[0_10px_30px_rgba(15,61,62,0.08)] border border-[#0f3d3e14]">
                <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left hover:bg-[#ffd70014] dark:hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ffd700]/50 rounded-t-xl">
                  <span className="text-lg font-semibold text-[#0f3d3e] dark:text-[#faf7f2]">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-[#ffd700] transition-transform duration-200`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-200 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-150 ease-in"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="px-6 pb-4">
                    <p className="text-[#0f3d3e]/80 dark:text-[#faf7f2]/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </Disclosure.Panel>
                </Transition>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="text-[#0f3d3e]/80 dark:text-[#faf7f2]/70 mb-4">Still have questions?</p>
        <a
          href="https://wa.me/918880544452"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 rounded-full font-semibold bg-[#ffd700] text-[#0f3d3e] hover:bg-[#ffdf33] transition-all duration-300 shadow-[0_8px_30px_rgba(255,215,0,0.35)] focus:outline-none focus:ring-2 focus:ring-[#ffd700]/60"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48ZM12 22a10 10 0 1 1 10-10A10 10 0 0 1 12 22Zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.62.14-.71.9-.87 1.09-.32.21-.6.07a8.18 8.18 0 0 1-2.4-1.48 9.09 9.09 0 0 1-1.67-2.07c-.17-.29 0-.44.13-.58.13-.13.29-.34.43-.51a.52.52 0 0 0 .07-.54c-.07-.14-.62-1.5-.85-2.06s-.45-.45-.62-.46h-.53a1.06 1.06 0 0 0-.77.36A3.22 3.22 0 0 0 6.1 9.6c-.2.34-.3.74-.3 1.16a6.13 6.13 0 0 0 1.31 3.13 10.94 10.94 0 0 0 4.13 3.6c.58.25 1.15.41 1.54.53a3.7 3.7 0 0 0 1.7.11c.52-.08 1.65-.67 1.88-1.32s.23-1.21.16-1.32-.25-.19-.53-.33Z" />
          </svg>
          Ask on WhatsApp
        </a>
      </div>
    </section>
  );
}
