"use client";

import { useMemo, useState } from "react";

type Channel = "R" | "G" | "B";

function makeQuestions() {
  const qs: { channel: Channel; bit: number }[] = [];
  for (const c of ["R", "G", "B"] as Channel[]) {
    for (let bit = 7; bit >= 0; bit--) qs.push({ channel: c, bit });
  }
  return { qs };
}

export default function RgbThreeQuestionQuiz() {
  const [round, setRound] = useState(() => makeQuestions());
  const [idx, setIdx] = useState(0);
  const [bounds, setBounds] = useState({
    R: { lo: 0, hi: 255 },
    G: { lo: 0, hi: 255 },
    B: { lo: 0, hi: 255 },
  });

  const done = idx >= round.qs.length;
  const current = round.qs[idx];

  const guess = useMemo(
    () => ({
      R: Math.round((bounds.R.lo + bounds.R.hi) / 2),
      G: Math.round((bounds.G.lo + bounds.G.hi) / 2),
      B: Math.round((bounds.B.lo + bounds.B.hi) / 2),
    }),
    [bounds],
  );

  function answer(yes: boolean) {
    if (done) return;
    const b = { ...bounds, [current.channel]: { ...bounds[current.channel] } };
    const mid = Math.round((b[current.channel].lo + b[current.channel].hi) / 2);
    if (yes) b[current.channel].lo = mid + 1;
    else b[current.channel].hi = mid;
    setBounds(b);
    setIdx((i) => i + 1);
  }

  function restart() {
    setRound(makeQuestions());
    setIdx(0);
    setBounds({
      R: { lo: 0, hi: 255 },
      G: { lo: 0, hi: 255 },
      B: { lo: 0, hi: 255 },
    });
  }

  const threshold = current
    ? Math.round((bounds[current.channel].lo + bounds[current.channel].hi) / 2)
    : 0;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-zinc-500">
        Picking your color in {round.qs.length} yes/no questions.
        ({idx}/{round.qs.length})
      </p>
      {!done ? (
        <>
          <p className="text-base">
            Is the <strong>{current.channel}</strong> channel greater than{" "}
            <strong>{threshold}</strong>?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => answer(true)}
              className="rounded border border-zinc-400 bg-white px-4 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900"
            >
              Yes
            </button>
            <button
              onClick={() => answer(false)}
              className="rounded border border-zinc-400 bg-white px-4 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900"
            >
              No
            </button>
          </div>
        </>
      ) : (
        <p className="text-base font-semibold">Your color:</p>
      )}
      <div className="flex items-center gap-3">
        <div
          className="h-12 w-12 rounded border border-zinc-300 dark:border-zinc-700"
          style={{ background: `rgb(${guess.R}, ${guess.G}, ${guess.B})` }}
        />
        <span className="font-mono text-sm">
          rgb({guess.R}, {guess.G}, {guess.B})
        </span>
      </div>
      <button
        onClick={restart}
        className="self-start text-xs text-zinc-500 underline"
      >
        start over
      </button>
    </div>
  );
}
