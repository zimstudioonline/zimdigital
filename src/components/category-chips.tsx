import Link from "next/link";

import { categories } from "@/lib/categories";
import { cn } from "@/lib/utils";

/** Filter kategorija bloga. Statične stranice, bez klijentskog JS-a. */
export function CategoryChips({
  active,
  counts,
}: {
  active?: string;
  counts?: Record<string, number>;
}) {
  const chip =
    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.9375rem] transition-all";

  return (
    <nav aria-label="Kategorije bloga" className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={cn(
          chip,
          !active
            ? "border-ink-900 bg-ink-900 text-white"
            : "border-ink-200 bg-white text-ink-600 hover:-translate-y-0.5 hover:border-ink-300 hover:text-ink-900",
        )}
      >
        Sve teme
      </Link>

      {categories.map((category) => {
        const isActive = active === category.slug;
        const count = counts?.[category.slug];

        return (
          <Link
            key={category.slug}
            href={`/blog/kategorija/${category.slug}`}
            className={cn(
              chip,
              isActive
                ? "border-ink-900 bg-ink-900 text-white"
                : "border-ink-200 bg-white text-ink-600 hover:-translate-y-0.5 hover:border-ink-300 hover:text-ink-900",
            )}
          >
            {category.name}
            {count ? (
              <span
                className={cn(
                  "text-[0.75rem] tabular-nums",
                  isActive ? "text-white/50" : "text-ink-400",
                )}
              >
                {count}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
