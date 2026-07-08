# Oath card — footer & reflection model (design spec)

A description of the decisions, not an implementation. It's here so you can
rebuild it yourself in the real app. The updated prototype (`oaths.jsx` +
`jbd-styles.css` + `preview.html`) is the visual reference; this is the "why."

---

## The problem

Each oath card's footer was carrying too many equal-weight buttons (Open,
Reflect, and Edit was still to come). Three ghost buttons of the same weight →
nothing is primary → the eye re-reads all of them every time. Crowded.

## The decision

**The whole card is the "open" target. The footer carries one visible action
(Reflect) plus a ⋯ overflow for the rare stuff.**

- **Open** is not a button — clicking anywhere on the card opens it (the editor
  for now; a read view later). On hover the card lifts + glows the Order accent,
  and an "Open →" hint appears in the meta line (arrow nudges right).
- **Reflect** is the one visible footer action, in a new **`secondary`** button
  style (accent outline + faint accent wash) — frequent, but calmer than a
  filled primary.
- **⋯ menu** holds the rare, per-view actions (Archive, Delete, permanent
  delete). Opens upward, closes on click-outside / Escape.
- There is **no Edit button** — clicking the card already does that.

### Click-guarding (important)

Because the card opens on click, every *interactive* thing inside it must stop
the click from bubbling: the checkbox list, the "Mark as kept" button, and the
whole footer-actions row each call `stopPropagation`. Only "empty" card space
(title, progress, meta) triggers the open. Standard clickable-card pattern.

## Per-view footer

| View | Card click | Left of footer | Right of footer |
|---|---|---|---|
| Active · has actions | opens editor | meta + "Open →" hint* | **Reflect** (secondary) · ⋯ (Archive, Delete) |
| Active · practice | opens editor | "Open →" hint | **Practice today** · **Reflect** (secondary) · ⋯ |
| Kept | opens view | "Open →" hint | **Reflect** (secondary) · ⋯ (Archive, Delete) |
| Archived | opens view | "Open →" hint | **Restore** (secondary) · ⋯ (Delete permanently) |

*When every action is answered, the "Mark as kept" moment takes the footer-left
and the "Open →" hint is hidden — two open affordances shouldn't compete.

## New classes (added to `jbd-styles.css`)

- `.btn-secondary` — the new button style (also add `type="secondary"` to the
  app's `Button` component; there's already a commented `isSecondary` stub).
- `.oath-card.card-link` (+ `:hover`) — the whole-card lift + accent glow.
- `.foot-left`, `.open-hint`, `.open-hint .oh` — the meta line + "Open →" hint.
- `.foot-actions` — the right-side button row.
- `.oath-menu`, `.oath-menu-trigger`, `.oath-menu-pop`, `.oath-menu-item`
  (+ `.danger`) — the ⋯ overflow.

---

## Reflection: one modal, three entry points

**Journal and Reflect are not separate things.** Journal is the *page* (cadence
grid, streaks, the entry timeline). The reflection editor is a single *modal* —
the same one — exactly like `OathEditor` serves both new and edit oaths.

That modal already accepts `mode` (new/edit) + `contextPrompt` + `contextLabel`.
Reflecting from an oath is just a third way in:

- **Journal → New reflection** — `mode="new"`, the daily prompt, no oath link.
- **Edit an entry** — `mode="edit"`, existing data.
- **Oath card → Reflect** — `mode="new"`, `contextLabel="Reflecting on your
  oath…"`, `contextPrompt=<the oath's words>`. (See it live: click Reflect on any
  oath in the prototype.)

### The one thing to add: `oathId`

Store an optional `oathId` on the reflection record. That's the whole payoff:
the entry threads into the Journal timeline **and** the oath's own history — one
record, two places, no duplicated modal or data. When starting blank from
Journal, an optional "＋ Link to an oath" sets the same field.

Don't build a second modal. Extend the context the modal already takes.
