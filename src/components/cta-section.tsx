import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Button, Container } from "@/components/ui";
import { site } from "@/lib/site";

type Props = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

/** Završni poziv na akciju — ponavlja se na dnu svake stranice. */
export function CtaSection({
  title = "Da vidimo šta tvoj sajt propušta.",
  description = "Pošalji adresu sajta i u roku od 48 sati dobijaš besplatnu analizu: šta te koči u Google pretrazi, gde gubiš posetioce i šta bi prvo trebalo rešiti. Bez obaveze i bez prodajnog pritiska.",
  primaryLabel = "Zatraži besplatnu analizu",
  primaryHref = "/kontakt",
}: Props) {
  return (
    <section className="pb-24 sm:pb-32">
      <Container size="wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-900 px-6 py-16 sm:px-14 sm:py-20">
            {/* Dekor */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-32 size-[28rem] rounded-full bg-brand-500/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-40 -right-20 size-[26rem] rounded-full bg-accent-500/20 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[0.8125rem] font-medium text-white/80 backdrop-blur">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                Primamo nove projekte
              </span>

              <h2 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
                {title}
              </h2>

              <p className="mt-5 text-pretty text-lg leading-8 text-white/70">
                {description}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href={primaryHref}
                  size="lg"
                  arrow
                  className="w-full bg-white text-ink-900 hover:bg-white sm:w-auto"
                >
                  {primaryLabel}
                </Button>
                <Button
                  href={`https://wa.me/${site.contact.whatsapp}`}
                  external
                  size="lg"
                  className="w-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/15 sm:w-auto"
                >
                  <Icon name="whatsapp" className="size-4" />
                  Piši na WhatsApp
                </Button>
              </div>

              <p className="mt-6 text-sm text-white/45">
                Odgovaramo istog radnog dana · {site.contact.workingHours}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
