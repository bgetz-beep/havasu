import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteData } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Vendor Information",
  description:
    "Apply to sell food and crafts at the 2027 Havasu Stampede. Rolling applications, Arizona-based vendors prioritized.",
  path: "/vendor",
});

export default async function VendorPage() {
  const { links } = await getSiteData();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Vendor Info", path: "/vendor" },
        ])}
      />
      <PageHero eyebrow="Vendor Information" title="Sell at the Stampede" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-6 font-body text-lg">
          <p>
            Vendor applications for the 2027 Havasu Stampede are reviewed on a
            rolling basis. Priority is given to Arizona-based food and craft
            vendors.
          </p>
          <p>
            Booth fees and electrical requirements are detailed in the
            application packet.
          </p>
          <a
            href={links.vendorApplicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-terracotta text-cream px-8 py-5 font-display text-2xl hover:bg-ochre transition-colors"
          >
            APPLY NOW ↗
          </a>
        </div>
      </section>
    </>
  );
}
