import { PageHero } from "@/components/layout/PageHero";
import Image from "next/image";
import { mockSponsors, type SponsorTier } from "@/lib/mock/sponsors";

const TIER_ORDER: SponsorTier[] = ["Title", "Gold", "Silver"];

export default function SponsorsPage() {
  return (
    <>
      <PageHero eyebrow="Partners" title="Our Sponsors" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {TIER_ORDER.map((tier) => {
            const sponsors = mockSponsors.filter((s) => s.tier === tier);
            if (sponsors.length === 0) return null;
            return (
              <div key={tier} className="border-t-2 border-charcoal pt-6">
                <h2 className="font-display text-4xl">{tier.toUpperCase()}</h2>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-10 items-center">
                  {sponsors.map((s) => (
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
