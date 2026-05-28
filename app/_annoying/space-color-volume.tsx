"use client";

import { useEffect, useRef, useState } from "react";

type Seg = { color: "red" | "green" };
const SEGMENTS: Seg[] = [
  { color: "red" },
  { color: "green" },
  { color: "red" },
  { color: "green" },
  { color: "red" },
  { color: "green" },
];

export default function SpaceColorVolume() {
  const [pos, setPos] = useState(0);
  const dirRef = useRef(1);
  const posRef = useRef(0);
  const [volume, setVolume] = useState(20);

  useEffect(() => {
    const id = setInterval(() => {
      let next = posRef.current + dirRef.current * 2;
      if (next >= 100) {
        next = 100;
        dirRef.current = -1;
      }
      if (next <= 0) {
        next = 0;
        dirRef.current = 1;
      }
      posRef.current = next;
      setPos(next);
    }, 40);
    return () => clearInterval(id);
  }, []);

  function fire() {
    const segWidth = 100 / SEGMENTS.length;
    const idx = Math.min(
      SEGMENTS.length - 1,
      Math.floor(posRef.current / segWidth),
    );
    const seg = SEGMENTS[idx];
    if (seg.color === "red") setVolume(0);
    else setVolume((v) => Math.min(100, v + 5));
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code !== "Space") return;
      e.preventDefault();
      fire();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-48 w-3 rounded bg-zinc-900">
          <div
            className="absolute bottom-0 left-0 w-full rounded bg-blue-500"
            style={{ height: `${volume}%` }}
          />
        </div>
        <div className="relative h-4 w-48 overflow-hidden rounded">
          <div className="flex h-full w-full">
            {SEGMENTS.map((s, i) => (
              <div
                key={i}
                className={`flex-1 ${s.color === "red" ? "bg-red-500" : "bg-green-500"}`}
              />
            ))}
          </div>
        </div>
        <div className="relative h-3 w-48">
          <span
            className="absolute -top-1 text-xs"
            style={{ left: `calc(${pos}% - 6px)` }}
          >
            ▲
          </span>
        </div>
        <span className="font-mono text-sm tabular-nums">
          Volume: {volume}%
        </span>
        <button
          onClick={fire}
          className="rounded border border-zinc-400 bg-white px-4 py-1 text-xs font-medium hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:hidden"
        >
          tap to fire
        </button>
      </div>
      <div className="text-sm">
        <p>
          Press{" "}
          <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">
            space
          </code>{" "}
          (or tap below on mobile) to perform color action.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-block h-4 w-4 bg-red-500" /> Set volume to 0%
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="inline-block h-4 w-4 bg-green-500" /> Increase volume
          by 5%
        </div>
      </div>
    </div>
  );
}
