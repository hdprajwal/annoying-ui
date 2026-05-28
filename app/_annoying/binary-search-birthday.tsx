"use client";

import { useState } from "react";

const INITIAL_LOW = new Date(1937, 7, 29);
const INITIAL_HIGH = new Date(2021, 8, 30);

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function fmt(d: Date) {
  return `${MONTHS[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
}

function mid(a: Date, b: Date) {
  return new Date(Math.round((a.getTime() + b.getTime()) / 2));
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

export default function BinarySearchBirthday() {
  const [low, setLow] = useState(INITIAL_LOW);
  const [high, setHigh] = useState(INITIAL_HIGH);
  const [guesses, setGuesses] = useState(1);

  const current = mid(low, high);
  const done = low.getTime() >= high.getTime();

  function earlier() {
    setHigh(addDays(current, -1));
    setGuesses((g) => g + 1);
  }
  function later() {
    setLow(addDays(current, 1));
    setGuesses((g) => g + 1);
  }
  function reset() {
    setLow(INITIAL_LOW);
    setHigh(INITIAL_HIGH);
    setGuesses(1);
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h3 className="font-serif text-2xl font-bold">Is this your birthday?</h3>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="font-mono text-sm text-zinc-500">{fmt(low)}</span>
        {!done && (
          <button
            onClick={earlier}
            className="rounded border border-zinc-400 bg-white px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            Earlier
          </button>
        )}
        <span className="font-serif text-2xl font-bold">{fmt(current)}</span>
        {!done && (
          <button
            onClick={later}
            className="rounded border border-zinc-400 bg-white px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            Later
          </button>
        )}
        <span className="font-mono text-sm text-zinc-500">{fmt(high)}</span>
      </div>
      <p className="text-sm">
        {done ? (
          <>Birthday confirmed in {guesses} guesses.</>
        ) : (
          <>{guesses} {guesses === 1 ? "Guess" : "Guesses"}</>
        )}
      </p>
      <button
        onClick={reset}
        className="text-xs text-zinc-500 underline underline-offset-2"
      >
        start over
      </button>
    </div>
  );
}
