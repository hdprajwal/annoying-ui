"use client";

import { useEffect, useRef, useState } from "react";

const TRACK_WIDTH = 88;
const KNOB_SIZE = 22;
const RANGE = TRACK_WIDTH - KNOB_SIZE - 4;
const COMMIT_THRESHOLD = 4;

type Theme = "light" | "dark";

function SunIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [pos, setPos] = useState(0);
  const dragRef = useRef<{ startX: number; startPos: number } | null>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setPos(isDark ? RANGE : 0);
  }, []);

  function apply(t: Theme) {
    setTheme(t);
    setPos(t === "dark" ? RANGE : 0);
    if (t === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try {
      localStorage.setItem("theme", t);
    } catch {}
  }

  function onPointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startPos: pos };
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    setPos(Math.max(0, Math.min(RANGE, dragRef.current.startPos + dx)));
  }
  function onPointerUp() {
    if (!dragRef.current) return;
    dragRef.current = null;
    if (theme === "light" && pos >= RANGE - COMMIT_THRESHOLD) {
      apply("dark");
    } else if (theme === "dark" && pos <= COMMIT_THRESHOLD) {
      apply("light");
    } else {
      setPos(theme === "dark" ? RANGE : 0);
    }
  }

  const dragging = dragRef.current !== null;

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      title="Drag the knob all the way across to switch theme"
      className="relative h-7 cursor-grab touch-none select-none rounded-full border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
      style={{ width: TRACK_WIDTH }}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 text-zinc-400">
        <SunIcon size={12} />
        <MoonIcon size={12} />
      </div>
      <div
        className="absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white text-zinc-900 shadow ring-1 ring-zinc-300 dark:bg-zinc-200"
        style={{
          width: KNOB_SIZE,
          height: KNOB_SIZE,
          left: pos + 2,
          transition: dragging ? "none" : "left 200ms ease-out",
        }}
      >
        {theme === "dark" ? <MoonIcon size={13} /> : <SunIcon size={13} />}
      </div>
    </div>
  );
}
