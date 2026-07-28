import type { ReactNode } from "react";

import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui";

/** Zajednički okvir za pravne stranice — ista tipografija kao blog. */
export function LegalPage({
  title,
  updated,
  breadcrumbs,
  children,
}: {
  title: string;
  updated: string;
  breadcrumbs: { name: string; href: string }[];
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow="Pravne informacije"
        title={title}
        description={`Poslednje ažuriranje: ${updated}`}
        breadcrumbs={breadcrumbs}
      />

      <Container size="narrow" className="py-14 sm:py-16">
        <div className="[&_a]:font-medium [&_a]:text-brand-600 [&_a]:underline [&_a]:decoration-brand-200 [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink-900 [&_li]:mt-2 [&_p]:mt-5 [&_p]:leading-8 [&_p]:text-ink-600 [&_strong]:font-semibold [&_strong]:text-ink-900 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:leading-8 [&_ul]:text-ink-600 [&>*:first-child]:mt-0">
          {children}
        </div>
      </Container>
    </>
  );
}
