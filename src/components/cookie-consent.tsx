"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Icon } from "@/components/icons";
import { buttonClass } from "@/components/ui";
import {
  CONSENT_EVENT,
  CONSENT_KEY,
  CONSENT_VERSION,
  applyToGtag,
  saveConsent,
  type Consent,
} from "@/lib/consent";
import { cn } from "@/lib/utils";

type Categories = { analytics: boolean; marketing: boolean };

const categoryInfo = [
  {
    key: "necessary" as const,
    title: "Neophodni",
    body: "Drže sajt u funkciji — pamte tvoj izbor kolačića i štite formu od zloupotrebe. Bez njih sajt ne radi, pa se ne mogu isključiti.",
    locked: true,
  },
  {
    key: "analytics" as const,
    title: "Analitika",
    body: "Pomažu nam da vidimo koje stranice se čitaju i gde ljudi odustaju, da bismo ih popravili. Podaci su zbirni i ne služe da bismo te lično prepoznali.",
    locked: false,
  },
  {
    key: "marketing" as const,
    title: "Marketing",
    body: "Omogućavaju merenje uspešnosti oglasa i prikazivanje relevantnijih reklama na drugim sajtovima.",
    locked: false,
  },
];

/* --------------------------------------------------------------- store */

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONSENT_EVENT, onChange);
  };
}

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

const serverRaw = () => null;

/** Klijentska provera bez efekta — sprečava neslaganje pri hidraciji. */
const noopSubscribe = () => () => {};

export function CookieConsent() {
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const raw = useSyncExternalStore(subscribe, readRaw, serverRaw);

  let stored: Consent | null = null;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Consent;
      if (parsed.version === CONSENT_VERSION) stored = parsed;
    } catch {
      stored = null;
    }
  }

  const [forceOpen, setForceOpen] = useState(false);
  const [details, setDetails] = useState(false);
  /** null dok korisnik ne dodirne prekidače — tada se prikazuje sačuvani izbor. */
  const [draft, setDraft] = useState<Categories | null>(null);

  const choice: Categories = draft ?? {
    analytics: stored?.analytics ?? false,
    marketing: stored?.marketing ?? false,
  };

  // Ponovno otvaranje iz podnožja ili sa politike kolačića.
  useEffect(() => {
    const reopen = () => {
      setDraft(null);
      setDetails(true);
      setForceOpen(true);
    };
    window.addEventListener("zim-consent-open", reopen);
    return () => window.removeEventListener("zim-consent-open", reopen);
  }, []);

  // Sačuvani izbor se prijavljuje Google Consent Mode-u pri svakom učitavanju.
  useEffect(() => {
    if (stored) applyToGtag(stored);
  }, [stored]);

  const open = forceOpen || (isClient && !stored);
  if (!open) return null;

  function decide(next: Categories) {
    saveConsent(next);
    setDraft(null);
    setForceOpen(false);
    setDetails(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Podešavanja kolačića"
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md"
    >
      <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white/95 shadow-lift backdrop-blur-xl">
        <div className="p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50/70 text-brand-600">
              <Icon name="shield" className="size-5" />
            </span>
            <div>
              <h2 className="text-[1.0625rem] font-semibold tracking-tight text-ink-900">
                Kolačići na ovom sajtu
              </h2>
              <p className="mt-2 text-pretty text-[0.9375rem] leading-7 text-ink-500">
                Neophodne koristimo da sajt radi. Analitičke i marketinške samo
                ako se složiš — i možeš se predomisliti kad god poželiš.{" "}
                <Link
                  href="/politika-kolacica"
                  className="font-medium text-brand-600 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-500"
                >
                  Više o kolačićima
                </Link>
              </p>
            </div>
          </div>

          {details ? (
            <div className="mt-5 space-y-1 border-t border-ink-100 pt-5">
              {categoryInfo.map((category) => {
                const checked =
                  category.key === "necessary"
                    ? true
                    : choice[category.key as keyof Categories];

                return (
                  <label
                    key={category.key}
                    className={cn(
                      "flex gap-3 rounded-2xl p-3 transition-colors",
                      category.locked
                        ? "opacity-70"
                        : "cursor-pointer hover:bg-ink-50",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={category.locked}
                      onChange={(event) =>
                        setDraft({
                          ...choice,
                          [category.key]: event.target.checked,
                        })
                      }
                      className="mt-1 size-4 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-400"
                    />
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-ink-900">
                        {category.title}
                        {category.locked ? (
                          <span className="ml-2 text-[0.75rem] font-normal text-ink-400">
                            uvek uključeni
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] leading-6 text-ink-500">
                        {category.body}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          ) : null}

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => decide({ analytics: true, marketing: true })}
              className={buttonClass("primary", "md", "w-full")}
            >
              Prihvati sve
            </button>

            {details ? (
              <button
                type="button"
                onClick={() => decide(choice)}
                className={buttonClass("secondary", "md", "w-full")}
              >
                Sačuvaj izbor
              </button>
            ) : (
              <button
                type="button"
                onClick={() => decide({ analytics: false, marketing: false })}
                className={buttonClass("secondary", "md", "w-full")}
              >
                Samo neophodni
              </button>
            )}
          </div>

          {!details ? (
            <button
              type="button"
              onClick={() => setDetails(true)}
              className="mt-3 w-full text-center text-[0.8125rem] font-medium text-ink-500 transition-colors hover:text-ink-900"
            >
              Podesi pojedinačno
            </button>
          ) : (
            <button
              type="button"
              onClick={() => decide({ analytics: false, marketing: false })}
              className="mt-3 w-full text-center text-[0.8125rem] font-medium text-ink-500 transition-colors hover:text-ink-900"
            >
              Odbij sve osim neophodnih
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
