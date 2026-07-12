// @ts-check
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AppDataContext } from "./AppDataContext";
/** @import { User, Oath, JournalEntry } from "../types.js" */

const SCHEMA_VERSION = 1;

/** @type {User} */
const SEED_USER = {
  id: "user-1",
  name: "Daniel Rhodes",
  orderId: "windrunner",
  booksRead: [],
  booksWantToRead: [],
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
    oathId: "oath-1",
    idealId: "ideal-3",
    title: "Keeping score",
    body: "Covered a shift for someone without expecting anything back. It felt lighter than I thought it would — no ledger to balance. I keep noticing how much of my week I spend keeping score.",
    createdAt: "2026-06-23T00:00:00.000Z",
    fav: true,
    themes: ["Family"],
  },
  {
    id: "2",
    userId: SEED_USER.id,
    body: "Long day. Just needed to get the noise out of my head before bed — nothing profound, no prompt, no oath. Writing it down so I stop carrying it around.",
    createdAt: "2026-06-22T00:00:00.000Z",
    fav: false,
    themes: [],
  },
  {
    id: "3",
    userId: SEED_USER.id,
    prompt: "What responsibility are you avoiding right now?",
    body: "The call to my brother. I keep waiting for the right moment, but the waiting is the avoidance — there isn't a clean version of it.",
    createdAt: "2026-06-20T00:00:00.000Z",
    fav: true,
    themes: ["Responsibility", "Family"],
  },
  {
    id: "4",
    userId: SEED_USER.id,
    idealId: "ideal-3",
    body: "Protecting even those I dislike — I felt this one today with a coworker I resent. I stayed fair. It cost me something and I want to remember that it did.",
    createdAt: "2026-06-18T00:00:00.000Z",
    fav: false,
    themes: ["Courage"],
  },
  {
    id: "5",
    userId: SEED_USER.id,
    title: "Morning pages",
    body: "Wrote three pages of nothing in particular before work. Half of it was grocery lists. The other half surprised me — the honest part always hides underneath the boring part.",
    createdAt: "2026-05-30T00:00:00.000Z",
    fav: false,
    themes: ["Growth"],
  },
  {
    id: "6",
    userId: SEED_USER.id,
    oathId: "oath-1",
    body: "My daughter wanted to show me something and I was half-there, phone in hand. She stopped asking. That stayed with me all evening.",
    createdAt: "2026-05-24T00:00:00.000Z",
    fav: false,
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

  const formatDate = (date) => {
    const d = new Date(date);
    const formatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
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

  const value = {
    user,
    setUser,
    oaths,
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
    formatDate,
    formatRelativeTime,
  };
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}
