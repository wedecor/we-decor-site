import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  path: '/services',
  title: 'Event Services | We Decor - Decoration, Catering & More in Bangalore',
  description:
    'Comprehensive event services in Bangalore: decoration, catering, makeup artists, photography, and more. Professional event planning and execution by We Decor.',
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
