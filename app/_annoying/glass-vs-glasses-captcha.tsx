"use client";

import { useEffect, useState } from "react";

type Tile = { id: number; emoji: string; isGlasses: boolean; label: string };

const POOL: Omit<Tile, "id">[] = [
  { emoji: "👓", isGlasses: true, label: "eyeglasses" },
  { emoji: "🕶️", isGlasses: true, label: "sunglasses" },
  { emoji: "🥃", isGlasses: false, label: "whisky glass" },
  { emoji: "🍷", isGlasses: false, label: "wine glass" },
  { emoji: "🍸", isGlasses: false, label: "martini glass" },
  { emoji: "🍺", isGlasses: false, label: "beer glass" },
  { emoji: "🔍", isGlasses: false, label: "magnifying glass" },
  { emoji: "🪟", isGlasses: false, label: "window pane" },
  { emoji: "🧪", isGlasses: false, label: "test tube" },
  { emoji: "⏳", isGlasses: false, label: "hourglass" },
];

function deterministicTiles(count: number): Tile[] {
  const out: Tile[] = [];
  for (let i = 0; i < count; i++) {
    const base = POOL[i % POOL.length];
    out.push({ ...base, id: i });
  }
  return out;
}

function shuffleTiles(count: number): Tile[] {
  const arr = [...POOL].sort(() => Math.random() - 0.5);
  const out: Tile[] = [];
  for (let i = 0; i < count; i++) {
    const base = arr[i % arr.length];
    out.push({ ...base, id: i });
  }
  return out.sort(() => Math.random() - 0.5);
}

export default function GlassVsGlassesCaptcha() {
  const [count, setCount] = useState(9);
  const [tiles, setTiles] = useState<Tile[]>(() => deterministicTiles(9));
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setTiles(shuffleTiles(9));
  }, []);

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function verify() {
    setMessage("Incorrect. Please try again.");
    const newCount = count + 1;
    setCount(newCount);
    setTiles(shuffleTiles(newCount));
    setSelected(new Set());
  }

  const cols = Math.ceil(Math.sqrt(count));

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <p className="text-center text-sm font-medium">
        Select all squares with <strong>glasses</strong>.
        <br />
        <span className="text-xs text-zinc-500">
          If there are none, click verify.
        </span>
      </p>
      <div
        className="grid w-full max-w-md gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {tiles.map((t) => (
          <button
            key={t.id}
            onClick={() => toggle(t.id)}
            title={t.label}
            className={`flex aspect-square items-center justify-center rounded border text-3xl ${
              selected.has(t.id)
                ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
            }`}
          >
            {t.emoji}
          </button>
        ))}
      </div>
      <button
        onClick={verify}
        className="rounded bg-blue-600 px-5 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Verify
      </button>
      {message && <p className="text-sm text-red-600">{message}</p>}
      <span className="text-xs text-zinc-500">
        Tiles: {count}. Goes up by one each time.
      </span>
    </div>
  );
}
