import { formatEventDate } from "@/data/events/evenst"

/** Convierte un evento al formato común de las galerías. */
export const eventToItem = (event) => ({
  id: event.id,
  image: event.image,
  alt: event.title,
  title: event.title,
  category: event.category,
  date: formatEventDate(event.date),
  meta: event.location,
  description: event.longDescription,
})