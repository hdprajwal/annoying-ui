# Contributing

Got a worse idea than what's already here? Send it in.

## Ground rules

- The component should be **interactive** — not just a static screenshot of a bad UI.
- The annoyance should be **clear within ~5 seconds** of looking at it. If a user has to read instructions to understand the gag, it's not punchy enough.
- It should **work**, in the sense that you can actually drive it to a result. "Broken" is not the same as "annoying".
- Keep it **single-file**: one `.tsx` in `app/_annoying/`. No new dependencies unless absolutely necessary.
- **No malicious behaviour.** No data collection, no scripted clicks of other pages, no actually-harmful side effects.

## Add a component in 3 steps

### 1. Create the component

Add a new file at `app/_annoying/your-component.tsx`. It must be a `"use client"` component (most need state or event handlers).

```tsx
"use client";

import { useState } from "react";

export default function YourComponent() {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* the annoyance lives here */}
    </div>
  );
}
```

**Styling conventions** (so cards stay visually uniform):

- Use the zinc palette: `bg-white` / `dark:bg-zinc-900`, `border-zinc-300` / `dark:border-zinc-700`, `text-zinc-700` / `dark:text-zinc-300`.
- Avoid bright accent colours (red borders, blue fills) unless the gag genuinely requires them.
- Buttons: `rounded border border-zinc-400 bg-white px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800`.

**Touch / pointer events:**

- Prefer `onPointerDown` / `onPointerMove` / `onPointerUp` over `onMouseDown` / etc. — they cover both mouse and touch.
- Add `touch-none` to draggable elements so the browser doesn't intercept the gesture as a scroll.
- If your component genuinely can't be made to work on touch (depends on hover, mouse wheel, keyboard, etc.), set `desktopOnly: true` in the registry. A chip will appear on the card on touch devices.

**SSR safety** (Next 16 / React 19 hydration):

- Don't put `Math.random()` or `Date.now()` in `useState` initializers — server and client will produce different values and trigger a hydration mismatch. Use a deterministic initial value and randomise in a `useEffect(..., [])`.
- Format numbers in inline styles with `.toFixed(N)` if they're derived from `Math.cos` / `Math.sin` etc. — server and client floating-point output can differ in trailing digits.

### 2. Register it

Add an entry to `app/_annoying/registry.ts`:

```ts
import YourComponent from "./your-component";

export const COMPONENTS: AnnoyingComponent[] = [
  // ...existing entries
  {
    slug: "your-component",
    title: "Short snappy title",
    description: "One sentence describing the gag — shown on the detail page.",
    file: "app/_annoying/your-component.tsx",
    Component: YourComponent,
    // optional:
    span: 2,           // 1 | 2 | 3 — column-span on the home grid (default 1)
    desktopOnly: true, // adds a "🖱️ Desktop" chip on touch devices
  },
];
```

The `file` field is the path read by the detail page's source viewer. Keep it accurate or the "View source" tab will 404.

### 3. Verify

```bash
npm run dev
```

- The card should appear in the gallery at `/`.
- `/components/your-component` should render the live demo with the source code below.
- No console errors. No hydration warnings.

If you want, run a quick build to catch type errors:

```bash
npm run build
```

## Pull request

- Title: `Add <short component name>` (e.g. `Add ouija-board email input`).
- In the body, link to where you got the idea (Reddit thread, tweet, real-world horror story).
- A 5-second screen recording or screenshot helps reviewers a lot.

## Reporting issues

If a component breaks or a site-chrome annoyance becomes genuinely intolerable, open an issue with:

- The component slug (e.g. `tilt-box-volume`)
- Browser + OS
- What you did / what happened

## What we won't merge

- Plain phone-number variants — there are already a lot. New variants need a meaningfully different mechanic.
- Components that require external API keys or paid services.
- Components that genuinely break accessibility for users who didn't opt into the joke (no permanent focus traps, no infinite alerts, etc.). The joke can be annoying. It can't be hostile to the point of damage.
