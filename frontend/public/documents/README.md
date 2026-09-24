# Documentos académicos de referencia

Los dos PDF de esta carpeta son muestras para probar la interfaz de Administración de Empresas. No son documentos académicos oficiales y no definen ciclos, créditos, horas ni requisitos.

## Reutilizar la sección

`CareerDocuments` recibe `documents` y un `title` opcional. Cada documento contiene:

- `id`: identificador estable y único.
- `title` y `description`: título y llamado a la acción de la tarjeta.
- `image`: imagen de fondo; utiliza el átomo `Image` con respaldo institucional.
- `tone`: `light` o `dark`.
- `pdfUrl`: ruta pública o URL con permiso CORS para leer el PDF.
- `fileName`: nombre de la descarga.
- `previewImage` (opcional): imagen renderizada del PDF. Si se omite, el modal usa el visor PDF del navegador.
- `isReference`: muestra el aviso de documento de referencia cuando es `true`.

Ejemplo de integración: `frontend/src/data/administrationDocuments.js` y `CareerDocuments` en la página de Administración.

`DocumentModal` también se puede utilizar por separado. Montarlo al abrir y desmontarlo al cerrar; usar `key={document.id}` si se cambia el documento. Recibe `document` y `onClose`.

## Reemplazar por documentos oficiales

1. Guarda los PDF nuevos y actualiza `pdfUrl` y `fileName` en el catálogo correspondiente.
2. Actualiza también `previewImage` con una captura del documento nuevo, o elimina esa propiedad para utilizar el visor del navegador. No conserves la vista previa de la muestra junto a un PDF diferente.
3. Cambia `isReference` a `false` solamente cuando el documento sea oficial.
4. Verifica la vista previa y la descarga de ambos archivos.
