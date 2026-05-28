"use client";

import { useRef, useState } from "react";

export default function HorizontalVolumeSlider() {
  const [value, setValue] = useState(50);
  const lastTouchXRef = useRef<number | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    lastTouchXRef.current = e.touches[0]?.clientX ?? null;
  }
  function onTouchMove(e: React.TouchEvent) {
    const x = e.touches[0]?.clientX;
    if (x == null || lastTouchXRef.current == null) return;
    const dx = x - lastTouchXRef.current;
    lastTouchXRef.current = x;
    setValue((v) => Math.max(0, Math.min(100, v + dx * 0.5)));
  }
  function onTouchEnd() {
    lastTouchXRef.current = null;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        tabIndex={0}
        className="relative h-56 w-14 cursor-grab touch-none overflow-hidden rounded-full bg-zinc-800 active:cursor-grabbing"
        onWheel={(e) => {
          if (Math.abs(e.deltaX) > 0) {
            setValue((v) => Math.max(0, Math.min(100, v + e.deltaX * 0.4)));
          }
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="absolute bottom-0 left-0 w-full bg-zinc-300"
          style={{ height: `${value}%` }}
        />
        <div
          className="absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-white shadow"
          style={{ bottom: `calc(${value}% - 10px)` }}
        />
      </div>
      <span className="font-mono text-sm tabular-nums text-zinc-700 dark:text-zinc-300">
        Volume: {Math.round(value)}
      </span>
      <span className="text-center text-xs text-zinc-500">
        Scroll/swipe <strong>horizontally</strong>. Vertical does nothing.
      </span>
    </div>
  );
}
