"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-display text-sm uppercase tracking-wider underline underline-offset-4"
      >
        Menu
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-cream flex flex-col">
          <div className="flex justify-between items-center p-4 border-b-2 border-charcoal">
            <span className="font-display text-xl">HAVASU STAMPEDE</span>
            <button
              onClick={() => setOpen(false)}
              className="font-display text-sm uppercase tracking-wider underline underline-offset-4"
            >
              Close
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="font-display text-4xl"
              >
                {item.label}{item.external ? " ↗" : ""}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
