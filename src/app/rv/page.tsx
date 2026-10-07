import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteData } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "RV Information",
  description:
    "Dry camping passes for the 2027 Havasu Stampede. All three nights, first come first served, shared water and dump facilities.",
  path: "/rv",
});

export default async function RvPage() {
  const { links } = await getSiteData();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "RV Info", path: "/rv" },
        ])}
      />
      <PageHero eyebrow="RV Information" title="Stay at the Grounds" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-6 font-body text-lg">
          <p>
            Dry camping passes are available for all three nights of the
            Stampede. First come, first served. Passes include access to shared
            water and dump facilities.
          </p>
          <p>
            Hookups are not available on-site. See the reservation link for
            current pricing.
          </p>
          <a
            href={links.rvReservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-turquoise text-cream px-8 py-5 font-display text-2xl hover:bg-ochre transition-colors"
          >
            RESERVE RV PASS ↗
          </a>
        </div>
      </section>
    </>
  );
}
