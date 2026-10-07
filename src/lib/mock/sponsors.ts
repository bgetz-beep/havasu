export type SponsorTier = "Title" | "Gold" | "Silver";
export type Sponsor = {
  name: string;
  logo: string;
  tier: SponsorTier;
  url?: string;
};

export const mockSponsors: Sponsor[] = [
  {
    name: "Honeycutt Horses",
    logo: "/images/sponsors/honeycutt.avif",
    tier: "Title",
    url: "#",
  },
  {
    name: "Gold Spur Productions",
    logo: "/images/sponsors/gold-spur.avif",
    tier: "Title",
    url: "#",
  },
  {
    name: "PRCA",
    logo: "/images/sponsors/prca.avif",
    tier: "Gold",
    url: "https://www.prorodeo.com/",
  },
];
