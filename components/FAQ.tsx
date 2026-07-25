'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { CONTACT } from '@/lib/contact';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import { SITE_FAQS } from '@/lib/content/site-faq';

const faqs = SITE_FAQS;

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
        <TrackedWhatsAppLink
          href={CONTACT.waUrl()}
          source="faq_page"
          target="_blank"
          rel="noopener noreferrer"
          className="lux-btn-primary"
        >
          Ask on WhatsApp
        </TrackedWhatsAppLink>
      </div>
    </div>
  );
}
