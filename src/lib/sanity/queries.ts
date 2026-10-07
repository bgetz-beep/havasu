import { sanityClient } from "./client";
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
} from "./types";

async function fetchOrNull<T>(groq: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(groq, params ?? {});
  } catch {
    return null;
  }
}

async function fetchArrayOrEmpty<T>(groq: string, params?: Record<string, unknown>): Promise<T[]> {
  if (!sanityClient) return [];
  try {
    return (await sanityClient.fetch<T[]>(groq, params ?? {})) ?? [];
  } catch {
    return [];
  }
}

export const fetchEvent = () =>
  fetchOrNull<EventDoc>(`*[_type == "event"][0]`);

export const fetchHomepage = () =>
  fetchOrNull<HomepageDoc>(`*[_type == "homepage"][0]`);

export const fetchSchedule = () =>
  fetchArrayOrEmpty<ScheduleDay>(`*[_type == "scheduleDay"] | order(date asc)`);

export const fetchSponsors = () =>
  fetchArrayOrEmpty<SponsorDoc>(`
    *[_type == "sponsor"]{
      name, logo, websiteUrl,
      "tier": tier->{ name, order }
    } | order(tier.order asc, name asc)
  `);

export const fetchFaq = () =>
  fetchArrayOrEmpty<FaqDoc>(`*[_type == "faq"] | order(category asc, order asc)`);

export const fetchGallery = () =>
  fetchArrayOrEmpty<GalleryImageDoc>(`*[_type == "galleryImage"] | order(year desc)`);

export const fetchExternalLinks = () =>
  fetchOrNull<ExternalLinksDoc>(`*[_type == "externalLinks"][0]`);

export const fetchContactInfo = () =>
  fetchOrNull<ContactInfoDoc>(`*[_type == "contactInfo"][0]`);

export const fetchPage = (slug: string) =>
  fetchOrNull<PageDoc>(`*[_type == "page" && slug.current == $slug][0]`, { slug });
