# Convenciones del proyecto

## Imágenes

Por petición del usuario, prioriza esta regla en cualquier página o componente nuevo o modificado: renderiza las imágenes de forma condicional. Si no hay una fuente disponible o la imagen falla al cargar, muestra un fondo institucional usando los tokens de `frontend/src/index.css` (principalmente `bg-blue-dark`). Evita iconos de imagen rota y conserva el espacio y la legibilidad del contenido. Reutiliza el átomo `Image` de `frontend/src/components/atoms/image.jsx` para centralizar la carga, los errores y el fondo institucional. Configura sus clases y su overlay opcional según el diseño; usa `alt` descriptivo para imágenes informativas y vacío para fondos decorativos.

## Referencia de arquitectura y nuevas páginas

Antes de crear o ampliar una página, consulta [docs/ESTADO_PROYECTO.md](docs/ESTADO_PROYECTO.md) y [docs/GUIA_NUEVAS_PAGINAS.md](docs/GUIA_NUEVAS_PAGINAS.md). Contrasta la revisión fechada con el código actual y conserva los cambios locales. Al incorporar capacidades o cambiar contratos compartidos, actualiza la documentación pertinente; distingue lo implementado, lo pendiente y el contenido de referencia. La regla de imágenes anterior se mantiene.
