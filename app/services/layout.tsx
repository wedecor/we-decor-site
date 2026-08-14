import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  path: '/services',
  title: 'Event Decoration Services in Bangalore',
  description:
    'Event decoration across Bangalore: birthdays, weddings, haldi, engagements, corporate events, balloon and floral setups. Designed and installed by the We Decor team.',
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
