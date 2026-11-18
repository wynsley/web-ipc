export function startImageCleanup(maintenance) {
  let stopped = false;
  let timer;
  let running = Promise.resolve();
  function run() {
    running = maintenance
      .cleanup()
      .then((result) => {
        if (result.removed || result.failures)
          console.log(JSON.stringify({ event: "image.cleanup", ...result }));
      })
      .catch(() => console.error(JSON.stringify({ event: "image.cleanup_failed" })))
      .finally(() => {
        if (!stopped) timer = setTimeout(run, 3600000).unref();
      });
  }
  timer = setTimeout(run, 1000).unref();
  return async () => {
    stopped = true;
    clearTimeout(timer);
    await running;
  };
}
