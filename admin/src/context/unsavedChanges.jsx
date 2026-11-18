import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useBlocker } from "react-router-dom";

const UnsavedChangesContext = createContext(null);
export function UnsavedChangesProvider({ children }) {
  const [guard, setGuard] = useState({ dirty: false, busy: false });
  const confirmExit = useCallback(() => {
    if (guard.busy) {
      window.alert("Espera a que termine el guardado antes de salir.");
      return false;
    }
    return (
      !guard.dirty ||
      window.confirm("Hay cambios sin guardar. ¿Quieres descartarlos y salir?")
    );
  }, [guard]);
  const blocker = useBlocker(guard.dirty || guard.busy);
  useEffect(() => {
    if (blocker.state === "blocked") {
      if (confirmExit()) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker, confirmExit]);
  useEffect(() => {
    if (!guard.dirty && !guard.busy) return;
    function beforeUnload(event) {
      event.preventDefault();
      event.returnValue = "";
    }
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [guard]);
  return (
    <UnsavedChangesContext.Provider value={{ setGuard, confirmExit }}>
      {children}
    </UnsavedChangesContext.Provider>
  );
}
export const useUnsavedChanges = () => useContext(UnsavedChangesContext);
export function useDraftGuard(dirty, busy) {
  const { setGuard, confirmExit } = useUnsavedChanges();
  useEffect(() => {
    setGuard({ dirty, busy });
    return () => setGuard({ dirty: false, busy: false });
  }, [dirty, busy, setGuard]);
  return confirmExit;
}
