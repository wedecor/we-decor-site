"use client";
import { CONTACT } from "@/lib/contact";

type Props = { locality: string };

export default function ContactCard({ locality }: Props) {
  const wa = CONTACT.waUrlForLocality(locality);
  const telLinks = CONTACT.telLinks();
  
  return (
    <section className="mb-10 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ready to book decoration in {locality}?</h3>
      <p className="mt-2 opacity-90 text-gray-700 dark:text-gray-300">Call us or ping on WhatsApp — we'll share themes & pricing instantly.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a className="rounded-xl px-4 py-2 border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors" href={`tel:${telLinks[0].raw}`}>{telLinks[0].label}</a>
        <a className="rounded-xl px-4 py-2 border border-green-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a className="rounded-xl px-4 py-2 border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors" href={`/contact?area=${encodeURIComponent(locality.toLowerCase().replace(/[^a-z0-9]+/g,"-"))}`}>Get a Quote</a>
      </div>
    </section>
  );
} 