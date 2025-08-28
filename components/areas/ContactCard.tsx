"use client";
import { waLinkFor } from "./wa";
type Props = { locality: string; phone?: string };
export default function ContactCard({ locality, phone = "+919591232166" }: Props) {
  const wa = waLinkFor(locality);
  return (
    <section className="mb-10 rounded-2xl border border-white/10 p-5">
      <h3 className="text-lg font-semibold">Ready to book decoration in {locality}?</h3>
      <p className="mt-2 opacity-90">Call us or ping on WhatsApp — we'll share themes & pricing instantly.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a className="rounded-xl px-4 py-2 border border-white/15 hover:bg-white/5" href={`tel:${phone}`}>Call Now</a>
        <a className="rounded-xl px-4 py-2 border border-white/15 hover:bg-white/5" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a className="rounded-xl px-4 py-2 border border-white/15 hover:bg-white/5" href={`/contact?area=${encodeURIComponent(locality.toLowerCase().replace(/[^a-z0-9]+/g,"-"))}`}>Get a Quote</a>
      </div>
    </section>
  );
} 