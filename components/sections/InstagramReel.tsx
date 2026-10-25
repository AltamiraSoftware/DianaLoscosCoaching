'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import styles from './InstagramReel.module.css';

export type Reel = {
  title: string;
  permalink: string;
};

type InstagramWindow = Window & {
  instgrm?: { Embeds?: { process: () => void } };
};

export function InstagramReel({ reel }: { reel: Reel }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (!('IntersectionObserver' in window)) {
      const timer = setTimeout(() => setShouldLoad(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '300px 0px' });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return <aside className={styles.reel} aria-label={`Reel de Instagram: ${reel.title}`}>
    <p className={styles.label}>Una reflexión de Diana</p>
    <p className={styles.title}>{reel.title}</p>
    <div ref={frameRef} className={styles.frame}>
      {shouldLoad && <blockquote
        className="instagram-media"
        data-instgrm-permalink={reel.permalink}
        data-instgrm-version="14"
      >
        <a href={reel.permalink} target="_blank" rel="noopener noreferrer">{reel.title}</a>
      </blockquote>}
    </div>
    <a className={styles.fallback} href={reel.permalink} target="_blank" rel="noopener noreferrer">
      Ver reel en Instagram
    </a>
    {shouldLoad && <Script
      id="instagram-embed-script"
      src="https://www.instagram.com/embed.js"
      strategy="afterInteractive"
      onReady={() => (window as InstagramWindow).instgrm?.Embeds?.process()}
    />}
  </aside>;
}
