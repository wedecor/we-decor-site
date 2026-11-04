import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  path: '/services',
  title: 'Event Decoration Services in Bangalore — Packages from ₹3,000',
  description:
    'Explore all 16 event decoration services in Bangalore — birthday & balloon decor from ₹3,000, haldi & wedding stage setups from ₹5,000. 4.9★ rated.',
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
