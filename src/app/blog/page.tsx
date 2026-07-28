import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>

      {posts.length === 0 ? (
        <p className="mt-8 opacity-70">Još nema objavljenih postova.</p>
      ) : (
        <ul className="mt-8 space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <time dateTime={post.date} className="text-sm opacity-60">
                  {new Date(post.date).toLocaleDateString("sr-RS", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h2 className="mt-1 text-xl font-medium">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 opacity-80">{post.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
