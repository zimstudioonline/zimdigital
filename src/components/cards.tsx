import Link from "next/link";

import { Icon } from "@/components/icons";
import { IconBubble, Pill } from "@/components/ui";
import { getCategory } from "@/lib/categories";
import { formatDate, type Post } from "@/lib/posts";
import type { Project } from "@/lib/projects";
import type { Service } from "@/lib/services";

/* ----------------------------------------------------------- ServiceCard */

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/usluge/${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-ink-200 hover:shadow-lift"
    >
      {/* Suptilan sjaj pri prelasku mišem */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-brand-400/0 blur-2xl transition-all duration-700 group-hover:bg-brand-400/20"
      />

      <IconBubble>
        <Icon name={service.icon} className="size-5" />
      </IconBubble>

      <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink-900">
        {service.title}
      </h3>
      <p className="mt-2.5 flex-1 text-pretty text-[0.9375rem] leading-7 text-ink-500">
        {service.tagline}
      </p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-brand-600">
        Saznaj više
        <Icon
          name="arrowRight"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

/* ----------------------------------------------------------- ProjectCard */

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lift">
      {/* Poster: slika ako postoji, inače gradijent sa inicijalima */}
      <div
        className="relative aspect-16/10 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, ${project.accent[0]}, ${project.accent[1]})`,
        }}
      >
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.name} — prikaz projekta`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="text-5xl font-semibold tracking-tight text-white/90">
              {project.name
                .split(" ")
                .slice(0, 2)
                .map((word) => word[0])
                .join("")}
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-ink-700 backdrop-blur">
          {project.industry}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight text-ink-900">
            {project.name}
          </h3>
          <span className="text-sm text-ink-400">{project.year}</span>
        </div>

        <p className="mt-2.5 flex-1 text-pretty text-[0.9375rem] leading-7 text-ink-500">
          {project.summary}
        </p>

        {project.results && project.results.length > 0 ? (
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-100 pt-5 sm:grid-cols-3">
            {project.results.map((result) => (
              <div key={result.label}>
                <dt className="sr-only">{result.label}</dt>
                <dd>
                  <span className="block text-xl font-semibold tracking-tight text-ink-900">
                    {result.value}
                  </span>
                  <span className="mt-0.5 block text-[0.75rem] leading-4 text-ink-400">
                    {result.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-ink-100 pt-5">
          {project.stack.map((tech) => (
            <Pill key={tech}>{tech}</Pill>
          ))}
        </div>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-brand-600 hover:text-brand-700"
          >
            Poseti sajt
            <Icon name="arrowUpRight" className="size-4" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

/* -------------------------------------------------------------- PostCard */

export function PostCard({
  post,
  featured,
}: {
  post: Post;
  featured?: boolean;
}) {
  const category = getCategory(post.category);

  return (
    <article
      className={
        featured
          ? "group relative overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all duration-500 hover:shadow-lift sm:grid sm:grid-cols-2"
          : "group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-ink-200 hover:shadow-lift"
      }
    >
      {featured ? (
        <div className="relative aspect-16/10 bg-gradient-to-br from-brand-500 via-brand-600 to-accent-500 sm:aspect-auto">
          {post.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]"
            />
          )}
        </div>
      ) : null}

      <div className={featured ? "flex flex-col p-8 sm:p-10" : "contents"}>
        <div className="flex items-center gap-3 text-[0.8125rem] text-ink-400">
          {category ? (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 font-medium text-brand-700">
              {category.name}
            </span>
          ) : null}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime} min čitanja</span>
        </div>

        <h3
          className={
            featured
              ? "mt-4 text-balance text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl"
              : "mt-4 text-balance text-lg font-semibold leading-snug tracking-tight text-ink-900"
          }
        >
          <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
            {post.title}
          </Link>
        </h3>

        <p
          className={
            featured
              ? "mt-4 flex-1 text-pretty leading-8 text-ink-500"
              : "mt-2.5 flex-1 text-pretty text-[0.9375rem] leading-7 text-ink-500"
          }
        >
          {post.excerpt}
        </p>

        <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-brand-600">
          Pročitaj tekst
          <Icon
            name="arrowRight"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
