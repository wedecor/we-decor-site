import Layout from '../components/Layout'

export default function ServicesPage() {
  return (
    <Layout
      seo={{
        title: "Our Services | We Decor Event Management Bangalore",
        description: "Discover We Decor's full range of event services in Bangalore: Decoration, Catering, Make-up Artists, Hair Stylists, Mehndi Artists, Photographers, Videographers, and more.",
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Our Services
        </h1>
        <nav className="mb-8 flex flex-wrap gap-4 justify-center">
          <a href="#decoration" className="text-blue-600 hover:underline">Decoration</a>
          <a href="#catering" className="text-blue-600 hover:underline">Catering</a>
          <a href="#makeup" className="text-blue-600 hover:underline">Make-up Artists</a>
          <a href="#hair" className="text-blue-600 hover:underline">Hair Stylists</a>
          <a href="#mehndi" className="text-blue-600 hover:underline">Mehndi Artists</a>
          <a href="#photographers" className="text-blue-600 hover:underline">Photographers</a>
          <a href="#videographers" className="text-blue-600 hover:underline">Videographers</a>
        </nav>
        <section id="decoration" className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Decoration</h2>
          <p className="mb-2 text-lg text-gray-800 dark:text-white">Explore event planning and party decor with We Decor. Discover unparalleled event ideas, organized and well planned by our experts.</p>
          <p className="text-gray-800 dark:text-white mb-2">Whether you’re looking for a humble garnish or an elaborate royal adornment, we bring your vision to life. We handle decorations for weddings, corporate events, inaugurations, baby showers, and more. Our categories include theme-based, wedding, party, stage, birthday, devotional, and floral decorations. We focus on every detail to create the most exquisite and grand event, all within your budget.</p>
        </section>
        <section id="catering" className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Catering</h2>
          <p className="mb-2 text-lg text-gray-800 dark:text-white">We Decor offers a diverse list of tempting, lip-smacking dishes for your event.</p>
          <p className="text-gray-800 dark:text-white mb-2">From sweets to healthy snacks, our catering services cover all tastes and preferences. We focus on planning, organization, and hygiene, ensuring every guest enjoys a bountiful supply of fresh food and beverages. Let us delight your guests and leave them with tantalizing taste-buds!</p>
        </section>
        <section id="makeup" className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Make-up Artists</h2>
          <p className="mb-2 text-lg text-gray-800 dark:text-white">Get ready for your grand event with our highly skilled make-up artists, up to date with the latest trends.</p>
          <p className="text-gray-800 dark:text-white mb-2">Our artists work with top brands to create expressive, magical looks for weddings, parties, and more. We offer a range of styles and ensure you look your best for every occasion.</p>
        </section>
        <section id="hair" className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Hair Stylists</h2>
          <p className="mb-2 text-lg text-gray-800 dark:text-white">Our professional hair stylists are equipped with the latest tools and trends to give you the perfect look.</p>
          <p className="text-gray-800 dark:text-white mb-2">From cuts and colors to braids and styling, we offer flexible, customer-focused hair services for your special event—all at compelling prices.</p>
        </section>
        <section id="mehndi" className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Mehndi Artists</h2>
          <p className="mb-2 text-lg text-gray-800 dark:text-white">Let our skilled Mehndi artists bring your favorite designs to life for any event or festival.</p>
          <p className="text-gray-800 dark:text-white mb-2">We offer a variety of intricate designs, from traditional to modern, ensuring your hands and feet are adorned beautifully for your big day.</p>
        </section>
        <section id="photographers" className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Photographers</h2>
          <p className="mb-2 text-lg text-gray-800 dark:text-white">Capture your most important moments with our exceptional photographers.</p>
          <p className="text-gray-800 dark:text-white mb-2">We focus on aesthetics, storytelling, and customer service, ensuring you have beautiful memories to cherish for a lifetime.</p>
        </section>
        <section id="videographers" className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Videographers</h2>
          <p className="mb-2 text-lg text-gray-800 dark:text-white">Our talented videographers use high-tech equipment and creative skills to capture your event’s true essence.</p>
          <p className="text-gray-800 dark:text-white mb-2">From weddings to corporate events, we create dynamic, impactful videos that keep you and your guests emotionally engaged with every memory.</p>
        </section>
      </section>
    </Layout>
  )
} 