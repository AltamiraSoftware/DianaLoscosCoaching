# Diana Loscos · coaching profesional

Web de Diana Loscos reconstruida con Next.js App Router, React 19, TypeScript estricto y Tailwind CSS 4. La reserva principal se realiza en Doctoralia; el formulario de contacto envía consultas mediante una ruta de Next y Brevo.

## Desarrollo local

Requiere Node 22 y npm. Los scripts principales son:

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

`npm run test:e2e` usa Playwright; instala Chromium con `npx playwright install chromium` si hace falta. La aplicación se construye desde `app/`, `components/`, `content/` y `lib/`.

## Configuración

Las URLs tienen valores públicos de respaldo en `lib/site.ts`; configúralas en Netlify si cambian. Nunca pongas claves privadas en variables `NEXT_PUBLIC_`.

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Origen de canonical, sitemap, robots y JSON-LD. En preview, usa la URL de producción. |
| `NEXT_PUBLIC_DOCTORALIA_URL` | Reserva y enlace a opiniones. |
| `NEXT_PUBLIC_LINKEDIN_URL` | Perfil público de LinkedIn. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Perfil público de Instagram. |
| `NEXT_PUBLIC_WHATSAPP_URL` | Enlace de WhatsApp. |
| `NEXT_PUBLIC_GA_ID` | Opcional. GA solo se carga con consentimiento. |
| `CONTACT_TO_EMAIL` | Destino privado del formulario. |
| `CONTACT_FROM_EMAIL` | Remitente validado en Brevo. |
| `BREVO_API_KEY` | Clave privada de Brevo. |
| `SITE_NOINDEX` | `true` en Deploy Preview y branch deploy. |

Sin las tres variables de correo, el formulario muestra un error y propone contactar por email. La reserva en Doctoralia sigue disponible. La recepción real del formulario requiere una prueba en Deploy Preview con Brevo configurado.

## Despliegue

Netlify ejecuta `npm run build` y detecta Next/OpenNext automáticamente. `netlify.toml` desactiva indexación en Deploy Preview y branch deploy. El fallback SPA se eliminó; `/gracias.html` redirige a `/gracias/` y las rutas desconocidas responden con 404.

Para publicar, crea un Deploy Preview en Netlify y comprueba rutas, formulario, metadatos y adaptación móvil antes de pasar a producción. Confirma los datos legales de la titular, precios vigentes y correo de destino/remitente antes de publicar.

Consulta [ARCHITECTURE.md](ARCHITECTURE.md) para decisiones técnicas, [SEO.md](SEO.md) para rutas y metadata y [FUTURE.md](FUTURE.md) para posibles ampliaciones.
