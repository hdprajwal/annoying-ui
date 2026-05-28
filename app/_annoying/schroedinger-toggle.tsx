"use client";

import { useState } from "react";

export default function SchroedingerToggle() {
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState(false);

  const shown = hover ? !on : null;

  return (
    <div className="flex flex-col items-start gap-4">
      <label className="text-sm font-medium">Notifications</label>
      <button
        onClick={() => setOn((v) => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-pressed={on}
        className={`relative flex h-7 w-14 items-center rounded-full border border-zinc-400 px-1 ${
          shown === null
            ? "bg-zinc-300 dark:bg-zinc-700"
            : shown
            ? "bg-green-500"
            : "bg-zinc-400 dark:bg-zinc-600"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
            shown === true ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>
      <div className="rounded bg-zinc-100 px-3 py-2 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        Real state: <strong>{on ? "ON" : "OFF"}</strong>
        <br />
        <span className="text-zinc-500">
          (hidden in production; only shown here so you can see the toggle lies)
        </span>
      </div>
      <span className="text-xs text-zinc-500">
        Looks unset by default. On hover, shows the opposite of reality. No
        click feedback.
      </span>
    </div>
  );
}
