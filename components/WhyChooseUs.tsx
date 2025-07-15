// WhyChooseUs is a reusable section to highlight business USPs on service pages
export default function WhyChooseUs() {
  return (
    <section className="my-8 px-4">
      {/* Section heading for trust and conversion */}
      <h2 className="text-xl font-semibold mb-4">Why Choose We Decor?</h2>
      {/* List of unique selling points for the business */}
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Budget-friendly packages starting at ₹2999</li>
        <li>Personalized themes for every event</li>
        <li>Home & venue setups available</li>
        <li>Timely delivery and setup</li>
      </ul>
    </section>
  );
}
