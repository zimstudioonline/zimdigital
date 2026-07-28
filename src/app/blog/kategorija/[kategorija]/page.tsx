import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/cards";
import { CategoryChips } from "@/components/category-chips";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Section } from "@/components/ui";
import { categories, getCategory, isCategorySlug } from "@/lib/categories";
import { countPostsByCategory, getPostsByCategory } from "@/lib/posts";

type Props = { params: Promise<{ kategorija: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ kategorija: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategorija } = await params;
  const category = getCategory(kategorija);
  if (!category) return {};

  return {
    title: `${category.name} — tekstovi`,
    description: category.description,
    alternates: { canonical: `/blog/kategorija/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { kategorija } = await params;
  if (!isCategorySlug(kategorija)) notFound();

  const category = getCategory(kategorija);
  if (!category) notFound();

  const posts = getPostsByCategory(kategorija);
  const counts = countPostsByCategory();

  return (
    <>
      <PageHero
        eyebrow="Kategorija"
        title={category.name}
        description={category.description}
        breadcrumbs={[
          { name: "Početna", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: category.name, href: `/blog/kategorija/${category.slug}` },
        ]}
      >
        <div className="mt-9">
          <CategoryChips active={category.slug} counts={counts} />
        </div>
      </PageHero>

      <Section>
        <Container size="wide">
          {posts.length === 0 ? (
            <p className="text-center text-lg text-ink-500">
              U ovoj kategoriji još nema tekstova. Vrati se uskoro.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 60}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <CtaSection />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Početna", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: category.name, url: `/blog/kategorija/${category.slug}` },
        ])}
      />
    </>
  );
}
