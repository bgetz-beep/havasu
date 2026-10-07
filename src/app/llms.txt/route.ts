import { getSiteData } from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site";

export async function GET() {
  const data = await getSiteData();
  const upcoming = data.schedule
    .slice(0, 3)
    .map(
      (d) =>
        `- ${d.dayLabel} (${d.date}): ${d.items
          .map((i) => `${i.time} ${i.title}`)
          .join("; ")}`
    )
    .join("\n");

  const sponsors = data.sponsors
    .map((s) => `${s.name} (${s.tier})`)
    .join(", ");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

## Event essentials

- Dates: ${data.event.dateDisplay}
- Venue: ${data.event.venue.name}, ${data.event.venue.address}
- Sanctioning: ${data.event.prcaSanctioned ? "PRCA-sanctioned professional rodeo" : "Professional rodeo"}
- Tickets: ${data.links.ticketsUrl} (advance tickets are $5 less than at the gate)
- Directions: ${data.event.venue.directionsUrl}
- Contact: ${data.contact.email}

## Schedule

${upcoming}

## Primary pages

- [Full Schedule](${absoluteUrl("/schedule")}): All three days of the rodeo with event times
- [Vendor Information](${absoluteUrl("/vendor")}): Food and craft vendor applications
- [RV Information](${absoluteUrl("/rv")}): Dry camping passes for all three nights
- [Sponsors](${absoluteUrl("/sponsors")}): Partners by tier
- [FAQ](${absoluteUrl("/faq")}): Gates, parking, kids, policies
- [Contact](${absoluteUrl("/contact")}): Email, venue address, social links
- [About](${absoluteUrl("/about")}): Event background

## Partners

${sponsors || "See the sponsors page for current partner list."}

## Policies

- Gates open 6:00 PM Friday, 11:00 AM Saturday and Sunday
- Outside food and sealed water bottles are welcome; no glass containers
- General parking is free; preferred parking available on request
- Mutton busting signup is open to kids ages 4-7 at the Saturday event
- Event runs rain or shine; refunds only issued if committee cancels

## Social

- Facebook: ${data.contact.facebookUrl}
- Instagram: ${data.contact.instagramUrl}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
