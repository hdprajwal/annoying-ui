import { promises as fs } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import AutoRedirectTimer from "@/app/_components/annoyances/auto-redirect-timer";
import ShareButton from "@/app/_components/share-button";
import { COMPONENTS, getComponent } from "@/app/_annoying/registry";

export function generateStaticParams() {
  return COMPONENTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/components/[slug]">,
) {
  const { slug } = await props.params;
  const c = getComponent(slug);
  if (!c) return {};
  return {
    title: `${c.title} — Annoying UI`,
    description: c.description,
  };
}

export default async function ComponentDetail(
  props: PageProps<"/components/[slug]">,
) {
  const { slug } = await props.params;
  const c = getComponent(slug);
  if (!c) notFound();

  const source = await fs.readFile(
    path.join(process.cwd(), c.file),
    "utf-8",
  );
  const { Component } = c;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <AutoRedirectTimer />
      <Link
        href="/"
        className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Back to gallery
      </Link>

      <header className="mt-6 mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{c.title}</h2>
          <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
            {c.description}
          </p>
          {c.desktopOnly && (
            <p className="mt-3 hidden rounded-md border border-amber-400 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900 [@media(pointer:coarse)]:inline-block">
              🖱️ This one only works on desktop (mouse / keyboard required).
            </p>
          )}
        </div>
        <ShareButton />
      </header>

      <section className="mb-10">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
          Try it
        </h3>
        <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-zinc-200 bg-white p-10 dark:border-zinc-800 dark:bg-zinc-950">
          <Component />
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Source
          </h3>
          <code className="font-mono text-xs text-zinc-500">{c.file}</code>
        </div>
        <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-5 font-mono text-sm leading-relaxed text-zinc-100">
          <code>{source}</code>
        </pre>
      </section>
    </main>
  );
}
