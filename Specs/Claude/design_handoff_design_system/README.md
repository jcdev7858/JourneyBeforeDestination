# Handoff: Journey Before Destination — v2 Design System & Dashboard

## Overview

This bundle is the **v2 visual design language** for *Journey Before Destination* (JBD), a Stormlight-inspired reflection companion, plus the first screen built on it — the **Dashboard**. It establishes the color system, the per-Order accent discipline, the type and spacing scales, motion, the ten Order glyphs, and the shared component primitives (buttons, inputs, list rows, empty states) that every other page (Oaths, Journal, Profile, RadiantDex) will inherit.

It is meant to be read alongside the product spec (`JBD_SPEC_v3.md` in the repo). This doc covers **how it looks and behaves**; the spec covers **what it does and how data flows**.

## About the design files

The files in `source/` are **design references created as HTML + React-in-Babel prototypes** — they show the intended look, spacing, color, and interaction, but they are **not the production implementation**. They deliberately use in-browser Babel, inline `<script>` tags, and a single global CSS file because that is the fastest way to prototype.

**Your task is to recreate these designs in the real JBD codebase** using its established conventions, per `JBD_SPEC_v3.md` §4:

- **Vite + React 18**, function components + hooks only.
- **CSS Modules** (the spec's recommendation) — port the global CSS in `source/jbd-v2.css` into a shared token layer plus per-component modules. The `:root` custom properties should become a global stylesheet imported once; everything else becomes scoped modules.
- **Lucide (`lucide-react`)** for icons — the prototype hand-rolls a few Lucide-equivalent SVGs; replace them with the real package.
- JavaScript + JSDoc (TS deferred to v1.1).

Do **not** ship the Babel/CDN setup. Treat the `.jsx` files as readable specifications of structure and class names, not as code to paste.

## Fidelity

**High-fidelity.** Colors, typography, spacing, radii, shadows, and interaction states are final and exact. Recreate them pixel-faithfully using the values in the Design Tokens section. The one deliberately-unfinished area: real content/data wiring (the prototype uses hard-coded sample copy).

---

## Design philosophy (the rules that keep it calm)

The whole system rests on **one color decision**: separate the *constant* from the *variable*.

- **Stormlight blue (`#7cc4e8`) is the constant.** It is "the light itself" — the breathing background aura, the glass tint, the wordmark, infused gems (reading + oath progress), checkmarks, the progress bead. It **never changes by Order**.
- **The Order accent (`--accent`) is the variable.** It is the user's identity color and it recolors only a short, fixed list of marks. Each of the ten Orders has one accent.
- **Gold is retired.** The original design used a "radiant gold" for progress; v2 pulls it. It survives only as a token for reference (`--radiant-gold`) and as the warm option in the historical scheme variants. Do not use gold for progress in v1.

### Accent discipline — where the Order color is allowed to go

The accent is limited **by surface** and **by intensity**.

**Surfaces that WEAR the accent** (the whole list — nothing else):
- The "Today's reflection" eyebrow
- The Order glyph + the small Order ring
- The primary button (and its glow)
- The active nav underline
- Two soft card glows (the hero prompt card, and the "Your Order" card)

**Surfaces that STAY stormlight / neutral:**
- Glass, borders, the breathing aura
- The wordmark
- Infused gems (reading + oath progress)
- Checkmarks
- All body text and serif headings

> Rule of thumb: if the accent touches more than ~one-tenth of the screen, it has gone too far.

### Normalizing the ten Order colors (important for implementation)

The canonical Order/gemstone colors (from `radiant-quiz.js` `orderData[].color`) range from near-black garnet to near-white diamond. Used raw, they fight the dark glass UI. **Every accent is pinned to one tonal band** — conceptually `oklch(~0.80 ~0.11 h)` — so all ten share the same brightness and chroma and only the hue rotates. The table below already gives the pinned values; use them directly.

Two Orders (**Skybreaker** = smokestone grey, **Edgedancer** = diamond white) have no usable hue. They **fall back to stormlight blue** as their accent and carry identity through the glyph alone. **Bondsmith** = heliodor gold collides with the retired gold; it's allowed only because gold means nothing else now (keep it off progress/gems). After pinning, **Ruby/Garnet** read as one red and **Sapphire/Zircon** as one blue — so identity must come from the glyph shape, never the color.

---

## Design tokens

All tokens live in `:root` in `source/jbd-v2.css`. Port them verbatim into a global stylesheet.

### Color — neutrals & constants

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0b0f1c` | Page background base |
| `--bg-elevated` | `#141a2c` | Raised slate |
| `--border` | `rgba(124,196,232,0.10)` | Hairline border |
| `--border-strong` | `rgba(124,196,232,0.22)` | Card / control border |
| `--rim` | `rgba(255,255,255,0.07)` | Inner top highlight on glass |
| `--stormlight` | `#7cc4e8` | The constant light (brand, gems, glow) |
| `--stormlight-deep` | `#4f93c4` | Deep stormlight (gradients) |
| `--stormlight-soft` | `rgba(124,196,232,0.14)` | Aura / soft fills |
| `--radiant-gold` | `#d8b878` | **Retired** — reference only |
| `--radiant-gold-soft` | `rgba(216,184,120,0.13)` | Retired soft |
| `--text` | `#e9e5d7` | Primary text (warm parchment) |
| `--text-muted` | `#8b95ad` | Secondary text |
| `--text-faint` | `#5b647d` | Labels, captions, disabled |

### Color — per-Order accents (pinned tonal band)

Each Order sets three vars on its root: `--accent`, `--accent-rgb` (for `rgba()` glows), `--accent-deep`. Canonical raw colors are shown for reference only.

| Order | Gem | Raw (ref) | `--accent` | `--accent-rgb` | `--accent-deep` | Notes |
|---|---|---|---|---|---|---|
| Windrunner | Sapphire | `#0f3562` | `#7cc4e8` | `124, 196, 232` | `#4f93c4` | == stormlight |
| Elsecaller | Zircon | `#125064` | `#6cc1d2` | `108, 193, 210` | `#3f93a6` | twin-blue w/ Windrunner |
| Truthwatcher | Emerald | `#1e4d39` | `#6fc4a0` | `111, 196, 160` | `#4a9a7a` | |
| Bondsmith | Heliodor | `#ebc965` | `#e6cd86` | `230, 205, 134` | `#c9a94f` | gold — keep off progress |
| Stoneward | Topaz | `#d26840` | `#e7a079` | `231, 160, 121` | `#c9774a` | |
| Dustbringer | Ruby | `#b02d2c` | `#e58b80` | `229, 139, 128` | `#c75a4c` | twin-red w/ Lightweaver |
| Lightweaver | Garnet | `#6c011d` | `#df8398` | `223, 131, 152` | `#c25a73` | twin-red w/ Dustbringer |
| Willshaper | Amethyst | `#672861` | `#c79ad8` | `199, 154, 216` | `#a06fc0` | |
| Skybreaker | Smokestone | `#5f5d68` | *stormlight* | `124, 196, 232` | `#4f93c4` | no hue → blue fallback |
| Edgedancer | Diamond | `#fcf3ee` | *stormlight* | `124, 196, 232` | `#4f93c4` | no hue → blue fallback |

### Typography

Two families only. **Cormorant Garamond** (serif) carries voice — prompts, oaths, names, quotes. **Hanken Grotesk** (sans) carries UI — body, labels, buttons.

| Token | Size / line-height | Family | Use |
|---|---|---|---|
| `--fs-display` / `--lh-display` | 40px / 1.16 | serif, 400 | Hero prompt |
| `--fs-title` / `--lh-title` | 30px / 1.2 | serif, 500 | Page & Order names |
| `--fs-heading` / `--lh-heading` | 24px / 1.3 | serif, 400 | Oath text, section heads, empty-state title |
| `--fs-quote` / `--lh-quote` | 20px / 1.35 | serif, 400 | Callout / pull-quote |
| `--fs-body-lg` | 15px / 1.6 | sans | Lead body |
| `--fs-body` | 14px / 1.6 | sans | Default body, buttons, inputs |
| `--fs-body-sm` | 13px / 1.5 | sans | Secondary / muted |
| `--fs-overline` | 11.5px, `letter-spacing: 1.4px`, UPPERCASE | sans, 600 | Eyebrows & card labels |

### Spacing & layout

| Token | Value | Use |
|---|---|---|
| `--sp-1`…`--sp-6` | 4, 8, 12, 16, 20, 24px | Micro-spacing **inside** components |
| `--pad-card` | 30px | Inner padding of regular cards |
| `--pad-hero` | 40px | Inner padding of hero cards |
| `--gap-card` | 30px | Space **between** cards, everywhere |
| `--page-x` / `--page-y` | 40px / 30px | Page padding inside the scroll frame |
| `--radius` / `--radius-sm` | 16px / 10px | Cards / controls |

### Motion

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | Standard easing |
| `--dur-rise` | 0.55s | Entrance (`rise`, staggered ~70ms via inline `animation-delay`) |
| `--dur-ui` | 0.18s | Hover / focus transitions |

- `@keyframes rise` is **transform-only** (`translateY(16px) → 0`) so the resting state is fully visible to print, screenshots, and `prefers-reduced-motion`. Keep this property when reimplementing.
- `@keyframes breathe` (opacity 0.5→1, 7–9s loop) animates **only the aura orbs**.
- `prefers-reduced-motion: reduce` disables both.

---

## Components

Class names below match `source/jbd-v2.css`. Map each to a CSS Module + React component.

### Glass card — `.glass`
The base surface. `position: relative`, `padding: var(--pad-card)`, a 155° blue-tinted gradient, `backdrop-filter: blur(18px) saturate(125%)`, `1px var(--border-strong)`, `--radius`, and a layered shadow (`inset 0 1px 0 var(--rim), 0 26px 60px -32px rgba(0,0,0,0.8)`). Hero variant `.prompt-card` uses `--pad-hero`.

### Accent glow — `.glow-accent` (+ `.glow-br`)
A `::before` radial wash of `rgba(var(--accent-rgb), 0.16)`, `z-index: -1`, blurred 28px, clipped by the card's `overflow: hidden`. Default sits top-left; `.glow-br` moves it bottom-right (used on the "Your Order" card to halo the corner glyph). **Used on exactly two cards** — don't add more.

### Buttons — `.btn`, `.btn-primary`, `.btn-ghost`
- Base: 14px sans 500, `white-space: nowrap`, `11px 20px` padding, `--radius-sm`, 8px icon gap, 16px icons.
- **Primary** (`.btn-primary`): solid `--accent` fill, dark text `#07111d`, glow `0 0 24px rgba(--accent-rgb, 0.34)`.
  - Hover: glow → `0 0 36px / 0.52`.
  - **Focus-visible: intensified glow** `0 0 48px rgba(--accent-rgb, 0.75)` + `0 0 0 1px rgba(--accent-rgb, 0.7)` hairline ring.
- **Ghost / secondary** (`.btn-ghost`): transparent, faint `--border`.
  - **Hover AND focus-visible: Order-color border** (`var(--accent)`) + `0 0 0 1px rgba(--accent-rgb, 0.4)` ring.
- All buttons remove the native `outline` and transition `border-color, box-shadow, background` over `--dur-ui`.

### Form fields — `.field`, `.field-label`, `.input`, `.textarea`
For Oaths/Journal. Label is an overline. Inputs: `rgba(255,255,255,0.02)` fill, `--border-strong`, `--radius-sm`, `12px 14px` padding. Hover: border `rgba(--accent-rgb,0.4)`. **Focus: `--accent` border + `0 0 0 1px / 0.4` ring + `0 0 18px / 0.12` glow** (same language as ghost buttons). `.textarea` is `min-height: 96px; resize: vertical`.

### List row — `.row-item`
For oath lists, journal entries, character cards. Flex row, `16px var(--pad-card)` padding, faint border + fill, hover raises border + a `rgba(124,196,232,0.04)` wash, focus gets the accent ring.

### Empty state — `.empty` (+ `.empty-glyph` / `.empty-title` / `.empty-text`)
A first-class feature per spec §3.8. Centered column: a faint accent Order glyph (`opacity: 0.5`), a serif `--fs-heading` title, a muted body line (max ~38ch), and a primary CTA. Copy follows "scaffold, then personalize" (e.g. *"No oaths yet — every Radiant starts with the same words…"*).

### Pills — `.themes` / `.pill`
Order theme tags. 12.5px muted text, hairline border, `100px` radius, `6px 14px`.

### Progress (infused) — `.progress-track` / `.progress-fill.infused` / `.bead`
6px track. Infused fill is a stormlight gradient (`--stormlight-deep → #aee0fb`) with a glowing `.bead` orb at its leading edge. **Stays blue** regardless of Order.

### Checks — `.check`, `.check.infused.done`
19px rounded checkbox. Done state is an infused stormlight gradient with a glow; the tick is `#07202f`. Stays blue.

### Gemstone reading list — `.books` / `.book` / `.gemstone`
Rotated-square "gems"; read books get an infused-blue gem + glow, locked books are 50% opacity.

### Research callout — `.callout` (+ `.cool`)
The "Pick up where you left off" strip. Set apart by a soft **inner glow + an icon chip**, never a border accent. `.cool` makes the glow/chip stormlight-blue (the recommended scheme); the default warm variant is the retired-gold look, kept for reference.

### Top bar & nav — `.topbar` / `.wordmark` / `.nav`
Wordmark in serif 21px with "Before" in stormlight. Nav links muted → text on hover; the **active link** gets a 2px accent underline with an accent glow (`.nav a.active::after`). This becomes the persistent `Layout` shell in the app.

### Footer — `.site-footer`
Centered. The First Ideal as three non-wrapping serif phrases separated by stormlight diamonds (`Life before death · Strength before weakness · Journey before destination`), then a quiet uppercase meta line.

### Order glyph — `OrderGlyph` (`source/glyphs.jsx`)
See next section.

---

## The Order glyph system

`source/glyphs.jsx` contains all ten Order seals as **inline SVG** with **`fill="currentColor"`** and every hard-coded color stripped — so CSS `color` and `opacity` fully drive them (exactly like Lucide). They were generated from the raw seal SVGs in `glyphs/` (which are still color-coded to their Order — kept only as source-of-truth artwork; the component does not use them).

```jsx
<OrderGlyph order="windrunner" h={26} />   // h sets height; width derives from each glyph's own viewBox ratio
```

`GLYPHS` is a map of `{ [order]: { viewBox, paths: string[] } }`. In the app, prefer generating a typed `OrderGlyph` from the same data, or import each as an SVGR component — either way keep `fill="currentColor"`. Tint by setting `color: var(--accent)`; the dashboard wraps it so the seal always matches the Order.

Glyph viewBoxes differ per Order, so **never hard-code an aspect ratio** — read it from the glyph (the component already does).

Usages in the dashboard: large faint watermark (`.glyph-watermark`, opacity 0.07), corner mark (`.glyph-corner`, opacity 0.10), and the small mark inside the `.order-ring`.

---

## Screen: Dashboard

The "integration boss" (spec §3.9). Single column inside the `.jbd-scroll` frame, sections separated by `--gap-card` (30px), each entering with a staggered `rise`.

**Order, top to bottom:**
1. **Top bar** — wordmark + nav (`Dashboard` active).
2. **Hero prompt card** (`.glass .prompt-card .glow-accent`) — eyebrow `Today's reflection · {Order}`, the day's prompt in `--fs-display` serif, and actions: primary **Respond** + ghost **Favorite**. Faint Order watermark bottom-right.
3. **Research callout** (`.glass .callout .cool`) — "Pick up where you left off", a resumed-thought line (with an emphasized phrase), and a ghost **Continue** button.
4. **Two-column row** (`grid-template-columns: 1fr 1.25fr`, gap `--gap-card`):
   - **Your Order** (`.glass .glow-accent .glow-br`) — label, `.order-ring` with glyph + Order name (`--fs-title`), theme pills, faint corner glyph.
   - **Active Oath** (`.glass`) — label, oath line (`--fs-heading`), `Progress N of M`, infused progress bar, a checklist of done/todo actions, and "N more actions".
5. **Reading progress** (`.glass`) — the five-book gemstone list.
6. **Footer** — the First Ideal + meta.

**Data mapping (see `JBD_SPEC_v3.md` §6):** the prompt is `promptForToday(dateKey, orderId)` (deterministic per day); the active oath is the most-recently-created `status: "active"` oath; progress is `done/total` of its nested `actions`; Order name/themes come from static `orders` data; reading list from `user.booksRead`. Each "card" with a CTA must render its **empty state** when its data is absent (no Order → "choose your Order"; no oath → "create your first oath").

### Prototype props (for reference)
`DashboardA({ order, scheme, accent })` in `source/dashboard.jsx`:
- `order` — one of the ORDERS keys (`windrunner`, `truthwatcher`, `dustbringer` are fully fleshed; others reuse content). Sets accent + glyph + sample copy.
- `scheme` — `"stormlight"` (recommended, no gold), `"reserved"` (gold only on progress), or `"gold"` (original). **Ship `stormlight`.** This prop only exists to show the historical options; you can drop it.
- `accent` — an override object `{ name, glyph, accent, accentRgb, accentDeep }` used to preview an arbitrary Order without authoring full content. In the real app this comes from the user's Order, not a prop.

---

## Interactions & behavior

- **Hover/focus:** as specified per component above. Implement real `:focus-visible` — the prototype simulates focus inline in the Foundations sheet only.
- **Entrance:** sections `rise` once on mount with staggered `animation-delay` (~0.05 / 0.12 / 0.19 / 0.26s). Don't loop content animations.
- **Reduced motion:** honor `prefers-reduced-motion: reduce` (disable `rise` + `breathe`).
- **Theming:** setting the three `--accent*` vars on the dashboard root reskins every accent surface at once. In React, set them via `style={{ '--accent': …, '--accent-rgb': …, '--accent-deep': … }}` on the page/layout root from the user's Order.
- **Dark only.** No light mode in scope.
- **Desktop-first.** Mobile is a later pass: keep the card vocabulary and **stack the columns** (the `1fr 1.25fr` grid becomes one column); don't redesign the cards.

---

## Files in this bundle

```
design_handoff_design_system/
  README.md                     ← you are here
  preview.html                  ← open in a browser to see the system + 3 dashboards
  source/
    jbd-v2.css                  ← all tokens + component styles (port to global + CSS Modules)
    dashboard.jsx               ← Dashboard (DashboardA) + ORDERS sample data
    glyphs.jsx                  ← OrderGlyph + GLYPHS (all 10, currentColor)
    spec-foundations.jsx        ← live reference sheet: type, spacing, states, motion, empty state
    spec-colorroles.jsx         ← the color-roles legend card
    spec-accentsystem.jsx       ← the accent-discipline spec card (the rules above, visualized)
  glyphs/                       ← the 10 raw seal SVGs (source artwork; still Order-colored)
```

`preview.html` references the `source/` files directly and uses CDN React/Babel — it's for viewing only, not a build target.

## Suggested refactor order for Claude Code

1. **Global token layer** — port `:root` from `jbd-v2.css` into one imported stylesheet (`tokens.css` / `:root` in `index.css`). Verify every value matches the tables above.
2. **Theme hook** — a small helper that, given `orderId`, returns the `{ '--accent', '--accent-rgb', '--accent-deep' }` style object (with the Skybreaker/Edgedancer → stormlight fallback baked in). Apply on the `Layout` root.
3. **`OrderGlyph`** — bring `GLYPHS` data over; render inline SVG with `currentColor`.
4. **Primitives as CSS Modules** — `Button` (primary/ghost + states), `Field`/`Input`/`Textarea`, `Card` (`.glass`), `Pill`, `RowItem`, `EmptyState`. Match class behavior exactly.
5. **Layout shell** — top bar + nav + footer (the persistent `Layout`).
6. **Dashboard** — compose the above against real context data; build each widget's empty state.

When in doubt about a value, the CSS file is the source of truth; this README is its index.
