import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteData } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/jsonld";

const TIER_ORDER = ["Title", "Gold", "Silver"] as const;

export const metadata: Metadata = buildMetadata({
  title: "Our Sponsors",
  description:
    "The partners who make the Havasu Stampede possible. Title, Gold, and Silver sponsors supporting PRCA rodeo in Lake Havasu City.",
  path: "/sponsors",
});

export default async function SponsorsPage() {
  const { sponsors } = await getSiteData();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Sponsors", path: "/sponsors" },
        ])}
      />
      <PageHero eyebrow="Partners" title="Our Sponsors" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {TIER_ORDER.map((tier) => {
            const inTier = sponsors.filter((s) => s.tier === tier);
            if (inTier.length === 0) return null;
            return (
              <div key={tier} className="border-t-2 border-charcoal pt-6">
                <h2 className="font-display text-4xl">{tier.toUpperCase()}</h2>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-10 items-center">
                  {inTier.map((s) => (
                    <div key={s.name} className="relative aspect-[3/2]">
                      <Image
                        src={s.logo}
                        alt={`${s.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
