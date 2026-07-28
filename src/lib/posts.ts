export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO (YYYY-MM-DD)
  content: string;
};

// Privremeni izvor podataka. Kada odlučiš kako pišeš postove
// (MDX fajlovi, CMS, D1...), zameni samo ove dve funkcije ispod —
// stranice u src/app/blog ostaju iste.
const posts: Post[] = [
  {
    slug: "prvi-post",
    title: "Prvi post",
    excerpt: "Placeholder post da se vidi kako izgleda lista i pojedinačna strana.",
    date: "2026-07-28",
    content:
      "Ovo je placeholder sadržaj. Zameni izvor podataka u src/lib/posts.ts.",
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
