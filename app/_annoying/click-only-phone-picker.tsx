"use client";

import { useState } from "react";

const LENGTH = 10;

export default function ClickOnlyPhonePicker() {
  const [digits, setDigits] = useState<number[]>(Array(LENGTH).fill(0));

  function bump(index: number, delta: number) {
    setDigits((arr) =>
      arr.map((d, i) => (i === index ? (d + delta + 10) % 10 : d)),
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <span className="self-start text-sm font-medium">Phone number</span>
      <div className="flex gap-1 overflow-x-auto rounded-md border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-950">
        {digits.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <button
              onClick={() => bump(i, +1)}
              aria-label={`Increment digit ${i + 1}`}
              className="px-1 text-xs leading-none text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              ▲
            </button>
            <span className="w-5 text-center font-mono text-lg tabular-nums">
              {d}
            </span>
            <button
              onClick={() => bump(i, -1)}
              aria-label={`Decrement digit ${i + 1}`}
              className="px-1 text-xs leading-none text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              ▼
            </button>
          </div>
        ))}
      </div>
      <span className="text-xs text-zinc-500">
        Keyboard input disabled. Click ▲/▼ for each digit.
      </span>
    </div>
  );
}
