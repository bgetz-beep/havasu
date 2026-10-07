export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Schedule", href: "/schedule" },
  { label: "Tickets", href: "https://www.rodeoticket.com/", external: true },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Vendor", href: "/vendor" },
  { label: "RV", href: "/rv" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
