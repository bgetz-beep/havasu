import Image from "next/image";
import { mockEvent } from "@/lib/mock/event";

export function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-charcoal">
      <Image
        src="/images/hero.avif"
        alt="A rider at the Lake Havasu Stampede rodeo, photo by Ian McGivney"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-85"
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
