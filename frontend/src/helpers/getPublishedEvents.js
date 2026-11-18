export async function getPublishedEvents(page, signal) {
  const response = await fetch("/api/v1/events?page=" + page, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(15000)]),
    credentials: "omit",
  });
  if (!response.ok) throw new Error("No se pudo cargar la agenda.");
  const { data } = await response.json();
  return data;
}
