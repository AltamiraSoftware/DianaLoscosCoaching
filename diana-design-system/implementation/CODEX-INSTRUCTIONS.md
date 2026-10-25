# Instrucciones para el editor de código

Lee este archivo antes de modificar la landing.

## Objetivo

Ampliar la web de Diana Loscos con coherencia de marca y conversión, sin reescribirla ni sustituir el header actual.

## Prioridades no negociables

1. Leer "components/header-contract.md". El header está bloqueado.
2. No cambiar la estructura existente salvo los bloques indicados en "landing-change-brief.md".
3. Usar los tokens de "brand/tokens.css"; no introducir colores nuevos.
4. Añadir clases prefijadas "diana-" para los componentes nuevos.
5. Respetar preferencia de reducción de movimiento.
6. No añadir dependencias de UI, sliders ni librerías de animación sin justificarlo.
7. No introducir promesas de resultado ni lenguaje de terapia.

## Orden de implementación

1. Crear una rama y revisar el header en desktop y móvil.
2. Importar las hojas CSS de este kit en orden.
3. Aplicar el brief de la landing sin tocar el markup del header.
4. Añadir la sección de reels solo después de recibir URLs públicas reales.
5. Aplicar canonical, metadata y eventos de conversión.
6. Comprobar enlaces, teclado, responsive y rendimiento.

## Revisión de PR

- Indicar exactamente qué archivos se modificaron.
- Mostrar una comparación visual de móvil y desktop.
- Verificar que los enlaces de WhatsApp y Doctoralia siguen funcionando.
- Verificar que "Psicóloga · Col. M-45396" y el disclaimer aparecen donde corresponde.
- Confirmar que no hay clases o selectores globales que afecten ".site-header", ".brand", ".desktop-nav", ".header-wa" o ".header-cta".

## Prompt de arranque sugerido

~~~
Lee diana-design-system/implementation/CODEX-INSTRUCTIONS.md y
diana-design-system/components/header-contract.md. Implementa únicamente la
Fase 1 de diana-design-system/implementation/landing-change-brief.md.
No modifiques el header ni sus clases. Usa los tokens y clases diana- del kit.
Al terminar, lista los archivos modificados y explica cómo has verificado móvil,
accesibilidad y enlaces.
~~~

