import type { NormalizedEvent } from "@/lib/data";

export function AtAGlance({ event }: { event: NormalizedEvent }) {
  const statements = [
    event.prcaSanctioned ? "PRCA Sanctioned Rodeo" : "Professional Rodeo",
    event.dateDisplay,
    event.venue.name && event.venue.address
      ? `${event.venue.name.split(",")[0]}`
      : "Lake Havasu City, Arizona",
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
