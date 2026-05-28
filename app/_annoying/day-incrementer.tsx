"use client";

import { useState } from "react";

const START = new Date(1900, 0, 1);
const MS_PER_DAY = 86_400_000;

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function fmt(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function DayIncrementer() {
  const [date, setDate] = useState(START);
  const daysElapsed = Math.round((date.getTime() - START.getTime()) / MS_PER_DAY);

  return (
    <div className="flex flex-col items-start gap-3">
      <label className="text-sm font-medium">Date of birth</label>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDate((d) => addDays(d, -1))}
          className="rounded border border-zinc-400 bg-white px-3 py-1 font-mono text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          -1 day
        </button>
        <span className="rounded border border-zinc-300 bg-zinc-50 px-3 py-1 font-mono text-base dark:border-zinc-700 dark:bg-zinc-950">
          {fmt(date)}
        </span>
        <button
          onClick={() => setDate((d) => addDays(d, 1))}
          className="rounded border border-zinc-400 bg-white px-3 py-1 font-mono text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          +1 day
        </button>
      </div>
      <span className="text-xs text-zinc-500">
        Days clicked: {daysElapsed.toLocaleString()}. Key-repeat does nothing.
      </span>
    </div>
  );
}
