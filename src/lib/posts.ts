import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { isCategorySlug, type CategorySlug } from "@/lib/categories";

/**
 * Blog postovi žive kao .mdx fajlovi u /content/blog.
 *
 * Kako se dodaje post:
 *   1. napravi content/blog/<slug>.mdx
 *   2. popuni frontmatter (vidi tip Post ispod)
 *   3. piši tekst u Markdownu — commit i deploy = objavljeno
 *
 * Frontmatter se čita preko `fs` u toku builda (sve blog strane su statički
 * generisane), a sam sadržaj se uvozi kao MDX komponenta. Zato se ni jedno
 * ni drugo ne izvršava u runtime-u na Workers-u.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO datum: YYYY-MM-DD */
  date: string;
  /** Datum poslednje izmene — prikazuje se i šalje u schema.org */
  updated?: string;
  category: CategorySlug;
  author: string;
  /** Putanja do naslovne slike u /public, opciono */
  cover?: string;
  /** Ključne reči za SEO i internu upotrebu */
  keywords: string[];
  /** Procenjeno vreme čitanja u minutima */
  readingTime: number;
  featured: boolean;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function readingTimeOf(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  // ~200 reči u minutu za srpski tekst
  return Math.max(1, Math.round(words / 200));
}

function parseFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const category = String(data.category ?? "");
  if (!isCategorySlug(category)) {
    throw new Error(
      `Post "${slug}" ima nepoznatu kategoriju "${category}". Dozvoljene su u src/lib/categories.ts.`,
    );
  }

  if (!data.title || !data.date) {
    throw new Error(`Post "${slug}" nema obavezan frontmatter (title, date).`);
  }

  return {
    slug,
    title: String(data.title),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date),
    updated: data.updated ? String(data.updated) : undefined,
    category,
    author: String(data.author ?? "ZIM Digital"),
    cover: data.cover ? String(data.cover) : undefined,
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    readingTime: readingTimeOf(content),
    featured: Boolean(data.featured),
  };
}

let cache: Post[] | undefined;

export function getAllPosts(): Post[] {
  if (cache) return cache;

  if (!fs.existsSync(CONTENT_DIR)) {
    cache = [];
    return cache;
  }

  cache = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parseFile)
    .sort((a, b) => b.date.localeCompare(a.date));

  return cache;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getFeaturedPost(): Post | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.featured) ?? posts[0];
}

/** Postovi iz iste kategorije, bez trenutnog; dopunjeno najnovijima. */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const sameCategory = getAllPosts().filter(
    (candidate) =>
      candidate.slug !== post.slug && candidate.category === post.category,
  );

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const rest = getAllPosts().filter(
    (candidate) =>
      candidate.slug !== post.slug &&
      !sameCategory.some((item) => item.slug === candidate.slug),
  );

  return [...sameCategory, ...rest].slice(0, limit);
}

export function countPostsByCategory(): Record<string, number> {
  return getAllPosts().reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1;
    return acc;
  }, {});
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("sr-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
