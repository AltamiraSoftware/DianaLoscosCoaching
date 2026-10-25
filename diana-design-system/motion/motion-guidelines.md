# Motion y ritmo visual

La web debe sentirse editorial y calmada. El movimiento orienta la lectura; no debe pedir atención por sí mismo.

## Reglas

| Hacer | Evitar |
| --- | --- |
| Entrada sutil de un bloque al aparecer. | Parallax, scroll-jacking o elementos que persiguen al cursor. |
| Hover de 1 a 3 px en tarjeta o botón. | Rebotes, bucles, zooms agresivos y autoplays con audio. |
| Duraciones entre 150 y 420 ms. | Duraciones lentas que retrasen la lectura. |
| Respetar "prefers-reduced-motion". | Ocultar contenido si JavaScript falla. |

## Activación de reveals

Importa "motion.css" y usa este script una sola vez en la aplicación:

~~~
const items = document.querySelectorAll("[data-diana-reveal]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

items.forEach((item) => observer.observe(item));
~~~

En React, monta el mismo comportamiento en un efecto de cliente. No apliques la animación al header ni a los controles de navegación.

