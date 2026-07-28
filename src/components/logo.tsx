import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Znak brenda — geometrijsko „z“ u zaobljenom kvadratu.
 * Koristi se kao favicon i svuda gde nema mesta za ceo logotip.
 */
export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(className)}
      aria-hidden
      {...props}
    >
      <rect width="100" height="100" rx="26" fill="currentColor" />
      {/* Tačka iznad, kao nad „i“ u logotipu */}
      <circle cx="50" cy="24" r="7" fill="white" />
      <path
        d="M26 36h48v14L47 68h27v14H26V68l27-18H26z"
        fill="white"
      />
    </svg>
  );
}

/**
 * Pun logotip: „zim“ + „digital.rs“ ispod, sa razmaknutim slovima.
 *
 * TODO(Milan): kada pošalješ originalni logo kao .svg, zamenjujemo ovu
 * rekonstrukciju pravim fajlom — biće identično originalu na svakoj veličini.
 */
export function LogoWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex flex-col leading-none", className)}
      aria-hidden
    >
      <span className="relative text-[1.375rem] font-extrabold tracking-[-0.055em] text-ink-900">
        zim
      </span>
      <span className="mt-[0.3rem] text-[0.5rem] font-medium tracking-[0.38em] text-ink-400">
        digital.rs
      </span>
    </span>
  );
}

/** Zadržano zbog starih uvoza — prikazuje znak brenda. */
export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return <LogoMark className={cn("text-ink-900", className)} {...props} />;
}
