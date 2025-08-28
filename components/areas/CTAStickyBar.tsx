"use client";
import { useEffect, useState } from "react";
import { waLinkFor } from "./wa";

export default function CTAStickyBar({ locality }: { locality: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const wa = waLinkFor(locality);
  return (
    <div className={`fixed inset-x-0 bottom-4 z-40 transition-all ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}`}>
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 backdrop-blur bg-white/95 dark:bg-gray-800/95 p-3 flex gap-3 justify-between shadow-lg">
          <span className="text-sm sm:text-base text-gray-900 dark:text-white">Planning an event in <b>{locality}</b>? Get themes & pricing now.</span>
          <div className="flex gap-2">
            <a className="rounded-xl px-3 py-2 border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-sm" href="tel:+919591232166">Call</a>
            <a className="rounded-xl px-3 py-2 border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-sm" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
} 