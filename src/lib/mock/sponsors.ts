export type SponsorTier = "Title" | "Gold" | "Silver";
export type Sponsor = {
  name: string;
  logo: string;
  tier: SponsorTier;
  url?: string;
};

export const mockSponsors: Sponsor[] = [
  // Title sponsors
  {
    name: "Honeycutt Horses",
    logo: "/images/sponsors/honeycutt.avif",
    tier: "Title",
  },
  {
    name: "Gold Spur Productions",
    logo: "/images/sponsors/gold-spur.avif",
    tier: "Title",
  },

  // Gold - national rodeo and consumer brands
  {
    name: "PRCA",
    logo: "/images/sponsors/prca.avif",
    tier: "Gold",
    url: "https://www.prorodeo.com/",
  },
  {
    name: "Coors Banquet",
    logo: "/images/sponsors/coors-banquet.avif",
    tier: "Gold",
  },
  {
    name: "Justin Boots",
    logo: "/images/sponsors/justin-boots.avif",
    tier: "Gold",
  },
  {
    name: "Pendleton",
    logo: "/images/sponsors/pendleton.avif",
    tier: "Gold",
  },
  {
    name: "Big O Tires",
    logo: "/images/sponsors/big-o-tires.avif",
    tier: "Gold",
  },

  // Silver - regional and community partners
  {
    name: "Anderson Motor-Power",
    logo: "/images/sponsors/anderson-motor-power.avif",
    tier: "Silver",
  },
  {
    name: "Angels Landscape",
    logo: "/images/sponsors/angels-landscape.avif",
    tier: "Silver",
  },
  {
    name: "BB",
    logo: "/images/sponsors/bb-logo.avif",
    tier: "Silver",
  },
  {
    name: "Callagy",
    logo: "/images/sponsors/callagy.avif",
    tier: "Silver",
  },
  {
    name: "Concord General Contracting",
    logo: "/images/sponsors/concord-general-contracting.avif",
    tier: "Silver",
  },
  {
    name: "CRM",
    logo: "/images/sponsors/crm.avif",
    tier: "Silver",
  },
  {
    name: "London Bridge",
    logo: "/images/sponsors/london-bridge.avif",
    tier: "Silver",
  },
  {
    name: "Mainline Welding",
    logo: "/images/sponsors/mainline-welding.avif",
    tier: "Silver",
  },
  {
    name: "PBC",
    logo: "/images/sponsors/pbc.avif",
    tier: "Silver",
  },
  {
    name: "Radio Central",
    logo: "/images/sponsors/radio-central.avif",
    tier: "Silver",
  },
  {
    name: "RGAG",
    logo: "/images/sponsors/rgag.avif",
    tier: "Silver",
  },
  {
    name: "Star Nursery",
    logo: "/images/sponsors/star-nursery.avif",
    tier: "Silver",
  },
  {
    name: "Taz Concrete",
    logo: "/images/sponsors/taz-concrete.avif",
    tier: "Silver",
  },
  {
    name: "Tri-State",
    logo: "/images/sponsors/tri-state.avif",
    tier: "Silver",
  },
  {
    name: "Partner",
    logo: "/images/sponsors/sponsor-partner.avif",
    tier: "Silver",
  },

  // Community supporters - elected officials
  {
    name: "Leo Biasiucci",
    logo: "/images/sponsors/leo-biasiucci.avif",
    tier: "Silver",
  },
  {
    name: "Sonny Borrelli",
    logo: "/images/sponsors/sonny-borrelli.avif",
    tier: "Silver",
  },
];
