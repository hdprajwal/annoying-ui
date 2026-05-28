# Annoying UI

> A gallery of intentionally hostile UI components. Interact with each one, then read the source.

Inspired by [r/badUIbattles](https://www.reddit.com/r/badUIbattles/), [userinyerface.com](https://userinyerface.com/), and every form you've ever rage-quit.

## What's in here

Thirty-plus interactive components designed to fail you in delightful ways: a volume slider that responds only to horizontal scroll, a phone-number picker that requires ten thousand `+` clicks, a CAPTCHA built from un-typable CJK glyphs, a "Cancel" button that runs from your cursor, a date picker that puts you in a queue, and many more.

The site itself is also out to get you — slide-to-switch theme toggle, lerp-y scrolling, a giant right-click blocker, a fake newsletter modal, and a console that lectures you for opening DevTools.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**

Every component's source code is read directly off disk at request time via `fs.readFile`, so the "View source" tab on each detail page is guaranteed in sync with the live component.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project layout

```
app/
  layout.tsx                   # root layout, site header, theme + chrome annoyances
  page.tsx                     # gallery grid
  globals.css                  # Tailwind 4 entry + theme tokens
  components/[slug]/page.tsx   # per-component detail page (reads .tsx source from disk)
  _annoying/                   # the actual annoying components (private route)
    registry.ts                # source of truth: metadata + Component imports
    *.tsx                      # one file per gallery component
  _components/                 # site chrome (theme toggle, share button, mobile notice)
    annoyances/                # site-level annoying behaviours (scroll, right-click, etc.)
```

The leading underscore on `_annoying/` and `_components/` marks them as **private folders** that Next won't expose as routes.

## Adding a new annoying component

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE) © HD Prajwal
