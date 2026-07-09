# JBD — Project Structure (read this before any handoff)

_The single orientation doc for anyone (human or Claude) producing output that
has to land in this repo. Reviewed against `jcdev7858/JourneyBeforeDestination`._

For **what to build** in the Oaths area specifically, see
`JBD - Design Sync (Repo Implementation Spec).md`. This doc is about **how the
app is actually built** so your handoff code ports in cleanly.

---

## 0. Two worlds — don't confuse them

The repo holds two things that look similar and are wired completely differently.

### `Specs/Claude/…` — the handoff / preview world (a design sandbox)
- Runs in the browser with **Babel-standalone** transpiling `.jsx` at load time.
- Components are loaded as `<script>` tags and share one big **global scope**
  (`window.OathsPage`, `window.OrderGlyph`, `WomensScript`, …).
- One monolithic stylesheet: **`jbd-styles.css`** (handoff) / `jbd-pages.css`
  + `jbd-v2.css` (explorations canvas). Plain global classes, no scoping.
- Fonts come from the **Google Fonts CDN**.
- **Nothing here is imported by the app.** It exists to design + review look and
  interaction, and to hand a working reference to whoever builds the real thing.

### `app/` — the real product (Vite + React)
- A **Vite** build. **ES modules** only, real `import`/`export`.
- **CSS Modules** (`*.module.css`), imported per component.
- **Self-hosted** fonts (not the CDN).
- Design **tokens** are the source of truth in the app's global stylesheet
  (`app/src/index.css` — the `:root` custom properties).

> The #1 mistake: treating the handoff globals/CSS as if they were the app.
> They are a specification of behavior and look, not the implementation.

---

## 1. The real stack (`app/`)

- **React, function components + hooks only.** No class components. State via
  `useState`/`useContext`; app data via `AppDataProvider` + `AppDataContext`
  (`app/src/context/`). Routing is `react-router-dom` (`App.jsx` → `Layout` →
  `Dashboard` / `Oaths` / `Journal` / `RadiantDex` / `Profile`).
- **JavaScript + JSDoc — no TypeScript.** There are no `.tsx`/`.ts` files. Types
  live as JSDoc typedefs (e.g. the `Oath` type). Keep it that way; don't
  introduce `.tsx`.
- **CSS Modules, camelCase class names, native nesting.** Each component has a
  sibling `X.module.css` imported as `styles` (`styles.progressFill`). Nesting
  uses native CSS `&`. Class names are camelCase (`.progressTrack`, `.oathText`).
- **Design tokens are the source of truth** in `app/src/index.css` `:root`.
  Components reference `var(--token)`; they don't hardcode the palette. Token
  vocabulary matches the handoff: `--stormlight` / `--stormlight-deep`,
  `--accent` / `--accent-rgb` / `--accent-deep`, `--text` / `--text-muted` /
  `--text-faint`, `--font-display` (Cormorant Garamond) / `--font-body`
  (Hanken Grotesk), radii, easings.
  - The blue GLOW is the constant stormlight; the Order **accent** (`--accent*`) recolors only a short fixed list of marks. The glow must NEVER recolor per Order — so it uses `--stormlight-rgb` (a channel token for any-alpha rgba), never `--accent-rgb`.
- **New token?** Add it to `index.css` FIRST, then propagate. Mark it in the handoff so it gets upstreamed. (This is why `--stormlight-rgb` / `--danger-rgb` exist.)
- Legit-raw values (bright gradient highlights like `#aee0fb`, structural white/black overlays) stay literal — there's no token for them and shouldn't be.
- **Hand-rolled `ui/` kit** at `app/src/components/ui/` (`Button`, `Check`, …,
  plus `ui/composed/ConfirmModal`). This is a bespoke kit — **not** npm Ant
  Design / MUI / shadcn. Reuse these primitives; don't add a component library.
- **Icons: `lucide-react`** (`import { Plus, Feather, Archive } from "lucide-react"`).
  In the handoff world the same icons are hand-drawn `<path>` d-strings — map
  them back to the lucide named import when porting.

### The glow rule (stormlight vs. accent)
The blue **stormlight** glow (progress fills, infused gems, lit rails) is
**constant across every Order** — it never recolors. The per-Order **accent**
recolors only the interactive marks it is already allowed to touch (links,
hover states, small emphasis). When you tokenize or port, **don't swap one for
the other** — a Skybreaker's progress bar is still stormlight-blue, not their
accent.

---

## 2. Handing off portable code

When you write code in `Specs/Claude/…` that's meant to become app code:

- **ES modules, not IIFE `window` globals.** Even if the preview loads it as a
  global script, structure the logic so it lifts into `import`/`export` without a
  rewrite. Avoid reaching for other components via `window.*`.
- **Keep LICENSE / attribution** alongside any third-party code (see §3).
- **Name destinations in app terms.** Say which component, token, module, or
  context method each piece maps to (e.g. "→ `components/IdealLadder.jsx` +
  `.module.css`; borrow opens `OathEditor` with a `seedTitle` prop"). The Design
  Sync spec is the model for this.
- **Derive, don't store** (a repo convention): treatment, section, and reveal
  state are computed from data, not saved as flags.

---

## 3. Never ship

- **Hoid / Dragonsteel-referencing content is reference-only.** It's in the
  design sandbox for tone; it must not go into the shipped app.
- **The MIT-licensed Women's-script engine
  (`Specs/Claude/jbd-pages-handoff/womens-script/womens-script.js`) IS the
  shippable piece** — when it moves into `app/`, keep its `LICENSE` next to it.
  It's self-contained (glyph SVGs inlined); the `symbols/` source folder is not
  needed at runtime.

---

## 4. Where things are (quick map)

```
app/                                   ← THE REAL APP (Vite/React)
  src/
    index.css                          ← design tokens (:root) — source of truth
    App.jsx                            ← routes
    context/AppDataProvider.jsx        ← app data + mutators (toggleAction, updateOath, …)
    components/                        ← OathCard, OathEditor, PageHead, …
      ui/  ui/composed/                ← the hand-rolled kit (Button, Check, ConfirmModal)
      *.module.css                     ← CSS Modules (camelCase, native nesting)
    pages/                             ← Dashboard, Oaths, Journal, RadiantDex, Profile

Specs/Claude/                          ← DESIGN SANDBOX (not imported by the app)
  jbd-pages-handoff/                   ← oaths.jsx, jbd-styles.css, preview.html, womens-script/
  explorations/                        ← the pannable design canvas + jbd-v2/jbd-pages CSS
  JBD - Design Sync (Repo Implementation Spec).md   ← what to build in the Oaths area
  PROJECT-STRUCTURE.md                 ← this file
```
