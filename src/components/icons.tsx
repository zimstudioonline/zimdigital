import type { SVGProps } from "react";

/**
 * Ručno pisan set ikonica (stil Lucide) — bez dodatne zavisnosti
 * i bez ijednog kilobajta koji se ne koristi.
 */

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

type Props = SVGProps<SVGSVGElement>;

export const icons = {
  search: (p: Props) => (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  ),
  pin: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  image: (p: Props) => (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="m4 17 4.5-4.5a2 2 0 0 1 2.8 0L16 17M14 14.5l1.6-1.6a2 2 0 0 1 2.8 0L20 14.5" />
    </svg>
  ),
  store: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M4 9.5V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.5" />
      <path d="M3 6.5 4.6 4h14.8L21 6.5a3 3 0 0 1-5.6 1.7 3 3 0 0 1-5.4 0A3 3 0 0 1 3 6.5Z" />
      <path d="M9.5 20v-5h5v5" />
    </svg>
  ),
  list: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M9 6.5h11M9 12h11M9 17.5h11" />
      <circle cx="4.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="17.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  video: (p: Props) => (
    <svg {...base} {...p}>
      <rect x="2.5" y="5.5" width="13" height="13" rx="3" />
      <path d="m15.5 10.5 5-2.8v8.6l-5-2.8z" />
    </svg>
  ),
  layout: (p: Props) => (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18M9 20V9" />
    </svg>
  ),
  cart: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M3 4h2.2l2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.55L20.6 8H6.2" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="17.5" cy="20" r="1.3" />
    </svg>
  ),
  target: (p: Props) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.8" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  ),
  megaphone: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M4 10v4a2 2 0 0 0 2 2h1.5L18 20.5V3.5L7.5 8H6a2 2 0 0 0-2 2Z" />
      <path d="M18 9.2a3 3 0 0 1 0 5.6M8 16v4" />
    </svg>
  ),
  mail: (p: Props) => (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3.8 7.5 7.1 4.7a2 2 0 0 0 2.2 0l7.1-4.7" />
    </svg>
  ),
  sparkles: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M12 3.5 13.7 8.3 18.5 10 13.7 11.7 12 16.5 10.3 11.7 5.5 10l4.8-1.7Z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" />
    </svg>
  ),
  shield: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M12 3l7 3v5.5c0 4.6-3 8-7 9.5-4-1.5-7-4.9-7-9.5V6Z" />
      <path d="m9.2 12 2 2 3.6-3.8" />
    </svg>
  ),
  arrowRight: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  ),
  arrowUpRight: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  ),
  check: (p: Props) => (
    <svg {...base} {...p}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  ),
  chevronDown: (p: Props) => (
    <svg {...base} {...p}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  ),
  menu: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  phone: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  ),
  whatsapp: (p: Props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.55 3.75 1.5 5.29L2 22.5l5.5-1.65a9.8 9.8 0 0 0 4.54 1.13h.01c5.44 0 9.85-4.4 9.85-9.84C21.9 6.4 17.48 2 12.04 2Zm0 17.94h-.01c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.13.94.94-3.05-.2-.31a8.06 8.06 0 0 1-1.25-4.34c0-4.5 3.68-8.16 8.2-8.16 2.19 0 4.24.85 5.79 2.4a8.09 8.09 0 0 1 2.4 5.77c0 4.5-3.68 8.09-8.2 8.09Zm4.5-6.06c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.12-.55.13-.17.24-.64.79-.78.95-.15.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.1-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.84.83-.84 2.01s.86 2.33.98 2.49c.12.16 1.7 2.6 4.12 3.64.58.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.15-1.18-.06-.1-.22-.17-.47-.29Z" />
    </svg>
  ),
  clock: (p: Props) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  ),
  chart: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M4 20h16M7.5 20v-6M12 20V8M16.5 20v-9" />
    </svg>
  ),
  compass: (p: Props) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15 9-1.8 4.2L9 15l1.8-4.2Z" />
    </svg>
  ),
  code: (p: Props) => (
    <svg {...base} {...p}>
      <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13" />
    </svg>
  ),
  pen: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M4 20h4L19.2 8.8a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="m14.8 6.2 3 3" />
    </svg>
  ),
  rocket: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M14.5 4.5c3 1 5 4 4.5 8l-3 3-5.5-5.5 3-3a7.6 7.6 0 0 1 1-2.5Z" />
      <path d="m10.5 10-3 .8-2 2 2.6 1M14 13.5l-.8 3-2 2-1-2.6" />
      <path d="M6.5 17.5 4 20" />
    </svg>
  ),
  users: (p: Props) => (
    <svg {...base} {...p}>
      <circle cx="9.5" cy="8.5" r="3.2" />
      <path d="M3.5 19.5a6 6 0 0 1 12 0M16.5 6.2a3.2 3.2 0 0 1 0 5.9M18 19.5a5.6 5.6 0 0 0-2.2-4.4" />
    </svg>
  ),
  bolt: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M13.5 3 5.5 13.5H11L10.5 21l8-10.5H13Z" />
    </svg>
  ),
  quote: (p: Props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M9.3 6.5C6.4 8 5 10.4 5 13.7c0 2.4 1.4 4 3.4 4 1.8 0 3.1-1.3 3.1-3s-1.2-2.9-2.8-2.9c-.3 0-.6 0-.8.1.3-1.4 1.4-2.7 3-3.6l-.6-1.8Zm8.4 0c-2.9 1.5-4.3 3.9-4.3 7.2 0 2.4 1.4 4 3.4 4 1.8 0 3.1-1.3 3.1-3s-1.2-2.9-2.8-2.9c-.3 0-.6 0-.8.1.3-1.4 1.4-2.7 3-3.6l-.6-1.8Z" />
    </svg>
  ),
} as const;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  const Component = icons[name];
  return <Component {...props} />;
}
