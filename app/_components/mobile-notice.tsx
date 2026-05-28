"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mobile-notice-dismissed-v2";

export default function MobileNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {}
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) setShow(true);
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[100] border-b-2 border-amber-500 bg-amber-100 px-4 py-3 text-sm text-amber-900 shadow-lg">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="leading-snug">
          🖱️ <strong>This site is best experienced on a desktop.</strong>{" "}
          To experience the <em>worst</em> of the UI, please visit on a
          computer with a mouse and keyboard.
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 self-end rounded border border-amber-700 bg-white px-3 py-1 text-xs font-medium hover:bg-amber-200 sm:self-auto"
        >
          Continue anyway
        </button>
      </div>
    </div>
  );
}
