"use client";

import { useState } from "react";

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const SPACING_DEG = 30;
const STOP_OFFSET_DEG = 60;

export default function RotaryDialPhone() {
  const [number, setNumber] = useState("");
  const [rotation, setRotation] = useState(0);
  const [busy, setBusy] = useState(false);

  async function dial(index: number) {
    if (busy || number.length >= 10) return;
    setBusy(true);
    const target = (index + 1) * SPACING_DEG + STOP_OFFSET_DEG;
    setRotation(target);
    await new Promise((r) => setTimeout(r, 700));
    setRotation(0);
    await new Promise((r) => setTimeout(r, 600));
    setNumber((n) => n + DIGITS[index]);
    setBusy(false);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="min-h-7 font-mono text-lg tabular-nums">
        {number || <span className="text-zinc-400">—</span>}
        {number.length > 0 && (
          <button
            onClick={() => setNumber("")}
            className="ml-2 text-xs text-zinc-500 underline"
          >
            clear
          </button>
        )}
      </div>
      <div className="relative h-60 w-60">
        <div
          className="absolute inset-0 rounded-full bg-zinc-300 shadow-inner dark:bg-zinc-700"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: `transform ${rotation === 0 ? 600 : 700}ms ease-out`,
          }}
        >
          {DIGITS.map((d, i) => {
            const angle = i * SPACING_DEG - 90;
            const rad = (angle * Math.PI) / 180;
            const r = 38;
            const x = 50 + Math.cos(rad) * r;
            const y = 50 + Math.sin(rad) * r;
            return (
              <button
                key={d}
                onClick={() => dial(i)}
                disabled={busy}
                className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white font-mono text-base text-black shadow disabled:opacity-60"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {d}
              </button>
            );
          })}
        </div>
        <div className="absolute right-0 top-1/2 h-6 w-3 -translate-y-1/2 rounded-l bg-zinc-500 dark:bg-zinc-400" />
      </div>
      <span className="text-center text-xs text-zinc-500">
        Click a digit. Wait for the dial. Repeat 10 times.
      </span>
    </div>
  );
}
