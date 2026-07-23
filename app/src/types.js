// @ts-check
/**
 * Shared data-model typedefs for JBD.
 *
 * These are JSDoc @typedefs, not runtime code — they exist purely so the editor
 * (and any file with `// @ts-check`) can type-check our data shapes now, and so
 * the eventual TypeScript migration is mostly mechanical (each block becomes an
 * `interface`/`type`).
 *
 * Modeling note: oaths are NOT nested inside the user. A user "owns" their oaths
 * through a relation — each Oath carries a `userId` — the same shape a real
 * database expresses as a one-to-many (a `users` row, many `oaths` rows keyed by
 * user_id). OathActions, by contrast, ARE nested inside their Oath: an action is
 * owned wholly by one oath and never queried on its own.
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string|null} orderId        // null if the user skipped Order selection
 * @property {string[]} booksRead         // book slugs
 * @property {string[]} booksWantToRead   // book slugs
 * @property {string} createdAt           // ISO date
 */

/**
 * @typedef {Object} OathAction
 * @property {string} id
 * @property {string} title
 * @property {boolean} completed
 * @property {string|null} completedAt    // ISO date when completed, else null
 */

/**
 * @typedef {Object} Oath
 * @property {string} id
 * @property {string} userId              // the User.id this oath belongs to (the relation)
 * @property {string} title
 * @property {"active"|"kept"|"archived"} status
 * @property {OathAction[]} actions       // NESTED — actions ride along inside their oath
 * @property {string[]} practiceLog       // ISO dates the oath was practiced; the raw fact the streak (and, in v1.1, the cadence heatmap) derives FROM. [] for commitment oaths.
 * @property {string} createdAt           // ISO date
 * @property {string|null} archivedAt
 * @property {string|null} keptAt
 */

/**
 * @typedef {Object} JournalEntry
 * @property {string} id
 * @property {string} userId              // the User.id this entry belongs to
 * @property {string[]} [promptIds]
 * @property {string[]} [oathIds]
 * @property {string[]} [idealIds]
 * @property {string} [title]
 * @property {string} body
 * @property {string} createdAt           // ISO date
 * @property {boolean} fav
 * @property {string} status
 * @property {string} [archivedAt]          // ISO date
 * @property {string[]} themes
 */

/**
 * Static reference for one Order of the Knights Radiant — the "RadiantDex" lore
 * (data/orders.js). Deliberately excludes the ideals themselves; those live in
 * data/ideals.js as {@link Ideal}s, cross-referenced by order id. It also does
 * NOT store its roster of characters — that's DERIVED by filtering
 * data/characters.js on `orderId` (repo convention: derive, don't store).
 *
 * @typedef {Object} OrderRef
 * @property {string} id            // "windrunner" — matches the GLYPHS key + user.orderId
 * @property {string} name          // display name, e.g. "Windrunners"
 * @property {string[]} values      // the attributes/values the order embodies
 * @property {string} spren         // the spren type they bond
 * @property {string[]} herald     // associated Herald(s)
 * @property {string[]} surges      // the two Surges / powers
 * @property {string} description   // summary of the order's role/character
 */

/**
 * One book of the Stormlight Archive (data/books.js). The `order` integer is the
 * canonical reading sequence — the axis the (future) spoiler gate compares
 * against, and the vocabulary behind User.booksRead / booksWantToRead slugs.
 *
 * @typedef {Object} Book
 * @property {string} id            // slug, e.g. "wok" — used in booksRead + Character.books/spoilerLevel
 * @property {number} order         // 1-based reading position; book N is "before" book N+1
 * @property {string} title         // display title, e.g. "The Way of Kings"
 * @property {string} abbr          // short label for tags/chips, e.g. "WoK"
 */

/**
 * One character in the RadiantDex (data/characters.js) — an exemplar of an
 * Order's ideals in action. Lean by design (room to add lore fields later).
 * Belongs to exactly one Order via `orderId` (the FK on the "many" side).
 *
 * @typedef {Object} Character
 * @property {string} id            // slug, e.g. "kaladin" — route param + builds the Coppermind URL
 * @property {string} name          // display name
 * @property {string} orderId       // FK → OrderRef.id
 * @property {string} role          // one-line "what they are", e.g. "Bridgeman turned Windrunner"
 * @property {string} exemplifies   // the ideal/trait they model — the aspirational hook
 * @property {string} summary       // ORIGINAL spoiler-safe prose (never Coppermind text verbatim)
 * @property {string[]} books       // Book.id slugs they appear in
 * @property {string} spoilerLevel  // Book.id — earliest book by which this entry is safe to show fully
 * @property {string[]} tags        // browsable/filterable labels
 * @property {string|null} image    // local path e.g. "/characters/kaladin.jpg", or null → Order-glyph fallback
 */

/**
 * One ideal (oath) on an order's ladder (data/ideals.js). A JournalEntry may
 * reference one by `idealId` (=== Ideal.id).
 *
 * @typedef {Object} Ideal
 * @property {string} id            // order-scoped, "<order>-<rank>", e.g. "windrunner-3"
 * @property {string} order         // the OrderRef.id this ideal belongs to
 * @property {number} rank          // 1 = the shared First Ideal, then 2..5
 * @property {string} text          // the canonical oath, or a prompt when wording isn't fixed
 */

/**
 * One reflection prompt (data/prompts.js) — shown on the Dashboard and
 * attachable in the reflection editor. A JournalEntry may reference one by
 * `promptId` (=== Prompt.id).
 *
 * @typedef {Object} Prompt
 * @property {string} id            // "prompt-<n>", e.g. "prompt-1"
 * @property {string} text          // the prompt itself, shown to the user
 * @property {string} [order]       // OrderRef.id when themed to one order; omitted = general
 */

/**
 * QUOTES — short lines tied to RadiantDex characters, meant to sit alongside
 * a character's entry as material for reflection: read it, then "Borrow this
 * quote" into a journal entry, same pattern as the Ideal Ladder's borrow/
 * reflect actions.
 *
 * @typedef {Object} Quote
 * @property {string} id
 * @property {string} characterId   // matches Character.id in characters.js
 * @property {string} text
 * @property {string} context
 * @property {string} source        // book slug from data/books.js
 */

/**
 * The shape of everything `useAppData()` hands back — the app-wide data plus
 * its updaters. Setters are typed loosely (plain functions); we care about the
 * data shapes (User, Oath[], JournalEntry[]), not the setter signatures.
 *
 * @typedef {Object} AppData
 * @property {User|null} user
 * @property {Function} setUser
 * @property {Oath[]} oaths
 * @property {Function} setOaths
 * @property {JournalEntry[]} journalEntries
 * @property {Function} setJournalEntries
 * @property {(oathId: string, actionId: string) => void} toggleAction
 */

// Nothing to export — typedefs are ambient JSDoc. This file is `import`ed only
// for its side effect of being part of the project's type graph.
export {};
