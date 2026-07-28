import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ZIM Digital",
    template: "%s · ZIM Digital",
  },
  description: "Sajt i blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-black/10 dark:border-white/15">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-semibold">
              ZIM Digital
            </Link>
            <Link href="/blog" className="text-sm hover:underline">
              Blog
            </Link>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
          {children}
        </main>

        <footer className="border-t border-black/10 px-6 py-6 text-sm opacity-60 dark:border-white/15">
          <div className="mx-auto max-w-3xl">
            © {new Date().getFullYear()} ZIM Digital
          </div>
        </footer>
      </body>
    </html>
  );
}
