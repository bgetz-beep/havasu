import { siteConfig, absoluteUrl } from "./site";
import type {
  NormalizedEvent,
  NormalizedFaq,
  NormalizedExternalLinks,
  NormalizedContact,
} from "./data";

export function organizationLd(contact: NormalizedContact) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/images/logo.avif"),
    sameAs: [contact.facebookUrl, contact.instagramUrl].filter(Boolean),
    contactPoint: contact.email
      ? [
          {
            "@type": "ContactPoint",
            email: contact.email,
            telephone: contact.phone,
            contactType: "customer support",
            availableLanguage: "en",
          },
        ]
      : undefined,
  };
}

export function eventLd({
  event,
  links,
  contact,
}: {
  event: NormalizedEvent;
  links: NormalizedExternalLinks;
  contact: NormalizedContact;
}) {
  const [cityPart = "Lake Havasu City, AZ"] = event.venue.address.split(";");
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: siteConfig.name,
    description: siteConfig.description,
    startDate: `${event.startDate}T18:00:00-07:00`,
    endDate: `${event.endDate}T22:00:00-07:00`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: siteConfig.url,
    image: [absoluteUrl("/images/hero.avif")],
    location: {
      "@type": "Place",
      name: event.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.venue.address,
        addressLocality: cityPart.trim(),
        addressRegion: "AZ",
        addressCountry: "US",
      },
    },
    offers: {
      "@type": "Offer",
      url: links.ticketsUrl,
      availability: "https://schema.org/InStock",
      category: "Rodeo tickets",
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: contact.email,
    },
    performer: {
      "@type": "SportsTeam",
      name: "PRCA Cowboys and Cowgirls",
    },
  };
}

export function faqLd(faqs: NormalizedFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbLd(
  trail: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}
