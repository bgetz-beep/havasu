import Image from "next/image";
import { mockSponsors, type SponsorTier } from "@/lib/mock/sponsors";

const TIER_ORDER: SponsorTier[] = ["Title", "Gold", "Silver"];

export function SponsorsWall() {
  return (
    <section className="bg-cream border-b-2 border-charcoal py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-sm uppercase tracking-widest">Partners</p>
        <h2 className="font-display text-5xl md:text-7xl mt-4 mb-12">
          PROUDLY SPONSORED BY
        </h2>
        {TIER_ORDER.map((tier) => {
          const inTier = mockSponsors.filter((s) => s.tier === tier);
          if (inTier.length === 0) return null;
          return (
            <div key={tier} className="mb-12">
              <p className="font-body text-xs uppercase tracking-widest text-charcoal/70 mb-4">
                {tier} Sponsors
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
                {inTier.map((s) => (
                  <div
                    key={s.name}
                    className="relative aspect-[3/2] grayscale hover:grayscale-0 transition"
                  >
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
  );
}
