import { NextResponse } from "next/server";

import { site } from "@/lib/site";

/**
 * Prijem kontakt forme: Turnstile provera → slanje mejla preko Resend-a.
 *
 * Potrebne promenljive okruženja (`.dev.vars` lokalno, `wrangler secret` u produkciji):
 *   RESEND_API_KEY              — API ključ sa resend.com
 *   CONTACT_FROM_EMAIL          — pošiljalac, mora biti na verifikovanom domenu
 *   CONTACT_TO_EMAIL            — inboks na koji stižu upiti
 *   TURNSTILE_SECRET_KEY        — tajni ključ Cloudflare Turnstile widget-a
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY — javni ključ (čita ga klijent)
 */

export const dynamic = "force-dynamic";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_URL = "https://api.resend.com/emails";

type Payload = {
  ime?: string;
  email?: string;
  telefon?: string;
  sajt?: string;
  usluga?: string;
  poruka?: string;
  saglasnost?: boolean;
  turnstileToken?: string;
  /** Honeypot — pravi korisnik ga nikad ne popunjava. */
  kompanija?: string;
};

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function verifyTurnstile(
  token: string | undefined,
  secret: string,
  ip: string | null,
): Promise<boolean> {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token ?? "");
  if (ip) body.append("remoteip", ip);

  const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
  if (!response.ok) return false;

  const result = (await response.json()) as { success: boolean };
  return result.success === true;
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return bad("Neispravan format zahteva.");
  }

  // Honeypot: tiho odbijamo botove uz „uspešan“ odgovor.
  if (data.kompanija) {
    return NextResponse.json({ ok: true });
  }

  const ime = data.ime?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const poruka = data.poruka?.trim() ?? "";

  if (ime.length < 2) return bad("Unesi ime i prezime.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("Unesi ispravnu email adresu.");
  if (poruka.length < 10) return bad("Napiši bar nekoliko rečenica o projektu.");
  if (!data.saglasnost) return bad("Potrebna je saglasnost za obradu podataka.");

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const ip = request.headers.get("CF-Connecting-IP");
    const valid = await verifyTurnstile(data.turnstileToken, turnstileSecret, ip);
    if (!valid) return bad("Nismo uspeli da potvrdimo da nisi robot. Pokušaj ponovo.");
  } else if (process.env.NODE_ENV === "production") {
    console.error("TURNSTILE_SECRET_KEY nije postavljen — forma je nezaštićena.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    // Lokalni razvoj bez podešenog Resend-a: upiši u log, ne ruši formu.
    console.warn("RESEND_API_KEY ili CONTACT_FROM_EMAIL nisu postavljeni. Upit:", {
      ime,
      email,
      telefon: data.telefon,
      usluga: data.usluga,
    });
    if (process.env.NODE_ENV === "production") {
      return bad("Slanje trenutno nije dostupno. Piši nam direktno na " + to, 500);
    }
    return NextResponse.json({ ok: true, dev: true });
  }

  const rows: [string, string][] = [
    ["Ime i prezime", ime],
    ["Email", email],
    ["Telefon", data.telefon?.trim() || "—"],
    ["Sajt", data.sajt?.trim() || "—"],
    ["Usluga", data.usluga?.trim() || "—"],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.6;color:#0d1118">
      <h2 style="margin:0 0 16px">Novi upit sa sajta</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#6b7488">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px">Poruka</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(poruka)}</p>
    </div>
  `;

  const response = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Upit sa sajta — ${ime}${data.usluga ? ` (${data.usluga})` : ""}`,
      html,
    }),
  });

  if (!response.ok) {
    console.error("Resend greška:", response.status, await response.text());
    return bad("Slanje nije uspelo. Pokušaj ponovo ili nam piši direktno.", 502);
  }

  return NextResponse.json({ ok: true });
}
