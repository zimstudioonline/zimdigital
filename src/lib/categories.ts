/**
 * Kategorije bloga. Slug kategorije se koristi u frontmatter-u MDX postova
 * (`category: seo`) i u URL-u /blog/kategorija/<slug>.
 */

export const categories = [
  {
    slug: "seo",
    name: "SEO",
    description:
      "Optimizacija za pretraživače — tehnički SEO, ključne reči, sadržaj i link building.",
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    description:
      "Search, Shopping i Performance Max kampanje, budžeti i optimizacija cene po konverziji.",
  },
  {
    slug: "facebook-ads",
    name: "Facebook Ads",
    description:
      "Oglašavanje na Facebook-u i Instagram-u: kreative, publike i remarketing.",
  },
  {
    slug: "ai",
    name: "AI",
    description:
      "Veštačka inteligencija u marketingu i automatizaciji svakodnevnih poslova.",
  },
  {
    slug: "wordpress",
    name: "WordPress",
    description:
      "WordPress, Elementor, Bricks Builder, brzina, bezbednost i održavanje sajtova.",
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    description:
      "Online prodavnice, WooCommerce i Shopify, konverzije i prodaja na internetu.",
  },
  {
    slug: "digitalni-marketing",
    name: "Digitalni marketing",
    description:
      "Strategija, email marketing, analitika i sve što povezuje pojedinačne kanale u celinu.",
  },
] as const;

export type Category = (typeof categories)[number];
export type CategorySlug = Category["slug"];

export const categorySlugs = categories.map((category) => category.slug);

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function isCategorySlug(value: string): value is CategorySlug {
  return categorySlugs.includes(value as CategorySlug);
}
