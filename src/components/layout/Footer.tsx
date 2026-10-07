import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";
import { mockEvent } from "@/lib/mock/event";
import { ExternalLink } from "@/components/primitives/ExternalLink";

export function Footer() {
  return (
    <footer className="border-t-2 border-charcoal bg-charcoal text-cream">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-8 py-12">
        <div>
          <p className="font-display text-3xl">HAVASU STAMPEDE</p>
          <p className="mt-2 text-sm">{mockEvent.dateDisplay}</p>
          <p className="mt-1 text-sm">{mockEvent.venue.name}</p>
          <p className="text-sm">{mockEvent.venue.address}</p>
        </div>
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) =>
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
          <a href="mailto:info@havasustampede.com" className="underline underline-offset-4">
            info@havasustampede.com
          </a>
          <ExternalLink href="https://www.facebook.com/lakehavasustampede">
            Facebook
          </ExternalLink>
          <ExternalLink href="https://www.instagram.com/">Instagram</ExternalLink>
        </div>
      </div>
    </footer>
  );
}
