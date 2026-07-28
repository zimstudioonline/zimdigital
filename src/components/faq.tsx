import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

/**
 * Harmonika sa <details>/<summary> — radi bez JavaScript-a,
 * pristupačna je i ne blokira prikaz sadržaja.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink-100 overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft">
      {items.map((item, index) => (
        <Reveal key={item.q} delay={index * 50}>
          <details className="group px-6 py-1 sm:px-8">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-[1.0625rem] font-medium tracking-tight text-ink-900 [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-all duration-300 group-hover:border-ink-300 group-open:rotate-180 group-open:border-brand-200 group-open:bg-brand-50 group-open:text-brand-600">
                <Icon name="chevronDown" className="size-4" />
              </span>
            </summary>
            <p className="pb-6 pr-12 text-pretty leading-8 text-ink-500">
              {item.a}
            </p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
