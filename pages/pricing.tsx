import Layout from '../components/Layout';

export default function Page() {
  return (
    <Layout
      seo={{
        title: 'Pricing',
        description: 'Affordable event decor packages in Bangalore. Starting at ₹2999.',
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">Pricing</h1>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white rounded-lg shadow border text-lg text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left font-bold">Package</th>
                <th className="py-3 px-4 text-left font-bold">Description</th>
                <th className="py-3 px-4 text-left font-bold">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">Birthday Basic</td>
                <td className="py-2 px-4">Balloons, banners, table decor</td>
                <td className="py-2 px-4">₹2999</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4">Haldi Special</td>
                <td className="py-2 px-4">Floral backdrop, seating, props</td>
                <td className="py-2 px-4">₹4999</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Wedding Premium</td>
                <td className="py-2 px-4">Stage, entrance, table decor</td>
                <td className="py-2 px-4">₹9999</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4">Tent & Balloon Combo</td>
                <td className="py-2 px-4">Tent setup, balloon arches</td>
                <td className="py-2 px-4">₹3999</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          All packages are customizable. Contact us for a quote!
        </p>
        <a
          href="/contact"
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full px-6 py-3 shadow-lg hover:scale-105 transition font-bold inline-block"
        >
          Get a Custom Quote
        </a>
      </section>
    </Layout>
  );
}
