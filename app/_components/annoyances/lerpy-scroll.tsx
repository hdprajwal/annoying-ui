"use client";

import { useEffect } from "react";

const LERP = 0.08;

export default function LerpyScroll() {
  useEffect(() => {
    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;

    function maxScroll() {
      return Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
    }

    function onWheel(e: WheelEvent) {
      if (document.body.style.overflow === "hidden") return;
      e.preventDefault();
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY));
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function tick() {
      current += (target - current) * LERP;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        raf = 0;
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(tick);
    }

    function onResetScroll() {
      target = window.scrollY;
      current = window.scrollY;
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResetScroll);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResetScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
