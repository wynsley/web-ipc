# Organización de las carreras

Revisión del 5 de octubre de 2026. Se conservan las rutas públicas y los diseños.

## Carpetas

```text
frontend/src/
  components/
    pages/careers/
      administration/businessAdministrationPage.jsx
      computerScience/computerSciencePage.jsx
      languageTranslation/languageTranslationPage.jsx
      accounting/accountingPage.jsx      # Composición y modal de información
    organisms/careers/
      shared/                            # Aprendizaje, campo laboral, beneficios, documentos
      administration/                    # Hero exclusivo de Administración
      computerScience/                   # Hero y recorrido propios de Computación
      languageTranslation/               # Hero, aprendizaje, recorrido y campo laboral propios
    molecules/careers/
      shared/                            # Tarjetas, breadcrumbs, encabezados, pestañas y desplegables
      administration/                    # Destacados exclusivos de Administración
      computerScience/                   # Fondo, encabezado, visual, intro y piezas del recorrido
      languageTranslation/               # Piezas de portada, ejemplos, panel y etapa
  data/
    careers.js                           # Catálogo común, consumido también por inicio y navegación
    careers/
      administration/                    # Beneficios, documentos, aprendizaje y campo laboral
      computerScience/                   # Hero y secciones
      languageTranslation/               # Imágenes, contenido y datos separados por sección
```

Administración combina AdministrationHero y AdministrationHighlights, exclusivos de su carpeta, con organismos comunes. Una carrera no importa componentes de otra; ambas consumen shared.

## Responsabilidades de Traducción

- LanguageTranslationPage compone los bloques y recibe los datos.
- LanguageTranslationHero compone TranslationHeroBackground, TranslationHeroHeading, TranslationHeroComparison y TranslationHeroIntro.
- LanguageTranslationLearning conserva la selección local; CareerTopicTabs gestiona los controles y la navegación por teclado, y TranslationLearningPanel presenta cada tema con TranslationExample.
- LanguageTranslationJourney compone las etapas TranslationJourneyStep.
- LanguageTranslationWorkplaces compone CareerSectionHeading, CareerImageCaption y CareerWorkplaceDetails.
- Los datos se separan en images.js, content.js, learning.js, workplaces.js, benefits.js, journey.js y documents.js. Se importan directamente, sin un barrel adicional.

## Componentes disponibles para todas las carreras

CareerLearning y CareerWorkplaces son compartidos por Administración y Computación. CareerBenefits y CareerDocuments son compartidos por las tres carreras. AdministrationHero y AdministrationHighlights permanecen en administration por su uso exclusivo actual.

CareerLearning usa una etiqueta accesible genérica por defecto y CareerBenefits un alt genérico. Administración proporciona explícitamente sus textos anteriores; Computación y Traducción conservan los suyos.

Las nuevas piezas compartidas no contienen textos de Traducción:
- CareerSectionHeading recibe id, eyebrow, title, description, className y descriptionClassName.
- CareerTopicTabs recibe items ({ title, label }), selected, onSelect, idPrefix y label. El consumidor relaciona los paneles con los IDs derivados del prefijo. Permite flechas izquierda/derecha, Inicio y Fin; cada instancia necesita un prefijo único.
- CareerImageCaption recibe image, imageAlt y caption, y conserva el respaldo de Image.
- CareerWorkplaceDetails recibe title, description, number e initiallyOpen; usa details/summary nativos.

Átomos, layouts, animaciones, hooks generales, visor PDF y catálogo común permanecen en sus ubicaciones globales. No se duplican dentro de las carreras.

## Alcance y validación

Reorganización limitada a Administración, Computación, Traducción y sus componentes/datos comunes; App solo actualiza los imports correspondientes. Las demás páginas y los recursos públicos no se modifican en esta reorganización. Se preservan los cambios locales anteriores.

Verificado: build correcto (714 módulos), lint de las carreras reorganizadas sin errores e imports válidos. Shared no depende de carpetas específicas. Las tres rutas cargan sin errores JavaScript y sin desborde a 390 y 1440 px; las interacciones de Administración y Computación se conservan. Traducción mantiene pestañas, teclado, desplegables y respaldo de imágenes, comprobados también a 320 y 768 px. El CSS generado conserva el mismo hash anterior. Persisten la advertencia previa del bundle y los dos errores globales conocidos de toast.jsx/careersCarousel.jsx como pendientes independientes.

## Ajustes de carreras, navegación y recursos — 5 de octubre de 2026

- Catálogo confirmado de cuatro carreras: Administración, Contabilidad, Computación y Traducción. Estas mejoras se aplican a las tres páginas desarrolladas.
- AdministrationHero y AdministrationHighlights se ubican en organisms/careers/administration y molecules/careers/administration: solo Administración los consume. Shared conserva CareerLearning/CareerWorkplaces (Administración y Computación), CareerBenefits/CareerDocuments (las tres) y sus moléculas.
- CareerBreadcrumbs({ title, className }) aporta Inicio / carrera en los tres héroes. Usa navegación semántica, enlace SPA y aria-current.
- Traducción: CTA principal «Ver admisión» hacia /admissions; secundario «Explorar la carrera» hacia #aprendizaje. Admisión continúa como página provisional de título; no se implementa su contenido en esta tarea.
- Paragraph admite as (p por defecto). Con as="span", size/variant/weight/align heredan por defecto y pueden definirse explícitamente. Los consumidores existentes sin as conservan sus valores anteriores. Los textos inline de carreras usan este átomo; los spans decorativos permanecen nativos. Link incorpora la variante plain para enlaces sin estilo de botón.
- Migradas 21 imágenes de carreras a src/assets/images/careers/{administration,accounting,computerScience,languageTranslation}, mediante imports @assets. Actualizados todos sus consumidores, incluida la foto de FINANZAS de HomeAdmissions; esta sección usa Image para sus fotografías. Conservados los originales y la transparencia de Computación. Los PDF permanecen en public.
- Traducción abre public/documents/languageTranslation/traduccion-referencia.pdf desde ambas tarjetas usando el visor global. Página 1: plan de referencia. Página 2: malla ficticia por etapas, sin créditos ni duración. Ambas incluyen «DOCUMENTO DE REFERENCIA - NO OFICIAL» y las tarjetas isReference=true. Sustituir por documentos oficiales cuando se disponga de ellos.
- Verificados los tres breadcrumbs, regreso a inicio, ambos CTA, teclado de pestañas, carga de imágenes y anchos 320/390/768/1440. PDF renderizado e inspeccionado visualmente; apertura desde ambas tarjetas, dos páginas, navegación, zoom y descarga HTTP 200. Sin errores JavaScript. Build y lint del alcance pasan; la advertencia previa del bundle y los dos errores globales conocidos quedan fuera del alcance.

## Contabilidad — 9 de octubre de 2026

Contabilidad incorpora carpetas propias en pages/careers/accounting, organisms/careers/accounting, molecules/careers/accounting y data/careers/accounting. La página compone seis organismos y controla el modal compartido; el hero recibe onRequest. Las moléculas separan introducción, destacados, razones, ficha de datos, listas de campo profesional, elementos de verificación, tarjeta de ciclo y controles de la malla. AccountingChecklistItem se reutiliza en beneficios y aprendizaje. Los datos existentes se separan en hero.js, overview.js, benefits.js, fields.js, learning.js y curriculum.js.

Se conservan contenido y ruta /career/accounting. La malla reutiliza useCarousel, useCardsPerView y useMediaQuery, respeta withTransition y movimiento reducido, pausa al recibir foco y permite elegir los seis ciclos. Los controles usan Button; las imágenes conservan Image y respaldo institucional. El hero utiliza el asset local ya disponible y corrige el recorte en móvil. Los acentos amarillos locales se sustituyen por orange y el fondo gris literal por neutral-light.

AccountingCarousel permanece como archivo experimental sin consumidores, fuera de la página renderizada; no se incorpora ni se reescribe su animación en esta refactorización. Los datos académicos y afirmaciones institucionales existentes se conservan, sin validarlos como información oficial. Se reparan los imports de imágenes y la exportación careers que faltaban en el catálogo compartido y bloqueaban la compilación de la aplicación.

## Contabilidad: diseño y simplificación vigentes — 9 de octubre de 2026

Esta revisión sustituye la malla en carrusel y los componentes descritos en la primera fase de modularización. La página mantiene sus seis organismos y los datos académicos existentes. Hero con introducción y fotografía independientes, breadcrumb compartido, CTA del modal y enlace a la malla. El orden de lectura es presentación, ficha y razones, beneficios, aprendizaje, malla y campo profesional. Se usan Poppins/Hani y tokens institucionales.

CareerSectionHeading unifica los encabezados; BenefitCard presenta los beneficios sin duplicar su diseño; CareerBreadcrumbs y ScrollReveal resuelven navegación y entradas. AccountingHeroVisual centraliza la fotografía local mediante Image con respaldo institucional. La malla usa seis AccountingCycleCard con details/summary nativos, abiertos inicialmente y operables con teclado, en una cuadrícula responsive. No tiene temporizadores, clones, controles de carrusel ni estado React propio. Se eliminan AccountingCarousel (experimental sin consumidores), AccountingCurriculumControls y AccountingChecklistItem; AccountingLearningCard presenta los temas numerados sin variantes innecesarias.

AccountingPage conserva useModal para la apertura/cierre del formulario. Los hooks internos de Image y de las animaciones compartidas siguen siendo necesarios; no se duplican efectos en organismos ni moléculas de Contabilidad. Se conservan las asignaturas, duración y afirmaciones académicas preexistentes sin certificarlas como información oficial.

Validación: ESLint del alcance y build correctos (persiste la advertencia conocida del bundle). Portada inspeccionada en escritorio y a 320 px, malla a 390 px; sin desborde horizontal de página a 320 px. Verificados apertura/cierre del modal, enlace a la malla, cierre con clic y apertura con Enter de un ciclo. Movimiento reducido delegado a los componentes compartidos y revisado en código.

### Hero vigente de Contabilidad — 9 de octubre de 2026

AccountingHero compone BrandedHeroFrame (shared, también usado por Sobre nosotros) y AccountingHeroIntro (título y único botón de información). Se eliminan AccountingHighlights y AccountingHeroVisual; la fotografía local se pasa como prop al marco compartido. El resto de organismos de Contabilidad se conserva.

### Ficha de Contabilidad — 9 de octubre de 2026

AccountingOverview compone CareerSectionHeading, AccountingDetails y AccountingCapabilities. Esta última mapea AccountingCapabilityItem, con iconos por ID; datos y capacidades residen en overview.js. Eliminados AccountingReasonsPanel y data/careers/accounting/hero.js por falta de consumidores tras sustituir el contenido. Los estilos de esta sección son neutros y azules, sin acentos naranjas.

### Carrusel de competencias de Contabilidad

AccountingLearning compone el encabezado compartido, ScrollReveal y ContinuousCarousel con renderItem hacia AccountingLearningCard. Para modificar contenido usar data/careers/accounting/learning.js (title, description, number, Icon). La interacción permanece en el carrusel y hook compartidos; no duplicar temporizadores ni estado en Contabilidad. Las dimensiones propias se delimitan mediante accounting-learning-carousel en index.css.
