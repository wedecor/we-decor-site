import ContactForm from '@/components/ContactForm';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact We Decor | Event Decoration Services in Bangalore',
  description: 'Contact We Decor for professional event decoration services in Bangalore. WhatsApp: +91-8880544452. Birthday, wedding, haldi, and corporate event decorations.',
  openGraph: {
    title: 'Contact We Decor | Event Decoration Services in Bangalore',
    description: 'Contact We Decor for professional event decoration services in Bangalore. WhatsApp: +91-8880544452.',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact We Decor | Event Decoration Services in Bangalore',
    description: 'Contact We Decor for professional event decoration services in Bangalore. WhatsApp: +91-8880544452.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: '/contact',
  },
};

export const dynamic = 'force-static';

export default function Contact() {
  return (
    <div className="max-w-xl mx-auto py-16">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/logo.png"
          alt="We Decor Logo - Contact for Event Decoration Services"
          width={48}
          height={48}
          className="mb-2 rounded-full shadow"
          priority
        />
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">Contact We Decor</h1>
      </div>
      <ContactForm />
      <div className="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sBangalore!5e0!3m2!1sen!2sin!4v0000000000000"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="We Decor Location in Bangalore"
        ></iframe>
      </div>
    </div>
  );
}