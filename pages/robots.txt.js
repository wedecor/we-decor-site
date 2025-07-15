export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.write("User-agent: *\nAllow: /\nSitemap: https://wedecor.in/sitemap.xml");
  res.end();
}
