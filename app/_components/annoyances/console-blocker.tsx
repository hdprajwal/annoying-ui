"use client";

import { useEffect } from "react";

const TITLE_STYLE =
  "color:red;font-size:48px;font-weight:bold;font-family:monospace;text-shadow:3px 3px 0 #000;padding:8px 0";
const BODY_STYLE =
  "color:#fff;background:#dc2626;font-size:16px;padding:10px 16px;font-family:sans-serif;border-radius:4px";
const FOOTER_STYLE =
  "color:#888;font-size:12px;font-family:monospace;font-style:italic";

const TITLE = "%c🛑 STOP";
const BODY =
  "%cThis console is for tech nerds only.\nIf you're not one, please close DevTools and walk away.";
const FOOTER = "%c(if you ARE one, you should know better.)";

let alreadyShouted = false;

function shout() {
  // eslint-disable-next-line no-console
  console.warn(
    `${TITLE}\n${BODY}\n${FOOTER}`,
    TITLE_STYLE,
    BODY_STYLE,
    FOOTER_STYLE,
  );
}

export default function ConsoleBlocker() {
  useEffect(() => {
    if (alreadyShouted) return;
    alreadyShouted = true;
    shout();
  }, []);
  return null;
}
