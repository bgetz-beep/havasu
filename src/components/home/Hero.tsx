import Image from "next/image";
import type { NormalizedEvent, NormalizedHero } from "@/lib/data";

export function Hero({ event, hero }: { event: NormalizedEvent; hero: NormalizedHero }) {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-charcoal">
      <Image
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-85"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-16">
        <h1 className="font-display text-cream text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] whitespace-pre-line">
          {hero.headline}
        </h1>
        <div className="mt-6 inline-block self-start bg-terracotta text-cream px-4 py-2 font-display text-2xl md:text-3xl">
          {event.dateDisplay.toUpperCase()} · PRCA RODEO
        </div>
      </div>
    </section>
  );
}
