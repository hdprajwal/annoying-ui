"use client";

import { useState } from "react";

type Rule = { label: string; test: (s: string) => boolean };

const RULES: Rule[] = [
  { label: "At least 8 characters", test: (s) => s.length >= 8 },
  { label: "Contains a Roman numeral (I, V, X, L, C, D, M)", test: (s) => /[IVXLCDM]/.test(s) },
  { label: "Does not contain the letter 'e' or 'E'", test: (s) => !/e/i.test(s) },
  { label: "Contains an emoji", test: (s) => /\p{Extended_Pictographic}/u.test(s) },
  { label: "Contains a prime number (2, 3, 5, 7, 11, 13)", test: (s) => /(?:^|\D)(?:2|3|5|7|11|13)(?:\D|$)/.test(s) },
  { label: "Ends with a question mark", test: (s) => s.endsWith("?") },
  { label: "Must rhyme with your username", test: () => false },
];

export default function PasswordRuleEscalator() {
  const [pw, setPw] = useState("");
  const [activeCount, setActiveCount] = useState(1);
  const [msg, setMsg] = useState<string | null>(null);

  function submit() {
    const nextCount = Math.min(RULES.length, activeCount + 1);
    const active = RULES.slice(0, nextCount);
    const allPass = active.every((r) => r.test(pw));
    setActiveCount(nextCount);
    if (allPass) {
      setMsg("Password accepted!");
    } else if (nextCount > activeCount) {
      setMsg(`Almost — one more rule: "${RULES[nextCount - 1].label}"`);
    } else {
      const failed = active.find((r) => !r.test(pw));
      setMsg(failed ? `Your password failed: "${failed.label}"` : "Password accepted!");
    }
  }

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <label className="text-sm font-medium">Create a password</label>
      <input
        type="text"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="w-full max-w-xs rounded border border-zinc-300 px-3 py-1.5 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-900"
      />
      <button
        onClick={submit}
        className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Set password
      </button>
      {msg && (
        <p className={`text-sm ${msg.startsWith("Password accepted") ? "text-green-600" : "text-red-600"}`}>
          {msg}
        </p>
      )}
      <ul className="mt-1 space-y-0.5 text-xs">
        {RULES.slice(0, activeCount).map((r, i) => {
          const ok = r.test(pw);
          return (
            <li key={i} className={ok ? "text-green-600" : "text-zinc-500"}>
              {ok ? "✓" : "○"} {r.label}
            </li>
          );
        })}
        {activeCount < RULES.length && (
          <li className="text-zinc-400">… more rules will appear on each failed attempt.</li>
        )}
      </ul>
    </div>
  );
}
