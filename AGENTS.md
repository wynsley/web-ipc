# Convenciones del proyecto

## Imágenes

Por petición del usuario, prioriza esta regla en cualquier página o componente nuevo o modificado: renderiza las imágenes de forma condicional. Si no hay una fuente disponible o la imagen falla al cargar, muestra un fondo institucional usando los tokens de `frontend/src/index.css` (principalmente `bg-blue-dark`). Evita iconos de imagen rota y conserva el espacio y la legibilidad del contenido. Para fondos de hero, reutiliza `HeroBackground` cuando corresponda.
