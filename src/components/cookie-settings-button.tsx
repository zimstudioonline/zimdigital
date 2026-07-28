"use client";

import { buttonClass } from "@/components/ui";
import { openCookieSettings } from "@/lib/consent";

/** Ponovo otvara banner sa podešavanjima kolačića. */
export function CookieSettingsButton({ variant }: { variant?: "link" }) {
  if (variant === "link") {
    return (
      <button
        type="button"
        onClick={openCookieSettings}
        className="text-sm text-ink-400 transition-colors hover:text-ink-700"
      >
        Podešavanja kolačića
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={buttonClass("secondary", "md")}
    >
      Promeni podešavanja kolačića
    </button>
  );
}
