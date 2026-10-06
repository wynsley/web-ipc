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
      accountingPage.jsx                 # Fuera de esta reorganización
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
