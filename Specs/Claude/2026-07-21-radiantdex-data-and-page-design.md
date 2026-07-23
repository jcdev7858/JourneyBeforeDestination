# RadiantDex — data model + page-design handoff

_Design doc for the RadiantDex feature of Journey Before Destination (JBD)._
_Date: 2026-07-21. Branch context: `journal-add-context` (data files may land on
their own branch)._

This doc has **two audiences**:

1. **The data layer** (built in this session, in `app/`): the new/edited data
   files that back the RadiantDex.
2. **A separate design Claude** (the handoff): instructions for designing the
   RadiantDex **page layouts** in the `Specs/Claude/…` design sandbox. That
   instance produces a **design/preview**, NOT production app code — Jeremy
   rebuilds the real components himself (this is a React learning build).

---

## 1. What the RadiantDex is _for_ (the concept)

The whole app serves one loop: **read a prompt → set an oath → take an action →
reflect.** The RadiantDex is the **identity anchor** for that loop — it answers
_"who am I in this world, and who am I aspiring to be like?"_

It is **not** an encyclopedia. The Coppermind wiki already exists and is better
than anything we'd reproduce. Our version is deliberately **spoiler-safe,
aspirational, and connected to the user's own journey.** That framing is what
keeps the feature from collapsing into "a worse wiki."

Two entity types, two jobs:

### Order detail — "the path I walk"
Tied to the **user**: they picked an Order at onboarding (`user.orderId`). So an
Order page is partly a mirror — _your_ values, _your_ spren, _your_ surges, the
ideals ladder _you're_ climbing (`data/ideals.js`, cross-referenced by order id).
For other orders it reads as "paths not taken." It also lists its **characters**
(derived from `orderId`) as clickable exemplars.

### Character detail — "someone who walked it"
Characters are **exemplars of the ideals in action** — models of what living
those ideals looks like. Each shows who they are, a spoiler-safe summary of _what
they exemplify_ (not their plot), the books they appear in, and browsable tags.
The aspirational hook: Kaladin models "protecting those who cannot protect
themselves" — literally the Windrunner Second Ideal a user might be climbing.

### The relationship (what makes it a "dex," not two lists)
`Character → belongs to → Order → has → Ideals`. Click Windrunners → see
Kaladin; click Kaladin → jump back to Windrunners; both connect to the ideals
ladder the user is actually climbing. **That triangle is the feature.**

---

## 2. Data model (built this session, in `app/`)

Three data files, plus `types.js` typedefs. All static lore. Follows the repo's
**"derive, don't store"** convention (per `Specs/Claude/PROJECT-STRUCTURE.md`).

### 2.1 `app/src/data/books.js` (NEW) — canonical book vocabulary
The app already expects **book slugs** (`User.booksRead` / `booksWantToRead` in
`types.js`) but never defined the list. This file is the source of truth, and —
because it's **ordered** — it's what the future spoiler gate compares against.

```js
{ id: "wok", order: 1, title: "The Way of Kings", abbr: "WoK" }
```

Five books: `wok, wor, ob, row, wat`. The integer `order` is the reading-progress
axis (book N is "before" book N+1).

### 2.2 `app/src/data/characters.js` (NEW) — lean character records
Foreign key `orderId` lives on the character (the "many" side of Order→characters).

```js
{
  id: "kaladin",              // slug — also builds the Coppermind URL + the route param
  name: "Kaladin",
  orderId: "windrunner",      // FK → ORDERS[orderId]
  role: "Bridgeman turned Windrunner",         // one-line "what they are"
  exemplifies: "Protecting those who cannot protect themselves", // aspirational hook → ties to an ideal
  summary: "…",               // ORIGINAL, spoiler-safe prose (never Coppermind text verbatim)
  books: ["wok", "wor", ...], // books they appear in — slugs from books.js
  spoilerLevel: "wok",        // earliest book by which this entry is safe to show fully
  tags: ["bridge four", "surgebinder", "soldier"],
  image: null,                // local path e.g. "/characters/kaladin.jpg", or null → fall back to Order glyph
}
```

15 characters (per spec §9.6): Kaladin, Shallan, Dalinar, Adolin, Syl, Jasnah,
Szeth, Navani, Lift, Renarin, Teft, Rock, Lopen, Moash, Wit.

**`spoilerLevel` is the spoiler seam.** For most characters it equals their first
appearance. For **reveal characters** it is bumped later — e.g. Renarin appears
in book 1, but the fact that he's a **Truthwatcher** is a later reveal, so his
`spoilerLevel` is set to that book, not his first appearance. This is the whole
reason we don't just derive spoiler point from `books[0]`.

**Lean-with-room-to-grow:** these are the only fields now. Lore fields (aliases,
nationality, spren name, profession, status) can be added later without
restructuring.

### 2.3 `app/src/data/orders.js` (EDIT) — drop the stored roster
Currently each order stores `notableMembers: ["Kaladin", ...]` as plain strings.
**Remove it.** An order's roster is now **derived** by filtering `characters.js`
on `orderId` (repo convention: derive, don't store — the stored list can drift
out of sync with the characters file). Add a small helper, e.g.
`charactersByOrder(orderId)`, so consumers get the roster without a hand-kept list.

### 2.4 `app/src/types.js` (EDIT)
- Add `Book` typedef (`id`, `order`, `title`, `abbr`).
- Add `Character` typedef (fields above; `image` is `string|null`).
- Update `OrderRef`: remove `notableMembers`.
Match the existing JSDoc style (the `// book slugs` inline-comment convention).

### 2.5 Coppermind link — slug only
Store only the slug (`id`); the component builds
`https://coppermind.net/wiki/${slug}`. DRY — no redundant URL field.

### 2.6 Images — local, not hotlinked
`image` is a **local repo path** (e.g. `/characters/kaladin.jpg` under
`app/public/characters/`), the same self-hosted pattern as the app's fonts. **Do
NOT hotlink Coppermind image URLs at runtime** (Cloudflare-walled + fragile +
discourteous). Null → the card falls back to the character's **Order glyph**
(`OrderGlyph` + `orderGlyphs.js`), an on-theme empty state that costs nothing.
**Licensing caveat:** Coppermind character art is commissioned/fan art under
specific licenses — same category as the Hoid reference copy. Fine as local
reference while building a non-deployed learning v1; revisit before any public
ship.

---

## 3. Page-design handoff (for the separate design Claude)

> **Read `Specs/Claude/PROJECT-STRUCTURE.md` first.** It defines the two worlds
> (design sandbox vs. the real Vite app), the token vocabulary, the hand-rolled
> `ui/` kit, the glow-vs-accent rule, and the "derive, don't store" convention.
> **Produce a design/preview in the `Specs/Claude/…` sandbox, not production app
> code.** Jeremy rebuilds the real React components himself — this is a learning
> build. Your job is to specify **look, layout, and interaction**, naming
> destinations in app terms (which component/token/route each piece maps to), the
> way the Design Sync spec does.

**The data files (`books.js`, `characters.js`, updated `orders.js`) will be
pushed to git — read them directly for the real field names and values.** Don't
invent field shapes; use what's in those files.

### 3.1 Screens to design
1. **RadiantDex index** — the landing grid/list. Decide the primary spine:
   Orders as top-level cards, with characters browsable underneath (that's the
   agreed model — "Orders as the spine, characters underneath"). Character cards
   use `image` when present, else the Order glyph.
2. **Order detail** (`/radiantdex/order/:orderId` or similar — propose the route):
   values, spren, heralds, surges, description (all from `orders.js`), the
   **ideals ladder** for that order (`ideals.js`, filter by order), and the
   **derived roster** of characters as clickable exemplars. When this order ===
   `user.orderId`, treat it as "your path" (subtle emphasis, not a different
   layout).
3. **Character detail** (`/radiantdex/:slug`): name, role, `exemplifies` (feature
   this — it's the aspirational hook), spoiler-safe `summary`, book tags
   (`books`), browsable `tags`, a link back to their Order, and a "View on
   Coppermind" external link (build URL from slug). Image or Order-glyph fallback.

### 3.2 Spoiler-aware treatment — DESIGN IT, don't enforce it in v1
This is the important one. **Jeremy wants the full spoiler-gated treatment
designed and visible so he can plan for it, but v1 of his build will NOT enforce
gating.** So: build all the fields and both layouts (gated and un-gated states),
show what the gate looks like — but the actual reading-progress enforcement is a
later feature.

- **Mechanism: the Women's Script.** Gated text is obscured by rendering it in
  the in-world **Women's Script** glyphs, using the existing MIT-licensed engine
  at `Specs/Claude/jbd-pages-handoff/womens-script/womens-script.js` (per
  PROJECT-STRUCTURE.md §3, this engine is the shippable piece — keep its LICENSE
  with it when it moves into `app/`). A gated character/section reads as
  beautiful-but-unreadable script rather than a blank or a lock icon.
- **Signal that it's gated by reading progress.** The user must understand _why_
  it's obscured — "You haven't read this far" — not think it's broken. Show an
  affordance (label/tooltip/caption) that says the content is gated by reading
  progress.
- **Let the user adjust progress right there.** Provide an inline control on the
  page to set/adjust reading progress (which book they're through), so revealing
  is one action, in context. This reads against the ordered `books.js` and
  `User.booksRead`. (Enforcement wiring is deferred — design the control and the
  reveal/obscure states.)
- **Derived, not stored** (repo convention): whether an entry is gated is
  _computed_ from `character.spoilerLevel` vs. the user's progress — never saved
  as a per-character flag.

### 3.3 Design-system constraints (from PROJECT-STRUCTURE.md — restated)
- Tokens are the source of truth (`--stormlight*`, `--accent*`, `--text*`,
  `--font-display` / `--font-body`, radii, easings). Reference `var(--token)`.
- **Glow vs. accent:** the blue stormlight glow is constant across all Orders and
  never recolors; only the per-Order **accent** recolors interactive marks. A
  Skybreaker's progress fill is still stormlight-blue.
- Reuse the hand-rolled `ui/` kit (`Button`, `Card`, `Check`, `Modal`, …) —
  **not** a component library. Icons map to `lucide-react` in the app.
- ES-module-shaped logic even in the sandbox; name app destinations.

---

## 4. Scope boundaries

**In scope this session (data, in `app/`):** `books.js`, `characters.js` (15
chars), `orders.js` edit (drop `notableMembers` + add roster helper),
`types.js` typedefs.

**In scope for the design handoff (separate Claude, sandbox):** index + Order
detail + Character detail layouts; spoiler-gated treatment via Women's Script
with a reading-progress control — **designed and visible, not enforced.**

**Explicitly deferred:** runtime spoiler-gate enforcement; any live API to
Coppermind/17th Shard (Cloudflare-walled + CORS-walled for a browser app, and
finished-book lore doesn't change — static local data is the correct strategy);
image files themselves (field exists; art added later, licensing revisited before
any public ship); extra lore fields on characters.
