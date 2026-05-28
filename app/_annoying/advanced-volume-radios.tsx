"use client";

import { useState } from "react";

const COLS_PER_ROW = 8;
const TOTAL = 100;

export default function AdvancedVolumeRadios() {
  const [value, setValue] = useState(25);
  const [muted, setMuted] = useState(false);

  return (
    <fieldset className="w-full rounded border border-zinc-400 p-4">
      <legend className="px-2 text-sm font-semibold">Volume Control</legend>
      <div
        className="grid gap-x-2 gap-y-1 text-xs"
        style={{
          gridTemplateColumns: `repeat(${COLS_PER_ROW}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: TOTAL }, (_, i) => i + 1).map((v) => (
          <label key={v} className="flex items-center gap-1 whitespace-nowrap">
            <input
              type="radio"
              name="advanced-volume"
              checked={value === v}
              onChange={() => setValue(v)}
            />
            <span>{v}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 text-center">
        <label className="inline-flex items-center gap-1.5 text-sm">
          <input
            type="checkbox"
            checked={muted}
            onChange={(e) => setMuted(e.target.checked)}
          />
          Mute
        </label>
      </div>
      <p className="mt-2 text-center text-xs text-zinc-500">
        Selected: {muted ? "Muted" : value}
      </p>
    </fieldset>
  );
}
