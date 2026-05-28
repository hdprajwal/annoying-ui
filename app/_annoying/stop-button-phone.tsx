"use client";

import { useEffect, useState } from "react";

const TICK_MS = 70;

function pad(n: number, len: number) {
  return String(n).padStart(len, "0").slice(-len);
}

export default function StopButtonPhone() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [stopped, setStopped] = useState({ a: false, b: false, c: false });
  const [submitted, setSubmitted] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (!stopped.a) setA((v) => (v + 1) % 1000);
      if (!stopped.b) setB((v) => (v + 1) % 1000);
      if (!stopped.c) setC((v) => (v + 1) % 10000);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [stopped]);

  const allStopped = stopped.a && stopped.b && stopped.c;
  const value = `(${pad(a, 3)})-${pad(b, 3)}-${pad(c, 4)}`;

  return (
    <div className="flex flex-col items-start gap-3">
      <h3 className="text-xl font-bold">Please enter your phone number:</h3>
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-2xl tabular-nums">{value}</span>
        <button
          onClick={() => allStopped && setSubmitted(value)}
          disabled={!allStopped}
          className="rounded border border-zinc-400 bg-white px-3 py-1 text-sm hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-900"
        >
          submit
        </button>
      </div>
      <div className="flex gap-2">
        {(["a", "b", "c"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setStopped((s) => ({ ...s, [k]: true }))}
            disabled={stopped[k]}
            className="rounded border border-zinc-400 bg-white px-3 py-1 text-sm hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-900"
          >
            stop
          </button>
        ))}
        <button
          onClick={() => {
            setStopped({ a: false, b: false, c: false });
            setSubmitted(null);
          }}
          className="ml-2 text-xs text-zinc-500 underline"
        >
          reset
        </button>
      </div>
      {submitted && (
        <p className="text-sm text-zinc-500">Submitted: {submitted}</p>
      )}
    </div>
  );
}
