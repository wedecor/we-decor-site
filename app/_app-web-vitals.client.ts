"use client";

import { getCLS, getFID, getLCP, getINP, getTTFB, type Metric } from "web-vitals";
import { event, GA_ID } from "@/lib/gtag";

function send(name: string, value: number, id: string) {
  // GA4 expects integers; scale CLS for readability like Lighthouse does.
  const v = name === "CLS" ? Math.round(value * 1000) : Math.round(value);
  event("web-vitals", {
    event_category: "Web Vitals",
    event_label: id,
    value: v,
    name,
  });
}

function handler(metric: Metric) {
  // metric.name is one of 'CLS','FID','LCP','INP','TTFB'
  send(metric.name, metric.value, metric.id);
}

// Only run when GA is configured
if (GA_ID) {
  getCLS(handler);
  getFID(handler);
  getLCP(handler);
  getINP(handler);
  getTTFB(handler);
}

