/**
 * Generiše jedan novi blog post preko Claude API-ja i upisuje ga u
 * content/blog/<slug>.mdx, u istom formatu kao ručno pisani postovi.
 *
 * Pokreće se iz .github/workflows/auto-blog.yml, 3x nedeljno. Kategorija se
 * bira rotacijom kroz categories.ts (ukupan broj postojećih postova % broj
 * kategorija), da se sadržaj ravnomerno rasporedi po svih 7 kategorija.
 *
 * Traži se JSON odgovor (title, excerpt, keywords, body) da bi parsiranje
 * bilo pouzdano — frontmatter (datum, autor, kategorija) sastavlja skripta,
 * ne model.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { categories, type CategorySlug } from "../src/lib/categories";
import { getServicesByBlogCategory } from "../src/lib/services";
import { site } from "../src/lib/site";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const MODEL = "claude-sonnet-5";
const AUTHOR = "ZIM Digital";

type ExistingPost = {
  slug: string;
  title: string;
  category: string;
  keywords: string[];
};

function readExistingPosts(): ExistingPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title ?? ""),
        category: String(data.category ?? ""),
        keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
      };
    });
}

function pickCategory(existing: ExistingPost[]): CategorySlug {
  const index = existing.length % categories.length;
  return categories[index].slug;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/đ/g, "dj")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // skini dijakritike: č/ć→c, š→s, ž→z, e→e...
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function uniqueSlug(base: string, existing: ExistingPost[]): string {
  const taken = new Set(existing.map((p) => p.slug));
  if (!taken.has(base)) return base;
  let i = 2;
  while (taken.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

async function callClaude(prompt: string, system: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY nije podešen.");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      system,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anthropic API greška ${res.status}: ${text}`);
  }

  const data = (await res.json()) as { content: { type: string; text?: string }[] };
  const textBlock = data.content.find((block) => block.type === "text");
  if (!textBlock?.text) throw new Error("Odgovor nema tekstualni sadržaj.");
  return textBlock.text;
}

function extractJson(raw: string): unknown {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonText = fenced ? fenced[1] : raw;
  return JSON.parse(jsonText.trim());
}

type GeneratedPost = {
  title: string;
  excerpt: string;
  keywords: string[];
  body: string;
};

function isGeneratedPost(value: unknown): value is GeneratedPost {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.title === "string" &&
    typeof v.excerpt === "string" &&
    Array.isArray(v.keywords) &&
    v.keywords.every((k) => typeof k === "string") &&
    typeof v.body === "string" &&
    v.body.length > 500
  );
}

async function main() {
  const existing = readExistingPosts();
  const category = pickCategory(existing);
  const categoryInfo = categories.find((c) => c.slug === category)!;
  const relatedServices = getServicesByBlogCategory(category);

  const otherTitles = existing.map((p) => `- (${p.category}) ${p.title}`).join("\n");
  const serviceLinks = relatedServices
    .map((s) => `- /usluge/${s.slug} — ${s.title}: ${s.tagline}`)
    .join("\n") || "- (nema direktno vezanih usluga za ovu kategoriju, koristi samo /kontakt)";

  const system = `Ti si Zvezdana iz ZIM Digital (${site.url}), digitalne agencije iz Beograda. Pišeš blog tekstove za sajt agencije, na srpskom jeziku, latinicom.

Ton: direktan, konkretan, bez marketinškog žargona i praznih fraza. Piši kao da objašnjavaš vlasniku male firme koji nema vremena — svaki pasus mora nešto da nosi. Kratke rečenice. Bez emotikona, bez uzvičnika u nizu.

Struktura teksta (u "body" polju, kao Markdown):
- Uvod od 2-4 rečenice BEZ naslova, koji uhvati pažnju konkretnim problemom ili situacijom.
- 4-7 sekcija sa ## naslovima (## se broji kao H2, ne koristi H1).
- Bar jedna lista (- ili numerisana).
- Po potrebi ## podnaslov sa ### za pod-sekcije.
- Poneki > blockquote sa jednom jakom, sažetom rečenicom (nije obavezno u svakom tekstu).
- Poslednji pasus: kratak zaključak + poziv na akciju koji linkuje na 1-2 relevantne stranice usluga i na /kontakt, u formatu [tekst linka](/putanja).

STROGA PRAVILA za "body":
- Samo čist Markdown: ##, ###, **bold**, - liste, 1. liste, > citat, [tekst](url). NIKAD sirovi HTML ili JSX tagovi (bez <div>, <span>, <br> i sl.).
- Izbegavaj znakove < i { van code-blokova/linkova — tekst se parsira kao MDX i ti znakovi lome build ako nisu u ispravnom kontekstu.
- Linkuj SAMO interne putanje iz liste ispod, ili opšte poznate spoljne domene (npr. google.com, support.google.com) ako je zaista relevantno. NIKAD ne izmišljaj konkretne klijentske sajtove, imena firmi, brojke, cene, ili testimonijale koje ne možeš da potvrdiš — piši opštu, tačnu stručnu perspektivu.
- Ne ponavljaj temu koja je već obrađena u postojećim postovima (lista ispod) — nađi nov ugao ili podtemu.
- Dužina "body": 800-1300 reči.

Dozvoljeni interni linkovi za ovaj tekst:
${serviceLinks}
- /kontakt — kontakt stranica

Vrati ISKLJUČIVO validan JSON (bez markdown ograde, bez komentara), sa poljima:
{
  "title": "naslov teksta, bez navodnika unutra, do ~70 karaktera",
  "excerpt": "1-2 rečenice, do ~160 karaktera, sažetak za listu postova",
  "keywords": ["3 do 5 ključnih fraza na srpskom"],
  "body": "ceo tekst u Markdown formatu, kao što je opisano gore"
}`;

  const prompt = `Napiši nov blog post za kategoriju "${categoryInfo.name}" (${categoryInfo.description}).

Postojeći naslovi na blogu (izbegavaj ponavljanje teme):
${otherTitles || "(bloga još nema postova)"}

Vrati samo JSON opisan u sistemskoj poruci.`;

  console.log(`Generišem post za kategoriju "${category}"...`);
  const raw = await callClaude(prompt, system);
  const parsed = extractJson(raw);

  if (!isGeneratedPost(parsed)) {
    console.error("Neispravan odgovor modela:", raw.slice(0, 2000));
    throw new Error("Model nije vratio očekivani JSON oblik posta.");
  }

  // Naslov ide i u frontmatter i u GITHUB_OUTPUT (jedan red po vrednosti),
  // pa mu se prelomi linije uklanjaju da ne pokvare oba formata.
  const title = parsed.title.replace(/\s*\r?\n\s*/g, " ").trim();
  const slug = uniqueSlug(slugify(title), existing);
  const frontmatter = {
    title,
    excerpt: parsed.excerpt,
    date: todayIso(),
    category,
    author: AUTHOR,
    keywords: parsed.keywords,
  };

  const file = matter.stringify(`\n${parsed.body.trim()}\n`, frontmatter);
  const outPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  fs.writeFileSync(outPath, file, "utf8");

  console.log(`Napisano: content/blog/${slug}.mdx`);
  console.log(`Naslov: ${title}`);

  // Za GitHub Actions — sledeći koraci u workflow-u čitaju putanju odavde.
  const githubOutput = process.env.GITHUB_OUTPUT;
  if (githubOutput) {
    fs.appendFileSync(githubOutput, `slug=${slug}\n`);
    fs.appendFileSync(githubOutput, `title=${title}\n`);
    fs.appendFileSync(githubOutput, `file=content/blog/${slug}.mdx\n`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
