# Arquitectura de la reconstrucción

## Límites del sistema

Next.js App Router, React 19, TypeScript estricto y Tailwind CSS 4 constituyen una única aplicación desplegada en Netlify. Las páginas y secciones son Server Components por defecto; los componentes cliente se limitan a navegación móvil, movimiento al entrar, consentimiento/analytics y formulario. Las imágenes de contenido usan `next/image`; Newsreader y Manrope se cargan mediante `next/font`. No hay base de datos, CMS, autenticación ni backend separado.

Organización prevista:

```text
app/                     rutas, layout, metadata, robots, sitemap, 404 y api/contact
components/layout/       Header, Footer, navegación y Breadcrumbs
components/ui/           Container, botones, encabezados y controles reutilizables
components/sections/     Hero, proceso, servicios, prueba social, precios y CTA
components/motion/       entrada progresiva con alternativa de movimiento reducido
components/seo/          JsonLd
content/                 FAQ, opiniones y textos con trazabilidad de fuentes
lib/                     URLs, negocio, precios, metadata y analytics
public/                  retrato, iconos y recursos públicos aprobados
tests/                   pruebas unitarias, de integración y smoke E2E
```

`lib/site.ts` centraliza URL canónica, enlaces de Doctoralia, redes, WhatsApp, email, rutas y precios. `lib/seo.ts` concentra la generación de metadata y esquemas. Cada página declara una intención de búsqueda y un H1 único. El contenido comprobable vive en `content/`; si no hay evidencia suficiente para una landing, queda documentada como borrador y fuera del sitemap hasta que tenga contenido útil.

## Reserva y contacto

El CTA principal dirige a la URL configurable de Doctoralia, donde se consulta disponibilidad y se termina la reserva. Email y WhatsApp son vías terciarias. La página de contacto ofrece un formulario con nombre, email y «¿qué te gustaría trabajar?», además de teléfono opcional, consentimiento de privacidad, mensajes de error y confirmación accesibles.

El formulario llama por POST a `app/api/contact/route.ts`. La ruta valida método, campos, longitud y formato, acepta silenciosamente el campo trampa y envía un correo de texto plano a Brevo desde el servidor. Nunca devuelve al navegador la clave ni detalles internos de la respuesta de Brevo. No se conserva una copia de los mensajes en la aplicación. La recepción final debe probarse en un Deploy Preview con credenciales de servidor configuradas.

Variables previstas:

| Variable | Uso | Exposición |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Dominio canónico; en preview conviene mantener la URL de producción junto con `noindex`. | Pública |
| `NEXT_PUBLIC_DOCTORALIA_URL` | URL de reserva y fuente de opiniones. | Pública |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_WHATSAPP_URL` | Enlaces sociales y contacto. | Públicas |
| `NEXT_PUBLIC_GA_ID` | Identificador opcional de GA, cargado solo según consentimiento. | Pública |
| `CONTACT_TO_EMAIL` | Destino de los mensajes. | Solo servidor |
| `CONTACT_FROM_EMAIL` | Remitente autorizado en Brevo, si la implementación lo requiere. | Solo servidor |
| `BREVO_API_KEY` | Autenticación de la API de Brevo. | Solo servidor |

No crear archivos `.env` reales en el repositorio. Documentar únicamente nombres y valores de ejemplo no sensibles. La aplicación debe mostrar un estado claro si el proveedor de correo no está configurado; un 200 sin envío real sería un fallo.

## Analítica y consentimiento

Una capa propia en `lib/analytics.ts` emite `cta_booking_click`, `doctoralia_click`, `whatsapp_click`, `email_click`, `contact_form_start`, `contact_form_submit`, `service_view`, `pricing_view` y `testimonial_view`. Los componentes llaman esa capa sin depender de un proveedor concreto. Sin `NEXT_PUBLIC_GA_ID` o sin consentimiento válido, no se carga analytics. La política de cookies debe describir el comportamiento efectivamente implementado.

## Despliegue y comprobación

`netlify.toml` ejecuta `npm run build`, publica `.next` y deja que Netlify detecte Next.js e instale su adaptador OpenNext vigente. La [guía oficial](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) confirma el soporte de App Router, rutas API e imágenes sin fijar una versión del adaptador. El fallback SPA no debe volver. Deploy Preview y branch deploy usan `SITE_NOINDEX=true`; `robots.ts` y metadata reflejan ese valor de build.

Secuencia mínima por cambio: `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` y pruebas E2E en los flujos afectados. Antes de publicar, verificar formulario real, enlaces, JSON-LD, 404, redirects, navegación por teclado, movimiento reducido y anchos 360/390/768/1024/1440. Lighthouse móvil se mide con la URL concreta del preview y se conserva el resultado; los objetivos solicitados son Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO 100, LCP ≤2,5 s, INP ≤200 ms y CLS ≤0,1.
