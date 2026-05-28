"use client";

import { useMemo, useState } from "react";

export default function AreaCodeDropdowns() {
  const areaCodes = useMemo(
    () => Array.from({ length: 800 }, (_, i) => String(200 + i)),
    [],
  );
  const prefixes = useMemo(
    () => Array.from({ length: 1000 }, (_, i) => String(i).padStart(3, "0")),
    [],
  );
  const lines = useMemo(
    () => Array.from({ length: 10000 }, (_, i) => String(i).padStart(4, "0")),
    [],
  );

  const [area, setArea] = useState(areaCodes[0]);
  const [prefix, setPrefix] = useState(prefixes[0]);
  const [line, setLine] = useState(lines[0]);
  const [done, setDone] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold">Please Enter Your Phone Number:</h3>
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="rounded border border-zinc-400 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          {areaCodes.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
        <select
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          className="rounded border border-zinc-400 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          {prefixes.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select
          value={line}
          onChange={(e) => setLine(e.target.value)}
          className="rounded border border-zinc-400 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          {lines.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>
      <button
        onClick={() => setDone(`${area}-${prefix}-${line}`)}
        className="self-start rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Next
      </button>
      {done && <p className="text-sm text-zinc-500">Submitted: {done}</p>}
      <span className="text-xs text-zinc-500">
        Three dropdowns. The last one has 10,000 options. Scroll responsibly.
      </span>
    </div>
  );
}
