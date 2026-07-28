import type { Metadata } from "next";

import { ProjectCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { Icon } from "@/components/icons";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Section, SectionHeading } from "@/components/ui";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Izabrani projekti Zvezdane i Milana — sajtovi, web prodavnice, SEO i kampanje. Preko 100 izrađenih sajtova u deset godina rada.",
  alternates: { canonical: "/portfolio" },
};

/**
 * Utisci klijenata.
 *
 * TODO(Milan): dodaj SAMO citate koje su ti klijenti stvarno dali, uz ime i
 * firmu. Dok je niz prazan, sekcija se ne prikazuje — izmišljene preporuke
 * nemaju šta da traže na sajtu.
 */
const testimonials: { quote: string; author: string; company: string }[] = [];

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Sajtovi od kojih i sami živimo"
        description="Većina projekata ispod su naši sopstveni — sajtovi koje smo napravili, pa ih godinama održavamo, optimizujemo i od njih zarađujemo. Zato o tome šta radi u praksi ne govorimo iz kursa nego iz iskustva."
        breadcrumbs={[
          { name: "Početna", href: "/" },
          { name: "Portfolio", href: "/portfolio" },
        ]}
      />

      <Section>
        <Container size="wide">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 70}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-[0.9375rem] leading-7 text-ink-400">
              Ovo je izbor iz preko sto izrađenih sajtova — od lokalnih usluga i
              prodavnica do oglasnika i sajtova sa kartičnim plaćanjem. Na
              razgovoru možemo pokazati i primere iz tvoje delatnosti.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Utisci — sekcija se prikazuje tek kada bude stvarnih citata */}
      {testimonials.length > 0 ? (
      <Section className="bg-ink-50/50">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Utisci klijenata"
              title="Šta kažu ljudi sa kojima radimo"
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {testimonials.map((item, index) => (
              <Reveal key={item.company} delay={index * 80}>
                <figure className="h-full rounded-3xl border border-ink-100 bg-white p-8 shadow-soft">
                  <Icon name="quote" className="size-7 text-brand-200" />
                  <blockquote className="mt-5 text-pretty text-lg leading-8 text-ink-700">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-ink-100 pt-5 text-[0.9375rem]">
                    <span className="font-medium text-ink-900">
                      {item.author}
                    </span>
                    <span className="text-ink-400"> · {item.company}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      ) : null}

      <CtaSection
        title="Tvoj projekat je sledeći?"
        description="Reci nam gde si sada i gde želiš da stigneš. Dobijaš iskren predlog šta prvo raditi — čak i ako to znači da ti za sada ne trebamo."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Početna", url: "/" },
          { name: "Portfolio", url: "/portfolio" },
        ])}
      />
    </>
  );
}
