"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

/** Povratak na vrh — pojavljuje se tek kada ima šta da se skroluje. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Nazad na vrh strane"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      className={cn(
        "fixed bottom-20 right-5 z-40 inline-flex size-11 items-center justify-center rounded-full border border-ink-200 bg-white/90 text-ink-700 shadow-lift backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:text-ink-900 sm:bottom-24 sm:right-7",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <Icon name="arrowRight" className="size-5 -rotate-90" />
    </button>
  );
}
