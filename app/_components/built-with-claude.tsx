"use client";

import { useEffect, useState } from "react";

const TEXT = "Built with Claude";
const TYPE_MS = 80;
const PAUSE_DONE_MS = 2500;
const DELETE_MS = 40;
const PAUSE_EMPTY_MS = 600;

type Phase = "typing" | "deleting";

export default function BuiltWithClaude() {
  const [shown, setShown] = useState(TEXT);
  const [phase, setPhase] = useState<Phase>("deleting");

  useEffect(() => {
    if (phase === "typing" && shown.length < TEXT.length) {
      const t = setTimeout(
        () => setShown((s) => TEXT.slice(0, s.length + 1)),
        TYPE_MS,
      );
      return () => clearTimeout(t);
    }
    if (phase === "typing" && shown.length === TEXT.length) {
      const t = setTimeout(() => setPhase("deleting"), PAUSE_DONE_MS);
      return () => clearTimeout(t);
    }
    if (phase === "deleting" && shown.length > 0) {
      const t = setTimeout(
        () => setShown((s) => s.slice(0, -1)),
        DELETE_MS,
      );
      return () => clearTimeout(t);
    }
    if (phase === "deleting" && shown.length === 0) {
      const t = setTimeout(() => setPhase("typing"), PAUSE_EMPTY_MS);
      return () => clearTimeout(t);
    }
  }, [shown, phase]);

  return (
    <span className="font-mono text-zinc-700 dark:text-zinc-300">
      {shown}
      <span className="ml-px animate-pulse">▍</span>
    </span>
  );
}
