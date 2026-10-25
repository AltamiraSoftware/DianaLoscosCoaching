# Contrato de preservación del header

Estado: **bloqueado para rediseño**.

La petición es ampliar la web, no rehacer el componente de navegación. Antes de cualquier cambio en la landing, comprobar que el header sigue conservando su identidad actual.

## Debe conservarse

- El contenedor ".site-header" y su comportamiento sticky.
- El logo y su asset actual "assets/logo_diana_loscos.webp".
- Las piezas ".brand-mark", ".brand-copy", ".brand-name", ".brand-descriptor" y el punto de marca.
- La navegación desktop, incluido el dropdown de servicios.
- El icono y enlace de WhatsApp.
- El CTA de Doctoralia "Reservar sesión".
- El menú móvil y su comportamiento accesible.
- La altura, separación y tratamiento visual que ya tiene el header de producción.

## No hacer

- No reemplazarlo por un header genérico, hamburguesa simple o barra de diseño nueva.
- No cambiar el logo por texto plano ni rasterizarlo de nuevo.
- No eliminar WhatsApp ni el CTA para ganar espacio.
- No introducir una animación continua, un gradiente nuevo o un fondo opaco distinto.
- No aplicar reglas globales a "header", "nav", ".brand" o ".button" sin revisar su impacto.

## Cambios permitidos

- Corregir una URL de navegación o de reserva.
- Añadir atributos de accesibilidad que no modifiquen el diseño.
- Actualizar el destino de una sección tras crear una página real.
- Ajustar un bug responsive conservando jerarquía, orden y controles.

## Checklist de revisión

- Desktop: logo, dropdown, WhatsApp y CTA visibles sin solapamientos.
- Móvil: el menú abre y cierra con teclado, y los enlaces tienen un área táctil de al menos 44 px.
- Scroll: la cabecera sigue fija y no tapa títulos de secciones ancladas.
- Accesibilidad: foco visible, logo con enlace a inicio y botones con etiqueta accesible.

