import dynamic from 'next/dynamic';
import { parseContent } from '../_lib/parseContent';
import ClientVisible from '@/components/ClientVisible';

const ContactCard = dynamic(
  () => import('@/components/areas/ContactCard').then((m) => m.default ?? m),
  { ssr: false }
);
const GalleryStrip = dynamic(
  () => import('@/components/areas/GalleryStrip').then((m) => m.default ?? m),
  { ssr: false }
);

export const revalidate = 3600; // 1 hour

export default async function Page() {
  const { caseStudy, cta } = parseContent('south_bangalore.txt');
  return (
    <main className="container mx-auto px-4 py-10 space-y-10">
      <header>
        <h1 className="text-3xl font-semibold">South Bangalore</h1>
      </header>
      <section>
        <h2 className="text-2xl font-semibold">Case Study</h2>
        <article className="prose max-w-none whitespace-pre-wrap">{caseStudy}</article>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Call to Action</h2>
        <article className="prose max-w-none whitespace-pre-wrap">{cta}</article>
      </section>
      <aside className="space-y-6">
        <ClientVisible>
          <GalleryStrip />
        </ClientVisible>
        <ClientVisible>
          <ContactCard locality="South Bangalore" />
        </ClientVisible>
      </aside>
    </main>
  );
}
