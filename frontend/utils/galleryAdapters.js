import { formatEventSchedule } from "@/data/events/evenst";

/** Convierte un evento al formato común de las galerías. */
export const eventToItem = (event) => ({
  id: event.id,
  image: event.image,
  imageCrop: event.imageCrop,
  alt: event.title,
  title: event.title,
  category: event.category,
  date: formatEventSchedule({
    date: event.startsAt ?? event.date,
    endDate: event.endsAt ?? event.endDate,
  }),
  meta: event.location,
  description: event.longDescription,
});
