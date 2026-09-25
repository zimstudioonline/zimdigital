import type { Metadata } from "next";

import { CtaSection } from "@/components/cta-section";
import { Icon, type IconName } from "@/components/icons";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { TeamCards } from "@/components/team";
import { Container, Section, SectionHeading } from "@/components/ui";
import { site, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "ZIM su Zvezdana i Milan. Deset godina rada u digitalu i preko 100 izrađenih sajtova — od blogova i prezentacija do prodavnica digitalnih proizvoda.",
  alternates: { canonical: "/o-nama" },
};

const principles: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "users",
    title: "Radiš sa nama, ne sa posrednikom",
    body: "Nema account managera koji prenosi poruke. Isti ljudi koji ti se jave na telefon rade i na tvom sajtu. To znači i da odgovaramo za svaku grešku lično.",
  },
  {
    icon: "chart",
    title: "Ako se ne isplati, reći ćemo ti",
    body: "Dešava se da klijentu u tom trenutku ne treba ni sajt ni kampanja. Radije ćemo izgubiti posao nego uzeti novac za nešto što neće vratiti uloženo.",
  },
  {
    icon: "shield",
    title: "Sve glasi na tvoje ime",
    body: "Domen, hosting, Google i Meta nalozi — sve na tebe. Ako jednog dana odeš kod nekog drugog, ne nosiš ništa sa sobom jer je već tvoje.",
  },
  {
    icon: "bolt",
    title: "Mali smo i to je prednost",
    body: "Ne primamo više projekata nego što možemo da ispratimo. Zato se javljamo istog dana i zato sajt ne stoji mesecima u fazi „u izradi“.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="O nama"
        title={
          <>
            <span className="text-gradient">Z</span>vezdana{" "}
            <span className="text-gradient">i</span>{" "}
            <span className="text-gradient">M</span>ilan
          </>
        }
        description="Odatle ime. Nismo agencija sa spratom kancelarija — dvoje smo ljudi koji zajedno rade ono što agencije naplaćuju kroz tri odeljenja."
        breadcrumbs={[
          { name: "Početna", href: "/" },
          { name: "O nama", href: "/o-nama" },
        ]}
      />

      {/* Priča */}
      <Section className="py-16 sm:py-20">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-6 text-pretty text-lg leading-9 text-ink-600">
              <p>
                Milan se digitalom bavi deset godina. Kroz te ruke prošlo je
                preko sto sajtova — blogovi, prezentacije za male preduzetnike,
                prodavnice, sajtovi za prodaju digitalnih proizvoda sa kartičnim
                plaćanjem preko domaće banke. Ne jedan tip posla ponovljen sto
                puta, nego sto različitih problema.
              </p>
              <p>
                Zvezdana se priključila kasnije i uzela na sebe ono što je u
                ovom poslu najčešće zapostavljeno: da tekst na sajtu bude
                napisan jezikom kupca, da projekat ne stoji i da klijent u
                svakom trenutku zna dokle se stiglo.
              </p>
              <p>
                Radimo zajedno, bez podele na „ja sam za ovo, ona je za ono“.
                Svaki projekat prođe kroz oboje — jedan gradi, drugi gleda
                očima nekoga ko na taj sajt dolazi prvi put. To je jedina
                provera koja stvarno vredi.
              </p>
              <p>
                Za sada nas je dvoje i to nam odgovara. Kada nas bude više,
                pisaće drugačije na ovoj stranici — ali dok god piše ovako,
                znaš tačno ko ti radi posao.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Kartice */}
      <Section className="bg-ink-50/50">
        <Container size="wide">
          <Reveal>
            <SectionHeading eyebrow="Ko je ko" title="Dvoje ljudi iza sajta" />
          </Reveal>
          <div className="mt-14">
            <TeamCards />
          </div>
        </Container>
      </Section>

      {/* Principi */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Kako radimo"
              title="Četiri pravila kojih se držimo"
              description="Nisu marketinške poruke — po njima se ponašamo i kada nam to ne odgovara."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="h-full rounded-3xl border border-ink-100 bg-white p-7 shadow-soft">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-ink-900 text-white">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-tight text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-pretty text-[0.9375rem] leading-7 text-ink-500">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Da popričamo o tvom projektu?"
        description="Javi nam se i reci gde si sada. Dobijaš iskren odgovor — i kada je odgovor da ti u ovom trenutku ne trebamo."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Početna", url: "/" },
          { name: "O nama", url: "/o-nama" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${site.url}/o-nama`,
          inLanguage: "sr-RS",
          about: { "@id": `${site.url}/#organization` },
          mainEntity: team.map((person) => ({
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            worksFor: { "@id": `${site.url}/#organization` },
          })),
        }}
      />
    </>
  );
}
