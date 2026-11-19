# Imágenes: almacenamiento y mantenimiento

Estado del 18 de noviembre de 2026. Se admiten enlaces HTTPS directos a imágenes de cualquier proveedor y subida local JPG/PNG/WebP; límite 5 MiB y 25 megapíxeles, conversión a WebP hasta 1920 px, sin metadatos. Los enlaces externos se cargan en el navegador: no hay importación remota en el backend. El proveedor debe permitir la carga y mantener el enlace vigente; un error muestra el fondo institucional.

## Archivos subidos

- LocalImageStorage encapsula escritura, lectura y borrado. Por defecto usa backend/.local/media, ignorado por Git; MEDIA_DIRECTORY permite una ruta persistente distinta.
- Image conserva storageKey, orphanedAt y deletedAt. data queda nullable para poder leer imágenes heredadas hasta migrarlas.
- La URL estable sigue siendo /api/v1/media/:id. La carpeta nunca se publica como directorio estático. El servicio comprueba publicación o sesión/rol antes de leerla; las imágenes publicadas admiten revalidación por `ETag` (`public, no-cache` / `304`) y las privadas conservan `private, no-store`. La subida (`POST /api/v1/admin/images`) usa un límite de intentos independiente del de login/MFA.
- PostgreSQL conserva metadatos y auditoría. El guardado fallido intenta eliminar el archivo nuevo; una caída entre archivo y registro puede dejar un archivo huérfano que recoge el mantenimiento.

## Migración y limpieza

Desde backend/: pnpm images:migrate copia los bytes heredados a archivos y compara su contenido antes de actualizar metadatos y vaciar data. Conserva el identificador y la URL. Es reanudable; los archivos sobrantes de un intento fallido entran en la limpieza posterior. Se ejecutó en desarrollo: dos imágenes migradas.

pnpm images:cleanup ejecuta una revisión manual. El servidor también ejecuta la revisión al arrancar y cada hora, sin superponer ejecuciones dentro del proceso. El estado de retención vive en PostgreSQL y sobrevive al reinicio.

MEDIA_RETENTION_DAYS vale 7 por defecto (configurable entre 1 y 365). Un archivo nuevo sin asociar empieza a contar al subirlo. Una foto utilizada deja de contar; al quedar sin referencias, la siguiente revisión inicia el plazo. Se consultan TODOS los eventos, incluidos borradores, publicaciones retiradas y eventos pasados. Ninguno pierde su foto por antigüedad.

La asociación y la limpieza bloquean la misma fila de imagen dentro de una transacción. Antes de borrar el archivo, se marca deletedAt: una asociación posterior se rechaza. Si el disco falla, se conserva la fila para reintentar. Los archivos sin fila de BD solo se eliminan cuando superan el plazo por su fecha de modificación. Los enlaces externos nunca se borran mediante esta tarea.

## Respaldo y alojamiento

El respaldo debe incluir PostgreSQL y MEDIA_DIRECTORY. Un respaldo solo de PostgreSQL ya no contiene los archivos migrados. Al restaurar o cambiar de equipo hay que restaurar ambos. Para varias instancias, todas deben acceder al mismo volumen persistente; no usar discos efímeros independientes. La política operativa de backups y el proveedor remoto se concretarán con el despliegue.

No se configuró S3, Cloudinary ni otro servicio externo: el usuario aún no tiene proveedor. El adaptador concentra el cambio de infraestructura futuro. La aplicación mantiene sus restricciones previas de producción.

## Verificación

Pruebas automatizadas con PostgreSQL y directorios temporales: comparación de bytes al migrar, retención, protección de referencias públicas y borradores, inicio del plazo tras desvincular, fallo de disco/reintento, rechazo de rutas inválidas y asociación concurrente con limpieza. El recorrido de Edge comprobó subida real, lectura autorizada, histórico automático, retirada y fallback ante enlaces rotos.
