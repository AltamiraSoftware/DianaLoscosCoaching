# Integración de vídeos de Instagram

## Regla de selección

Integrar solo 1 a 3 reels en la home. Deben completar el mensaje de la sección, no sustituirlo. La recomendación es colocarlos después de "Cómo trabajo" o en una sección propia antes de las opiniones.

Cada vídeo debe responder a una de estas funciones:

1. Cómo es una sesión online.
2. Una reflexión breve sobre claridad, cambio o decisión.
3. Una explicación del proceso de coaching y sus límites.

## Reels seleccionados

La configuración ya incluye tres piezas y el orden responde a una secuencia editorial:

1. "Empezar aunque haya miedo": presentación humana de Diana y del origen del contenido.
2. "Del “tengo que” a la acción": reflexión útil y reconocible para la persona que está bloqueada.
3. "Suelta y confía": cierre emocional y llamada a dar un primer paso.

Antes de publicar, confirmar que los tres reels siguen siendo públicos.

Formato válido: "https://www.instagram.com/reel/IDENTIFICADOR/".

No usar el enlace al perfil ni incrustar un vídeo privado. Las URLs configuradas no incluyen el parámetro temporal "stkn", para que el embed use el enlace canónico de Instagram. Si un Reel deja de ser público, el enlace de reserva sigue permitiendo abrirlo en Instagram.

## Implementación recomendada

Para React/Vite, copiar "InstagramEmbed.tsx", importar "instagram.css" y definir los vídeos reales en "reels.example.ts". El componente usa el embed oficial de Instagram y carga el script una sola vez.

Ejemplo de uso:

~~~
import { InstagramEmbed } from "./InstagramEmbed";
import { reels } from "./reels";
import "./instagram.css";

export function ReelsSection() {
  return (
    <section aria-labelledby="reels-title">
      <p className="diana-type-eyebrow">En vídeo</p>
      <h2 id="reels-title" className="diana-type-heading-lg">
        Una forma de conocer cómo trabajo.
      </h2>
      <div className="diana-instagram-grid">
        {reels.slice(0, 3).map((reel) => (
          <InstagramEmbed key={reel.id} {...reel} />
        ))}
      </div>
    </section>
  );
}
~~~

## Criterios de UX y privacidad

- Nunca usar reproducción automática con sonido.
- Mostrar una sola fila en desktop y una columna en móvil.
- Mantener un enlace visible a Instagram por si el embed no carga.
- Cargar los embeds fuera del hero: no deben retrasar el contenido principal.
- Si se usan vídeos descargados con autorización en lugar del embed, usar un elemento "video" con poster, controles y subtítulos cuando haya voz.

