import { useEffect, useState } from "react";
import {
  acceptSession,
  logoutSession,
  observeSession,
  restoreSession,
} from "../services/session";
import {
  isRecoveryPending,
  WAITING_NOTICE,
  RECOVERY_KEY,
  UNCONFIRMED_RECOVERY_NOTICE,
} from "../services/session/recoveryPending";

export function useAdminSession() {
  const [restoring, setRestoring] = useState(true);
  const [session, setSession] = useState(null);
  const [notice, setNotice] = useState("");
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const stop = observeSession(
      ({ session: nextSession, notice: nextNotice }) => {
        setSession(nextSession);
        setNotice(nextNotice);
      },
    );
    const syncPending = (event) => {
      if (event.key !== RECOVERY_KEY) return;
      setWaiting(isRecoveryPending());
      setNotice(isRecoveryPending() ? WAITING_NOTICE : "");
    };
    window.addEventListener("storage", syncPending);
    restoreSession()
      .then((restored) => {
        if (restored) setSession(restored);
      })
      .catch((error) => {
        setWaiting(isRecoveryPending());
        if (error?.message) setNotice(error.message);
      })
      .finally(() => setRestoring(false));
    return () => {
      stop();
      window.removeEventListener("storage", syncPending);
    };
  }, []);

  function onAuthenticated(nextSession) {
    setNotice("");
    acceptSession(nextSession);
  }
  async function cancelPending() {
    try {
      await logoutSession(UNCONFIRMED_RECOVERY_NOTICE);
      setWaiting(false);
    } catch (error) {
      setNotice(error.message);
    }
  }
  return {
    session,
    restoring,
    waiting,
    notice,
    onAuthenticated,
    cancelPending,
  };
}
