"use client";

import { useEffect, useState } from "react";

const KEYS = "abcdefghijklmnopqrstuvwxyz";
const ROW_LEN = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ScramblingKeyboard() {
  const [name, setName] = useState("");
  const [layout, setLayout] = useState<string[]>(KEYS.split(""));

  useEffect(() => {
    setLayout(shuffle(KEYS.split("")));
  }, []);

  function press(ch: string) {
    setName((n) => n + ch);
    setLayout(shuffle(KEYS.split("")));
  }

  function backspace() {
    setName((n) => n.slice(0, -1));
    setLayout(shuffle(KEYS.split("")));
  }

  const rows: string[][] = [];
  for (let i = 0; i < layout.length; i += ROW_LEN) {
    rows.push(layout.slice(i, i + ROW_LEN));
  }

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <label className="self-start text-sm font-medium">Enter your name</label>
      <div className="w-full rounded border border-zinc-300 bg-white px-3 py-2 font-mono text-base dark:border-zinc-700 dark:bg-zinc-950">
        {name || <span className="text-zinc-400">(empty)</span>}
        <span className="animate-pulse">▍</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-1.5">
            {row.map((ch) => (
              <button
                key={ch}
                onClick={() => press(ch)}
                className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded border border-zinc-300 bg-white font-mono text-base text-zinc-900 shadow-sm hover:bg-zinc-100 active:translate-y-px dark:border-zinc-700 dark:bg-zinc-100"
              >
                {ch}
              </button>
            ))}
          </div>
        ))}
        <div className="mt-1 flex gap-1.5">
          <button
            onClick={() => press(" ")}
            className="flex h-10 w-40 items-center justify-center rounded border border-zinc-300 bg-white text-xs text-zinc-700 hover:bg-zinc-100 active:translate-y-px dark:border-zinc-700 dark:bg-zinc-100"
          >
            space
          </button>
          <button
            onClick={backspace}
            className="flex h-10 w-20 items-center justify-center rounded border border-zinc-300 bg-white text-xs text-zinc-700 hover:bg-zinc-100 active:translate-y-px dark:border-zinc-700 dark:bg-zinc-100"
          >
            ⌫
          </button>
        </div>
      </div>
      <span className="text-xs text-zinc-500">
        The keyboard reshuffles after every keypress. Including backspace.
      </span>
    </div>
  );
}
