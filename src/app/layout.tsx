import type { Metadata } from "next";
import { Big_Shoulders, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { getSiteData } from "@/lib/data";

const displayFont = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display-google",
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-google",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · PRCA Rodeo · March 19-21, 2027`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Havasu Stampede",
    "Lake Havasu rodeo",
    "PRCA rodeo",
    "Arizona rodeo",
    "bull riding",
    "barrel racing",
    "mutton busting",
    "Lake Havasu City events",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const data = await getSiteData();
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationLd(data.contact)} />
        <JsonLd data={websiteLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
