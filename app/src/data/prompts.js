// @ts-check
/**
 * The reflection prompts the app offers — one flat list.
 *
 * Rendered in two places:
 *   1. the Dashboard "Today's reflection" card (PromptCard) — pick one to show
 *   2. the "add context" popover in the reflection editor (attach a promptId
 *      to a JournalEntry — see JournalEntry.promptId in types.js)
 *
 * IDs are "prompt-<n>". A prompt may carry an optional `order`: when set, it's
 * themed to that Order's values (so a future per-order "prompt of the day" can
 * filter to the user's order); prompts with no `order` are general and fit anyone.
 *
 * Static content. All copy here is original (see CLAUDE.md — reference material
 * is never shipped verbatim).
 *
 * @typedef {import("../types").Prompt} Prompt
 */

/** @type {Prompt[]} */
export const PROMPTS = [
  // General — fit any order
  { id: "prompt-1", text: "What responsibility are you avoiding right now?" },
  { id: "prompt-2", text: "Where did you choose the harder right over the easier wrong today?" },
  { id: "prompt-3", text: "What is one small step you can take, even if the destination is far off?" },
  { id: "prompt-4", text: "Who needed you today, and did you show up?" },
  { id: "prompt-5", text: "What weakness are you pretending isn't there?" },
  { id: "prompt-6", text: "What truth about yourself are you not ready to say out loud?" },

  // Windrunner — protection, leadership
  {
    id: "prompt-7",
    order: "windrunner",
    text: "Who did you protect today — and who did you fail to?",
  },
  {
    id: "prompt-8",
    order: "windrunner",
    text: "Was there someone you had to protect even though you didn't want to?",
  },

  // Skybreaker — justice, morality
  {
    id: "prompt-9",
    order: "skybreaker",
    text: "Did you follow a rule you knew was wrong, or break one you knew was right?",
  },

  // Edgedancer — remembrance, compassion
  {
    id: "prompt-10",
    order: "edgedancer",
    text: "Who did you notice today that everyone else overlooked?",
  },

  // Lightweaver — creativity, honesty
  {
    id: "prompt-11",
    order: "lightweaver",
    text: "What version of yourself did you show the world, and how true was it?",
  },

  // Bondsmith — unity, leadership
  {
    id: "prompt-12",
    order: "bondsmith",
    text: "Where did you bring people together instead of driving them apart?",
  },
];

/** All prompts fit for one order: its order-specific ones plus the general ones. */
export function promptsForOrder(orderId) {
  return PROMPTS.filter((p) => !p.order || p.order === orderId);
}

/** Look up a single prompt by its id (e.g. resolving JournalEntry.promptId). */
export function promptById(id) {
  return PROMPTS.find((p) => p.id === id);
}
