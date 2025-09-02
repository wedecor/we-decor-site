export const GA_ID: string = process.env.NEXT_PUBLIC_GA_ID || "";

export const pageview = (url: string): void => {
  if (!GA_ID) return;
  (window as any).gtag?.("config", GA_ID, { page_path: url });
};

export const event = (name: string, params: Record<string, any> = {}): void => {
  if (!GA_ID) return;
  (window as any).gtag?.("event", name, params);
};

