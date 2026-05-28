"use client";

import { useEffect, useState } from "react";

export default function RightClickBlocker() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    function onCtx(e: MouseEvent) {
      e.preventDefault();
      setShow(true);
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setShow(false), 2500);
    }
    document.addEventListener("contextmenu", onCtx);
    return () => {
      document.removeEventListener("contextmenu", onCtx);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center">
      <div className="rounded-2xl border-4 border-red-800 bg-red-600 px-16 py-10 text-center shadow-2xl">
        <p className="text-6xl font-black text-white drop-shadow-lg">🚫 NOPE</p>
        <p className="mt-4 text-2xl font-semibold text-white">
          Don't even think about it.
        </p>
        <p className="mt-2 text-sm font-medium text-red-100">
          Right-click is disabled on this site.
        </p>
      </div>
    </div>
  );
}
