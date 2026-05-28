"use client";

import { useEffect } from "react";

const MESSAGES = [
  "👀 Come back!",
  "We miss you...",
  "Hello? Are you there?",
  "Don't go yet!",
  "Please. Click me.",
];

export default function AttentionGrabTitle() {
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    let original = document.title;
    let i = 0;
    function onVis() {
      if (document.hidden) {
        original = document.title;
        i = 0;
        interval = setInterval(() => {
          document.title = MESSAGES[i % MESSAGES.length];
          i++;
        }, 1500);
      } else {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
        document.title = original;
      }
    }
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      if (interval) clearInterval(interval);
    };
  }, []);
  return null;
}
