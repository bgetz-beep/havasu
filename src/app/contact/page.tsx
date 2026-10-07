import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ExternalLink } from "@/components/primitives/ExternalLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteData } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Reach the Havasu Stampede committee. Email, venue address, directions, and social links.",
  path: "/contact",
});

export default async function ContactPage() {
  const { event, contact } = await getSiteData();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero eyebrow="Get in Touch" title="Contact" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-10 font-body text-lg">
          <div>
            <p className="font-body text-sm uppercase tracking-widest text-charcoal/70">
              Email
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="font-display text-3xl underline underline-offset-4"
            >
              {contact.email}
            </a>
          </div>
          {contact.phone && (
            <div>
              <p className="font-body text-sm uppercase tracking-widest text-charcoal/70">
                Phone
              </p>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="font-display text-3xl underline underline-offset-4"
              >
                {contact.phone}
              </a>
            </div>
          )}
          <div>
            <p className="font-body text-sm uppercase tracking-widest text-charcoal/70">
              Venue
            </p>
            <p className="font-display text-2xl mt-1">{event.venue.name}</p>
            <p className="mt-1">{event.venue.address}</p>
            <a
              href={event.venue.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 underline underline-offset-4"
            >
              Get directions ↗
            </a>
          </div>
          <div>
            <p className="font-body text-sm uppercase tracking-widest text-charcoal/70">
              Follow
            </p>
            <div className="flex gap-6 mt-2">
              <ExternalLink href={contact.facebookUrl} className="font-display text-2xl">
                Facebook
              </ExternalLink>
              <ExternalLink href={contact.instagramUrl} className="font-display text-2xl">
                Instagram
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
