"use client";

import { useRef, useState } from "react";

export default function RunawayCancelButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [done, setDone] = useState<"ok" | "cancel" | null>(null);

  function dodge() {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    const cBox = container.getBoundingClientRect();
    const bBox = button.getBoundingClientRect();

    const slackX = Math.max(0, cBox.width - bBox.width - 24);
    const slackY = Math.max(0, cBox.height - bBox.height - 24);

    const nx = (Math.random() - 0.5) * slackX;
    const ny = (Math.random() - 0.5) * slackY;
    setOffset({ x: nx, y: ny });
  }

  function reset() {
    setDone(null);
    setOffset({ x: 0, y: 0 });
  }

  return (
    <div
      ref={containerRef}
      className="relative flex h-56 w-full items-center justify-center gap-3 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900"
    >
      {done ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {done === "ok"
              ? "Confirmed. Irreversible action committed."
              : "Cancelled. Somehow."}
          </p>
          <button
            onClick={reset}
            className="text-xs text-zinc-500 underline underline-offset-2"
          >
            try again
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setDone("ok")}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
          >
            OK
          </button>
          <button
            ref={buttonRef}
            onPointerEnter={dodge}
            onFocus={dodge}
            onClick={() => setDone("cancel")}
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium transition-transform duration-150 ease-out dark:border-zinc-700 dark:bg-zinc-950"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
