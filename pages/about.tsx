import Layout from '../components/Layout'

export default function Page() {
  return (
    <Layout
      seo={{
        title: "About We Decor",
        description: "Learn about We Decor, Bangalore's trusted event decor company.",
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
          About We Decor
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          We Decor is Bangalore's leading event decor company, bringing dreams to life for weddings, birthdays, haldi, and more. Our team combines creativity, passion, and attention to detail to make every event unforgettable.
        </p>

        <strong className="block text-lg mb-2">Why choose us?</strong>
        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 mb-8">
          <li>10+ years of experience</li>
          <li>Custom themes and packages</li>
          <li>Professional, friendly team</li>
          <li>Affordable pricing</li>
        </ul>

        <a href="/contact" className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full px-6 py-3 shadow-lg hover:scale-105 transition font-bold inline-block mt-8">
          Contact us today to make your event magical!
        </a>
      </section>
    </Layout>
  )
} 