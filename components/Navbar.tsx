import Link from "next/link";
import { useState } from "react";

// Navbar provides site-wide navigation with mobile and desktop layouts
export default function Navbar() {
  // State to control mobile menu open/close
  const [open, setOpen] = useState(false);
  return (
    // 🎨 UI Upgrade: Brand gradient, shadow, font, spacing
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-500 to-blue-500 shadow-lg z-40 font-sans">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo/brand link to homepage */}
        <Link href="/" className="font-bold text-2xl text-white tracking-wide">
          We Decor
        </Link>
        {/* Hamburger button for mobile menu toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <span className="sr-only">Open menu</span>
          <svg
            className="w-7 h-7"
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
          className={`flex-col md:flex-row md:flex gap-8 ${open ? "flex" : "hidden"} md:!flex bg-white md:bg-transparent absolute md:static top-16 left-0 w-full md:w-auto shadow-lg md:shadow-none transition-all duration-300 rounded-b-xl md:rounded-none`}
        >
          {/* Main navigation links */}
          <Link href="/about" className="px-4 py-2 text-gray-700 md:text-white font-medium hover:underline hover:decoration-2 transition">About</Link>
          <Link href="/services/birthday-decoration" className="px-4 py-2 text-gray-700 md:text-white font-medium hover:underline hover:decoration-2 transition">Services</Link>
          <Link href="/gallery" className="px-4 py-2 text-gray-700 md:text-white font-medium hover:underline hover:decoration-2 transition">Gallery</Link>
          <Link href="/pricing" className="px-4 py-2 text-gray-700 md:text-white font-medium hover:underline hover:decoration-2 transition">Pricing</Link>
          <Link href="/contact" className="px-4 py-2 text-gray-700 md:text-white font-medium hover:underline hover:decoration-2 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
