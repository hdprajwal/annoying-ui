"use client";

import { useEffect, useRef, useState } from "react";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina",
  "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
  "Chad", "Chile", "China", "Colombia", "Comoros", "Croatia",
  "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica",
  "Ecuador", "Egypt", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
  "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia",
];

const ITEM_HEIGHT = 28;
const VISIBLE = 7;
const MARKER_ROW = Math.floor(VISIBLE / 2);
const TOTAL_HEIGHT = COUNTRIES.length * ITEM_HEIGHT;

function indexAtOffset(offset: number) {
  const normalized = ((offset % TOTAL_HEIGHT) + TOTAL_HEIGHT) % TOTAL_HEIGHT;
  const raw = Math.round(normalized / ITEM_HEIGHT) + MARKER_ROW;
  return ((raw % COUNTRIES.length) + COUNTRIES.length) % COUNTRIES.length;
}

export default function DartThrowCountryPicker() {
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);
  const [spinning, setSpinning] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const speedRef = useRef(800);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    if (!spinning) return;
    let raf = 0;
    let last = performance.now();
    function tick(t: number) {
      const dt = (t - last) / 1000;
      last = t;
      const next =
        (offsetRef.current + speedRef.current * dt) % TOTAL_HEIGHT;
      offsetRef.current = next;
      setOffset(next);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [spinning]);

  function throwDart() {
    speedRef.current = 800;
    setSpinning(true);
    setSelected(null);
    const decay = setInterval(() => {
      speedRef.current *= 0.92;
      if (speedRef.current < 5) {
        clearInterval(decay);
        const snapped =
          Math.round(offsetRef.current / ITEM_HEIGHT) * ITEM_HEIGHT;
        offsetRef.current = snapped;
        setOffset(snapped);
        setSpinning(false);
        setSelected(COUNTRIES[indexAtOffset(snapped)]);
      }
    }, 80);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <label className="text-sm font-medium">Country of residence</label>
      <div className="relative h-[196px] w-56 overflow-hidden rounded border-2 border-zinc-700 bg-white dark:bg-zinc-100">
        <div
          className="absolute left-0 right-0"
          style={{
            top: -offset,
            transition: spinning ? "none" : "top 0.25s ease-out",
          }}
        >
          {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-center text-sm text-zinc-900"
              style={{ height: ITEM_HEIGHT }}
            >
              {c}
            </div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute left-0 right-0 border-y-2 border-red-500/60"
          style={{ top: ITEM_HEIGHT * MARKER_ROW, height: ITEM_HEIGHT }}
        />
      </div>
      <button
        onClick={throwDart}
        className="rounded bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
      >
        🎯 Throw dart
      </button>
      {selected && (
        <p className="text-sm">
          You selected: <strong>{selected}</strong>{" "}
          <button onClick={throwDart} className="text-xs text-zinc-500 underline">
            try again
          </button>
        </p>
      )}
    </div>
  );
}
