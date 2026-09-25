# QA de la reconstrucción

## Revisión sobre `web-diana-master` · 25/09/2026

Tras recuperar la identidad visual original se ejecutaron `npm ci` (sin vulnerabilidades informadas), `npm run lint`, `npm run typecheck`, `npm test` (3/3) y `npm run build`, todos correctos. Un smoke HTTP sobre el build de producción devolvió 200 y un H1 con JSON-LD en las 12 rutas públicas; una ruta inexistente devolvió 404.

La suite Playwright se intentó de nuevo en este contenedor, pero Chromium no pudo arrancar: faltan bibliotecas del sistema como `libglib-2.0.so.0`. Por ello no se atribuyen resultados E2E ni Lighthouse a esta revisión visual. Las cifras siguientes son del build Next anterior a los ajustes visuales y sirven solo de referencia. Es obligatorio repetir navegador, responsive, axe y Lighthouse en un entorno con dependencias de Chromium antes de aprobar el Deploy Preview.

Mediciones realizadas el 25 de septiembre de 2026 con Lighthouse 13.5.0, Chromium 153 y perfil móvil simulado. La medición nueva se ejecutó contra el build de producción servido localmente en `http://127.0.0.1:4173/`; la base se midió en la web pública `https://dianaloscoscoach.com/`. Son entornos distintos y sus tiempos de red no permiten atribuir mejoras de rendimiento con precisión. Los JSON completos quedaron en `reports/` local, excluido de Git.

| Medida | Web publicada (base) | Build nuevo local | Objetivo |
| --- | ---: | ---: | ---: |
| Performance | 99 | 99 | ≥90 |
| Accessibility | 85 | 100 | ≥95 |
| Best Practices | 100 | 100 | ≥95 |
| SEO | 100 | 100 | 100 |
| LCP de laboratorio | 1,6 s | 2,1 s | ≤2,5 s |
| CLS de laboratorio | 0 | 0 | ≤0,1 |
| Total Blocking Time | 0 ms | 10 ms | Indicador auxiliar |

Lighthouse de laboratorio no proporciona una medición de INP de campo; el objetivo ≤200 ms requiere datos reales tras el despliegue. La API pública de PageSpeed Insights devolvió 429 durante la primera auditoría; la medición se completó después con un navegador local aislado dentro de `/workspace`. Se optimizó el retrato real a JPEG de 19 KB antes de la medición final.

## Comprobaciones automatizadas

`npm ci`, `npm run lint`, `npm run typecheck`, `npm test` y `npm run build` pasan. Playwright ejecuta 32 comprobaciones de rutas P0/P1, metadata, canonical, JSON-LD, sitemap, robots, OG, 404, redirección de agradecimiento, enlaces internos, consola, 360/390/768/1024/1440 px, axe WCAG, teclado, movimiento reducido, eventos de reserva/visibilidad y formulario simulado. `npm test` cubre tres casos de validación del contacto. `npm audit fix` actualizó dependencias transitivas dentro del lockfile; `npm audit` quedó sin vulnerabilidades informadas.

También se construyó y sirvió una variante con `SITE_NOINDEX=true`: la home emitió `noindex, nofollow` y `/robots.txt` devolvió `Disallow: /`. Después se reconstruyó la variante normal.

## Pendientes de Deploy Preview

- Verificar la recepción real de Brevo con `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` y `BREVO_API_KEY` configuradas en Netlify. El test E2E simula la respuesta del proveedor para evitar enviar correos reales.
- Repetir Lighthouse y la suite contra la URL concreta del preview, verificar canonical de producción y adaptador OpenNext detectado por Netlify.
- Validar datos legales completos, política de privacidad y precios con Diana antes de publicar en producción. El [artículo 10 de la LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) exige información de identificación accesible que las fuentes públicas no permiten completar con seguridad.
- Sustituir el retrato de 356 × 402 px por una fotografía original de mayor resolución cuando esté disponible.
