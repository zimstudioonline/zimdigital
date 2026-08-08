import { getGroupedServices } from "@/lib/services";

export type NavChild = {
  label: string;
  href: string;
  description: string;
  icon: string;
};

export type NavGroup = {
  label: string;
  href: string;
  children: NavChild[];
};

export type NavItem = {
  label: string;
  href: string;
  /** Kolone mega menija — jedna po fazi (Izgradi / Privuci / Rasti) */
  groups?: NavGroup[];
};

/**
 * Meni se izvodi iz services.ts, pa dodavanje usluge automatski dodaje i
 * stavku u meni. Grupisanje prati `group` polje usluge.
 */
const serviceGroups: NavGroup[] = getGroupedServices().map((group) => ({
  label: group.title,
  href: `/usluge#${group.slug}`,
  children: group.services.map((service) => ({
    label: service.navTitle,
    href: `/usluge/${service.slug}`,
    description: service.tagline,
    icon: service.icon,
  })),
}));

export const mainNav: NavItem[] = [
  { label: "Početna", href: "/" },
  { label: "Usluge", href: "/usluge", groups: serviceGroups },
  { label: "Portfolio", href: "/portfolio" },
  { label: "O nama", href: "/o-nama" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];
