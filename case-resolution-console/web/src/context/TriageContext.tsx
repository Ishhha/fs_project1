import { createContext, useContext, useState, ReactNode } from "react";
import { useSSE } from "../hooks/useSSE";

interface TriageContextType {
  events: any[];
  startTriage: (customerId: string) => void;
}

const TriageContext = createContext<TriageContextType | undefined>(undefined);

export function TriageProvider({ children }: { children: ReactNode }) {
  const [url, setUrl] = useState<string | null>(null);
  const { events } = useSSE(url || "");

  const startTriage = (customerId: string) => {
    setUrl(`http://localhost:4000/api/triage/start?customerId=${customerId}`);
  };

  return (
    <TriageContext.Provider value={{ events, startTriage }}>
      {children}
    </TriageContext.Provider>
  );
}

export function useTriage() {
  const ctx = useContext(TriageContext);
  if (!ctx) throw new Error("useTriage must be used inside TriageProvider");
  return ctx;
}
