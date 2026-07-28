import { getAllServices } from "@/lib/services";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string; icon: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Početna", href: "/" },
  {
    label: "Usluge",
    href: "/usluge",
    children: getAllServices().map((service) => ({
      label: service.navTitle,
      href: `/usluge/${service.slug}`,
      description: service.tagline,
      icon: service.icon,
    })),
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "O nama", href: "/o-nama" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];
