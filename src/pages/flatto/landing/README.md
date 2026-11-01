# Flatto landing page

The page at https://juliaaguero.com/flatto/. It's written in React and TypeScript like the rest of
the repo, but it isn't part of the app in `src/App.tsx`. It has its own entry, `flatto/index.html`,
and `scripts/prerenderLanding.ts` turns its components into plain HTML at build time. Visitors get
static HTML, one stylesheet and about 2 KB of JavaScript. No React reaches the browser, so the page
is fast and works with JavaScript off.

## Layers

Each layer knows only about the ones above it.

| Layer | Holds | Rule |
| --- | --- | --- |
| `content/` | Every word on the page, and its types | No markup, no styles |
| `domain/` | How someone joins: the prepared email, Gmail and WhatsApp links | No UI, pure functions |
| `ui/` | Pieces with no opinion about the page: Button, Phone, Icon, Logo | Takes props, never reads content |
| `sections/` | One component per step of the funnel | Combines content, domain and ui |
| `LandingPage.tsx` | The funnel, in order | Only composes sections |
| `render.tsx` | Build-time rendering to HTML | Never runs in a browser |

`styles/` and `behaviour/` sit alongside those:

- `styles/` is CSS only, in native cascade layers: `tokens`, `base`, `layout`, `components`,
  `sections`, `motion`. Each section keeps its phone and desktop rules together, mobile first, with
  breakpoints at 640px and 1024px.
- `behaviour/` is browser JavaScript, one concern per file. Everything in it is an extra: without
  it, every link works, every question opens and both join buttons send the email.

## Common changes

| To change | Edit |
| --- | --- |
| Any text | `content/landingContent.ts`, plus `03_Marketing/copy-flatto-landing.md` in the Flatto project |
| Colours, type sizes, spacing | `styles/tokens.css` |
| The order of the funnel | `LandingPage.tsx` |
| What the join email says | `join.phones` in `content/landingContent.ts` |
| An app screen | Re-export to `public/flatto/images/` as `<name>-420.avif`, `<name>-760.avif` and `<name>-760.jpg` |
| The share card | `scripts/social/flatto-share.html`, see `scripts/social/README.md` |

Anything the page says about the app must stay true: the copy file lists each claim and what it was
checked against. `__tests__/landingPage.test.tsx` fails if the page starts promising reminders or
invents social proof.

## Running it

```bash
npm run dev
```

Then open http://localhost:5173/flatto/. Text changes need a page reload, because the HTML is
rendered on the server. `npx vitest run src/pages/flatto/landing` runs its tests.
