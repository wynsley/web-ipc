# Agenda institucional

## Actualización del 18 de noviembre de 2026

El contrato público y administrativo incluye endsAt (ISO con zona, nullable para compatibilidad) y cada lista devuelve serverTime. La finalización debe ser posterior a startsAt, también en ediciones parciales; PostgreSQL conserva una restricción equivalente. El formulario requiere finalización para nuevos eventos y ediciones. Registros antiguos sin ella se consideran finalizados al terminar su día de inicio en Lima.

La página actualiza datos cada 15 segundos y al recuperar foco/conexión, con pausa en segundo plano, cancelación y reintentos. Los vigentes alimentan portada, carrusel y destacados; todos los publicados finalizados pasan a «Revive nuestros eventos», sin cambiar su estado publicado. El calendario conserva ambos grupos. La galería reutiliza la foto y el encuadre del evento; el visor permite ver la foto completa. No es un álbum de varias fotos por evento.

Los uploads nuevos se guardan en la carpeta privada configurable del servidor, con limpieza de imágenes sin referencias tras siete días. Las imágenes anteriores se migran conservando URLs. [Almacenamiento y respaldo](media.md). Esta actualización sustituye las referencias históricas de este documento a bytes en PostgreSQL, galería local y actualización solo al recargar.

## Encuadre de la foto

La vista previa permite arrastrar la imagen, ajustar zoom entre 1 y 3, mover horizontal y verticalmente mediante controles de teclado y restablecer el centro. Las vistas Horizontal (16:9) y Destacados (3:4) muestran el mismo encuadre en dos proporciones. La web adapta este encuadre al espacio disponible.

El campo opcional imageCrop contiene x e y entre 0 y 100 y zoom entre 1 y 3. La base asigna por defecto {x:50,y:50,zoom:1} a los eventos existentes. El formulario envía estos valores al crear o editar, y la API pública los entrega junto a la imagen. El átomo Image aplica la posición y el aumento; ImageCropEditor gestiona la interacción del panel. Los cambios de encuadre conservan la URL temporal de la vista previa.

Verificado con las 59 pruebas del backend, lint, ambas compilaciones y una prueba de Edge con respuestas simuladas que cubre arrastre, zoom, formatos, restablecimiento, guardado y estilos de la foto pública.


## Imágenes por enlace o archivo

El selector permite pegar una URL HTTPS o elegir un archivo JPG, PNG o WebP de hasta 5 MiB. Ambas fuentes tienen vista previa y la opción de quitar la imagen. El archivo se sube al guardar el borrador; un fallo posterior al guardar el evento permite reusar la imagen ya subida. La vista previa usa el átomo Image y conserva el fondo institucional si falla.

POST /api/v1/admin/images recibe multipart/form-data con un único campo image. Requiere Bearer, rol admin/events, cabecera de cliente, origen válido y CSRF. Aplica los límites de intentos existentes. Responde 201 con data.imageUrl. El procesador Sharp valida el formato real, rechaza animación y más de 25 megapíxeles, corrige orientación y convierte a WebP de hasta 1920 píxeles por lado sin metadatos. Las entradas inválidas devuelven 422, cuerpos demasiado grandes 413 y tipo de petición incorrecto 415.

GET /api/v1/media/:id entrega image/webp. Los archivos asociados a algún evento publicado son públicos; los demás requieren Bearer y rol admin/events. Retirar el último evento que usa una imagen vuelve a restringir el acceso. Se utiliza Cache-Control: no-store. Los enlaces externos son recursos gestionados por su proveedor y su accesibilidad depende de ese servidor.

Esta etapa guarda los bytes procesados en la tabla images de PostgreSQL, incluida en sus respaldos. La API devuelve una ruta estable y conserva en el evento únicamente esa ruta. Las imágenes reemplazadas o subidas antes de un guardado fallido permanecen privadas cuando ninguna publicación las utiliza. La eliminación de archivos huérfanos y la migración a almacenamiento de objetos se abordarán cuando se defina su retención.

Se probaron 59 casos con PostgreSQL, incluyendo formatos falsos, límite de tamaño, CSRF, roles y visibilidad antes y después de publicar/retirar. En Edge con respuestas controladas se verificaron ambas vistas previas y el reintento de guardado. Ambas aplicaciones compilaron.


Actualización del 17 de noviembre de 2026. El formulario de Eventos incorpora «Destacar evento». El campo featured es booleano, opcional en entradas de API y falso por defecto para eventos existentes. La sección de destacados consume los eventos publicados marcados; se oculta si no hay ninguno. Para cambiar la selección de una publicación se retira, edita y publica nuevamente. Se verificaron 58 pruebas del backend, lint, ambas compilaciones y en Edge el filtrado, la tarjeta única, el fondo sin foto y la sección vacía con datos simulados.


La primera entrega conecta la sección Eventos del panel con la agenda de `/events`. El personal crea un borrador con título, descripción, lugar e inicio. La entrada utiliza la hora de Lima y la API recibe ISO 8601 con zona. PostgreSQL guarda el instante en TIMESTAMPTZ. La agenda muestra también eventos pasados mientras sigan publicados.

| Método y ruta | Comportamiento |
| --- | --- |
| GET /api/v1/events?page=1 | Público. Devuelve data.events y data.hasMore. Cada fila contiene id, title, description, location, startsAt, imageUrl y highlights. |
| GET /api/v1/admin/events?page=1 | Lista de gestión con published y version. |
| GET /api/v1/admin/events/:id | Detalle administrativo. |
| POST /api/v1/admin/events | Recibe title, description, location y startsAt. Crea un borrador y devuelve 201 con data. |
| PATCH /api/v1/admin/events/:id | Recibe version y los campos modificados. Edita un borrador. |
| POST /api/v1/admin/events/:id/publish | Recibe version. Hace visible el borrador. |
| POST /api/v1/admin/events/:id/unpublish | Recibe version. Retira el evento y permite volver a editarlo. |

Las listas devuelven hasta 20 eventos ordenados por inicio e identificador. Los cambios se consultan automáticamente según la política descrita arriba. Las rutas de gestión requieren un JWT con rol admin o events. Las escrituras requieren además las cabeceras del cliente, CSRF y cuerpo JSON. El backend responde 409 ante una versión obsoleta o una transición incompatible. Cada cambio y su registro de auditoría se confirman en la misma transacción.

El formulario acepta una foto por URL HTTPS o un archivo subido (imageUrl) y hasta cuatro puntos de 160 caracteres (highlights). Los eventos anteriores siguen siendo válidos. La portada, el carrusel, la cuenta regresiva y el calendario usan la misma colección publicada. El carrusel prioriza próximos eventos; cuando todos han pasado, muestra los tres más recientes. La galería conserva sus datos locales. Los destacados consumen los eventos publicados marcados.


### Organización del módulo de imágenes

Las rutas de `media/imageRoutes.js` adaptan HTTP y delegan en `imageService.js`, que valida y normaliza archivos y decide el acceso público o privado. `imageRepository.js` consulta referencias publicadas y contenido, y guarda la imagen con su auditoría dentro de una única transacción. `app.js` conecta repositorio, servicio y rutas. Esta separación conserva el contrato de subida y lectura existente; verificada con las 59 pruebas del backend el 17 de noviembre de 2026.


### Cierre del formulario

El panel confirma al descartar cambios y retirar publicaciones, bloquea la edición durante el guardado y presenta errores locales y de API junto a los campos con foco en el primero. La navegación interna y el cierre voluntario de sesión comparten la protección de borrador; recarga/salida usan beforeunload sujeto al navegador. No hay autoguardado ni protección ante revocación obligatoria de sesión. El 18 de noviembre se verificó el recorrido integrado de imágenes y eventos en Edge contra Hono/PostgreSQL de pruebas, además del formato móvil de 390 px y controles de teclado. Véase el registro de cierre en BACKEND_ADMIN.md para cobertura y límites.


El visor muestra la foto completa, sin aplicar el encuadre de las tarjetas. Su panel de texto tiene desplazamiento propio para evitar desbordamiento en móvil. La fecha visible procede del inicio programado; cuando el fin está en otro día se muestra el período. La transición al histórico no modifica ninguna de esas fechas. Corrección verificada en Edge el 18 de noviembre de 2026.


## Reprogramación, aplazamiento y cancelación

status es scheduled, postponed o cancelled, independiente de published. La API pública añade status, scheduleNotice, previousStartsAt y previousEndsAt. Solo scheduled participa en vigentes/histórico; el resto se muestra como aviso sin horario válido ni exportación a calendarios. Las fechas de un pospuesto/cancelado se conservan como referencia anterior, no como fecha vigente.

POST /api/v1/admin/events/:id/reschedule recibe version, reason (5–500 caracteres públicos), startsAt y endsAt ISO con zona; requiere finalización posterior al inicio. Conserva publicación y activa scheduled, incluso desde cancelled. POST /:id/postpone y POST /:id/cancel reciben version y reason; posponer solo admite scheduled y cancelar rechaza una cancelación repetida. Mantienen las fechas como referencia y la visibilidad publicada. Requieren Bearer, rol admin/events y CSRF.

GET /api/v1/admin/events/:id/history?page=1 devuelve data.changes y data.hasMore (20 por página), con action, reason, before, after, actorId, actorName y createdAt. Requiere autorización administrativa; nombres y detalles de historial no se incluyen en la colección pública. Los conflictos de versión/transición devuelven 409. Historial y auditoría se confirman dentro de la transacción del cambio. Las fechas de borradores editadas por PATCH también dejan registro.

Los visitantes ven el aviso y la nueva fecha en la siguiente actualización periódica. Una copia .ics o un evento añadido a Google no se sincronizan automáticamente: la interfaz y la descripción exportada lo indican. Los eventos cancelados/pospuestos se excluyen de las exportaciones.
