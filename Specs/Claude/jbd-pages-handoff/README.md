# Handoff: JBD v2 — Pages & Modals (Oaths · Journal · Profile)

This bundle extends the **Journey Before Destination v2 design system** with three
full screens and two editor modals, all built on the locked v2 tokens. It is a
companion to the original `design_handoff_design_system/` — same philosophy,
same primitives, no new colors.

Open **`preview.html`** in a browser to see everything: switch pages from the in-page
nav or the preview bar at the bottom, and open each modal state from that bar.

> Like the original handoff, the `.jsx` files are **design references** (React-in-Babel
> prototypes), not production code. Recreate them in the real codebase per the v2
> conventions (Vite + React, CSS Modules, `lucide-react`). The CSS is the source of truth.

---

## What's in here

```
jbd-pages-handoff/
  README.md              ← you are here
  preview.html           ← navigable preview of all pages + modals
  jbd-styles.css         ← COMPLETE stylesheet: v2 base + the new page-component layer
  glyph.jsx              ← OrderGlyph + GLYPHS (unchanged from v2)
  pageshell.jsx          ← shared chrome: aura + top bar/nav + footer (+ optional onNav)
  oaths.jsx              ← Oaths page: Ideals ladder + oath cards (+ empty state)
  oath-editor.jsx        ← Oath editor modal (add / edit / update / delete + actions)
  journal.jsx            ← Journal page: reflection cadence + entry timeline
  reflection-editor.jsx  ← Reflection editor modal (write / edit / delete + themes/favorite)
  profile.jsx            ← Profile page: identity hero + stats + path + settings
  dashA.jsx              ← the v2 Dashboard (included so the preview is a full app)
```

### The stylesheet

`jbd-styles.css` is **one file**: the entire original `jbd-v2.css` (the `:root` tokens
and every dashboard component) followed by a clearly-banded **page-component layer**.
If you prefer to keep the layering, the split point is the
`░░ PAGE-COMPONENT LAYER ░░` banner — everything above it is the untouched v2 base,
everything below is new. Either link the one file, or split it back into
`jbd-v2.css` + `jbd-pages.css` at that line.

---

## New components (class reference)

All of these obey the v2 **accent discipline**: stormlight blue is the constant
(rails, gems, checks, cadence, progress), and `--accent` only touches the marks it's
already allowed to (eyebrows, the current ideal, primary buttons, active nav, toggles,
selected chips, the soft card glow). Destructive actions use a single restrained
warm-red (`#e58b80`) — never gold.

### Shared page bits
- **`.page-head` / `.page-eyebrow` / `.page-title` / `.page-lead`** — non-dashboard pages
  lead with a titled header instead of the hero prompt.
- **`.section-head`** — serif section divider with an optional action/count on the right.

### Oaths
- **`.ladder` / `.rung` (`.sworn` · `.current` · `.unspoken`)** — the **Ideals ladder**:
  the Five Ideals as a vertical progression. Sworn rungs carry an infused-stormlight gem
  and a lit rail; the current rung wears the Order accent; unspoken rungs go faint.
  Parts: `.rung-rail` / `.rung-line(.lit/.top)` / `.rung-node` / `.rung-ordinal` (`.tag`) /
  `.rung-words` / `.rung-note`.
- **`.oath-card`** — a richer stacked oath than the dashboard's single active oath:
  `.oath-top` + `.oath-status` (`.active` / `.kept` with a `.seal`), `.oath-words`,
  `.action-peek` (reuses `.action`/`.check`), `.oath-foot`.

### Journal
- **`.cadence` / `.cad` (`.l1`–`.l4`)** — the **reflection cadence**: a stormlight streak
  grid; deeper entries glow brighter. Stays blue (it measures the practice, not the Order).
  `.cadence-wrap` lays it beside the **`.streak-stats` / `.streak-stat`** column.
- **`.timeline` / `.tl-entry` / `.tl-rail` / `.tl-line` / `.tl-dot`** — the gem-gutter
  entry timeline, grouped under **`.month-mark`**.
- **`.entry`** — a journal entry card: `.entry-head` (`.entry-prompt` serif + `.entry-date`),
  `.entry-body` (with serif `em`), `.entry-foot`, and the **`.entry-fav`** star toggle (`.on`).
- **`.filterbar` / `.chip` (`.on`)** — filter chips; selected chip wears the accent.

### Profile
- **`.identity`** — the identity hero: a large `.order-ring` glyph, `.id-name`,
  `.id-order` (`.accent-text` + `.id-sep`), `.id-meta`.
- **`.stat-grid` / `.stat-tile`** — four big serif-number tiles.
- **`.path` / `.milestone` / `.ms-rail` / `.ms-line` / `.ms-dot`** — the path-so-far
  milestone timeline (`.ms-when` / `.ms-what` with serif `.em`).
- **`.settings` / `.setting`** + **`.toggle` (`.on`)** — labelled setting rows with an
  accent toggle switch or a `.setting-val` (icon + value + chevron).

### Modals (Oaths + Journal)
- **`.scrim`** — full-bleed blurred backdrop that carries the theme (text color + font),
  centering the dialog.
- **`.modal` (`.glass`, `.modal-sm`)** — the dialog. Sizes to its content (no internal
  scroll — it's a static frame in the canvas, a centered overlay in the app).
  Parts: `.modal-glow` (out-of-flow accent halo), `.modal-head` (`.modal-eyebrow` /
  `.modal-title` / `.modal-close`), `.modal-body`, `.modal-foot` (`.foot-right`),
  `.modal-sublead`, `.modal-quote`.
- **`.input-oath`** — the oath words edited in the serif voice (pair with `.input`).
- **`.action-edit` / `.action-edit-list`** — editable action rows: a clickable `.check`
  (toggle done), an `.input`, and an **`.icon-btn.danger`** delete.
- **`.btn-danger` / `.btn-danger-solid`** — the destructive buttons (the lone warm-red).

#### Modal states (props on the prototype components)
Both `OathEditorModal` and `ReflectionEditorModal` take `mode` (`'new'` | `'edit'`),
`startConfirm` (boolean — opens straight to the delete-confirm dialog), and `onClose`.
- **New** — empty form, no delete affordance.
- **Edit** — populated; toggle/rename/add/delete actions (oath) or themes + favorite
  (reflection); exposes **Delete**, which arms the confirm dialog.
- **Delete · confirm** — a compact `.modal-sm` that quotes the item and warns what's lost.

The `OathEditorPage` / `ReflectionEditorPage` wrappers composite a modal over a blurred
page (used by the design canvas); in a real app, render just the modal in your own
overlay (as `preview.html` does).

---

## Load order

React → ReactDOM → Babel, then `glyph.jsx` → `pageshell.jsx` → page files →
editor files (editors depend on their page for the `*Page` wrappers). Each component
publishes itself to `window`, so plain `<script>` tags in this order are enough.

## Inherited from v2 (don't re-decide)
Type scale (Cormorant + Hanken), 30px card rhythm, `--radius` 16/10, motion
(`rise` entrance, `breathe` aura, `--dur-ui`), focus language (accent border + faint
ring), and the empty-state pattern. See `design_handoff_design_system/README.md`.
