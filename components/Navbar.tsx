'use client';

import Link from 'next/link';
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import Image from 'next/image';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#faf7f2]/90 dark:bg-[#0f3d3e]/80 backdrop-blur-md border-b border-[#0f3d3e14] dark:border-white/10 shadow-[0_6px_20px_rgba(15,61,62,0.08)] z-40 font-sans">
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
          <span className="font-bold text-2xl text-[#0f3d3e] dark:text-[#ffd700] tracking-wide group-hover:text-[#0b2d2e] dark:group-hover:text-[#ffdf33] transition">
            We Decor
          </span>
        </Link>
        {/* Desktop navigation and dark mode toggle */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/about"
            className="px-4 py-2 text-[#0f3d3e] dark:text-[#faf7f2] font-medium rounded hover:bg-[#ffd70014] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#ffd700]/50 transition"
          >
            About
          </Link>
          <Link
            href="/services"
            className="px-4 py-2 text-[#0f3d3e] dark:text-[#faf7f2] font-medium rounded hover:bg-[#ffd70014] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#ffd700]/50 transition"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="px-4 py-2 text-[#0f3d3e] dark:text-[#faf7f2] font-medium rounded hover:bg-[#ffd70014] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#ffd700]/50 transition"
          >
            Gallery
          </Link>
          <Link
            href="/areas"
            className="px-4 py-2 text-[#0f3d3e] dark:text-[#faf7f2] font-medium rounded hover:bg-[#ffd70014] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#ffd700]/50 transition"
          >
            Areas
          </Link>
          <Link
            href="/locations"
            className="px-4 py-2 text-[#0f3d3e] dark:text-[#faf7f2] font-medium rounded hover:bg-[#ffd70014] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#ffd700]/50 transition"
          >
            Locations
          </Link>
          <Link
            href="/pricing"
            className="px-4 py-2 text-[#0f3d3e] dark:text-[#faf7f2] font-medium rounded hover:bg-[#ffd70014] dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#ffd700]/50 transition"
          >
            Pricing
          </Link>
          <Link
            href="/faq"
            className="px-4 py-2 text-gray-800 dark:text-gray-200 font-medium rounded hover:bg-brand-light/20 dark:hover:bg-brand/20 focus:outline-none focus:ring-2 focus:ring-accent transition"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 text-gray-800 dark:text-gray-200 font-medium rounded hover:bg-brand-light/20 dark:hover:bg-brand/20 focus:outline-none focus:ring-2 focus:ring-accent transition"
          >
            Contact
          </Link>
          <DarkModeToggle />
        </div>
        {/* Mobile menu button and dark mode toggle */}
        <div className="md:hidden flex items-center gap-3">
          <DarkModeToggle />
          <button
            className="text-[#0f3d3e] dark:text-[#faf7f2] focus:outline-none focus:ring-2 focus:ring-[#ffd700]/50 rounded"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open menu</span>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        <div
          className={`flex-col md:hidden gap-4 ${open ? 'flex' : 'hidden'} bg-[#faf7f2]/95 dark:bg-[#0f3d3e]/95 absolute top-16 left-0 w-full shadow-lg transition-all duration-300 rounded-b-xl border border-[#0f3d3e14] dark:border-white/10`}
        >
          <Link
            href="/about"
            className="px-4 py-2 text-[#0f3d3e] dark:text-[#faf7f2] font-medium hover:bg-[#ffd70014] dark:hover:bg-white/10 rounded transition"
          >
            About
          </Link>
          <Link
            href="/services"
            className="px-4 py-2 text-[#0f3d3e] dark:text-[#faf7f2] font-medium hover:bg-[#ffd70014] dark:hover:bg-white/10 rounded transition"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="px-4 py-2 text-[#0f3d3e] dark:text-[#faf7f2] font-medium hover:bg-[#ffd70014] dark:hover:bg-white/10 rounded transition"
          >
            Gallery
          </Link>
          <Link
            href="/areas"
            className="px-4 py-2 text-[#0f3d3e] dark:text-[#faf7f2] font-medium hover:bg-[#ffd70014] dark:hover:bg-white/10 rounded transition"
          >
            Areas
          </Link>
          <Link
            href="/locations"
            className="px-4 py-2 text-[#0f3d3e] dark:text-[#faf7f2] font-medium hover:bg-[#ffd70014] dark:hover:bg-white/10 rounded transition"
          >
            Locations
          </Link>
          <Link
            href="/pricing"
            className="px-4 py-2 text-[#0f3d3e] dark:text-[#faf7f2] font-medium hover:bg-[#ffd70014] dark:hover:bg-white/10 rounded transition"
          >
            Pricing
          </Link>
          <Link
            href="/faq"
            className="px-4 py-2 text-gray-800 dark:text-gray-200 font-medium hover:bg-brand-light/20 dark:hover:bg-brand/20 rounded transition"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 text-gray-800 dark:text-gray-200 font-medium hover:bg-brand-light/20 dark:hover:bg-brand/20 rounded transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
