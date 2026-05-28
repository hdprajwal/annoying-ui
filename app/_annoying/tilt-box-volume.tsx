"use client";

import { useEffect, useRef, useState } from "react";

const BOX_WIDTH = 280;
const BOX_HEIGHT = 56;
const BALL_RADIUS = 10;
const TRACK_PADDING = 14;
const HALF = BOX_WIDTH / 2 - BALL_RADIUS - TRACK_PADDING;
const G = 900;
const FRICTION_PER_SEC = 1.4;
const BOUNCE = 0.25;
const MAX_TILT = 75;

export default function TiltBoxVolume() {
  const boxRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const [angle, setAngle] = useState(0);
  const draggingRef = useRef(false);
  const startRef = useRef<{ a: number; rot: number } | null>(null);

  const posRef = useRef(0);
  const velRef = useRef(0);
  const [pos, setPos] = useState(0);

  function pointerAngle(x: number, y: number) {
    const el = boxRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return (
      (Math.atan2(y - (r.top + r.height / 2), x - (r.left + r.width / 2)) *
        180) /
      Math.PI
    );
  }

  function onPointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    startRef.current = {
      a: pointerAngle(e.clientX, e.clientY),
      rot: angleRef.current,
    };
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current || !startRef.current) return;
    const a = pointerAngle(e.clientX, e.clientY);
    const next = Math.max(
      -MAX_TILT,
      Math.min(MAX_TILT, startRef.current.rot + (a - startRef.current.a)),
    );
    angleRef.current = next;
    setAngle(next);
  }
  function onPointerUp() {
    draggingRef.current = false;
    startRef.current = null;
  }

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    function tick(t: number) {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      const accel = G * Math.sin((angleRef.current * Math.PI) / 180);
      let v = velRef.current + accel * dt;
      v -= v * FRICTION_PER_SEC * dt;
      let p = posRef.current + v * dt;
      if (p > HALF) {
        p = HALF;
        v = -v * BOUNCE;
      } else if (p < -HALF) {
        p = -HALF;
        v = -v * BOUNCE;
      }
      if (Math.abs(v) < 0.5 && Math.abs(angleRef.current) < 1) v = 0;
      velRef.current = v;
      posRef.current = p;
      setPos(p);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const volume = Math.round(50 + (pos / HALF) * 50);

  return (
    <div className="flex w-full select-none flex-col items-center gap-3 py-4">
      <span className="font-mono text-sm tabular-nums">Volume: {volume}</span>
      <div
        ref={boxRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative cursor-grab touch-none rounded-lg bg-zinc-300 shadow-lg active:cursor-grabbing dark:bg-zinc-700"
        style={{
          width: BOX_WIDTH,
          height: BOX_HEIGHT,
          transform: `rotate(${angle}deg)`,
        }}
      >
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-zinc-500/60"
          style={{ left: TRACK_PADDING, right: TRACK_PADDING }}
        />
        <div
          className="absolute top-1/2 rounded-full bg-white shadow"
          style={{
            width: BALL_RADIUS * 2,
            height: BALL_RADIUS * 2,
            left: `calc(50% + ${pos}px - ${BALL_RADIUS}px)`,
            transform: "translateY(-50%)",
          }}
        />
      </div>
      <span className="text-center text-xs text-zinc-500">
        Drag to tilt. The ball rolls to the low end. Volume is wherever it lands.
      </span>
    </div>
  );
}
