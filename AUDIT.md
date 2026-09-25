# Auditoría inicial · Diana Loscos

Fecha: 25 de septiembre de 2026. Esta auditoría compara la SPA original con la reconstrucción Next.js dentro del mismo repositorio [ByyLoscos/web-diana](https://github.com/ByyLoscos/web-diana). La rama local `feat/rebuild-next` conserva un snapshot de la SPA como punto de partida; `legacy/` documenta el código anterior. Los hallazgos no equivalen a una medición de la nueva web.

## Repositorio y despliegue original

- La base era Vite 7, React 19 y Tailwind 4, con componentes JSX concentrados en `src/App.jsx`. No había TypeScript, pruebas ni typecheck; `README.md` era el texto de la plantilla Vite.
- Solo `/` tenía contenido indexable. Legales, privacidad, cookies, FAQ y código ético cambiaban mediante estado React, sin URL propia. El sitemap estático solo incluía `/` con `lastmod` del 8 de marzo de 2026.
- `public/_redirects` contenía `/* /index.html 200`, un fallback de SPA que debe desaparecer con App Router.
- El formulario publicaba un plano HTML oculto para Netlify Forms en `index.html` y enviaba por AJAX un POST codificado a `/`. El archivo `api/contact.js` enviaba correos mediante Brevo, pero el formulario no lo llamaba. Tras el envío navegaba a `/gracias`; la web publicada servía una página independiente de agradecimiento, mientras que el repositorio contenía `/gracias.html`. El flujo requiere sustitución y prueba en el Deploy Preview.
- La página original incluía metadatos, canonical y JSON-LD de `Person`, `ProfessionalService` y `FAQPage` en el HTML único. La reconstrucción necesita metadatos y datos estructurados coherentes con cada ruta.
- `origin` apunta a `ByyLoscos/web-diana`. La rama local `feat/rebuild-next` existía al iniciar esta revisión y parte del snapshot original. No se pudo consultar `origin/master` porque GitHub solicitó autenticación; hay que confirmar la base remota antes de abrir el PR.

## Inventario de contenido y activos

| Material original | Uso propuesto y límite |
| --- | --- |
| Retrato original `public/perfil.png` (356 × 402 px) | Es el retrato reconocible de Diana. La versión Next `public/perfil.jpg` conserva la foto y reduce el peso de 225 KB a 19 KB. El PNG original permanece en el snapshot Git y en `legacy/`; usar el JPEG a tamaño moderado hasta disponer de una foto original de mayor resolución. |
| `public/hero.jpg` (1600 × 1067 px) y `public/primera-foto.png` (1536 × 1024 px) | Son imágenes genéricas de una reunión y una videollamada; retirarlas del diseño nuevo. |
| `public/og-image.jpg` (1200 × 630 px) | Muestra una reunión genérica; sustituirlo por un OG editorial propio. |
| Diplomas y título de Psicología | La credencial debe expresarse en texto con fuente pública. `public/titulo_psicologia.png` expone datos personales de identificación y debe retirarse del directorio publicado. Un diploma de formación no equivale a acreditación personal ICF. |
| `public/icf-codigo-etico-june-2025.pdf` | Recurso enlazado desde la antigua vista de código ético. Conservar el enlace solo tras verificar el documento y su pertinencia. |
| Oferta y precios | El código original mostraba sesión individual de 60 €, seis sesiones por 330 € y diez por 520 €. La web pública confirmó los bonos; Doctoralia confirmó la sesión online de 60 €. Centralizar y revisar antes de cada publicación. |

El texto anterior hablaba de desarrollo personal y profesional, bloqueo, hábitos, decisiones, liderazgo, sesiones online de 60 minutos y formación. La nueva intención principal se acota a coaching **profesional** en momentos de cambio, bloqueo y decisión. Coaching y psicoterapia deben permanecer diferenciados. La frase «en proceso de acreditación ACC» no acredita que Diana posea ACC.

## Fuentes públicas y límites

| Fuente | Hechos utilizables | Límite |
| --- | --- | --- |
| [Web oficial](https://dianaloscoscoach.com/) | Duración de 60 minutos y bonos de seis y diez sesiones, además de textos históricos de oferta. | Precios y disponibilidad pueden cambiar; Doctoralia manda para reserva y condiciones vigentes. |
| [Doctoralia](https://www.doctoralia.es/diana-loscos-ortega/psicologo-terapeuta-complementario/madrid) | Grado en Psicología, formación en coaching ejecutivo, colegiación M-45396, sesión online a 60 € y cinco extractos breves de opiniones públicas. | Enlazar cada extracto a la fuente; no convertir opiniones en garantías o resultados típicos. |
| [LinkedIn](https://www.linkedin.com/in/diana-loscos-ortega-68b184214/) e [Instagram](https://www.instagram.com/dianaloscoscoach/) | URLs públicas para enlazar. | El rastreo quedó bloqueado; no se extrae ni infiere contenido de los perfiles. |
| [María Arredondo](https://www.mariaarredondo.com/) y [Bienpro](https://bienpro.es/) | Referencias de organización de contenido y recorrido de reserva. | No trasladar sus fotografías, oferta, cifras ni credenciales. |

Los cinco extractos seleccionados y sus fechas se mantienen en `content/testimonials.ts`. Los precios de bonos se comprobaron en el resultado público indexado de la web oficial, rastreado hace dos meses; la sesión de 60 € también está en Doctoralia. Confirmar condiciones vigentes antes de publicación. Cualquier dato no comprobado se mantiene como pendiente o borrador.

## Continuidad visual solicitada

La SPA original utiliza verde azulado y grises claros, el monograma verde de Diana, botones redondeados, retrato real, un «¿Empezamos?» en el hero y secciones de lectura sencilla. La primera versión Next había pasado a una estética editorial de marfil, bordes rectos y cabecera solo tipográfica. Esta revisión recupera aquellos rasgos con la paleta solicitada, mejora el contraste y mantiene la arquitectura accesible e indexable.

## Baseline y riesgos de QA

La API pública de PageSpeed Insights respondió inicialmente `429 RESOURCE_EXHAUSTED` por cuota. Después se ejecutó Lighthouse 13.5.0 con Chromium 153 en modo móvil simulado sobre la web publicada el 25/09/2026: **Performance 99, Accesibilidad 85, Buenas prácticas 100 y SEO 100**; LCP de laboratorio 1,6 s y CLS 0. Los fallos de accesibilidad detectados fueron nombres accesibles ausentes en botones y enlaces, y contraste insuficiente. Es una medición puntual de laboratorio, no métricas de campo. El detalle y la comparación con el build nuevo figuran en [QA.md](QA.md).

Riesgos prioritarios: recepción real del formulario en Netlify, URLs legales indexables, redirecciones de `/gracias` y `/gracias.html`, eliminación de imágenes genéricas y del título con datos personales, consistencia de precios, contraste WCAG AA y funcionamiento con movimiento reducido. La [documentación de Netlify Forms](https://docs.netlify.com/manage/forms/troubleshooting-tips/) indica que su runtime de Next necesita un formulario HTML estático de referencia y envío AJAX si se usa Netlify Forms; la arquitectura prevista aquí usa una ruta API propia con Brevo.
