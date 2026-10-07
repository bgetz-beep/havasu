import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";
import { ExternalLink } from "@/components/primitives/ExternalLink";
import { MobileMenu } from "./MobileMenu";
import { getSiteData } from "@/lib/data";

export async function Header() {
  const { event, links } = await getSiteData();
  const navItems = NAV_ITEMS.map((item) =>
    item.label === "Tickets" ? { ...item, href: links.ticketsUrl } : item
  );
  return (
    <header className="border-b-2 border-charcoal bg-cream sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <Link href="/" className="font-display text-2xl tracking-wide">
          HAVASU STAMPEDE
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) =>
            item.external ? (
              <ExternalLink
                key={item.label}
                href={item.href}
                className="text-sm uppercase tracking-wider font-body"
              >
                {item.label}
              </ExternalLink>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm uppercase tracking-wider font-body underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            )
          )}
          <span className="font-display text-sm bg-terracotta text-cream px-2 py-1">
            {event.dateDisplay.toUpperCase()}
          </span>
        </nav>
        <div className="lg:hidden">
          <MobileMenu ticketsUrl={links.ticketsUrl} />
        </div>
      </div>
    </header>
  );
}
