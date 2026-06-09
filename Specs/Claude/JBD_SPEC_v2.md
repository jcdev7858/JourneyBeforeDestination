# Journey Before Destination — Build Spec

A Stormlight-inspired companion that helps readers turn ideals into action through personal oaths, reflection, and a spoiler-aware character reference.

> **Status of this doc:** This is the single source of truth for what we are building. It supersedes the earlier scattered docs (BUILD_ORDER, ROADMAP, DATA_ARCHITECTURE, etc.), which are kept only as background. Decisions marked **[LOCKED]** are settled. Decisions marked **[CONFIRM]** are recommendations the two of us should sign off on during a call before they harden.
>
> **Companion doc:** `JBD_RESEARCH_FINDINGS.md` holds the why behind several principles below and the parked v1.1/v2 ideas, drawn from real fan research. This spec stays lean and build-focused; the findings doc carries the reasoning.

---

## 1. Core promise (the thing we cannot compromise)

> Help Stormlight fans turn ideals into real-life action.

Every scope decision is judged against this. If a feature does not serve the loop of **read a prompt, set an oath, take an action, reflect**, it is a hook or a polish item, not core.

---

## 2. Scope: what ships when

We are explicitly NOT building the full original spec as v1. The original MVP was really a v1.0 product. Below is the cut.

### v1 (the slice we ship first) **[LOCKED]**

The smallest thing that delivers the core promise, plus a minimal RadiantDex for Stormlight identity.

- Fake user profile (no auth), persisted to localStorage
- Onboarding: choose Order (skippable), select books read, optionally create first oath
- Dashboard: today's prompt, Order card, active oath card, reading progress
- Oaths: create, add actions, check off actions, edit, archive
- Journal: prompt-response entries and freeform entries
- RadiantDex (minimal): character list + character detail page + external Coppermind link

### v1.1 (the next obvious slice)

The RadiantDex richness and the dashboard extras we deliberately deferred.

- RadiantDex search and filter (by Order, by book)
- Favorite characters and favorite prompts
- Spoiler filtering by book (blur + "unlocks after X" message)
- Dashboard: recently viewed character widget, recent journal widget
- Journal entries linkable to oaths and characters
- **TypeScript conversion** (done together as a learning exercise; see Section 4)

### Future (someday, design-for-it-but-don't-build-it)

- XP, Ideal ranks, achievements, streaks (progression layer). If built, must follow the meaningful-progression principle (Section 3): anchored to real commitments, never points for their own sake. Needs ideation before it becomes a feature.
- Oath wallpaper and themed image export (the desktop-native expression of ambient presence). Strong v2 candidate, deferred so v1 stays a focused learning build. AI-generated Order-themed art is a later extension of the same idea.
- Real auth + Supabase (or similar) database
- Coppermind / MediaWiki API integration for live lore
- Roshar map, character relationship graph, character-inspiration prompts
- AI coaching, reminders, anything social

---

## 3. Product principles (decision tie-breakers)

1. Reflection over productivity.
2. Progress over perfection. (No forced steps. The dashboard always answers "what is my next step?")
3. Private by default.
4. Stormlight-inspired, not Stormlight-dependent.
5. Spoiler safety matters (v1.1 onward; v1 has no per-book content to leak).
6. Build small, design for expansion.
7. Local-first for v1.
8. Empty states are a feature, not polish. Every screen designs its empty state up front.
9. Ambient presence over active retrieval. Put the meaning in front of the user without requiring them to seek it out. A feature whose value depends on the user deciding to go look something up is suspect.
10. Scaffold, then personalize. Never start the user from a blank page. Offer a Stormlight-derived starting point (an Oath, a prompt, a suggested focus) they make their own. This mirrors how the Ideals work in the books: everyone swears the same Oath and means something personal by it.
11. Meaningful progression only. Any streak, rank, or progress marker must be anchored to a real commitment the user made (an oath, an action they chose). Progression for its own sake (points, badges, login streaks) is off-limits.

**Tone:** reflective, intentional, encouraging, slightly epic, calm. Avoid cheesy fantasy language, hustle-culture motivation, fake-therapy phrasing, and excessive gamification.

**Duty of care:** some users bring serious personal stakes to this material (recovery, trauma, mental illness). The app invites reflection on exactly these themes, so its tone must stay gentle and non-prescriptive, never pressure heavy self-examination, and never position itself as treatment. Include a soft, optional, unobtrusive pointer to real support resources.

---

## 4. Tech stack and conventions **[LOCKED unless noted]**

| Concern | Decision | Notes |
| --- | --- | --- |
| Build tool | Vite | Fast dev server, simple config |
| Framework | React 18+ | Function components + hooks only. No class components. |
| Language | JavaScript + JSDoc `@typedef` | TS deferred to v1.1. JSDoc gives editor autocomplete now and makes the TS migration mostly mechanical. |
| Routing | React Router (v6+) | See Section 8 for routes and guards |
| Styling | **[CONFIRM]** plain CSS or CSS Modules | Recommend CSS Modules for scoping without a build dependency. No Tailwind in v1 to keep cognitive load down. |
| State | React Context + custom hooks | See Section 5. No Zustand/Redux in v1. |
| Persistence | localStorage | See Section 7 |
| Package manager | **[CONFIRM]** npm | Pin one so lockfiles match across both machines |
| Formatting | Prettier | Already in Jeremy's workflow. Add a shared `.prettierrc`. |
| Linting | ESLint (Vite React preset) | Catch the obvious stuff |
| Platform | **[CONFIRM]** Desktop-first | Web app now; desktop packaging (e.g. Electron or Tauri) or a companion website possible later. Mobile is Future. Use as a scope filter: any feature that assumes a phone in your pocket (in-the-moment nudges, mid-workout prompts) is out of scope by definition. |

### Folder structure

```txt
src/
  components/    reusable UI pieces (OathCard, PromptCard, CharacterCard)
  pages/         one component per route (Dashboard, Oaths, RadiantDex...)
  data/          static JSON (orders, books, prompts, characters)
  hooks/         custom hooks (useLocalStorage, useAppData)
  context/       AppDataProvider
  utils/         pure helpers (promptForToday, slugify, dateKey)
```

---

## 5. Architecture: state and data flow

The dashboard is the integration boss. It reads user, Order, prompt-of-day, active oath, action progress, and reading progress. That fan-in is what forces a real state plan. Two pieces, kept deliberately small.

### 5.1 `useLocalStorage(key, initialValue)`

A blueprint for "a piece of state that remembers itself across reloads." Wraps `useState`, hydrates the initial value from localStorage, serializes to JSON on change.

```js
// hooks/useLocalStorage.js
import { useState, useEffect } from "react";

/**
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @returns {[T, (value: T) => void]}
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable; fail quietly for v1
    }
  }, [key, value]);

  return [value, setValue];
}
```

Building this yourself is the highest-value learning on the project. It is the `useState` + `useEffect` + serialization dance in one reusable unit.

### 5.2 `AppDataProvider` (one context, not many)

Context is the building intercom: any component reads `user` / `oaths` / `journalEntries` without props being passed down every level. The provider owns those three collections via `useLocalStorage` and exposes read + update helpers.

```js
// context/AppDataProvider.jsx (shape sketch, not full impl)
const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [user, setUser] = useLocalStorage("jbd:user", null);
  const [oaths, setOaths] = useLocalStorage("jbd:oaths", []);
  const [journalEntries, setJournalEntries] = useLocalStorage("jbd:journalEntries", []);
  // expose helpers: addOath, archiveOath, toggleAction, addJournalEntry, etc.
  const value = { user, setUser, oaths, setOaths, journalEntries, setJournalEntries };
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export const useAppData = () => useContext(AppDataContext);
```

**Anti-pattern to avoid:** one context per entity. One provider is plenty for v1. If it ever feels strained, that is the signal to reach for Zustand, not before.

Static data (orders, books, prompts, characters) is plain JSON imported directly where needed. It never goes in context because it never changes at runtime.

---

## 6. Data model

Written as JSDoc typedefs (these become TS interfaces in v1.1). Put these in a `types.js` or alongside the data files.

```js
/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string|null} orderId        // null if user skipped Order selection
 * @property {string[]} booksRead         // book slugs
 * @property {string[]} booksWantToRead   // book slugs
 * @property {string} createdAt           // ISO date
 */

/**
 * @typedef {Object} Order
 * @property {string} slug                // canonical key, e.g. "windrunner"
 * @property {string} name
 * @property {string} description
 * @property {string[]} themes
 * @property {string} icon
 */

/**
 * @typedef {Object} Book
 * @property {string} slug                // canonical key, e.g. "way-of-kings"
 * @property {string} title
 * @property {string} series
 * @property {number} order               // canonical reading order (1, 2, 3...)
 */

/**
 * @typedef {Object} Prompt
 * @property {string} id                  // e.g. "windrunner-001"
 * @property {string} orderId
 * @property {string} category
 * @property {string} text
 */

/**
 * @typedef {Object} OathAction
 * @property {string} id
 * @property {string} title
 * @property {boolean} completed
 * @property {string|null} completedAt
 */

/**
 * @typedef {Object} Oath
 * @property {string} id
 * @property {string} title
 * @property {"active"|"archived"} status
 * @property {OathAction[]} actions       // NESTED, not a separate collection (see 7.2)
 * @property {string} createdAt
 * @property {string|null} archivedAt
 */

/**
 * @typedef {Object} JournalEntry
 * @property {string} id
 * @property {"prompt"|"freeform"} entryType
 * @property {string|null} promptId       // set when entryType === "prompt"
 * @property {string} title
 * @property {string} body
 * @property {string} createdAt
 * // oathId and characterId links deferred to v1.1
 */

/**
 * @typedef {Object} Character    // v1: minimal. Spoiler/favorite fields deferred.
 * @property {string} slug                // canonical key AND route param. No separate id.
 * @property {string} name
 * @property {string} summary             // original, spoiler-safe, written by us
 * @property {string} orderId
 * @property {string[]} books             // book slugs the character appears in (display only in v1)
 * @property {string[]} tags
 * @property {string} coppermindUrl
 */
```

### Fixes baked in vs the original schema

- **Character `id` removed.** It duplicated `slug` in every example. `slug` is the one canonical key and the route param. (Two sources of truth for one value is a bug waiting to happen.)
- **`spoilerLevelBookId` removed from v1.** No spoiler filtering until v1.1, and it returns then with a precise rule (Section 11).
- **`image` removed.** It was `null` everywhere. Add it back in v1.1 if/when we have art, mindful of IP.
- **OathActions nested inside Oath** rather than a separate top-level collection (see 7.2).

---

## 7. Persistence spec

### 7.1 localStorage keys (v1) **[LOCKED]**

```txt
jbd:schemaVersion     // number, e.g. 1
jbd:user              // User | null
jbd:oaths             // Oath[]   (each Oath nests its actions)
jbd:journalEntries    // JournalEntry[]
```

`favoriteCharacters`, `favoritePrompts`, and `recentlyViewedCharacters` are v1.1, since favorites and the recently-viewed widget moved out of v1.

### 7.2 Nested vs normalized: nested for v1 **[CONFIRM]**

The original modeled `oathActions` as a separate key with an `oathId` foreign key (relational, mirrors the future DB). For a localStorage MVP that just forces manual joins in JS with no payoff. We nest actions inside the oath. When we move to a real database we normalize then. Simpler now, clean migration later.

(Jeremy: this is the inverse of the WordPress post-meta relational habit on purpose. Local-first wants the simplest shape that the UI reads directly.)

### 7.3 Schema versioning **[LOCKED]**

Store `jbd:schemaVersion`. On app boot, a tiny migration function compares the stored version to the current one and transforms old blobs forward if needed. This prevents the silent breakage that happens the first time we change the `User` shape after real data exists. v1 ships at version `1`; the migration map starts empty.

---

## 8. Routes and guards

```txt
/                       Start page
/onboarding             Onboarding wizard
/dashboard              Home base for returning users
/oaths                  Oath list + management
/journal                Journal list + entry creation
/profile                Profile view + edit
/radiantdex             Character list
/radiantdex/:slug       Character detail
```

### Guard rule **[LOCKED]**

- If `jbd:user` is `null`, the app routes to `/` (then `/onboarding`).
- If `jbd:user` exists, `/` redirects to `/dashboard`.
- Implement as a small `<RequireUser>` wrapper or an index redirect that reads context.

A `Layout` component provides persistent nav and wraps the routed pages.

---

## 9. Feature specs (v1)

Each feature lists behavior, the decisions made, acceptance criteria, and its empty state.

### 9.1 Onboarding

**Behavior:** Three steps. (1) Choose Order or skip. (2) Check off books read. (3) Optionally write a first oath with one or more actions. On finish, write the `User` to context/localStorage and redirect to `/dashboard`.

**Decisions:** Order is skippable. The first oath is **skippable** (`[CONFIRM]`, but recommended: forcing reflection before the user has seen the app fights "progress over perfection"). If skipped, the dashboard shows a CTA.

**Acceptance:** A user can complete onboarding choosing an Order, or skipping it, and land on a dashboard that reflects their choices.

**Empty state:** N/A (this is the entry point), but each step has a valid "nothing selected" path.

### 9.2 Profile

**Behavior:** Display name, Order, books read, books to read. Edit Order and book lists. Writes back through context.

**Acceptance:** Editing books read on the profile updates the dashboard reading-progress widget immediately (proves the context wiring).

**Empty state:** No Order selected shows "Choose your Order to unlock daily prompts."

### 9.3 Dashboard (integration boss)

**Behavior, v1 widgets only:**
- Today's prompt (with Respond action)
- Order card (name + themes), or the "choose your Order" CTA if skipped
- Active oath card (title + action progress like 2/5), or "create your first oath" CTA if none
- Reading progress (which books are marked read)

Recently-viewed character and recent-journal widgets are v1.1.

**Decisions:**
- **Today's prompt is deterministic per day** `[LOCKED]`. Derive a stable index from the date string `YYYY-MM-DD` (plus `orderId`) so the prompt does not change on refresh and rotates at local midnight. Selection: `index = hash(dateKey + orderId) % promptsForOrder.length`. (Good first logic task; a simple string-to-number hash is enough.)
- **Active oath = the most recently created oath with `status === "active"`** `[LOCKED]`. No `isPrimary` flag in v1. Multi-oath management lives on the Oaths page.

**Acceptance:** Refreshing the page keeps the same daily prompt. A user with no Order sees the CTA instead of a broken/empty prompt card.

**Empty states:** No Order, no active oath each render a CTA, never a blank box.

### 9.4 Oaths

**Behavior:** Create an oath (title). Add actions to it. Toggle an action complete (sets `completed` + `completedAt`). Edit oath title/actions. Archive an oath (`status: "archived"`, sets `archivedAt`). List shows active oaths; archived oaths are viewable but separated.

**Decisions:** Creating an oath starts from a canonical Oath the user personalizes, not a blank field. Offer a known Oath (the user's Order's oath, or the Windrunner First Ideal as a default) as editable starting text they rewrite into their own. This is the "scaffold, then personalize" principle (Section 3) and it matches observed real behavior: fans take a canonical oath and add a personal clause rather than writing from nothing. Removes the blank-page friction that stops people.

**Acceptance:** Completing an action on the Oaths page updates the dashboard progress count. Archiving removes the oath from the dashboard's active-oath selection.

**Empty state:** "No oaths yet. Take the next step." with a create CTA.

### 9.5 Journal

**Behavior:** Two entry types. Prompt-response (carries `promptId`, prefilled with the prompt text as context) and freeform. List of entries newest-first, each opening a detail/read view.

**Decisions:** Oath and character linking deferred to v1.1 (the nullable link fields are designed in but unused in v1).

**Acceptance:** Responding to the dashboard prompt creates a `prompt`-type entry that appears in the journal list.

**Empty state:** "Your journal is private and empty. Start with today's prompt or a freeform entry."

### 9.6 RadiantDex (minimal)

**Behavior:** A grid/list of character cards from `characters.json`. Click a card to open `/radiantdex/:slug`. Detail page shows name, Order, books appeared in, original spoiler-safe summary, tags, and a "View on Coppermind" external link.

**Decisions:** No search, no filter, no favorites, no spoiler gating in v1. Start with 10 to 15 characters (Kaladin, Shallan, Dalinar, Adolin, Syl, Jasnah, Szeth, Navani, Lift, Renarin, plus a few of Teft / Rock / Lopen / Moash / Wit).

**Acceptance:** A user can browse the list, open any character, read the summary, and click through to Coppermind.

**Empty state:** N/A for v1 (data is static and always present).

---

## 10. Build sequence (resolves the BUILD_ORDER vs ROADMAP conflict)

The two old docs disagreed (one said RadiantDex first, one said RadiantDex seventh). This is the reconciled order, sequenced so each step teaches one new thing before the next depends on it.

1. **App shell.** Vite, React Router, `Layout`, nav, placeholder pages. (Routing fundamentals, no state.)
2. **Static data + minimal RadiantDex.** Import JSON, render the character list and detail route. (Pure React fundamentals: lists, props, route params, the `.map` rendering pattern. Fast visible win, zero persistence. This honors the "RadiantDex first for momentum" instinct, scoped down.)
3. **The persistence spine.** Build `useLocalStorage`, `AppDataProvider`, and the `schemaVersion` boot check as a deliberate unit, before any feature needs them.
4. **Profile + onboarding.** First writes through the hook and context.
5. **Oaths.** The core feature. Nested actions, CRUD, archive.
6. **Journal.** Entries, prompt-response wiring.
7. **Dashboard.** The integration boss, built last because it depends on nearly everything above.
8. **Polish pass.** Verify empty states (ideally built per-feature already), responsive layout, copy, data cleanup.

---

## 11. Open decisions to confirm together **[CONFIRM]**

These are genuinely ours to settle on a call. The doc proceeds on the recommendation in each, but they are not locked.

1. **Styling approach:** CSS Modules (recommended) vs plain CSS vs something else.
2. **Package manager:** npm (recommended) vs pnpm vs yarn. Pin one.
3. **Onboarding first-oath:** skippable (recommended) vs required.
4. **Nested vs normalized storage:** nested (recommended for v1) vs normalized-now to ease the DB migration.
5. **Spoiler rule for v1.1 (design now, build later):** when a user has not read a character's introducing book, do we (a) hide the card, or (b) blur it with an "unlocks after [Book]" message. Recommend (b): it shows content exists without spoiling, and a blank-looking dex for new readers is bad UX. This requires the canonical `Book.order` field (already in the model) to compute "read up through book N."

---

## 12. Ways of working

- Weekly Zoom; the spec above is the shared backlog. Pull the next unbuilt item from Section 10.
- Git: short-lived feature branches off `main`, one per Section 10 milestone, reviewed together on the call before merge. (Good place for Jeremy to keep practicing the branch/PR flow.)
- Definition of done per feature = behavior works + acceptance criteria pass + empty state exists.
- TypeScript conversion is its own v1.1 milestone, done pair-style on a call.

---

## 13. Content and IP note

This is a non-commercial fan project, which is the safe lane. We write our own spoiler-safe summaries and prompts, use Coppermind / 17th Shard / official pages only for research, and link out with attribution rather than copying. Character names and the Order system are Brandon Sanderson's intellectual property. If this ever turns commercial or public-facing at scale, revisit this section first.
