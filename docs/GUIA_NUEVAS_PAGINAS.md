# Guía para crear páginas y continuar en nuevas ramas

Esta guía se basa en la revisión del 29 de septiembre de 2026. Consultar primero [ESTADO_PROYECTO.md](ESTADO_PROYECTO.md) y [AGENTS.md](../AGENTS.md). El código del checkout tiene prioridad sobre inventarios antiguos.

## 1. Antes de implementar

1. Revisar la rama, el estado de Git y los cambios locales. No sobrescribir trabajo en curso.
2. Leer esta guía desde la rama de destino y comprobar que contiene las actualizaciones de documentación acordadas. Si aún están solo en otra rama, incorporarlas mediante el flujo Git del equipo.
3. Identificar ruta, propósito, contenido confirmado, acciones y estados de la página.
4. Buscar una página similar y los átomos, moléculas, organismos, hooks y datos disponibles.
5. Revisar props y consumidores antes de ampliar piezas compartidas. Crear una rama `codex/<descripcion>` cuando corresponda al trabajo solicitado; no cambiar de rama solo para analizar.
6. Registrar los pendientes existentes relevantes para distinguirlos de regresiones del nuevo trabajo.

No crear de golpe las páginas pendientes ni asumir que un componente parcialmente escrito es una plantilla válida.

## 2. Dónde va cada pieza

| Responsabilidad | Ubicación en frontend/src |
|---|---|
| Composición de una página | components/pages/ |
| Páginas de carreras | components/pages/careers/ |
| Secciones completas | components/organisms/<modulo>/ |
| Tarjetas y composiciones pequeñas | components/molecules/<modulo>/ |
| Bloques compartidos | components/molecules/shared/ o organisms/shared/ según responsabilidad |
| Controles básicos | components/atoms/ |
| Estructura global | components/layouts/ |
| Contenedor de página | components/templates/myTemplate.jsx |
| Catálogos estáticos | data/ y subcarpetas existentes |
| Estado e interacción reutilizable | hooks/ |
| Animaciones compartidas | components/animations/ |
| PDF global | context/pdfViewer/ |
| Llamadas HTTP y validación | helpers/ y validations/ |

Utilizar JavaScript/JSX, componentes funcionales y exportaciones nombradas según el proyecto. Mantener las excepciones existentes como App. Usar nombres lowerCamelCase para archivos nuevos y PascalCase para componentes. No replicar erratas de archivos existentes.

`@/components/atoms/image` resuelve a src/components/atoms/image; `@assets/` resuelve a src/assets. Los imports relativos existentes también son válidos.

## 3. Componer la página y conectar su ruta

MyTemplate aporta el espacio superior. MainLayout ya monta Header, Navbar, Footer y TransitionPage; no duplicarlos.

Ejemplo mínimo de composición, pendiente de añadir sus secciones y contenido real:

```jsx
import { MyTemplate } from "@/components/templates/myTemplate";
import { Title } from "@/components/atoms/titles";

function NuevaPagina({ title }) {
  return (
    <MyTemplate>
      <section className="mx-auto w-[92%] max-w-6xl py-10">
        <Title
          level="h1"
          text={title}
          variant="institutional"
          weight="bold"
          className="font-hani"
        />
      </section>
    </MyTemplate>
  );
}

export { NuevaPagina };
```

Registrar la página en App.jsx y conectar las entradas necesarias del menú en desktopMenu.jsx; MobileMenu recibe ese mismo catálogo. Mantener los slugs actuales. Para navegación interna usar NavbarLink o Link de React Router con to.

MyTemplate todavía acepta `classmame`, no className. Hasta corregirlo de manera compatible, aplicar estilos de página a un contenedor hijo.

## 4. Elegir las piezas existentes

| Necesidad | Reutilización recomendada |
|---|---|
| Títulos, párrafos y acciones | Title, Paragraph y Button; nivel y type explícitos |
| Imagen informativa o fondo | Image, con dimensiones y alt apropiados |
| Carrera completa | CareerHero, CareerLearning, CareerWorkplaces, CareerBenefits y CareerDocuments |
| PDF | usePdfViewer().openPdf(pdfUrl, title) |
| Consulta de admisión/contacto | useContactForm, CONTACT_FORM_GROUPS, FormField, ContactSteps y Toast |
| Aparición al hacer scroll | ScrollReveal o useRevealMotion |
| Lista con desplazamiento continuo | ContinuousCarousel; comprobar copia decorativa y controles |
| Carrusel de varias tarjetas | useCarousel y useCardsPerView; verificar adaptación al consumidor |
| Modal de consulta | ModalMessage y useModal; atender pendientes de accesibilidad |
| Estilos de marca | Tokens de index.css |

Reutilizar responsabilidad y contrato, no solo apariencia. Si un formulario solicita otros datos, no heredar automáticamente la validación del contacto. No crear otro visor PDF ni un nuevo proveedor por página.

### Imágenes

Usar siempre Image en las páginas o componentes nuevos o modificados. Preservar el espacio cuando falte src o falle la carga. Ejemplo informativo:

```jsx
import { Image } from "@/components/atoms/image";

<Image
  src={image}
  alt={imageDescription}
  className="aspect-video rounded-xl"
/>
```

Para fondos, usar alt vacío y fill dentro de un padre relative con altura o proporción. Ajustar imageClassName para object-contain cuando corresponda; usar overlayClassName para legibilidad. El fondo institucional predeterminado es bg-blue-dark.

Los recursos de public usan rutas desde la raíz, por ejemplo `/business_admin/ADMINISTRACION.webp`. Los assets de src pueden importarse con @assets. No poner rutas de public relativas a la URL actual.

### PDF

```jsx
import { Button } from "@/components/atoms/button";
import { usePdfViewer } from "@/context/pdfViewer/usePdfViewer";

function DocumentoButton({ pdfUrl, title }) {
  const { openPdf } = usePdfViewer();

  return (
    <Button
      type="button"
      text="Ver documento"
      disabled={!pdfUrl}
      onClick={() => openPdf(pdfUrl, title)}
      className="rounded-md bg-blue-dark px-4 py-2 text-white"
    />
  );
}

export { DocumentoButton };
```

Usar una URL real; "#" no representa un documento. Confirmar si es oficial o de referencia y reflejarlo en el contenido visible.

## 5. Preparar otra carrera sin copiar Administración

Preparar sus datos propios antes de componer los organismos:

| Bloque | Datos mínimos |
|---|---|
| Catálogo | title, href e img |
| Hero | description y highlights: [{ title, description }] |
| Aprendizaje | [{ title, description, image }] |
| Campo laboral | [{ title, image, layout }] con claves estables y únicas |
| Beneficios | [{ title, description }] e imagen adecuada |
| Documentos | [{ id, title, description, image, tone, pdfUrl }] |

Hoy solo Administración tiene hero en el catálogo. Parametrizar la etiqueta accesible de CareerLearning y el alt de CareerBenefits al usarlos para otra especialidad. No duplicar afirmaciones de duración, titulación, empleabilidad, beneficios o requisitos sin contenido confirmado.

## 6. Conectar formularios y acciones reales

La UI compartida envía name, email, phone, address, career, shift y message a POST /contact. La URL base actual es localhost:3000 y no existe implementación del backend en este checkout.

Antes de declarar terminado un envío: identificar la API real, confirmar payload y respuesta, comprobar validación del servidor y configurar la URL según entorno. Mostrar carga, éxito y fallo; conservar datos si hay error.

Asociar cada Label con un id único; inicio y modal pueden estar montados al mismo tiempo. No copiar las limitaciones actuales de FormField. Los botones deben ejecutar una acción real; los enlaces deben llevar a un destino válido.

## 7. Verificar y actualizar la referencia

- Ejecutar `pnpm --filter frontend run lint` y `pnpm --filter frontend run build` cuando se cambie código. El punto de partida tiene dos errores de lint documentados; informar si persisten o se corrigen.
- Revisar visualmente móvil, tablet y escritorio, espacio de navegación fija y desbordes.
- Probar teclado, foco visible, cierre de menús/modales y movimiento reducido.
- Probar imágenes sin src y con URL inválida; mantener fondo, tamaño y lectura.
- Si hay PDF, comprobar apertura, carga/error, cierre, zoom, navegación y descarga.
- Si hay formulario, comprobar validación, envío y reintento contra la API real.
- Revisar recursos locales y URL directas de rutas; el build no valida todo lo anterior.
- Actualizar ESTADO_PROYECTO.md con lo incorporado, contratos nuevos, archivos de referencia, comprobaciones y pendientes. No convertir propuestas en funcionalidades implementadas.
- Revisar el diff y conservar las ediciones ajenas. Una tarea solo documental no necesita volver a compilar la aplicación.

Ficha breve para cada revisión futura:

```text
Fecha y commit base:
Página o capacidad incorporada:
Ruta y archivos principales:
Datos y componentes reutilizables:
Contratos modificados y consumidores:
Verificaciones realizadas:
Pendientes o contenido por confirmar:
Cambios locales todavía sin integrar:
```


## 8. Curvas compartidas y hero de Computación

Para separadores curvos, reutilizar BannerBgCurve de components/molecules/shared/curbePath.jsx. Conserva design (1–5), color, height, position y className. El diseño 6 añade la curva con banda del hero de Computación: pasar color="var(--color-neutral-white)", accentColor="var(--color-orange)" y height="h-16 sm:h-22". accentColor es opcional y solo tiene efecto en diseños con banda. El padre debe estar posicionado; el componente es decorativo y no captura eventos. className permite ajustar la posición (por ejemplo, -bottom-px) mediante twMerge.

ComputerScienceHero recibe title y content desde su página. Los textos, recursos y enlace están en data/computerScienceHero.js; las moléculas Heading, Visual e Intro en components/molecules/careers/ separan responsabilidades. Mantener el título en el catálogo careers y las imágenes en public/computation-informatic. Esta composición conserva el diseño específico de Computación; no sustituye CareerHero de Administración.

El hero de Computación usa exclusivamente utilidades Tailwind para sus estilos locales; computerScienceHero.css fue eliminado. La máscara y transparencia de la figura se activan con has-[img.opacity-100], conservando el respaldo de Image durante carga/error. El contenedor dentro de MyTemplate ajusta el espacio superior por breakpoint sin sobrescribir los estilos de la plantilla.

## 9. Reutilización entre carreras — actualización del 2 de octubre de 2026

CareerLearning acepta label accesible propio, description, eyebrow y digital opcional. LearningCard acepta Icon para su variante digital; se reutilizan ContinuousCarousel, su arrastre y el estado de expansión de las tarjetas. CareerWorkplaces admite digital para representar ámbitos con descripciones e iconos conservando Ver más/Ver menos. CareerBenefits permite title, description, imageAlt y eyebrow sin cambiar los defaults de Administración.

AcademicDocumentCard solo abre el visor si pdfUrl tiene un valor distinto de #; de lo contrario muestra document.status o un mensaje de publicación pendiente. Los documentos de referencia se identifican mediante isReference. No conectar PDF de otra carrera como si fueran oficiales.

MyTemplate admite className y conserva classmame por compatibilidad. Las clases se combinan con twMerge. Para composiciones sticky, Computación usa className="overflow-x-clip"; el valor predeterminado de otras páginas continúa siendo overflow-x-hidden. ComputerScienceJourney muestra una composición narrativa propia; sus datos se mantienen fuera del organismo y sus animaciones respetan movimiento reducido.

## 10. Animación vinculada al scroll

ScrollMotion acepta as, children, className, delay, x, y, scale y duration. ScrollReveal delega en este componente. Por defecto conserva la entrada mediante useRevealMotion. Para una página que deba avanzar y retroceder con el scroll, envolverla en ScrollAnimationContext.Provider value="linked": cada elemento calcula su progreso entre start end y end start. En ese modo delay escalona el punto de entrada, no un temporizador; duration solo corresponde al modo de entrada. Se normalizan amplitud y escala para mantener visible el efecto, y el foco fuerza la presentación completa. useMotionPreference desactiva el movimiento y escucha cambios del sistema.

BenefitCard, WorkplaceTile y AcademicDocumentCard reutilizan ScrollMotion conservando sus etiquetas semánticas. No activar el proveedor globalmente: cada página debe elegir el modo. ComputerScienceJourney usa su propio progreso para la escena por etapas; usePinnedScene combina tamaño mínimo y preferencia de movimiento. Conservar su alternativa en flujo para móvil y accesibilidad, el espacio de la navegación y overflow-x-clip de la plantilla para permitir sticky.
LearningCard admite imageAlt (vacío por defecto) junto a image. Para imágenes conceptuales informativas, definir ambos en el catálogo; reutilizar Image para carga y errores. En digital, las imágenes ocupan toda la tarjeta y el zoom acompaña a la expansión existente; no requiere otra librería ni cambia ContinuousCarousel. Mantener el alt descriptivo, el respaldo azul y la preferencia de movimiento reducido.
## 11. Escenas de scroll y paneles

CareerLearning ofrece cinematic opcional, separado de digital. Anima la salida de toda la sección mediante opacidad, escala y desplazamiento al dejar la pantalla. El carrusel mantiene autoplay y arrastre libre: no vincular su posición horizontal al scroll. Se retiraron scrollProgress y useCarouselScroll. No se mantiene fija la sección de aprendizaje ni se agrega espacio de scroll artificial. El foco visible de teclado y el movimiento reducido presentan el contenido completo.

ScrollPanel envuelve secciones en flujo para animar su apertura y escala. No envolver escenas sticky con este componente, pues sus transformaciones y recortes cambiarían el contexto de posicionamiento. tone solo define el fondo del marco. El foco visible de teclado presenta el panel completo; el clic de ratón no cambia el layout.

Las etapas de ComputerScienceJourney reciben image/imageAlt desde los datos y reutilizan Image. usePinnedScene exige espacio vertical suficiente y ausencia de movimiento reducido; mantener el contenido en flujo cuando no se activa. Usar svh para evitar saltos por las barras del navegador móvil y conservar los offsets de navegación de 64px/96px.
ComputingJourneyStep desplaza como una sola unidad el encabezado visible, imagen y texto de cada etapa; evita animarlos como tarjetas independientes cuando se busca una transición entre secciones. El h2 accesible de la escena se conserva y el encabezado visual repetido se excluye del árbol accesible. La entrada de ComputerScienceJourney acompaña la salida de CareerLearning.
Para documentos ficticios autorizados, conservar isReference y una identificación visible dentro del PDF. Computación usa computacion-referencia.pdf, con plan de ejemplo en la página 1 y malla en la 2; ambas tarjetas abren el documento completo en el visor global. Sustituir las rutas por los archivos oficiales y retirar isReference solo cuando el contenido esté confirmado.
## 12. Modularización de Computación — 2 de octubre de 2026

ComputerSciencePage obtiene los textos de computerScienceContent, en data/computerScienceSections.js. ComputerScienceHero delega fondo y parallax en ComputerScienceHeroBackground. ComputerScienceJourney coordina useJourneyMotion y compone ComputingJourneyBackground, Heading, Step y Card. Step usa useJourneyStepMotion para interpolar el capítulo; Card presenta la alternativa en flujo. El encabezado repetido es decorativo y el título semántico permanece accesible. Se retiraron la indicación de desplazamiento y su barra.

CareerLearning delega la salida en useSectionExit. useKeyboardFocusWithin centraliza el foco visible de teclado en este hook, ScrollMotion y ScrollPanel. useMediaQuery centraliza las suscripciones y su limpieza; useMotionPreference y usePinnedScene lo reutilizan sin cambiar los umbrales.

AcademicDocumentCard recibe document y delay; la URL procede exclusivamente de document.pdfUrl. CareerDocuments no duplica pdfUrl ni transmite un id ignorado. LearningCard ya no acepta code: las ilustraciones sustituyeron esa decoración y Image mantiene el respaldo institucional. ScrollReveal permanece como fachada con consumidores activos.
