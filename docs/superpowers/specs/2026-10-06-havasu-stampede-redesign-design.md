# Havasu Stampede — Redesign Design Spec

**Date:** 2026-10-06
**Project:** Rebuild havasustampede.com as an official replacement site
**Event:** PRCA Rodeo, March 19–21, 2027, Lake Havasu City, Arizona
**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 · shadcn/ui primitives · Sanity CMS · Deployed on Railway

---

## Goals

1. Replace the current site with a design that feels like a destination event — energy of a live sports hub, soul of Lake Havasu hospitality.
2. Keep all 10 content areas the current site exposes (full parity), but reorganize so the home page carries the pitch and detail pages carry the specifics.
3. Let event organizers edit all time-sensitive content (dates, schedule, sponsors, FAQ) in Sanity without a developer.
4. Fix the audit's documented problems: repeated "Buy online and save!", stale 2026 link, missing venue address, no phone, no alt text, Facebook-only social.

## Non-goals (v1)

- On-site ticketing checkout (link out to rodeoticket.com — they handle PRCA/PCI)
- On-site forms for vendor / RV / mutton busting (external links)
- Live scoreboard / day-of results feed
- Newsletter signup
- Interactive embedded map (venue address + "Get Directions" text link is enough)

## Audience + content fidelity

Primary audience: regional attendees deciding to buy tickets, vendors/RV guests who need to register, sponsors evaluating the event. Content fidelity target: production-ready. Assets scraped from the current site are the source of truth until the organizer provides replacements; low-quality assets will be flagged in the spec and in Sanity.

## Visual language

### References
Rodeo program posters, Monocle magazine sports features, newspaper front pages, boxing fight bills, National Geographic photo essays. Explicitly **not** modern SaaS landing pages.

### Typography
- **Display:** condensed slab or wood-type-inspired face. Primary candidate: *Big Shoulders Display* (OFL licensed). Alternate: *Fraunces* in bold extended for a more editorial feel. Final pick after visual sampling in the build.
- **Body:** utilitarian grotesk. Primary: *Space Grotesk*, tuned down with tight tracking. Alternate: *Inter Tight*.
- **Numerals** get display-type treatment at hero scale — countdown, dates, times.

### Color (flat blocks, no gradients)
- `#D4421A` sunset terracotta (primary)
- `#0F6E6E` deep lake turquoise (secondary)
- `#F2EBD9` bone / cream (base background)
- `#1A1A1A` charcoal (type, hard rules)
- `#C98B2A` dust ochre (accent, sparingly)

### Rules
- Large flat color fields, hard 1–2px rules between sections.
- No rounded cards unless necessary for an actionable element.
- No gradients of any kind (background, border, text, mesh).
- No icon packs (Lucide, Heroicons, Phosphor). Type, numerals, and photography carry meaning.
- Optional subtle paper grain overlay on cream sections; optional 20% halftone treatment on hero photos.
- No glassmorphism, no soft shadows, no "AI SaaS" tells.

## Information architecture

### Routes
```
/                   Home (long editorial scroll)
/schedule           Full three-day event schedule with filters by day/arena
/sponsors           Full sponsor roster grouped by tier
/vendor             Vendor info + external application link
/rv                 RV info + external reservation link
/about              Event history, committee, PRCA affiliation
/faq                Full FAQ (accordion by category)
/contact            Email, phone, mailing address, social links
/studio             Embedded Sanity Studio for organizers
```

### Top nav (desktop)
`Schedule · Tickets ↗ · Sponsors · Vendor · RV · About · FAQ · Contact`
- Logo lockup top-left (links home — no explicit "Home" nav item).
- `Mar 19–21, 2027` date tag anchored top-right as a running reminder.
- "Tickets" link opens rodeoticket.com in a new tab; small `↗` glyph signals external.

### Mobile nav
Full-screen overlay menu, triggered by the word `Menu` top-right (no hamburger icon). Date tag stays visible in the header bar.

### Dropped from current site
- "Events" nav item → merged into `/schedule`.
- "More" overflow menu → removed; everything surfaces in main nav.
- "Home" nav link → removed (logo serves that role).

### Footer
Three columns:
1. Event name + dates + venue address
2. Nav mirror
3. Contact: email, phone, Facebook (text link), Instagram (text link)

## Home page scroll

1. **Hero** — full-bleed grainy action photo. Overlay: event name in huge display type; dates in a terracotta color block beneath.
2. **Countdown** — four giant numerals (`DAYS · HOURS · MIN · SEC`) in terracotta on cream, small-caps labels. Client-side ticker.
3. **At a Glance** — three stacked typographic statements: "PRCA Sanctioned Rodeo" / "March 19–21, 2027" / "Lake Havasu City, Arizona". No cards.
4. **Schedule preview** — three day blocks (Fri/Sat/Sun), each a solid color panel. Shows top events per day. "See full schedule →" text link.
5. **Tickets block** — charcoal panel. Headline + fine print on left; a terracotta rectangle labeled "Buy Online — Save $5" on the right, linking to rodeoticket.com.
6. **Sponsors wall** — real sponsor logos grouped by tier on cream. No cards.
7. **Gallery** — editorial photo grid with varying sizes (not a uniform grid). Lightbox on click.
8. **Social wall** — latest 6 posts from Facebook + Instagram in a newsprint grid. Each post links to its source. Fallback to a static "Follow us: Facebook · Instagram" strip if API tokens expire or rate-limit.
9. **FAQ teaser** — 5 accordion items. "See all FAQs →" text link to `/faq`.
10. **Footer**

## Sanity content model

### Singletons
- `homepage` — hero image, hero headline override, section feature flags.
- `event` — year, start/end dates, venue name, venue address, directions URL, PRCA sanction info.
- `externalLinks` — tickets URL, vendor application URL, RV reservation URL, mutton busting URL.
- `contactInfo` — email, phone, mailing address, Facebook URL, Instagram URL.

### Collections
- `scheduleDay` — date, label (Friday/Saturday/Sunday), items[] (time, title, arena, description).
- `sponsor` — name, logo (image), tier (ref), website URL.
- `sponsorTier` — name (Title/Gold/Silver/Bronze/etc.), order.
- `faq` — question, answer (portable text), category.
- `galleryImage` — image, caption, year, orientation.
- `page` — slug, title, body (portable text) — used for `/about`, `/vendor`, `/rv` long-form content.

### Studio
Hosted at `/studio` as a Next.js route (embedded Sanity Studio). No separate deployment needed.

## Deployment

### Railway
- Service runs Next.js (`npm run build` → `npm run start`).
- Env vars:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_READ_TOKEN`
  - `SANITY_API_WRITE_TOKEN` (studio only)
  - `FACEBOOK_PAGE_ACCESS_TOKEN`
  - `INSTAGRAM_ACCESS_TOKEN`
- `nixpacks.toml` or Railway auto-detect — likely auto-detect works out of the box.

### Images
Sanity CDN via `next/image` with the official `@sanity/image-url` loader.

### Social feed
ISR revalidation every 15 minutes. Server-side fetch to Facebook Graph + Instagram Basic Display APIs. On error or empty response, fall back to the static "Follow us" strip.

### Observability
Deferred to post-v1. Likely Plausible or Vercel Analytics — organizer preference.

## Known risks

1. **PRCA logo use** — need written clearance from PRCA before launch. Flag as a blocker in the implementation plan.
2. **Instagram Basic Display API** has been deprecating features — if it's unavailable at build time, we start with Facebook-only wall and link-out Instagram.
3. **Sanity free tier** limits (3 users, 10k docs) — fine for one event, but note it in the handoff.
4. **Current-site asset quality** — scraped images may be low-res. We'll build with them and flag replacements needed.

## Open questions for later (not blocking)

- Does the committee have a trademark/brand guide, or is this redesign the first chance to define it?
- Should the Studio allow multiple editors (adds to Sanity cost at scale) or stay at the free-tier user cap?
- Analytics provider preference?
- Any sponsor contracts that specify logo placement/size requirements?
