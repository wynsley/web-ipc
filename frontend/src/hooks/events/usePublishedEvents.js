import { useEffect, useState } from "react";
import { getPublishedEvents } from "@/helpers/getPublishedEvents";

export function usePublishedEvents() {
  const [snapshot, setSnapshot] = useState({ events: null, offset: 0 });
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    let stopped = false;
    let controller;
    let timer;
    let failures = 0;
    async function load() {
      clearTimeout(timer);
      if (stopped || document.hidden || navigator.onLine === false) return;
      controller?.abort();
      const current = new AbortController();
      controller = current;
      try {
        const published = new Map();
        let page = 1;
        let hasMore;
        let offset = 0;
        do {
          const result = await getPublishedEvents(page++, current.signal);
          if (page === 2 && result.serverTime)
            offset = Date.parse(result.serverTime) - Date.now();
          for (const row of result.events)
            published.set(row.id, {
              ...row,
              date: row.startsAt,
              endDate: row.endsAt,
              image: row.imageUrl,
              category: "Evento",
              shortDescription: row.description,
              longDescription: row.description,
            });
          hasMore = result.hasMore;
        } while (hasMore);
        if (!stopped && !current.signal.aborted) {
          setSnapshot({
            events: [...published.values()],
            offset: Number.isFinite(offset) ? offset : 0,
          });
          setNow(Date.now());
          setFailed(false);
          failures = 0;
        }
      } catch {
        if (!current.signal.aborted && !stopped) {
          setFailed(true);
          failures++;
        }
      } finally {
        if (!stopped && controller === current && !document.hidden)
          timer = setTimeout(load, Math.min(15000 * 2 ** failures, 120000));
      }
    }
    function visibility() {
      if (document.hidden) {
        clearTimeout(timer);
        controller?.abort();
      } else load();
    }
    const tick = setInterval(() => {
      if (!document.hidden) setNow(Date.now());
    }, 1000);
    load();
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("focus", load);
    window.addEventListener("online", load);
    return () => {
      stopped = true;
      controller?.abort();
      clearTimeout(timer);
      clearInterval(tick);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("focus", load);
      window.removeEventListener("online", load);
    };
  }, [attempt]);
  return {
    events: snapshot.events,
    now: now + snapshot.offset,
    failed,
    retry: () => setAttempt((value) => value + 1),
  };
}
