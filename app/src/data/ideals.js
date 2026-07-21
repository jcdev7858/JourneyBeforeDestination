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
  // Windrunners
  { id: "windrunner-1", order: "windrunner", rank: 1, text: FIRST_IDEAL },
  {
    id: "windrunner-2",
    order: "windrunner",
    rank: 2,
    text: "I will protect those who cannot protect themselves.",
  },
  {
    id: "windrunner-3",
    order: "windrunner",
    rank: 3,
    text: "I will protect even those I hate, so long as it is right.",
  },
  {
    id: "windrunner-4",
    order: "windrunner",
    rank: 4,
    text: "I accept that there will be those I cannot protect.",
  },
  {
    id: "windrunner-5",
    order: "windrunner",
    rank: 5,
    text: "I will protect myself, so that I may continue to protect others.",
  },

  // Skybreakers
  { id: "skybreaker-1", order: "skybreaker", rank: 1, text: FIRST_IDEAL },
  { id: "skybreaker-2", order: "skybreaker", rank: 2, text: "The Ideal of Justice." },
  { id: "skybreaker-3", order: "skybreaker", rank: 3, text: "The Ideal of Dedication." },
  { id: "skybreaker-4", order: "skybreaker", rank: 4, text: "The Ideal of Crusade." },
  { id: "skybreaker-5", order: "skybreaker", rank: 5, text: "The Ideal of Law." },

  // Dustbringers
  { id: "dustbringer-1", order: "dustbringer", rank: 1, text: FIRST_IDEAL },
  {
    id: "dustbringer-2",
    order: "dustbringer",
    rank: 2,
    text: "I will obtain self-mastery.",
  },

  // Edgedancers
  { id: "edgedancer-1", order: "edgedancer", rank: 1, text: FIRST_IDEAL },
  {
    id: "edgedancer-2",
    order: "edgedancer",
    rank: 2,
    text: "I will remember those who have been forgotten.",
  },
  {
    id: "edgedancer-3",
    order: "edgedancer",
    rank: 3,
    text: "I will listen to those who have been ignored.",
  },

  // Truthwatchers
  { id: "truthwatcher-1", order: "truthwatcher", rank: 1, text: FIRST_IDEAL },
  {
    id: "truthwatcher-2",
    order: "truthwatcher",
    rank: 2,
    text: "I will seek the truth.",
  },

  // Lightweavers — ranks 2–5 are personal truths the knight speaks about
  // themselves; there is no fixed canonical wording, so these are prompts.
  { id: "lightweaver-1", order: "lightweaver", rank: 1, text: FIRST_IDEAL },
  {
    id: "lightweaver-2",
    order: "lightweaver",
    rank: 2,
    text: "Speak a personal truth about yourself.",
  },
  {
    id: "lightweaver-3",
    order: "lightweaver",
    rank: 3,
    text: "Speak a personal truth about yourself.",
  },
  {
    id: "lightweaver-4",
    order: "lightweaver",
    rank: 4,
    text: "Speak a personal truth about yourself.",
  },
  {
    id: "lightweaver-5",
    order: "lightweaver",
    rank: 5,
    text: "Speak a personal truth about yourself.",
  },

  // Elsecallers
  { id: "elsecaller-1", order: "elsecaller", rank: 1, text: FIRST_IDEAL },
  {
    id: "elsecaller-2",
    order: "elsecaller",
    rank: 2,
    text: "I will reach my potential.",
  },

  // Willshapers
  { id: "willshaper-1", order: "willshaper", rank: 1, text: FIRST_IDEAL },
  {
    id: "willshaper-2",
    order: "willshaper",
    rank: 2,
    text: "I will seek freedom for those in bondage.",
  },

  // Stonewards
  { id: "stoneward-1", order: "stoneward", rank: 1, text: FIRST_IDEAL },
  {
    id: "stoneward-2",
    order: "stoneward",
    rank: 2,
    text: "I will be there when I am needed.",
  },

  // Bondsmiths
  { id: "bondsmith-1", order: "bondsmith", rank: 1, text: FIRST_IDEAL },
  {
    id: "bondsmith-2",
    order: "bondsmith",
    rank: 2,
    text: "I will unite instead of divide. I will bring men together.",
  },
  {
    id: "bondsmith-3",
    order: "bondsmith",
    rank: 3,
    text: "I will take responsibility for what I have done. If I must fall, I will rise each time a better man.",
  },
];

/** All ideals for one order, sorted low→high rank (the ladder order). */
export function idealsForOrder(orderId) {
  return IDEALS.filter((i) => i.order === orderId).sort((a, b) => a.rank - b.rank);
}

/** Look up a single ideal by its id (e.g. resolving JournalEntry.idealId). */
export function idealById(id) {
  return IDEALS.find((i) => i.id === id);
}
