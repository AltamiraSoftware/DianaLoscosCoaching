# Checklist SEO y técnico

## Producción y rastreo

- Canonical: "https://www.dianaloscoscoach.com/".
- og:url: misma URL canónica.
- Redirección permanente desde el dominio de Vercel temporal hacia el dominio final.
- Staging con "noindex" mientras no sea producción.
- Un sitemap XML que incluya solo URLs indexables.
- Robots.txt que no bloquee CSS, imágenes ni páginas públicas importantes.

## Title y description de la home

Propuesta inicial:

~~~
Title
Diana Loscos | Coaching personal y profesional en Madrid

Description
Coaching con base en Psicología para ordenar cambios, decisiones y próximos pasos. Sesiones online con Diana Loscos, psicóloga colegiada en Madrid.
~~~

Revisar longitud final en el código y no duplicar el title de las futuras páginas de servicio.

## Arquitectura de páginas

| URL | Intención principal | Contenido mínimo |
| --- | --- | --- |
| / | Coaching personal y profesional | Propuesta, proceso, credenciales, prueba social y CTA. |
| /coaching-profesional | Coaching profesional | Bloqueo, decisiones, objetivos y modalidad. |
| /cambio-profesional | Cambio profesional | Transición, prioridades y toma de decisión. |
| /liderazgo-nuevos-managers | Liderazgo | Nueva responsabilidad, conversaciones y criterio. |
| /sobre-diana | Credenciales y enfoque | Formación, colegiación y límites del servicio. |

## Datos estructurados

- Usar Person o ProfessionalService con información que pueda verificarse.
- Incluir nombre, URL, correo profesional, perfiles sociales y área atendida solo si son correctos.
- No marcar testimonios como aggregateRating si no se cumplen los requisitos de Google.

## Conversión y medición

Medir como eventos distintos:

- Clic de WhatsApp.
- Clic de Doctoralia.
- Envío de formulario, si existe.
- Clic para abrir Instagram o interacción con Reel.

Etiquetar campañas de Instagram y Meta con UTM. No usar datos personales o sensibles en eventos ni en nombres de audiencia.

## Rendimiento

- Reservar dimensiones para imagen de perfil y vídeos.
- Lazy-load de embeds de Instagram fuera del hero.
- Mantener imágenes WebP/AVIF y texto alternativo descriptivo.
- Validar móvil con conexiones lentas antes de publicar.

