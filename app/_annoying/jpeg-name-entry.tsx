"use client";

import { useRef, useState } from "react";

export default function JpegNameEntry() {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      const ch = f.name.charAt(0);
      setName((n) => n + ch);
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <label className="text-sm font-medium">Enter your full name</label>
      <p className="text-xs text-zinc-500">
        Spell your name by uploading one JPEG per letter.
        The first character of the filename is added to your name.
        (e.g. <code>a.jpg</code>, <code>l.jpg</code>, <code>i.jpg</code>, …)
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/*,*"
        onChange={onFile}
        className="text-sm"
      />
      <div className="flex w-full items-center gap-2">
        <p className="font-mono text-base">
          {name || <span className="text-zinc-400">(empty)</span>}
        </p>
        {name && (
          <button
            onClick={() => setName("")}
            className="text-xs text-zinc-500 underline"
          >
            clear
          </button>
        )}
      </div>
    </div>
  );
}
