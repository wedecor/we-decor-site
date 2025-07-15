# We Decor – Event Decor Website

A modern, mobile-first, SEO-optimized website for "We Decor", Bangalore.

## 🚀 Tech Stack

- Next.js
- Tailwind CSS
- MDX for content
- JSON for gallery captions
- Vercel hosting

## 🏁 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run locally:**

   ```bash
   npm run dev
   ```

3. **Deploy to Vercel:**
   - Push to GitHub and connect to Vercel (https://vercel.com/new)
   - Vercel auto-detects Next.js and deploys with HTTPS

## ✏️ Editing Content

- **Pages:** Edit `.mdx` files in `/pages`, `/pages/services`, `/pages/blog`
- **Gallery:** Add/remove images in `/public/gallery`
- **Gallery captions:** Edit `/data/gallery.json`
- **SEO/meta:** Edit frontmatter in `.mdx` or update `SeoHead` props

## 🖼️ Adding Gallery Images

- Place `.webp` or `.jpg` images in `/public/gallery`
- (Optional) Add captions in `/data/gallery.json`

## 📝 Blog (Optional)

- Add `.mdx` files to `/pages/blog`
- Blog listing auto-generates from files

## 🛡️ SEO

- Dynamic `<Head>` tags, Open Graph, Twitter cards, JSON-LD
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

## 📞 Contact

- Contact form sends via Next.js API route (customize as needed)
- WhatsApp CTA is sticky on mobile

---

**Business Info:**  
We Decor, Bangalore  
Instagram: [@wedecorbangalore](https://instagram.com/wedecorbangalore)  
Phone: +91-9999999999  
Starting Price: ₹2999 for birthday setups

---

_All content and gallery images can be updated without coding knowledge!_

## 📄 Editing Guide (For Non-Developers)

**You can update almost all content on this website without coding!**

### Editing Service Pages
- Go to `/pages/services/` and open any `.mdx` file (e.g. `birthday-decoration.mdx`).
- Change the text, headings, or bullet points as needed.
- Update the `title`, `description`, or `image` in the frontmatter (the section between `---` at the top).
- Save the file and redeploy (or commit changes if using Git).

### Replacing Gallery Images
- Add or remove images in `/public/gallery/`.
- Use `.webp` or `.jpg` files for best performance.
- (Optional) Edit `/data/gallery.json` to add captions for each image.

### Updating Pricing or About Page
- Edit `/pages/pricing.mdx` or `/pages/about.mdx` just like a Word document.
- Change tables, text, or headings as needed.

### Changing Phone Number or WhatsApp CTA
- Open `/components/Layout.tsx`.
- Update the phone number in the WhatsApp and Call Now button links.
- Save and redeploy.

**No coding knowledge is required for these changes!**
