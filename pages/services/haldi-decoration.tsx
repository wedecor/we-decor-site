import Layout from '../../components/Layout';

export default function Page() {
  return (
    <Layout
      seo={{
        title: 'Haldi Decoration',
        description: 'Traditional and modern haldi event decor in Bangalore.',
        image: '/gallery/haldi1.webp',
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">Haldi Decoration</h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Celebrate your haldi with beautiful floral backdrops, seating, and props. We blend
          tradition with style for a perfect event.
        </p>
      </section>
    </Layout>
  );
}
