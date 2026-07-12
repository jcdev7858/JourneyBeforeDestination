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
 * @property {string} [prompt]
 * @property {string} [oathId]
 * @property {string} [idealId]
 * @property {string} [title]
 * @property {string} body
 * @property {string} createdAt           // ISO date
 * @property {boolean} fav
 * @property {string[]} themes
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
