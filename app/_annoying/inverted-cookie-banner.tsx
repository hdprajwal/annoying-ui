"use client";

import { useMemo, useState } from "react";

const VENDORS = [
  "AdNexus",
  "Criteo",
  "DoubleClick",
  "Quantcast",
  "OpenX",
  "RubiconProject",
  "Pubmatic",
  "Taboola",
  "Outbrain",
  "AppNexus",
  "LiveRamp",
  "Lotame",
  "Acxiom",
  "Neustar",
  "Oracle Data Cloud",
  "Adobe Audience",
  "Salesforce DMP",
  "BlueKai",
  "DataLogix",
  "Nielsen",
  "Comscore",
  "Mixpanel",
  "Amplitude",
  "Hotjar",
  "FullStory",
  "Segment",
  "mParticle",
  "Pendo",
  "Heap",
];

type Stage = "banner" | "manage" | "vendors" | "legitimate" | "object" | "done";

export default function InvertedCookieBanner() {
  const [stage, setStage] = useState<Stage>("banner");
  const [vendorStates, setVendorStates] = useState<boolean[]>(() =>
    VENDORS.map(() => true),
  );
  const [outcome, setOutcome] = useState<"accepted" | "rejected" | null>(null);

  function acceptAll() {
    setOutcome("accepted");
    setStage("done");
  }
  function objectAll() {
    setVendorStates(VENDORS.map(() => false));
  }

  if (stage === "done") {
    return (
      <div className="rounded border border-zinc-300 bg-white p-4 text-sm dark:border-zinc-700 dark:bg-zinc-950">
        Preferences saved:{" "}
        <strong>
          {outcome === "accepted"
            ? "All cookies accepted"
            : "Rejected (probably)"}
        </strong>
        .
        <button
          onClick={() => {
            setStage("banner");
            setOutcome(null);
            setVendorStates(VENDORS.map(() => true));
          }}
          className="ml-2 text-xs underline"
        >
          reset
        </button>
      </div>
    );
  }

  return (
    <div className="w-full rounded border border-zinc-300 bg-white p-4 text-sm dark:border-zinc-700 dark:bg-zinc-950">
      {stage === "banner" && (
        <>
          <p className="font-semibold">We respect your privacy.</p>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            We and our partners use cookies to enhance your experience.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={acceptAll}
              className="rounded bg-green-600 px-2 md:px-6 py-2 text-base font-bold text-white hover:bg-green-700"
            >
              I do NOT accept
            </button>
            <button
              onClick={acceptAll}
              className="text-[10px] text-zinc-400 underline"
            >
              accept
            </button>
            <button
              onClick={() => setStage("manage")}
              className="ml-auto text-xs text-zinc-500 underline"
            >
              Manage preferences →
            </button>
          </div>
        </>
      )}

      {stage === "manage" && (
        <>
          <p className="font-semibold">Manage preferences</p>
          <p className="mt-1 text-xs text-zinc-500">
            Choose which categories to allow.
          </p>
          <button
            onClick={() => setStage("vendors")}
            className="mt-3 text-xs text-zinc-700 underline dark:text-zinc-300"
          >
            Vendors →
          </button>
        </>
      )}

      {stage === "vendors" && (
        <>
          <p className="font-semibold">Our partners</p>
          <p className="mt-1 text-xs text-zinc-500">
            We work with the following vendors.
          </p>
          <button
            onClick={() => setStage("legitimate")}
            className="mt-3 text-xs text-zinc-700 underline dark:text-zinc-300"
          >
            Legitimate interest →
          </button>
        </>
      )}

      {stage === "legitimate" && (
        <>
          <p className="font-semibold">Legitimate interest</p>
          <p className="mt-1 text-xs text-zinc-500">
            Some processing does not require your consent.
          </p>
          <button
            onClick={() => setStage("object")}
            className="mt-3 text-xs text-zinc-700 underline dark:text-zinc-300"
          >
            Object to all →
          </button>
        </>
      )}

      {stage === "object" && (
        <>
          <p className="font-semibold">Object to {VENDORS.length} vendors</p>
          <p className="mt-1 text-xs text-zinc-500">
            Untoggle each vendor individually. Or click "Object to all".
          </p>
          <button
            onClick={objectAll}
            className="mt-2 text-xs text-zinc-700 underline dark:text-zinc-300"
          >
            Object to all (recommended)
          </button>
          <div className="mt-3 max-h-32 overflow-y-auto rounded border border-zinc-200 dark:border-zinc-800">
            {VENDORS.map((v, i) => (
              <label
                key={v}
                className="flex items-center justify-between px-2 py-1 text-xs odd:bg-zinc-50 dark:odd:bg-zinc-900"
              >
                <span>{v}</span>
                <input
                  type="checkbox"
                  checked={vendorStates[i]}
                  onChange={(e) =>
                    setVendorStates((s) =>
                      s.map((v, j) => (i === j ? e.target.checked : v)),
                    )
                  }
                />
              </label>
            ))}
          </div>
          <button
            onClick={() => {
              setOutcome("rejected");
              setStage("done");
            }}
            disabled={vendorStates.some(Boolean)}
            className="mt-3 rounded border border-zinc-400 px-3 py-1 text-xs disabled:opacity-40"
          >
            Save preferences ({vendorStates.filter(Boolean).length} still
            enabled)
          </button>
        </>
      )}
    </div>
  );
}
