import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

export type InstagramEmbedProps = {
  id: string;
  permalink: string;
  title: string;
  description: string;
};

function processInstagramEmbeds() {
  window.instgrm?.Embeds?.process();
}

export function InstagramEmbed({
  permalink,
  title,
  description
}: InstagramEmbedProps) {
  useEffect(() => {
    const scriptId = "instagram-embed-script";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", processInstagramEmbeds, { once: true });
      processInstagramEmbeds();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    script.onload = processInstagramEmbeds;
    document.body.appendChild(script);
  }, [permalink]);

  return (
    <article className="diana-instagram-card" aria-label={title}>
      <blockquote
        className="instagram-media"
        data-instgrm-captioned="true"
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
      >
        <a href={permalink} target="_blank" rel="noreferrer">
          Ver {title} en Instagram
        </a>
      </blockquote>
      <p className="diana-instagram-card__description">{description}</p>
    </article>
  );
}

