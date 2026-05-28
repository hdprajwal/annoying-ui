"use client";

import { useEffect, useState } from "react";

const LENGTH = 10;
const TICK_MS = 60;

export default function SlotMachinePhone() {
  const [digits, setDigits] = useState<number[]>(Array(LENGTH).fill(0));
  const [stoppedIdx, setStoppedIdx] = useState(0);

  useEffect(() => {
    if (stoppedIdx >= LENGTH) return;
    const id = setInterval(() => {
      setDigits((arr) =>
        arr.map((d, i) =>
          i < stoppedIdx ? d : Math.floor(Math.random() * 10),
        ),
      );
    }, TICK_MS);
    return () => clearInterval(id);
  }, [stoppedIdx]);

  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-lg font-bold">Please enter your phone number:</h3>
      <div className="flex flex-wrap gap-1.5">
        {digits.map((d, i) => (
          <div
            key={i}
            className={`flex h-10 w-7 md:h-14 md:w-10 items-center justify-center rounded border font-serif text-3xl text-zinc-900 ${
              i < stoppedIdx
                ? "border-zinc-700 bg-white"
                : "border-zinc-400 bg-gradient-to-b from-zinc-100 to-zinc-300"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setStoppedIdx(0)}
          className="flex-1 rounded border border-zinc-400 bg-gradient-to-b from-zinc-100 to-zinc-200 py-2 text-sm hover:from-zinc-200 hover:to-zinc-300 dark:from-zinc-800 dark:to-zinc-900"
        >
          Restart
        </button>
        <button
          onClick={() => setStoppedIdx((i) => Math.min(LENGTH, i + 1))}
          disabled={stoppedIdx >= LENGTH}
          className="flex-1 rounded border border-zinc-400 bg-gradient-to-b from-zinc-100 to-zinc-200 py-2 text-sm hover:from-zinc-200 hover:to-zinc-300 disabled:opacity-50 dark:from-zinc-800 dark:to-zinc-900"
        >
          Set
        </button>
      </div>
      <span className="text-xs text-zinc-500">
        Click <strong>Set</strong> to freeze the leftmost spinning reel. Time it
        right.
      </span>
    </div>
  );
}
