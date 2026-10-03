export const EVENTS = [
  {
    id: "congreso-2026",
    category: "Congreso",
    highlight: "Innovación",
    longDescription:
      "Durante tres días reuniremos a especialistas, docentes y profesionales para compartir las últimas tendencias en innovación educativa y tecnológica. Habrá talleres prácticos en grupos reducidos, ponencias magistrales y espacios de networking pensados para que te lleves ideas aplicables desde el primer día. Al finalizar recibirás un certificado de asistencia y acceso al material de cada sesión.",
    highlights: [
      "Talleres prácticos",
      "Speakers nacionales",
      "Networking",
      "Certificado de asistencia",
    ],
    date: "2026-11-10T09:00:00-05:00",
    location: "Lima, Perú",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&h=1500&q=80",
  },
  {
    id: "taller-2026",
    category: "Taller",
    highlight: "Liderazgo",
    longDescription:
      "Una jornada intensiva donde trabajarás con casos reales de gestión y liderazgo de equipos. A través de dinámicas guiadas aprenderás a comunicar con claridad, tomar decisiones bajo presión y motivar a las personas a tu cargo. El cupo es limitado para garantizar atención personalizada, e incluye material de trabajo y certificado.",
    highlights: [
      "Casos reales",
      "Grupos reducidos",
      "Material incluido",
      "Certificado",
    ],
    date: "2026-12-05T10:00:00-05:00",
    location: "Arequipa, Perú",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&h=1500&q=80",
  },
  {
    id: "foro-2027",
    category: "Foro",
    highlight: "Tecnología",
    longDescription:
      "Un espacio de diálogo abierto con referentes de la industria para analizar cómo la inteligencia artificial, la automatización y la transformación digital están cambiando el mercado laboral. Habrá paneles de expertos, preguntas en vivo del público y un cierre con networking. Todos los asistentes recibirán la memoria del evento con las conclusiones principales.",
    highlights: [
      "Panel de expertos",
      "Preguntas en vivo",
      "Networking",
      "Memoria del evento",
    ],
    date: "2027-03-18T18:00:00-05:00",
    location: "Cusco, Perú",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&h=1500&q=80",
  },
];

const TZ = "America/Lima";

const dateFmt = new Intl.DateTimeFormat("es-PE", {
  day: "numeric", month: "long", year: "numeric", timeZone: TZ,
});
const timeFmt = new Intl.DateTimeFormat("es-PE", {
  hour: "numeric", minute: "2-digit", timeZone: TZ,
});
const dayFmt = new Intl.DateTimeFormat("es-PE", { day: "numeric", timeZone: TZ });
const monthFmt = new Intl.DateTimeFormat("es-PE", { month: "long", timeZone: TZ });
const yearFmt = new Intl.DateTimeFormat("es-PE", { year: "numeric", timeZone: TZ });

export const formatEventDate = (date) => dateFmt.format(new Date(date));
export const formatEventTime = (date) => timeFmt.format(new Date(date));
export const formatEventDay = (date) => dayFmt.format(new Date(date));
export const formatEventMonth = (date) => monthFmt.format(new Date(date));
export const formatEventYear = (date) => yearFmt.format(new Date(date));

/** Evento futuro más cercano. Si ya pasaron todos, devuelve el último. */
export function getUpcomingEvent(events = EVENTS) {
  const now = Date.now();
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  return (
    sorted.find((e) => new Date(e.date).getTime() >= now) ??
    sorted[sorted.length - 1]
  );
}