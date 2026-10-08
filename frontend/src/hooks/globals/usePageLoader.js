import { useEffect, useState } from "react";

const TICK_MS = 50;
const WAIT_CEILING = 92; 
const SEEN_KEY = "ipc-loader-seen";

const isCritical = (img) =>
  img.loading !== "lazy" && !img.closest("[data-loader-ignore]");

// ¿Es la primera vez que entra en esta sesión? (la recarga conserva sessionStorage)
const isFirstVisit = () => {
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return true;
  }
};

/**
 * Progreso 0 → 100.
 *  - Primera entrada: el avatar corre `firstDuration` ms (~3 s en total con el desvanecido).
 *  - Recarga: corre `reloadDuration` ms y se corta a los `reloadMaxTime` ms (< 2 s en total).
 * Si la carga real va más lenta, la barra espera al 92 % hasta que termine.
 */
export function usePageLoader({
  firstDuration = 2500,
  firstMaxTime = 6000,
  reloadDuration = 1000,
  reloadMaxTime = 1800,
  exitDelay = 200,
} = {}) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [first] = useState(isFirstVisit);

  const duration = first ? firstDuration : reloadDuration;
  const maxTime = first ? firstMaxTime : reloadMaxTime;

  useEffect(() => {
    const start = performance.now();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let fontsReady = !document.fonts;
    document.fonts?.ready.then(() => {
      fontsReady = true;
    });

    let shown = 0;
    let finishing = false;
    let exitTimer;

    const finish = () => {
      finishing = true;
      clearInterval(pulse);
      setProgress(100);
      document.body.style.overflow = previousOverflow;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* sin storage: no pasa nada */
      }
      exitTimer = setTimeout(() => setVisible(false), exitDelay);
    };

    const tick = () => {
      if (finishing) return;
      const elapsed = performance.now() - start;

      const images = Array.from(document.images).filter(isCritical);
      const allLoaded = images.every((img) => img.complete);
      const ready =
        document.readyState === "complete" && fontsReady && allLoaded;

      const timePct = Math.min(100, (elapsed / duration) * 100);
      const ceiling = ready ? 100 : WAIT_CEILING;

      shown = Math.max(shown, Math.min(timePct, ceiling));
      setProgress(shown);

      if (shown >= 100 || elapsed >= maxTime) finish();
    };

    const pulse = setInterval(tick, TICK_MS);
    tick();

    return () => {
      clearInterval(pulse);
      clearTimeout(exitTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [duration, maxTime, exitDelay]);

  return { progress, visible };
}