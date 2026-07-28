import type { Metadata } from "next";

import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politika kolačića",
  description:
    "Koje kolačiće koristi sajt ZIM Digital, čemu služe i kako da promeniš svoj izbor u svakom trenutku.",
  alternates: { canonical: "/politika-kolacica" },
};

// TODO(Milan): kada dodamo Google Analytics ili Meta Pixel, dopuni tabelu
// konkretnim imenima kolačića i rokovima čuvanja.
export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Politika kolačića"
      updated="28. jul 2026."
      breadcrumbs={[
        { name: "Početna", href: "/" },
        { name: "Politika kolačića", href: "/politika-kolacica" },
      ]}
    >
      <p>
        Kolačići su male tekstualne datoteke koje sajt smešta na tvoj uređaj.
        Služe da sajt zapamti tvoja podešavanja i, ako se složiš, da nam pokažu
        kako se sajt koristi. Ova stranica objašnjava koje kolačiće koristimo i
        kako da svoj izbor promeniš.
      </p>

      <h2>Tvoj izbor</h2>
      <p>
        Analitičke i marketinške kolačiće postavljamo <strong>samo uz tvoju
        saglasnost</strong>. Dok je ne daš, ne učitavaju se. Odluku možeš
        promeniti u svakom trenutku:
      </p>
      <p>
        <CookieSettingsButton />
      </p>

      <h2>Kategorije koje koristimo</h2>

      <h3>Neophodni</h3>
      <p>
        Bez njih sajt ne funkcioniše, pa se ne mogu isključiti. Tu spadaju
        pamćenje tvog izbora kolačića i zaštita kontakt forme od automatizovanih
        zloupotreba (Cloudflare Turnstile). Ne koriste se za praćenje.
      </p>

      <h3>Analitički</h3>
      <p>
        Pokazuju nam koje stranice se čitaju, odakle posetioci dolaze i gde
        odustaju — da bismo sajt popravili. Podaci se posmatraju zbirno i ne
        koriste se da bismo te lično prepoznali.
      </p>

      <h3>Marketinški</h3>
      <p>
        Omogućavaju merenje uspešnosti oglasa i prikazivanje relevantnijih
        reklama na drugim sajtovima. Postavljaju ih Google i Meta kao pružaoci
        oglasnih usluga.
      </p>

      <h2>Kolačići trećih strana</h2>
      <p>
        Pojedini kolačići dolaze od servisa koje koristimo: Cloudflare (zaštita
        i isporuka sajta), Google (analitika i oglašavanje) i Meta (oglašavanje).
        Na njihovu obradu primenjuju se i njihove politike privatnosti.
      </p>
      <p>
        Kontakt stranica prikazuje Google mapu, koja se učitava sa Google-ovih
        servera i može postaviti sopstvene kolačiće.
      </p>

      <h2>Kako da ih obrišeš iz pregledača</h2>
      <p>
        Pored dugmeta iznad, kolačiće možeš obrisati i kroz podešavanja svog
        pregledača — u Chrome-u, Firefox-u, Safari-ju i Edge-u to se nalazi u
        odeljku za privatnost. Imaj u vidu da brisanje neophodnih kolačića znači
        da ćemo te ponovo pitati za saglasnost.
      </p>

      <h2>Izmene</h2>
      <p>
        Ovu politiku ažuriramo kada uvedemo nove alate. Datum poslednje izmene
        je na vrhu stranice. Za pitanja piši na{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalPage>
  );
}
