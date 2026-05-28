<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version (Next 16, React 19, Tailwind 4) has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## What this project is

A gallery of intentionally bad UI components. Each component lives in `app/_annoying/`, is registered in `app/_annoying/registry.ts`, and gets a detail page at `/components/[slug]` that renders the live component alongside its source code read off disk via `fs.readFile`.

## Conventions to follow

- **Always work via the registry.** Components are discovered exclusively through `COMPONENTS` in `app/_annoying/registry.ts`. Adding a `.tsx` file without registering it does nothing.
- **Underscore-prefixed folders are private.** `app/_annoying/` and `app/_components/` are private folders excluded from routing — don't try to navigate to them as URLs.
- **Source is read off disk at request time.** The `file` field on each registry entry is an absolute-style path from project root (e.g. `app/_annoying/foo.tsx`). If you rename or move a component file, update its `file` field or the detail page will break.

## SSR / hydration gotchas

This codebase has hit hydration mismatches several times — here's what to avoid:

- **Never put `Math.random()`, `Date.now()`, or any non-deterministic value in a `useState` initializer.** Use a fixed initial value, then randomise in `useEffect(..., [])`. See `random-phone-guesser.tsx`, `glass-vs-glasses-captcha.tsx` for the pattern.
- **Floating-point math in inline styles is not byte-stable across server/client.** `Math.cos(...) * 40` may serialise as `"30%"` on one side and `"29.999999999999982%"` on the other. Use `.toFixed(3)` before interpolation. See `am-pm-flip-clock.tsx`.
- **The root `<html>` carries `suppressHydrationWarning`** because the theme-init script mutates `classList` before hydration. Do not remove this attribute.
- **For inline scripts, use `next/script` with `dangerouslySetInnerHTML`**, not children. Children form triggers a React 19 warning about script tags in components. See `app/layout.tsx`.

## Touch / mobile

- Prefer `onPointerDown` / `onPointerMove` / `onPointerUp` over `onMouseDown` etc. — they cover both mouse and touch.
- Add `touch-none` to draggable elements so the browser doesn't hijack the gesture for scrolling.
- If a component can't be made to work on touch (relies on hover, wheel, or keyboard), set `desktopOnly: true` in its registry entry. A chip will be shown on touch devices.
- A site-wide mobile notice (`app/_components/mobile-notice.tsx`) already warns first-time touch visitors that the site is best on desktop — do not duplicate this.

## Styling

- Tailwind 4 with class-based dark mode (`@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`). Use `dark:` variants normally.
- Stick to the zinc palette for new components: `bg-white` / `dark:bg-zinc-900`, `border-zinc-300` / `dark:border-zinc-700`. Bright accent colors break the gallery's visual uniformity.
- The home grid uses `grid-flow-dense` with `xl:grid-cols-4`. Use the `span` field on the registry entry (1 | 2 | 3) — don't hardcode col-span classes on the card.

## Don't do

- Don't add new npm dependencies for one-off effects. Most annoyances can be implemented with vanilla React + Tailwind.
- Don't introduce backwards-compatibility shims, feature flags, or "either-this-or-that" code paths. The codebase changes freely.
- Don't write commit messages with `Co-Authored-By:` trailers (per global preferences).
- Don't use Markdown blockquotes for content the user will copy-paste.
