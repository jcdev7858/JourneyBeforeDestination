// @ts-check
/**
 * The known ideals (oaths) of every Order, as one flat list.
 *
 * This is the data the app actually renders in two places:
 *   1. the Ideals ladder on the Oaths page (filter to one order, sort by rank)
 *   2. the "add context" popover in the reflection editor (attach an idealId
 *      to a JournalEntry — see JournalEntry.idealId in types.js)
 *
 * IDs are order-scoped: `<orderId>-<rank>` (e.g. "windrunner-3"). That makes each
 * id globally unique and self-describing — an idealId alone tells you the order
 * and the rung. rank 1 is the shared First Ideal, common to every order.
 *
 * Static lore. Order *reference* (spren, herald, powers, members, description)
 * lives separately in data/orders.js, cross-referenced by `order`.
 * Source of truth for the copy: Features/orders-reference.js (crawled reference).
 *
 * @typedef {import("../types").Ideal} Ideal
 */

/** The shared First Ideal every order speaks. */
export const FIRST_IDEAL =
  "Life before death, strength before weakness, journey before destination.";

/** @type {Ideal[]} */
export const IDEALS = [
  // Windrunners — reveal-books: 2nd WoK, 3rd WoR, 4th RoW, 5th WaT.
  { id: "windrunner-1", order: "windrunner", rank: 1, text: FIRST_IDEAL, revealBook: null },
  {
    id: "windrunner-2",
    order: "windrunner",
    rank: 2,
    text: "I will protect those who cannot protect themselves.",
    revealBook: "wok",
  },
  {
    id: "windrunner-3",
    order: "windrunner",
    rank: 3,
    text: "I will protect even those I hate, so long as it is right.",
    revealBook: "wor",
  },
  {
    id: "windrunner-4",
    order: "windrunner",
    rank: 4,
    text: "I accept that there will be those I cannot protect.",
    revealBook: "row",
  },
  {
    id: "windrunner-5",
    order: "windrunner",
    rank: 5,
    text: "I will protect myself, so that I may continue to protect others.",
    revealBook: "wat",
  },

  // Skybreakers — 5 named Ideals (Justice/Dedication/Crusade/Law), revealed
  // across Nale's arc. ⚠️ AUDIT revealBook: my best guess is Justice/Dedication
  // by WoR, Crusade/Law later (OB→WaT). Correct the books if you know them.
  { id: "skybreaker-1", order: "skybreaker", rank: 1, text: FIRST_IDEAL, revealBook: null },
  { id: "skybreaker-2", order: "skybreaker", rank: 2, text: "The Ideal of Justice.", revealBook: "wor" },
  { id: "skybreaker-3", order: "skybreaker", rank: 3, text: "The Ideal of Dedication.", revealBook: "wor" },
  { id: "skybreaker-4", order: "skybreaker", rank: 4, text: "The Ideal of Crusade.", revealBook: "ob" },
  { id: "skybreaker-5", order: "skybreaker", rank: 5, text: "The Ideal of Law.", revealBook: "ob" },

  // Dustbringers (Releasers) — only the 2nd is known ("self-mastery"). 3rd–5th
  // genuinely unchronicled → text:null. ⚠️ AUDIT revealBook for the 2nd (I guessed wat).
  { id: "dustbringer-1", order: "dustbringer", rank: 1, text: FIRST_IDEAL, revealBook: null },
  { id: "dustbringer-2", order: "dustbringer", rank: 2, text: "I will obtain self-mastery.", revealBook: "wat" },
  { id: "dustbringer-3", order: "dustbringer", rank: 3, text: null, revealBook: null },
  { id: "dustbringer-4", order: "dustbringer", rank: 4, text: null, revealBook: null },
  { id: "dustbringer-5", order: "dustbringer", rank: 5, text: null, revealBook: null },

  // Edgedancers — 2nd & 3rd known (from Lift's arc / OB). 4th–5th unchronicled.
  // ⚠️ AUDIT: also confirm the 2nd/3rd ORDER (remember vs listen) + their books.
  { id: "edgedancer-1", order: "edgedancer", rank: 1, text: FIRST_IDEAL, revealBook: null },
  { id: "edgedancer-2", order: "edgedancer", rank: 2, text: "I will remember those who have been forgotten.", revealBook: "wor" },
  { id: "edgedancer-3", order: "edgedancer", rank: 3, text: "I will listen to those who have been ignored.", revealBook: "ob" },
  { id: "edgedancer-4", order: "edgedancer", rank: 4, text: null, revealBook: null },
  { id: "edgedancer-5", order: "edgedancer", rank: 5, text: null, revealBook: null },

  // Truthwatchers — only 2nd known ("seek the truth"). 3rd+ unchronicled (not yet
  // revealed in the books). ⚠️ AUDIT revealBook for the 2nd.
  { id: "truthwatcher-1", order: "truthwatcher", rank: 1, text: FIRST_IDEAL, revealBook: null },
  { id: "truthwatcher-2", order: "truthwatcher", rank: 2, text: "I will seek the truth.", revealBook: "ob" },
  { id: "truthwatcher-3", order: "truthwatcher", rank: 3, text: null, revealBook: null },
  { id: "truthwatcher-4", order: "truthwatcher", rank: 4, text: null, revealBook: null },
  { id: "truthwatcher-5", order: "truthwatcher", rank: 5, text: null, revealBook: null },

  // Lightweavers — SPECIAL CASE: ranks 2–5 are personal truths with NO fixed
  // canonical wording (prompts, not scripture). They're not spoiler-gated the
  // usual way — the words don't exist to be spoiled. Left revealBook:null (always
  // legible as prompts). ⚠️ DISCUSS: do these belong on the reveal ladder at all?
  { id: "lightweaver-1", order: "lightweaver", rank: 1, text: FIRST_IDEAL, revealBook: null },
  { id: "lightweaver-2", order: "lightweaver", rank: 2, text: "Speak a personal truth about yourself.", revealBook: null },
  { id: "lightweaver-3", order: "lightweaver", rank: 3, text: "Speak a personal truth about yourself.", revealBook: null },
  { id: "lightweaver-4", order: "lightweaver", rank: 4, text: "Speak a personal truth about yourself.", revealBook: null },
  { id: "lightweaver-5", order: "lightweaver", rank: 5, text: "Speak a personal truth about yourself.", revealBook: null },

  // Elsecallers — 2nd known ("reach my potential"). 3rd–5th unchronicled.
  { id: "elsecaller-1", order: "elsecaller", rank: 1, text: FIRST_IDEAL, revealBook: null },
  { id: "elsecaller-2", order: "elsecaller", rank: 2, text: "I will reach my potential.", revealBook: "ob" },
  { id: "elsecaller-3", order: "elsecaller", rank: 3, text: null, revealBook: null },
  { id: "elsecaller-4", order: "elsecaller", rank: 4, text: null, revealBook: null },
  { id: "elsecaller-5", order: "elsecaller", rank: 5, text: null, revealBook: null },

  // Willshapers — 2nd known ("freedom for those in bondage"). 3rd–5th unchronicled.
  { id: "willshaper-1", order: "willshaper", rank: 1, text: FIRST_IDEAL, revealBook: null },
  { id: "willshaper-2", order: "willshaper", rank: 2, text: "I will seek freedom for those in bondage.", revealBook: "ob" },
  { id: "willshaper-3", order: "willshaper", rank: 3, text: null, revealBook: null },
  { id: "willshaper-4", order: "willshaper", rank: 4, text: null, revealBook: null },
  { id: "willshaper-5", order: "willshaper", rank: 5, text: null, revealBook: null },

  // Stonewards — 2nd known ("be there when I am needed"). 3rd–5th unchronicled.
  { id: "stoneward-1", order: "stoneward", rank: 1, text: FIRST_IDEAL, revealBook: null },
  { id: "stoneward-2", order: "stoneward", rank: 2, text: "I will be there when I am needed.", revealBook: "ob" },
  { id: "stoneward-3", order: "stoneward", rank: 3, text: null, revealBook: null },
  { id: "stoneward-4", order: "stoneward", rank: 4, text: null, revealBook: null },
  { id: "stoneward-5", order: "stoneward", rank: 5, text: null, revealBook: null },

  // Bondsmiths — 2nd & 3rd known (unite; take responsibility). 4th–5th unchronicled.
  // ⚠️ AUDIT: Dalinar speaks the 3rd in Oathbringer → revealBook "ob"; 2nd earlier?
  { id: "bondsmith-1", order: "bondsmith", rank: 1, text: FIRST_IDEAL, revealBook: null },
  { id: "bondsmith-2", order: "bondsmith", rank: 2, text: "I will unite instead of divide. I will bring men together.", revealBook: "ob" },
  { id: "bondsmith-3", order: "bondsmith", rank: 3, text: "I will take responsibility for what I have done. If I must fall, I will rise each time a better man.", revealBook: "ob" },
  { id: "bondsmith-4", order: "bondsmith", rank: 4, text: null, revealBook: null },
  { id: "bondsmith-5", order: "bondsmith", rank: 5, text: null, revealBook: null },
];

/** All ideals for one order, sorted low→high rank (the ladder order). */
export function idealsForOrder(orderId) {
  return IDEALS.filter((i) => i.order === orderId).sort((a, b) => a.rank - b.rank);
}

/** Look up a single ideal by its id (e.g. resolving JournalEntry.idealId). */
export function idealById(id) {
  return IDEALS.find((i) => i.id === id);
}
