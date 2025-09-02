"use client";
import { onCLS, onFID, onLCP, onINP, onTTFB } from "web-vitals";
import { event } from "@/lib/gtag";

const send = (name: string, value: number, id: string) =>
  event("web-vitals", {
    event_category: "Web Vitals",
    event_label: id,
    value: Math.round(name === "CLS" ? value * 1000 : value),
    name,
  });

onCLS(({ value, id }) => send("CLS", value, id));
onFID(({ value, id }) => send("FID", value, id));
onLCP(({ value, id }) => send("LCP", value, id));
onINP(({ value, id }) => send("INP", value, id));
onTTFB(({ value, id }) => send("TTFB", value, id));

