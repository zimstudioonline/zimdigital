import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Stilizovanje MDX sadržaja blog postova. Bez @tailwindcss/typography —
// klase su ovde eksplicitne da bi tipografija bila pod punom kontrolom.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-14 scroll-mt-28 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-10 scroll-mt-28 text-xl font-semibold tracking-tight text-ink-900"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mt-5 text-[1.0625rem] leading-8 text-ink-600" {...props} />
    ),
    ul: (props) => (
      <ul
        className="mt-5 space-y-2.5 pl-1 text-[1.0625rem] leading-8 text-ink-600 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.9em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-brand-400"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mt-5 list-decimal space-y-2.5 pl-6 text-[1.0625rem] leading-8 text-ink-600 marker:font-medium marker:text-brand-500"
        {...props}
      />
    ),
    strong: (props) => (
      <strong className="font-semibold text-ink-900" {...props} />
    ),
    a: ({ href = "", ...props }) => {
      const isInternal = href.startsWith("/") || href.startsWith("#");
      const className =
        "font-medium text-brand-600 underline decoration-brand-200 underline-offset-4 transition hover:decoration-brand-500";

      if (isInternal) {
        return <Link href={href} className={className} {...props} />;
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...props}
        />
      );
    },
    blockquote: (props) => (
      <blockquote
        className="mt-8 rounded-2xl border border-ink-100 bg-ink-50/60 px-6 py-5 text-[1.0625rem] leading-8 text-ink-700 [&>p]:mt-0"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded-md bg-ink-100 px-1.5 py-0.5 font-mono text-[0.875em] text-ink-800"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="mt-6 overflow-x-auto rounded-2xl bg-ink-900 p-5 text-sm leading-7 text-ink-100 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
        {...props}
      />
    ),
    hr: () => <hr className="my-12 border-ink-100" />,
    table: (props) => (
      <div className="mt-8 overflow-x-auto rounded-2xl border border-ink-100">
        <table className="w-full text-left text-sm" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border-b border-ink-100 bg-ink-50/70 px-5 py-3 font-semibold text-ink-900"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b border-ink-50 px-5 py-3 text-ink-600" {...props} />
    ),
    ...components,
  };
}
