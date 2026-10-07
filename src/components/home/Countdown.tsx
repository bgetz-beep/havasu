"use client";
import { useEffect, useState } from "react";
import { getTimeUntil } from "@/lib/countdown";

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function Countdown({ targetIso }: { targetIso: string }) {
  const [time, setTime] = useState(ZERO);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const target = new Date(targetIso);
    setTime(getTimeUntil(target, new Date()));
    setMounted(true);
    const id = setInterval(() => setTime(getTimeUntil(target, new Date())), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const cells: Array<[string, string | number]> = [
    ["Days", time.days],
    ["Hours", pad(time.hours)],
    ["Minutes", pad(time.minutes)],
    ["Seconds", pad(time.seconds)],
  ];

  return (
    <section className="bg-cream border-y-2 border-charcoal py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-sm uppercase tracking-widest mb-6">
          Countdown to opening night
        </p>
        <div className="grid grid-cols-4 gap-4 text-center">
          {cells.map(([label, value]) => (
            <div key={label}>
              <div className="font-display text-6xl md:text-8xl lg:text-9xl text-terracotta leading-none tabular-nums">
                {mounted ? value : "--"}
              </div>
              <div className="font-body text-xs uppercase tracking-widest mt-2">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
