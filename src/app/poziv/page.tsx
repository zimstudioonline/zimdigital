import type { Metadata } from "next";
import Link from "next/link";

import { ProjectCard } from "@/components/cards";
import { Faq } from "@/components/faq";
import { Icon, type IconName } from "@/components/icons";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { TeamCards } from "@/components/team";
import { Button, Container, Section, SectionHeading } from "@/components/ui";
import { getProjectBySlug } from "@/lib/projects";
import { getServiceBySlug } from "@/lib/services";
import { site } from "@/lib/site";
import { BOOKING_URL } from "./booking";

export const metadata: Metadata = {
  title: "Zakaži besplatan razgovor — Milan Stanić",
  description:
    "Za 30 minuta pogledamo gde si sada — sajt, Google prisustvo, oglasi — i kažemo šta bi prvo trebalo uraditi. Besplatno, bez obaveze, preko Google Meet-a.",
  alternates: { canonical: "/poziv" },
  robots: { index: false, follow: true },
};

const pillarSlugs = ["sajt-za-jedan-dan", "google-biznis-profil", "lokalni-seo", "google-ads"];
const proofSlugs = ["mini-bager-iskop", "rapaic-prevoz", "kombi-prevoz-cena"];

const heroStats = [
  "10+ godina iskustva",
  "100+ izrađenih sajtova",
  "Sajt + SEO + oglasi na jednom mestu",
  "Direktan rad sa Milanom i Zvezdanom",
];

const dobijas = [
  "Šta bismo prvo popravili na tvom sajtu ili prisustvu",
  "Da li ti treba SEO, Google Ads, sajt ili nešto treće",
  "Šta konkretno možemo da uradimo",
  "Okvirnu cenu",
  "Realan rok",
  "Iskren odgovor da li uopšte ima smisla da radimo zajedno",
];

const koraci: { title: string; body: string }[] = [
  {
    title: "Ti mi kažeš šta radiš",
    body: "Ko su tvoji klijenti, šta prodaješ i gde ti trenutno dolaze novi klijenti.",
  },
  {
    title: "Pogledamo šta već imaš",
    body: "Sajt, Google profil, SEO, oglase ili online prodavnicu — ono što već postoji.",
  },
  {
    title: "Kažemo šta bismo prvo rešavali",
    body: "Ne dobijaš listu od 20 stvari. Dobijaš prioritete — šta prvo, šta može da sačeka.",
  },
  {
    title: "Dobijaš predlog",
    body: "Ako možemo da pomognemo, dobijaš okvirnu cenu i rok, na licu mesta.",
  },
  {
    title: "Ti odlučuješ",
    body: "Nema pritiska i nema obaveze. Odlučiš kad tebi odgovara.",
  },
];

const zaTebe = [
  "Imaš firmu ili uslužni biznis",
  "Već imaš sajt, ali ne donosi dovoljno upita",
  "Nemaš sajt, a želiš da počneš",
  "Želiš više klijenata sa Google-a",
  "Razmišljaš o Google ili Meta oglasima",
  "Želiš da poboljšaš online prodaju",
  "Nisi siguran šta ti je trenutno najveći problem",
];

const nijeZaTebe = [
  "Tražiš samo najjeftiniji mogući sajt",
  "Želiš da „samo nešto postoji“",
  "Ne želiš da ulažeš ništa u marketing",
  "Očekuješ garantovan broj klijenata bez obzira na tržište i ponudu",
];

const faqItems = [
  {
    q: "Da li je razgovor stvarno besplatan?",
    a: "Da, potpuno. Ne tražimo broj kartice niti te obavezujemo na bilo šta.",
  },
  {
    q: "Šta ako mi ne treba nijedna usluga?",
    a: "Reći ćemo ti otvoreno. Nema smisla da radimo nešto što se tebi ne isplati.",
  },
  {
    q: "Koliko traje izrada sajta?",
    a: "Obično 2 do 4 nedelje, u zavisnosti od obima. Tačan rok dobijaš posle razgovora, kad znamo šta tačno treba.",
  },
  {
    q: "Radite li van Beograda?",
    a: "Da, radimo sa firmama iz cele Srbije — razgovor ide preko telefona ili Google Meet-a, bez obzira gde si.",
  },
  {
    q: "Šta ako već imam sajt?",
    a: "Pogledamo ga zajedno na razgovoru i kažemo šta bi prvo trebalo popraviti, umesto da odmah predlažemo novi.",
  },
];

function BookingCta({
  label = "Hoću predlog, cenu i rok",
  size = "lg" as const,
  variant = "primary" as const,
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "inverse";
}) {
  return (
    <Button href={BOOKING_URL} external size={size} variant={variant} arrow>
      {label}
    </Button>
  );
}

export default function PozivPage() {
  const pillars = pillarSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const proofProjects = proofSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-mesh" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />

        <Container size="wide" className="pb-16 pt-14 sm:pb-24 sm:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="text-center lg:text-left">
              <Reveal>
                <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.15em] text-ink-400">
                  <span className="h-px w-8 bg-ink-300" aria-hidden />
                  MILAN STANIĆ · ZIM DIGITAL
                  <span className="h-px w-8 bg-ink-300" aria-hidden />
                </span>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-ink-900 sm:text-5xl md:text-[3.25rem]">
                  Treba ti <span className="text-gradient">više klijenata</span> sa interneta?
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-6 text-balance text-base font-semibold uppercase tracking-wide text-ink-700 sm:text-lg">
                  Za 30 minuta pogledamo gde si sada i kažemo šta bismo prvo uradili.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-8 text-ink-500 lg:mx-0">
                  Sajt, SEO, Google prisustvo ili oglasi — pogledamo šta imaš i kažemo šta bi ti
                  konkretno donelo nove klijente. Deset godina radim sajtove, SEO i oglašavanje
                  za male firme u Srbiji, uz Zvezdanu koja se brine da tekst i komunikacija imaju
                  smisla. Cenu i rok znaš već posle prvog razgovora.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                  {heroStats.map((stat) => (
                    <span
                      key={stat}
                      className="inline-flex items-center rounded-full border border-ink-100 bg-white/80 px-3.5 py-1.5 text-sm text-ink-600 shadow-soft"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-10">
                  <BookingCta />
                  <p className="mt-4 flex items-center justify-center gap-2 text-sm text-ink-500 lg:justify-start">
                    <Icon name="check" className="size-4 text-emerald-500" />
                    30 min · Google Meet · besplatno · bez obaveze
                  </p>
                  <p className="mt-2 text-sm text-ink-400">
                    Radije pišeš?{" "}
                    <a
                      href={`https://wa.me/${site.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-600 hover:text-brand-700"
                    >
                      Piši na WhatsApp
                    </a>
                    .
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div
                className="relative mx-auto aspect-5/4 w-full max-w-sm overflow-hidden rounded-[2rem] border border-ink-100 shadow-lift lg:max-w-none"
                style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #06b6d4)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/milan-stanic.webp"
                  alt="Milan Stanić"
                  className="size-full object-cover object-top"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- DOKAZ */}
      {proofProjects.length > 0 ? (
        <Section className="bg-ink-50/50">
          <Container size="wide">
            <Reveal>
              <SectionHeading
                eyebrow="Pre nego što zakažeš"
                title="Pogledaj šta smo već napravili"
                description="Stvarni klijenti, stvarni sajtovi — možeš ih otvoriti i proveriti."
              />
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {proofProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 90}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* --------------------------------------------------------- PROBLEM */}
      <Section>
        <Container size="narrow">
          <Reveal>
            <div className="text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-ink-900 sm:text-4xl">
                Imaš sajt, ali ne donosi dovoljno klijenata? Ili nemaš sajt, a znaš da ti treba?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-8 text-ink-500">
                Oba su čest slučaj. Razlika je samo odakle krećemo — od popravke onoga što već
                imaš, ili od nule. Cilj je isti: da te ljudi nađu kad tvoju uslugu traže.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* -------------------------------------------------------- REŠENJE */}
      <Section className="bg-ink-50/50">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Rešenje"
              title="Sajt, Google prisustvo i oglasi — sve na jednom mestu"
              description="Ne moraš da uskladiš tri izvođača koji krive jedan drugog. Na razgovoru utvrdimo šta ti od ovoga treba prvo."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {pillars.map((service, index) => (
              <Reveal key={service.slug} delay={index * 80}>
                <Link
                  href={`/usluge/${service.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-ink-200 hover:shadow-lift"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-ink-900 text-white">
                    <Icon name={service.icon as IconName} className="size-5" />
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-tight text-ink-900">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-pretty text-[0.9375rem] leading-7 text-ink-500">
                    {service.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
                    Detaljnije
                    <Icon
                      name="arrowRight"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------- ŠTA DOBIJAŠ */}
      <Section>
        <Container size="narrow">
          <Reveal>
            <SectionHeading eyebrow="Šta dobijaš" title="Šta dobijaš za 30 minuta" />
          </Reveal>

          <Reveal delay={80}>
            <ul className="mx-auto mt-10 max-w-xl space-y-3.5 text-[0.9375rem] leading-7 text-ink-600">
              {dobijas.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------- KO SMO */}
      <Section className="bg-ink-50/50">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Ko smo"
              title="Sa druge strane poziva smo Milan i Zvezdana"
            />
          </Reveal>

          <div className="mt-14">
            <TeamCards withBio={false} />
          </div>

          <Reveal delay={120}>
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-center leading-8 text-ink-500">
              Ne preuzimaš projekat od prodavca pa ga predaješ timu koji nikad nisi upoznao. Sa
              nama razgovaraš direktno — od prvog poziva do lansiranja.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------ KAKO RADI */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading eyebrow="Kako radi" title="Kako izgleda 30 minuta" />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {koraci.map((korak, index) => (
              <Reveal key={korak.title} delay={index * 70}>
                <div className="h-full rounded-3xl border border-ink-100 bg-white p-6 shadow-soft">
                  <span className="text-sm font-semibold tabular-nums text-brand-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-tight text-ink-900">
                    {korak.title}
                  </h3>
                  <p className="mt-2 text-pretty text-[0.9375rem] leading-7 text-ink-500">
                    {korak.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- ZA KOGA JE/NIJE */}
      <Section className="bg-ink-50/50">
        <Container size="wide">
          <Reveal>
            <SectionHeading eyebrow="Za koga je ovo" title="Da li je ovaj razgovor za tebe?" />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-ink-100 bg-white p-7 shadow-soft">
                <h3 className="text-[1.0625rem] font-semibold tracking-tight text-ink-900">
                  Za tebe je ako:
                </h3>
                <ul className="mt-5 space-y-3 text-[0.9375rem] leading-7 text-ink-600">
                  {zaTebe.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="h-full rounded-3xl border border-ink-100 bg-white p-7 shadow-soft">
                <h3 className="text-[1.0625rem] font-semibold tracking-tight text-ink-900">
                  Nije za tebe ako:
                </h3>
                <ul className="mt-5 space-y-3 text-[0.9375rem] leading-7 text-ink-600">
                  {nijeZaTebe.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <Icon name="close" className="mt-0.5 size-4 shrink-0 text-ink-300" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-ink-100 bg-white/70 px-6 py-5 text-center">
              <p className="text-pretty text-[0.9375rem] leading-7 text-ink-600">
                <strong className="font-semibold text-ink-900">Ne moramo da radimo zajedno.</strong>{" "}
                Ako vidimo da ti trenutno nije potrebna naša usluga, reći ćemo ti otvoreno.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- FAQ */}
      <Section>
        <Container size="narrow">
          <Reveal>
            <SectionHeading eyebrow="Pitanja" title="Najčešća pitanja" />
          </Reveal>
          <div className="mt-12">
            <Faq items={faqItems} />
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- ZAVRŠNI CTA */}
      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-900 px-6 py-16 text-center sm:px-14 sm:py-20">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-32 size-[28rem] rounded-full bg-brand-500/25 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-40 -right-20 size-[26rem] rounded-full bg-accent-500/20 blur-3xl"
              />

              <div className="relative mx-auto max-w-2xl">
                <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
                  Hajde da vidimo šta možemo da uradimo za tvoj biznis.
                </h2>
                <p className="mt-5 text-pretty text-lg leading-8 text-white/70">
                  Bez obaveze, bez pritiska. Kažeš mi šta radiš i šta ti treba, ja kažem može li,
                  koliko košta i za koliko je gotovo.
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <BookingCta variant="inverse" />
                  <Button
                    href={`https://wa.me/${site.contact.whatsapp}`}
                    external
                    variant="onDark"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Icon name="whatsapp" className="size-4" />
                    Piši na WhatsApp
                  </Button>
                </div>

                <p className="mt-6 text-sm text-white/45">
                  Besplatno, bez obaveze, preko Google Meet-a · {site.contact.workingHours}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------- DA SKRATIM */}
      <Section>
        <Container size="narrow">
          <Reveal>
            <div className="mx-auto max-w-xl text-center">
              <div
                className="mx-auto size-20 overflow-hidden rounded-full border-2 border-white shadow-lift"
                style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #06b6d4)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/milan-stanic.webp"
                  alt="Milan Stanić"
                  className="size-full object-cover object-top"
                />
              </div>

              <span className="mt-5 inline-flex items-center gap-3 text-sm font-medium tracking-[0.15em] text-ink-400">
                <span className="h-px w-8 bg-ink-300" aria-hidden />
                DA SKRATIM
                <span className="h-px w-8 bg-ink-300" aria-hidden />
              </span>

              <p className="mt-6 text-pretty text-lg leading-8 text-ink-500">
                Sajt, SEO i oglasi za tvoju firmu. Radim ja, lično, uz Zvezdanu. Cenu i rok znaš
                posle prvog razgovora. Ako se ne isplati, reći ću ti.
              </p>

              <h2 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.02em] text-ink-900 sm:text-4xl">
                Zakaži 30 minuta. Izađeš sa predlogom, cenom i rokom.
              </h2>

              <p className="mt-4 text-pretty text-ink-500">
                Besplatno i bez obaveze — u terminu koji sam izabereš, preko Google Meet-a.
              </p>

              <ul className="mt-8 space-y-3 text-left text-[0.9375rem] leading-7 text-ink-600">
                {[
                  "Kažeš mi šta ti treba i šta te muči.",
                  "Kažem ti šta može, koliko košta i do kad.",
                  "Odlučiš kad ti odgovara. Niko te ne juri.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <BookingCta />
                <p className="mt-4 text-sm text-ink-400">
                  Potvrda i link za Google Meet stižu na mejl.
                </p>
                <p className="mt-2 text-sm text-ink-400">
                  Radije pišeš?{" "}
                  <a
                    href={`https://wa.me/${site.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-600 hover:text-brand-700"
                  >
                    Piši na WhatsApp
                  </a>
                  .
                </p>
              </div>

              <p className="mt-12 text-pretty text-sm leading-7 text-ink-400">
                P.S. Ako si stigao dovde, verovatno ti nešto od ovoga treba. Razgovor je 30
                minuta. Posle njega znaš može li, koliko košta i do kad. A može i da ostane kako
                je. Na tebi je.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Početna", url: "/" },
          { name: "Zakaži razgovor", url: "/poziv" },
        ])}
      />
      <JsonLd data={faqSchema(faqItems)} />
    </>
  );
}
