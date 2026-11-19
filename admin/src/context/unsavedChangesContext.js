import { createContext, useContext, useEffect } from "react";

export const UnsavedChangesContext = createContext(null);

export const useUnsavedChanges = () => useContext(UnsavedChangesContext);

export function useDraftGuard(dirty, busy) {
  const { setGuard, confirmExit } = useUnsavedChanges();
  useEffect(() => {
    setGuard({ dirty, busy });
    return () => setGuard({ dirty: false, busy: false });
  }, [dirty, busy, setGuard]);
  return confirmExit;
}
