// @ts-check
/**
 * The RadiantDex characters — exemplars of the Orders' ideals in action.
 *
 * Each character belongs to exactly one Order via `orderId` (the foreign key on
 * the "many" side of Order → characters). An Order's roster is DERIVED from this
 * list, not stored on the order (see charactersByOrder / data/orders.js).
 *
 * Copy rules (see CLAUDE.md + PROJECT-STRUCTURE.md):
 *   - `summary` is ORIGINAL, spoiler-safe prose. Never Coppermind text verbatim.
 *   - `exemplifies` names the ideal/trait they model — the aspirational hook that
 *     ties a character back to their order's ideals ladder (data/ideals.js).
 *
 * Spoiler model:
 *   - `books` = the mainline books they appear in (slugs from data/books.js).
 *   - `spoilerLevel` = the EARLIEST book by which showing this entry fully is
 *     safe. For most characters this is their first appearance. For *reveal*
 *     characters it's bumped later — e.g. Renarin appears in book 1, but that
 *     he's a Truthwatcher is a later reveal, so his spoilerLevel is that book,
 *     not his first appearance. (This is why we can't just use books[0].)
 *   - Enforcement (obscuring via the Women's Script, gated by reading progress)
 *     is DEFERRED to a later feature — the field exists so the gate is a
 *     one-line derive with no data migration.
 *
 * `image` is a local path under app/public/ (e.g. "/characters/kaladin.jpg") or
 * null → the UI falls back to the character's Order glyph. We don't hotlink
 * Coppermind images.
 *
 * @typedef {import("../types").Character} Character
 * @type {Character[]}
 */

// TODO: really take time to flesh out the details in this character list, and images (https://coppermind.net/wiki/Call_to_Adventure:_The_Stormlight_Archive)
export const CHARACTERS = [
  {
    id: "kaladin",
    name: "Kaladin",
    orderId: "windrunner",
    role: "Bridgeman turned Windrunner",
    exemplifies: "Protecting those who cannot protect themselves",
    summary:
      "A gifted battlefield leader who rose from the lowest rank a soldier can hold. He is defined by a fierce refusal to let the people around him fall — even when carrying that weight nearly breaks him.",
    books: ["wok", "wor", "ob", "row", "wat"],
    spoilerLevel: "wok",
    tags: ["bridge four", "windrunner", "soldier", "leader"],
    image: "/characters/kaladin.jpg",
    imgCaption: "The Next Ideal, from Call to Adventure: The Stormlight Archive",
  },
  {
    id: "shallan",
    name: "Shallan",
    orderId: "lightweaver",
    role: "Scholar and Lightweaver",
    exemplifies: "Speaking the hard truths about oneself",
    summary:
      "A quick-witted artist and scholar whose illusions can become a way to hide from her own past. Her growth is a struggle to face who she truly is rather than the masks she wears.",
    books: ["wok", "wor", "ob", "row", "wat"],
    spoilerLevel: "wor",
    tags: ["lightweaver", "scholar", "artist"],
    image: "/characters/shallan.jpg",
    imgCaption: null,
  },
  {
    id: "dalinar",
    name: "Dalinar",
    orderId: "bondsmith",
    role: "Highprince and Bondsmith",
    exemplifies: "Taking the next step toward becoming a better person",
    summary:
      "A hardened warlord who chooses to seek unity over conquest. His arc is about owning a difficult past and building something better from it, one honest step at a time.",
    books: ["wok", "wor", "ob", "row", "wat"],
    spoilerLevel: "wor",
    tags: ["bondsmith", "highprince", "leader"],
    image: "/characters/dalinar.jpg",
    imgCaption: null,
  },
  {
    id: "adolin",
    name: "Adolin",
    orderId: "stoneward",
    role: "Duelist and heir of House Kholin",
    exemplifies: "Showing up dependably for the people you love",
    summary:
      "A charismatic duelist and devoted son, more comfortable with a blade and a friendship than with politics. He models steadiness and loyalty without needing supernatural power to matter.",
    books: ["wok", "wor", "ob", "row", "wat"],
    spoilerLevel: "wok",
    tags: ["duelist", "kholin", "loyalty"],
    image: "/characters/adolin.jpg",
    imgCaption: null,
  },
  {
    id: "syl",
    name: "Syl",
    orderId: "windrunner",
    role: "Honorspren",
    exemplifies: "Choosing honor as a living, playful thing",
    summary:
      "An honorspren whose bond gives a Windrunner his powers. Curious and mischievous, she is a reminder that honor is not grim duty but something chosen, again and again, with joy.",
    books: ["wok", "wor", "ob", "row", "wat"],
    spoilerLevel: "wok",
    tags: ["spren", "honorspren", "windrunner"],
    image: "/characters/syl.jpg",
    imgCaption: null,
  },
  {
    id: "jasnah",
    name: "Jasnah",
    orderId: "elsecaller",
    role: "Scholar-queen and Elsecaller",
    exemplifies: "Pursuing potential through wisdom and reason",
    summary:
      "A brilliant, uncompromising scholar who trusts evidence over comfort. She embodies reaching one's full potential through clear thinking, even when her conclusions are unpopular.",
    books: ["wok", "wor", "ob", "row", "wat"],
    spoilerLevel: "wok",
    tags: ["elsecaller", "scholar", "queen"],
    image: null,
    imgCaption: null,
  },
  {
    id: "szeth",
    name: "Szeth",
    orderId: "skybreaker",
    role: "Assassin bound to a code",
    exemplifies: "Living by a code even when it costs everything",
    summary:
      "A man who follows law and oath with terrible exactness, and pays a terrible price for it. His story asks what happens when obedience and conscience pull in opposite directions.",
    books: ["wok", "wor", "ob", "row", "wat"],
    spoilerLevel: "wor",
    tags: ["skybreaker", "assassin", "law"],
    image: null,
    imgCaption: null,
  },
  {
    id: "navani",
    name: "Navani",
    orderId: "bondsmith",
    role: "Queen and scholar-engineer",
    exemplifies: "Bringing people and ideas together to build",
    summary:
      "An inventive queen and engineer who turns curiosity into things that change the world. She leads by connecting people, disciplines, and ideas into something greater than their parts.",
    books: ["wok", "wor", "ob", "row", "wat"],
    spoilerLevel: "row",
    tags: ["bondsmith", "engineer", "queen"],
    image: "/characters/navani.jpg",
    imgCaption: null,
  },
  {
    id: "lift",
    name: "Lift",
    orderId: "edgedancer",
    role: "Street child and Edgedancer",
    exemplifies: "Remembering the people everyone else overlooks",
    summary:
      "A street kid with a big appetite and a bigger heart, who slides through the world helping people no one else notices. She embodies remembering the forgotten and the small.",
    books: ["wor", "ob", "row", "wat"],
    spoilerLevel: "wor",
    tags: ["edgedancer", "street", "compassion"],
    image: null,
    imgCaption: null,
  },
  {
    id: "renarin",
    name: "Renarin",
    orderId: "truthwatcher",
    role: "Quiet observer and Truthwatcher",
    exemplifies: "Seeing truths others miss, and sharing them",
    summary:
      "A thoughtful, observant young man often underestimated by those around him. His quiet way of seeing the world turns out to be a strength, not a weakness.",
    books: ["wok", "wor", "ob", "row", "wat"],
    // Renarin appears from book 1, but that he's a Truthwatcher is a book-3 reveal.
    spoilerLevel: "ob",
    tags: ["truthwatcher", "kholin", "insight"],
    image: null,
    imgCaption: null,
  },
  {
    id: "teft",
    name: "Teft",
    orderId: "windrunner",
    role: "Bridge Four veteran and Windrunner",
    exemplifies: "Owning your failures and standing back up",
    summary:
      "A gruff old soldier carrying real regrets, who finds a second family and a second chance. He shows that a past full of mistakes doesn't disqualify you from becoming someone people rely on.",
    books: ["wok", "wor", "ob", "row", "wat"],
    spoilerLevel: "wor",
    tags: ["bridge four", "windrunner", "veteran"],
    image: null,
    imgCaption: null,
  },
  {
    id: "rock",
    name: "Rock",
    orderId: "windrunner",
    role: "Bridge Four cook and friend",
    exemplifies: "Nourishing and steadying a community",
    summary:
      "A warm, larger-than-life cook whose kitchen becomes the heart of Bridge Four. He models the quiet, essential work of caring for people — feeding them, listening, holding a group together.",
    books: ["wok", "wor", "ob", "row"],
    spoilerLevel: "wok",
    tags: ["bridge four", "cook", "friendship"],
    image: null,
    imgCaption: null,
  },
  {
    id: "lopen",
    name: "Lopen",
    orderId: "windrunner",
    role: "Bridge Four jokester and Windrunner",
    exemplifies: "Lifting others with humor and heart",
    summary:
      "An irrepressible optimist who never runs out of jokes or confidence. Beneath the humor is genuine devotion to his friends — proof that lightness can be its own kind of strength.",
    books: ["wor", "ob", "row", "wat"],
    spoilerLevel: "wor",
    tags: ["bridge four", "windrunner", "humor"],
    image: null,
    imgCaption: null,
  },
  {
    id: "moash",
    name: "Moash",
    orderId: "windrunner",
    role: "Bridge Four soldier who lost his way",
    exemplifies: "A cautionary mirror — where resentment can lead",
    summary:
      "A capable, angry man whose grievances are real but whose choices grow darker. He stands as the shadow side of Bridge Four: a warning about letting bitterness decide who you become.",
    books: ["wok", "wor", "ob", "row", "wat"],
    spoilerLevel: "ob",
    tags: ["bridge four", "cautionary", "resentment"],
    image: null,
    imgCaption: null,
  },
  {
    id: "wit",
    name: "Wit",
    orderId: "lightweaver",
    role: "Enigmatic storyteller and king's fool",
    exemplifies: "Telling hard truths through story and wit",
    summary:
      "A sharp-tongued storyteller who appears where he's least expected, dispensing barbs, kindness, and uncomfortable truths in equal measure. He works through story more than swordplay.",
    books: ["wok", "wor", "ob", "row", "wat"],
    spoilerLevel: "wok",
    tags: ["storyteller", "wit", "mystery"],
    image: null,
    imgCaption: null,
  },
];

/**
 * Characters keyed by id, for direct lookup: CHARACTERS_BY_ID["kaladin"].
 * @type {Record<string, Character>}
 */
export const CHARACTERS_BY_ID = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));

/**
 * An Order's roster, DERIVED (not stored on the order). Pass an order id, get
 * the characters whose orderId matches — in CHARACTERS declaration order.
 *
 * @param {string} orderId
 * @returns {Character[]}
 */
export function charactersByOrder(orderId) {
  return CHARACTERS.filter((c) => c.orderId === orderId);
}
