import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { Faq } from "@/components/faq";
import { Icon, type IconName } from "@/components/icons";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Section, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Zatraži besplatnu analizu sajta ili zakaži konsultacije. Telefon, email, WhatsApp i kontakt forma — javljamo se istog radnog dana.",
  alternates: { canonical: "/kontakt" },
};

const faq = [
  {
    q: "Koliko brzo se javljate na upit?",
    a: "Istog radnog dana, najčešće u roku od nekoliko sati. Ako pišeš vikendom, odgovor stiže u ponedeljak ujutru.",
  },
  {
    q: "Da li je prvi razgovor besplatan?",
    a: "Jeste. Prvi razgovor i analiza sajta su besplatni i bez obaveze. Cilj je da obojica vidimo ima li smisla da radimo zajedno.",
  },
  {
    q: "Šta da pripremim za prvi razgovor?",
    a: "Adresu sajta, kratak opis šta prodaješ i kome, i okvirnu ideju budžeta. Ako imaš pristup Google Analytics-u i Search Console-u, to nam pomaže da odmah vidimo stvarno stanje.",
  },
  {
    q: "Radite li i sa malim firmama?",
    a: "Da. Veliki deo klijenata su male i porodične firme. Za mali budžet biramo jedan kanal i radimo ga kako treba, umesto da razvučemo novac na sve strane.",
  },
];

const channels: {
  icon: IconName;
  label: string;
  value: string;
  href: string;
  note: string;
  external?: boolean;
}[] = [
  {
    icon: "phone",
    label: "Telefon",
    value: site.contact.phone,
    href: `tel:${site.contact.phone.replace(/\s/g, "")}`,
    note: site.contact.workingHours,
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: "Piši nam poruku",
    href: `https://wa.me/${site.contact.whatsapp}`,
    note: "Najbrži način za kratko pitanje",
    external: true,
  },
  {
    icon: "mail",
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    note: "Odgovor istog radnog dana",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Da vidimo šta možemo da uradimo za tvoj biznis"
        description="Pošalji upit, pozovi ili piši na WhatsApp. Na prvom razgovoru dobijaš iskrenu procenu — šta ti se isplati, šta ne i koliko to realno košta."
        breadcrumbs={[
          { name: "Početna", href: "/" },
          { name: "Kontakt", href: "/kontakt" },
        ]}
      />

      <Section id="zakazivanje" className="py-16 sm:py-20">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Forma */}
            <div className="lg:col-span-7">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            {/* Kontakt kanali */}
            <div className="lg:col-span-5">
              <div className="space-y-3">
                {channels.map((channel, index) => (
                  <Reveal key={channel.label} delay={index * 70}>
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-3xl border border-ink-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-lift"
                    >
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50/70 text-brand-600">
                        <Icon name={channel.icon} className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.8125rem] text-ink-400">
                          {channel.label}
                        </span>
                        <span className="block truncate font-medium text-ink-900">
                          {channel.value}
                        </span>
                        <span className="mt-0.5 block text-[0.8125rem] text-ink-400">
                          {channel.note}
                        </span>
                      </span>
                      <Icon
                        name="arrowRight"
                        className="size-4 shrink-0 text-ink-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink-600"
                      />
                    </a>
                  </Reveal>
                ))}
              </div>

              {/* Adresa */}
              <Reveal delay={210}>
                <div className="mt-3 rounded-3xl border border-ink-100 bg-white p-5 shadow-soft">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50/70 text-brand-600">
                      <Icon name="pin" className="size-5" />
                    </span>
                    <div>
                      <span className="block text-[0.8125rem] text-ink-400">
                        Adresa
                      </span>
                      <address className="not-italic font-medium text-ink-900">
                        {site.contact.address.street}
                        <br />
                        {site.contact.address.postalCode}{" "}
                        {site.contact.address.city}, {site.contact.address.country}
                      </address>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Mapa */}
              <Reveal delay={280}>
                <div className="mt-3 overflow-hidden rounded-3xl border border-ink-100 shadow-soft">
                  <iframe
                    src={site.contact.mapEmbedUrl}
                    title={`Lokacija — ${site.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-72 w-full border-0"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-ink-50/50">
        <Container size="narrow">
          <Reveal>
            <SectionHeading eyebrow="Česta pitanja" title="Pre nego što pišeš" />
          </Reveal>
          <div className="mt-12">
            <Faq items={faq} />
          </div>
        </Container>
      </Section>

      <JsonLd data={faqSchema(faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Početna", url: "/" },
          { name: "Kontakt", url: "/kontakt" },
        ])}
      />
    </>
  );
}
