'use client';

import ContactForm, {
  type ContactFormArea,
  type ContactFormEventType,
} from '@/components/ContactForm';

/** Stable client boundary for contact page — avoids RSC/webpack chunk issues */
export default function ContactFormClient(props: {
  eventTypes: ContactFormEventType[];
  areas: ContactFormArea[];
}) {
  return <ContactForm {...props} />;
}
