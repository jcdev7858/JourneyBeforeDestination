import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SEED_OATHS = [
  {
    id: "oath-1",
    title: "I will be more present with my family.",
    status: "active",
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
    title: "I will see things as they truly are.",
    status: "active",
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
    title: "I will master my anger before it masters me.",
    status: "completed",
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

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [user, setUser] = useLocalStorage("jbd:user", null);
  const [oaths, setOaths] = useLocalStorage("jbd:oaths", SEED_OATHS);
  const [journalEntries, setJournalEntries] = useLocalStorage("jbd:journalEntries", []);

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

  const value = { user, setUser, oaths, setOaths, journalEntries, setJournalEntries, toggleAction };
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
};
