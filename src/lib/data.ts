import {
  fetchEvent,
  fetchHomepage,
  fetchSchedule,
  fetchSponsors,
  fetchFaq,
  fetchGallery,
  fetchExternalLinks,
  fetchContactInfo,
  fetchPage,
} from "./sanity/queries";
import { mockEvent } from "./mock/event";
import { mockSchedule, type ScheduleDay as MockScheduleDay } from "./mock/schedule";
import { mockSponsors, type Sponsor as MockSponsor } from "./mock/sponsors";
import { mockFaq, type Faq as MockFaq } from "./mock/faq";
import { mockGallery, type GalleryImage as MockGalleryImage } from "./mock/gallery";
import type {
  EventDoc,
  HomepageDoc,
  ScheduleDay,
  SponsorDoc,
  FaqDoc,
  GalleryImageDoc,
  ExternalLinksDoc,
  ContactInfoDoc,
  PageDoc,
} from "./sanity/types";
import { urlFor } from "./sanity/image";
import { sanityConfigured } from "./sanity/client";

export type NormalizedEvent = {
  dateDisplay: string;
  startDate: string;
  venue: { name: string; address: string; directionsUrl: string };
  prcaSanctioned: boolean;
};

export type NormalizedScheduleDay = MockScheduleDay;
export type NormalizedSponsor = MockSponsor;
export type NormalizedFaq = MockFaq;
export type NormalizedGalleryImage = MockGalleryImage;

export type NormalizedContact = {
  email: string;
  phone?: string;
  mailingAddress?: string;
  facebookUrl: string;
  instagramUrl: string;
};

export type NormalizedExternalLinks = {
  ticketsUrl: string;
  vendorApplicationUrl: string;
  rvReservationUrl: string;
  muttonBustingUrl: string;
};

export type NormalizedHero = {
  src: string;
  alt: string;
  headline: string;
};

const DEFAULT_LINKS: NormalizedExternalLinks = {
  ticketsUrl: "https://www.rodeoticket.com/",
  vendorApplicationUrl: "https://example.com/vendor-application",
  rvReservationUrl: "https://example.com/rv-reservation",
  muttonBustingUrl: "https://example.com/mutton-busting",
};

const DEFAULT_CONTACT: NormalizedContact = {
  email: "info@havasustampede.com",
  facebookUrl: "https://www.facebook.com/lakehavasustampede",
  instagramUrl: "https://www.instagram.com/",
};

const DEFAULT_HERO: NormalizedHero = {
  src: "/images/hero.avif",
  alt: "A rider at the Lake Havasu Stampede rodeo, photo by Ian McGivney",
  headline: "HAVASU\nSTAMPEDE",
};

function normalizeEvent(doc: EventDoc | null): NormalizedEvent {
  if (!doc) {
    return {
      dateDisplay: mockEvent.dateDisplay,
      startDate: mockEvent.startDate,
      venue: mockEvent.venue,
      prcaSanctioned: mockEvent.prcaSanctioned,
    };
  }
  return {
    dateDisplay: doc.dateDisplay,
    startDate: doc.startDate,
    venue: {
      name: doc.venue?.name ?? mockEvent.venue.name,
      address: doc.venue?.address ?? mockEvent.venue.address,
      directionsUrl: doc.venue?.directionsUrl ?? mockEvent.venue.directionsUrl,
    },
    prcaSanctioned: doc.prcaSanctioned ?? true,
  };
}

function normalizeHero(homepage: HomepageDoc | null): NormalizedHero {
  if (!homepage?.heroImage) return DEFAULT_HERO;
  const alt = homepage.heroImage.alt ?? DEFAULT_HERO.alt;
  return {
    src: urlFor(homepage.heroImage).width(2400).quality(85).url(),
    alt,
    headline: homepage.heroHeadlineOverride ?? DEFAULT_HERO.headline,
  };
}

function normalizeSchedule(docs: ScheduleDay[]): NormalizedScheduleDay[] {
  if (!docs.length) return mockSchedule;
  return docs.map((d) => ({
    dayLabel: d.label,
    date: new Date(d.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    items: (d.items ?? []).map((i) => ({ time: i.time, title: i.title })),
  }));
}

function normalizeSponsors(docs: SponsorDoc[]): NormalizedSponsor[] {
  if (!docs.length) return mockSponsors;
  return docs.map((s) => ({
    name: s.name,
    logo: urlFor(s.logo).width(400).url(),
    tier: (s.tier?.name as NormalizedSponsor["tier"]) ?? "Silver",
    url: s.websiteUrl,
  }));
}

function normalizeFaq(docs: FaqDoc[]): NormalizedFaq[] {
  if (!docs.length) return mockFaq;
  return docs.map((f) => ({
    question: f.question,
    answer: f.answer
      .map((block) =>
        "children" in block
          ? // @ts-expect-error - portable text children shape
            block.children.map((c) => c.text).join("")
          : ""
      )
      .join("\n\n"),
    category: f.category,
  }));
}

function normalizeGallery(docs: GalleryImageDoc[]): NormalizedGalleryImage[] {
  if (!docs.length) return mockGallery;
  return docs.map((g) => ({
    src: urlFor(g.image).width(1600).quality(85).url(),
    alt: g.image.alt ?? g.caption ?? "Lake Havasu Stampede photo",
    orientation: g.orientation,
  }));
}

function normalizeLinks(doc: ExternalLinksDoc | null): NormalizedExternalLinks {
  if (!doc) return DEFAULT_LINKS;
  return {
    ticketsUrl: doc.ticketsUrl ?? DEFAULT_LINKS.ticketsUrl,
    vendorApplicationUrl: doc.vendorApplicationUrl ?? DEFAULT_LINKS.vendorApplicationUrl,
    rvReservationUrl: doc.rvReservationUrl ?? DEFAULT_LINKS.rvReservationUrl,
    muttonBustingUrl: doc.muttonBustingUrl ?? DEFAULT_LINKS.muttonBustingUrl,
  };
}

function normalizeContact(doc: ContactInfoDoc | null): NormalizedContact {
  if (!doc) return DEFAULT_CONTACT;
  return {
    email: doc.email ?? DEFAULT_CONTACT.email,
    phone: doc.phone,
    mailingAddress: doc.mailingAddress,
    facebookUrl: doc.facebookUrl ?? DEFAULT_CONTACT.facebookUrl,
    instagramUrl: doc.instagramUrl ?? DEFAULT_CONTACT.instagramUrl,
  };
}

export type SiteData = {
  event: NormalizedEvent;
  hero: NormalizedHero;
  schedule: NormalizedScheduleDay[];
  sponsors: NormalizedSponsor[];
  faq: NormalizedFaq[];
  gallery: NormalizedGalleryImage[];
  links: NormalizedExternalLinks;
  contact: NormalizedContact;
};

export async function getSiteData(): Promise<SiteData> {
  const [eventDoc, homepageDoc, scheduleDocs, sponsorsDocs, faqDocs, galleryDocs, linksDoc, contactDoc] =
    await Promise.all([
      fetchEvent(),
      fetchHomepage(),
      fetchSchedule(),
      fetchSponsors(),
      fetchFaq(),
      fetchGallery(),
      fetchExternalLinks(),
      fetchContactInfo(),
    ]);

  return {
    event: normalizeEvent(eventDoc),
    hero: normalizeHero(homepageDoc),
    schedule: normalizeSchedule(scheduleDocs),
    sponsors: normalizeSponsors(sponsorsDocs),
    faq: normalizeFaq(faqDocs),
    gallery: normalizeGallery(galleryDocs),
    links: normalizeLinks(linksDoc),
    contact: normalizeContact(contactDoc),
  };
}

export type PortableTextPage = {
  title: string;
  eyebrow?: string;
  body: PageDoc["body"] | null;
};

export async function getPage(slug: string): Promise<PortableTextPage | null> {
  const doc = await fetchPage(slug);
  if (!doc) return null;
  return { title: doc.title, eyebrow: doc.eyebrow, body: doc.body };
}

export { sanityConfigured };
