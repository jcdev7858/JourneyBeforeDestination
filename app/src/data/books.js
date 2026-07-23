// @ts-check
/**
 * The Stormlight Archive, in reading order — the canonical book vocabulary.
 *
 * This is the source of truth for book *slugs* used across the app:
 *   - User.booksRead / booksWantToRead (types.js) store these ids.
 *   - Character.books / Character.spoilerLevel (data/characters.js) reference them.
 *
 * Because BOOKS is ordered (the `order` integer), it's also the axis the future
 * reading-progress spoiler gate compares against: a fact tagged `spoilerLevel:
 * "ob"` is safe once the reader has reached book order 3. Look one up by id via
 * BOOKS_BY_ID, or compare positions with bookOrder().
 *
 * Static lore. Only the five mainline Stormlight novels — novellas/other Cosmere
 * books are out of scope for v1.
 *
 * @typedef {import("../types").Book} Book
 * @type {Book[]}
 */
export const BOOKS = [
  { id: "wok", order: 1, title: "The Way of Kings", abbr: "WoK" },
  { id: "wor", order: 2, title: "Words of Radiance", abbr: "WoR" },
  { id: "ob", order: 3, title: "Oathbringer", abbr: "OB" },
  { id: "row", order: 4, title: "Rhythm of War", abbr: "RoW" },
  { id: "wat", order: 5, title: "Wind and Truth", abbr: "WaT" },
];

/**
 * Books keyed by id, for direct lookup: BOOKS_BY_ID["ob"].
 * @type {Record<string, Book>}
 */
export const BOOKS_BY_ID = Object.fromEntries(BOOKS.map((b) => [b.id, b]));

/**
 * The reading position of a book id (its `order`), or 0 if unknown — so an
 * unknown slug sorts before book 1 rather than throwing. The (future) spoiler
 * gate is then just `bookOrder(user.progress) >= bookOrder(char.spoilerLevel)`.
 *
 * @param {string} id
 * @returns {number}
 */
export function bookOrder(id) {
  return BOOKS_BY_ID[id]?.order ?? 0;
}
