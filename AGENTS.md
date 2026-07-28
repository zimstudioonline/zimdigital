# AGENTS.md

Guidance for coding agents working in this repository.

## Commands

```bash
npm run dev              # Next dev server (localhost:3000) — has Cloudflare bindings via initOpenNextCloudflareForDev()
npm run build            # Plain `next build` — does NOT produce the Worker bundle
npm run lint             # eslint (flat config)
npm run preview          # OpenNext build + populateCache + run the actual Worker locally (workerd)
npm run deploy           # OpenNext build + deploy to Cloudflare
npm run cf-typegen       # Regenerate cloudflare-env.d.ts after changing bindings in wrangler.jsonc
```

There is no test runner configured.

`npm run dev` runs on Node, `npm run preview` runs on workerd. Anything touching Cloudflare bindings, `global_fetch_strictly_public`, or Node-API compatibility must be verified with `preview`, not `dev`.

**Do not verify with bare `wrangler dev`.** SSG pages are served from the incremental cache, which only lands in `.open-next/assets/cdn-cgi/` after `opennextjs-cloudflare populateCache`. `npm run preview` runs that step; `wrangler dev` alone does not, and every `generateStaticParams` route 404s.

## Architecture

Next.js 16 App Router deployed to **Cloudflare Workers** via `@opennextjs/cloudflare` (not Vercel, despite the stock README). The deployment chain:

1. `opennextjs-cloudflare build` reads `open-next.config.ts` and emits `.open-next/worker.js` + `.open-next/assets`
2. `wrangler.jsonc` points `main` at that worker and serves `.open-next/assets` through the `ASSETS` binding
3. `next.config.ts` calls `initOpenNextCloudflareForDev()` at module scope so `next dev` can see bindings

Consequences to keep in mind:
- `open-next.config.ts` uses `staticAssetsIncrementalCache` — prerendered HTML is read from the `ASSETS` binding. It is **read-only**: introducing ISR (`revalidate`) requires swapping to the R2 or KV incremental cache override plus the matching binding in `wrangler.jsonc`.
- New bindings go in `wrangler.jsonc`, then `npm run cf-typegen` to refresh `cloudflare-env.d.ts` (generated, gitignored, very large — never edit by hand).
- `.dev.vars` holds local-only env (gitignored). Production secrets go through `wrangler secret put`.
- `public/_headers` sets immutable caching for `/_next/static/*`; asset headers are configured there, not in `next.config.ts`.

### Content layer

Everything the site renders comes from four files in `src/lib/`. Changing content means editing data, not JSX:

| File | Owns |
| --- | --- |
| `site.ts` | Brand, contact details, address, socials, hero stats, service areas |
| `services.ts` | All 9 services with full page content (intro, deliverables, process, FAQ) |
| `projects.ts` | Portfolio entries and their result metrics |
| `categories.ts` | Blog categories — the single source of valid `category` frontmatter values |

`src/lib/navigation.ts` derives the header/footer menus from `services.ts`, so adding a service to that array adds it to the mega menu, `/usluge`, the footer, the sitemap and the contact-form dropdown at once.

### Blog

Posts are `.mdx` files in `content/blog/`. One file per post; the filename is the slug.

- `src/lib/posts.ts` reads frontmatter with `fs` + `gray-matter` **at build time** and validates `category` against `categories.ts` (an unknown category fails the build on purpose).
- `src/app/blog/[slug]/page.tsx` renders the body via `await import(\`../../../../content/blog/${slug}.mdx\`)`.
- Both blog routes set `export const dynamicParams = false`, so every page is prerendered and `fs` never runs on workerd. **Do not remove that export** — it is what keeps the `fs` usage safe.
- MDX element styling lives in `src/mdx-components.tsx`, not in the posts.
- `next.config.ts` passes remark/rehype plugins **as strings** (`[["remark-frontmatter", "yaml"], ...]`) because Turbopack requires serializable loader options; imported plugin functions fail the build.

### Contact form

`src/components/contact-form.tsx` (client) → `src/app/api/kontakt/route.ts` (dynamic) → Turnstile siteverify → Resend API.

Env vars: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. When keys are absent the route degrades gracefully: in dev it logs and returns `{ok:true, dev:true}`; in production it returns a readable error. The form also has a honeypot field (`kompanija`).

## Conventions

- Site language is Serbian (`lang="sr"`, `toLocaleDateString("sr-RS")`); code comments are in Serbian — match that.
- Route params are `Promise`-wrapped: `type Props = { params: Promise<{ slug: string }> }` and `await params`.
- Tailwind v4 via `@tailwindcss/postcss` — no `tailwind.config`. Theme tokens (`ink-*`, `brand-*`, `accent-*`, shadows, `bg-mesh`, `bg-grid`, `glass`, `text-gradient`) live in `src/app/globals.css`.
- **Light theme only.** No `dark:` variants — don't reintroduce them.
- Shared primitives are in `src/components/ui.tsx` (`Container`, `Section`, `SectionHeading`, `Button`, `Card`, `Pill`, `IconBubble`). Icons are hand-written SVGs in `src/components/icons.tsx` — add to that set rather than pulling in an icon library.
- Scroll animations use `<Reveal>` (IntersectionObserver) + `[data-reveal]` CSS. Respect `prefers-reduced-motion`, which the CSS already handles.
- Every page ships schema.org via `src/components/json-ld.tsx` helpers and sets `alternates.canonical`.
- Import alias `@/*` → `./src/*`.
- Build output dirs `.open-next/`, `.wrangler/`, and `cloudflare-env.d.ts` are eslint-ignored and gitignored.

## Placeholders

`src/lib/site.ts`, `src/lib/projects.ts` and `src/app/portfolio/page.tsx` contain values marked `PLACEHOLDER` (phone, email, address, map embed, stats, testimonials). The legal pages carry `TODO(Milan)` markers. Don't invent replacements — ask.
