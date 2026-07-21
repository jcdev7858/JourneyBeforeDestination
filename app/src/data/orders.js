// @ts-check
/**
 * Reference data for the ten Orders of the Knights Radiant — the "RadiantDex".
 *
 * Keyed by order id (the same key used in orderGlyphs.js GLYPHS and stored on
 * user.orderId), so you can look one up directly: ORDERS[user.orderId].
 *
 * This is static lore. It does NOT include the ideals themselves — those live in
 * data/ideals.js as a flat list (used by the ideals ladder + the reflection
 * "add context" popover). Cross-reference by order id.
 *
 * It also does NOT store its roster of characters. That's DERIVED from
 * data/characters.js via charactersByOrder(orderId) (repo convention: derive,
 * don't store — a stored member list can drift out of sync with the characters).
 *
 * Source of truth for the copy: Features/orders-reference.js (crawled reference).
 *
 * @typedef {import("../types").OrderRef} OrderRef
 * @type {Record<string, OrderRef>}
 */
export const ORDERS = {
  windrunner: {
    id: "windrunner",
    name: "Windrunners",
    values: ["Protection", "Leadership"],
    spren: "Honorspren",
    heralds: ["Jezrien"],
    surges: ["Adhesion", "Gravitation"],
    description:
      "Windrunners serve as soldiers, scouts, and transporters, excelling in combat and weapon mastery. They are defined by protecting those who cannot protect themselves.",
  },
  skybreaker: {
    id: "skybreaker",
    name: "Skybreakers",
    values: ["Justice", "Morality"],
    spren: "Highspren",
    heralds: ["Nale"],
    surges: ["Gravitation", "Division"],
    description:
      "Tasked with upholding law and ensuring Knights Radiant don't abuse their powers, though they clash with the more liberal orders. Disciplined, exacting, and bound to a code.",
  },
  dustbringer: {
    id: "dustbringer",
    name: "Dustbringers",
    values: ["Responsibility", "Control"],
    spren: "Ashspren",
    heralds: ["Chanarach"],
    surges: ["Division", "Abrasion"],
    description:
      "Engineers and builders who view destructive forces as interconnected with creation. Unique in gaining powers progressively through their ideals; value precision, responsibility, and self-mastery.",
  },
  edgedancer: {
    id: "edgedancer",
    name: "Edgedancers",
    values: ["Remembrance", "Compassion"],
    spren: "Cultivationspren",
    heralds: ["Vedel"],
    surges: ["Abrasion", "Progression"],
    description:
      "Healers and caregivers who prioritize aiding common folk over combat, often settling in towns to support communities. They remember the ordinary people around them.",
  },
  truthwatcher: {
    id: "truthwatcher",
    name: "Truthwatchers",
    values: ["Truth", "Insight"],
    spren: "Mistspren",
    heralds: ["Paliah"],
    surges: ["Progression", "Illumination"],
    description:
      "Scholarly academics who investigate truth through knowledge, science, and uncovering abuses of power. They seek the truth and share it.",
  },
  lightweaver: {
    id: "lightweaver",
    name: "Lightweavers",
    values: ["Creativity", "Honesty"],
    spren: "Cryptics",
    heralds: ["Shalash"],
    surges: ["Illumination", "Transformation (Soulcasting)"],
    description:
      "Spies and artists using illusions; their ideals center on distinguishing their true selves from their deceptions. They must understand and speak the truths about themselves.",
  },
  elsecaller: {
    id: "elsecaller",
    name: "Elsecallers",
    values: ["Potential", "Wisdom"],
    spren: "Inkspren",
    heralds: ["Battar"],
    surges: ["Transformation (Soulcasting)", "Transportation"],
    description:
      "Wise tacticians and leaders focused on reaching their potential, valuable for logistics through Soulcasting and Shadesmar access.",
  },
  willshaper: {
    id: "willshaper",
    name: "Willshapers",
    values: ["Freedom", "Ingenuity"],
    spren: "Reachers (lightspren)",
    heralds: ["Kalak"],
    surges: ["Transportation", "Cohesion"],
    description:
      "Crafters, builders, and radical thinkers opposing tyranny; used militarily to reinforce structures and rescue captives. They value freedom above all.",
  },
  stoneward: {
    id: "stoneward",
    name: "Stonewards",
    values: ["Reliability", "Dependability"],
    spren: "Peakspren",
    heralds: ["Talenel"],
    surges: ["Cohesion", "Tension"],
    description:
      "Dependable foot soldiers and team players with enthusiasm, though prone to overcommitment. They are there for others when they are needed.",
  },
  bondsmith: {
    id: "bondsmith",
    name: "Bondsmiths",
    values: ["Unity", "Leadership"],
    spren: "The Stormfather, the Nightwatcher, or the Sibling",
    heralds: ["Ishar"],
    surges: ["Tension", "Adhesion"],
    description:
      "Only three Bondsmiths can exist at once, due to their unique spren. Rare and deeply valued leaders among the Radiants, they work to bring about unity.",
  },
};
