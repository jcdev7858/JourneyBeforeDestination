/* RadiantDex reference data — ported verbatim from app/src/data/{books,orders,characters,ideals}.js
   for this design sandbox (ES modules there → window globals here; see PROJECT-STRUCTURE.md).
   Field names/values must match the real files exactly — this is not placeholder data.
   → app terms: app/src/data/books.js, app/src/data/orders.js, app/src/data/characters.js, app/src/data/ideals.js */

const BOOKS = [
  { id: 'wok', order: 1, title: 'The Way of Kings', abbr: 'WoK' },
  { id: 'wor', order: 2, title: 'Words of Radiance', abbr: 'WoR' },
  { id: 'ob', order: 3, title: 'Oathbringer', abbr: 'OB' },
  { id: 'row', order: 4, title: 'Rhythm of War', abbr: 'RoW' },
  { id: 'wat', order: 5, title: 'Wind and Truth', abbr: 'WaT' },
];
const BOOKS_BY_ID = Object.fromEntries(BOOKS.map((b) => [b.id, b]));
function bookOrder(id) { return (BOOKS_BY_ID[id] && BOOKS_BY_ID[id].order) || 0; }

// accent palette matches ORDER_META in oaths.jsx — same discipline (glow stays
// stormlight; accent only recolors interactive marks the Order already owns)
const ORDERS = {
  windrunner: { id: 'windrunner', name: 'Windrunners', values: ['Protection', 'Leadership'], spren: 'Honorspren', heralds: ['Jezrien'], surges: ['Adhesion', 'Gravitation'], description: 'Windrunners serve as soldiers, scouts, and transporters, excelling in combat and weapon mastery. They are defined by protecting those who cannot protect themselves.', accent: '#7cc4e8', accentRgb: '124, 196, 232', accentDeep: '#4f93c4' },
  skybreaker: { id: 'skybreaker', name: 'Skybreakers', values: ['Justice', 'Morality'], spren: 'Highspren', heralds: ['Nale'], surges: ['Gravitation', 'Division'], description: "Tasked with upholding law and ensuring Knights Radiant don't abuse their powers, though they clash with the more liberal orders. Disciplined, exacting, and bound to a code.", accent: '#7cc4e8', accentRgb: '124, 196, 232', accentDeep: '#4f93c4' },
  dustbringer: { id: 'dustbringer', name: 'Dustbringers', values: ['Responsibility', 'Control'], spren: 'Ashspren', heralds: ['Chanarach'], surges: ['Division', 'Abrasion'], description: 'Engineers and builders who view destructive forces as interconnected with creation. Unique in gaining powers progressively through their ideals; value precision, responsibility, and self-mastery.', accent: '#e58b80', accentRgb: '229, 139, 128', accentDeep: '#c75a4c' },
  edgedancer: { id: 'edgedancer', name: 'Edgedancers', values: ['Remembrance', 'Compassion'], spren: 'Cultivationspren', heralds: ['Vedel'], surges: ['Abrasion', 'Progression'], description: 'Healers and caregivers who prioritize aiding common folk over combat, often settling in towns to support communities. They remember the ordinary people around them.', accent: '#7cc4e8', accentRgb: '124, 196, 232', accentDeep: '#4f93c4' },
  truthwatcher: { id: 'truthwatcher', name: 'Truthwatchers', values: ['Truth', 'Insight'], spren: 'Mistspren', heralds: ['Paliah'], surges: ['Progression', 'Illumination'], description: 'Scholarly academics who investigate truth through knowledge, science, and uncovering abuses of power. They seek the truth and share it.', accent: '#6fc4a0', accentRgb: '111, 196, 160', accentDeep: '#4a9a7a' },
  lightweaver: { id: 'lightweaver', name: 'Lightweavers', values: ['Creativity', 'Honesty'], spren: 'Cryptics', heralds: ['Shalash'], surges: ['Illumination', 'Transformation (Soulcasting)'], description: 'Spies and artists using illusions; their ideals center on distinguishing their true selves from their deceptions. They must understand and speak the truths about themselves.', accent: '#df8398', accentRgb: '223, 131, 152', accentDeep: '#c25a73' },
  elsecaller: { id: 'elsecaller', name: 'Elsecallers', values: ['Potential', 'Wisdom'], spren: 'Inkspren', heralds: ['Battar'], surges: ['Transformation (Soulcasting)', 'Transportation'], description: 'Wise tacticians and leaders focused on reaching their potential, valuable for logistics through Soulcasting and Shadesmar access.', accent: '#7cc4e8', accentRgb: '124, 196, 232', accentDeep: '#4f93c4' },
  willshaper: { id: 'willshaper', name: 'Willshapers', values: ['Freedom', 'Ingenuity'], spren: 'Reachers (lightspren)', heralds: ['Kalak'], surges: ['Transportation', 'Cohesion'], description: 'Crafters, builders, and radical thinkers opposing tyranny; used militarily to reinforce structures and rescue captives. They value freedom above all.', accent: '#c79ad8', accentRgb: '199, 154, 216', accentDeep: '#a06fc0' },
  stoneward: { id: 'stoneward', name: 'Stonewards', values: ['Reliability', 'Dependability'], spren: 'Peakspren', heralds: ['Talenel'], surges: ['Cohesion', 'Tension'], description: 'Dependable foot soldiers and team players with enthusiasm, though prone to overcommitment. They are there for others when they are needed.', accent: '#7cc4e8', accentRgb: '124, 196, 232', accentDeep: '#4f93c4' },
  bondsmith: { id: 'bondsmith', name: 'Bondsmiths', values: ['Unity', 'Leadership'], spren: 'The Stormfather, the Nightwatcher, or the Sibling', heralds: ['Ishar'], surges: ['Tension', 'Adhesion'], description: 'Only three Bondsmiths can exist at once, due to their unique spren. Rare and deeply valued leaders among the Radiants, they work to bring about unity.', accent: '#e6cd86', accentRgb: '230, 205, 134', accentDeep: '#c9a94f' },
};
const ORDER_LIST = ['windrunner', 'skybreaker', 'dustbringer', 'edgedancer', 'truthwatcher', 'lightweaver', 'elsecaller', 'willshaper', 'stoneward', 'bondsmith'];

const FIRST_IDEAL = 'Life before death, strength before weakness, journey before destination.';
const IDEALS = [
  { id: 'windrunner-1', order: 'windrunner', rank: 1, text: FIRST_IDEAL },
  { id: 'windrunner-2', order: 'windrunner', rank: 2, text: 'I will protect those who cannot protect themselves.' },
  { id: 'windrunner-3', order: 'windrunner', rank: 3, text: 'I will protect even those I hate, so long as it is right.' },
  { id: 'windrunner-4', order: 'windrunner', rank: 4, text: 'I accept that there will be those I cannot protect.' },
  { id: 'windrunner-5', order: 'windrunner', rank: 5, text: 'I will protect myself, so that I may continue to protect others.' },
  { id: 'skybreaker-1', order: 'skybreaker', rank: 1, text: FIRST_IDEAL },
  { id: 'skybreaker-2', order: 'skybreaker', rank: 2, text: 'The Ideal of Justice.' },
  { id: 'skybreaker-3', order: 'skybreaker', rank: 3, text: 'The Ideal of Dedication.' },
  { id: 'skybreaker-4', order: 'skybreaker', rank: 4, text: 'The Ideal of Crusade.' },
  { id: 'skybreaker-5', order: 'skybreaker', rank: 5, text: 'The Ideal of Law.' },
  { id: 'dustbringer-1', order: 'dustbringer', rank: 1, text: FIRST_IDEAL },
  { id: 'dustbringer-2', order: 'dustbringer', rank: 2, text: 'I will obtain self-mastery.' },
  { id: 'edgedancer-1', order: 'edgedancer', rank: 1, text: FIRST_IDEAL },
  { id: 'edgedancer-2', order: 'edgedancer', rank: 2, text: 'I will remember those who have been forgotten.' },
  { id: 'edgedancer-3', order: 'edgedancer', rank: 3, text: 'I will listen to those who have been ignored.' },
  { id: 'truthwatcher-1', order: 'truthwatcher', rank: 1, text: FIRST_IDEAL },
  { id: 'truthwatcher-2', order: 'truthwatcher', rank: 2, text: 'I will seek the truth.' },
  { id: 'lightweaver-1', order: 'lightweaver', rank: 1, text: FIRST_IDEAL },
  { id: 'lightweaver-2', order: 'lightweaver', rank: 2, text: 'Speak a personal truth about yourself.' },
  { id: 'lightweaver-3', order: 'lightweaver', rank: 3, text: 'Speak a personal truth about yourself.' },
  { id: 'lightweaver-4', order: 'lightweaver', rank: 4, text: 'Speak a personal truth about yourself.' },
  { id: 'lightweaver-5', order: 'lightweaver', rank: 5, text: 'Speak a personal truth about yourself.' },
  { id: 'elsecaller-1', order: 'elsecaller', rank: 1, text: FIRST_IDEAL },
  { id: 'elsecaller-2', order: 'elsecaller', rank: 2, text: 'I will reach my potential.' },
  { id: 'willshaper-1', order: 'willshaper', rank: 1, text: FIRST_IDEAL },
  { id: 'willshaper-2', order: 'willshaper', rank: 2, text: 'I will seek freedom for those in bondage.' },
  { id: 'stoneward-1', order: 'stoneward', rank: 1, text: FIRST_IDEAL },
  { id: 'stoneward-2', order: 'stoneward', rank: 2, text: 'I will be there when I am needed.' },
  { id: 'bondsmith-1', order: 'bondsmith', rank: 1, text: FIRST_IDEAL },
  { id: 'bondsmith-2', order: 'bondsmith', rank: 2, text: 'I will unite instead of divide. I will bring men together.' },
  { id: 'bondsmith-3', order: 'bondsmith', rank: 3, text: 'I will take responsibility for what I have done. If I must fall, I will rise each time a better man.' },
];
function idealsForOrder(orderId) { return IDEALS.filter((i) => i.order === orderId).sort((a, b) => a.rank - b.rank); }

const CHARACTERS = [
  { id: 'kaladin', name: 'Kaladin', orderId: 'windrunner', role: 'Bridgeman turned Windrunner', exemplifies: 'Protecting those who cannot protect themselves', summary: 'A gifted battlefield leader who rose from the lowest rank a soldier can hold. He is defined by a fierce refusal to let the people around him fall — even when carrying that weight nearly breaks him.', books: ['wok', 'wor', 'ob', 'row', 'wat'], spoilerLevel: 'wok', tags: ['bridge four', 'windrunner', 'soldier', 'leader'], image: null },
  { id: 'shallan', name: 'Shallan', orderId: 'lightweaver', role: 'Scholar and Lightweaver', exemplifies: 'Speaking the hard truths about oneself', summary: 'A quick-witted artist and scholar whose illusions can become a way to hide from her own past. Her growth is a struggle to face who she truly is rather than the masks she wears.', books: ['wok', 'wor', 'ob', 'row', 'wat'], spoilerLevel: 'wor', tags: ['lightweaver', 'scholar', 'artist'], image: null },
  { id: 'dalinar', name: 'Dalinar', orderId: 'bondsmith', role: 'Highprince and Bondsmith', exemplifies: 'Taking the next step toward becoming a better person', summary: 'A hardened warlord who chooses to seek unity over conquest. His arc is about owning a difficult past and building something better from it, one honest step at a time.', books: ['wok', 'wor', 'ob', 'row', 'wat'], spoilerLevel: 'wor', tags: ['bondsmith', 'highprince', 'leader'], image: null },
  { id: 'adolin', name: 'Adolin', orderId: 'stoneward', role: 'Duelist and heir of House Kholin', exemplifies: 'Showing up dependably for the people you love', summary: 'A charismatic duelist and devoted son, more comfortable with a blade and a friendship than with politics. He models steadiness and loyalty without needing supernatural power to matter.', books: ['wok', 'wor', 'ob', 'row', 'wat'], spoilerLevel: 'wok', tags: ['duelist', 'kholin', 'loyalty'], image: null },
  { id: 'syl', name: 'Syl', orderId: 'windrunner', role: 'Honorspren', exemplifies: 'Choosing honor as a living, playful thing', summary: 'An honorspren whose bond gives a Windrunner his powers. Curious and mischievous, she is a reminder that honor is not grim duty but something chosen, again and again, with joy.', books: ['wok', 'wor', 'ob', 'row', 'wat'], spoilerLevel: 'wok', tags: ['spren', 'honorspren', 'windrunner'], image: null },
  { id: 'jasnah', name: 'Jasnah', orderId: 'elsecaller', role: 'Scholar-queen and Elsecaller', exemplifies: 'Pursuing potential through wisdom and reason', summary: 'A brilliant, uncompromising scholar who trusts evidence over comfort. She embodies reaching one\u2019s full potential through clear thinking, even when her conclusions are unpopular.', books: ['wok', 'wor', 'ob', 'row', 'wat'], spoilerLevel: 'wok', tags: ['elsecaller', 'scholar', 'queen'], image: null },
  { id: 'szeth', name: 'Szeth', orderId: 'skybreaker', role: 'Assassin bound to a code', exemplifies: 'Living by a code even when it costs everything', summary: 'A man who follows law and oath with terrible exactness, and pays a terrible price for it. His story asks what happens when obedience and conscience pull in opposite directions.', books: ['wok', 'wor', 'ob', 'row', 'wat'], spoilerLevel: 'wor', tags: ['skybreaker', 'assassin', 'law'], image: null },
  { id: 'navani', name: 'Navani', orderId: 'bondsmith', role: 'Queen and scholar-engineer', exemplifies: 'Bringing people and ideas together to build', summary: 'An inventive queen and engineer who turns curiosity into things that change the world. She leads by connecting people, disciplines, and ideas into something greater than their parts.', books: ['wok', 'wor', 'ob', 'row', 'wat'], spoilerLevel: 'row', tags: ['bondsmith', 'engineer', 'queen'], image: null },
  { id: 'lift', name: 'Lift', orderId: 'edgedancer', role: 'Street child and Edgedancer', exemplifies: 'Remembering the people everyone else overlooks', summary: 'A street kid with a big appetite and a bigger heart, who slides through the world helping people no one else notices. She embodies remembering the forgotten and the small.', books: ['wor', 'ob', 'row', 'wat'], spoilerLevel: 'wor', tags: ['edgedancer', 'street', 'compassion'], image: null },
  { id: 'renarin', name: 'Renarin', orderId: 'truthwatcher', role: 'Quiet observer and Truthwatcher', exemplifies: 'Seeing truths others miss, and sharing them', summary: 'A thoughtful, observant young man often underestimated by those around him. His quiet way of seeing the world turns out to be a strength, not a weakness.', books: ['wok', 'wor', 'ob', 'row', 'wat'], spoilerLevel: 'ob', tags: ['truthwatcher', 'kholin', 'insight'], image: null },
  { id: 'teft', name: 'Teft', orderId: 'windrunner', role: 'Bridge Four veteran and Windrunner', exemplifies: 'Owning your failures and standing back up', summary: 'A gruff old soldier carrying real regrets, who finds a second family and a second chance. He shows that a past full of mistakes doesn\u2019t disqualify you from becoming someone people rely on.', books: ['wok', 'wor', 'ob', 'row', 'wat'], spoilerLevel: 'wor', tags: ['bridge four', 'windrunner', 'veteran'], image: null },
  { id: 'rock', name: 'Rock', orderId: 'windrunner', role: 'Bridge Four cook and friend', exemplifies: 'Nourishing and steadying a community', summary: 'A warm, larger-than-life cook whose kitchen becomes the heart of Bridge Four. He models the quiet, essential work of caring for people — feeding them, listening, holding a group together.', books: ['wok', 'wor', 'ob', 'row'], spoilerLevel: 'wok', tags: ['bridge four', 'cook', 'friendship'], image: null },
  { id: 'lopen', name: 'Lopen', orderId: 'windrunner', role: 'Bridge Four jokester and Windrunner', exemplifies: 'Lifting others with humor and heart', summary: 'An irrepressible optimist who never runs out of jokes or confidence. Beneath the humor is genuine devotion to his friends — proof that lightness can be its own kind of strength.', books: ['wor', 'ob', 'row', 'wat'], spoilerLevel: 'wor', tags: ['bridge four', 'windrunner', 'humor'], image: null },
  { id: 'moash', name: 'Moash', orderId: 'windrunner', role: 'Bridge Four soldier who lost his way', exemplifies: 'A cautionary mirror — where resentment can lead', summary: 'A capable, angry man whose grievances are real but whose choices grow darker. He stands as the shadow side of Bridge Four: a warning about letting bitterness decide who you become.', books: ['wok', 'wor', 'ob', 'row', 'wat'], spoilerLevel: 'ob', tags: ['bridge four', 'cautionary', 'resentment'], image: null },
  { id: 'wit', name: 'Wit', orderId: 'lightweaver', role: "Enigmatic storyteller and king's fool", exemplifies: 'Telling hard truths through story and wit', summary: "A sharp-tongued storyteller who appears where he's least expected, dispensing barbs, kindness, and uncomfortable truths in equal measure. He works through story more than swordplay.", books: ['wok', 'wor', 'ob', 'row', 'wat'], spoilerLevel: 'wok', tags: ['storyteller', 'wit', 'mystery'], image: null },
];
const CHARACTERS_BY_ID = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));
function charactersByOrder(orderId) { return CHARACTERS.filter((c) => c.orderId === orderId); }

Object.assign(window, { BOOKS, BOOKS_BY_ID, bookOrder, ORDERS, ORDER_LIST, IDEALS, idealsForOrder, CHARACTERS, CHARACTERS_BY_ID, charactersByOrder });
