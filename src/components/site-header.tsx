"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Icon, type IconName } from "@/components/icons";
import { LogoWordmark } from "@/components/logo";
import { Button } from "@/components/ui";
import { mainNav } from "@/lib/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Senka i jača pozadina tek kada se skroluje
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zatvori sve pri promeni rute — podešavanje stanja tokom rendera,
  // umesto efekta koji bi izazvao dodatni prolaz.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setMobileSubmenu(null);
    setOpenDesktop(null);
  }

  // Escape zatvara meni; zaključaj skrol kada je mobilni meni otvoren
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDesktop(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDesktop(label);
  };

  // Mala odgoda da kursor stigne od dugmeta do panela
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDesktop(null), 120);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink-100/80 bg-white/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-white/60 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:h-18 sm:px-8">
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-70"
          aria-label={`${site.name} — početna`}
        >
          <LogoWordmark />
        </Link>

        {/* Desktop navigacija */}
        <nav className="hidden lg:block" aria-label="Glavna navigacija">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(item.href);

              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
                        active
                          ? "text-ink-900"
                          : "text-ink-500 hover:text-ink-900",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const open = openDesktop === item.label;

              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => openMenu(item.label)}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={item.href}
                    aria-expanded={open}
                    aria-haspopup="true"
                    onFocus={() => openMenu(item.label)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
                      active || open
                        ? "text-ink-900"
                        : "text-ink-500 hover:text-ink-900",
                    )}
                  >
                    {item.label}
                    <Icon
                      name="chevronDown"
                      className={cn(
                        "size-3.5 transition-transform duration-300",
                        open && "rotate-180",
                      )}
                    />
                  </Link>

                  {/* Mega meni */}
                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-50 w-[46rem] -translate-x-1/2 pt-3 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      open
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0",
                    )}
                  >
                    <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white/95 shadow-lift backdrop-blur-xl">
                      <div className="grid grid-cols-2 gap-1 p-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group flex gap-3 rounded-2xl p-3 transition-colors hover:bg-ink-50"
                          >
                            <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50/70 text-brand-600 transition-colors group-hover:border-brand-200 group-hover:bg-brand-100/70">
                              <Icon
                                name={child.icon as IconName}
                                className="size-[1.15rem]"
                              />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[0.9375rem] font-medium text-ink-900">
                                {child.label}
                              </span>
                              <span className="mt-0.5 block text-[0.8125rem] leading-5 text-ink-500">
                                {child.description}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-4 border-t border-ink-100 bg-ink-50/60 px-6 py-4">
                        <p className="text-sm text-ink-500">
                          Nisi siguran šta ti treba? Uradimo besplatnu analizu
                          sajta.
                        </p>
                        <Link
                          href="/kontakt"
                          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
                        >
                          Besplatna analiza
                          <Icon name="arrowRight" className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 rounded-full px-3.5 py-2 text-[0.9375rem] font-medium text-ink-600 transition-colors hover:text-ink-900 xl:inline-flex"
          >
            <Icon name="phone" className="size-4" />
            {site.contact.phone}
          </a>

          <Button href="/kontakt" size="sm" className="hidden sm:inline-flex">
            Besplatna analiza
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={mobileOpen}
            className="inline-flex size-10 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors hover:bg-ink-50 lg:hidden"
          >
            <Icon name={mobileOpen ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </div>

      {/* Mobilni meni */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 origin-top overflow-y-auto border-t border-ink-100 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-18 lg:hidden",
          mobileOpen
            ? "pointer-events-auto max-h-[calc(100dvh-4rem)] opacity-100"
            : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <nav className="px-5 pb-10 pt-4 sm:px-8" aria-label="Mobilna navigacija">
          <ul className="space-y-1">
            {mainNav.map((item) => {
              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-2xl px-4 py-3.5 text-lg font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-ink-50 text-ink-900"
                          : "text-ink-700 hover:bg-ink-50",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const expanded = mobileSubmenu === item.label;

              return (
                <li key={item.href}>
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.href}
                      className="flex-1 rounded-2xl px-4 py-3.5 text-lg font-medium text-ink-700 transition-colors hover:bg-ink-50"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Prikaži podmeni: ${item.label}`}
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileSubmenu(expanded ? null : item.label)
                      }
                      className="inline-flex size-11 items-center justify-center rounded-2xl text-ink-500 transition-colors hover:bg-ink-50"
                    >
                      <Icon
                        name="chevronDown"
                        className={cn(
                          "size-5 transition-transform duration-300",
                          expanded && "rotate-180",
                        )}
                      />
                    </button>
                  </div>

                  <ul
                    className={cn(
                      "grid overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      expanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <li className="min-h-0 overflow-hidden">
                      <ul className="ml-4 space-y-0.5 border-l border-ink-100 py-1 pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem] text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900"
                            >
                              <Icon
                                name={child.icon as IconName}
                                className="size-[1.05rem] text-brand-500"
                              />
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 grid gap-3">
            <Button href="/kontakt" size="lg" arrow>
              Besplatna analiza sajta
            </Button>
            <Button
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              variant="secondary"
              size="lg"
            >
              <Icon name="phone" className="size-4" />
              {site.contact.phone}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
