# JBD — Design Sync → Implementation Spec (for Claude Code)

_Reviewed against `jcdev7858/JourneyBeforeDestination@d7bf6fe` — the `app/` Vite + React
codebase, its custom `components/ui` kit, CSS Modules, `lucide-react`, and the
`AppDataProvider` context._

**How to use this doc.** The design mockups (the HTML design canvas + `preview.html`)
are the source of truth for **look**. This file is the source of truth for **how to
build it in your repo** — it names the exact files, component APIs, and context methods
to touch. Where the design and your code already agree, that's called out so you don't
re-do work.

---

## 0. The one architectural fact that shapes all of this

Your data + context already support the new behavior. You do **not** need the refactor
you were worried about.

- `Oath = { id, userId, title, status: 'active'|'completed', archivedAt, createdAt, actions: [{ id, title, completed, completedAt }] }`
- Context (`AppDataProvider.jsx`) already exposes: `toggleAction(oathId, actionId)`,
  `updateOath(oathId, patch)`, `addOath(newOath)`, `deleteOath(oathId)`.
- **Tick-anywhere already works.** `OathCard` calls `toggleAction`, and the dashboard's
  `ActiveOathCard` renders that same `OathCard` — so ticking an action on the dashboard
  already writes to context. The mockup once showed dashboard actions read-only; **your
  code is already the better version.** Keep it. The only thing missing on the dashboard
  is a *launch point* into the full Oaths page (see §4).

So the rule we landed on — **tick anywhere, restructure in the editor** — is already true.
Adding/removing/renaming actions stays in `OathEditor`; toggling done stays everywhere.

**Small model conventions to adopt (used throughout below):**
- **Treatment is derived, never stored:** `const isPractice = oath.actions.length === 0;`
- **Section predicates** (no new `status` value needed — archived is signalled by `archivedAt`):
  - active:   `!oath.archivedAt && oath.status === 'active'`
  - kept:     `!oath.archivedAt && oath.status === 'completed'`
  - archived: `!!oath.archivedAt`

---

## 1. Practice vs. commitment oaths (derived from `actions.length`)

An oath's treatment is derived from whether it has actions — never a type the user picks.

**`OathCard.jsx`** — branch on `isPractice`:
- **Commitment (has actions):** exactly what you render today (progress bar + tickable
  `ActionItem` list). Keep as-is, plus the "Mark as kept" moment in §3.
- **Practice (no actions):** drop the progress bar + checklist. Render a scoped cadence +
  streak and a single **"Practiced today"** button. This is the compact form of the
  Journal cadence — reuse the same `.cad` cell vocabulary (see `jbd-styles.css`
  `.oath-mini-cad`, `.oath-practice`, `.oath-practice-stat`, `.btn.is-practiced` in the
  mockup for the exact styling).

**New model + context needed for practice tracking** (your model has no streak data yet):
- Add to the `Oath` JSDoc type in `types.js`: `practicedDates?: string[]` (ISO date strings).
- Add to `AppDataProvider`: `markPracticedToday(oathId)` — pushes `todayISO` if not
  already present. Compute the streak in the card from consecutive trailing days in
  `practicedDates`. Follow the existing `toggleAction`/`updateOath` style (map over oaths,
  return a new array).

**`OathEditor.jsx`** — make actions optional so an oath can *be* a practice oath:
- Start new oaths with `actions = []`, not `[makeEmptyAction()]`.
- Label reads "Actions · optional"; when `actions.length === 0` show a one-line hint:
  _"No actions yet — this stays a practice oath. Add one to make it a commitment with
  progress to answer."_
- "Add action" stays exactly as built — adding the first action is how an oath opts into
  the commitment treatment.

---

## 2. Archive, not delete

Ending an oath sets it aside; it is not destructive, so it must not wear the warm-red.

**`OathEditor.jsx`** (currently uses `deleteOath` + a red "Release this oath?" confirm):
- Footer button: `Delete Oath` → **`Archive oath`** (lucide `Archive` icon, `type="default"`,
  **not** `danger`).
- Confirm screen copy: title **"Archive this oath?"**, sublead _"Archiving sets this oath
  aside — it leaves your active list but you can restore it anytime, and the reflections
  you wrote along the way stay in your journal."_, buttons **Keep it** / **Archive** (the
  Archive button is a soft neutral fill, not `danger`).
- On confirm: call `archiveOath(oath.id)` instead of `deleteOath`.

**`AppDataProvider.jsx`** — add two helpers (keep `deleteOath` for a real hard-delete
elsewhere if you want it, but the editor no longer calls it):
```js
const archiveOath = (oathId) =>
  updateOath(oathId, { archivedAt: new Date().toISOString() });
const restoreOath = (oathId) =>
  updateOath(oathId, { archivedAt: null });
```
Expose both on the context `value`.

**`Oaths.jsx`** — the page already renders a stub `Archive` button per card. Wire it to
open a soft `ConfirmModal` (`okDanger={false}`) → `archiveOath(oath.id)`. (`ConfirmModal`
already exists at `components/ui/composed/ConfirmModal.jsx`.)

---

## 3. Oaths page: sections + the "Mark as kept" moment

**`Oaths.jsx`** — split the single `oaths.map(...)` into three sections using the
predicates from §0, each with a `PageHead`-style sub-heading:
- **Personal oaths** — the active set. Practice and commitment cards live together here
  (each `OathCard` self-selects its treatment via §1). Keep them stacked (uneven card
  heights read poorly in a 2-col grid).
- **Kept** — `status === 'completed'`, not archived.
- **Archived** — `archivedAt != null`. Same visual weight as Kept, muted (mockup:
  `.oath-card.archived` / `.oath-status.archived`). Give each a **Restore** action →
  `restoreOath(id)`.

**"Mark as kept" on a commitment card** (`OathCard.jsx`): when every action is completed,
do **not** auto-complete. Surface a small CTA — _"Every action answered."_ + a
**Mark as kept** button → `updateOath(oath.id, { status: 'completed' })`. Keeping is a
confirmed user act. (Mockup: `.oath-ready`.)

---

## 4. Dashboard — the "lean integration"

Keep the dashboard a _today + momentum_ surface. Three changes only:

1. **`ActiveOathCard.jsx` — add a launch point.** Below the card, a quiet
   **"Tend this oath →"** link routing to the Oaths page. You're on `react-router-dom`
   (`App.jsx`), so use `<Link to="/oaths">` (or `useNavigate`). Apply the same idea to the
   other summary cards so none are dead-ends: `OrderCard` → `/profile`. `PromptCard`'s
   "Respond" already opens the reflection modal — leave it.
2. **Compact cadence strip — new component** `components/dashboard/CadenceStrip.jsx`.
   A streak number + a ~14-day spark of `.cad` cells (mockup: `.cadence-strip`,
   `.cad-streak`, `.cad-spark`). Drive it from `journalEntries` dates (compute the current
   streak). Place it in the `Dashboard.jsx` grid alongside `ReadingProgress`. If you don't
   have journal entries seeded yet, gate it behind data so it no-ops cleanly.
3. **One look-back widget only.** If you add a "pick up where you left off" callout, don't
   also add the "your words returned" echo — pick one. Stats + milestone timeline stay on
   Profile; do not mirror them here.

---

## 5. The Ideals ladder (NET-NEW — not in the repo yet)

The mockup's signature Oaths feature has no equivalent in the codebase. Build it as a new
component; it's additive.

**`components/IdealLadder.jsx` (+ `.module.css`)** — the Five Ideals as a vertical
progression (mockup classes: `.ladder`, `.rung` `.sworn`/`.current`/`.unspoken`,
`.rung-rail`/`.rung-node`/`.rung-line`, `.rung-ordinal` `.tag`, `.rung-words`, `.rung-note`,
`.rung-actions`, `.rung-link`). Data: a static `IDEALS` array (the ideal text is shared
lore, fine to hardcode). Interactive:
- Unspoken + current rungs lift on hover (`.rung.interactive`).
- **Borrow this Ideal** (unspoken/current) → open `OathEditor` in new mode **pre-filled**
  with the Ideal's words. Add a `seedTitle` prop to `OathEditor` (when `isNew && seedTitle`,
  seed `words = seedTitle` and `actions = []`). `Oaths.jsx` already owns editor state via
  `editing` — add an `editing = { seedTitle }` path.
- **Reflect on this Ideal** (all rungs) → open your reflection composer with the Ideal as
  context (mirror `PromptCard`'s modal; pass the Ideal text as the prompt).
- **"Speaking now" tag** — show dynamically on the rung whose words are borrowed by an
  active oath (match by a stored `oath.idealId`, or by title). Not a static label.

Mount `IdealLadder` at the top of `Oaths.jsx`, above the personal-oaths section.

---

## Context / type change summary (all small)

**`types.js`** (JSDoc): `Oath.practicedDates?: string[]`; optionally `Oath.idealId?: string`
for the ladder link. No change to the `status` union — archived is `archivedAt`.

**`AppDataProvider.jsx`** — add to `value`:
`archiveOath(oathId)`, `restoreOath(oathId)`, `markPracticedToday(oathId)`. (Completing an
oath and editing use the existing `updateOath`.)

## Files to touch (checklist)
- [ ] `context/AppDataProvider.jsx` — `archiveOath`, `restoreOath`, `markPracticedToday`
- [ ] `types.js` — `practicedDates`, optional `idealId`
- [ ] `components/OathCard.jsx` — practice/commitment branch + "Mark as kept"
- [ ] `components/OathCard.module.css` — practice/cadence/ready/archived styles
- [ ] `components/OathEditor.jsx` — archive (not delete), optional actions, `seedTitle`
- [ ] `pages/Oaths.jsx` — three sections, wire Archive/Restore, ladder mount, seed-borrow
- [ ] `components/IdealLadder.jsx` + `.module.css` — NEW
- [ ] `components/dashboard/ActiveOathCard.jsx` — "Tend this oath →" launch link
- [ ] `components/dashboard/OrderCard.jsx` — launch link → `/profile`
- [ ] `components/dashboard/CadenceStrip.jsx` — NEW, + mount in `pages/Dashboard.jsx`

## What NOT to change
- The `components/ui` kit and design tokens (`App.css`) — reuse, don't rebuild.
- The shared `toggleAction` wiring — tick-anywhere is intentional and correct.
- Don't overload `status` with `'archived'` — use `archivedAt`.
