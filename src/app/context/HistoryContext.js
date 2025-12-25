"use client";

import { createContext, useContext, useEffect, useState } from "react";

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("scan-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("scan-history", JSON.stringify(history));
  }, [history]);

  const addScan = (text) => {
    const entry = {
      id: Date.now(),
      text,
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [entry, ...prev]);
  };

  const deleteScan = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => setHistory([]);

  return (
    <HistoryContext.Provider
      value={{ history, addScan, deleteScan, clearHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistoryStore() {
  return useContext(HistoryContext);
}
