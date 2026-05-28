"use client";

import { useEffect, useState } from "react";

function rand10() {
  let s = "";
  for (let i = 0; i < 10; i++) s += Math.floor(Math.random() * 10);
  return s;
}

export default function RandomPhoneGuesser() {
  const [n, setN] = useState("0000000000");
  const [tries, setTries] = useState(1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setN(rand10());
  }, []);

  function restart() {
    setN(rand10());
    setTries(1);
    setDone(false);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-sm">
          Confirmed: <span className="font-mono font-bold">{n}</span>
        </p>
        <p className="text-xs text-zinc-500">Only {tries} attempts.</p>
        <button onClick={restart} className="text-xs underline">
          play again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-base">
        Is this your phone number?{" "}
        <span className="font-mono font-bold">{n}</span>
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => setDone(true)}
          className="rounded border border-zinc-400 bg-white px-5 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          Yes
        </button>
        <button
          onClick={() => {
            setN(rand10());
            setTries((t) => t + 1);
          }}
          className="rounded border border-zinc-400 bg-zinc-200 px-5 py-1.5 text-sm hover:bg-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          No
        </button>
      </div>
      <span className="text-xs text-zinc-500">Attempt #{tries}</span>
    </div>
  );
}
