import ContactForm from '@/components/ContactForm';
import Image from 'next/image';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  path: '/contact',
  title: 'Contact We Decor | Event Decoration Services in Bangalore',
  description:
    'Contact We Decor for professional event decoration services in Bangalore. WhatsApp: +91-8880544452. Birthday, wedding, haldi, and corporate event decorations.',
});

export const dynamic = 'force-static';

export default function Contact() {
  return (
    <div className="max-w-xl mx-auto py-16">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/logo.png"
          alt="We Decor logo"
          width={120}
          height={120}
          className="mb-4 rounded-full shadow-lg"
        />
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
          Get a free quote for your event decoration in Bangalore
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
