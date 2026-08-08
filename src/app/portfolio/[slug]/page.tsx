import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { Icon } from "@/components/icons";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  Button,
  Container,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import {
  getCaseStudies,
  getProjectBySlug,
  serviceSlugByLabel,
} from "@/lib/projects";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseStudies().map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — case study`,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.name} · ${site.name}`,
      description: project.summary,
      url: `/portfolio/${project.slug}`,
      type: "article",
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.caseStudy) notFound();

  const { challenge, approach, goal } = project.caseStudy;
  const others = getCaseStudies()
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  const crumbs = [
    { name: "Početna", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: project.name, href: `/portfolio/${project.slug}` },
  ];

  return (
    <>
      <PageHero
        eyebrow={project.industry}
        title={project.name}
        description={project.summary}
        breadcrumbs={crumbs}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Pill key={tech}>{tech}</Pill>
          ))}
        </div>

        {project.url ? (
          <div className="mt-8">
            <Button href={project.url} size="lg" external>
              Poseti sajt
              <Icon name="arrowUpRight" className="size-4" />
            </Button>
          </div>
        ) : null}
      </PageHero>

      {/* Slika projekta */}
      {project.image ? (
        <Section className="pb-0">
          <Container size="wide">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-ink-100 shadow-lift">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={`${project.name} — izgled sajta`}
                  className="w-full"
                />
              </div>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* Zadatak */}
      <Section>
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Zadatak"
              title="Sa čime se krenulo"
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-8 text-pretty text-lg leading-8 text-ink-600">
              {challenge}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-ink-100 bg-ink-100 sm:grid-cols-3">
              <div className="bg-white px-6 py-6">
                <dt className="text-[0.8125rem] text-ink-400">Delatnost</dt>
                <dd className="mt-1.5 font-medium text-ink-900">
                  {project.industry}
                </dd>
              </div>
              <div className="bg-white px-6 py-6">
                <dt className="text-[0.8125rem] text-ink-400">Godina</dt>
                <dd className="mt-1.5 font-medium text-ink-900">
                  {project.year}
                </dd>
              </div>
              <div className="bg-white px-6 py-6">
                <dt className="text-[0.8125rem] text-ink-400">Tip projekta</dt>
                <dd className="mt-1.5 font-medium text-ink-900">
                  {project.ownership === "client"
                    ? "Rad za klijenta"
                    : "Sopstveni projekat"}
                </dd>
              </div>
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* Rešenje */}
      <Section className="bg-ink-50/50">
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Rešenje"
              title="Šta smo uradili"
            />
          </Reveal>

          <ol className="mt-12 space-y-4">
            {approach.map((step, index) => (
              <Reveal key={step.title} delay={index * 70}>
                <li className="rounded-3xl border border-ink-100 bg-white p-7 shadow-soft">
                  <span className="text-sm font-medium tabular-nums text-ink-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-tight text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-pretty text-[0.9375rem] leading-7 text-ink-500">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Cilj i rezultati */}
      <Section>
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Cilj"
              title="Šta je bilo merilo uspeha"
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-8 text-pretty text-lg leading-8 text-ink-600">
              {goal}
            </p>
          </Reveal>

          {/* Brojke se prikazuju samo kada su proverljive — vidi projects.ts */}
          {project.results?.length ? (
            <Reveal delay={140}>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-ink-100 bg-ink-100 sm:grid-cols-3">
                {project.results.map((result) => (
                  <div key={result.label} className="bg-white px-6 py-8">
                    <dd className="text-3xl font-semibold tracking-[-0.02em] text-ink-900">
                      {result.value}
                    </dd>
                    <dt className="mt-2 text-sm leading-5 text-ink-500">
                      {result.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}

          {/* Usluge korišćene na projektu — vode na stranicu usluge */}
          <Reveal delay={200}>
            <div className="mt-12 border-t border-ink-100 pt-8">
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                Usluge na ovom projektu
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.services.map((label) => {
                  const serviceSlug = serviceSlugByLabel[label];
                  return serviceSlug ? (
                    <Link
                      key={label}
                      href={`/usluge/${serviceSlug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50/70 px-3.5 py-1.5 text-[0.875rem] font-medium text-brand-700 transition-colors hover:border-brand-200 hover:bg-brand-100/70"
                    >
                      {label}
                      <Icon name="arrowRight" className="size-3.5" />
                    </Link>
                  ) : (
                    <Pill key={label}>{label}</Pill>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Ostali projekti */}
      {others.length > 0 ? (
        <Section className="bg-ink-50/50">
          <Container size="wide">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Još projekata"
                title="Slični poslovi"
              />
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((item, index) => (
                <Reveal key={item.slug} delay={index * 80}>
                  <ProjectCard project={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaSection
        title="Hoćeš ovakav projekat?"
        description="Reci nam gde si sada i gde želiš da stigneš. Dobijaš iskren predlog šta prvo raditi — čak i ako to znači da ti za sada ne trebamo."
      />

      <JsonLd
        data={breadcrumbSchema(
          crumbs.map((crumb) => ({ name: crumb.name, url: crumb.href })),
        )}
      />
    </>
  );
}
