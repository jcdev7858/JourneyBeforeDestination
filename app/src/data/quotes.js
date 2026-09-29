// @ts-check
/**
 * QUOTES — short lines tied to RadiantDex characters, meant to sit alongside
 * a character's entry as material for reflection: read it, then "Borrow this
 * quote" into a journal entry, same pattern as the Ideal Ladder's borrow/
 * reflect actions.
 *
 * Every `text` below is a short line or fragment (well under paragraph
 * length) — not full monologues or scene dialogue.
 *
 * WORDING CONFIDENCE:
 *   - `kind: "ideal"` entries are formulaic and repeated in-text across the
 *     series, and the Windrunner ones already match oaths.jsx verbatim —
 *     high confidence.
 *   - `kind: "line"` entries are lines cited consistently enough across
 *     Coppermind/Goodreads that I'm comfortable with the wording, but fan
 *     transcriptions do drift by a word here and there. Worth one spot-check
 *     against coppermind.net before you ship if book-perfect accuracy matters
 *     to you (it will to some of your users).
 *
 * COVERAGE: Kaladin, Syl, Dalinar, Navani, Szeth, Jasnah, Lift, Rock, Adolin,
 * and Teft have entries below. Shallan, Renarin, Lopen, Moash, and Wit are
 * deliberately left out — I don't have confident short-line recall for them
 * (their most famous moments run long: Wit's speeches, the boots scene,
 * Renarin/Jasnah's exchange), so I'd rather you pull those from your own
 * copies than get a misattributed line in a feature that's supposed to be
 * trustworthy to fans.
 *
 * @typedef {import("../types").Quote} Quote
 */

import { capitalize } from "../utils/strings";
import { CHARACTERS_BY_ID } from "./characters";

// TODO: verify all of these quotes and context. Add new quotes

export const QUOTES = [
  // ---- Kaladin (windrunner) ----
  {
    id: "kaladin-1",
    characterId: "kaladin",
    text: "Honor is dead. But I'll see what I can do.",
    context: "Finishing Syl's words to Dalinar before entering the rigged arena duel",
    source: "wor",
  },
  {
    id: "kaladin-2",
    characterId: "kaladin",
    text: "I will protect those who cannot protect themselves.",
    context: "Windrunner Second Ideal, sworn defending the bridgemen",
    source: "wok",
  },
  {
    id: "kaladin-3",
    characterId: "kaladin",
    text: "Somebody has to start. Somebody has to step forward and do what is right, because it is right.",
    context:
      "His father Lirin's words to him as a boy, recalled as Bridge Four turns back for Dalinar",
    source: "wok",
  },
  {
    id: "kaladin-4",
    characterId: "kaladin",
    text: "...but the sky and the winds are mine. I claim them, as I now claim your life.",
    context: "Facing Szeth mid-duel after saving Dalinar from being Lashed into the sky",
    source: "wor",
  },
  {
    id: "kaladin-5",
    characterId: "kaladin",
    text: "I will protect even those I hate, so long as it is right.",
    context: "Windrunner Third Ideal, sworn stopping Moash and Graves from killing the king",
    source: "wor",
  },
  {
    id: "kaladin-6",
    characterId: "kaladin",
    text: "I will enjoy this. I will let myself enjoy living.",
    context: "UNVERIFIED — check exact wording against your own copy before shipping",
    source: "wat",
  },

  // ---- Syl (windrunner, honorspren) ----
  {
    id: "syl-1",
    characterId: "syl",
    text: "That's what they all were, silly.",
    context: "Answering Kaladin's confession, in the chasms, that he's broken",
    source: "wor",
  },

  // ---- Dalinar (bondsmith) ----
  {
    id: "dalinar-1",
    characterId: "dalinar",
    text: "Life before death. Strength before weakness. Journey before destination.",
    context: "The First Ideal, shared by every Radiant order",
    source: "wok",
  },
  {
    id: "dalinar-3a",
    characterId: "dalinar",
    text: "I will take responsibility for what I have done.",
    context: "Bondsmith Third Ideal, confronting Odium in Thaylen City",
    source: "ob",
  },
  {
    id: "dalinar-3b",
    characterId: "dalinar",
    text: "If I must fall, I will rise each time a better man.",
    context: "Second half of the same Third Ideal",
    source: "ob",
  },
  {
    id: "dalinar-4",
    characterId: "dalinar",
    text: "The most important step a person can take is always the next one.",
    context: "From Dalinar's own written account, reflecting on his journey",
    source: "ob",
  },
  {
    id: "dalinar-2",
    characterId: "dalinar",
    text: "I will do better.",
    context: "From the same reflective passage in Dalinar's record",
    source: "ob",
  },

  // ---- Navani (bondsmith) ----
  {
    id: "navani-1",
    characterId: "navani",
    text: "Journey before destination, you bastard.",
    context: "Bonding the Sibling, stopping Moash mid-strike",
    source: "row",
  },

  // ---- Szeth (skybreaker) ----
  {
    id: "szeth-1",
    characterId: "szeth",
    text: "Szeth-son-son-Vallano, Truthless of Shinovar, wore white on the day he was to kill a king.",
    context: "Opening line of the prologue, before killing King Gavilar",
    source: "wok",
  },

  // ---- Jasnah (elsecaller) ----
  {
    id: "jasnah-1",
    characterId: "jasnah",
    text: "Atheism is not a disease.",
    context: "To a king questioning her faith at a feast",
    source: "wok",
  },

  // ---- Lift (edgedancer) ----
  {
    id: "lift-1",
    characterId: "lift",
    text: "I don't talk to myself because I'm crazy.",
    context: "Introducing her own philosophy on talking to herself",
    source: "wor",
  },
  {
    id: "lift-2",
    characterId: "lift",
    text: "I do it because I'm awesome.",
    context: "Second half of the same line",
    source: "wor",
  },

  // ---- Rock (windrunner) ----
  {
    id: "rock-1",
    characterId: "rock",
    text: "Airsick lowlanders.",
    context: "Rock's running dismissal of non-Horneater customs",
    source: "wok",
  },

  // ---- Adolin (stoneward) ----
  {
    id: "adolin-1",
    characterId: "adolin",
    text: "My father thinks I'm a better man than he is. Unfortunately for you, he's wrong.",
    context: "Just after killing Sadeas in the alley",
    source: "wor",
  },

  // ---- Teft (windrunner) ----
  {
    id: "teft-1",
    characterId: "teft",
    text: "I ain't grouchy. I just have a low threshold for stupidity.",
    context: "Teft's gruff deflection when Kaladin needles him",
    source: "wor",
  },
];

/**
 * A character's quotes, in declaration order.
 * @param {string} characterId
 * @returns {Quote[]}
 */
export function quotesByCharacter(characterId) {
  return QUOTES.filter((q) => q.characterId === characterId);
}

/**
 * Builds the full quote label with name + quote
 * @param {string} quoteId
 * @returns {string}
 */
export function fullQuoteLabel(quoteId) {
  const quote = QUOTES.find((q) => q.id === quoteId);
  const speaker = CHARACTERS_BY_ID[`${quote?.characterId}`];
  return `${capitalize(speaker?.name)} - ${quote?.text}`;
}
