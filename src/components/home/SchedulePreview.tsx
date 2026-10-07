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
            className={`${DAY_BG[i]} text-cream p-10 min-h-[380px] ${
              i < 2
                ? "border-b-2 lg:border-b-0 lg:border-r-2 border-charcoal"
                : ""
            }`}
          >
            <p className="font-body text-sm uppercase tracking-widest">
              {day.date}
            </p>
            <h3 className="font-display text-6xl mt-2">
              {day.dayLabel.toUpperCase()}
            </h3>
            <ul className="mt-8 space-y-3">
              {day.items.map((item) => (
                <li
                  key={item.time}
                  className="flex justify-between gap-4 border-b border-cream/40 pb-2"
                >
                  <span className="font-body text-sm whitespace-nowrap">
                    {item.time}
                  </span>
                  <span className="font-display text-lg text-right">
                    {item.title.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-cream border-t-2 border-charcoal px-6 py-6 text-center">
        <Link
          href="/schedule"
          className="font-display text-xl underline underline-offset-4"
        >
          SEE FULL SCHEDULE →
        </Link>
      </div>
    </section>
  );
}
