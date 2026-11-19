import { useEffect, useRef } from "react";

export function useAutoRefresh(
  onRefresh,
  { intervalMs = 30_000, minResumeGapMs = 10_000, paused = false } = {},
) {
  const callbackRef = useRef(onRefresh);
  const lastRunRef = useRef(0);

  useEffect(() => {
    callbackRef.current = onRefresh;
  }, [onRefresh]);

  useEffect(() => {
    if (paused) return;
    lastRunRef.current = Date.now();

    function trigger() {
      if (document.visibilityState !== "visible") return;
      lastRunRef.current = Date.now();
      callbackRef.current();
    }

    function handleResume() {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastRunRef.current < minResumeGapMs) return;
      trigger();
    }

    const timer = setInterval(trigger, intervalMs);
    document.addEventListener("visibilitychange", handleResume);
    window.addEventListener("online", handleResume);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleResume);
      window.removeEventListener("online", handleResume);
    };
  }, [intervalMs, minResumeGapMs, paused]);
}
