"use client";

import AttentionGrabTitle from "./annoyances/attention-grab-title";
import ConsoleBlocker from "./annoyances/console-blocker";
import LerpyScroll from "./annoyances/lerpy-scroll";
import NewsletterModal from "./annoyances/newsletter-modal";
import ResizeComplainer from "./annoyances/resize-complainer";
import RightClickBlocker from "./annoyances/right-click-blocker";

export default function SiteAnnoyances() {
  return (
    <>
      <AttentionGrabTitle />
      <LerpyScroll />
      <ResizeComplainer />
      <RightClickBlocker />
      <NewsletterModal />
      <ConsoleBlocker />
    </>
  );
}
