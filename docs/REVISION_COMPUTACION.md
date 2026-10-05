# Revisión de Computación e Informática
Fecha: 2 de octubre de 2026. Alcance: /career/computer-science y sus dependencias compartidas.

## Resultado del análisis

La página reutilizaba correctamente el carrusel y el visor PDF de Administración. La deuda principal estaba en componentes que mezclaban composición, contenido y cálculos de animación, además de comportamientos de accesibilidad repetidos. La limpieza conserva el diseño aprobado, las animaciones reversibles y el carrusel automático.

## Cambios realizados

- Eliminados «Desplázate para recorrer el proceso», su barra de progreso y el espacio que reservaban.
- Extraídos los cálculos de la escena y sus capítulos en useJourneyMotion y useJourneyStepMotion.
- Separados el fondo, el encabezado, la etapa animada y la tarjeta en flujo de la sección narrativa.
- Extraído el fondo con parallax del hero.
- Centralizadas las consultas de pantalla y preferencias de movimiento, incluyendo suscripción y limpieza.
- Unificado el tratamiento del foco de teclado que mantiene visibles los elementos animados.
- Retiradas seis cadenas de código decorativo y su rama obsoleta en LearningCard, sustituidas por las ilustraciones.
- Agrupados los textos de sección en computerScienceContent.
- Retiradas las props redundantes de las tarjetas PDF: document.pdfUrl es la única fuente de la URL; el id ignorado deja de enviarse.

## Organización vigente

| Responsabilidad | Módulos |
| --- | --- |
| Composición de página | ComputerSciencePage |
| Contenido de carrera | computerScienceHero.js y computerScienceSections.js |
| Hero | ComputerScienceHero y moléculas Background, Heading, Visual e Intro |
| Carrusel | CareerLearning, ContinuousCarousel, LearningCard y hooks existentes de interacción |
| Salida de aprendizaje | useSectionExit |
| Composición narrativa | ComputerScienceJourney |
| Presentación narrativa | ComputingJourneyBackground, Heading, Step y Card |
| Progreso y transformaciones | useJourneyMotion y useJourneyStepMotion |
| Adaptación y accesibilidad | useMediaQuery, useMotionPreference, usePinnedScene y useKeyboardFocusWithin |
| Entrada de elementos y paneles | ScrollMotion, ScrollReveal y ScrollPanel |
| Ámbitos y habilidades | CareerWorkplaces/WorkplaceTile y CareerBenefits/BenefitCard |
| Documentos | CareerDocuments → AcademicDocumentCard → usePdfViewer → visor global |

La tarjeta en flujo y la etapa animada permanecen separadas porque sus estructuras responden a modos de lectura distintos. ScrollReveal sigue siendo una fachada útil para consumidores existentes. Los catálogos estáticos permanecen agrupados: dividir cada lista en otro archivo no aportaría una responsabilidad nueva.

## Reutilización conservada

Image conserva espacio y fondo institucional si falta la fuente o falla la carga. Se mantienen los tokens de index.css, los átomos, la curva compartida y el visor PDF global. No se incorporan dependencias ni CSS nuevos.

El carrusel mantiene autoplay, arrastre, expansión y teclado. Las etapas avanzan y retroceden con el desplazamiento. Con movimiento reducido o espacio insuficiente, la narrativa se presenta en flujo. Las otras carreras conservan su modo de animación predeterminado.

## Verificación

- Compilación de producción correcta.
- Navegador sin errores en las comprobaciones de esta revisión.
- Autoplay, arrastre y reanudación del carrusel comprobados.
- Transiciones de salida y secuencia 1→2→3→2→1 reversibles.
- Ausencia del texto y de la barra comprobada.
- Pantallas de 320, 390 y 1440 px sin desbordamiento horizontal; revisión visual móvil y escritorio.
- Cambio dinámico de movimiento reducido y respaldo ante error de imagen comprobados.
- PDF de Computación: ambas tarjetas, dos páginas, zoom, descarga, cierre y móvil comprobados. PDF de Administración comprobado tras simplificar las props.

## Límites y pendientes

El lint global mantiene dos errores previos de set-state-in-effect, en toast.jsx y careersCarousel.jsx, ajenos a esta página. La compilación sigue advirtiendo del tamaño del bundle; esta limpieza no sustituye una revisión de carga y división de recursos.

Las imágenes son ilustrativas y el PDF de Computación está marcado como muestra no oficial. El contenido académico y los documentos oficiales necesitan validación institucional. Esta revisión no equivale a una auditoría completa del repositorio.
