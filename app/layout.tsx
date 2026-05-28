import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileNotice from "./_components/mobile-notice";
import ThemeToggle from "./_components/theme-toggle";
import SiteAnnoyances from "./_components/site-annoyances";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Annoying UI",
  description: "A gallery of intentionally bad UI components — interact, then read the source.",
};

const THEME_SCRIPT = `
try {
  var t = localStorage.getItem('theme');
  if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  if (t === 'dark') document.documentElement.classList.add('dark');
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
        />
        <MobileNotice />
        <div className="border-b border-zinc-200 bg-zinc-100 px-6 py-1.5 text-center text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          Most examples shamelessly inspired by{" "}
          <a
            href="https://www.reddit.com/r/badUIbattles/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-100"
          >
            r/badUIbattles
          </a>
        </div>
        <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-4 px-6 py-5">
            <Link href="/" className="flex items-baseline gap-2">
              <h1 className="text-xl font-bold tracking-tight">Annoying UI</h1>
              <span className="hidden text-sm text-zinc-500 sm:inline">
                — a gallery of UI sins
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <a
                href="https://github.com"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                GitHub
              </a>
            </div>
          </div>
        </header>
        {children}
        <SiteAnnoyances />
      </body>
    </html>
  );
}
