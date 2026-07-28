import type { Metadata } from "next";

import { ServiceCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { Faq } from "@/components/faq";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Section, SectionHeading } from "@/components/ui";
import { getAllServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Usluge",
  description:
    "SEO optimizacija, lokalni SEO, izrada sajtova i web prodavnica, Google Ads, Facebook i Instagram oglašavanje, email marketing, AI automatizacija i održavanje sajtova.",
  alternates: { canonical: "/usluge" },
};

const faq = [
  {
    q: "Od koje usluge da krenem ako imam ograničen budžet?",
    a: "Skoro uvek od sajta i tehničkog SEO temelja, jer bez toga i oglasi i sadržaj gube deo efekta. Ako sajt već radi kako treba, prvo puštamo oglase da doneseš prihod dok SEO hvata zalet.",
  },
  {
    q: "Da li moram da uzmem paket ili mogu jednu uslugu?",
    a: "Možeš i jednu. Ne prodajemo pakete po svaku cenu — na prvom razgovoru ćemo ti reći i šta ti se u ovom trenutku ne isplati.",
  },
  {
    q: "Radite li sa firmama van Srbije?",
    a: "Da. Radimo sa klijentima iz regiona i dijaspore, komunikacija ide online, a sastanci se zakazuju prema tvojoj vremenskoj zoni.",
  },
  {
    q: "Kako se ugovara saradnja?",
    a: "Nakon besplatne analize dobijaš pisanu ponudu sa jasnim obimom posla, rokovima i cenom. Tek onda potpisujemo — bez skrivenih stavki i bez naknadnih doplata za ono što je dogovoreno.",
  },
];

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      <PageHero
        eyebrow="Usluge"
        title="Jedanaest usluga, jedan cilj — da tvoj biznis raste"
        description="Svaka usluga stoji sama za sebe, ali najbolje rade zajedno: sajt koji konvertuje, SEO koji dovodi ljude i oglasi koji ubrzavaju rezultat."
        breadcrumbs={[
          { name: "Početna", href: "/" },
          { name: "Usluge", href: "/usluge" },
        ]}
      />

      <Section>
        <Container size="wide">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 60}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-ink-50/50">
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              eyebrow="Česta pitanja"
              title="Pitanja koja dobijamo pre svake saradnje"
            />
          </Reveal>
          <div className="mt-12">
            <Faq items={faq} />
          </div>
        </Container>
      </Section>

      <CtaSection />

      <JsonLd data={faqSchema(faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Početna", url: "/" },
          { name: "Usluge", url: "/usluge" },
        ])}
      />
    </>
  );
}
