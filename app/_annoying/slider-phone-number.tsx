"use client";

import { useState } from "react";

const MAX = 9_999_999_999;

export default function SliderPhoneNumber() {
  const [n, setN] = useState(0);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl font-bold">
          Please enter you phone number:
        </h3>
        <span className="font-serif text-3xl tabular-nums">
          {String(n).padStart(10, "0")}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="shrink-0 rounded bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-800">
          Worst Input Fields
        </span>
        <input
          type="range"
          min={0}
          max={MAX}
          step={1}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="flex-1"
        />
      </div>
      <span className="text-xs text-zinc-500">
        Range: 0 to {MAX.toLocaleString()}. Step: 1. One pixel ≈ {Math.round(MAX / 600).toLocaleString()} numbers.
      </span>
    </div>
  );
}
