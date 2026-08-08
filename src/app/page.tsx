import type { Metadata } from "next";
import Link from "next/link";

import { PostCard, ProjectCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { Faq } from "@/components/faq";
import { Icon, type IconName } from "@/components/icons";
import { JsonLd, faqSchema } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { TeamCards } from "@/components/team";
import {
  Button,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui";
import { getAllPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";
import { getGroupedServices } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const reasons: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "users",
    title: "Radiš sa nama, ne sa posrednikom",
    body: "Nema account managera koji prenosi poruke. Osoba koja ti se javi na telefon je ista ona koja radi na tvom sajtu.",
  },
  {
    icon: "chart",
    title: "Merimo prihod, ne klikove",
    body: "Svaka kampanja i svaki tekst imaju cilj koji se vidi u brojkama. Izveštaj pokazuje koliko je uloženo i šta se vratilo, bez marketinškog magljenja.",
  },
  {
    icon: "compass",
    title: "Sve kod jednih ruku",
    body: "Sajt, SEO i oglasi rade zajedno umesto da se preklapaju. Ne moraš da usklađuješ tri izvođača koji krive jedan drugog.",
  },
  {
    icon: "shield",
    title: "Sve glasi na tvoje ime",
    body: "Domen, hosting i svi nalozi vode se na tebe. Dobijaš obuku i pristupe — nisi zaključan kod nas.",
  },
];

const processSteps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "search",
    title: "Analiza",
    body: "Gde si sada, ko je konkurencija i odakle realno mogu doći prvi rezultati.",
  },
  {
    icon: "compass",
    title: "Strategija",
    body: "Biramo kanale i redosled poteza prema budžetu i ciljevima, sa jasnim prioritetima.",
  },
  {
    icon: "pen",
    title: "Dizajn",
    body: "Struktura, tekstovi i vizuelni identitet koji vode posetioca ka akciji.",
  },
  {
    icon: "code",
    title: "Razvoj",
    body: "Izrada, integracije i tehnički SEO temelj, uz testiranje na svim uređajima.",
  },
  {
    icon: "megaphone",
    title: "Marketing",
    body: "Pokretanje kampanja i sadržaja, uz precizno merenje konverzija.",
  },
  {
    icon: "rocket",
    title: "Rast",
    body: "Mesečna optimizacija na osnovu podataka i skaliranje onoga što donosi rezultat.",
  },
];

/** Segmenti klijenata — posetilac treba da se prepozna pre nego što čita usluge. */
const audiences: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "pin",
    title: "Lokalne firme",
    body: "Da te ljudi u tvom gradu nađu u mapama onda kada traže baš tvoju uslugu.",
  },
  {
    icon: "phone",
    title: "Uslužne delatnosti",
    body: "Majstori, prevoznici, servisi — sajt napravljen oko jednog poteza: poziva ili upita.",
  },
  {
    icon: "cart",
    title: "Online prodavnice",
    body: "WooCommerce i Shopify prodavnice sa strukturom koja se širi kako raste katalog.",
  },
  {
    icon: "users",
    title: "Firme koje rade sa firmama",
    body: "Ozbiljan sajt i SEO sistem koji donosi upite i kada niko ne gleda.",
  },
  {
    icon: "bolt",
    title: "Preduzetnici na početku",
    body: "Od ideje do sajta na svom domenu — ponekad za jedan dan, kada mora brzo.",
  },
  {
    icon: "search",
    title: "Sajtovi koji ne donose ništa",
    body: "Sajt postoji, ali nema upita. Prvo nađemo razlog, pa tek onda predlažemo posao.",
  },
];

const homeFaq = [
  {
    q: "Koliko košta izrada sajta?",
    a: "Zavisi od obima — broj stranica, da li ide prodavnica, koliko sadržaja treba napisati. Posle besplatne analize dobijaš pisanu ponudu sa jasnim obimom i fiksnom cenom, bez naknadnih doplata za ono što je dogovoreno.",
  },
  {
    q: "Koliko traje izrada sajta?",
    a: "Prezentacioni sajt do pet stranica radimo za jedan dan. Standardna izrada je 2–4 nedelje, a prodavnica sa većim katalogom duže — rok dobijaš u ponudi, ne usput.",
  },
  {
    q: "Da li mogu da uzmem samo jednu uslugu?",
    a: "Možeš. Ne prodajemo pakete po svaku cenu — na prvom razgovoru ćemo ti reći i šta ti se u ovom trenutku ne isplati.",
  },
  {
    q: "Da li garantujete prvo mesto na Google-u?",
    a: "Ne, i niko ozbiljan to ne radi. Garantujemo posao koji se vidi u Search Console-u: tehnički ispravan sajt, sadržaj za prave pretrage i merenje koje pokazuje šta se pomera.",
  },
  {
    q: "Koliko treba da prođe do prvih rezultata?",
    a: "Lokalni rezultati u mapama obično 4–8 nedelja. Organske pozicije za stranice usluga 3–6 meseci. Oglasi donose posetu odmah, ali ne popravljaju sajt koji ne konvertuje.",
  },
  {
    q: "Čiji su domen, hosting i nalozi?",
    a: "Tvoji. Sve glasi na tvoje ime, dobijaš pristupe i kratku obuku. Nisi zaključan kod nas i možeš otići kad hoćeš.",
  },
  {
    q: "Radite li sa firmama van Beograda?",
    a: "Da. Radimo sa klijentima iz cele Srbije, regiona i dijaspore — komunikacija ide online, a sastanci se zakazuju prema tvom rasporedu.",
  },
  {
    q: "Šta dobijam besplatnom analizom?",
    a: "Pošalji adresu sajta i u roku od 48 sati dobijaš pregled stanja i listu prioriteta za prva tri meseca. Bez obaveze i bez prodajnog pritiska.",
  },
];

const marqueeItems = [
  "WordPress",
  "WooCommerce",
  "Elementor Pro",
  "Bricks Builder",
  "Shopify",
  "Google Ads",
  "Google Analytics 4",
  "Search Console",
  "Meta Ads",
  "Ahrefs",
  "Cloudflare",
  "Klaviyo",
];

export default function HomePage() {
  const groups = getGroupedServices();
  const projects = getFeaturedProjects();
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-mesh" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />

        <Container size="wide" className="pb-20 pt-16 sm:pb-28 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow>
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-brand-500" />
                </span>
                Zvezdana i Milan · ZIM Digital
              </Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-6xl md:text-[4.25rem]">
                Izrada sajtova, SEO i digitalni marketing koji{" "}
                <span className="text-gradient">donose klijente</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-ink-500 sm:text-xl sm:leading-9">
                ZIM Digital je mali digitalni studio iz Beograda. Pravimo
                WordPress i Shopify sajtove, radimo SEO, lokalni SEO i Google
                Ads — da te firma nađe tamo gde te kupci već traže. Dvoje smo
                ljudi, pa radiš direktno sa onima koji ti diraju sajt.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href="/kontakt"
                  size="lg"
                  arrow
                  className="w-full sm:w-auto"
                >
                  Besplatna analiza sajta
                </Button>
                <Button
                  href="/portfolio"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Pogledaj naše projekte
                </Button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm text-ink-400">
                {[
                  "Izrada sajtova",
                  "SEO",
                  "Google Biznis",
                  "Vizuali",
                  "AI video",
                ].map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-2.5">
                    {index > 0 ? (
                      <span aria-hidden className="text-ink-300">
                        •
                      </span>
                    ) : null}
                    {item}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>

          {/* Brojke */}
          <Reveal delay={400}>
            <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-100 bg-ink-100 shadow-soft sm:mt-20 lg:grid-cols-4">
              {site.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/85 px-6 py-8 text-center backdrop-blur"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-3xl font-semibold tracking-[-0.02em] text-ink-900 sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mt-2 block text-sm leading-5 text-ink-500">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>

        {/* Traka sa alatima */}
        <div className="relative overflow-hidden border-y border-ink-100 bg-white/60 py-5 backdrop-blur">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"
          />
          <div className="flex w-max animate-marquee gap-12 pr-12">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="whitespace-nowrap text-sm font-medium tracking-tight text-ink-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- ZA KOGA RADIMO */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Za koga radimo"
              title="Digitalna rešenja za firme koje žele više klijenata"
              description="Ne radimo sa svima i ne pravimo sve. Ovo su situacije u kojima znamo tačno šta treba uraditi i kojim redosledom."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience, index) => (
              <Reveal key={audience.title} delay={index * 60}>
                <div className="h-full rounded-3xl border border-ink-100 bg-white p-7 shadow-soft">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50/70 text-brand-600">
                    <Icon name={audience.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-tight text-ink-900">
                    {audience.title}
                  </h3>
                  <p className="mt-2.5 text-pretty text-[0.9375rem] leading-7 text-ink-500">
                    {audience.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- USLUGE */}
      <Section id="usluge" className="bg-ink-50/50">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Usluge"
              title="Izgradi, privuci, rasti"
              description="Šesnaest usluga, ali retko ti trebaju sve odjednom. Podeljene su po fazi u kojoj se biznis nalazi — kreni od one koja je tvoja."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {groups.map((group, index) => (
              <Reveal key={group.slug} delay={index * 80}>
                <div className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 shadow-soft">
                  <span className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
                    Faza {index + 1}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-ink-900">
                    {group.title}
                  </h3>
                  <p className="mt-2.5 text-pretty text-[0.9375rem] leading-7 text-ink-500">
                    {group.description}
                  </p>

                  <ul className="mt-6 space-y-1 border-t border-ink-100 pt-5">
                    {group.services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/usluge/${service.slug}`}
                          className="group -mx-2 flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors hover:bg-ink-50"
                        >
                          <Icon
                            name={service.icon}
                            className="size-4 shrink-0 text-brand-500"
                          />
                          <span className="text-[0.9375rem] font-medium text-ink-800">
                            {service.navTitle}
                          </span>
                          <Icon
                            name="arrowRight"
                            className="ml-auto size-4 shrink-0 text-ink-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand-500"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-12 text-center">
              <Button href="/usluge" variant="secondary" size="lg" arrow>
                Sve usluge sa detaljima
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------ ZAŠTO ZIM DIGITAL */}
      <Section className="relative overflow-hidden bg-ink-50/50">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  align="left"
                  eyebrow="Zašto baš mi"
                  title="Mali smo, i to je razlog da nas izabereš"
                  description="Većina agencija ti proda paket. Mi prvo pogledamo brojke i kažemo šta ti se ne isplati — čak i kada to znači manji posao za nas."
                />
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-8">
                  <Button href="/o-nama" variant="secondary" arrow>
                    Upoznaj nas
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-5 sm:grid-cols-2">
                {reasons.map((reason, index) => (
                  <Reveal key={reason.title} delay={index * 80}>
                    <div className="h-full rounded-3xl border border-ink-100 bg-white p-7 shadow-soft">
                      <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-ink-900 text-white">
                        <Icon name={reason.icon} className="size-5" />
                      </span>
                      <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-tight text-ink-900">
                        {reason.title}
                      </h3>
                      <p className="mt-2.5 text-pretty text-[0.9375rem] leading-7 text-ink-500">
                        {reason.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- O NAMA */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="O nama"
              title={
                <>
                  <span className="text-gradient">Z</span>vezdana{" "}
                  <span className="text-gradient">i</span>{" "}
                  <span className="text-gradient">M</span>ilan
                </>
              }
              description="Odatle ime. Dvoje ljudi koji zajedno rade svaki projekat — bez posrednika i bez prosleđivanja."
            />
          </Reveal>

          <div className="mt-14">
            <TeamCards withBio={false} />
          </div>

          <Reveal delay={200}>
            <div className="mt-10 text-center">
              <Button href="/o-nama" variant="secondary" arrow>
                Cela priča
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------ PORTFOLIO */}
      <Section>
        <Container size="wide">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                align="left"
                eyebrow="Portfolio"
                title="Projekti i brojke iza njih"
                className="max-w-xl"
              />
              <Link
                href="/portfolio"
                className="group inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-medium text-brand-600 hover:text-brand-700"
              >
                Svi projekti
                <Icon
                  name="arrowRight"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- PROCES */}
      <Section className="bg-ink-900 text-white">
        <Container size="wide">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[0.8125rem] font-medium text-white/80">
                Proces rada
              </span>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
                Šest koraka od prvog razgovora do stabilnog rasta
              </h2>
              <p className="mt-5 text-pretty text-lg leading-8 text-white/60">
                Isti proces primenjujemo na svaki projekat — zato uvek znaš gde
                se nalazimo i šta je sledeće.
              </p>
            </div>
          </Reveal>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <li key={step.title} className="group relative bg-ink-900 p-8">
                <span className="text-sm font-medium tabular-nums text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-5 inline-flex size-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white transition-colors group-hover:border-brand-400/50 group-hover:bg-brand-500/20">
                  <Icon name={step.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-pretty text-[0.9375rem] leading-7 text-white/55">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- BLOG */}
      {posts.length > 0 ? (
        <Section>
          <Container size="wide">
            <Reveal>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                  align="left"
                  eyebrow="Blog"
                  title="Znanje koje možeš primeniti i sam"
                  className="max-w-xl"
                />
                <Link
                  href="/blog"
                  className="group inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-medium text-brand-600 hover:text-brand-700"
                >
                  Svi tekstovi
                  <Icon
                    name="arrowRight"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 80}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ------------------------------------------------------------ FAQ */}
      <Section className="bg-ink-50/50">
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              eyebrow="Česta pitanja"
              title="Ono što nas pitaju pre svake saradnje"
            />
          </Reveal>
          <div className="mt-12">
            <Faq items={homeFaq} />
          </div>
        </Container>
      </Section>

      <CtaSection />

      <JsonLd data={faqSchema(homeFaq)} />
    </>
  );
}
