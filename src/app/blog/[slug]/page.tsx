import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { Icon } from "@/components/icons";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { Logo } from "@/components/logo";
import { Breadcrumbs } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Pill, Section } from "@/components/ui";
import { getCategory } from "@/lib/categories";
import {
  formatDate,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Sve strane su prerenderovane u buildu — nema fs pristupa u runtime-u.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // MDX se uvozi kao komponenta; bundler pravi context modul za ceo folder.
  const { default: Content } = await import(
    `../../../../content/blog/${slug}.mdx`
  );

  const category = getCategory(post.category);
  const related = getRelatedPosts(post);

  const crumbs = [
    { name: "Početna", href: "/" },
    { name: "Blog", href: "/blog" },
    ...(category
      ? [{ name: category.name, href: `/blog/kategorija/${category.slug}` }]
      : []),
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <article>
        {/* Zaglavlje teksta */}
        <header className="relative overflow-hidden border-b border-ink-100">
          <div aria-hidden className="absolute inset-0 -z-10 bg-mesh" />

          <Container size="narrow" className="pb-14 pt-10 sm:pb-16 sm:pt-14">
            <Breadcrumbs items={crumbs} />

            <Reveal>
              <div className="flex flex-wrap items-center gap-3 text-sm text-ink-400">
                {category ? (
                  <Link
                    href={`/blog/kategorija/${category.slug}`}
                    className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700 transition-colors hover:bg-brand-100"
                  >
                    {category.name}
                  </Link>
                ) : null}
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTime} min čitanja</span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-5 text-balance text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-ink-900 sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
            </Reveal>

            {post.excerpt ? (
              <Reveal delay={120}>
                <p className="mt-6 text-pretty text-lg leading-8 text-ink-500">
                  {post.excerpt}
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={180}>
              <div className="mt-8 flex items-center gap-3 border-t border-ink-100 pt-6">
                <Logo className="size-9" />
                <div className="text-sm">
                  <span className="block font-medium text-ink-900">
                    {post.author}
                  </span>
                  <span className="block text-ink-400">
                    {post.updated
                      ? `Ažurirano ${formatDate(post.updated)}`
                      : "ZIM Digital"}
                  </span>
                </div>
              </div>
            </Reveal>
          </Container>
        </header>

        {/* Naslovna slika */}
        {post.cover ? (
          <Container size="narrow" className="pt-10 sm:pt-12">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-ink-100 shadow-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.cover}
                  alt={post.title}
                  className="block w-full"
                />
              </div>
            </Reveal>
          </Container>
        ) : null}

        {/* Sadržaj */}
        <Container size="narrow" className="py-14 sm:py-16">
          <div className="[&>*:first-child]:mt-0">
            <Content />
          </div>

          {post.keywords.length > 0 ? (
            <div className="mt-14 flex flex-wrap gap-2 border-t border-ink-100 pt-8">
              {post.keywords.map((keyword) => (
                <Pill key={keyword}>{keyword}</Pill>
              ))}
            </div>
          ) : null}

          <div className="mt-10">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink-500 transition-colors hover:text-ink-900"
            >
              <Icon
                name="arrowRight"
                className="size-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
              />
              Nazad na blog
            </Link>
          </div>
        </Container>
      </article>

      {/* Slični tekstovi */}
      {related.length > 0 ? (
        <Section className="border-t border-ink-100 bg-ink-50/50">
          <Container size="wide">
            <h2 className="text-2xl font-semibold tracking-tight text-ink-900">
              Pročitaj i ovo
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 70}>
                  <PostCard post={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaSection />

      <JsonLd
        data={breadcrumbSchema(
          crumbs.map((crumb) => ({ name: crumb.name, url: crumb.href })),
        )}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          inLanguage: "sr-RS",
          author: { "@type": "Organization", name: post.author },
          publisher: { "@id": `${site.url}/#organization` },
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
          keywords: post.keywords.join(", "),
          ...(post.cover ? { image: `${site.url}${post.cover}` } : {}),
        }}
      />
    </>
  );
}
