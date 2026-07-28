'use client';

import { useEffect } from 'react';
import { isAnalyticsEnabled } from '@/lib/analytics/config';

/** Loads web-vitals + GA reporting after idle — avoids blocking initial hydration. */
export default function WebVitalsReporter() {
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    void import('@/lib/web-vitals-report');
  }, []);

  return null;
}
