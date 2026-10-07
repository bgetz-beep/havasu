import type { Image, PortableTextBlock } from "sanity";

export type SanityImage = Image & {
  alt?: string;
};

export type EventDoc = {
  year: number;
  startDate: string;
  endDate: string;
  dateDisplay: string;
  venue: {
    name?: string;
    address?: string;
    directionsUrl?: string;
  };
  prcaSanctioned: boolean;
};

export type HomepageDoc = {
  heroImage?: SanityImage;
  heroHeadlineOverride?: string;
  featureFlags?: {
    showCountdown?: boolean;
    showGallery?: boolean;
    showSocialWall?: boolean;
  };
};

export type ScheduleItem = {
  time: string;
  title: string;
  arena?: string;
  description?: string;
};

export type ScheduleDay = {
  date: string;
  label: string;
  items: ScheduleItem[];
};

export type SponsorTierDoc = { name: string; order: number };

export type SponsorDoc = {
  name: string;
  logo: SanityImage;
  tier: SponsorTierDoc;
  websiteUrl?: string;
};

export type FaqDoc = {
  question: string;
  answer: PortableTextBlock[];
  category: string;
  order?: number;
};

export type GalleryImageDoc = {
  image: SanityImage;
  caption?: string;
  year?: number;
  orientation: "portrait" | "landscape";
};

export type ExternalLinksDoc = {
  ticketsUrl?: string;
  vendorApplicationUrl?: string;
  rvReservationUrl?: string;
  muttonBustingUrl?: string;
};

export type ContactInfoDoc = {
  email?: string;
  phone?: string;
  mailingAddress?: string;
  facebookUrl?: string;
  instagramUrl?: string;
};

export type PageDoc = {
  slug: string;
  title: string;
  eyebrow?: string;
  body: PortableTextBlock[];
};
