import { Reveal } from "@/components/reveal";
import { team } from "@/lib/site";

/** Kartice sa Zvezdanom i Milanom — koriste se na početnoj i na /o-nama. */
export function TeamCards({ withBio = true }: { withBio?: boolean }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {team.map((person, index) => (
        <Reveal key={person.slug} delay={index * 90}>
          <article className="h-full overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft">
            <div
              className="relative aspect-5/4 overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(135deg, ${person.accent[0]}, ${person.accent[1]})`,
              }}
            >
              {person.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={person.photo}
                  alt={person.name}
                  loading="lazy"
                  // Okvir je 5:4 jer su obe fotke 1402×1122 — tako se vide cele.
                  // object-cover + object-top: ako neko kasnije doda uspravni
                  // portret, popuniće okvir a kadriranje od vrha čuva glavu
                  className="size-full object-cover object-top"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <span className="text-6xl font-semibold tracking-tight text-white/90">
                    {person.initials}
                  </span>
                </div>
              )}
            </div>

            <div className="p-7">
              <h3 className="text-xl font-semibold tracking-tight text-ink-900">
                {person.name}
              </h3>
              <p className="mt-1 text-[0.9375rem] font-medium text-brand-600">
                {person.role}
              </p>
              {withBio ? (
                <p className="mt-4 text-pretty leading-8 text-ink-500">
                  {person.bio}
                </p>
              ) : null}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
