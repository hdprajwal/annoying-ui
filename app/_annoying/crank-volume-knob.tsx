"use client";

import { useRef, useState } from "react";

const TURNS_FOR_FULL = 4;

export default function CrankVolumeKnob() {
  const knobRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const draggingRef = useRef(false);
  const lastAngleRef = useRef<number | null>(null);

  function pointerAngle(clientX: number, clientY: number) {
    const el = knobRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  }

  function onDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    lastAngleRef.current = pointerAngle(e.clientX, e.clientY);
  }
  function onMove(e: React.PointerEvent) {
    if (!draggingRef.current || lastAngleRef.current === null) return;
    const a = pointerAngle(e.clientX, e.clientY);
    let delta = a - lastAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    setAngle((prev) =>
      Math.max(0, Math.min(360 * TURNS_FOR_FULL, prev + delta)),
    );
    lastAngleRef.current = a;
  }
  function onUp() {
    draggingRef.current = false;
    lastAngleRef.current = null;
  }

  const volume = Math.round((angle / (360 * TURNS_FOR_FULL)) * 100);

  return (
    <div className="flex h-56 w-full select-none items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <div
          ref={knobRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="relative h-20 w-20 cursor-grab touch-none rounded-full bg-zinc-400 shadow-inner active:cursor-grabbing dark:bg-zinc-600"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="absolute left-1/2 top-1/2 h-1.5 w-9 -translate-y-1/2 rounded-full bg-zinc-600 dark:bg-zinc-800" />
          <div className="absolute left-[calc(50%+36px)] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-500 shadow dark:bg-zinc-700" />
        </div>
        <span className="text-xs text-zinc-500">
          {TURNS_FOR_FULL} full turns = max
        </span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-2xl tabular-nums">{volume}</span>
        <div className="relative h-32 w-3 overflow-hidden rounded bg-zinc-200 dark:bg-zinc-800">
          <div
            className="absolute bottom-0 left-0 w-full bg-green-500"
            style={{ height: `${volume}%` }}
          />
        </div>
        <span className="text-xs text-zinc-500">🔊</span>
      </div>
    </div>
  );
}
