import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard, ProjectCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { Faq } from "@/components/faq";
import { Icon } from "@/components/icons";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  Button,
  Container,
  IconBubble,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import { getCategory } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { getProjectsByService } from "@/lib/projects";
import { getAllServices, getServiceBySlug } from "@/lib/services";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.seoTitle ?? service.title,
    description: service.metaDescription,
    alternates: { canonical: `/usluge/${service.slug}` },
    openGraph: {
      title: `${service.seoTitle ?? service.title} · ${site.name}`,
      description: service.metaDescription,
      url: `/usluge/${service.slug}`,
      type: "article",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const others = getAllServices().filter((item) => item.slug !== service.slug);
  // Najviše tri, da sekcija ostane dokaz a ne drugi portfolio
  const relatedProjects = getProjectsByService(service.slug).slice(0, 3);
  const relatedPosts = service.blogCategory
    ? getPostsByCategory(service.blogCategory).slice(0, 3)
    : [];
  const category = service.blogCategory
    ? getCategory(service.blogCategory)
    : undefined;

  const crumbs = [
    { name: "Početna", href: "/" },
    { name: "Usluge", href: "/usluge" },
    { name: service.navTitle, href: `/usluge/${service.slug}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Usluga"
        title={service.h1 ?? service.title}
        description={service.tagline}
        breadcrumbs={crumbs}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {service.highlights.map((item) => (
            <Pill key={item}>{item}</Pill>
          ))}
        </div>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/kontakt" size="lg" arrow className="w-full sm:w-auto">
            Zatraži ponudu
          </Button>
          <Button
            href={`https://wa.me/${site.contact.whatsapp}`}
            external
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Icon name="whatsapp" className="size-4" />
            Brzo pitanje na WhatsApp
          </Button>
        </div>
      </PageHero>

      {/* Uvod */}
      <Section className="py-16 sm:py-20">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-6">
              {service.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-pretty text-lg leading-9 text-ink-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Šta dobijaš */}
      <Section className="bg-ink-50/50">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Šta dobijaš"
              title="Konkretno, stavka po stavka"
              description="Bez opštih fraza — ovo je ono što ulazi u ponudu i što možeš da proveriš."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="h-full rounded-3xl border border-ink-100 bg-white p-7 shadow-soft">
                  <IconBubble className="size-10 rounded-xl">
                    <Icon name="check" className="size-4.5" />
                  </IconBubble>
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

      {/* Dubinski blokovi — samo kod usluga koje ih imaju */}
      {service.sections?.length ? (
        <Section>
          <Container size="narrow">
            <div className="space-y-16">
              {service.sections.map((section) => (
                <Reveal key={section.title}>
                  <div>
                    <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-ink-900 sm:text-3xl">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-5">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 32)}
                          className="text-pretty text-[1.0625rem] leading-8 text-ink-600"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Cena — iznosi ulaze tek kada budu potvrđeni, vidi services.ts */}
      {service.pricing ? (
        <Section className="bg-ink-50/50">
          <Container size="narrow">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Cena"
                title={service.pricing.title}
                description={service.pricing.intro}
              />
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {service.pricing.factors.map((factor, index) => (
                <Reveal key={factor.title} delay={index * 60}>
                  <div className="h-full rounded-3xl border border-ink-100 bg-white p-6 shadow-soft">
                    <h3 className="text-[1rem] font-semibold tracking-tight text-ink-900">
                      {factor.title}
                    </h3>
                    <p className="mt-2 text-pretty text-[0.9375rem] leading-7 text-ink-500">
                      {factor.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {service.pricing.note ? (
              <Reveal delay={120}>
                <p className="mt-8 text-pretty text-[0.9375rem] leading-7 text-ink-500">
                  {service.pricing.note}
                </p>
              </Reveal>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {/* Kome je namenjeno + proces */}
      <Section>
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  align="left"
                  eyebrow="Kome je namenjeno"
                  title="Da li je ovo prava usluga za tebe?"
                />
              </Reveal>

              <ul className="mt-8 space-y-3">
                {service.forWhom.map((item, index) => (
                  <Reveal key={item} delay={index * 60}>
                    <li className="flex gap-3 text-[1.0625rem] leading-8 text-ink-600">
                      <Icon
                        name="check"
                        className="mt-1.5 size-4.5 shrink-0 text-brand-500"
                      />
                      {item}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <SectionHeading
                  align="left"
                  eyebrow="Kako radimo"
                  title="Proces koji ne ostavlja prostor za iznenađenja"
                />
              </Reveal>

              <ol className="mt-8 space-y-2">
                {service.process.map((step, index) => (
                  <Reveal key={step.title} delay={index * 70}>
                    <li className="flex gap-5 rounded-3xl border border-ink-100 bg-white p-6 shadow-soft">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-ink-900 text-sm font-medium tabular-nums text-white">
                        {index + 1}
                      </span>
                      <span>
                        <span className="block text-[1.0625rem] font-semibold tracking-tight text-ink-900">
                          {step.title}
                        </span>
                        <span className="mt-1.5 block text-pretty text-[0.9375rem] leading-7 text-ink-500">
                          {step.body}
                        </span>
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* Projekti na kojima je ova usluga rađena */}
      {relatedProjects.length > 0 ? (
        <Section>
          <Container size="wide">
            <Reveal>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                  align="left"
                  eyebrow="Naši projekti"
                  title="Gde smo ovo već radili"
                  className="max-w-xl"
                />
                <Link
                  href="/portfolio"
                  className="group inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-medium text-brand-600 hover:text-brand-700"
                >
                  Ceo portfolio
                  <Icon
                    name="arrowRight"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 80}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* FAQ */}
      <Section className="bg-ink-50/50">
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              eyebrow="Česta pitanja"
              title={`${service.title} — najčešća pitanja`}
            />
          </Reveal>
          <div className="mt-12">
            <Faq items={service.faq} />
          </div>
        </Container>
      </Section>

      {/* Tekstovi iz bloga */}
      {relatedPosts.length > 0 ? (
        <Section>
          <Container size="wide">
            <Reveal>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                  align="left"
                  eyebrow="Sa bloga"
                  title="Više o ovoj temi"
                  className="max-w-xl"
                />
                {category ? (
                  <Link
                    href={`/blog/kategorija/${category.slug}`}
                    className="group inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-medium text-brand-600 hover:text-brand-700"
                  >
                    Svi tekstovi: {category.name}
                    <Icon
                      name="arrowRight"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                ) : null}
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {relatedPosts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 80}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Ostale usluge */}
      <Section className="border-t border-ink-100 py-16 sm:py-20">
        <Container size="wide">
          <h2 className="text-sm font-semibold tracking-tight text-ink-900">
            Ostale usluge
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/usluge/${item.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-[0.9375rem] text-ink-600 transition-all hover:-translate-y-0.5 hover:border-ink-300 hover:text-ink-900"
              >
                <Icon name={item.icon} className="size-4 text-brand-500" />
                {item.navTitle}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        // Naziv usluge ostaje netaknut: menjanje veličine slova lomi se i na
        // skraćenicama („SEO“) i na vlastitim imenima („Google Ads“).
        title={`${service.title} — da krenemo?`}
        description="Pošalji nekoliko rečenica o svom biznisu i dobićeš konkretan predlog sa procenom cene i rokova — bez obaveze."
        primaryLabel="Zatraži ponudu"
      />

      <JsonLd data={faqSchema(service.faq)} />
      <JsonLd
        data={breadcrumbSchema(
          crumbs.map((crumb) => ({ name: crumb.name, url: crumb.href })),
        )}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.metaDescription,
          serviceType: service.title,
          provider: { "@id": `${site.url}/#organization` },
          areaServed: { "@type": "Country", name: "Srbija" },
          url: `${site.url}/usluge/${service.slug}`,
        }}
      />
    </>
  );
}
