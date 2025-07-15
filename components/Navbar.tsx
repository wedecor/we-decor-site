import Link from "next/link";
import { useState } from "react";

// Navbar provides site-wide navigation with mobile and desktop layouts
export default function Navbar() {
  // State to control mobile menu open/close
  const [open, setOpen] = useState(false);
  return (
    // Sticky nav at the top, with shadow for separation
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo/brand link to homepage */}
        <Link href="/" className="font-bold text-xl">
          We Decor
        </Link>
        {/* Hamburger button for mobile menu toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <span className="sr-only">Open menu</span>
          {/* Hamburger icon for accessibility */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Responsive nav links: column on mobile, row on desktop */}
        <div
          className={`flex-col md:flex-row md:flex gap-6 ${open ? "flex" : "hidden"} md:!flex`}
        >
          {/* Main navigation links */}
          <Link href="/about">About</Link>
          <Link href="/services/birthday-decoration">Services</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
