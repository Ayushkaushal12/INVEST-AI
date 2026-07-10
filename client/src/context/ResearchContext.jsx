import { createContext } from "react";
import { useResearch } from "../hooks/useResearch";

const ResearchContext = createContext(null);

export function ResearchProvider({ children }) {
  const value = useResearch();
  return (
    <ResearchContext.Provider value={value}>
      {children}
    </ResearchContext.Provider>
  );
}
