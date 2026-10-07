import type { Metadata } from "next";
import { Big_Shoulders, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
  title: "Havasu Stampede · PRCA Rodeo · March 19-21, 2027",
  description:
    "The Havasu Stampede is a PRCA-sanctioned professional rodeo in Lake Havasu City, Arizona. Three nights of bull riding, barrel racing, mutton busting, and live music.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
