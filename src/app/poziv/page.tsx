import type { Metadata } from "next";
import Link from "next/link";

import { ProjectCard } from "@/components/cards";
import { Icon, type IconName } from "@/components/icons";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { Button, Container, Section, SectionHeading } from "@/components/ui";
import { getProjectBySlug } from "@/lib/projects";
import { getServiceBySlug } from "@/lib/services";
import { site } from "@/lib/site";

// Google Calendar raspored termina (30 min, Google Meet).
const BOOKING_URL = "https://calendar.app.google/NvmrHVb9x2s6nRC27";

export const metadata: Metadata = {
  title: "Zakaži besplatan razgovor — Milan Stanić",
  description:
    "Sajt koji donosi pozive, za molere, frizere, mini bagere, prevoznike, selidbe, električare i vodovodžije. Zakaži besplatan razgovor od 30 minuta preko Google Meet-a.",
  alternates: { canonical: "/poziv" },
  robots: { index: false, follow: true },
};

const pillarSlugs = ["sajt-za-jedan-dan", "google-biznis-profil", "lokalni-seo", "google-ads"];
const proofSlugs = ["mini-bager-iskop", "rapaic-prevoz", "kombi-prevoz-cena"];

/** Otvara Google Calendar zakazivanje direktno u novom tabu. */
function BookingCta({
  label = "Zakaži besplatan razgovor od 30 minuta",
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
                  MILAN STANIĆ
                  <span className="h-px w-8 bg-ink-300" aria-hidden />
                </span>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-ink-900 sm:text-5xl md:text-[3.25rem]">
                  Sajt koji ti <span className="text-gradient">zvoni telefon</span> — za molere,
                  frizere, mini bagere, prevoznike, selidbe, električare i vodovodžije.
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-6 text-balance text-base font-semibold uppercase tracking-wide text-ink-700 sm:text-lg">
                  Za 30 minuta razgovora znaš može li, koliko košta i za koliko je gotovo.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-8 text-ink-500 lg:mx-0">
                  Sajtove pravim deset godina — preko sto do sada, dosta njih baš za zanatlije i
                  uslužne delatnosti: iskopi mini bagerom, selidbe, prevoz putnika. Znam šta ovom
                  poslu donosi pozive — da te ljudi nađu na Google mapama i da im sajt odmah
                  pokaže da si ozbiljan. Radim lično, od prve skice do lansiranja, uz Zvezdanu
                  koja se brine da tekst na sajtu govori jezikom mušterije.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                  {site.stats.map((stat) => (
                    <span
                      key={stat.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-white/80 px-3.5 py-1.5 text-sm text-ink-600 shadow-soft"
                    >
                      <strong className="font-semibold text-ink-900">{stat.value}</strong>
                      {stat.label}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-10">
                  <BookingCta />
                  <p className="mt-4 flex items-center justify-center gap-2 text-sm text-ink-500 lg:justify-start">
                    <Icon name="check" className="size-4 text-emerald-500" />
                    Besplatno, bez obaveze, preko Google Meet-a
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

      {/* --------------------------------------------------------- ŠTA RADIM */}
      <Section className="bg-ink-50/50">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Šta dobijaš"
              title="Sajt, mape i pretraga — sve što ti donosi pozive"
              description="Četiri stvari koje najviše menjaju broj poziva za zanatlije i uslužne delatnosti. Na razgovoru pričamo baš o tome šta tebi treba prvo."
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

      {/* ----------------------------------------------------------- DOKAZ */}
      {proofProjects.length > 0 ? (
        <Section>
          <Container size="wide">
            <Reveal>
              <SectionHeading
                eyebrow="Dokaz, ne obećanje"
                title="Sajtovi koje sam napravio za baš ovakve firme"
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
                  Popričajmo 30 minuta o tvom poslu.
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
                Sajt za tvoj zanat ili uslugu. Radim ja, lično, uz Zvezdanu. Cenu i rok znaš
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
                <Button href={BOOKING_URL} external size="lg" arrow>
                  Hoću predlog, cenu i rok
                </Button>
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
    </>
  );
}
