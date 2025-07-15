// Footer displays business info and social link at the bottom of every page
export default function Footer() {
  return (
    // Simple footer with copyright and Instagram
    <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} We Decor, Bangalore. All rights
      reserved. |{/* Instagram link for social proof and contact */}
      Instagram:{" "}
      <a
        href="https://instagram.com/wedecorbangalore"
        className="text-blue-500"
      >
        @wedecorbangalore
      </a>
    </footer>
  );
}
