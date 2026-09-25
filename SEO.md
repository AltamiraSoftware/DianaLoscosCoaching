# Estrategia SEO y mapa de URL

La web responde primero a la intención «coaching profesional para momentos de cambio, bloqueo y decisión». Cada landing desarrolla una pregunta distinta, enlaza a páginas relacionadas y termina en una acción clara hacia Doctoralia. El contenido no presenta coaching como psicoterapia ni promete un resultado.

| Ruta canónica | Prioridad | Intención y contenido propio |
| --- | --- | --- |
| `/` | P0 | Posicionamiento general, situaciones, método, Diana, prueba social, servicios, precios y reserva. |
| `/coaching-profesional/` | P0 | Qué es el acompañamiento profesional, para quién sirve y cómo se trabaja. |
| `/cambio-profesional/` | P0 | Ordenar una transición laboral o decisión de carrera. |
| `/sobre-mi/` | P0 | Identidad, enfoque, formación y límites de la práctica, con fuentes. |
| `/opiniones/` | P0 | Extractos breves atribuidos a Doctoralia, contexto y enlace a opiniones completas. |
| `/contacto/` | P0 | Reserva, canales alternativos y formulario. |
| `/aviso-legal/`, `/privacidad/`, `/cookies/` | P0 | Documentos legales revisables por la titular, con URL propia. |
| `/liderazgo-nuevos-managers/` | P1 | Primeras responsabilidades de liderazgo y decisiones del nuevo manager. |
| `/coaching-ejecutivo/` | P1 | Trabajo individual de decisión y liderazgo para profesionales con responsabilidad. |
| `/preguntas-frecuentes/` | P1 | Respuestas prácticas sobre formato, reserva, precio y límites. |

Las rutas P1 solo se indexan si tienen contenido original suficiente. No publicar páginas vacías ni repetir texto de otra landing con palabras clave cambiadas. Si una queda en borrador, excluirla de navegación, sitemap e indexación y anotarlo en la entrega.

## Migración y redirecciones

| URL anterior | Destino o tratamiento |
| --- | --- |
| `/` | Permanece y cambia su intención principal. |
| `/#para-quien`, `/#que-es`, `/#que-trabajamos`, `/#proceso`, `/#sobre-mi`, `/#inversion`, `/#contacto` | Los fragmentos no llegan al servidor. Mantener anclas equivalentes en home cuando aporten continuidad, o enlaces visibles a las nuevas rutas. |
| `/gracias/` | Página de confirmación tras envío real del formulario, con `noindex`. |
| `/gracias.html` | Redirección permanente a `/gracias/`. |
| Vistas antiguas de aviso, privacidad, cookies, FAQ y ética | Nunca tuvieron URL propia; crear las rutas nuevas. El PDF del código ético permanece como activo histórico, pero no forma parte del recorrido actual. |
| `/* /index.html 200` | Eliminar: en Next las rutas desconocidas deben devolver 404 real. |

Usar barra final de forma coherente con `next.config.ts`, canonicals absolutos en `https://dianaloscoscoach.com`, `sitemap.ts` solo con rutas indexables y `robots.ts` con enlace al sitemap. Los fragmentos heredados de la home se conservan como anclas. El preview debe llevar `noindex` por configuración de entorno sin alterar el canonical de producción. Comprobar el estado HTTP de la redirección y la página 404 en la URL desplegada.

El [artículo 10 de la LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) requiere información de identificación accesible. Antes de producción, la titular debe completar y validar los datos de identificación y domicilio que no son verificables con las fuentes públicas. El aviso legal actual conserva únicamente la información publicada en la web original y queda pendiente de esa revisión.

## Metadata y datos estructurados

Cada ruta indexable define `title`, descripción, canonical, OG y Twitter propios; H1 único y secuencia semántica de encabezados. Los enlaces internos usan texto descriptivo, las imágenes tienen alt útil y los breadcrumbs coinciden con la jerarquía visible.

JSON-LD previsto: `Person` para Diana, `WebSite` para el sitio, `Service` en landings de servicio y `BreadcrumbList` en páginas interiores. `LocalBusiness` solo si los datos de negocio requeridos están públicamente verificados. No generar `AggregateRating` autocontrolado ni FAQ schema solo para reclamar rich results. Las opiniones son citas públicas breves atribuidas a [Doctoralia](https://www.doctoralia.es/diana-loscos-ortega/psicologo-terapeuta-complementario/madrid), sin convertirlas en resultados garantizados.

## Control editorial

- Revisar precios y disponibilidad frente a [Doctoralia](https://www.doctoralia.es/diana-loscos-ortega/psicologo-terapeuta-complementario/madrid) y la [web oficial](https://dianaloscoscoach.com/) antes de publicar. Centralizar datos en `lib/site.ts`.
- Doctoralia confirma grado en Psicología, formación en coaching ejecutivo y número de colegiación M-45396. No llamar «ACC acreditada» a una preparación o candidatura.
- [LinkedIn](https://www.linkedin.com/in/diana-loscos-ortega-68b184214/) e [Instagram](https://www.instagram.com/dianaloscoscoach/) son enlaces públicos; el rastreo de su contenido quedó bloqueado y no fundamenta claims editoriales.
- Las referencias [María Arredondo](https://www.mariaarredondo.com/) y [Bienpro](https://bienpro.es/) solo inspiran estructura y recorrido. No copiar activos ni afirmar que sus métricas aplican a esta web.
- Validar JSON-LD, sitemap, robots, enlaces internos y metadata contra el HTML servido, además de revisar Search Console después del despliegue autorizado.
