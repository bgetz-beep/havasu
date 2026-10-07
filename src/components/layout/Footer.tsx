import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";
import { ExternalLink } from "@/components/primitives/ExternalLink";
import { getSiteData } from "@/lib/data";

export async function Footer() {
  const { event, contact, links } = await getSiteData();
  const navItems = NAV_ITEMS.map((item) =>
    item.label === "Tickets" ? { ...item, href: links.ticketsUrl } : item
  );
  return (
    <footer className="border-t-2 border-charcoal bg-charcoal text-cream">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-8 py-12">
        <div>
          <p className="font-display text-3xl">HAVASU STAMPEDE</p>
          <p className="mt-2 text-sm">{event.dateDisplay}</p>
          <p className="mt-1 text-sm">{event.venue.name}</p>
          <p className="text-sm">{event.venue.address}</p>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) =>
            item.external ? (
              <ExternalLink key={item.label} href={item.href} className="text-sm">
                {item.label}
              </ExternalLink>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm underline underline-offset-4"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="flex flex-col gap-2 text-sm">
          <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
            {contact.email}
          </a>
          {contact.phone && (
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="underline underline-offset-4"
            >
              {contact.phone}
            </a>
          )}
          <ExternalLink href={contact.facebookUrl}>Facebook</ExternalLink>
          <ExternalLink href={contact.instagramUrl}>Instagram</ExternalLink>
        </div>
      </div>
    </footer>
  );
}
