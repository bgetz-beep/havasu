"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
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
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-8 md:gap-10 items-center pb-12 border-b-2 border-charcoal">
          <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0 justify-self-center md:justify-self-start">
            <Image
              src="/images/logo.avif"
              alt="Lake Havasu Stampede logo"
              fill
              sizes="(max-width: 768px) 160px, 192px"
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              LAKE HAVASU<br />STAMPEDE
            </h2>
            <p className="font-display text-2xl md:text-3xl mt-4 text-terracotta">
              MARCH 19, 20 AND 21 2027
            </p>
          </div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 justify-self-center md:justify-self-end">
            <Image
              src="/images/sponsors/prca.avif"
              alt="PRCA Professional Rodeo Cowboys Association logo"
              fill
              sizes="(max-width: 768px) 128px, 160px"
              className="object-contain"
            />
          </div>
        </div>
        <p className="font-body text-sm uppercase tracking-widest mt-10 mb-6">
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
