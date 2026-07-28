import Link from "next/link";

import { Button, Container } from "@/components/ui";
import { getAllServices } from "@/lib/services";

export default function NotFound() {
  const services = getAllServices().slice(0, 5);

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh" />

      <Container size="narrow" className="py-28 text-center sm:py-36">
        <span className="text-sm font-medium tracking-tight text-brand-600">
          Greška 404
        </span>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink-900 sm:text-5xl">
          Ova stranica ne postoji
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-pretty text-lg leading-8 text-ink-500">
          Link je verovatno zastareo ili je adresa pogrešno ukucana. Evo gde
          možeš dalje.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg" arrow>
            Nazad na početnu
          </Button>
          <Button href="/kontakt" variant="secondary" size="lg">
            Piši nam
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/usluge/${service.slug}`}
              className="rounded-full border border-ink-200 bg-white px-4 py-2 text-[0.9375rem] text-ink-600 transition-colors hover:border-ink-300 hover:text-ink-900"
            >
              {service.navTitle}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
