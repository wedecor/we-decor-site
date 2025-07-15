// Footer displays business info and social link at the bottom of every page
export default function Footer() {
  return (
    // 🎨 UI Upgrade: Light background, font, spacing, social icon
    <footer className="bg-gray-50 border-t py-8 text-center text-gray-600 text-base font-sans flex flex-col items-center gap-4">
      <div>
        &copy; {new Date().getFullYear()} <span className="font-bold text-gray-800">We Decor</span>, Bangalore. All rights reserved.
      </div>
      <div className="flex items-center gap-2">
        <span>Instagram:</span>
        <a
          href="https://instagram.com/wedecorbangalore"
          className="text-blue-500 hover:text-blue-700 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm4.25 2.25a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5Zm0 1.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm6.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>
          @wedecorbangalore
        </a>
      </div>
    </footer>
  );
}
