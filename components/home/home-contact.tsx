export default function HomeContact() {
  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Primary Contact
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">+91 88805 44452</p>
            <a
              href="https://wa.me/919880544452"
              className="text-green-600 hover:text-green-700 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Secondary Contact
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">+91 95912 32166</p>
            <a href="tel:+919591232166" className="text-blue-600 hover:text-blue-700 font-medium">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
