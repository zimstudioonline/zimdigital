import type { Metadata } from "next";

import { PostCard } from "@/components/cards";
import { CategoryChips } from "@/components/category-chips";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Section } from "@/components/ui";
import { countPostsByCategory, getAllPosts, getFeaturedPost } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktični tekstovi o SEO-u, Google i Facebook oglašavanju, WordPress-u, e-commerce-u i AI automatizaciji — napisani za vlasnike biznisa, ne za agencije.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const rest = featured
    ? posts.filter((post) => post.slug !== featured.slug)
    : posts;
  const counts = countPostsByCategory();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Kako da ti digitalni marketing zaista donese novac"
        description="Pišemo o onome što svakodnevno radimo — bez prepisanih stranih tekstova i bez saveta koji ne važe za domaće tržište."
        breadcrumbs={[
          { name: "Početna", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      >
        <div className="mt-9">
          <CategoryChips counts={counts} />
        </div>
      </PageHero>

      {posts.length === 0 ? (
        <Section>
          <Container size="narrow">
            <p className="text-center text-lg text-ink-500">
              Prvi tekstovi stižu uskoro.
            </p>
          </Container>
        </Section>
      ) : (
        <Section>
          <Container size="wide">
            {featured ? (
              <Reveal>
                <PostCard post={featured} featured />
              </Reveal>
            ) : null}

            {rest.length > 0 ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, index) => (
                  <Reveal key={post.slug} delay={index * 60}>
                    <PostCard post={post} />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </Container>
        </Section>
      )}

      <CtaSection
        title="Nemaš vremena da sve ovo radiš sam?"
        description="Za to smo tu. Pošalji adresu sajta i javljamo se sa konkretnim predlogom šta prvo popraviti."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Početna", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${site.url}/blog#blog`,
          name: `${site.name} blog`,
          url: `${site.url}/blog`,
          inLanguage: "sr-RS",
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
