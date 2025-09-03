import Layout from '../../components/Layout';
import WhyChooseUs from '../../components/WhyChooseUs';

export default function Page() {
  return (
    <Layout
      seo={{
        title: 'Birthday Home Decoration Bangalore',
        description:
          'Balloon and themed birthday home decoration in Bangalore. Affordable, fast, and customized.',
        image: '/gallery/birthday-home.webp',
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
          Birthday Home Decoration
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Surprise your loved ones with themed birthday setups at home. Balloons, backdrops, lights
          — starting from ₹2999.
        </p>

        <div className="my-12">
          <WhyChooseUs />
        </div>
      </section>
    </Layout>
  );
}
