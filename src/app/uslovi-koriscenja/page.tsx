import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Uslovi korišćenja",
  description:
    "Uslovi korišćenja sajta ZIM Digital — pravila korišćenja sadržaja, autorska prava i ograničenje odgovornosti.",
  alternates: { canonical: "/uslovi-koriscenja" },
};

// TODO(Milan): dopuniti podacima o firmi i uskladiti sa stvarnim ugovorima.
export default function TermsPage() {
  return (
    <LegalPage
      title="Uslovi korišćenja"
      updated="28. jul 2026."
      breadcrumbs={[
        { name: "Početna", href: "/" },
        { name: "Uslovi korišćenja", href: "/uslovi-koriscenja" },
      ]}
    >
      <p>
        Korišćenjem sajta {site.url.replace("https://", "")} prihvataš uslove
        navedene u nastavku. Ako se sa njima ne slažeš, molimo te da ne koristiš
        sajt.
      </p>

      <h2>Sadržaj sajta</h2>
      <p>
        Tekstovi, slike, grafike i kod na ovom sajtu su vlasništvo{" "}
        <strong>{site.legalName}</strong> i zaštićeni su autorskim pravom.
        Dozvoljeno je citiranje uz jasno navođenje izvora i link ka originalnom
        tekstu. Preuzimanje celih tekstova bez pisane saglasnosti nije dozvoljeno.
      </p>

      <h2>Tačnost informacija</h2>
      <p>
        Sadržaj bloga ima informativni karakter i odražava stanje u trenutku
        pisanja. Digitalni marketing se brzo menja — preporuke koje su važile pre
        godinu dana danas ne moraju biti tačne. Sadržaj ne predstavlja garanciju
        rezultata niti zamenu za savet prilagođen konkretnom slučaju.
      </p>

      <h2>Usluge i ponude</h2>
      <p>
        Opisi usluga na sajtu su informativni i ne predstavljaju obavezujuću
        ponudu. Obim posla, rokovi i cena definišu se pisanom ponudom i ugovorom
        za svaki projekat posebno.
      </p>

      <h2>Linkovi ka drugim sajtovima</h2>
      <p>
        Sajt može sadržati linkove ka sajtovima trećih lica. Ne odgovaramo za
        njihov sadržaj, tačnost niti za njihove politike privatnosti.
      </p>

      <h2>Ograničenje odgovornosti</h2>
      <p>
        Ne odgovaramo za eventualnu štetu nastalu korišćenjem informacija sa ovog
        sajta, niti za privremenu nedostupnost sajta usled tehničkih razloga ili
        održavanja.
      </p>

      <h2>Izmene uslova</h2>
      <p>
        Zadržavamo pravo izmene ovih uslova. Izmene stupaju na snagu objavljivanjem
        na ovoj stranici.
      </p>

      <h2>Kontakt</h2>
      <p>
        Za sva pitanja u vezi sa uslovima korišćenja piši na{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalPage>
  );
}
