"use client";

import { useState } from "react";

export default function BadPhoneValidation() {
  const [value, setValue] = useState("");

  const num = Number(value);
  const error = value !== "" && (Number.isNaN(num) || num !== 10);

  return (
    <label className="flex w-full max-w-sm flex-col gap-2">
      <span className="text-sm font-medium">
        Contact Number <span className="text-red-500">*</span>
      </span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your phone number"
        className={`rounded-md border bg-transparent px-3 py-2 text-base outline-none ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
            : "border-zinc-300 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:focus:ring-zinc-700"
        }`}
      />
      {error && (
        <span className="flex items-center gap-1.5 text-sm text-red-600">
          <span aria-hidden>ⓘ</span> Must be a number equal to 10
        </span>
      )}
    </label>
  );
}
