"use client";
import { useEffect, useRef, useState } from "react";

export default function ClientVisible({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ref.current || show) return;
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { 
        setShow(true); 
        io.disconnect(); 
      }
    }, { rootMargin: "200px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [show]);

  return <div ref={ref}>{show ? children : null}</div>;
}