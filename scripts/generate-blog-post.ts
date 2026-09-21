/**
 * Generiše jedan novi blog post preko Claude API-ja i upisuje ga u
 * content/blog/<slug>.mdx, u istom formatu kao ručno pisani postovi.
 *
 * Pokreće se iz .github/workflows/auto-blog.yml, 3x nedeljno. Kategorija se
 * bira rotacijom kroz categories.ts (ukupan broj postojećih postova % broj
 * kategorija), da se sadržaj ravnomerno rasporedi po svih 7 kategorija.
 *
 * Model interno prolazi kroz istraživanje ključnih reči, pretragu 2 stvarna
 * konkurenta (web_search alat) i samoocenu outline-a pre pisanja — ali sve
 * to je interno rezonovanje; jedini vidljivi izlaz je JSON (title, excerpt,
 * keywords, body), da bi parsiranje bilo pouzdano. Frontmatter (datum,
 * autor, kategorija, cover) sastavlja skripta, ne model.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { categories, type CategorySlug } from "../src/lib/categories";
import { getServicesByBlogCategory } from "../src/lib/services";
import { site } from "../src/lib/site";
import { generateCover } from "./generate-cover";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const COVER_DIR = path.join(process.cwd(), "public", "blog");
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

type AnthropicContentBlock = {
  type: string;
  text?: string;
  name?: string;
  input?: unknown;
};
type AnthropicResponse = {
  content: AnthropicContentBlock[];
  stop_reason?: string;
};

const PUBLISH_TOOL_NAME = "objavi_post";

/**
 * Traži strukturisan izlaz preko tool-use-a umesto da model sam formatira
 * JSON kao tekst — API garantuje validnu strukturu (nema ručnog parsiranja
 * slobodnog teksta, koje puca čim body sadrži npr. code-blok ili navodnik).
 * web_search je server-side alat: Claude ga sam poziva po potrebi, rezultati
 * se ugrađuju u isti odgovor, nema potrebe za petljom na klijentu.
 */
async function callClaude(prompt: string, system: string): Promise<GeneratedPost> {
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
      max_tokens: 16000,
      system,
      messages: [{ role: "user", content: prompt }],
      tools: [
        { type: "web_search_20250305", name: "web_search", max_uses: 6 },
        {
          name: PUBLISH_TOOL_NAME,
          description:
            "Objavi finalni blog post. Pozovi ovo TAČNO JEDNOM, tek kad su istraživanje, outline i pisanje potpuno završeni.",
          input_schema: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "Naslov sa primarnom ključnom rečju, do ~70 karaktera.",
              },
              excerpt: {
                type: "string",
                description: "1-2 rečenice sa primarnom ključnom rečju, do ~160 karaktera.",
              },
              keywords: {
                type: "string",
                description:
                  "Ključne reči odvojene zarezom, primarna prva: 'primarna ključna reč, sekundarna 1, sekundarna 2, ...'.",
              },
              body: {
                type: "string",
                description: "Ceo tekst posta u Markdown formatu.",
              },
            },
            required: ["title", "excerpt", "keywords", "body"],
          },
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anthropic API greška ${res.status}: ${text}`);
  }

  const data = (await res.json()) as AnthropicResponse;

  if (data.stop_reason === "max_tokens") {
    throw new Error("Odgovor je odsečen na max_tokens — povećaj limit ili skrati zadatak.");
  }

  const publishCall = data.content.find(
    (block) => block.type === "tool_use" && block.name === PUBLISH_TOOL_NAME,
  );

  if (!publishCall) {
    const summary = data.content
      .map((block) => `[${block.type}] ${(block.text ?? "").slice(0, 300)}`)
      .join("\n---\n");
    throw new Error(
      `Model nije pozvao "${PUBLISH_TOOL_NAME}" (stop_reason: ${data.stop_reason}).\n${summary}`,
    );
  }

  const issues = describeGeneratedPostIssues(publishCall.input);
  if (issues.length > 0) {
    throw new Error(`Argumenti "${PUBLISH_TOOL_NAME}" ne odgovaraju očekivanom obliku:\n- ${issues.join("\n- ")}`);
  }

  return publishCall.input as GeneratedPost;
}

type GeneratedPost = {
  title: string;
  excerpt: string;
  keywords: string;
  body: string;
};

/** Vraća listu konkretnih problema (prazno = validno) — konkretnije od jednog bool-a za debug u CI logu. */
function describeGeneratedPostIssues(value: unknown): string[] {
  if (!value || typeof value !== "object") return ["input nije objekat"];
  const v = value as Record<string, unknown>;
  const issues: string[] = [];

  for (const field of ["title", "excerpt", "keywords", "body"] as const) {
    if (typeof v[field] !== "string") {
      issues.push(`${field}: očekivan string, dobijeno ${typeof v[field]} (${JSON.stringify(v[field]).slice(0, 150)})`);
    }
  }
  if (issues.length > 0) return issues;

  if ((v.keywords as string).length === 0) issues.push("keywords: prazan string");
  if ((v.body as string).length <= 500) {
    issues.push(`body: predugačko/prekratko — ${(v.body as string).length} karaktera (očekivano > 500)`);
  }
  return issues;
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

  const system = `Ti si Zvezdana iz ZIM Digital (${site.url}), digitalne agencije iz Beograda. Pišeš blog tekstove za sajt agencije, na srpskom jeziku, ekavicom, latinicom.

Ton: informativno-savetodavan, direktan, konkretan, bez marketinškog žargona i praznih fraza. Piši kao da objašnjavaš vlasniku male firme koji nema vremena — svaki pasus mora nešto da nosi. Bez emotikona, bez uzvičnika u nizu.

Pre pisanja, interno (ne prikazuj ovaj proces u odgovoru) prođi kroz sledeće korake:

1. IZBOR TEME I KLJUČNIH REČI — na osnovu kategorije i liste postojećih naslova (ispod), izaberi konkretnu podtemu koja još nije obrađena. Odredi JEDNU primarnu ključnu reč (frazu koju bi neko realno ukucao u Google) i 3-5 sekundarnih ključnih reči.

2. ISTRAŽIVANJE KONKURENCIJE — koristi web_search da pronađeš 2 stvarna članka/stranice koji se rangiraju za primarnu ključnu reč (po mogućstvu na srpskom tržištu). Za svaki zabeleži (samo interno) H2/H3 strukturu i oceni 1-10 po: 1) poklapanje sa search intentom, 2) pokrivenost podtema, 3) logički tok i dubina, 4) specifičnost za publiku malih firmi u Srbiji, 5) jasnoća naslova. Odluči šta preuzimaš kao inspiraciju za strukturu, a šta izbegavaš. NIKAD ne pominji, ne citiraj i ne linkuješ te konkurente u finalnom tekstu — ovo je samo tvoje interno istraživanje.

3. OUTLINE — napravi sopstveni outline (H2/H3) na osnovu koraka 1-2, oceni ga istom rubrikom, popravi slabe tačke.

4. PISANJE — napiši finalni tekst po pravilima ispod.

PRAVILA STRUKTURE za "body" (Markdown):
- Prva rečenica MORA direktno odgovoriti na search intent primarne ključne reči — nema H1 u telu teksta (naslov stranice se prikazuje odvojeno, iznad tela).
- 4-7 sekcija sa ## naslovima (H2), po potrebi ### podnaslovi (H3). Numeracija u naslovima SAMO ako je heading zaista korak u nizu (npr. "1. Proveri...", "2. Podesi...") — nikad kao dekoracija.
- Ispod SVAKOG naslova mora postojati sadržaj — nema praznih sekcija.
- Svaki pasus je 2-5 rečenica, pravi pasus, ne jedna izolovana rečenica.
- Liste (- ili numerisane) koristi štedljivo, samo kad nabrajanje ima više smisla od proze — daj prednost punim pasusima ispod podnaslova.
- Poslednja sekcija pre zaključka: "## Najčešća pitanja" sa TAČNO 3 pitanja kao ### podnaslovi, svako sa jednim pasusom odgovora (2-4 rečenice).
- Poslednji pasus posle FAQ-a: kratak zaključak + poziv na akciju koji linkuje na 1-2 relevantne stranice usluga i na /kontakt, u formatu [tekst linka](/putanja).
- Dužina "body": 900-1400 reči.

STROGA PRAVILA:
- Samo čist Markdown: ##, ###, **bold**, - liste, 1. liste, > citat, [tekst](url). NIKAD sirovi HTML ili JSX tagovi (bez <div>, <span>, <br> i sl.).
- Izbegavaj znakove < i { van code-blokova/linkova — tekst se parsira kao MDX i ti znakovi lome build ako nisu u ispravnom kontekstu.
- Linkuj SAMO interne putanje iz liste ispod, ili opšte poznate spoljne domene (npr. google.com, support.google.com) ako je zaista relevantno. NIKAD ne linkuj konkurente koje si pronašla pretragom.
- NIKAD ne izmišljaj konkretne klijentske sajtove, imena firmi, brojke, cene ili testimonijale koje ne možeš da potvrdiš — piši opštu, tačnu stručnu perspektivu.
- Naslov i excerpt MORAJU prirodno sadržati primarnu ključnu reč.
- Ne ponavljaj temu koja je već obrađena u postojećim postovima.

Dozvoljeni interni linkovi za ovaj tekst:
${serviceLinks}
- /kontakt — kontakt stranica

Kad su istraživanje, outline i pisanje potpuno završeni, pozovi alat "${PUBLISH_TOOL_NAME}" TAČNO JEDNOM sa finalnim sadržajem. To je jedini način da završiš zadatak — ne piši finalni tekst kao običnu poruku.`;

  const prompt = `Napiši nov blog post za kategoriju "${categoryInfo.name}" (${categoryInfo.description}).

Postojeći naslovi na blogu (izbegavaj ponavljanje teme):
${otherTitles || "(bloga još nema postova)"}

Prođi kroz sve interne korake (izbor teme, pretraga konkurencije preko web_search, outline, pisanje), pa pozovi "${PUBLISH_TOOL_NAME}" sa finalnim postom.`;

  console.log(`Generišem post za kategoriju "${category}"...`);
  const parsed = await callClaude(prompt, system);

  // Naslov ide i u frontmatter i u GITHUB_OUTPUT (jedan red po vrednosti),
  // pa mu se prelomi linije uklanjaju da ne pokvare oba formata.
  const title = parsed.title.replace(/\s*\r?\n\s*/g, " ").trim();
  const slug = uniqueSlug(slugify(title), existing);
  const keywords = parsed.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  console.log("Pravim cover sliku...");
  fs.mkdirSync(COVER_DIR, { recursive: true });
  const coverBuffer = await generateCover({ title, categoryName: categoryInfo.name });
  fs.writeFileSync(path.join(COVER_DIR, `${slug}.webp`), coverBuffer);

  const frontmatter = {
    title,
    excerpt: parsed.excerpt,
    date: todayIso(),
    category,
    author: AUTHOR,
    cover: `/blog/${slug}.webp`,
    keywords,
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
    fs.appendFileSync(githubOutput, `cover=public/blog/${slug}.webp\n`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
