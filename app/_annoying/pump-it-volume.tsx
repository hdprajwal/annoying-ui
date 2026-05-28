"use client";

import { useEffect, useRef, useState } from "react";

const GAIN_PER_PUMP = 3;
const DECAY_PER_SEC = 8;
const PUMP_DOWN_MS = 110;

export default function PumpItVolume() {
  const [volume, setVolume] = useState(0);
  const [pumped, setPumped] = useState(false);
  const lastTickRef = useRef(performance.now());
  const pumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let raf = 0;
    function tick(t: number) {
      const dt = (t - lastTickRef.current) / 1000;
      lastTickRef.current = t;
      setVolume((v) => Math.max(0, v - DECAY_PER_SEC * dt));
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function pump() {
    setVolume((v) => Math.min(100, v + GAIN_PER_PUMP));
    setPumped(true);
    if (pumpTimerRef.current) clearTimeout(pumpTimerRef.current);
    pumpTimerRef.current = setTimeout(() => setPumped(false), PUMP_DOWN_MS);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-end gap-4">
        <div className="flex flex-col items-center">
          <button
            onMouseDown={pump}
            style={{
              transform: pumped ? "translateY(20px)" : "translateY(0)",
              transition: pumped
                ? "transform 90ms cubic-bezier(0.4, 0, 1, 1)"
                : "transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            className="flex h-14 w-20 select-none items-end justify-center rounded-t-lg bg-zinc-700 pb-1 text-xs font-bold text-white"
          >
            PUMP
          </button>
          <div className="h-16 w-2 bg-zinc-600" />
          <div className="h-3 w-24 rounded-b-lg bg-zinc-700" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="relative h-32 w-5 overflow-hidden rounded border border-zinc-400 bg-zinc-200 dark:bg-zinc-800">
            <div
              className="absolute bottom-0 left-0 w-full bg-red-500"
              style={{ height: `${volume}%` }}
            />
          </div>
          <span className="font-mono text-sm tabular-nums">
            {Math.round(volume)}
          </span>
        </div>
      </div>
      <span className="text-center text-xs text-zinc-500">
        Each pump: +{GAIN_PER_PUMP}. Idle decay: −{DECAY_PER_SEC}/sec. Pump fast.
      </span>
    </div>
  );
}
