const HOUR_MS = 3_600_000;

export function startInquiryAutoArchive(maintenance) {
  let stopped = false;
  let timer;
  let running = Promise.resolve();

  function run() {
    running = maintenance
      .archiveResolved()
      .then((result) => {
        if (result.archived) {
          console.log(JSON.stringify({ event: "inquiry.auto_archive", ...result }));
        }
      })
      .catch(() => console.error(JSON.stringify({ event: "inquiry.auto_archive_failed" })))
      .finally(() => {
        if (!stopped) timer = setTimeout(run, HOUR_MS).unref();
      });
  }

  timer = setTimeout(run, 2000).unref();
  return async () => {
    stopped = true;
    clearTimeout(timer);
    await running;
  };
}
