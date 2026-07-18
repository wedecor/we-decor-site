'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';
import Image from 'next/image';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#faf7f2]/95 dark:bg-[#1e3a5f]/95 backdrop-blur-lg border-b border-[#1e3a5f12] dark:border-white/10 shadow-[0_4px_24px_rgba(26,77,62,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] z-40 font-sans transition-shadow duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo/brand link to homepage */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-accent rounded"
        >
          <Image
            src="/logo.png"
            alt="We Decor Logo - Event Decoration Services in Bangalore"
            width={36}
            height={36}
            className="rounded-full shadow"
            priority
          />
          <span className="font-bold text-2xl text-[#1e3a5f] dark:text-[#b76e7a] tracking-wide group-hover:text-[#0b2d2e] dark:group-hover:text-[#c98a94] transition">
            We Decor
          </span>
        </Link>
        {/* Desktop navigation and dark mode toggle */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/about"
            className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium rounded hover:bg-[#b76e7a14] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#b76e7a]/50 transition"
          >
            About
          </Link>
          <Link
            href="/services"
            className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium rounded hover:bg-[#b76e7a14] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#b76e7a]/50 transition"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium rounded hover:bg-[#b76e7a14] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#b76e7a]/50 transition"
          >
            Gallery
          </Link>
          <Link
            href="/areas"
            className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium rounded hover:bg-[#b76e7a14] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#b76e7a]/50 transition"
          >
            Areas
          </Link>
          <Link
            href="/locations"
            className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium rounded hover:bg-[#b76e7a14] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#b76e7a]/50 transition"
          >
            Locations
          </Link>
          <Link
            href="/pricing"
            className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium rounded hover:bg-[#b76e7a14] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#b76e7a]/50 transition"
          >
            Pricing
          </Link>
          <Link
            href="/faq"
            className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium rounded hover:bg-[#b76e7a14] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#b76e7a]/50 transition"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium rounded hover:bg-[#b76e7a14] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#b76e7a]/50 transition"
          >
            Contact
          </Link>
          <DarkModeToggle />
        </div>
        {/* Mobile menu button and dark mode toggle */}
        <div className="md:hidden flex items-center gap-3">
          <DarkModeToggle />
          <button
            type="button"
            className="text-[#1e3a5f] dark:text-[#faf7f2] focus:outline-none focus:ring-2 focus:ring-[#b76e7a]/50 rounded"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        {/* Mobile menu */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
          className={`flex-col md:hidden gap-4 ${open ? 'flex' : 'hidden'} bg-[#faf7f2]/95 dark:bg-[#1e3a5f]/95 absolute top-16 left-0 w-full shadow-lg transition-all duration-300 rounded-b-xl border border-[#1e3a5f14] dark:border-white/10 pb-4`}
        >
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium hover:bg-[#b76e7a14] dark:hover:bg-white/10 rounded transition"
          >
            About
          </Link>
          <Link href="/services" onClick={() => setOpen(false)} className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium hover:bg-[#b76e7a14] dark:hover:bg-white/10 rounded transition">
            Services
          </Link>
          <Link href="/gallery" onClick={() => setOpen(false)} className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium hover:bg-[#b76e7a14] dark:hover:bg-white/10 rounded transition">
            Gallery
          </Link>
          <Link href="/areas" onClick={() => setOpen(false)} className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium hover:bg-[#b76e7a14] dark:hover:bg-white/10 rounded transition">
            Areas
          </Link>
          <Link href="/locations" onClick={() => setOpen(false)} className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium hover:bg-[#b76e7a14] dark:hover:bg-white/10 rounded transition">
            Locations
          </Link>
          <Link href="/pricing" onClick={() => setOpen(false)} className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium hover:bg-[#b76e7a14] dark:hover:bg-white/10 rounded transition">
            Pricing
          </Link>
          <Link href="/faq" onClick={() => setOpen(false)} className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium hover:bg-[#b76e7a14] dark:hover:bg-white/10 rounded transition">
            FAQ
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="px-4 py-2 text-[#1e3a5f] dark:text-[#faf7f2] font-medium hover:bg-[#b76e7a14] dark:hover:bg-white/10 rounded transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
