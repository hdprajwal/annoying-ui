"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_MS = 20_000;

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), SHOW_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-lg border border-zinc-300 bg-white p-6 text-zinc-900 shadow-2xl dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
        <h2 className="text-2xl font-bold">Subscribe to our newsletter</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Get the worst UI ideas delivered straight to your inbox, weekly.
        </p>
        <input
          type="email"
          placeholder="your@email.com"
          className="mt-4 w-full rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          onClick={() => setOpen(false)}
          className="mt-4 w-full rounded bg-green-600 px-4 py-3 text-base font-bold text-white hover:bg-green-700"
        >
          Subscribe ✓
        </button>
        <div className="mt-3 text-center">
          <button
            onClick={() => setOpen(false)}
            className="text-[10px] text-zinc-400 underline"
          >
            no thanks, I hate cool things
          </button>
        </div>
      </div>
    </div>
  );
}
