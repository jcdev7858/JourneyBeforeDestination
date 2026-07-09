# Handoff: JBD v2 — Pages & Modals (Oaths · Journal · Profile)

This bundle extends the **Journey Before Destination v2 design system** with three
full screens and two editor modals, all built on the locked v2 tokens. It is a
companion to the original `design_handoff_design_system/` — same philosophy,
same primitives, no new colors.

Open **`preview.html`** in a browser to see everything: switch pages from the in-page
nav or the preview bar at the bottom, and open each modal state from that bar. The
preview ships two dashboards (the v2 **Dashboard** and the newer **Dashboard v3**),
both Oaths treatments, and every modal mode including the Ideal-borrow and archive flows.

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
  journal.jsx            ← Journal page: reflection cadence + free/prompted feed (derived-kind badges)
  reflection-editor.jsx  ← Free-first composer modal (write freely; optionally attach theme/oath/ideal/prompt)
  reflection-editor-full.jsx ← Full composer (SHELVED superset of Option B: toolbar, mood,
                           photo/voice, prompt library, privacy) — not wired into preview.html
  profile.jsx            ← Profile page: identity hero + stats + path + settings
  dashA.jsx              ← the v2 Dashboard (included so the preview is a full app)
  dashC.jsx              ← Dashboard v3 (lean integration: launch-point cards,
                           tickable active oath, compact cadence strip)
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
  - **`.rung.interactive` + `.rung-actions` / `.rung-link` (`.reflect`)** — the ladder is now
    touchable. Unspoken + current rungs lift their words on hover; every rung reveals
    actions that fade in: **Borrow this Ideal** (unspoken/current — opens the oath editor in
    `new` mode pre-filled with the Ideal's words) and **Reflect on this Ideal** (all rungs —
    opens the reflection composer with the Ideal as context). The **`Speaking now`** `.tag`
    is shown dynamically once an Ideal's words are borrowed by an active oath.
- **`.oath-card`** — a stacked personal oath. Its treatment is **derived from whether it has
  actions**, never a type the user picks up front:
  - **commitment** (has actions): `.oath-top` + `.oath-status` (`.active`/`.kept` + `.seal`),
    `.oath-words`, a progress bar, and a **tickable** action list (reuses the dashboard's
    `.actions.tickable-list` / `.action.tickable` — tick anywhere, restructure in the modal).
    When every action is answered the card surfaces an **`.oath-ready`** "Mark as kept" CTA —
    keeping is a confirmed act, never automatic.
  - **practice** (no actions): drops progress/checklist for **`.oath-practice`** — a scoped
    **`.oath-mini-cad`** cadence + **`.oath-practice-stat`** streak and a "Practice today" tap
    (`.btn.is-practiced` when marked).
- **`.oath-card.archived` / `.oath-status.archived`** — the **Archived** section: oaths set
  aside (not deleted), at the same visual weight as Kept, muted.

### Journal
The journal is a place to **just write**. Most entries are free brain-dumps; a
prompt, an oath or an ideal is attached only if it fits. An entry's **kind is
derived** from its links (`prompt? → Prompt · oathId? → Oath · idealId? → Ideal
· else → Free`) and is never stored (`journal.jsx deriveKind`).
- **`.cadence` / `.cad` (`.l1`–`.l4`)** — the **reflection cadence**: a stormlight streak
  grid; deeper entries glow brighter. Stays blue (it measures the practice, not the Order).
  `.cadence-wrap` lays it beside the **`.streak-stats` / `.streak-stat`** column.
- **`.timeline` / `.tl-entry` / `.tl-rail` / `.tl-line` / `.tl-dot`** — the gem-gutter
  entry timeline, grouped under **`.month-mark`**.
- **`.entry`** — a journal entry card: `.entry-head` (a derived **`.entry-badge`**
  `-free`/`-prompt`/`-oath`/`-ideal` + either a serif **`.entry-title`** or, for an
  untitled prompt entry, the `.entry-prompt`), `.entry-body` (serif `em`), an optional
  **`.backlink`** (`.ideal`) to the linked oath/ideal, `.entry-foot`, and the
  **`.entry-fav`** star toggle (`.on`).
- **`.journal-search` / `.search-tune` / `.theme-lead`** — the feed search bar and
  theme-filter lead-in.
- **`.filterbar` / `.chip` (`.on`)** — filter chips (All / Free / Prompted / Linked /
  Favorites + themes); selected chip wears the accent.

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
  (toggle done), an `.input`, and an **`.icon-btn.danger`** delete. Actions are **optional** —
  leaving them empty keeps a practice oath; adding one opts the oath into the commitment
  treatment.
- **`.attach-row` / `.attach-chip` / `.pop` (`.pop-head`/`.pop-list`/`.pop-item`)** — the
  free composer's **Add context** row: dashed ghost chips (Theme / Oath / Ideal / Prompt)
  that open a small popover list. Attaching is always optional.
- **`.ctx-cluster` / `.link-pill` (`-oath`/`-ideal`/`-prompt`/`-theme`) / `.link-pill-x`** —
  the attached context, shown as removable pills; each tone carries the color it already
  owns (oath/prompt read stormlight-neutral, ideal keeps its reference gold, theme stays quiet).
- **`.word-count`** — live word count in the composer foot (new entries).
- **`.btn-danger` / `.btn-danger-solid`** — the destructive buttons (the lone warm-red), used
  by the reflection delete only.
- **`.btn-archive` / `.btn-archive-solid`** — ending an oath **archives** it (set aside,
  restorable), so it uses a quiet neutral, *never* the warm-red. The oath editor's confirm
  reads "Archive this oath?" with **Keep it** / **Archive**.

#### Modal states (props on the prototype components)
`OathEditorModal` takes `mode` (`'new'`|`'edit'`), `startConfirm` (opens the archive confirm),
`seedWords` (pre-fill the words, e.g. borrowed from an Ideal — starts with no actions),
`fromIdeal` (eyebrow label), and `onClose`.
`ReflectionEditorModal` takes `mode`, `startConfirm` (delete confirm), `contextPrompt` +
`contextLabel` (reflect on a specific Ideal/oath — pre-attaches it as a removable prompt
pill), and `onClose`.
- **New** — empty composer: title + body, the **Add context** row, no delete affordance,
  a live word count in the foot.
- **Edit** — populated; add/remove any context pill or theme, toggle favorite; exposes **Delete**.
- **Delete · confirm** — a compact `.modal-sm` keeping the warm-red warning.
- **On Ideal / reflect** — opened from a ladder rung or oath with the context pre-attached;
  the writer can remove it and still keep a free entry.
- **New** — empty form, no archive/delete affordance.
- **Edit** — populated; toggle/rename/add/remove actions (oath) or themes + favorite
  (reflection); the oath exposes **Archive**, the reflection **Delete**.
- **Archive / Delete · confirm** — a compact `.modal-sm`. Archive is a soft neutral confirm;
  reflection delete keeps the warm-red warning.
- **Borrow Ideal** (oath) / **On Ideal** (reflection) — opened pre-filled from a ladder rung.

The `OathEditorPage` / `ReflectionEditorPage` wrappers composite a modal over a blurred
page (used by the design canvas); in a real app, render just the modal in your own
overlay (as `preview.html` does).

---

## Load order

React → ReactDOM → Babel, then `glyph.jsx` → `pageshell.jsx` → `dashA.jsx` → `dashC.jsx`
→ page files → editor files (editors depend on their page for the `*Page` wrappers;
`reflection-editor-full.jsx`, if used, loads AFTER `reflection-editor.jsx` — it reuses
`LinkPill` from it and `OATHS`/`THEMES` from `journal.jsx`;
`dashC.jsx` depends on `dashA.jsx` for `ORDERS` and `pageshell.jsx` for `PIcon`/`ICONS`).
Each component publishes itself to `window`, so plain `<script>` tags in this order are enough.

## Inherited from v2 (don't re-decide)
Type scale (Cormorant + Hanken), 30px card rhythm, `--radius` 16/10, motion
(`rise` entrance, `breathe` aura, `--dur-ui`), focus language (accent border + faint
ring), and the empty-state pattern. See `design_handoff_design_system/README.md`.
