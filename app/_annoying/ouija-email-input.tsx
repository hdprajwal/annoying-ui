"use client";

import { useRef, useState } from "react";

const LETTERS = "abcdefghijklmnopqrstuvwxyz0123456789@.-_";
const HOVER_MS = 1000;

export default function OuijaEmailInput() {
  const [email, setEmail] = useState("");
  const [hoverChar, setHoverChar] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function enter(ch: string) {
    setHoverChar(ch);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setEmail((e) => e + ch);
      setHoverChar(null);
    }, HOVER_MS);
  }
  function leave() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHoverChar(null);
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <label className="text-sm font-medium">Enter your email address</label>
      <div className="rounded border border-zinc-300 p-4 dark:border-zinc-700">
        <div className="flex flex-wrap justify-center gap-1">
          {LETTERS.split("").map((ch) => (
            <button
              key={ch}
              onPointerEnter={() => enter(ch)}
              onPointerLeave={leave}
              onPointerDown={() => enter(ch)}
              onPointerUp={leave}
              onPointerCancel={leave}
              className={`flex h-8 w-8 items-center justify-center rounded border font-serif text-base transition-colors ${
                hoverChar === ch
                  ? "border-zinc-500 bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"
                  : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          <button
            onPointerEnter={() => enter(" ")}
            onPointerLeave={leave}
            onPointerDown={() => enter(" ")}
            onPointerUp={leave}
            onPointerCancel={leave}
            className="rounded border border-zinc-300 bg-white px-4 py-1 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            space
          </button>
          <button
            onClick={() => setEmail((e) => e.slice(0, -1))}
            className="rounded border border-zinc-300 bg-white px-4 py-1 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            ⌫
          </button>
        </div>
      </div>
      <p className="font-mono text-base">
        {email}
        <span className="animate-pulse">▍</span>
      </p>
      <span className="text-xs text-zinc-500">
        Hover each letter for one full second to commit it.
      </span>
    </div>
  );
}
