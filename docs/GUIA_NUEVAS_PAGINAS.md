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

