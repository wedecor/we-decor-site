'use client';

import { useEffect } from 'react';
import { GA_ID } from '@/lib/gtag';

/** Loads web-vitals + GA reporting after idle — avoids blocking initial hydration. */
export default function WebVitalsReporter() {
  useEffect(() => {
    if (!GA_ID) return;
    void import('@/lib/web-vitals-report');
  }, []);

  return null;
}
