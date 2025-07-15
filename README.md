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
