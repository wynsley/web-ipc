import { toDayKey } from "../../../utils/calendarDates";
export const EVENTS = [
  {
    id: "charla-vocacional-2026",
    category: "Charla",
    title: "Charla de Orientación Vocacional",
    shortDescription:
      "Sesión abierta para que jóvenes y familias conozcan opciones de carrera, rutas de formación y salidas laborales.",
    longDescription:
      "Una sesión abierta donde estudiantes de los últimos años y sus familias conocieron las opciones de carrera, las rutas de formación y las salidas laborales de cada área. Egresados compartieron su experiencia y hubo un espacio de preguntas con orientadores.",
    highlights: [
      "Orientación personalizada",
      "Rutas de formación",
      "Testimonios de egresados",
      "Preguntas y respuestas",
    ],
    date: "2026-04-09T16:00:00-05:00",
    endDate: "2026-04-09T18:00:00-05:00",
    location: "Lima, Perú",
    image: "https://images.pexels.com/photos/18999484/pexels-photo-18999484.jpeg",
    featured: false,
  },
  {
    id: "simposio-investigacion-2026",
    category: "Simposio",
    title: "Simposio de Investigación",
    shortDescription:
      "Un día para presentar proyectos de investigación, recibir comentarios de especialistas y generar colaboraciones.",
    longDescription:
      "Una jornada dedicada a la investigación donde estudiantes y docentes presentaron sus proyectos ante un comité de especialistas. Hubo exposiciones orales, sesión de pósters y mesas de trabajo para conectar equipos con intereses comunes.",
    highlights: [
      "Exposiciones orales",
      "Sesión de pósters",
      "Comité de especialistas",
      "Mesas de colaboración",
    ],
    date: "2026-05-14T09:00:00-05:00",
    endDate: "2026-05-14T18:00:00-05:00",
    location: "Cusco, Perú",
    image: "https://images.pexels.com/photos/28683722/pexels-photo-28683722.jpeg",
    featured: false,
  },
  {
    id: "hackathon-2026",
    category: "Hackathon",
    title: "Hackathon de Innovación",
    shortDescription:
      "Dos días de trabajo en equipo para convertir ideas en prototipos funcionales, con mentores y premios.",
    longDescription:
      "Equipos multidisciplinares trabajaron durante dos días para resolver retos reales planteados por instituciones aliadas. Contaron con mentores de la industria, sesiones de feedback y una presentación final ante un jurado que premió las mejores propuestas.",
    highlights: [
      "Retos reales",
      "Mentores de la industria",
      "Presentación ante jurado",
      "Premios para los ganadores",
    ],
    date: "2026-06-27T09:00:00-05:00",
    endDate: "2026-06-28T18:00:00-05:00",
    location: "Arequipa, Perú",
    image: "https://images.pexels.com/photos/8761323/pexels-photo-8761323.jpeg",
    featured: true,
  },
  {
    id: "seminario-gestion-2026",
    category: "Seminario",
    title: "Seminario de Gestión Educativa",
    shortDescription:
      "Directivos y coordinadores compartieron estrategias de planificación, evaluación y mejora continua.",
    longDescription:
      "Un seminario para directivos y coordinadores académicos centrado en planificación estratégica, evaluación institucional y mejora continua. Se analizaron casos de instituciones que lograron resultados sostenidos y se trabajaron planes de acción por equipos.",
    highlights: [
      "Casos de éxito",
      "Planes de acción",
      "Indicadores de calidad",
      "Constancia de participación",
    ],
    date: "2026-07-15T09:00:00-05:00",
    endDate: "2026-07-15T13:00:00-05:00",
    location: "Lima, Perú",
    image: "https://images.pexels.com/photos/34774347/pexels-photo-34774347.jpeg",
    featured: true,
  },
  {
    id: "encuentro-empresarial-2026",
    category: "Encuentro",
    title: "Encuentro Empresarial",
    shortDescription:
      "Rueda de contactos entre empresas e instituciones para generar alianzas y oportunidades de prácticas profesionales.",
    longDescription:
      "Un espacio de vinculación entre empresas, instituciones y estudiantes. Se realizaron ruedas de contactos programadas, presentaciones de oportunidades de prácticas profesionales y se firmaron los primeros convenios de colaboración.",
    highlights: [
      "Rueda de contactos",
      "Oportunidades de prácticas",
      "Convenios de colaboración",
      "Networking",
    ],
    date: "2026-08-20T15:00:00-05:00",
    endDate: "2026-08-20T19:00:00-05:00",
    location: "Piura, Perú",
    image: "https://images.pexels.com/photos/3321802/pexels-photo-3321802.jpeg",
    featured: true,
  },
  {
    id: "feria-emprendimiento-2026",
    category: "Feria",
    title: "Feria de Emprendimiento",
    shortDescription:
      "Presenta tu idea, conoce a otros emprendedores y recibe mentoría para llevar tu proyecto al siguiente nivel.",
    longDescription:
      "Más de treinta emprendimientos presentaron sus productos y servicios al público. Hubo mentorías express con empresarios, charlas sobre financiamiento y un espacio de pitch donde los participantes expusieron sus ideas ante posibles aliados.",
    highlights: [
      "Stands de emprendedores",
      "Mentorías express",
      "Pitch de proyectos",
      "Charlas de financiamiento",
    ],
    date: "2026-09-12T10:00:00-05:00",
    endDate: "2026-09-12T18:00:00-05:00",
    location: "Trujillo, Perú",
    image: "https://images.pexels.com/photos/15543214/pexels-photo-15543214.jpeg",
    featured: true,
  },

  /* ---------------- Próximos ---------------- */
  {
    id: "jornada-docente-2026",
    category: "Jornada",
    title: "Jornada Docente",
    shortDescription:
      "Espacio de actualización para docentes con metodologías activas, recursos digitales y experiencias de aula.",
    longDescription:
      "Una jornada de actualización pensada para docentes de todos los niveles. Conocerás metodologías activas que puedes aplicar desde la próxima clase, herramientas digitales para evaluar y retroalimentar, y experiencias reales compartidas por colegas. Todos los participantes recibirán un kit de recursos y constancia de asistencia.",
    highlights: [
      "Metodologías activas",
      "Recursos digitales",
      "Experiencias de aula",
      "Constancia de asistencia",
    ],
    date: "2026-10-22T08:30:00-05:00",
    endDate: "2026-10-22T17:30:00-05:00",
    location: "Lima, Perú",
    image: "https://images.pexels.com/photos/18999484/pexels-photo-18999484.jpeg",
    featured: false,
  },
  {
    id: "congreso-2026",
    category: "Congreso",
    title: "Congreso de Innovación",
    shortDescription:
      "Tres días de talleres prácticos, ponencias magistrales y networking con especialistas en innovación educativa y tecnológica.",
    longDescription:
      "Durante tres días reuniremos a especialistas, docentes y profesionales para compartir las últimas tendencias en innovación educativa y tecnológica. Habrá talleres prácticos en grupos reducidos, ponencias magistrales y espacios de networking pensados para que te lleves ideas aplicables desde el primer día. Al finalizar recibirás un certificado de asistencia y acceso al material de cada sesión.",
    highlights: [
      "Talleres prácticos",
      "Speakers nacionales",
      "Networking",
      "Certificado de asistencia",
    ],
    date: "2026-11-10T09:00:00-05:00",
    endDate: "2026-11-12T18:00:00-05:00",
    location: "Lima, Perú",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&h=1500&q=80",
    featured: false,
  },
  {
    id: "taller-2026",
    category: "Taller",
    title: "Taller de Liderazgo",
    shortDescription:
      "Jornada intensiva con casos reales para aprender a comunicar, decidir bajo presión y motivar equipos.",
    longDescription:
      "Una jornada intensiva donde trabajarás con casos reales de gestión y liderazgo de equipos. A través de dinámicas guiadas aprenderás a comunicar con claridad, tomar decisiones bajo presión y motivar a las personas a tu cargo. El cupo es limitado para garantizar atención personalizada, e incluye material de trabajo y certificado.",
    highlights: [
      "Casos reales",
      "Grupos reducidos",
      "Material incluido",
      "Certificado",
    ],
    date: "2026-12-05T10:00:00-05:00",
    endDate: "2026-12-05T17:00:00-05:00",
    location: "Arequipa, Perú",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&h=1500&q=80",
    featured: false,
  },
  {
    id: "foro-2027",
    category: "Foro",
    title: "Foro de Tecnología",
    shortDescription:
      "Conversatorio con referentes de la industria sobre inteligencia artificial, automatización y el futuro del trabajo.",
    longDescription:
      "Un espacio de diálogo abierto con referentes de la industria para analizar cómo la inteligencia artificial, la automatización y la transformación digital están cambiando el mercado laboral. Habrá paneles de expertos, preguntas en vivo del público y un cierre con networking. Todos los asistentes recibirán la memoria del evento con las conclusiones principales.",
    highlights: [
      "Panel de expertos",
      "Preguntas en vivo",
      "Networking",
      "Memoria del evento",
    ],
    date: "2027-03-18T18:00:00-05:00",
    endDate: "2027-03-18T21:00:00-05:00",
    location: "Cusco, Perú",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&h=1500&q=80",
    featured: false,
  },
];

/* ---------------- Formato de fechas ---------------- */

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

/**
 * "10 de noviembre de 2026 · 9:00 a. m. – 6:00 p. m."  (mismo día)
 * "Del 10 al 12 de noviembre de 2026"                   (varios días)
 */
export function formatEventSchedule(event) {
  const start = event.date;
  const end = event.endDate;

  if (!end) return `${formatEventDate(start)} · ${formatEventTime(start)}`;

  if (toDayKey(start) === toDayKey(end)) {
    return `${formatEventDate(start)} · ${formatEventTime(start)} – ${formatEventTime(end)}`;
  }

  const sameMonth =
    formatEventMonth(start) === formatEventMonth(end) &&
    formatEventYear(start) === formatEventYear(end);

  return sameMonth
    ? `Del ${formatEventDay(start)} al ${formatEventDate(end)}`
    : `Del ${formatEventDate(start)} al ${formatEventDate(end)}`;
}

/* ---------------- Consultas ---------------- */

const byDateAsc = (a, b) => new Date(a.date) - new Date(b.date);
const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

/** Un evento ya pasó cuando terminó (si dura varios días, sigue "vigente" hasta el último). */
export const isPastEvent = (event, now = Date.now()) =>
  new Date(event.endDate ?? event.date).getTime() < now;

/** Eventos que aún no terminaron, del más cercano al más lejano. */
export const getUpcomingEvents = (events = EVENTS, now = Date.now()) =>
  events.filter((e) => !isPastEvent(e, now)).sort(byDateAsc);

/** Eventos que ya terminaron, del más reciente al más antiguo. */
export const getPastEvents = (events = EVENTS, now = Date.now()) =>
  events.filter((e) => isPastEvent(e, now)).sort(byDateDesc);

/** Eventos marcados como destacados (featured: true), los más recientes primero. */
export const getFeaturedEvents = (events = EVENTS) =>
  events.filter((e) => e.featured).sort(byDateDesc);

/** Evento futuro más cercano. Si ya pasaron todos, devuelve el último. */
export function getUpcomingEvent(events = EVENTS) {
  return getUpcomingEvents(events)[0] ?? getPastEvents(events)[0];
}