"use client";

import { useEffect, useState } from "react";

const ORDINAL = [
  "1st", "2nd", "3rd", "4th", "5th",
  "6th", "7th", "8th", "9th", "10th",
];

function format(arr: (number | null)[]) {
  const s = arr.map((d) => (d === null ? "_" : String(d)));
  return `(${s[0]}${s[1]}${s[2]}) ${s[3]}${s[4]}${s[5]}-${s[6]}${s[7]}${s[8]}${s[9]}`;
}

function pickQuestion(filled: (number | null)[]) {
  const empties = filled.flatMap((v, i) => (v === null ? [i] : []));
  if (empties.length === 0) return null;
  const pos = empties[Math.floor(Math.random() * empties.length)];
  const digit = Math.floor(Math.random() * 10);
  return { pos, digit };
}

export default function YesNoPhoneQuiz() {
  const [digits, setDigits] = useState<(number | null)[]>(Array(10).fill(null));
  const [q, setQ] = useState<{ pos: number; digit: number } | null>({
    pos: 0,
    digit: 0,
  });

  useEffect(() => {
    setQ(pickQuestion(Array(10).fill(null)));
  }, []);

  function answer(yes: boolean) {
    if (!q) return;
    if (yes) {
      const next = [...digits];
      next[q.pos] = q.digit;
      setDigits(next);
      setQ(pickQuestion(next));
    } else {
      setQ(pickQuestion(digits));
    }
  }

  function clear() {
    const empty = Array(10).fill(null);
    setDigits(empty);
    setQ(pickQuestion(empty));
  }

  return (
    <div className="flex flex-col gap-4">
      {q ? (
        <>
          <p className="text-base">
            Is the number <strong>{q.digit}</strong> on the{" "}
            <strong>{ORDINAL[q.pos]}</strong> place of your telephone number?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => answer(true)}
              className="rounded border border-zinc-400 bg-white px-4 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              Yes
            </button>
            <button
              onClick={() => answer(false)}
              className="rounded border border-zinc-400 bg-white px-4 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              No
            </button>
          </div>
        </>
      ) : (
        <p className="text-base font-semibold">Done! Your number:</p>
      )}
      <p className="font-mono text-base">
        My telephone number: {format(digits)}
      </p>
      <button
        onClick={clear}
        className="self-start rounded border border-zinc-400 bg-white px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
      >
        Clear
      </button>
    </div>
  );
}
