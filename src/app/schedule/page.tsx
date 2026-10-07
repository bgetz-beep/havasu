import { PageHero } from "@/components/layout/PageHero";
import { getSiteData } from "@/lib/data";

export default async function SchedulePage() {
  const { schedule } = await getSiteData();
  return (
    <>
      <PageHero eyebrow="Three Days" title="Full Schedule" />
      <section className="bg-cream py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {schedule.map((day) => (
            <div key={day.dayLabel} className="border-t-2 border-charcoal pt-6">
              <p className="font-body text-sm uppercase tracking-widest">
                {day.date}
              </p>
              <h2 className="font-display text-5xl mt-2">
                {day.dayLabel.toUpperCase()}
              </h2>
              <ul className="mt-8 divide-y divide-charcoal/30">
                {day.items.map((item) => (
                  <li
                    key={item.time}
                    className="flex justify-between gap-4 py-4"
                  >
                    <span className="font-body text-base whitespace-nowrap">
                      {item.time}
                    </span>
                    <span className="font-display text-xl text-right">
                      {item.title.toUpperCase()}
                    </span>
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
