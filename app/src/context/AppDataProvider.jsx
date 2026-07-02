// @ts-check
import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
/** @import { User, Oath, JournalEntry, AppData } from "../types.js" */

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
        title: "Spend one hour outside this week",
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
        title: "Spend one hour outside this week",
        completed: false,
        completedAt: null,
      },
    ],
  },
  {
    id: "oath-2",
    userId: SEED_USER.id,
    title: "I will see things as they truly are.",
    status: "active",
    archivedAt: null,
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
  },
  {
    id: "oath-3",
    userId: SEED_USER.id,
    title: "I will master my anger before it masters me.",
    status: "completed",
    archivedAt: null,
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
  },
];

/** @type {import("react").Context<AppData|null>} */
const AppDataContext = createContext(/** @type {AppData|null} */ (null));

export function AppDataProvider({ children }) {
  // Persisted so a future migration can detect which shape old data is in.
  useLocalStorage("jbd:schemaVersion", SCHEMA_VERSION);
  const [user, setUser] = useLocalStorage("jbd:user", SEED_USER);
  const [oaths, setOaths] = useLocalStorage("jbd:oaths", SEED_OATHS);
  const [journalEntries, setJournalEntries] = useLocalStorage(
    "jbd:journalEntries",
    /** @type {JournalEntry[]} */ ([])
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
  };
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
};
