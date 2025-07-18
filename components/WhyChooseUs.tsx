// WhyChooseUs is a reusable section to highlight business USPs on service pages
const features = [
  {
    icon: "🎯",
    title: "Punctual Delivery",
    desc: "We guarantee on-time setup and teardown for every event."
  },
  {
    icon: "🌸",
    title: "Creative Decor Themes",
    desc: "Our designers craft unique, beautiful themes for every occasion."
  },
  {
    icon: "☎️",
    title: "24/7 Customer Support",
    desc: "We’re always available to answer your questions and assist you."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-green-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-2xl group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">{f.icon}</div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-center">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
