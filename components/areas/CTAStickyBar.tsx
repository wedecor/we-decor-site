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
        <div className="rounded-2xl border border-white/10 backdrop-blur bg-black/40 p-3 flex gap-3 justify-between">
          <span className="text-sm sm:text-base">Planning an event in <b>{locality}</b>? Get themes & pricing now.</span>
          <div className="flex gap-2">
            <a className="rounded-xl px-3 py-2 border border-white/15 hover:bg-white/5 text-sm" href="tel:+919591232166">Call</a>
            <a className="rounded-xl px-3 py-2 border border-white/15 hover:bg-white/5 text-sm" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
} 