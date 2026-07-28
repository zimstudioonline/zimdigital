import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-semibold tracking-tight">ZIM Digital</h1>
      <p className="mt-4 text-lg opacity-80">
        Next.js sajt sa blogom, hostovan na Cloudflare Workers.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-block rounded-full border border-black/15 px-5 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
      >
        Pogledaj blog →
      </Link>
    </>
  );
}
