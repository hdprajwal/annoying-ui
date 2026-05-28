"use client";

import { useMemo, useState } from "react";

const PI_PREFIX =
  "14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912";

function makeDigits(total: number): string {
  let out = PI_PREFIX;
  let s = 31415926;
  while (out.length < total) {
    s = (s * 1664525 + 1013904223) >>> 0;
    out += (s % 10).toString();
  }
  return out.slice(0, total);
}

export default function PiBirthdayPicker() {
  const digits = useMemo(() => makeDigits(5000), []);
  const [mm, setMM] = useState("");
  const [dd, setDD] = useState("");
  const [yy, setYY] = useState("");

  const target =
    mm.padStart(2, "0") + dd.padStart(2, "0") + yy.padStart(2, "0");
  const valid = mm.length > 0 && dd.length > 0 && yy.length > 0;
  const index = valid ? digits.indexOf(target) : -1;

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-sm">
        Locate your birthday (MMDDYY) somewhere in the first 5,000 digits of π.
        <span className="text-zinc-500"> Tip: Ctrl+F is your only friend.</span>
      </p>
      <div className="flex flex-wrap gap-2 text-sm">
        <input
          inputMode="numeric"
          maxLength={2}
          placeholder="MM"
          value={mm}
          onChange={(e) => setMM(e.target.value.replace(/\D/g, ""))}
          className="w-16 rounded border border-zinc-300 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <input
          inputMode="numeric"
          maxLength={2}
          placeholder="DD"
          value={dd}
          onChange={(e) => setDD(e.target.value.replace(/\D/g, ""))}
          className="w-16 rounded border border-zinc-300 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <input
          inputMode="numeric"
          maxLength={2}
          placeholder="YY"
          value={yy}
          onChange={(e) => setYY(e.target.value.replace(/\D/g, ""))}
          className="w-16 rounded border border-zinc-300 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900"
        />
        {valid && (
          <span className="self-center text-xs text-zinc-500">
            {index >= 0
              ? `Your birthday starts at digit ${index + 1}. Go find it.`
              : "Not in the first 5,000 digits. Sorry."}
          </span>
        )}
      </div>
      <div className="h-56 overflow-y-auto rounded border border-zinc-300 bg-white p-3 font-mono text-xs leading-relaxed tracking-wider text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
        3.{digits}
      </div>
    </div>
  );
}
