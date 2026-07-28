import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description:
    "Kako ZIM Digital prikuplja, koristi i štiti podatke o ličnosti posetilaca sajta i klijenata.",
  alternates: { canonical: "/politika-privatnosti" },
  robots: { index: true, follow: true },
};

// TODO(Milan): pre objave neka tekst pregleda pravnik i dopuni podacima o firmi
// (pun naziv, matični broj, PIB, adresa sedišta).
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politika privatnosti"
      updated="28. jul 2026."
      breadcrumbs={[
        { name: "Početna", href: "/" },
        { name: "Politika privatnosti", href: "/politika-privatnosti" },
      ]}
    >
      <p>
        Ova politika objašnjava koje podatke o ličnosti prikupljamo preko sajta{" "}
        {site.url.replace("https://", "")}, u koje svrhe ih koristimo i koja su
        tvoja prava. Podatke obrađujemo u skladu sa Zakonom o zaštiti podataka o
        ličnosti Republike Srbije i Opštom uredbom o zaštiti podataka (GDPR).
      </p>

      <h2>Ko je rukovalac podacima</h2>
      <p>
        Rukovalac je <strong>{site.legalName}</strong>,{" "}
        {site.contact.address.street}, {site.contact.address.postalCode}{" "}
        {site.contact.address.city}, {site.contact.address.country}. Za sva
        pitanja u vezi sa podacima piši na{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>

      <h2>Koje podatke prikupljamo</h2>
      <ul>
        <li>
          <strong>Podaci iz kontakt forme:</strong> ime i prezime, email adresa,
          broj telefona (opciono), adresa sajta (opciono) i sadržaj poruke.
        </li>
        <li>
          <strong>Tehnički podaci:</strong> anonimizovani podaci o poseti
          (stranica, uređaj, izvor posete) koje prikupljaju alati za analitiku.
        </li>
        <li>
          <strong>Podaci o zaštiti od zloupotreba:</strong> Cloudflare Turnstile
          obrađuje ograničene tehničke podatke radi razlikovanja ljudi od botova.
        </li>
      </ul>

      <h2>Svrha i pravni osnov obrade</h2>
      <p>
        Podatke iz kontakt forme koristimo isključivo da bismo odgovorili na tvoj
        upit i pripremili ponudu — pravni osnov je preduzimanje radnji na tvoj
        zahtev pre zaključenja ugovora. Tehničke podatke obrađujemo na osnovu
        legitimnog interesa da sajt radi ispravno i da razumemo kako se koristi.
      </p>

      <h2>Koliko dugo čuvamo podatke</h2>
      <p>
        Upite čuvamo do dve godine od poslednje komunikacije, osim ako iz
        saradnje ne proistekne zakonska obaveza dužeg čuvanja (npr. računovodstvena
        dokumentacija).
      </p>

      <h2>Kome se podaci prosleđuju</h2>
      <p>
        Podatke ne prodajemo i ne ustupamo trećim licima u marketinške svrhe.
        Koristimo obrađivače koji nam pružaju tehničke usluge: Cloudflare
        (hosting i zaštita), Resend (isporuka email poruka) i alate za analitiku.
        Svaki od njih obrađuje podatke po našem nalogu i u skladu sa ugovorom o
        obradi.
      </p>

      <h2>Kolačići</h2>
      <p>
        Sajt koristi neophodne kolačiće za osnovno funkcionisanje. Ako se uključe
        analitički ili marketinški kolačići, o tome ćeš biti obavešten i tražiće
        se tvoja saglasnost pre postavljanja.
      </p>

      <h2>Tvoja prava</h2>
      <ul>
        <li>pravo na pristup podacima koje o tebi imamo</li>
        <li>pravo na ispravku netačnih podataka</li>
        <li>pravo na brisanje („pravo na zaborav“)</li>
        <li>pravo na ograničenje obrade i prigovor na obradu</li>
        <li>pravo na prenosivost podataka</li>
        <li>
          pravo na pritužbu Povereniku za informacije od javnog značaja i zaštitu
          podataka o ličnosti
        </li>
      </ul>
      <p>
        Zahtev pošalji na{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> —
        odgovaramo najkasnije u roku od 30 dana.
      </p>

      <h2>Bezbednost</h2>
      <p>
        Sajt koristi HTTPS enkripciju, a pristup podacima imaju samo osobe kojima
        je to neophodno za rad. Uprkos merama zaštite, nijedan prenos podataka
        preko interneta nije apsolutno bezbedan.
      </p>

      <h2>Izmene politike</h2>
      <p>
        Politiku možemo povremeno ažurirati. Datum poslednje izmene naveden je na
        vrhu stranice.
      </p>
    </LegalPage>
  );
}
