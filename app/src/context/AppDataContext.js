// @ts-check
import { createContext, useContext } from "react";
/** @import { AppData } from "../types.js" */

/**
 * The AppData context and its consumer hook. Kept separate from
 * AppDataProvider.jsx so that file can export only its component
 * (Vite Fast Refresh requires component-only exports in .jsx files).
 */

/** @type {import("react").Context<AppData|null>} */
export const AppDataContext = createContext(/** @type {AppData|null} */ (null));

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
};
