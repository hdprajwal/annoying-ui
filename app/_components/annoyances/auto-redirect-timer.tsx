"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const SECONDS = 30;

export default function AutoRedirectTimer() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      router.push("/");
    }
  }, [seconds, router]);

  function reset() {
    setSeconds(SECONDS);
  }

  return (
    <div
      onMouseEnter={reset}
      className="mb-6 flex items-center justify-between rounded border border-amber-500 bg-amber-50 px-4 py-2 text-sm text-amber-900"
    >
      <span>
        Returning to gallery in <strong>{seconds}s…</strong>
      </span>
      <span className="text-xs opacity-70">(hover to reset)</span>
    </div>
  );
}
