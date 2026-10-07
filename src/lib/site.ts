export const siteConfig = {
  name: "Havasu Stampede",
  shortName: "Stampede",
  tagline: "PRCA Rodeo in Lake Havasu City, Arizona",
  description:
    "The Havasu Stampede is a PRCA-sanctioned professional rodeo in Lake Havasu City, Arizona. Three nights of bull riding, barrel racing, mutton busting, and live music, March 19-21, 2027.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production"
      ? "https://havasustampede.com"
      : "http://localhost:3000"),
  twitter: "@havasustampede",
  locale: "en_US",
};

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
