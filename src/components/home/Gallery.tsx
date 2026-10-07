"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { NormalizedGalleryImage } from "@/lib/data";

export function Gallery({ images }: { images: NormalizedGalleryImage[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const close = () => setActiveIdx(null);
  const active = activeIdx !== null ? images[activeIdx] : null;

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  if (images.length === 0) return null;

  return (
    <section className="bg-charcoal border-b-2 border-charcoal py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-sm uppercase tracking-widest text-ochre">
          Gallery
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-cream mt-4 mb-12">
          FROM THE ARENA
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {images.slice(0, 6).map((img, idx) => {
            const colSpan =
              img.orientation === "landscape"
                ? "md:col-span-3"
                : "md:col-span-2";
            const rowSpan =
              img.orientation === "portrait"
                ? "md:row-span-2 aspect-[2/3]"
                : "aspect-[3/2]";
            return (
              <button
                key={img.src}
                onClick={() => setActiveIdx(idx)}
                className={`relative ${colSpan} ${rowSpan} overflow-hidden cursor-zoom-in`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform"
                />
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
            <Image
              src={active.src}
              alt={active.alt}
              fill
              className="object-contain"
            />
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
