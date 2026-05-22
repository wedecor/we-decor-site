'use client';

import ContactForm from '@/components/ContactForm';

/** Stable client boundary for contact page — avoids RSC/webpack chunk issues */
export default function ContactFormClient() {
  return <ContactForm />;
}
