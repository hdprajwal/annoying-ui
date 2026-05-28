"use client";

import { useEffect, useRef, useState } from "react";

type State =
  | { kind: "idle"; committed: string | null }
  | { kind: "queued"; pending: string; position: number; etaMs: number }
  | { kind: "committed"; value: string };

export default function QueueDatePicker() {
  const [state, setState] = useState<State>({ kind: "idle", committed: null });
  const inputRef = useRef<HTMLInputElement>(null);

  function startQueue(pending: string) {
    const position = 1000 + Math.floor(Math.random() * 8000);
    const etaMs = position * 30;
    setState({ kind: "queued", pending, position, etaMs });
  }

  useEffect(() => {
    if (state.kind !== "queued") return;
    const startedAt = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      if (elapsed >= state.etaMs) {
        setState({ kind: "committed", value: state.pending });
        clearInterval(id);
        return;
      }
      setState((prev) => {
        if (prev.kind !== "queued") return prev;
        const remaining = prev.etaMs - elapsed;
        const newPos = Math.max(1, Math.floor(prev.position * (remaining / prev.etaMs)));
        return { ...prev, position: newPos };
      });
    }, 200);
    return () => clearInterval(id);
  }, [state.kind === "queued" ? state.etaMs : null, state.kind === "queued" ? state.pending : null]);

  function cancel() {
    setState({ kind: "idle", committed: null });
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <label className="text-sm font-medium">Pick a date</label>
      <input
        ref={inputRef}
        type="date"
        disabled={state.kind === "queued"}
        onChange={(e) => e.target.value && startQueue(e.target.value)}
        className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />
      {state.kind === "queued" && (
        <div className="rounded border border-amber-400 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          You are <strong>#{state.position.toLocaleString()}</strong> in line to
          commit <span className="font-mono">{state.pending}</span>. ETA{" "}
          {Math.ceil(state.etaMs / 1000)}s.
          <button
            onClick={cancel}
            className="ml-2 text-xs underline"
          >
            cancel
          </button>
        </div>
      )}
      {state.kind === "committed" && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Committed: <span className="font-mono">{state.value}</span>
        </p>
      )}
      <span className="text-xs text-zinc-500">
        Cancelling or changing the date sends you to the back of a new queue.
      </span>
    </div>
  );
}
