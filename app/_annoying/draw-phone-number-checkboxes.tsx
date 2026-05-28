"use client";

import { useState } from "react";

const W = 3;
const H = 5;
const PADS = 10;

const DIGIT_PATTERNS: Record<string, string> = {
  "0": "111101101101111",
  "1": "010110010010111",
  "2": "111001111100111",
  "3": "111001111001111",
  "4": "101101111001001",
  "5": "111100111001111",
  "6": "111100111101111",
  "7": "111001010100100",
  "8": "111101111101111",
  "9": "111101111001111",
};

function matchDigit(bits: number[]): string {
  if (bits.every((b) => b === 0)) return "_";
  const str = bits.join("");
  let best = "_";
  let bestScore = -1;
  for (const [d, pattern] of Object.entries(DIGIT_PATTERNS)) {
    let score = 0;
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === str[i]) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = d;
    }
  }
  return best;
}

export default function DrawPhoneNumberCheckboxes() {
  const [pads, setPads] = useState<number[][]>(
    Array.from({ length: PADS }, () => Array(W * H).fill(0)),
  );

  function toggle(padIdx: number, cellIdx: number) {
    setPads((prev) =>
      prev.map((p, i) =>
        i === padIdx
          ? p.map((c, j) => (j === cellIdx ? (c ? 0 : 1) : c))
          : p,
      ),
    );
  }

  function clear() {
    setPads(Array.from({ length: PADS }, () => Array(W * H).fill(0)));
  }

  const digits = pads.map(matchDigit);
  const formatted = `(${digits.slice(0, 3).join("")}) ${digits
    .slice(3, 6)
    .join("")}-${digits.slice(6).join("")}`;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="text-center">
        <p className="text-lg font-bold">Our form is very sophisticated.</p>
        <p className="text-sm">Please draw your phone number, thanks.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {pads.map((cells, p) => (
          <div
            key={p}
            className="grid gap-0.5"
            style={{ gridTemplateColumns: `repeat(${W}, minmax(0, 1fr))` }}
          >
            {cells.map((v, i) => (
              <input
                key={i}
                type="checkbox"
                checked={!!v}
                onChange={() => toggle(p, i)}
                aria-label={`pad ${p + 1} cell ${i + 1}`}
                className="h-3.5 w-3.5"
              />
            ))}
          </div>
        ))}
      </div>
      <p className="text-sm">Your phone number is</p>
      <p className="font-mono text-3xl font-bold tracking-wide">{formatted}</p>
      <button
        onClick={clear}
        className="text-xs text-zinc-500 underline underline-offset-2"
      >
        clear
      </button>
    </div>
  );
}
