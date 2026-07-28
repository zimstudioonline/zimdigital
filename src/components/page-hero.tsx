import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow } from "@/components/ui";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Putanja" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {index > 0 ? (
              <Icon
                name="chevronDown"
                className="size-3.5 -rotate-90 text-ink-300"
              />
            ) : null}
            {index === items.length - 1 ? (
              <span className="text-ink-600">{item.name}</span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-ink-700">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Zaglavlje unutrašnjih stranica — isti ritam na celom sajtu. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-100">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh" />

      <Container size="wide" className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}

        <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {eyebrow ? (
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          ) : null}

          <Reveal delay={60}>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-ink-900 sm:text-5xl md:text-[3.5rem]">
              {title}
            </h1>
          </Reveal>

          {description ? (
            <Reveal delay={120}>
              <p className="mt-6 text-pretty text-lg leading-8 text-ink-500 sm:text-xl sm:leading-9">
                {description}
              </p>
            </Reveal>
          ) : null}

          {children ? <Reveal delay={180}>{children}</Reveal> : null}
        </div>
      </Container>
    </section>
  );
}
