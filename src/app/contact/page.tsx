import { PageHero } from "@/components/layout/PageHero";
import { ExternalLink } from "@/components/primitives/ExternalLink";
import { mockEvent } from "@/lib/mock/event";

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Get in Touch" title="Contact" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-10 font-body text-lg">
          <div>
            <p className="font-body text-sm uppercase tracking-widest text-charcoal/70">
              Email
            </p>
            <a
              href="mailto:info@havasustampede.com"
              className="font-display text-3xl underline underline-offset-4"
            >
              info@havasustampede.com
            </a>
          </div>
          <div>
            <p className="font-body text-sm uppercase tracking-widest text-charcoal/70">
              Venue
            </p>
            <p className="font-display text-2xl mt-1">
              {mockEvent.venue.name}
            </p>
            <p className="mt-1">{mockEvent.venue.address}</p>
            <a
              href={mockEvent.venue.directionsUrl}
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
              <ExternalLink
                href="https://www.facebook.com/lakehavasustampede"
                className="font-display text-2xl"
              >
                Facebook
              </ExternalLink>
              <ExternalLink
                href="https://www.instagram.com/"
                className="font-display text-2xl"
              >
                Instagram
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
