"use client";

import { useState } from "react";

const MONTHS = [
  "April",
  "August",
  "December",
  "February",
  "January",
  "July",
  "June",
  "March",
  "May",
  "November",
  "October",
  "September",
];

export default function AlphabeticalMonths() {
  const [month, setMonth] = useState("January");

  return (
    <label className="flex w-full max-w-xs flex-col gap-2">
      <span className="text-sm font-medium">Birth month</span>
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-base dark:border-zinc-700 dark:bg-zinc-900"
      >
        {MONTHS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <span className="text-xs text-zinc-500">
        Helpfully sorted A → Z.
      </span>
    </label>
  );
}
