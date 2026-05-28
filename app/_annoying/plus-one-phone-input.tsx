"use client";

import { useState } from "react";

const LENGTH = 10;

function format(n: number) {
  const s = String(n).padStart(LENGTH, "0").slice(-LENGTH);
  return `(${s.slice(0, 3)}) ${s.slice(3, 6)}-${s.slice(6)}`;
}

export default function PlusOnePhoneInput() {
  const [n, setN] = useState(0);
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-start gap-3">
      <span className="text-base font-semibold">
        Please enter your phone number:
      </span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-lg tabular-nums">{format(n)}</span>
        <button
          onClick={() => setN((v) => v + 1)}
          aria-label="Increment"
          className="rounded border border-zinc-400 bg-white px-2 py-1 font-mono text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          +
        </button>
        <button
          onClick={() => setSubmitted(format(n))}
          className="rounded border border-zinc-400 bg-white px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          Submit
        </button>
      </div>
      {submitted && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Submitted: <span className="font-mono">{submitted}</span>
        </p>
      )}
      <span className="text-xs text-zinc-500">
        Tip: only ~10 billion clicks to reach yours.
      </span>
    </div>
  );
}
