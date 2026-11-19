import { useEffect, useState } from "react";
import { nextLifecycleBoundary } from "@/helpers/eventLifecycle";
import { getPublishedEvents } from "@/helpers/getPublishedEvents";

const MAX_BOUNDARY_WAIT_MS = 60 * 60_000;

export function usePublishedEvents() {
  const [snapshot, setSnapshot] = useState({
    events: null,
    offset: 0,
    signature: "",
  });
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
          const nextEvents = [...published.values()];
          const nextOffset = Number.isFinite(offset) ? offset : 0;
          const signature = JSON.stringify(nextEvents);
          setSnapshot((prev) => {
            if (
              prev.events !== null &&
              prev.signature === signature &&
              Math.abs(prev.offset - nextOffset) < 1000
            ) {
              return prev;
            }
            return {
              events: prev.signature === signature && prev.events ? prev.events : nextEvents,
              offset: nextOffset,
              signature,
            };
          });
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
      } else {
        setNow(Date.now());
        load();
      }
    }
    load();
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("focus", load);
    window.addEventListener("online", load);
    return () => {
      stopped = true;
      controller?.abort();
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("focus", load);
      window.removeEventListener("online", load);
    };
  }, [attempt]);

  useEffect(() => {
    const boundary = nextLifecycleBoundary(
      snapshot.events,
      now + snapshot.offset,
    );
    if (boundary === null) return;
    const delay = Math.min(
      Math.max(50, boundary - (Date.now() + snapshot.offset) + 50),
      MAX_BOUNDARY_WAIT_MS,
    );
    const id = setTimeout(() => setNow(Date.now()), delay);
    return () => clearTimeout(id);
  }, [snapshot.events, snapshot.offset, now]);

  return {
    events: snapshot.events,
    now: now + snapshot.offset,
    clockOffset: snapshot.offset,
    failed,
    retry: () => setAttempt((value) => value + 1),
  };
}
