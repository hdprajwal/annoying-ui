"use client";

import { useState } from "react";

const VALUE = "555-555-5555";

export default function SmallerBiggerPhone() {
  const [size, setSize] = useState(2);
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold">Please enter your phone number:</h3>
      <p
        className="mt-4 font-bold leading-none"
        style={{ fontSize: `${size}rem` }}
      >
        {VALUE}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setSize((s) => Math.max(0.5, s - 0.25))}
          className="rounded border border-zinc-400 bg-white px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          smaller
        </button>
        <button
          onClick={() => setSize((s) => Math.min(5, s + 0.25))}
          className="rounded border border-zinc-400 bg-white px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          bigger
        </button>
        <button
          onClick={() => setSubmitted(VALUE)}
          className="rounded border border-zinc-400 bg-white px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          submit
        </button>
      </div>
      {submitted && (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Submitted: <span className="font-mono">{submitted}</span>
        </p>
      )}
    </div>
  );
}
