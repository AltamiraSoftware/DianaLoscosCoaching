# Diana Loscos · kit de diseño e implementación

Este kit permite ampliar la landing actual sin convertirla en otro proyecto ni rediseñar el header. Está pensado para colocarlo en la raíz del repositorio y usarlo como fuente de verdad antes de pedir cambios a un editor asistido por código.

## Decisiones que ya respeta

- El header actual se conserva: logo, icono de marca, navegación, botón de WhatsApp, CTA de Doctoralia, comportamiento sticky y menú móvil.
- Se mantiene la base editorial de la página: hero, situaciones, proceso, perfil, opiniones, servicios, precios, FAQ y contacto.
- La landing se amplía para cubrir desarrollo personal y profesional, sin perder las palabras clave y servicios profesionales que aportan claridad SEO.
- El sistema visual usa petróleo, arcilla, marfil y tinta; no añade una segunda identidad visual.
- Los reels se integran de forma progresiva cuando estén disponibles sus enlaces públicos.

## Cómo incorporarlo

1. Copia esta carpeta al repositorio, idealmente como "diana-design-system/".
2. Lee primero "implementation/CODEX-INSTRUCTIONS.md" y "components/header-contract.md".
3. Importa los CSS en este orden desde el entrypoint de estilos del proyecto:

~~~
@import "./diana-design-system/brand/tokens.css";
@import "./diana-design-system/brand/typography.css";
@import "./diana-design-system/components/buttons-links.css";
@import "./diana-design-system/components/cards.css";
@import "./diana-design-system/motion/motion.css";
~~~

4. Haz los cambios de la home siguiendo "implementation/landing-change-brief.md".
5. Para React o Vite, usa "instagram/InstagramEmbed.tsx" y rellena las URLs en "instagram/reels.example.ts".

Los selectores están prefijados con "diana-" para no contaminar los estilos existentes. No hay resets globales ni reglas que alteren el header.

## Estructura

~~~
diana-design-system/
├── brand/             Tokens, tipografía y reglas de marca
├── components/        Contrato de header, botones y tarjetas
├── motion/            Animación discreta y accesible
├── instagram/         Integración de reels públicos
├── implementation/    Roadmap, SEO y reglas para el editor
└── examples/          Vista estática de componentes
~~~

## Orden recomendado

| Fase | Resultado |
| --- | --- |
| 1. Base y confianza | Header intacto, credenciales visibles, aviso de alcance del coaching y dominio/canonical correctos. |
| 2. Mensaje de la home | Hero y situaciones alineados con lo personal y profesional; proceso más claro. |
| 3. Sistema visual | Tokens, tipografía, tarjetas y motion aplicados sin romper la página. |
| 4. Contenido enriquecido | Reels seleccionados, fotos reales y páginas de servicio cuando se aprueben. |

## Pendiente para los vídeos

Se necesitan los enlaces públicos de cada Reel o publicación de Instagram. No basta el enlace al perfil. Cuando se tengan, sustituye los valores de ejemplo y valida que cada publicación sea pública.

