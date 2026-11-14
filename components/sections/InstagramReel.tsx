'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import styles from './InstagramReel.module.css';

export type Reel = { title: string; permalink: string };
type InstagramWindow = Window & { instgrm?: { Embeds?: { process: () => void } } };

export function InstagramReel({ reel, tone = 'dark', showTitle = true, showFallback = true }: { reel: Reel; tone?: 'light' | 'dark'; showTitle?: boolean; showFallback?: boolean }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [consent, setConsent] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  useEffect(() => {
    const read = () => setConsent(window.localStorage.getItem('external-content-consent') === 'accepted');
    const frame = window.requestAnimationFrame(read);
    window.addEventListener('diana:consent-change', read);
    window.addEventListener('storage', read);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('diana:consent-change', read); window.removeEventListener('storage', read); };
  }, []);
  useEffect(() => {
    const frame = frameRef.current;
    if (!consent || !frame || shouldLoad) return;
    if (!('IntersectionObserver' in window)) { const timer = setTimeout(() => setShouldLoad(true), 0); return () => clearTimeout(timer); }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect(); } }, { rootMargin: '300px 0px' });
    observer.observe(frame);
    return () => observer.disconnect();
  }, [consent, shouldLoad]);
  return <aside className={`${styles.reel} ${tone === 'light' ? styles.light : ''}`} aria-label={`Reel de Instagram: ${reel.title}`}>
    {showTitle && <p className={styles.title}>{reel.title}</p>}
    <div ref={frameRef} className={styles.frame}>{shouldLoad ? <blockquote className="instagram-media" data-instgrm-permalink={reel.permalink} data-instgrm-version="14"><a href={reel.permalink} target="_blank" rel="noopener noreferrer">{reel.title}</a></blockquote> : <button className={styles.poster} type="button" onClick={() => setShouldLoad(true)} aria-label={`Cargar reel: ${reel.title}`}><Image src="/perfil.webp" alt="" fill sizes="(max-width: 620px) 85vw, 380px" /><span className={styles.play} aria-hidden="true">▶</span><span className={styles.posterLabel}>Cargar reel</span></button>}</div>
    {showFallback && <a className={styles.fallback} href={reel.permalink} target="_blank" rel="noopener noreferrer">Ver reel en Instagram</a>}
    {shouldLoad && <Script id="instagram-embed-script" src="https://www.instagram.com/embed.js" strategy="afterInteractive" onReady={() => (window as InstagramWindow).instgrm?.Embeds?.process()} />}
  </aside>;
}
