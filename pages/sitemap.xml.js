const pages = [
  "/",
  "/about",
  "/pricing",
  "/gallery",
  "/services/birthday-decoration",
  "/services/haldi-decoration",
  "/services/wedding-setup",
  "/services/tent-balloon-setup",
  "/services/wedding-stage-decor",
  "/services/haldi-backdrop-decor",
  "/services/birthday-home-decoration",
];

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/xml");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>https://wedecor.in${page}</loc>
    </url>`,
    )
    .join("")}
</urlset>`;
  res.end(sitemap);
}
