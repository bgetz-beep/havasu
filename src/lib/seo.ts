import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
}: PageMeta): Metadata {
  const canonical = absoluteUrl(path);
  const image = ogImage ?? absoluteUrl("/opengraph-image");
  const fullTitle =
    path === "/" ? title : `${title} - ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: siteConfig.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
