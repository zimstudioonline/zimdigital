import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article>
      <Link href="/blog" className="text-sm opacity-60 hover:underline">
        ← Nazad na blog
      </Link>

      <time dateTime={post.date} className="mt-8 block text-sm opacity-60">
        {new Date(post.date).toLocaleDateString("sr-RS", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>

      <h1 className="mt-1 text-3xl font-semibold tracking-tight">
        {post.title}
      </h1>

      <div className="mt-8 leading-relaxed">{post.content}</div>
    </article>
  );
}
