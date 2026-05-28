"use client";

import { useEffect, useRef, useState } from "react";

export default function AmPmFlipClock() {
  const [hour, setHour] = useState(3);
  const [minute, setMinute] = useState(0);
  const [pm, setPm] = useState(false);
  const faceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setPm((p) => !p), 8000);
    return () => clearInterval(id);
  }, []);

  function onFaceClick(e: React.MouseEvent) {
    const el = faceRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const a = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    const norm = (a + 360) % 360;
    const h = Math.round(norm / 30) % 12 || 12;
    setHour(h);
    setMinute(0);
  }

  const display12 = `${hour}:${String(minute).padStart(2, "0")} ${pm ? "PM" : "AM"}`;
  const display24 = `${pm ? (hour % 12) + 12 : hour % 12}:${String(minute).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={faceRef}
        onClick={onFaceClick}
        className="relative h-44 w-44 cursor-pointer rounded-full border-4 border-zinc-700 bg-white dark:bg-zinc-100"
      >
        {Array.from({ length: 12 }, (_, i) => {
          const label = i === 0 ? 12 : i;
          const angle = ((label === 12 ? 0 : label) * 30 - 90) * Math.PI / 180;
          const x = (50 + Math.cos(angle) * 40).toFixed(3);
          const y = (50 + Math.sin(angle) * 40).toFixed(3);
          return (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-zinc-900"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {label}
            </span>
          );
        })}
        <div
          className="absolute left-1/2 top-1/2 h-1 origin-left rounded bg-zinc-900"
          style={{
            width: "35%",
            transform: `translateY(-50%) rotate(${(hour % 12) * 30 - 90}deg)`,
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900" />
      </div>
      <button
        onClick={() => setPm((p) => !p)}
        className={`rounded-full px-3 py-1 text-xs font-semibold ${pm ? "bg-zinc-900 text-white" : "bg-zinc-200 text-zinc-900"}`}
      >
        {pm ? "PM" : "AM"}
      </button>
      <div className="text-center font-mono text-sm">
        <div>{display12}</div>
        <div className="text-xs text-zinc-500">(24h: {display24})</div>
      </div>
      <span className="text-center text-xs text-zinc-500">
        Click the face to set hour. AM/PM flips itself every 8 seconds.
      </span>
    </div>
  );
}
