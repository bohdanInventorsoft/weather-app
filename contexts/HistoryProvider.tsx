import React, { createContext, useContext, useState } from 'react';
import { useMount, useUpdate, useUpdateEffect } from 'react-use'

export type HistoryEntry = {
  id: string;
  timestamp: number;
  city: string;
  country: string;
};

export const HistoryContext = createContext<{
  history: Array<HistoryEntry>;
  removedHistory: HistoryEntry[];
  add: (key: string, value: HistoryEntry) => void;
  remove: (key: string) => void;
  undoRemove: (id: string) => void;
  finaleRemove: (id:string) => void
}>({
  history: [],
  removedHistory: [],
  add: () => {},
  remove: () => {},
  undoRemove: () => {},
  finaleRemove: () => {}
});

export function useHistory() {
  return useContext(HistoryContext);
}
export function HistoryProviderWrapper({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [removedHistory, setRemovedHistory] = useState<HistoryEntry[]>([]);

  useMount(() => {
    const fromStorage = localStorage.getItem('history')
    setHistory(fromStorage ? JSON.parse(fromStorage): [])
  })

  const updateStorage = (data:HistoryEntry[]) => {
    localStorage.setItem('history', JSON.stringify(data))
  }

  useUpdateEffect(() => {
    updateStorage(history)
  }, [history])
  const add = (key: string, value: HistoryEntry) => {
    const itemExistsInHistory = history.some((entry) => entry.id === key);
    const itemExistsInRemove = removedHistory.some((entry) => entry.id === key);

    if (!itemExistsInHistory && !itemExistsInRemove) {
      setHistory([...history, value]);
    }
  };

  const remove = (key: string) => {
    const removedValue = history.find((entry) => entry.id === key);
    if (removedValue) {
      const newRes = history.filter((entry) => entry.id !== key)
      setHistory(newRes);
      setRemovedHistory([...removedHistory, removedValue]);
    }
  };
  const undoRemove = (id: string) => {
    const restoredValue = removedHistory.find((entry) => entry.id === id);
    if (restoredValue) {
      const result = [...history, restoredValue]
      setHistory(result);
      setRemovedHistory(removedHistory.filter((entry) => entry.id !== id));
    }
  };

  const finaleRemove = (id:string) => {
    const removed = removedHistory.find((entry) => entry.id === id);
    if(removed) {
      setRemovedHistory(removedHistory.filter((entry) => entry.id !== id))
    }
  }

  return (
    <HistoryContext.Provider value={{ history, removedHistory, add, remove, undoRemove, finaleRemove }}>
      {children}
    </HistoryContext.Provider>
  );
}