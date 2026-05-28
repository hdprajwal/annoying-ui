import Link from "next/link";
import BuiltWithClaude from "./_components/built-with-claude";
import { COMPONENTS, spanClass } from "./_annoying/registry";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl flex-1 px-6 py-12">
      <section className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Interfaces so bad they&apos;re art.
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          A collection of intentionally hostile UI components.
        </p>
      </section>

      <ul className="grid auto-rows-min grid-flow-dense grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {COMPONENTS.map(({ slug, title, Component, span, desktopOnly }) => (
          <li
            key={slug}
            className={`group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 ${spanClass(span)}`}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold leading-snug">{title}</h3>
              {desktopOnly && (
                <span
                  title="Only works with mouse/keyboard"
                  className="hidden shrink-0 rounded-full border border-zinc-300 bg-zinc-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-600 [@media(pointer:coarse)]:inline-block dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
                >
                  🖱️ Desktop
                </span>
              )}
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
              <Component />
            </div>
            <Link
              href={`/components/${slug}`}
              className="mt-4 self-start text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
            >
              View source →
            </Link>
          </li>
        ))}
      </ul>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-800">
        <p>
          Built with bad intentions. Add your own component in{" "}
          <code className="font-mono text-zinc-700 dark:text-zinc-300">
            app/_annoying/
          </code>
          . Got more terrible ideas?{" "}
          <a
            href="https://github.com/hdprajwal/annoying-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-700 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            Open a PR on the repo
          </a>
          .
        </p>
        <BuiltWithClaude />
      </footer>
    </main>
  );
}
