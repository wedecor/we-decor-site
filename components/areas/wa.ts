export function waLinkFor(locality: string) {
  const base = "https://wa.me/919591232166";
  const text = `Hi We Decor! I'm planning an event in ${locality}. Date: _____. Please share themes & pricing.`;
  const params = new URLSearchParams({
    text,
    utm_source: "site",
    utm_medium: "areas",
    utm_campaign: "local-seo",
    utm_content: locality
  }).toString();
  return `${base}?${params}`;
} 