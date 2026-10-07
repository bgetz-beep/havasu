# Havasu Stampede Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild havasustampede.com per the 2026-10-06 design spec — Next.js + Sanity CMS, deployed on Railway, with full parity to the current site's 10 content areas.

**Architecture:** Next.js 16 App Router. Home is a long editorial scroll composed of section components; detail pages at `/schedule`, `/sponsors`, `/vendor`, `/rv`, `/about`, `/faq`, `/contact`. Content comes from Sanity (embedded Studio at `/studio`). Social wall pulls Facebook + Instagram with graceful fallback. Deployment on Railway.

**Tech Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · shadcn/ui primitives · Sanity CMS · Vitest for logic tests · Playwright for a lightweight route smoke test · Railway for deploy.

**Phasing:**
1. **Phase 1 (Tasks 1–12)** — Full static design with mock data. End state: pixel-complete site that can be deployed to Railway and clicked through end-to-end.
2. **Phase 2 (Tasks 13–17)** — Sanity CMS wiring. End state: all content editable through `/studio`.
3. **Phase 3 (Tasks 18–20)** — Social wall + production Railway deployment with env vars.

## Global Constraints

- **No icon packs.** No Lucide, Heroicons, Phosphor, Font Awesome. Meaning is carried by typography, numerals, and photography. The only glyph allowed is `↗` (Unicode `U+2197`) for external links.
- **No gradients.** Not in backgrounds, borders, text, or SVG. Solid flat color only.
- **No "AI SaaS" tells.** No glassmorphism, no soft drop shadows, no rounded "card" containers unless the element is actionable (buttons/links), no pastel palettes, no bento grids.
- **Palette (exact hex, used flat):**
  - `#D4421A` sunset terracotta (primary)
  - `#0F6E6E` deep lake turquoise (secondary)
  - `#F2EBD9` bone / cream (base background)
  - `#1A1A1A` charcoal (type, hard rules)
  - `#C98B2A` dust ochre (accent, sparingly)
- **Fonts:** `Big Shoulders Display` (display) + `Space Grotesk` (body). Loaded via `next/font/google`. CSS variables `--font-display`, `--font-body`.
- **Section rules:** hard `1px` or `2px` solid rules between sections, no soft shadows.
- **Event dates (hardcoded in Phase 1):** `March 19–21, 2027`. These move to Sanity in Phase 2.
- **External links** always open in a new tab (`target="_blank"`, `rel="noopener"`) and end with ` ↗`.
- **Accessibility:** every image needs real `alt` text (Phase 1 placeholders describe the real photo subject, not "placeholder"). Visible focus rings on all interactive elements, using charcoal `#1A1A1A` outlines.
- **Commit style:** one commit per completed task. Conventional commit prefix: `feat:`, `fix:`, `chore:`, `docs:`, `test:`.

---

## Phase 1 — Static design with mock data

### Task 1: Design tokens and font loading

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/lib/mock/event.ts`

**Interfaces:**
- Produces: CSS custom properties `--color-terracotta`, `--color-turquoise`, `--color-cream`, `--color-charcoal`, `--color-ochre`, `--font-display`, `--font-body`. Also mock `event` object `{ year: 2027, startDate: "2027-03-19", endDate: "2027-03-21", venue: { name: "...", address: "...", directionsUrl: "..." }, prcaSanctioned: true }`.

- [ ] **Step 1: Write failing visual test (manual check)**

Create a scratch route `src/app/_debug/page.tsx` that renders color swatches and type samples. It will be deleted at end of Phase 1.

```tsx
export default function Debug() {
  return (
    <main className="p-8 space-y-8 bg-[var(--color-cream)]">
      <section className="space-y-2">
        {[
          ["--color-terracotta", "#D4421A"],
          ["--color-turquoise", "#0F6E6E"],
          ["--color-cream", "#F2EBD9"],
          ["--color-charcoal", "#1A1A1A"],
          ["--color-ochre", "#C98B2A"],
        ].map(([v, hex]) => (
          <div key={v} className="flex items-center gap-4">
            <div className="h-16 w-16" style={{ background: `var(${v})` }} />
            <code>{v} = {hex}</code>
          </div>
        ))}
      </section>
      <h1 style={{ fontFamily: "var(--font-display)" }} className="text-7xl">
        BIG SHOULDERS DISPLAY — HAVASU STAMPEDE
      </h1>
      <p style={{ fontFamily: "var(--font-body)" }} className="text-lg">
        Space Grotesk body copy. March 19–21, 2027.
      </p>
    </main>
  );
}
```

- [ ] **Step 2: Verify at `/( _debug)` currently fails to load tokens**

Run: `npm run dev`, visit `http://localhost:3000/_debug`
Expected: swatches render but with no custom color, text uses default system fonts.

- [ ] **Step 3: Add design tokens to `globals.css`**

Replace the generated color variables in `src/app/globals.css`. Keep the Tailwind v4 `@import "tailwindcss"` line. Add:

```css
@theme {
  --color-terracotta: #D4421A;
  --color-turquoise: #0F6E6E;
  --color-cream: #F2EBD9;
  --color-charcoal: #1A1A1A;
  --color-ochre: #C98B2A;
  --font-display: var(--font-display-google, "Big Shoulders Display"), "Impact", sans-serif;
  --font-body: var(--font-body-google, "Space Grotesk"), system-ui, sans-serif;
}

html, body {
  background: var(--color-cream);
  color: var(--color-charcoal);
  font-family: var(--font-body);
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
```

- [ ] **Step 4: Load fonts in `layout.tsx`**

```tsx
import { Big_Shoulders_Display, Space_Grotesk } from "next/font/google";

const displayFont = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display-google",
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-google",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Create mock event data**

```ts
// src/lib/mock/event.ts
export const mockEvent = {
  year: 2027,
  startDate: "2027-03-19",
  endDate: "2027-03-21",
  dateDisplay: "March 19–21, 2027",
  venue: {
    name: "Lake Havasu Rodeo Grounds",
    address: "TBD — fill from current site",
    directionsUrl: "https://maps.google.com/?q=Lake+Havasu+Rodeo",
  },
  prcaSanctioned: true,
};
```

- [ ] **Step 6: Re-verify `/_debug`**

Reload. Expected: swatches render with correct hex colors, headline uses Big Shoulders, body uses Space Grotesk, background is cream.

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/app/_debug/page.tsx src/lib/mock/event.ts
git commit -m "feat: establish design tokens, fonts, and mock event data"
```

---

### Task 2: Primitives — ExternalLink and SectionDivider

**Files:**
- Create: `src/components/primitives/ExternalLink.tsx`
- Create: `src/components/primitives/SectionDivider.tsx`
- Create: `src/components/primitives/__tests__/ExternalLink.test.tsx`
- Modify: `package.json` (add vitest + testing-library deps if not present)

**Interfaces:**
- Produces: `<ExternalLink href="..." className="...">Buy Tickets</ExternalLink>` — renders an `<a>` with target=_blank, rel=noopener, appends ` ↗` after children. `<SectionDivider weight="thin" | "thick" />` — renders a `<hr>` with `border-charcoal`, thin = 1px, thick = 2px.

- [ ] **Step 1: Install Vitest + testing-library**

```bash
npm install --save-dev vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Add vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Add to `package.json` scripts: `"test": "vitest"`.

- [ ] **Step 3: Write failing test for ExternalLink**

```tsx
// src/components/primitives/__tests__/ExternalLink.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ExternalLink } from "../ExternalLink";

describe("ExternalLink", () => {
  it("renders children with trailing arrow glyph", () => {
    render(<ExternalLink href="https://example.com">Buy Tickets</ExternalLink>);
    expect(screen.getByRole("link")).toHaveTextContent("Buy Tickets ↗");
  });

  it("opens in new tab with noopener", () => {
    render(<ExternalLink href="https://example.com">Visit</ExternalLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
```

- [ ] **Step 4: Run test to verify failure**

Run: `npm test -- --run src/components/primitives/__tests__/ExternalLink.test.tsx`
Expected: FAIL — "ExternalLink is not exported".

- [ ] **Step 5: Implement ExternalLink**

```tsx
// src/components/primitives/ExternalLink.tsx
export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline underline-offset-4 decoration-charcoal hover:decoration-terracotta ${className}`}
    >
      {children} ↗
    </a>
  );
}
```

- [ ] **Step 6: Implement SectionDivider**

```tsx
// src/components/primitives/SectionDivider.tsx
export function SectionDivider({ weight = "thin" }: { weight?: "thin" | "thick" }) {
  const border = weight === "thick" ? "border-t-2" : "border-t";
  return <hr className={`${border} border-charcoal`} />;
}
```

- [ ] **Step 7: Run tests to verify pass**

Run: `npm test -- --run`
Expected: PASS (both tests).

- [ ] **Step 8: Commit**

```bash
git add src/components/primitives src/components/primitives/__tests__ vitest.config.ts vitest.setup.ts package.json package-lock.json
git commit -m "feat: add ExternalLink and SectionDivider primitives with tests"
```

---

### Task 3: Site layout — Header, MobileMenu, Footer

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/MobileMenu.tsx` (client component)
- Create: `src/components/layout/Footer.tsx`
- Create: `src/lib/nav.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `mockEvent` from Task 1.
- Produces: `<Header />` renders site header with logo wordmark top-left, nav center/right, date tag top-right. `<Footer />` renders three-column footer. `<MobileMenu />` is a client component with word `Menu` trigger and full-screen overlay.
- `NAV_ITEMS` constant: `[{ label: "Schedule", href: "/schedule" }, { label: "Tickets", href: EXTERNAL }, { label: "Sponsors", href: "/sponsors" }, { label: "Vendor", href: "/vendor" }, { label: "RV", href: "/rv" }, { label: "About", href: "/about" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }]`. The Tickets item has `external: true`.

- [ ] **Step 1: Create nav config**

```ts
// src/lib/nav.ts
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
```

- [ ] **Step 2: Build Header (server component)**

```tsx
// src/components/layout/Header.tsx
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";
import { mockEvent } from "@/lib/mock/event";
import { ExternalLink } from "@/components/primitives/ExternalLink";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="border-b-2 border-charcoal bg-cream">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <Link href="/" className="font-display text-2xl tracking-wide">
          HAVASU STAMPEDE
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <ExternalLink key={item.label} href={item.href} className="text-sm uppercase tracking-wider">
                {item.label}
              </ExternalLink>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm uppercase tracking-wider underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            )
          )}
          <span className="font-display text-sm bg-terracotta text-cream px-2 py-1">
            {mockEvent.dateDisplay.toUpperCase()}
          </span>
        </nav>
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Build MobileMenu (client component)**

```tsx
// src/components/layout/MobileMenu.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-display text-sm uppercase tracking-wider underline underline-offset-4"
      >
        Menu
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-cream flex flex-col">
          <div className="flex justify-between items-center p-4 border-b-2 border-charcoal">
            <span className="font-display text-xl">HAVASU STAMPEDE</span>
            <button
              onClick={() => setOpen(false)}
              className="font-display text-sm uppercase tracking-wider underline underline-offset-4"
            >
              Close
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="font-display text-4xl"
              >
                {item.label}{item.external ? " ↗" : ""}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 4: Build Footer**

```tsx
// src/components/layout/Footer.tsx
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
              <Link key={item.label} href={item.href} className="text-sm underline underline-offset-4">
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
```

- [ ] **Step 5: Compose into layout**

```tsx
// src/app/layout.tsx — update
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// ... (keep font imports from Task 1)

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify in browser**

Run `npm run dev`. Visit `/`. Expected: cream background, header with wordmark + nav + date tag, footer with 3 columns. Resize to mobile width: nav collapses, "Menu" word appears, clicking opens full-screen overlay.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout src/lib/nav.ts src/app/layout.tsx
git commit -m "feat: site header, mobile menu, and footer"
```

---

### Task 4: Home — Hero section

**Files:**
- Create: `src/components/home/Hero.tsx`
- Create: `public/images/hero-placeholder.jpg` (scraped from current site; see note)
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `<Hero />` renders full-bleed background photo with event name + dates overlaid.
- Consumes: `mockEvent`.

**Asset note:** Download the hero image from `https://www.havasustampede.com/` (the cowboy action shot) and save to `public/images/hero-placeholder.jpg`. If scraping is blocked, use any high-contrast rodeo stock photo and leave a TODO in the Phase 2 handoff — Phase 1 is about design, Phase 2 fills real content.

- [ ] **Step 1: Download hero image**

Open `https://www.havasustampede.com/` in a browser. Right-click the hero cowboy/rider action image and "Save Image As" to `public/images/hero-placeholder.jpg`. If the current site is unavailable or the image is blocked, use any public-domain rodeo action photo from Unsplash and save to the same path. Mark the asset status in the commit message if a substitute was used.

- [ ] **Step 2: Build Hero component**

```tsx
// src/components/home/Hero.tsx
import Image from "next/image";
import { mockEvent } from "@/lib/mock/event";

export function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-charcoal">
      <Image
        src="/images/hero-placeholder.jpg"
        alt="A bull rider mid-ride at the Lake Havasu Stampede rodeo"
        fill
        priority
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-16">
        <h1 className="font-display text-cream text-6xl md:text-8xl lg:text-[10rem] leading-[0.9]">
          HAVASU<br />STAMPEDE
        </h1>
        <div className="mt-6 inline-block self-start bg-terracotta text-cream px-4 py-2 font-display text-2xl md:text-3xl">
          {mockEvent.dateDisplay.toUpperCase()} · PRCA RODEO
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Compose into home page**

```tsx
// src/app/page.tsx
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
```

- [ ] **Step 4: Verify in browser**

Run `npm run dev`, visit `/`. Expected: full-viewport hero with photo background, giant stacked wordmark bottom-left, terracotta date tag below. Check mobile view at 375px — type scales down, remains readable.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/Hero.tsx public/images src/app/page.tsx
git commit -m "feat: home hero with full-bleed photo and date tag"
```

---

### Task 5: Home — Countdown

**Files:**
- Create: `src/components/home/Countdown.tsx` (client)
- Create: `src/lib/countdown.ts`
- Create: `src/lib/__tests__/countdown.test.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `getTimeUntil(target: Date, now: Date): { days: number, hours: number, minutes: number, seconds: number }`. If `now >= target`, returns all zeros.
- Produces: `<Countdown targetIso="2027-03-19T18:00:00-07:00" />` — a client component that renders four large numerals updating every second.

- [ ] **Step 1: Write failing test for `getTimeUntil`**

```ts
// src/lib/__tests__/countdown.test.ts
import { describe, it, expect } from "vitest";
import { getTimeUntil } from "../countdown";

describe("getTimeUntil", () => {
  it("returns correct days/hours/minutes/seconds for a future date", () => {
    const now = new Date("2027-03-18T18:00:00Z");
    const target = new Date("2027-03-19T18:00:00Z");
    expect(getTimeUntil(target, now)).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("returns zeros when target has passed", () => {
    const now = new Date("2027-03-20T00:00:00Z");
    const target = new Date("2027-03-19T18:00:00Z");
    expect(getTimeUntil(target, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("handles sub-day diffs correctly", () => {
    const now = new Date("2027-03-19T15:30:45Z");
    const target = new Date("2027-03-19T18:45:50Z");
    expect(getTimeUntil(target, now)).toEqual({
      days: 0,
      hours: 3,
      minutes: 15,
      seconds: 5,
    });
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- --run src/lib/__tests__/countdown.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `getTimeUntil`**

```ts
// src/lib/countdown.ts
export function getTimeUntil(target: Date, now: Date = new Date()) {
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}
```

- [ ] **Step 4: Run tests to verify pass**

Run: `npm test -- --run`
Expected: PASS all three.

- [ ] **Step 5: Implement Countdown component**

```tsx
// src/components/home/Countdown.tsx
"use client";
import { useEffect, useState } from "react";
import { getTimeUntil } from "@/lib/countdown";

export function Countdown({ targetIso }: { targetIso: string }) {
  const target = new Date(targetIso);
  const [time, setTime] = useState(() => getTimeUntil(target, new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeUntil(target, new Date())), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="bg-cream border-y-2 border-charcoal py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-sm uppercase tracking-widest mb-6">Countdown to opening night</p>
        <div className="grid grid-cols-4 gap-4 text-center">
          {[
            ["Days", time.days],
            ["Hours", pad(time.hours)],
            ["Minutes", pad(time.minutes)],
            ["Seconds", pad(time.seconds)],
          ].map(([label, value]) => (
            <div key={label as string}>
              <div className="font-display text-6xl md:text-8xl lg:text-9xl text-terracotta leading-none">
                {value}
              </div>
              <div className="font-body text-xs uppercase tracking-widest mt-2">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Add to home page**

```tsx
// src/app/page.tsx
import { Hero } from "@/components/home/Hero";
import { Countdown } from "@/components/home/Countdown";

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown targetIso="2027-03-19T18:00:00-07:00" />
    </>
  );
}
```

- [ ] **Step 7: Verify in browser**

Run `npm run dev`, scroll past hero. Expected: four big terracotta numerals updating every second, labels in small caps below. Verify counts down to 2027-03-19.

- [ ] **Step 8: Commit**

```bash
git add src/components/home/Countdown.tsx src/lib/countdown.ts src/lib/__tests__/countdown.test.ts src/app/page.tsx
git commit -m "feat: home countdown with tested time arithmetic"
```

---

### Task 6: Home — At a Glance

**Files:**
- Create: `src/components/home/AtAGlance.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `<AtAGlance />` renders three stacked typographic statements separated by hard rules.

- [ ] **Step 1: Build component**

```tsx
// src/components/home/AtAGlance.tsx
export function AtAGlance() {
  const statements = [
    "PRCA Sanctioned Rodeo",
    "March 19–21, 2027",
    "Lake Havasu City, Arizona",
  ];
  return (
    <section className="bg-cream py-20 px-6">
      <div className="max-w-6xl mx-auto divide-y-2 divide-charcoal">
        {statements.map((s) => (
          <p key={s} className="font-display text-5xl md:text-7xl py-8">
            {s.toUpperCase()}
          </p>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to home page**

```tsx
// src/app/page.tsx
import { AtAGlance } from "@/components/home/AtAGlance";

// Inside <main>:
<Hero />
<Countdown targetIso="2027-03-19T18:00:00-07:00" />
<AtAGlance />
```

- [ ] **Step 3: Verify in browser and commit**

Expected: three huge statements stacked with hard rules between them.

```bash
git add src/components/home/AtAGlance.tsx src/app/page.tsx
git commit -m "feat: home at-a-glance three-statement block"
```

---

### Task 7: Home — Schedule preview

**Files:**
- Create: `src/components/home/SchedulePreview.tsx`
- Create: `src/lib/mock/schedule.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `mockSchedule: ScheduleDay[]` where `ScheduleDay = { dayLabel: string, date: string, items: { time: string, title: string }[] }`.
- Produces: `<SchedulePreview />` renders three horizontal day blocks, each a solid color panel with 3 top events, plus a "See full schedule →" link.

- [ ] **Step 1: Create mock schedule**

```ts
// src/lib/mock/schedule.ts
export type ScheduleItem = { time: string; title: string };
export type ScheduleDay = {
  dayLabel: string;
  date: string;
  items: ScheduleItem[];
};

export const mockSchedule: ScheduleDay[] = [
  {
    dayLabel: "Friday",
    date: "March 19, 2027",
    items: [
      { time: "6:00 PM", title: "Gates Open" },
      { time: "7:00 PM", title: "PRCA Rodeo Performance" },
      { time: "9:30 PM", title: "Live Music" },
    ],
  },
  {
    dayLabel: "Saturday",
    date: "March 20, 2027",
    items: [
      { time: "11:00 AM", title: "Mutton Busting" },
      { time: "1:00 PM", title: "Slack Round" },
      { time: "7:00 PM", title: "PRCA Rodeo Performance" },
    ],
  },
  {
    dayLabel: "Sunday",
    date: "March 21, 2027",
    items: [
      { time: "11:00 AM", title: "Cowboy Church" },
      { time: "1:00 PM", title: "PRCA Rodeo Finals" },
      { time: "4:00 PM", title: "Awards Ceremony" },
    ],
  },
];
```

- [ ] **Step 2: Build component**

```tsx
// src/components/home/SchedulePreview.tsx
import Link from "next/link";
import { mockSchedule } from "@/lib/mock/schedule";

const DAY_BG = ["bg-terracotta", "bg-turquoise", "bg-ochre"];

export function SchedulePreview() {
  return (
    <section className="border-y-2 border-charcoal">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {mockSchedule.map((day, i) => (
          <div
            key={day.dayLabel}
            className={`${DAY_BG[i]} text-cream p-10 min-h-[380px] ${i < 2 ? "border-b-2 lg:border-b-0 lg:border-r-2 border-charcoal" : ""}`}
          >
            <p className="font-body text-sm uppercase tracking-widest">{day.date}</p>
            <h3 className="font-display text-6xl mt-2">{day.dayLabel.toUpperCase()}</h3>
            <ul className="mt-8 space-y-3">
              {day.items.map((item) => (
                <li key={item.time} className="flex justify-between border-b border-cream/40 pb-2">
                  <span className="font-body text-sm">{item.time}</span>
                  <span className="font-display text-lg">{item.title.toUpperCase()}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-cream border-t-2 border-charcoal px-6 py-6 text-center">
        <Link href="/schedule" className="font-display text-xl underline underline-offset-4">
          SEE FULL SCHEDULE →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to home page and verify**

Add `<SchedulePreview />` after `<AtAGlance />` in `src/app/page.tsx`. Expected: three large colored day blocks side-by-side on desktop, stacked on mobile. Each block shows date, day name, 3 events.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/SchedulePreview.tsx src/lib/mock/schedule.ts src/app/page.tsx
git commit -m "feat: home schedule preview with three-day color blocks"
```

---

### Task 8: Home — Tickets block

**Files:**
- Create: `src/components/home/TicketsBlock.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `<TicketsBlock />` renders a two-column charcoal panel: headline/fine print on left, terracotta rectangle "Buy Online — Save $5 ↗" on right.

- [ ] **Step 1: Build component**

```tsx
// src/components/home/TicketsBlock.tsx
export function TicketsBlock() {
  return (
    <section className="bg-charcoal text-cream border-b-2 border-charcoal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 lg:px-16 py-20 max-w-7xl mx-auto">
        <div>
          <p className="font-body text-sm uppercase tracking-widest text-ochre">Tickets</p>
          <h2 className="font-display text-6xl lg:text-7xl mt-4">BUY ONLINE,<br />SAVE $5.</h2>
          <p className="font-body text-base mt-6 max-w-md">
            Advance tickets are $5 less than at the gate. Multiple-night passes available.
            All sales handled by rodeoticket.com.
          </p>
        </div>
        <div className="flex items-center justify-center lg:justify-end">
          <a
            href="https://www.rodeoticket.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-terracotta text-cream px-10 py-8 font-display text-3xl md:text-4xl hover:bg-ochre transition-colors"
          >
            GET TICKETS ↗
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to home and verify**

Add `<TicketsBlock />` after `<SchedulePreview />`. Verify: charcoal background, big terracotta button fills the right column at desktop.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/TicketsBlock.tsx src/app/page.tsx
git commit -m "feat: home tickets block with external CTA"
```

---

### Task 9: Home — Sponsors wall

**Files:**
- Create: `src/components/home/SponsorsWall.tsx`
- Create: `src/lib/mock/sponsors.ts`
- Create: `public/images/sponsors/README.md` (note to replace)
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `mockSponsors: Sponsor[]` where `Sponsor = { name: string, logo: string, tier: "Title" | "Gold" | "Silver", url?: string }`.
- Produces: `<SponsorsWall />` renders tier-grouped logo wall.

- [ ] **Step 1: Create mock sponsors**

```ts
// src/lib/mock/sponsors.ts
export type SponsorTier = "Title" | "Gold" | "Silver";
export type Sponsor = { name: string; logo: string; tier: SponsorTier; url?: string };

export const mockSponsors: Sponsor[] = [
  { name: "Honeycutt", logo: "/images/sponsors/honeycutt.png", tier: "Title", url: "#" },
  { name: "Gold Spur Productions", logo: "/images/sponsors/gold-spur.png", tier: "Title", url: "#" },
  { name: "PRCA", logo: "/images/sponsors/prca.png", tier: "Gold", url: "#" },
  { name: "Sponsor 4", logo: "/images/sponsors/placeholder.png", tier: "Silver" },
  { name: "Sponsor 5", logo: "/images/sponsors/placeholder.png", tier: "Silver" },
  { name: "Sponsor 6", logo: "/images/sponsors/placeholder.png", tier: "Silver" },
];
```

- [ ] **Step 2: Add sponsor logo placeholders**

Download Honeycutt / Gold Spur / PRCA logos from current site if accessible, save to `public/images/sponsors/`. If not accessible, add a note to the README and leave the paths — Next.js will serve the broken-image fallback until replaced.

- [ ] **Step 3: Build component**

```tsx
// src/components/home/SponsorsWall.tsx
import Image from "next/image";
import { mockSponsors, SponsorTier } from "@/lib/mock/sponsors";

const TIER_ORDER: SponsorTier[] = ["Title", "Gold", "Silver"];

export function SponsorsWall() {
  return (
    <section className="bg-cream border-b-2 border-charcoal py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-sm uppercase tracking-widest">Partners</p>
        <h2 className="font-display text-5xl md:text-7xl mt-4 mb-12">PROUDLY SPONSORED BY</h2>
        {TIER_ORDER.map((tier) => {
          const inTier = mockSponsors.filter((s) => s.tier === tier);
          if (inTier.length === 0) return null;
          return (
            <div key={tier} className="mb-12">
              <p className="font-body text-xs uppercase tracking-widest text-charcoal/70 mb-4">
                {tier} Sponsors
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
                {inTier.map((s) => (
                  <div key={s.name} className="relative aspect-[3/2] grayscale hover:grayscale-0 transition">
                    <Image src={s.logo} alt={`${s.name} logo`} fill className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add to home and verify**

Add `<SponsorsWall />` after `<TicketsBlock />`. Verify tiers render in order, logos grayscale by default.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/SponsorsWall.tsx src/lib/mock/sponsors.ts public/images/sponsors src/app/page.tsx
git commit -m "feat: home sponsors wall grouped by tier"
```

---

### Task 10: Home — Gallery with lightbox

**Files:**
- Create: `src/components/home/Gallery.tsx` (client)
- Create: `src/lib/mock/gallery.ts`
- Create: `public/images/gallery/README.md`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `mockGallery: GalleryImage[]` where `GalleryImage = { src: string, alt: string, orientation: "portrait" | "landscape" }`.
- Produces: `<Gallery />` renders an editorial grid with varying sizes; clicking opens a basic lightbox.

- [ ] **Step 1: Create mock gallery**

```ts
// src/lib/mock/gallery.ts
export type GalleryOrientation = "portrait" | "landscape";
export type GalleryImage = { src: string; alt: string; orientation: GalleryOrientation };

export const mockGallery: GalleryImage[] = [
  { src: "/images/gallery/1.jpg", alt: "Bull rider mid-air", orientation: "landscape" },
  { src: "/images/gallery/2.jpg", alt: "Barrel racer tight turn", orientation: "portrait" },
  { src: "/images/gallery/3.jpg", alt: "Crowd under stadium lights", orientation: "landscape" },
  { src: "/images/gallery/4.jpg", alt: "Mutton busting kid", orientation: "portrait" },
  { src: "/images/gallery/5.jpg", alt: "Rodeo clown entertaining crowd", orientation: "landscape" },
  { src: "/images/gallery/6.jpg", alt: "Steer wrestling takedown", orientation: "landscape" },
];
```

- [ ] **Step 2: Build Gallery component**

```tsx
// src/components/home/Gallery.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { mockGallery } from "@/lib/mock/gallery";

export function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const close = () => setActiveIdx(null);
  const active = activeIdx !== null ? mockGallery[activeIdx] : null;

  return (
    <section className="bg-charcoal border-b-2 border-charcoal py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-sm uppercase tracking-widest text-ochre">Gallery</p>
        <h2 className="font-display text-5xl md:text-7xl text-cream mt-4 mb-12">FROM THE ARENA</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {mockGallery.map((img, idx) => {
            const colSpan =
              img.orientation === "landscape" ? "md:col-span-3" : "md:col-span-2";
            const rowSpan =
              img.orientation === "portrait" ? "md:row-span-2 aspect-[2/3]" : "aspect-[3/2]";
            return (
              <button
                key={img.src}
                onClick={() => setActiveIdx(idx)}
                className={`relative ${colSpan} ${rowSpan} overflow-hidden`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </button>
            );
          })}
        </div>
      </div>
      {active && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="relative w-full max-w-5xl aspect-video">
            <Image src={active.src} alt={active.alt} fill className="object-contain" />
          </div>
          <button
            onClick={close}
            className="absolute top-6 right-6 font-display text-cream text-lg uppercase underline underline-offset-4"
          >
            Close
          </button>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 3: Add to home and verify**

Add `<Gallery />` after `<SponsorsWall />`. Verify: mixed grid with portrait/landscape sizes, clicking opens lightbox, Close dismisses. Mobile: 2-column uniform grid.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/Gallery.tsx src/lib/mock/gallery.ts public/images/gallery src/app/page.tsx
git commit -m "feat: home gallery grid with lightbox"
```

---

### Task 11: Home — FAQ teaser

**Files:**
- Create: `src/components/home/FaqTeaser.tsx` (client — uses `<details>` for progressive enhancement)
- Create: `src/lib/mock/faq.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `mockFaq: Faq[]` where `Faq = { question: string, answer: string, category: string }`.
- Produces: `<FaqTeaser />` renders 5 accordion items using native `<details>`/`<summary>` (no icon packs, hard-ruled, type-driven).

- [ ] **Step 1: Create mock FAQ**

```ts
// src/lib/mock/faq.ts
export type Faq = { question: string; answer: string; category: string };

export const mockFaq: Faq[] = [
  {
    question: "What time do gates open?",
    answer: "Gates open at 6:00 PM Friday and 11:00 AM Saturday/Sunday.",
    category: "Logistics",
  },
  {
    question: "Can I bring my own food?",
    answer: "Outside food and sealed water bottles are welcome. No glass containers.",
    category: "Policies",
  },
  {
    question: "Is parking free?",
    answer: "General parking is free. Preferred parking passes available on request.",
    category: "Logistics",
  },
  {
    question: "Is this event kid-friendly?",
    answer: "Absolutely. Mutton busting signup is open to kids 4–7 at the Saturday event.",
    category: "Kids",
  },
  {
    question: "What if it rains?",
    answer: "The event runs rain or shine. Refunds are only issued for cancellations by the committee.",
    category: "Policies",
  },
];
```

- [ ] **Step 2: Build component**

```tsx
// src/components/home/FaqTeaser.tsx
import Link from "next/link";
import { mockFaq } from "@/lib/mock/faq";

export function FaqTeaser() {
  return (
    <section className="bg-cream border-b-2 border-charcoal py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-body text-sm uppercase tracking-widest">Common Questions</p>
        <h2 className="font-display text-5xl md:text-7xl mt-4 mb-12">FAQ</h2>
        <div className="divide-y-2 divide-charcoal border-y-2 border-charcoal">
          {mockFaq.slice(0, 5).map((item) => (
            <details key={item.question} className="group py-6">
              <summary className="flex justify-between items-start cursor-pointer list-none">
                <span className="font-display text-2xl md:text-3xl flex-1 pr-6">
                  {item.question.toUpperCase()}
                </span>
                <span className="font-display text-3xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="font-body text-base mt-4 pr-10">{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/faq" className="font-display text-xl underline underline-offset-4">
            SEE ALL FAQS →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to home and verify**

Add `<FaqTeaser />` after `<Gallery />`. Verify: 5 questions in accordion form, `+` rotates to `×` on open, link to full FAQ at bottom.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/FaqTeaser.tsx src/lib/mock/faq.ts src/app/page.tsx
git commit -m "feat: home FAQ teaser with native accordion"
```

---

### Task 12: Detail routes with static content

**Files:**
- Create: `src/app/schedule/page.tsx`
- Create: `src/app/sponsors/page.tsx`
- Create: `src/app/vendor/page.tsx`
- Create: `src/app/rv/page.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/app/faq/page.tsx`
- Create: `src/app/contact/page.tsx`
- Create: `src/components/layout/PageHero.tsx`
- Delete: `src/app/_debug/page.tsx`

**Interfaces:**
- Produces: `<PageHero title="..." eyebrow="..." />` renders a short two-line page hero (eyebrow + big title on cream, bordered bottom).
- Produces: seven pages, each renders `<PageHero />` + a page-specific body using mock data (reusing `mockSchedule`, `mockSponsors`, `mockFaq`).

- [ ] **Step 1: Build PageHero**

```tsx
// src/components/layout/PageHero.tsx
export function PageHero({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <section className="bg-cream border-b-2 border-charcoal px-6 lg:px-16 py-16">
      <p className="font-body text-sm uppercase tracking-widest">{eyebrow}</p>
      <h1 className="font-display text-6xl md:text-8xl mt-4">{title.toUpperCase()}</h1>
    </section>
  );
}
```

- [ ] **Step 2: Build `/schedule`**

```tsx
// src/app/schedule/page.tsx
import { PageHero } from "@/components/layout/PageHero";
import { mockSchedule } from "@/lib/mock/schedule";

export default function SchedulePage() {
  return (
    <>
      <PageHero eyebrow="Three Days" title="Full Schedule" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {mockSchedule.map((day) => (
            <div key={day.dayLabel} className="border-t-2 border-charcoal pt-6">
              <p className="font-body text-sm uppercase tracking-widest">{day.date}</p>
              <h2 className="font-display text-5xl mt-2">{day.dayLabel.toUpperCase()}</h2>
              <ul className="mt-8 divide-y divide-charcoal/30">
                {day.items.map((item) => (
                  <li key={item.time} className="flex justify-between py-4">
                    <span className="font-body text-base">{item.time}</span>
                    <span className="font-display text-xl">{item.title.toUpperCase()}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Build `/sponsors`**

```tsx
// src/app/sponsors/page.tsx
import { PageHero } from "@/components/layout/PageHero";
import Image from "next/image";
import { mockSponsors, SponsorTier } from "@/lib/mock/sponsors";

const TIER_ORDER: SponsorTier[] = ["Title", "Gold", "Silver"];

export default function SponsorsPage() {
  return (
    <>
      <PageHero eyebrow="Partners" title="Our Sponsors" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {TIER_ORDER.map((tier) => {
            const sponsors = mockSponsors.filter((s) => s.tier === tier);
            return (
              <div key={tier} className="border-t-2 border-charcoal pt-6">
                <h2 className="font-display text-4xl">{tier.toUpperCase()}</h2>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-10">
                  {sponsors.map((s) => (
                    <div key={s.name} className="relative aspect-[3/2]">
                      <Image src={s.logo} alt={`${s.name} logo`} fill className="object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Build `/vendor`**

```tsx
// src/app/vendor/page.tsx
import { PageHero } from "@/components/layout/PageHero";

export default function VendorPage() {
  return (
    <>
      <PageHero eyebrow="Vendor Information" title="Sell at the Stampede" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-6 font-body text-lg">
          <p>
            Vendor applications for the 2027 Havasu Stampede are reviewed on a rolling basis.
            Submit your application below. Priority is given to Arizona-based food and craft vendors.
          </p>
          <p>Booth fees and electrical requirements are detailed in the application packet.</p>
          <a
            href="https://example.com/vendor-application"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-terracotta text-cream px-8 py-5 font-display text-2xl"
          >
            APPLY NOW ↗
          </a>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Build `/rv`**

```tsx
// src/app/rv/page.tsx
import { PageHero } from "@/components/layout/PageHero";

export default function RvPage() {
  return (
    <>
      <PageHero eyebrow="RV Information" title="Stay at the Grounds" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-6 font-body text-lg">
          <p>
            Dry camping passes are available for all three nights of the Stampede.
            First come, first served. Passes include access to shared water and dump facilities.
          </p>
          <p>Hookups are not available on-site. See the application link for current pricing.</p>
          <a
            href="https://example.com/rv-reservation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-turquoise text-cream px-8 py-5 font-display text-2xl"
          >
            RESERVE RV PASS ↗
          </a>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 6: Build `/about`, `/faq`, `/contact`**

```tsx
// src/app/about/page.tsx
import { PageHero } from "@/components/layout/PageHero";

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our Story" title="About the Stampede" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-6 font-body text-lg">
          <p>
            The Havasu Stampede is a PRCA-sanctioned professional rodeo held each
            spring in Lake Havasu City, Arizona. Launched by local rodeo volunteers,
            the Stampede draws top cowboys and cowgirls from across the western US.
          </p>
          <p>
            Proceeds support youth rodeo programs and the Lake Havasu community.
          </p>
        </div>
      </section>
    </>
  );
}
```

```tsx
// src/app/faq/page.tsx
import { PageHero } from "@/components/layout/PageHero";
import { mockFaq } from "@/lib/mock/faq";

export default function FaqPage() {
  const categories = Array.from(new Set(mockFaq.map((f) => f.category)));
  return (
    <>
      <PageHero eyebrow="Common Questions" title="FAQ" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {categories.map((cat) => (
            <div key={cat} className="border-t-2 border-charcoal pt-6">
              <h2 className="font-display text-3xl">{cat.toUpperCase()}</h2>
              <div className="mt-6 divide-y-2 divide-charcoal">
                {mockFaq.filter((f) => f.category === cat).map((f) => (
                  <details key={f.question} className="py-4 group">
                    <summary className="flex justify-between font-display text-xl cursor-pointer list-none">
                      <span>{f.question.toUpperCase()}</span>
                      <span className="group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="font-body text-base mt-3">{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
```

```tsx
// src/app/contact/page.tsx
import { PageHero } from "@/components/layout/PageHero";
import { ExternalLink } from "@/components/primitives/ExternalLink";

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Get in Touch" title="Contact" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-10 font-body text-lg">
          <div>
            <p className="font-body text-sm uppercase tracking-widest text-charcoal/70">Email</p>
            <a href="mailto:info@havasustampede.com" className="font-display text-3xl underline underline-offset-4">
              info@havasustampede.com
            </a>
          </div>
          <div>
            <p className="font-body text-sm uppercase tracking-widest text-charcoal/70">Follow</p>
            <div className="flex gap-6 mt-2">
              <ExternalLink href="https://www.facebook.com/lakehavasustampede" className="font-display text-2xl">
                Facebook
              </ExternalLink>
              <ExternalLink href="https://www.instagram.com/" className="font-display text-2xl">
                Instagram
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 7: Delete debug route**

```bash
rm -rf src/app/_debug
```

- [ ] **Step 8: Verify in browser**

Click every nav link. Expected: every route renders a page hero + content, no 404s, no broken images (sponsor placeholders ok).

- [ ] **Step 9: Commit**

```bash
git add src/app src/components/layout/PageHero.tsx
git rm -r src/app/_debug 2>/dev/null || true
git commit -m "feat: detail routes with static mock content; drop debug route"
```

---

**Phase 1 complete.** Site is a fully-clickable static design. From here you can deploy to Railway immediately to review live, or continue to Phase 2 to wire up Sanity.

---

## Phase 2 — Sanity CMS integration

### Task 13: Sanity schemas

**External prerequisite:** User must create a free Sanity account at sanity.io and create a project. Note the `projectId` and `dataset` (usually `production`).

**Files:**
- Create: `sanity.config.ts`
- Create: `sanity/env.ts`
- Create: `sanity/schemas/index.ts`
- Create: `sanity/schemas/event.ts`
- Create: `sanity/schemas/homepage.ts`
- Create: `sanity/schemas/externalLinks.ts`
- Create: `sanity/schemas/contactInfo.ts`
- Create: `sanity/schemas/scheduleDay.ts`
- Create: `sanity/schemas/sponsor.ts`
- Create: `sanity/schemas/sponsorTier.ts`
- Create: `sanity/schemas/faq.ts`
- Create: `sanity/schemas/galleryImage.ts`
- Create: `sanity/schemas/page.ts`
- Modify: `.env.local` (create)

**Interfaces:**
- Produces: 11 Sanity document types matching the spec's content model (4 singletons + 7 collections).

- [ ] **Step 1: Install Sanity packages**

```bash
npm install sanity next-sanity @sanity/image-url @sanity/vision styled-components
```

- [ ] **Step 2: Add env vars**

Create `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<optional-for-drafts>
```

Add `.env.local` to `.gitignore` if not already.

- [ ] **Step 3: Create env module**

```ts
// sanity/env.ts
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing NEXT_PUBLIC_SANITY_DATASET"
);

export const apiVersion = "2026-01-01";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) throw new Error(errorMessage);
  return v;
}
```

- [ ] **Step 4: Define all schemas**

Create each schema. Example — `sanity/schemas/event.ts`:

```ts
import { defineType, defineField } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "year", type: "number" }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "endDate", type: "date" }),
    defineField({ name: "dateDisplay", type: "string", description: 'e.g. "March 19-21, 2027"' }),
    defineField({
      name: "venue",
      type: "object",
      fields: [
        defineField({ name: "name", type: "string" }),
        defineField({ name: "address", type: "string" }),
        defineField({ name: "directionsUrl", type: "url" }),
      ],
    }),
    defineField({ name: "prcaSanctioned", type: "boolean", initialValue: true }),
  ],
});
```

Create the remaining schemas analogously (follow the Sanity content model in the spec exactly):
- `homepage.ts` — fields: `heroImage` (image with hotspot), `heroHeadlineOverride` (string, optional), `featureFlags` (object with booleans for each home section)
- `externalLinks.ts` — fields: `ticketsUrl`, `vendorApplicationUrl`, `rvReservationUrl`, `muttonBustingUrl` (all `url`)
- `contactInfo.ts` — fields: `email`, `phone`, `mailingAddress`, `facebookUrl`, `instagramUrl`
- `scheduleDay.ts` — fields: `date` (date), `label` (string), `items` (array of objects with `time`, `title`, `arena`, `description`)
- `sponsor.ts` — fields: `name`, `logo` (image), `tier` (reference to sponsorTier), `websiteUrl` (url)
- `sponsorTier.ts` — fields: `name`, `order` (number)
- `faq.ts` — fields: `question`, `answer` (array of blocks — portable text), `category`
- `galleryImage.ts` — fields: `image` (image with hotspot), `caption`, `year`, `orientation` (string with options "portrait" or "landscape")
- `page.ts` — fields: `slug` (slug), `title`, `body` (portable text)

- [ ] **Step 5: Create schemas index**

```ts
// sanity/schemas/index.ts
import { event } from "./event";
import { homepage } from "./homepage";
import { externalLinks } from "./externalLinks";
import { contactInfo } from "./contactInfo";
import { scheduleDay } from "./scheduleDay";
import { sponsor } from "./sponsor";
import { sponsorTier } from "./sponsorTier";
import { faq } from "./faq";
import { galleryImage } from "./galleryImage";
import { page } from "./page";

export const schemaTypes = [
  event, homepage, externalLinks, contactInfo,
  scheduleDay, sponsor, sponsorTier, faq, galleryImage, page,
];
```

- [ ] **Step 6: Create sanity.config.ts**

```ts
// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
```

- [ ] **Step 7: Verify `sanity` CLI works**

```bash
npx sanity --version
# Expect: version printed, no errors
```

- [ ] **Step 8: Commit**

```bash
git add sanity sanity.config.ts package.json package-lock.json .env.local.example
git commit -m "feat: Sanity CMS schemas and config"
```

(Create `.env.local.example` listing variable names, do not commit `.env.local`.)

---

### Task 14: Sanity client and typed queries

**Files:**
- Create: `src/lib/sanity/client.ts`
- Create: `src/lib/sanity/image.ts`
- Create: `src/lib/sanity/queries.ts`
- Create: `src/lib/sanity/types.ts`
- Create: `src/lib/sanity/__tests__/queries.test.ts`

**Interfaces:**
- Produces: `client` — a `@sanity/client` instance.
- Produces: `urlFor(source): ImageUrlBuilder` — generates Sanity CDN URLs.
- Produces: `fetchHomepage()`, `fetchEvent()`, `fetchSchedule()`, `fetchSponsors()`, `fetchFaq()`, `fetchGallery()`, `fetchExternalLinks()`, `fetchContactInfo()`, `fetchPage(slug)`.
- Produces: TS types for each document.

- [ ] **Step 1: Create client**

```ts
// src/lib/sanity/client.ts
import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../../../sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
```

- [ ] **Step 2: Create image helper**

```ts
// src/lib/sanity/image.ts
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "../../../sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

- [ ] **Step 3: Define types**

```ts
// src/lib/sanity/types.ts
export type SanityImage = {
  _type: "image";
  asset: { _ref: string };
  hotspot?: { x: number; y: number };
};

export type EventDoc = {
  year: number;
  startDate: string;
  endDate: string;
  dateDisplay: string;
  venue: { name: string; address: string; directionsUrl: string };
  prcaSanctioned: boolean;
};

export type HomepageDoc = {
  heroImage: SanityImage;
  heroHeadlineOverride?: string;
  featureFlags: Record<string, boolean>;
};

export type ScheduleItem = { time: string; title: string; arena?: string; description?: string };
export type ScheduleDay = { date: string; label: string; items: ScheduleItem[] };

export type SponsorTier = { name: string; order: number };
export type Sponsor = { name: string; logo: SanityImage; tier: SponsorTier; websiteUrl?: string };

export type Faq = { question: string; answer: unknown; category: string };
export type GalleryImage = { image: SanityImage; caption?: string; year?: number; orientation: "portrait" | "landscape" };

export type ExternalLinks = {
  ticketsUrl: string;
  vendorApplicationUrl: string;
  rvReservationUrl: string;
  muttonBustingUrl: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  mailingAddress: string;
  facebookUrl: string;
  instagramUrl: string;
};

export type PageDoc = { slug: string; title: string; body: unknown };
```

- [ ] **Step 4: Write queries**

```ts
// src/lib/sanity/queries.ts
import { client } from "./client";
import type {
  EventDoc, HomepageDoc, ScheduleDay, Sponsor, Faq, GalleryImage,
  ExternalLinks, ContactInfo, PageDoc,
} from "./types";

export async function fetchEvent(): Promise<EventDoc | null> {
  return client.fetch(`*[_type == "event"][0]`);
}

export async function fetchHomepage(): Promise<HomepageDoc | null> {
  return client.fetch(`*[_type == "homepage"][0]`);
}

export async function fetchSchedule(): Promise<ScheduleDay[]> {
  return client.fetch(`*[_type == "scheduleDay"] | order(date asc)`);
}

export async function fetchSponsors(): Promise<Sponsor[]> {
  return client.fetch(`
    *[_type == "sponsor"]{
      name, logo, websiteUrl,
      "tier": tier->{ name, order }
    } | order(tier.order asc, name asc)
  `);
}

export async function fetchFaq(): Promise<Faq[]> {
  return client.fetch(`*[_type == "faq"] | order(category asc)`);
}

export async function fetchGallery(): Promise<GalleryImage[]> {
  return client.fetch(`*[_type == "galleryImage"] | order(year desc)`);
}

export async function fetchExternalLinks(): Promise<ExternalLinks | null> {
  return client.fetch(`*[_type == "externalLinks"][0]`);
}

export async function fetchContactInfo(): Promise<ContactInfo | null> {
  return client.fetch(`*[_type == "contactInfo"][0]`);
}

export async function fetchPage(slug: string): Promise<PageDoc | null> {
  return client.fetch(`*[_type == "page" && slug.current == $slug][0]`, { slug });
}
```

- [ ] **Step 5: Write integration test (requires real Sanity dataset)**

**Note:** This test requires the user to have populated the dataset. If not populated, skip this task's test step and verify in Phase 2 Task 15 instead.

```ts
// src/lib/sanity/__tests__/queries.test.ts
import { describe, it, expect } from "vitest";
import { fetchEvent } from "../queries";

describe("fetchEvent", () => {
  it("returns the event document (or null if not seeded)", async () => {
    const event = await fetchEvent();
    // Just verify shape when present — do not require data to exist
    if (event) {
      expect(event).toHaveProperty("year");
      expect(event).toHaveProperty("dateDisplay");
    }
  });
});
```

Run: `npm test -- --run src/lib/sanity`. Expected: PASS (either returns null or valid shape).

- [ ] **Step 6: Commit**

```bash
git add src/lib/sanity
git commit -m "feat: Sanity client, types, and typed queries"
```

---

### Task 15: Wire home sections to Sanity

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/home/Hero.tsx`
- Modify: `src/components/home/Countdown.tsx`
- Modify: `src/components/home/AtAGlance.tsx`
- Modify: `src/components/home/SchedulePreview.tsx`
- Modify: `src/components/home/TicketsBlock.tsx`
- Modify: `src/components/home/SponsorsWall.tsx`
- Modify: `src/components/home/Gallery.tsx`
- Modify: `src/components/home/FaqTeaser.tsx`

**Interfaces:**
- Changes each home section to accept props from fetched Sanity data instead of importing mock data directly. The `/` page becomes an `async` server component that fetches and passes data down.

- [ ] **Step 1: Update Hero**

```tsx
// src/components/home/Hero.tsx
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { EventDoc, HomepageDoc } from "@/lib/sanity/types";

export function Hero({ event, homepage }: { event: EventDoc; homepage: HomepageDoc }) {
  const headline = homepage.heroHeadlineOverride ?? "HAVASU\nSTAMPEDE";
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-charcoal">
      {homepage.heroImage && (
        <Image
          src={urlFor(homepage.heroImage).width(2400).url()}
          alt="Lake Havasu Stampede rodeo action"
          fill
          priority
          className="object-cover opacity-80"
        />
      )}
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-16">
        <h1 className="font-display text-cream text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] whitespace-pre-line">
          {headline}
        </h1>
        <div className="mt-6 inline-block self-start bg-terracotta text-cream px-4 py-2 font-display text-2xl md:text-3xl">
          {event.dateDisplay.toUpperCase()} · PRCA RODEO
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update remaining home sections**

Apply the same pattern to each: accept typed props (`SchedulePreview` takes `scheduleDays: ScheduleDay[]`, `SponsorsWall` takes `sponsors: Sponsor[]`, etc.), remove direct mock imports.

**Important: field names differ between the mock types and the Sanity types.** When editing component JSX:
- `ScheduleDay`: mock uses `dayLabel`, Sanity uses `label` — update JSX from `{day.dayLabel}` to `{day.label}`.
- `Sponsor`: mock uses `url`, Sanity uses `websiteUrl` — update accordingly.
- `GalleryImage`: mock uses `{src, alt}`, Sanity uses `{image, caption}` where `image` is a Sanity image object — update JSX to render `urlFor(img.image).width(1200).url()` for the `src`, and `img.caption ?? ""` for `alt`.
- `Faq`: `answer` goes from `string` to portable text — use `<PortableText value={item.answer as PortableTextBlock[]} />`.

For portable-text FAQ answers, install and use `@portabletext/react`:

```bash
npm install @portabletext/react
```

Then in `FaqTeaser.tsx` render answers with `<PortableText value={item.answer as PortableTextBlock[]} />`.

- [ ] **Step 3: Update home page to fetch**

```tsx
// src/app/page.tsx
import { Hero } from "@/components/home/Hero";
import { Countdown } from "@/components/home/Countdown";
import { AtAGlance } from "@/components/home/AtAGlance";
import { SchedulePreview } from "@/components/home/SchedulePreview";
import { TicketsBlock } from "@/components/home/TicketsBlock";
import { SponsorsWall } from "@/components/home/SponsorsWall";
import { Gallery } from "@/components/home/Gallery";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import {
  fetchEvent, fetchHomepage, fetchSchedule, fetchSponsors,
  fetchFaq, fetchGallery, fetchExternalLinks,
} from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function Home() {
  const [event, homepage, schedule, sponsors, faq, gallery, links] = await Promise.all([
    fetchEvent(),
    fetchHomepage(),
    fetchSchedule(),
    fetchSponsors(),
    fetchFaq(),
    fetchGallery(),
    fetchExternalLinks(),
  ]);

  if (!event || !homepage || !links) {
    return (
      <main className="p-12">
        <p className="font-display text-3xl">
          Content not yet published. Visit <a href="/studio" className="underline">/studio</a> to add the event.
        </p>
      </main>
    );
  }

  return (
    <>
      <Hero event={event} homepage={homepage} />
      <Countdown targetIso={`${event.startDate}T18:00:00-07:00`} />
      <AtAGlance event={event} />
      <SchedulePreview scheduleDays={schedule.slice(0, 3)} />
      <TicketsBlock ticketsUrl={links.ticketsUrl} />
      <SponsorsWall sponsors={sponsors} />
      <Gallery images={gallery.slice(0, 6)} />
      <FaqTeaser faqs={faq.slice(0, 5)} />
    </>
  );
}
```

- [ ] **Step 4: Seed Sanity with content**

Visit `/studio` after Task 17 is complete (or temporarily use `npx sanity dataset import` with a seed `.ndjson`). For now, document for the user: "Visit `/studio` to add an Event, Homepage, External Links, at least 1 ScheduleDay, 2 Sponsors with a Title tier, 5 FAQs, 6 Gallery images."

- [ ] **Step 5: Verify in browser**

Run `npm run dev`. Visit `/`. Expected: either the full site renders with CMS data, or the "Content not yet published" message appears.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/components/home package.json package-lock.json
git commit -m "feat: wire home sections to Sanity queries"
```

---

### Task 16: Wire detail pages to Sanity

**Files:**
- Modify: `src/app/schedule/page.tsx`
- Modify: `src/app/sponsors/page.tsx`
- Modify: `src/app/vendor/page.tsx`
- Modify: `src/app/rv/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/faq/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/lib/nav.ts`

**Interfaces:**
- Each detail page becomes `async` and fetches its specific data from Sanity. `Header` and `Footer` become async server components that fetch event + external links + contact info.

- [ ] **Step 1: Convert each page**

Apply the pattern from Task 15 Step 3 to each detail page. For `/vendor`, `/rv`: fetch `externalLinks` and use the appropriate URL. For `/about`: `fetchPage("about")` and render body with `<PortableText>`.

- [ ] **Step 2: Convert Header/Footer**

Make `Header` and `Footer` async server components:

```tsx
// src/components/layout/Header.tsx
import { fetchEvent, fetchExternalLinks } from "@/lib/sanity/queries";
// ... rest unchanged, replace mockEvent with fetched data
export async function Header() {
  const event = await fetchEvent();
  const links = await fetchExternalLinks();
  // ...
}
```

Update `NAV_ITEMS` to accept the ticket URL dynamically — move it from a constant to a function `getNavItems(ticketsUrl: string)`.

- [ ] **Step 3: Delete mock data files**

```bash
rm -rf src/lib/mock
```

- [ ] **Step 4: Verify every route**

Click every nav link. Expected: all data flows from Sanity, no "mock" imports remain. Run `grep -r "mock" src/` to confirm.

- [ ] **Step 5: Commit**

```bash
git add src/app src/components/layout src/lib/nav.ts
git rm -r src/lib/mock
git commit -m "feat: wire detail pages, header, footer to Sanity; drop mocks"
```

---

### Task 17: Embed Sanity Studio at /studio

**Files:**
- Create: `src/app/studio/[[...tool]]/page.tsx`
- Create: `src/app/studio/[[...tool]]/layout.tsx`
- Modify: `next.config.ts` (if needed for Studio asset handling)

**Interfaces:**
- Produces: `/studio` route serving the full Sanity Studio UI for logged-in editors.

- [ ] **Step 1: Create Studio route**

```tsx
// src/app/studio/[[...tool]]/page.tsx
"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 2: Add layout that bypasses global header/footer**

```tsx
// src/app/studio/[[...tool]]/layout.tsx
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

The nested layout prevents `Header`/`Footer` from rendering inside Studio.

- [ ] **Step 3: Verify Studio loads**

Run `npm run dev`. Visit `http://localhost:3000/studio`. Expected: Sanity Studio UI loads. Log in with Google or email (first-time setup prompt). Add at least one Event, Homepage, ExternalLinks document to unblock the frontend.

- [ ] **Step 4: Commit**

```bash
git add src/app/studio
git commit -m "feat: embed Sanity Studio at /studio"
```

**Phase 2 complete.** Content is editable through `/studio`. The site reads live from Sanity.

---

## Phase 3 — Social wall + Railway deployment

### Task 18: Social feed fetcher with fallback

**External prerequisites:**
- Facebook: user creates a Facebook App, generates a Page Access Token for the Havasu Stampede page.
- Instagram: user connects Instagram Business Account via Facebook App, gets Instagram Graph API access.
- If either fails: fallback to static "Follow us" strip.

**Files:**
- Create: `src/lib/social/facebook.ts`
- Create: `src/lib/social/instagram.ts`
- Create: `src/lib/social/types.ts`
- Create: `src/lib/social/__tests__/fallback.test.ts`
- Modify: `.env.local.example`

**Interfaces:**
- Produces: `type SocialPost = { id: string, source: "facebook" | "instagram", text: string, imageUrl?: string, postUrl: string, createdAt: string }`.
- Produces: `fetchFacebookPosts(limit = 3): Promise<SocialPost[]>` — returns empty array on API failure.
- Produces: `fetchInstagramPosts(limit = 3): Promise<SocialPost[]>` — returns empty array on API failure.
- Produces: `fetchSocialPosts(): Promise<SocialPost[]>` — fetches both, dedupes, sorts by date, caps at 6.

- [ ] **Step 1: Define types**

```ts
// src/lib/social/types.ts
export type SocialPost = {
  id: string;
  source: "facebook" | "instagram";
  text: string;
  imageUrl?: string;
  postUrl: string;
  createdAt: string;
};
```

- [ ] **Step 2: Write failing test for fallback behavior**

```ts
// src/lib/social/__tests__/fallback.test.ts
import { describe, it, expect, vi } from "vitest";
import { fetchFacebookPosts } from "../facebook";

describe("fetchFacebookPosts fallback", () => {
  it("returns empty array when FACEBOOK_PAGE_ACCESS_TOKEN is missing", async () => {
    const original = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    delete process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    const result = await fetchFacebookPosts();
    expect(result).toEqual([]);
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN = original;
  });

  it("returns empty array when Graph API fails", async () => {
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN = "fake-token";
    process.env.FACEBOOK_PAGE_ID = "fake-id";
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "nope" }), { status: 400 })
    );
    const result = await fetchFacebookPosts();
    expect(result).toEqual([]);
  });
});
```

Run: `npm test -- --run`. Expected: FAIL — module not found.

- [ ] **Step 3: Implement Facebook fetcher**

```ts
// src/lib/social/facebook.ts
import type { SocialPost } from "./types";

export async function fetchFacebookPosts(limit = 3): Promise<SocialPost[]> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  if (!token || !pageId) return [];

  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/posts?fields=id,message,permalink_url,full_picture,created_time&limit=${limit}&access_token=${token}`,
      { next: { revalidate: 900 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data ?? []).map((p: {
      id: string; message?: string; permalink_url: string; full_picture?: string; created_time: string;
    }) => ({
      id: p.id,
      source: "facebook" as const,
      text: p.message ?? "",
      imageUrl: p.full_picture,
      postUrl: p.permalink_url,
      createdAt: p.created_time,
    }));
  } catch {
    return [];
  }
}
```

- [ ] **Step 4: Implement Instagram fetcher**

```ts
// src/lib/social/instagram.ts
import type { SocialPost } from "./types";

export async function fetchInstagramPosts(limit = 3): Promise<SocialPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!token || !userId) return [];

  try {
    const res = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,permalink,media_url,timestamp&limit=${limit}&access_token=${token}`,
      { next: { revalidate: 900 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data ?? []).map((p: {
      id: string; caption?: string; permalink: string; media_url?: string; timestamp: string;
    }) => ({
      id: p.id,
      source: "instagram" as const,
      text: p.caption ?? "",
      imageUrl: p.media_url,
      postUrl: p.permalink,
      createdAt: p.timestamp,
    }));
  } catch {
    return [];
  }
}
```

- [ ] **Step 5: Combined fetcher**

Add to `src/lib/social/index.ts`:

```ts
// src/lib/social/index.ts
import { fetchFacebookPosts } from "./facebook";
import { fetchInstagramPosts } from "./instagram";
import type { SocialPost } from "./types";

export async function fetchSocialPosts(): Promise<SocialPost[]> {
  const [fb, ig] = await Promise.all([fetchFacebookPosts(3), fetchInstagramPosts(3)]);
  return [...fb, ...ig]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 6);
}
```

- [ ] **Step 6: Run tests to verify**

Run: `npm test -- --run`. Expected: PASS all fallback tests.

- [ ] **Step 7: Document env vars**

Add to `.env.local.example`:

```
FACEBOOK_PAGE_ACCESS_TOKEN=
FACEBOOK_PAGE_ID=
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_USER_ID=
```

- [ ] **Step 8: Commit**

```bash
git add src/lib/social .env.local.example
git commit -m "feat: Facebook + Instagram feed fetchers with fallback"
```

---

### Task 19: Social wall section

**Files:**
- Create: `src/components/home/SocialWall.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `<SocialWall posts={posts} contactInfo={contactInfo} />` — renders a newsprint-style grid when posts exist, falls back to static "Follow us" strip when empty.

- [ ] **Step 1: Build component**

```tsx
// src/components/home/SocialWall.tsx
import Image from "next/image";
import type { SocialPost } from "@/lib/social/types";
import type { ContactInfo } from "@/lib/sanity/types";
import { ExternalLink } from "@/components/primitives/ExternalLink";

export function SocialWall({ posts, contactInfo }: { posts: SocialPost[]; contactInfo: ContactInfo }) {
  if (posts.length === 0) {
    return (
      <section className="bg-cream border-b-2 border-charcoal py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-body text-sm uppercase tracking-widest">Follow Along</p>
          <h2 className="font-display text-5xl md:text-7xl mt-4 mb-10">STAY IN THE LOOP</h2>
          <div className="flex justify-center gap-8">
            <ExternalLink href={contactInfo.facebookUrl} className="font-display text-3xl">
              Facebook
            </ExternalLink>
            <ExternalLink href={contactInfo.instagramUrl} className="font-display text-3xl">
              Instagram
            </ExternalLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream border-b-2 border-charcoal py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-sm uppercase tracking-widest">Follow Along</p>
        <h2 className="font-display text-5xl md:text-7xl mt-4 mb-12">THE SOCIAL FEED</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-2 border-charcoal hover:bg-charcoal hover:text-cream transition-colors"
            >
              {post.imageUrl && (
                <div className="relative aspect-[4/3]">
                  <Image src={post.imageUrl} alt="" fill className="object-cover" />
                </div>
              )}
              <div className="p-4">
                <p className="font-body text-xs uppercase tracking-widest">{post.source}</p>
                <p className="font-body text-sm mt-2 line-clamp-4">{post.text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Allow social image hosts in next.config.ts**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "**.fbcdn.net" },
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "scontent.*.fbcdn.net" },
    ],
  },
};
export default nextConfig;
```

- [ ] **Step 3: Add to home page**

```tsx
// src/app/page.tsx — add imports and fetch
import { SocialWall } from "@/components/home/SocialWall";
import { fetchSocialPosts } from "@/lib/social";
import { fetchContactInfo } from "@/lib/sanity/queries";

// Inside Home():
const [/* existing */, socialPosts, contactInfo] = await Promise.all([
  // ... existing fetches
  fetchSocialPosts(),
  fetchContactInfo(),
]);
// ...render after Gallery, before FaqTeaser:
<SocialWall posts={socialPosts} contactInfo={contactInfo!} />
```

- [ ] **Step 4: Verify in browser**

Run `npm run dev`. Visit `/`. Expected: without social tokens, "Follow Along" fallback strip appears. With tokens, grid of posts.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/SocialWall.tsx src/app/page.tsx next.config.ts
git commit -m "feat: social wall with fallback strip"
```

---

### Task 20: Railway deployment

**External prerequisites:**
- Railway account (user already has CLI installed).
- Sanity project ID + dataset.
- Optional: Facebook / Instagram tokens.

**Files:**
- Create: `railway.json` (optional config)
- Modify: `next.config.ts` (already modified in Task 19)
- Modify: `package.json` (ensure `start` script works for Railway)

- [ ] **Step 1: Verify production build locally**

```bash
npm run build
```

Expected: build succeeds. If errors, resolve before continuing (common: missing env vars during build — set them in `.env.local`).

- [ ] **Step 2: Verify production server locally**

```bash
npm run start
```

Visit `http://localhost:3000`. Expected: full site renders.

- [ ] **Step 3: Login to Railway**

```bash
npx railway login
```

Follow browser prompt.

- [ ] **Step 4: Initialize Railway project**

```bash
npx railway init
```

Choose "Empty Project" and name it `havasu-stampede`.

- [ ] **Step 5: Set env vars**

```bash
npx railway variables --set "NEXT_PUBLIC_SANITY_PROJECT_ID=<id>"
npx railway variables --set "NEXT_PUBLIC_SANITY_DATASET=production"
npx railway variables --set "SANITY_API_READ_TOKEN=<token>"
# Optional social:
npx railway variables --set "FACEBOOK_PAGE_ACCESS_TOKEN=<token>"
npx railway variables --set "FACEBOOK_PAGE_ID=<id>"
npx railway variables --set "INSTAGRAM_ACCESS_TOKEN=<token>"
npx railway variables --set "INSTAGRAM_USER_ID=<id>"
```

- [ ] **Step 6: Deploy**

```bash
npx railway up
```

Railway auto-detects Next.js, runs `npm run build`, serves with `npm run start`. First deploy takes 3–5 minutes.

- [ ] **Step 7: Open deployed URL**

```bash
npx railway open
```

Expected: full site live on Railway's `*.up.railway.app` subdomain.

- [ ] **Step 8: Verify CORS for Sanity**

In Sanity's dashboard → API → CORS Origins, add the Railway deploy URL (`https://<project>.up.railway.app`). Without this, Studio won't load from the deployed URL.

- [ ] **Step 9: Commit**

```bash
git add railway.json 2>/dev/null; true
git commit --allow-empty -m "chore: initial Railway deployment"
```

**Phase 3 complete. Site is live.** From here, custom domain, analytics, and PRCA logo clearance are the main pre-launch items.

---

## Post-plan — Known deferrals

Items in the spec not covered by this plan (deferred by scope):

1. **PRCA logo written clearance** — flag with event committee before public launch.
2. **Custom domain** — add via Railway dashboard or CLI (`npx railway domain`).
3. **Analytics** — decision deferred; Plausible or Vercel Analytics in a later task.
4. **Hero image replacement with high-res asset** — Phase 1 placeholder is low priority to replace.
5. **About page portable-text body** — currently static copy; move to Sanity `page` document (`slug=about`) in a follow-up task.
6. **Venue "Get Directions" link on home** — the `event.venue.directionsUrl` field exists but is only exposed in the footer. Consider adding a small "Get Directions ↗" line under `AtAGlance`'s "Lake Havasu City, Arizona" statement in a follow-up.
