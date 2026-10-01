# Estado y evolución de IPC Platform

Fecha de revisión: 29 de septiembre de 2026.
Base: rama `main`, commit `ce116cc9d6b07fd6f2ef2f2e3c54f343d736ac11`, más los cambios locales descritos abajo.

Esta es una fotografía del checkout, no una certificación de producción. Se revisaron la estructura, las rutas, los contratos compartidos, los flujos principales, el historial reciente y el diff local; se ejecutaron lint y build. No se probó la interfaz en navegador, el envío a una API ni el contenido de los PDF. La presencia de una sección en código no demuestra que su contenido institucional esté aprobado.

## 1. Arquitectura real

El repositorio conserva la organización de un monorepo pnpm con `frontend` y `backend`. En este checkout solo el frontend tiene implementación: `backend/` contiene `node_modules/`, pero no tiene `package.json`, fuentes ni archivos registrados por Git. No se pueden dar por implementados Express, Prisma, PostgreSQL o endpoints por lo que dice el README histórico.

Flujo principal:

```text
main.jsx
  StrictMode
    PdfViewerProvider
      BrowserRouter
        App
          SocialFloatings
          Routes
            MainLayout
              Header + Navbar
              TransitionPage + Outlet (página actual)
              Footer
      PdfViewerModal (instancia global del proveedor)

Página → MyTemplate → organismos → moléculas → átomos
Datos estáticos → data/
Estado e interacción reutilizable → hooks/
Validación → validations/
Acceso HTTP → helpers/apiFetch.js
```

`MainLayout` comparte la navegación y el pie, anima el cambio de ruta e invoca `useScrollTop`. Las páginas no deben volver a montar esas piezas. `App.jsx` registra diez rutas; no hay ruta comodín de página no encontrada.

Las páginas y plantillas están en `frontend/src/components/pages/` y `frontend/src/components/templates/`, no directamente en `src/pages/` y `src/templates/`.

### Stack comprobado

Las versiones siguientes son las instaladas, consultadas con `pnpm --filter frontend list --depth 0`; algunos rangos del manifiesto empiezan en versiones anteriores.

| Tecnología | Versión instalada | Función |
|---|---|---|
| React / React DOM | 19.3.0 | Interfaz y estado |
| Vite | 8.3.0 | Desarrollo y compilación |
| Tailwind CSS / plugin Vite | 4.3.3 | Utilidades y tema CSS |
| React Router DOM | 7.14.0 | Rutas de la SPA |
| Motion | 13.3.0 | Transiciones y aparición de contenido |
| Joi | 18.1.2 | Validación del formulario de contacto |
| React Icons | 5.6.0 | Iconos |
| React PDF / pdfjs-dist | 11.0.0 / 6.3.289 | Visor de documentos y worker |
| tailwind-merge | 3.7.0 | Resolución de clases en Button |
| ESLint | 9.39.5 | Análisis estático |

Se mantiene JavaScript/JSX con módulos ESM. No hay scripts de pruebas automatizadas declarados en los manifiestos revisados.

## 2. Estado de las páginas

Rutas obtenidas de [App.jsx](../frontend/src/App.jsx); contenido comprobado en [pages](../frontend/src/components/pages).

| Ruta | Estado observado | Referencia o siguiente necesidad |
|---|---|---|
| `/` | Inicio compuesto: banner, llamada, presentación, carreras, convenios, admisión, formulario y modal | La UI de contacto existe; su API no está disponible en este checkout |
| `/career/administration` | Hero, aprendizaje, campo laboral, beneficios y documentos | Principal referencia de composición para las demás carreras |
| `/alumni` | Hero, titulación, graduados destacados y estadísticas | Verificar datos institucionales y fotografías antes de publicarlos como reales |
| `/about-us` | Hero con persona superpuesta y descripción institucional | Desarrollo parcial; el segundo contenedor de DescriptionUs está vacío |
| `/events` | Solo título | Falta contenido y funcionalidad |
| `/admissions` | Solo título | No confundir con la sección de admisión del inicio |
| `/contact` | Solo título | No confundir con el formulario ya implementado en inicio/modal |
| `/career/accounting` | Solo título | Preparar contenido propio y reutilizar secciones |
| `/career/computer-science` | Edición local con sección y Title sin texto; Image importado sin uso | Trabajo en curso, no plantilla terminada |
| `/career/language-translation` | Solo título, con errata | Preparar contenido y conservar el slug existente |

## 3. Novedades que ya podemos aprovechar

No había una revisión anterior guardada: este primer inventario usa como referencia el código actual y commits recientes. Las fechas corresponden al historial local.

| Capacidad | Evidencia del historial | Qué reutilizar |
|---|---|---|
| Secciones de Administración | 17–23 septiembre; `402b957`, `c5a5976`, `aa072c9`, `1bd2e89`, `6d9e2e2`, `476d1a2` | Cinco organismos alimentados con datos separados |
| Imágenes con respaldo institucional | 22 septiembre, `cf7e655` | Átomo Image con carga/error y fondo azul |
| Animaciones de carreras | 22 septiembre, `abca53a` | ScrollReveal, useRevealMotion y respeto de movimiento reducido |
| Formulario compartido | 25–26 septiembre; `d2f66a4`, `b1251df`, `73d08f5`, `04b5fe8` | useContactForm + FormField + configuración + Joi + Toast |
| Ampliación de Egresados | 26 septiembre; `110df03`, `b266ff1`, `27db930` | Titulación, tarjetas de graduados y estadísticas |
| Carrusel con varias tarjetas | 26 septiembre; `4f69001`, `ab6033b` | useCarousel + useCardsPerView |
| Button y tailwind-merge | 26 septiembre, `77076c2` | Variantes, clases combinadas y atributos adicionales |
| PDF global | 26–27 septiembre; `79ab45c`, `3faf2a7`, `f2b1286`, `8927b61` | Un proveedor global; abrir documentos desde cualquier sección |
| Alias de imports | 28 septiembre, `8252abb` | `@/` para src y `@assets/` para src/assets |
| Sobre nosotros | 28–29 septiembre; `99ac640`, `2b88062`, `ce116cc` | AboutHero, HeroPerson y DescriptionUs |

### Componentes y contratos actuales

Las rutas de esta tabla parten de `frontend/src/`.

| Pieza | Contrato observado | Precaución al reutilizar |
|---|---|---|
| `components/atoms/image.jsx` → Image | src, alt, fill, className, imageClassName, fallbackClassName, overlayClassName, loading, fetchPriority y callbacks | El contenedor necesita dimensiones; fill requiere un padre posicionado. El overlay opcional aparece después de cargar |
| `components/atoms/titles.jsx` → Title | level, size, variant, align, weight, text/children y props adicionales | Usa Motion; definir nivel semántico. Variante institutional disponible |
| `components/atoms/paragraph.jsx` → Paragraph | size, variant, align, weight, text/children y props adicionales | Usa Motion; elegir tamaño según contexto |
| `components/atoms/button.jsx` → Button | type, disabled, variant, onClick, text/children, className y props adicionales | Usa twMerge, pero devuelve un botón HTML normal: whileHover/whileTap no lo convierten en Motion |
| Input, Select, Textarea, Label | Controles y etiquetas compartidos; campos aceptan error y props adicionales | Verificar id/htmlFor y mensajes asociados en la composición |
| `components/atoms/navbarLink.jsx` → NavbarLink | href, text, onClick | Enlace del router para navegación |
| `components/atoms/links.jsx` → Link | href, target, rel, download, aria-label, variantes | Es un anchor; para navegación SPA usar React Router |
| `components/templates/myTemplate.jsx` → MyTemplate | children y `classmame` | La prop contiene una errata; className no se aplica. Añade espacio superior y overflow-x-hidden |
| `components/layouts/scrollReveal.jsx` → ScrollReveal | children, className, delay, x, y, scale | Delega a useRevealMotion, que contempla movimiento reducido |
| `context/pdfViewer/usePdfViewer.js` → usePdfViewer | openPdf(pdfUrl, title), closePdf() | No duplicar proveedores o modales por página |

### Carreras

[Administración](../frontend/src/components/pages/careers/businessAdministrationPage.jsx) compone:

- `CareerHero({ title, image, description, highlights })`: highlights es una lista de objetos con title y description.
- `CareerLearning({ topics })`: cada tema usa title, description e image.
- `CareerWorkplaces({ workplaces })`: cada elemento usa title, image y layout; layout se utiliza como clave. Muestra cuatro elementos y permite desplegar el resto.
- `CareerBenefits({ benefits, image })`: beneficios con title y description.
- `CareerDocuments({ documents, title })`: documentos con id, title, description, image, tone y pdfUrl.

La reutilización todavía requiere ajustes puntuales: CareerLearning tiene una etiqueta accesible fija de Administración y CareerBenefits un alt específico de gestión empresarial. Solo Administración dispone de `hero` en `data/careers.js`. No acceder a `career.hero.description` para otra carrera sin preparar sus datos.

### Formularios

[useContactForm](../frontend/src/hooks/globals/useContactForm.js) centraliza valores, errores, pasos, envío y avisos. Lo consumen HomeMessage y ModalMessage. Los campos están en `data/contactFormFields.js`; `ContactFormValidator` se exporta desde `validations/validationCredentials.js`.

Payload: `{ name, email, phone, address, career, shift, message }`.
Envío: `POST http://localhost:3000/contact`, mediante apiFetch y con credenciales.

El helper devuelve JSON, `[]` si la respuesta exitosa está vacía y `null` ante fallo. La validación actual limita correos a gmail.com, hotmail.com y yahoo.com. Es una restricción existente que debe revisarse según el requisito, no una convención universal para futuros formularios.

### PDF, carruseles y animaciones

- PdfViewerProvider se monta una vez en main.jsx. AcademicDocumentCard y FeatureCard abren el visor mediante usePdfViewer.
- PdfViewerModal incluye carga/error, todas las páginas, zoom, navegación por página y enlace de descarga. El worker se importa como asset con `?url`.
- ContinuousCarousel sirve para convenios y aprendizaje: recibe items y renderItem, y opciones emphasizeCenter y draggable. El segundo argumento de renderItem identifica la copia decorativa; evitar que sus controles dupliquen el recorrido del teclado.
- useCarousel, exportado desde `useCarrusel.js`, se usa para banner y graduados. useCardsPerView se exporta desde `useCardPowerView.js`.
- CareersCarousel del inicio conserva una implementación propia: los tres mecanismos no están unificados.
- animation.js contiene variantes compartidas; no todas las animaciones existentes contemplan movimiento reducido. ScrollReveal/useRevealMotion sí lo hacen.

### Identidad visual

[index.css](../frontend/src/index.css) sigue siendo la fuente de verdad: Tailwind 4, tokens, fuentes y estilos compartidos. Azul institucional: `blue-dark` (`#1A3983`). Poppins para lectura; Hani corresponde a Rajdhani; también existe Eurostar como `font-euro`. Reutilizar tokens en lugar de copiar colores hexadecimales.

Los alias están configurados tanto en vite.config.js como en jsconfig.json. Conviven con imports relativos válidos. Las instrucciones históricas que indicaban que no había alias o Context ya no describen el checkout actual.

## 4. Cambios locales que deben conservarse

Al comenzar esta revisión había ocho WebP eliminados de la raíz de public y los ocho presentes en `public/business_admin/`, carpeta todavía sin seguimiento. Se actualizaron referencias en careers, administrationLearning, administrationWorkplaces, administrationDocuments y homeAdmissions.

También había una edición incompleta de ComputerSciencePage. Ninguno de estos cambios se modificó durante el análisis.

Al consolidar esta reorganización, incluir los archivos nuevos junto con las eliminaciones y las referencias. De lo contrario, otro checkout no tendrá las imágenes. El catálogo de Contabilidad e Informática también apunta a business_admin: actualmente la carpeta contiene recursos usados por varias carreras.

## 5. Pendientes priorizados

Son hallazgos de análisis, no correcciones aplicadas.

| Prioridad | Hallazgo y evidencia | Acción recomendada |
|---|---|---|
| Alta | Backend ausente; apiFetch apunta a localhost:3000 | Determinar dónde vive la API e implementar/verificar POST /contact antes de declarar operativo el envío |
| Alta | Lint falla en toast.jsx:13 y careersCarousel.jsx:31 | Corregir el estado sincronizado desde efectos y volver a ejecutar lint |
| Alta | AboutHero, HeroPerson, HomeAdmissions, GraduateCard y otras piezas usan img directo; banner usa backgroundImage | Al intervenir estas piezas, aplicar Image y probar fuente vacía/fallida conforme a AGENTS.md |
| Alta | FormField crea Label htmlFor=name, pero no pasa id a los controles; tampoco lo generan los átomos | Asociar label/campo y permitir ids únicos cuando conviven el formulario de inicio y el modal |
| Alta | PDF y modal de contacto carecen de gestión de foco, Escape y semántica completa de diálogo | Completar apertura/cierre por teclado, foco inicial y restitución del foco; revisar superposición con navegación |
| Alta | Menú móvil oculto solo mediante opacidad y pointer-events; submenús por altura/opacidad | Excluir controles cerrados del foco y reflejar expansión con atributos accesibles |
| Alta | Documentos de Administración marcados isReference; la tarjeta no muestra esa distinción | Confirmar documentos oficiales o identificar visiblemente el carácter de referencia |
| Media | Graduados usan pravatar; estadísticas y afirmaciones institucionales sin fuente documentada | Confirmar nombres, fotografías, cifras, antigüedad, empleabilidad y datos de contacto antes de publicarlos |
| Media | MyTemplate usa classmame; Title h2 contiene `xs:text-[2.5]` y `md: text-4xl` | Corregir contratos y clases al abordar la base visual; comprobar consumidores |
| Media | Button es HTML, pero recibe whileHover/whileTap en organismos de carreras | Elegir una integración Motion real o conservar interacción CSS; no copiar esas props como si funcionaran |
| Media | useCardsPerView devuelve 1.3/2.3/3/4; CareersCarousel crea una cantidad entera y solo selecciona grid de 2 o 3 columnas | Revisar el contrato entre hook y carrusel antes de reutilizarlo allí |
| Media | useContactForm reinicia datos también tras fallar y programa reset sin limpiar el timeout | Conservar datos para reintentar y controlar el ciclo de vida del temporizador |
| Media | Bundle principal grande y rutas importadas estáticamente | Medir y valorar carga diferida de rutas/visor; no añadir dependencias sin necesidad |
| Media | PDF renderiza todas las páginas; el contador solo cambia con sus controles | Probar documentos largos, scroll manual, zoom y valores no enteros antes de extender el visor |
| Baja | Dos previewImage apuntan a PNG inexistentes, pero no tienen consumidores actuales | Limpiar metadatos obsoletos o aportar previews si se vuelven a utilizar |
| Baja | FeatureCard recibe variant blue-dark desde titulationSteps, pero solo define white y blue-deep | Alinear variantes; hoy cae en white |
| Baja | Sin ruta 404; tarjetas de carreras del inicio usan anchors; INGLES.webp es ruta relativa | Completar navegación y usar rutas de assets desde la raíz |
| Baja | Erratas en nombres: DescrtiptionUs, featuredGratuatesSection, LanguageTraslationPage, Dost, entre otras | Conservar imports exactos; renombrar de forma coordinada si se aborda esa limpieza |
| Baja | README describe scripts y backend que el checkout no tiene | Usar esta revisión y los manifiestos como referencia de ejecución; actualizar el onboarding histórico |

## 6. Verificaciones realizadas

Entorno disponible en WSL: Node 24.21.0 y pnpm 12.4.2. La shell interactiva carga el entorno necesario; la shell no interactiva inicial no encontraba Node. No se instalaron dependencias.

| Comprobación | Resultado |
|---|---|
| git status, log y diff | Revisados commit base y cambios locales |
| pnpm --filter frontend list --depth 0 | Versiones instaladas registradas |
| pnpm --filter frontend run lint | Falla: 2 errores de react-hooks/set-state-in-effect en Toast y CareersCarousel |
| pnpm --filter frontend run build | Pasa: 638 módulos; advertencia por chunks mayores de 500 kB |
| Tamaño de salida | JS principal 1.341,97 kB, gzip 413,36 kB; worker PDF 1.265,41 kB; imagen about_hero 1.412,21 kB |
| Referencias literales absolutas a imágenes/PDF en src | Solo faltan los dos previews obsoletos; los ocho WebP reorganizados y los PDF referenciados existen |
| UI, responsive, teclado, PDF y envío real | No verificados en navegador ni contra una API |

La búsqueda de assets cubre literales que empiezan por /, no URLs externas, valores calculados o todas las rutas relativas. Un build exitoso tampoco valida esos recursos ni la interacción.

## 7. Cómo mantener este análisis

Al revisar nuevas incorporaciones, registrar fecha y commit, comparar con esta base, identificar contratos y consumidores modificados y actualizar el estado de cada página. Separar siempre lo integrado, los cambios locales y lo propuesto.

Consultar la [guía para nuevas páginas](GUIA_NUEVAS_PAGINAS.md) antes de crear una rama de implementación. Estos documentos deben formar parte del historial compartido para aparecer en otras ramas; un archivo local sin commit no se transmite a otros checkouts. No hay seguimiento automático configurado.

