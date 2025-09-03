import Layout from '../../components/Layout';
import WhyChooseUs from '../../components/WhyChooseUs';

export default function Page() {
  return (
    <Layout
      seo={{
        title: 'Wedding Stage Decor in Bangalore',
        description:
          'Elegant wedding stage decoration services in Bangalore. Contact We Decor for affordable custom setups.',
        image: '/gallery/wedding-stage.webp',
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">Wedding Stage Decor</h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          We specialize in elegant wedding stage decor customized to your theme and venue. Contact
          us via WhatsApp or call now.
        </p>

        <div className="my-12">
          <WhyChooseUs />
        </div>
      </section>
    </Layout>
  );
}
