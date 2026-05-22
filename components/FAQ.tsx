'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { CONTACT } from '@/lib/contact';

const faqs = [
  {
    question: 'What are your pricing packages?',
    answer:
      'Our proposals begin from intimate home celebrations and scale with venue size, florals, and creative direction. Every quote is composed individually — never pulled from a catalogue.',
  },
  {
    question: 'How long does setup and decoration take?',
    answer:
      'Home and birthday setups typically require 2–3 hours. Weddings and large venues may require 4–8 hours. We arrive with buffer time so your space is ready before guests.',
  },
  {
    question: 'Which areas in Bangalore do you serve?',
    answer:
      'We serve Bengaluru across Koramangala, Whitefield, Indiranagar, Jayanagar, Hebbal, Malleshwaram, and surrounding localities within approximately 50 km.',
  },
  {
    question: 'Can you customize decorations for specific themes?',
    answer:
      'Yes. Share references, palettes, or a mood — we translate it into florals, backdrops, and accents designed for your light and photography.',
  },
  {
    question: "What's the booking process?",
    answer:
      'Reach us on WhatsApp or through our enquiry form, receive a tailored proposal, and confirm with an advance to reserve your date.',
  },
];

export default function FAQ() {
  return (
    <div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="lux-accordion overflow-hidden transition-colors duration-500 hover:border-lux-gold/25">
                <Disclosure.Button className="flex w-full justify-between items-center gap-4 px-7 py-6 text-left hover:bg-white/[0.02] transition-colors">
                  <span className="font-display text-lg md:text-xl font-light text-lux-ivory pr-4">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 shrink-0 text-lux-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-300 ease-out"
                  enterFrom="opacity-0 -translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition duration-200 ease-in"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Disclosure.Panel className="px-7 pb-6 pt-0">
                    <p className="text-sm md:text-base text-lux-secondary font-light leading-[1.75]">
                      {faq.answer}
                    </p>
                  </Disclosure.Panel>
                </Transition>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
      <div className="text-center mt-16">
        <p className="text-lux-secondary font-light mb-6">Still have questions?</p>
        <a
          href={CONTACT.waUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="lux-btn-primary"
        >
          Ask on WhatsApp
        </a>
      </div>
    </div>
  );
}
