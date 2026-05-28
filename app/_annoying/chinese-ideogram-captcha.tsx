"use client";

import { useEffect, useState } from "react";

const POOL = "鬱龘麤靐齉爨灪虋讟钃";

function pick(n: number) {
  let s = "";
  for (let i = 0; i < n; i++) {
    s += POOL[Math.floor(Math.random() * POOL.length)];
  }
  return s;
}

export default function ChineseIdeogramCaptcha() {
  const [captcha, setCaptcha] = useState(POOL.slice(0, 6));
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    setCaptcha(pick(6));
  }, []);

  function reroll() {
    setCaptcha(pick(6));
    setInput("");
    setMsg(null);
  }

  function check() {
    if (input === captcha) setMsg("Verified.");
    else setMsg("Incorrect. Try again.");
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <label className="text-sm font-medium">
        Type the characters below
      </label>
      <div className="relative w-fit overflow-hidden rounded border border-zinc-400 bg-zinc-100 dark:bg-zinc-800">
        <div
          className="select-none px-4 py-3 font-serif text-3xl tracking-widest text-zinc-900"
          style={{
            transform: "skew(-8deg)",
            background:
              "repeating-linear-gradient(45deg, transparent 0 4px, rgba(0,0,0,0.05) 4px 8px)",
          }}
        >
          {captcha}
        </div>
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onPaste={(e) => e.preventDefault()}
        placeholder="Type the characters"
        className="w-full max-w-xs rounded border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />
      <div className="flex gap-2">
        <button
          onClick={check}
          className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Verify
        </button>
        <button
          onClick={reroll}
          className="rounded border border-zinc-400 px-4 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          Refresh
        </button>
      </div>
      {msg && <p className="text-sm">{msg}</p>}
      <span className="text-xs text-zinc-500">
        Paste disabled. Hope you've got an IME installed.
      </span>
    </div>
  );
}
