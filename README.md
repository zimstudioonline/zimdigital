# ZIM Digital

Sajt digitalne agencije: Next.js 16 (App Router) + Tailwind v4, hostovan na **Cloudflare Workers** preko `@opennextjs/cloudflare`. Bez baze podataka i bez admin panela — sav sadržaj je u repou.

## Pokretanje

```bash
npm install
npm run dev        # http://localhost:3000
```

| Komanda | Šta radi |
| --- | --- |
| `npm run dev` | Razvojni server (Node) |
| `npm run build` | `next build` — provera da li sve prolazi |
| `npm run lint` | ESLint |
| `npm run preview` | Pravi Worker i pokreće ga lokalno (workerd) — **ovim se proverava produkciono ponašanje** |
| `npm run deploy` | Build + deploy na Cloudflare |

> Pre deploy-a uvek pokreni `npm run preview`, ne `wrangler dev`. Statičke stranice se serviraju iz keša koji popunjava tek `preview`/`deploy`.

## Kako se dodaje blog post

1. Napravi fajl `content/blog/naziv-posta.mdx` — ime fajla je URL (`/blog/naziv-posta`).
2. Na vrh stavi frontmatter:

```mdx
---
title: "Naslov teksta"
excerpt: "Jedna do dve rečenice — prikazuju se na kartici i u Google rezultatu."
date: "2026-08-15"
category: "seo"
author: "ZIM Digital"
featured: false
keywords:
  - "ključna reč"
  - "druga ključna reč"
---

Tekst se piše u Markdownu.

## Podnaslov

- lista
- **podebljano**
- [link ka usluzi](/usluge/seo-optimizacija)
```

3. Commit i `npm run deploy`. To je sve.

**Dozvoljene kategorije** (`category`): `seo`, `google-ads`, `facebook-ads`, `ai`, `wordpress`, `e-commerce`, `digitalni-marketing`. Ako upišeš nepostojeću, build namerno pukne uz jasnu poruku.

Opciona polja: `updated` (datum izmene), `cover` (putanja do slike u `/public`), `featured: true` (izdvojen post na vrhu bloga — samo jedan).

## Gde se šta menja

| Šta | Fajl |
| --- | --- |
| Telefon, email, adresa, mapa, društvene mreže, brojke na početnoj | `src/lib/site.ts` |
| Usluge (tekstovi, procesi, česta pitanja) | `src/lib/services.ts` |
| Portfolio projekti i rezultati | `src/lib/projects.ts` |
| Kategorije bloga | `src/lib/categories.ts` |
| Utisci klijenata | `src/app/portfolio/page.tsx` |
| Boje, senke, tipografija | `src/app/globals.css` |

Meni u zaglavlju i podnožju se generiše automatski iz `services.ts` — dodavanje usluge tamo dodaje je svuda.

## Kontakt forma

Radi preko Cloudflare Turnstile (zaštita od botova) i Resend-a (slanje mejla). Potrebne promenljive:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_FROM_EMAIL      # npr. sajt@zimdigital.rs (verifikovan domen na Resend-u)
npx wrangler secret put CONTACT_TO_EMAIL        # inboks na koji stižu upiti
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put NEXT_PUBLIC_TURNSTILE_SITE_KEY
```

Lokalno iste vrednosti idu u `.dev.vars` (fajl je u `.gitignore`). Dok ključevi nisu postavljeni, forma radi u „dry run“ režimu i ne šalje mejl.
