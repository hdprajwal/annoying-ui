"use client";

import { useEffect, useState } from "react";

export default function ResizeComplainer() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    function onResize() {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        setShow(true);
        setCount((c) => c + 1);
        if (hideTimer) clearTimeout(hideTimer);
        hideTimer = setTimeout(() => setShow(false), 3000);
      }, 250);
    }
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (settleTimer) clearTimeout(settleTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      Please do not resize this window.{" "}
      <span className="text-xs text-zinc-500">({count}×)</span>
    </div>
  );
}
