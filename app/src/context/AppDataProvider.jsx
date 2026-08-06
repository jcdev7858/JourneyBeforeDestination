// @ts-check
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AppDataContext } from "./AppDataContext";
import { IDEALS } from "../data/ideals";
import { fullQuoteLabel } from "../data/quotes";
import { PROMPTS } from "../data/prompts";
import { useMemo } from "react";

/** @import { User, Oath, JournalEntry } from "../types.js" */

const SCHEMA_VERSION = 1;

/** @type {User} */
const SEED_USER = {
  id: "user-1",
  name: "Daniel Rhodes",
  orderId: "bondsmith",
  booksRead: ["wok", "wor", "ob"],
  createdAt: "2026-02-01T00:00:00.000Z",
};

/** @type {Oath[]} */
const SEED_OATHS = [
  {
    id: "oath-1",
    userId: SEED_USER.id,
    title: "I will be more present with my family.",
    status: "active",
    archivedAt: null,
    keptAt: null,
    createdAt: "2026-06-22T00:00:00.000Z",
    actions: [
      { id: "a1", title: "Put my phone away during dinner", completed: true, completedAt: null },
      {
        id: "a2",
        title: "Plan one daddy-daughter date this month",
        completed: true,
        completedAt: null,
      },
      {
        id: "a3",
        title: "Go to the waterpark with the kids",
        completed: false,
        completedAt: null,
      },
      {
        id: "a4",
        title: "Spend one hour outside this week",
        completed: false,
        completedAt: null,
      },
      {
        id: "a5",
        title: "Plan a date night",
        completed: false,
        completedAt: null,
      },
    ],
    practiceLog: [],
  },
  {
    id: "oath-2",
    userId: SEED_USER.id,
    title: "I will see things as they truly are.",
    status: "active",
    archivedAt: null,
    keptAt: null,
    createdAt: "2026-06-22T00:00:00.000Z",
    actions: [
      {
        id: "b1",
        title: "Admitted I was wrong in the meeting",
        completed: true,
        completedAt: null,
      },
      {
        id: "b2",
        title: "Wrote down what I actually believe, unedited",
        completed: true,
        completedAt: null,
      },
      {
        id: "b3",
        title: "Ask the question I have been avoiding",
        completed: false,
        completedAt: null,
      },
    ],
    practiceLog: [],
  },
  {
    id: "oath-3",
    userId: SEED_USER.id,
    title: "I will sit in stillness each morning, before the day claims me.",
    status: "active",
    archivedAt: null,
    keptAt: null,
    createdAt: "2026-06-22T00:00:00.000Z",
    actions: [],
    practiceLog: [],
  },
  {
    id: "oath-4",
    userId: SEED_USER.id,
    title: "I will master my anger before it masters me.",
    status: "kept",
    archivedAt: null,
    keptAt: "2026-06-23T00:00:00.000Z",
    createdAt: "2026-06-22T00:00:00.000Z",
    actions: [
      {
        id: "c1",
        title: "Paused and breathed before replying when heated",
        completed: true,
        completedAt: null,
      },
      {
        id: "c2",
        title: "Named the fear out loud instead of acting on it",
        completed: true,
        completedAt: null,
      },
      {
        id: "c3",
        title: "Walk away from one argument I would normally win",
        completed: false,
        completedAt: null,
      },
    ],
    practiceLog: [],
  },
  {
    id: "oath-5",
    userId: SEED_USER.id,
    title: "I will train for the mountain climb this spring.",
    status: "archived",
    archivedAt: "2026-06-23T00:00:00.000Z",
    keptAt: null,
    createdAt: "2026-06-22T00:00:00.000Z",
    actions: [
      {
        id: "c1",
        title: "Paused and breathed before replying when heated",
        completed: true,
        completedAt: null,
      },
      {
        id: "c2",
        title: "Named the fear out loud instead of acting on it",
        completed: true,
        completedAt: null,
      },
      {
        id: "c3",
        title: "Walk away from one argument I would normally win",
        completed: false,
        completedAt: null,
      },
    ],
    practiceLog: [],
  },
];

/** @type {JournalEntry[]} */
const SEED_JOURNAL = [
  {
    id: "1",
    userId: SEED_USER.id,
    oathIds: ["oath-1"],
    idealIds: ["windrunner-3"],
    promptIds: [],
    quoteIds: [],
    title: "Keeping score",
    body: "Covered a shift for someone without expecting anything back. It felt lighter than I thought it would — no ledger to balance. I keep noticing how much of my week I spend keeping score.",
    createdAt: "2026-06-23T00:00:00.000Z",
    fav: true,
    status: "published",
    themes: ["Family"],
  },
  {
    id: "2",
    userId: SEED_USER.id,
    oathIds: [],
    idealIds: [],
    promptIds: [],
    quoteIds: ["kaladin-1"],
    title: "",
    body: "Long day. Just needed to get the noise out of my head before bed — nothing profound, no prompt, no oath. Writing it down so I stop carrying it around.",
    createdAt: "2026-06-22T00:00:00.000Z",
    fav: false,
    status: "published",
    themes: [],
  },
  {
    id: "3",
    userId: SEED_USER.id,
    oathIds: [],
    idealIds: [],
    promptIds: ["prompt-1"],
    quoteIds: [],
    title: "",
    body: "The call to my brother. I keep waiting for the right moment, but the waiting is the avoidance — there isn't a clean version of it.",
    createdAt: "2026-06-20T00:00:00.000Z",
    fav: true,
    status: "published",
    themes: ["Responsibility", "Family"],
  },
  {
    id: "4",
    userId: SEED_USER.id,
    oathIds: [],
    idealIds: ["windrunner-3"],
    promptIds: [],
    quoteIds: [],
    title: "",
    body: "Protecting even those I dislike — I felt this one today with a coworker I resent. I stayed fair. It cost me something and I want to remember that it did.",
    createdAt: "2026-06-18T00:00:00.000Z",
    fav: false,
    status: "published",
    themes: ["Courage"],
  },
  {
    id: "5",
    userId: SEED_USER.id,
    oathIds: [],
    idealIds: ["windrunner-3"],
    promptIds: [],
    quoteIds: [],
    title: "Morning pages",
    body: "Wrote three pages of nothing in particular before work. Half of it was grocery lists. The other half surprised me — the honest part always hides underneath the boring part.",
    createdAt: "2026-05-30T00:00:00.000Z",
    fav: false,
    status: "published",
    themes: ["Growth"],
  },
  {
    id: "6",
    userId: SEED_USER.id,
    oathIds: ["oath-1"],
    idealIds: [],
    promptIds: [],
    quoteIds: [],
    title: "",
    body: "My daughter wanted to show me something and I was half-there, phone in hand. She stopped asking. That stayed with me all evening.",
    createdAt: "2026-05-24T00:00:00.000Z",
    fav: false,
    status: "published",
    themes: ["Presence", "Family"],
  },
];

export function AppDataProvider({ children }) {
  // Persisted so a future migration can detect which shape old data is in.
  useLocalStorage("jbd:schemaVersion", SCHEMA_VERSION);
  const [user, setUser] = useLocalStorage("jbd:user", SEED_USER);
  const [oaths, setOaths] = useLocalStorage("jbd:oaths", SEED_OATHS);
  const [journalEntries, setJournalEntries] = useLocalStorage(
    "jbd:journalEntries",
    /** @type {JournalEntry[]} */ (SEED_JOURNAL)
  );

  const toggleAction = (oathId, actionId) => {
    setOaths((prevOaths) =>
      prevOaths.map((oath) => {
        if (oath.id !== oathId) return oath;
        return {
          ...oath,
          actions: oath.actions.map((a) =>
            a.id === actionId ? { ...a, completed: !a.completed } : a
          ),
        };
      })
    );
  };

  const updateOath = (oathId, patch) => {
    setOaths((prev) => prev.map((o) => (o.id === oathId ? { ...o, ...patch } : o)));
  };

  const addOath = (newOath) => {
    setOaths((prev) => [...prev, newOath]);
  };

  const deleteOath = (oathId) => {
    setOaths((prev) => prev.filter((o) => oathId !== o.id));
  };

  const archiveOath = (oathId) => {
    updateOath(oathId, { status: "archived", archivedAt: new Date().toISOString() });
  };

  const restoreOath = (oathId) => {
    updateOath(oathId, { status: "active", archivedAt: null });
  };

  const markKept = (oathId) => {
    updateOath(oathId, { status: "kept", keptAt: new Date().toISOString() });
  };

  const addEntry = (newEntry) => {
    setJournalEntries((prev) => [...prev, newEntry]);
  };

  const updateEntry = (entryId, patch) => {
    setJournalEntries((prev) => prev.map((e) => (e.id === entryId ? { ...e, ...patch } : e)));
  };

  const archiveEntry = (entryId) => {
    updateEntry(entryId, { status: "archived", archivedAt: new Date().toISOString() });
  };

  const formatDate = (date) => {
    if (!date) return "Unknown date"; // TODO: lookup if this is the right error handling for missing date, or if we should throw an error instead
    try {
      const d = new Date(date);
      const formatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
      return formatter.format(d);
    } catch {
      return "Unknown date";
    }
  };

  const formatDateMDY = (date) => {
    const d = new Date(date);
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formatter.format(d);
  };

  const formatRelativeTime = (date) => {
    const past = new Date(date).getTime();
    const now = new Date().getTime();
    const daysAgo = Math.floor((now - past) / (1000 * 60 * 60 * 24));
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (daysAgo >= 7) {
      const weeksAgo = Math.floor(daysAgo / 7);
      return rtf.format(-weeksAgo, "week");
    }
    return rtf.format(-daysAgo, "day");
  };

  const resolveAttachments = ({ oathIds, promptIds, idealIds, quoteIds, themes }) => {
    const backlinks = [];

    backlinks.push(
      ...oathIds.map((oathId) => ({
        type: "oath",
        label: oaths.find((o) => o.id === oathId)?.title,
        id: oathId,
      })),
      ...promptIds.map((promptId) => ({
        type: "prompt",
        label: PROMPTS.find((p) => p.id === promptId)?.text,
        id: promptId,
      })),
      ...idealIds.map((idealId) => ({
        type: "ideal",
        label: IDEALS.find((i) => i.id === idealId)?.text,
        id: idealId,
      })),
      ...quoteIds.map((quoteId) => ({
        type: "quote",
        label: fullQuoteLabel(quoteId),
        id: quoteId,
      })),
      ...themes.map((theme) => ({
        type: "theme",
        label: theme,
        id: theme,
      }))
    );
    return backlinks;
  };

  const toggleFav = (entryId) => {
    setJournalEntries((prevEntries) =>
      prevEntries.map((entry) => {
        if (entry.id !== entryId) return entry;
        return { ...entry, fav: !entry.fav };
      })
    );
  };

  const themes = useMemo(
    () => Array.from(new Set(journalEntries.flatMap((e) => e.themes))),
    [journalEntries]
  );

  const value = {
    user,
    setUser,
    oaths,
    themes,
    setOaths,
    journalEntries,
    setJournalEntries,
    toggleAction,
    updateOath,
    addOath,
    deleteOath,
    archiveOath,
    restoreOath,
    markKept,
    addEntry,
    updateEntry,
    archiveEntry,
    formatDate,
    formatDateMDY,
    formatRelativeTime,
    resolveAttachments,
    toggleFav,
  };
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}
