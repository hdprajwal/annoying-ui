"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 200;
const DRIFT_PX_PER_SEC = 30;
const HOLD_STILL_MS = 2000;

export default function DriftColorPicker() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: SIZE / 2, y: SIZE / 2 });
  const posRef = useRef(pos);
  const dirRef = useRef({ dx: 1, dy: 0.4 });
  const lastMoveRef = useRef(Date.now());
  const [committed, setCommitted] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    let lastT = performance.now();
    function tick(t: number) {
      const dt = (t - lastT) / 1000;
      lastT = t;
      const d = dirRef.current;
      const next = {
        x: posRef.current.x + d.dx * DRIFT_PX_PER_SEC * dt,
        y: posRef.current.y + d.dy * DRIFT_PX_PER_SEC * dt,
      };
      if (next.x < 0 || next.x > SIZE) d.dx *= -1;
      if (next.y < 0 || next.y > SIZE) d.dy *= -1;
      next.x = Math.max(0, Math.min(SIZE, next.x));
      next.y = Math.max(0, Math.min(SIZE, next.y));
      if (Math.random() < 0.01) {
        const a = Math.random() * Math.PI * 2;
        d.dx = Math.cos(a);
        d.dy = Math.sin(a);
      }
      posRef.current = next;
      setPos(next);
      if (Date.now() - lastMoveRef.current >= HOLD_STILL_MS && !committed) {
        const h = Math.round((next.x / SIZE) * 360);
        const l = Math.round(100 - (next.y / SIZE) * 100);
        setCommitted(`hsl(${h}, 80%, ${l}%)`);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [committed]);

  function moveTo(clientX: number, clientY: number) {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = {
      x: Math.max(0, Math.min(SIZE, clientX - r.left)),
      y: Math.max(0, Math.min(SIZE, clientY - r.top)),
    };
    posRef.current = next;
    setPos(next);
    lastMoveRef.current = Date.now();
    if (committed) setCommitted(null);
  }
  function onPointer(e: React.PointerEvent) {
    moveTo(e.clientX, e.clientY);
  }

  const h = Math.round((pos.x / SIZE) * 360);
  const l = Math.round(100 - (pos.y / SIZE) * 100);
  const current = `hsl(${h}, 80%, ${l}%)`;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={boxRef}
        onPointerDown={onPointer}
        onPointerMove={onPointer}
        className="relative cursor-crosshair touch-none rounded border border-zinc-300 dark:border-zinc-700"
        style={{
          width: SIZE,
          height: SIZE,
          background:
            "linear-gradient(to bottom, white, black), linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
          backgroundBlendMode: "multiply",
        }}
      >
        <div
          className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
          style={{ left: pos.x, top: pos.y }}
        />
      </div>
      <div className="flex items-center gap-2">
        <div
          className="h-8 w-8 rounded border border-zinc-300 dark:border-zinc-700"
          style={{ background: committed ?? current }}
        />
        <span className="font-mono text-xs">
          {committed ? "Committed: " : "Live: "}
          {committed ?? current}
        </span>
      </div>
      <span className="text-center text-xs text-zinc-500">
        Cursor drifts. Hold still for {HOLD_STILL_MS / 1000}s to commit a color.
      </span>
    </div>
  );
}
