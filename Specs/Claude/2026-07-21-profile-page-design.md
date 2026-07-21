# Profile — page-design handoff

_Design doc for the Profile page of Journey Before Destination (JBD)._
_Date: 2026-07-21. Branch context: `radiantdex-data`._

This is a **design-only handoff**. Unlike the RadiantDex doc (which built a data
layer in `app/` this session), **no app code is built here.** This session
produces the spec; the derived selectors and real React components are built
later by Jeremy (this is a React learning build).

Two audiences:

1. **A separate design Claude** (the handoff): design the Profile **page layout
   and interaction** in the `Specs/Claude/…` design sandbox — a design/preview,
   NOT production app code.
2. **The eventual app build** (Jeremy, later): this doc names the **derived
   selectors** the page needs (by name + inputs) so the real components have a
   data plan. Nothing here is stored; everything is computed.

> **Read `Specs/Claude/PROJECT-STRUCTURE.md` first — for BOTH audiences.** It
> defines the two worlds (design sandbox vs. the real Vite app), the token
> vocabulary, the hand-rolled `ui/` kit, the glow-vs-accent rule, and the
> "derive, don't store" convention. The design Claude produces a preview in the
> sandbox; Jeremy rebuilds the real components. **Name destinations in app
> terms** (which component / token / route / context selector each block maps
> to), the way the Design Sync spec and the RadiantDex handoff do.

---

## 1. What the Profile is _for_ (the concept)

The app serves one loop: **read a prompt → set an oath → take an action →
reflect.** Two identity surfaces frame that loop, and they must **not conflict**:

- The **Dashboard** is the **cockpit** — present-tense, action-facing. Today's
  prompt, current streak, the active ideal, what to do next.
- The **Profile** is the **memoir** — **retrospective**, reflective. _"Who have I
  become on this path, and how far have I come?"_

Where the **RadiantDex** answers _"who do I aspire to be like"_ (outward, at
exemplars), the **Profile** answers _"who have I actually been"_ (inward, at your
own record). It is the identity anchor turned inward.

### The one rule that keeps it from conflicting

Every block on the Profile earns its place by being **cumulative or reflective**
— never "what should I do right now" (that's the Dashboard's job). And where a
**live/interactive** version of something already exists elsewhere in the app
(most importantly the ideals ladder, which is interactive on both the **Oaths**
page and the **RadiantDex Order detail**), the Profile shows a **read-only
summary that links out** — never a third interactive copy.

### Layout: two zones, one route (`/profile`)

A single portrait-first scroll — **not tabbed**:

1. **Portrait** (upper) — identity + the derived record. Leads, so the
   retrospective feeling comes first.
2. **Account** (lower) — the few real settings, quieter beneath.

---

## 2. The Portrait zone — the derived record

Five blocks, top to bottom. **Everything here is derived from real app data** —
`user`, `oaths`, `journalEntries`, `ideals.js`, `orders.js`, `books.js`. The old
mockup (`Specs/Claude/jbd-pages-handoff/profile.jsx`) faked all of this with
hardcoded arrays; **do not carry those over.** Design the states these
selectors produce (including empty states — a brand-new user has no kept oaths,
no streak, an empty timeline).

### 2.1 Identity hero
Glyph ring + name + Order + highest ideal **spoken** + a meta line.

- **Name** ← `user.name`.
- **Order** ← `user.orderId` → `orders.js` (name + accent + glyph).
- **Highest ideal** ← the highest-rank **Spoken** rung on the user's ladder for
  their Order (see the ideal-ladder redesign; derived, not stored).
- **Meta line** ← all real: `ON THE PATH SINCE {user.createdAt}` ·
  `{count of published reflections}` · `{longest streak}`. (The old
  "156 reflections · 12-day streak" was fake — these compute.)

Uses the glyph ring / corner-glyph treatment from the old hero; keep the visual,
replace the data.

### 2.2 Lifetime totals
The four-tile stat grid, **all derived**:

- **Oaths kept** ← `oaths.filter(o => o.status === "kept").length`.
- **Reflections** ← published `journalEntries` count.
- **Best streak** ← longest run of consecutive-day reflections (from entry
  `createdAt`s).
- **Days on the path** ← `now − user.createdAt`.
- **Books read** ← `user.booksRead.length / BOOKS.length` (e.g. "2 / 5").

Design which four (or five) tiles lead — these are the honest replacements for
the mockup's static tiles.

### 2.3 The journey timeline — the memoir the app writes for you
The "path so far," **auto-built from real events** instead of the hardcoded
`MILESTONES` array. This is the single biggest upgrade over the old page.

Milestones are **derived and merged**, newest-first, each from a real event:

- an **oath kept** (`o.keptAt` + `o.title`),
- an **ideal spoken** (rung + `ideals.js` text + when spoken),
- the **first reflection** ("began the journal"),
- a **book finished** (from `booksRead`, if/when timestamps exist),
- **joining the Order** (`user.createdAt` → "Spoke the First Ideal and joined
  the {Order}").

Reuse the milestone rail/dot/line visual from the old mockup; the **content is
computed**. Design the empty/near-empty state (a new user has one milestone:
joining).

> Selector: `journeyMilestones()` — merges the above from `oaths` +
> ladder state + `journalEntries` + `user`, sorted by date desc. Derived.

### 2.4 Ideal ladder — compact, read-only, links out
Your climb for **your** Order as `Spoken / Revealed / Hidden` rungs — a "how far
up am I" glance.

- **Read-only.** The interactive ladder already lives on **Oaths** and
  **RadiantDex Order detail**. This is a **summary that links out** to the full
  ladder — do NOT duplicate the interactive control (no Speak ceremony here, no
  borrow flow).
- Same rung vocabulary and reveal semantics as the ideal-ladder redesign
  (Hidden / Revealed / Spoken; reveal is auto + derived).
- **Glow rule:** rung/progress marks are stormlight-blue (the constant glow),
  not the Order accent. Only accent-eligible marks recolor.

### 2.5 Themes you live by — genuinely new
The recurring `themes` across the user's reflections, ranked by frequency — a
portrait of character. Nothing else in the app surfaces this.

- Derived from `journalEntries[].themes` (and optionally oath-attached themes),
  counted and ranked ("You return to: Family, Presence, Courage…").
- Design the visual (ranked pills with weight, a simple frequency bar, etc.).
  Keep it reflective, not analytical — this is a mirror, not a dashboard chart.

> Selector: `themeFrequency()` — tallies `journalEntries[].themes`, returns
> ranked `{ theme, count }`. Derived.

---

## 3. The Account zone — the real settings

Below the Portrait, quieter. **Only settings with a real backing feature or
product principle.** Everything else from the old mockup is **cut** (see §4).

### 3.1 Identity basics
- **Name** — editable (`user.name`, via `setUser`).
- **On the path since {user.createdAt}** — read-only. Grounds the "account"
  feeling without inventing auth (there is no auth in v1).

### 3.2 Reading progress (books) — load-bearing
A control to set **books read / want to read** (`user.booksRead` /
`user.booksWantToRead`), reading against the **ordered** `books.js`.

- This is the **actual input to the RadiantDex spoiler gate** — editing it here
  has real downstream effect. Make the tie explicit in copy: _"Sets your
  spoiler-safe horizon in the RadiantDex."_
- Design as ordered book chips/toggles (WoK → WoR → OB → RoW → WaT). Because
  `books.js` is ordered, "read through book N" is the natural mental model.

### 3.3 Change your Order — stub that opens the flow
Identity-critical (`orderId` drives ideals, accent, RadiantDex roster), but
heavy. Design it as a **row with a clear affordance** (current Order + glyph +
"change ›") that **opens the choose-your-Order flow**. The flow itself is
**deferred** — same "designed, not fully wired" treatment as the RadiantDex
spoiler gate. Design the row and the entry point, not the whole re-onboarding.

### 3.4 Your data — Export
Export the journal + oaths to a file. Fits the local-first, _"yours alone"_
product principle.

- **Export only.** No reset/start-over control (deliberately out this pass).
- Copy can affirm local-first honestly (data lives on this device) **without** a
  privacy toggle — localStorage is already local; a toggle that claims
  "encryption" with nothing behind it is dishonest.

### 3.5 What the Account zone does NOT render
The old mockup's `Toggle` component now has **zero toggles** — **drop it from
this page.** The Account zone is rows with either an inline control (name field,
book chips) or a right-side affordance (chevron → flow, download button).

---

## 4. Cut / deferred / never

**Cut entirely (mockup filler with no backing feature):**
- The hardcoded `MILESTONES` array (§2.3 derives the real thing).
- The hardcoded `SETTINGS` array + the `Toggle` component.
- **Daily prompt time** — no scheduling/notification feature behind it.
- **Gentle reminders** — no reminder feature.
- **Private by default (toggle)** — localStorage is already local; nothing to
  toggle, no encryption behind the claim.
- **Show cadence on dashboard** — no such setting exists; cadence is the
  Dashboard's own concern.

**Deferred (designed as a stub / entry point, not fully wired):**
- The **change-Order** re-onboarding flow (§3.3) — design the row + entry point.
- Any reminder/notification-backed setting — revisit when that feature exists.
- **Reset / start over** — intentionally not added this pass.

**Never (v1 has none of this):**
- Auth / real multi-user accounts. The Profile is a single local `SEED_USER`.

---

## 5. Design-system constraints (from PROJECT-STRUCTURE.md — restated)

- **Read PROJECT-STRUCTURE.md first.** Tokens are the source of truth
  (`--stormlight*`, `--accent*`, `--text*`, `--font-display` /
  `--font-body`, radii, easings). Reference `var(--token)`; don't hardcode the
  palette.
- **Glow vs. accent:** the blue stormlight glow (progress fills, lit rails,
  ladder rungs) is **constant across every Order** and never recolors; only the
  per-Order **accent** recolors interactive marks (links, hover, small
  emphasis). A Skybreaker's ladder/progress is still stormlight-blue.
- Reuse the hand-rolled `ui/` kit (`Button`, `Card`, `Check`, `Modal`, …) —
  **not** a component library. Icons map to `lucide-react` in the app (hand-drawn
  `<path>` d-strings in the sandbox → map back to the named lucide import).
- **ES-module-shaped logic** even in the sandbox; avoid `window.*` reaches.
- **Derive, don't store:** every number and milestone is computed from `user` /
  `oaths` / `journalEntries` / the ladder — never a saved flag or a hand-kept
  list. Design the derived states, including empty/new-user states.

---

## 6. Screen to design (summary for the sandbox Claude)

One page, `/profile`, single portrait-first scroll:

**Portrait zone**
1. Identity hero — glyph ring, name, Order, highest ideal spoken, real meta line.
2. Lifetime totals — 4–5 derived stat tiles.
3. Journey timeline — auto-built milestone rail (derived, newest-first, with
   empty state).
4. Ideal ladder — compact, read-only, links out to the full ladder.
5. Themes you live by — ranked recurring themes (reflective, not a chart).

**Account zone**
6. Identity basics — editable name + read-only "on the path since."
7. Reading progress — ordered book chips (the RadiantDex spoiler-gate input).
8. Change your Order — stub row that opens the (deferred) flow.
9. Your data — Export.

Design each block's look, layout, interaction, and empty state; name the app
destinations (component / token / route / context selector) for each.
