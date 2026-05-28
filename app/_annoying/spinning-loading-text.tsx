"use client";

export default function SpinningLoadingText() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-40 w-40 items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="h-32 w-32 animate-spin"
          style={{ animationDuration: "2.5s" }}
        >
          <defs>
            <path
              id="loading-arc"
              d="M 50,50 m -36,0 a 36,36 0 1 1 72,0 a 36,36 0 1 1 -72,0"
              fill="none"
            />
          </defs>
          <circle
            cx="50"
            cy="50"
            r="36"
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            strokeDasharray="170 226"
            strokeLinecap="round"
          />
          <text fontSize="14" fontFamily="serif" fill="currentColor">
            <textPath href="#loading-arc" startOffset="0">
              Loading...
            </textPath>
          </text>
        </svg>
      </div>
      <span className="text-xs text-zinc-500">
        The text is part of the spinner. Read it while you can.
      </span>
    </div>
  );
}
