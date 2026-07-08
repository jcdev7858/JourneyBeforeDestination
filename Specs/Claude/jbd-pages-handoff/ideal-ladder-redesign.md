# Handoff: Ideal Ladder redesign — revelation, not progress

This spec **replaces the state model of the Ideals ladder** on the Oaths page
(`oaths.jsx` → `IdealLadder` / `IDEALS`) and adds cross-order browsing. It keeps
the ladder's good primitives that are already built (the interactive rungs,
**Borrow this Ideal**, **Reflect on this Ideal**, and the derived
commitment/practice treatment of personal oaths) — do **not** rebuild those.

A companion CSS-tokens task lives in **`css-tokens-directive.md`** (sync the token
`:root` to the real app and replace hardcoded literals with variables everywhere).

---

## The problem this fixes

The current prototype gates the next ideal on **"3 of 5 actions answered"**
(`IDEALS` Third Ideal, `state: 'current'`). That staples a to-do list onto the
Order's canonical, reverent words and makes "progress" feel arbitrary and hollow:
finishing three tasks does not, in any meaningful sense, make a reader ready to
speak the next Ideal. In the books, an Ideal is spoken when the person is
**ready** — readiness is internal and earned, never a completed checklist.

So the ladder must stop being a **progress** ladder and become a **revelation**
ladder. Nothing on the ladder is ever counted or completion-gated.

## The model — three objects, three verbs

| Object | What it is | Verbs | Gets |
|---|---|---|---|
| **Canonical Ideal** | The Order's real words. Reverent, read-only, never edited. | **Reveal** (automatic, book-gated) → **Speak** (deliberate, ungated) | Reflection. **Never** a completion metric. |
| **Personal Oath** | The user's own words. | **Author** (optionally *inspired by* an Ideal) | Actions (checkable) — actions live here, not on scripture. |
| **Reflection** | A moment of living-into-it. | **Note** | Attaches to a spoken Ideal **or** a personal oath. |

**The one hard rule:** a canonical Ideal must never have a completion metric that
gates the next Ideal. Everything else is fair game — reflection on personal oaths,
the `inspiredBy` lineage link, notes anywhere — all good and encouraged.

## Rung states — replacing `sworn / current / unspoken`

The old three states bake in linear progress. Replace with three honest states,
each gated on something real:

| State | Meaning | Gated on | Look |
|---|---|---|---|
| **Hidden** | Reader hasn't earned *sight* of these words yet. | Gating book not in `booksRead`. | Obscured behind the Women's script / glyph. **All five rungs always shown** (the shape of the path is always visible), Hidden ones just aren't legible. |
| **Revealed** | Book read. Words are visible, not yet claimed. | Book read; not spoken. | Legible, quiet. Offers **Speak**, **Reflect**, **Borrow**. |
| **Spoken** | The user has deliberately claimed this Ideal as theirs. | The user's own readiness — **ungated**. | Lit rail + infused-stormlight gem (the old `sworn` look). Offers **Reflect** (and shows its reflection thread). |

Gone: no `current`, no "3 of 5," **no progress bar on the ladder at all.** Several
Ideals can be Revealed-but-not-Spoken at once (you can *see* the Fourth without
having *spoken* it).

## Reveal is automatic and derived — not a click

- **Onboarding** asks the user their Order + **which books they've read** (they pick
  the books). That's it. `booksRead` is the only thing stored for reveal.
- Landing on the Oaths page, the ladder is simply **already there**: rungs whose
  gating book is in `booksRead` render **Revealed**; the rest render **Hidden**.
  There is **no "click to reveal" button** — revealing is derived from `booksRead`,
  never a separate user action (the reader already knows the Fourth Ideal exists;
  seeing the words is not a ceremony).
- **Revealed is DERIVED, never stored.** Store `booksRead` and `spokenIdeals`
  only; compute Revealed from them. (This avoids the same drift bug we hit storing
  derived state elsewhere in the app.)
- **The reveal *feeling* is an animation**, not an action: when a book is **newly**
  marked read, the Women's-script obscuring on its rung(s) dissolves on the **first
  mount after that unlock**. On subsequent visits the rung is just plainly Revealed.

## The two rung verbs

- **Speak** *(new)* — appears on **Revealed** rungs. A deliberate, ceremonial marking:
  "these words are mine now." **Ungated** — the user decides when ready. Records a
  moment (date + optional note). This is the app's "marking arrival" experience and
  the ladder's only real user-driven state change. First run: the First Ideal is
  auto-**Revealed** (every reader has read enough to see it) but still must be
  **Spoken** — which lines up with the existing empty-state CTA
  **"Speak the First Ideal."** Nothing is auto-Spoken.
- **Reflect** — on every Revealed/Spoken rung. Opens the reflection composer with the
  Ideal as context (already wired: `onReflect` → `'reflect-ideal'`). Reflection is
  **not** exclusive to Ideals — personal oaths keep their **Reflect** action exactly
  as they have it today.
- **Borrow** — unchanged. On any Revealed/Spoken rung (the user's own **or** a
  cross-order one). Opens the oath editor pre-filled with the Ideal's words, starting
  with **no actions**, and records an `inspiredBy` link back to the source Ideal. The
  resulting personal oath is where checkable **actions** live. The **"Speaking now"**
  tag still shows dynamically once an Ideal's words are borrowed by an active oath.

## Cross-order resonance

A reader stays connected to Ideals outside their own Order (a Windrunner can be
moved by the Edgedancer's *"I will remember those who have been forgotten."*).

- Add an **Order switcher** to the ladder section. The home Order is the default;
  the user can page to **any** Order's ladder.
- The **same reveal gate applies** to a foreign Order — later Ideals stay **Hidden**
  until the gating book is read. No spoilers just because it's not your Order.
- From a **foreign** rung the user can **Reflect** or **Borrow**, but **not Speak**
  (you speak your own Order's Ideals; you borrow others'). Borrowing a foreign Ideal
  is the bridge that carries a cross-order idea into the user's personal space.

## Out of scope this pass — stub only

- **"Understanding" ideal-breakdown** — a tooltip/flyout on a rung with "what living
  this looks like day to day," relatable, no therapy-speak, no pressure. **Leave a
  slot** on the rung for it; do **not** build it yet. Future release.