"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/icons";
import { buttonClass } from "@/components/ui";
import { getAllServices } from "@/lib/services";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (id?: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const fieldClass =
  "w-full rounded-2xl border border-ink-200 bg-white px-4 py-3.5 text-[0.9375rem] text-ink-900 shadow-[inset_0_1px_2px_rgb(13_17_24/0.03)] outline-none transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100";

const labelClass = "block text-sm font-medium text-ink-700";

export function ContactForm() {
  const services = getAllServices();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const tokenRef = useRef<string>("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);

  // Turnstile se renderuje eksplicitno da bismo mogli da ga resetujemo.
  useEffect(() => {
    if (!SITE_KEY || !turnstileReady || !widgetRef.current) return;
    if (widgetIdRef.current) return;
    if (!window.turnstile) return;

    widgetIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: SITE_KEY,
      action: "turnstile-spin-v2",
      theme: "light",
      callback: (token) => {
        tokenRef.current = token;
      },
      "expired-callback": () => {
        tokenRef.current = "";
      },
      "error-callback": () => {
        tokenRef.current = "";
      },
    });
  }, [turnstileReady]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ime: formData.get("ime"),
          email: formData.get("email"),
          telefon: formData.get("telefon"),
          sajt: formData.get("sajt"),
          usluga: formData.get("usluga"),
          poruka: formData.get("poruka"),
          saglasnost: formData.get("saglasnost") === "on",
          kompanija: formData.get("kompanija"),
          turnstileToken: tokenRef.current,
        }),
      });

      const result = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Slanje nije uspelo.");
      }

      form.reset();
      tokenRef.current = "";
      window.turnstile?.reset(widgetIdRef.current);
      setStatus("sent");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Došlo je do greške. Pokušaj ponovo.",
      );
      setStatus("error");
      window.turnstile?.reset(widgetIdRef.current);
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-ink-100 bg-white p-10 text-center shadow-soft">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Icon name="check" className="size-7" />
        </span>
        <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink-900">
          Poruka je poslata
        </h3>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-7 text-ink-500">
          Hvala na upitu. Javljamo se istog radnog dana, najčešće u roku od
          nekoliko sati.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={buttonClass("secondary", "md", "mt-7")}
        >
          Pošalji još jedan upit
        </button>
      </div>
    );
  }

  return (
    <>
      {SITE_KEY ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          onReady={() => setTurnstileReady(true)}
        />
      ) : null}

      <form
        onSubmit={onSubmit}
        className="rounded-3xl border border-ink-100 bg-white p-7 shadow-soft sm:p-9"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ime" className={labelClass}>
              Ime i prezime <span className="text-brand-500">*</span>
            </label>
            <input
              id="ime"
              name="ime"
              type="text"
              required
              autoComplete="name"
              placeholder="Petar Petrović"
              className={`${fieldClass} mt-2`}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-brand-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="petar@firma.rs"
              className={`${fieldClass} mt-2`}
            />
          </div>

          <div>
            <label htmlFor="telefon" className={labelClass}>
              Telefon
            </label>
            <input
              id="telefon"
              name="telefon"
              type="tel"
              autoComplete="tel"
              placeholder="+381 6x xxx xxxx"
              className={`${fieldClass} mt-2`}
            />
          </div>

          <div>
            <label htmlFor="sajt" className={labelClass}>
              Adresa sajta
            </label>
            <input
              id="sajt"
              name="sajt"
              type="text"
              inputMode="url"
              placeholder="mojsajt.rs"
              className={`${fieldClass} mt-2`}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="usluga" className={labelClass}>
              Šta te zanima?
            </label>
            <select
              id="usluga"
              name="usluga"
              defaultValue=""
              className={`${fieldClass} mt-2 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="%236b7488" stroke-width="1.6" stroke-linecap="round"><path d="m4 6 4 4 4-4"/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-11`}
            >
              <option value="">Još nisam siguran — treba mi savet</option>
              {services.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
              <option value="Besplatna analiza sajta">
                Besplatna analiza sajta
              </option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="poruka" className={labelClass}>
              Poruka <span className="text-brand-500">*</span>
            </label>
            <textarea
              id="poruka"
              name="poruka"
              required
              rows={5}
              placeholder="Ukratko o firmi, šta prodaješ i šta bi želeo da postigneš."
              className={`${fieldClass} mt-2 resize-y`}
            />
          </div>
        </div>

        {/* Honeypot — sakriven od korisnika, vidljiv botovima */}
        <div className="absolute left-[-9999px]" aria-hidden>
          <label htmlFor="kompanija">Kompanija</label>
          <input id="kompanija" name="kompanija" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-7 text-ink-500">
          <input
            type="checkbox"
            name="saglasnost"
            required
            className="mt-1.5 size-4 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-400"
          />
          <span>
            Saglasan sam da se moji podaci koriste radi odgovora na ovaj upit, u
            skladu sa{" "}
            <a
              href="/politika-privatnosti"
              className="font-medium text-brand-600 underline decoration-brand-200 underline-offset-4"
            >
              politikom privatnosti
            </a>
            . <span className="text-brand-500">*</span>
          </span>
        </label>

        {SITE_KEY ? <div ref={widgetRef} className="mt-6" /> : null}

        {error ? (
          <p
            role="alert"
            className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-[0.9375rem] text-red-700"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClass("primary", "lg", "mt-6 w-full")}
        >
          {status === "sending" ? "Šaljem…" : "Pošalji upit"}
          {status === "sending" ? null : (
            <Icon
              name="arrowRight"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </button>

        <p className="mt-4 text-center text-sm text-ink-400">
          Odgovaramo istog radnog dana. Bez pretplate na newsletter i bez
          prosleđivanja podataka trećim licima.
        </p>
      </form>
    </>
  );
}
