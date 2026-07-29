import Link from "next/link";

import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { Icon } from "@/components/icons";
import { LogoWordmark } from "@/components/logo";
import { Container } from "@/components/ui";
import { categories } from "@/lib/categories";
import { getCoreServices } from "@/lib/services";
import { site } from "@/lib/site";

export function SiteFooter() {
  // Samo jezgro — pun spisak od 16 usluga bi napravio predugačak futer.
  const services = getCoreServices();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-ink-100 bg-ink-50/40">
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brend */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center">
              <LogoWordmark />
            </Link>

            <p className="mt-5 max-w-xs text-pretty text-[0.9375rem] leading-7 text-ink-500">
              Iza ZIM Digital-a smo <strong className="font-medium text-ink-700">Z</strong>vezdana{" "}
              <strong className="font-medium text-ink-700">i</strong>{" "}
              <strong className="font-medium text-ink-700">M</strong>ilan. Pravimo
              sajtove, radimo SEO i vodimo kampanje — nas dvoje, od početka do
              kraja.
            </p>

            <div className="mt-6 flex gap-2">
              {[
                { href: site.social.facebook, label: "Facebook", d: "M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.25-1.5 1.5-1.5H16.6V4.4A20 20 0 0 0 14.3 4.3c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" },
                { href: site.social.instagram, label: "Instagram", d: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.8-7.8a1.07 1.07 0 1 1-2.15 0 1.07 1.07 0 0 1 2.15 0ZM20.8 8.9c-.07-1.4-.4-2.65-1.42-3.67-1.03-1.03-2.27-1.35-3.68-1.43-1.45-.08-5.8-.08-7.25 0-1.4.07-2.64.4-3.67 1.42C3.75 6.25 3.43 7.5 3.35 8.9c-.08 1.45-.08 5.8 0 7.25.07 1.4.4 2.64 1.43 3.67 1.03 1.02 2.27 1.35 3.67 1.43 1.45.08 5.8.08 7.25 0 1.4-.08 2.65-.4 3.68-1.43 1.02-1.03 1.35-2.27 1.42-3.67.08-1.45.08-5.8 0-7.25Zm-1.9 8.8a3.04 3.04 0 0 1-1.71 1.71c-1.19.47-4 .36-5.3.36-1.32 0-4.13.1-5.31-.36a3.04 3.04 0 0 1-1.71-1.71c-.47-1.18-.36-4-.36-5.3 0-1.32-.1-4.13.36-5.31a3.04 3.04 0 0 1 1.71-1.71c1.18-.47 4-.36 5.3-.36 1.31 0 4.12-.1 5.3.36a3.04 3.04 0 0 1 1.72 1.71c.47 1.18.36 4 .36 5.3 0 1.31.11 4.12-.36 5.3Z" },
                { href: site.social.linkedin, label: "LinkedIn", d: "M6.94 8.5H4.1V20h2.84V8.5ZM5.52 4a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3ZM20 13.6c0-3.03-1.62-4.44-3.78-4.44-1.75 0-2.53.96-2.96 1.63V8.5H10.4V20h2.85v-6.28c0-1.34.25-2.63 1.9-2.63 1.63 0 1.65 1.52 1.65 2.72V20H20v-6.4Z" },
              ]
                // Prazan link znači da profil još ne postoji — ne prikazujemo ga.
                .filter((social) => social.href)
                .map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-500 transition-all hover:-translate-y-0.5 hover:border-ink-300 hover:text-ink-900"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path d={social.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Usluge */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold tracking-tight text-ink-900">
              Usluge
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/usluge/${service.slug}`}
                    className="text-[0.9375rem] text-ink-500 transition-colors hover:text-ink-900"
                  >
                    {service.navTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/usluge"
                  className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-brand-600 transition-colors hover:text-brand-700"
                >
                  Pogledaj sve usluge
                  <Icon name="arrowRight" className="size-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold tracking-tight text-ink-900">
              Blog
            </h3>
            <ul className="mt-4 space-y-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/blog/kategorija/${category.slug}`}
                    className="text-[0.9375rem] text-ink-500 transition-colors hover:text-ink-900"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold tracking-tight text-ink-900">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-3 text-[0.9375rem] text-ink-500">
              <li>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-ink-900"
                >
                  <Icon name="phone" className="size-4 text-brand-500" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-ink-900"
                >
                  <Icon name="mail" className="size-4 text-brand-500" />
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-ink-900"
                >
                  <Icon name="whatsapp" className="size-4 text-brand-500" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-brand-500" />
                <span>
                  {site.contact.address.street}
                  <br />
                  {site.contact.address.postalCode} {site.contact.address.city}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-brand-500" />
                <span>{site.contact.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-200/70 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-400">
            © {year} {site.legalName}. Sva prava zadržana.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-400">
            <Link href="/politika-privatnosti" className="hover:text-ink-700">
              Politika privatnosti
            </Link>
            <Link href="/politika-kolacica" className="hover:text-ink-700">
              Kolačići
            </Link>
            <CookieSettingsButton variant="link" />
            <Link href="/uslovi-koriscenja" className="hover:text-ink-700">
              Uslovi korišćenja
            </Link>
            <Link href="/sitemap.xml" className="hover:text-ink-700">
              Mapa sajta
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
