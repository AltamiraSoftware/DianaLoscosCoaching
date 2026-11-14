'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './AnalyticsConsent.module.css';

const gaId = process.env.NEXT_PUBLIC_GA_ID;

function loadAnalytics() {
  if (!gaId || document.getElementById('ga-script')) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => { window.dataLayer?.push(args); };
  window.gtag('js', new Date());
  window.gtag('config', gaId, { anonymize_ip: true });
  const script = document.createElement('script');
  script.id = 'ga-script';
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  script.async = true;
  document.head.appendChild(script);
}

export function AnalyticsConsent() {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [external, setExternal] = useState(false);
  useEffect(() => {
    const savedAnalytics = window.localStorage.getItem('analytics-consent');
    const savedExternal = window.localStorage.getItem('external-content-consent');
    if (savedAnalytics === 'accepted') loadAnalytics();
    const frame = window.requestAnimationFrame(() => {
      setAnalytics(savedAnalytics === 'accepted');
      setExternal(savedExternal === 'accepted');
      setVisible(savedAnalytics === null || savedExternal === null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const save = (allowAnalytics: boolean, allowExternal: boolean) => {
    window.localStorage.setItem('analytics-consent', allowAnalytics ? 'accepted' : 'rejected');
    window.localStorage.setItem('external-content-consent', allowExternal ? 'accepted' : 'rejected');
    if (allowAnalytics) loadAnalytics();
    window.dispatchEvent(new Event('diana:consent-change'));
    setVisible(false);
  };
  if (!visible) return null;
  return <aside className={styles.banner} aria-label="Preferencias de privacidad"><p>Elige si permites la analítica y el contenido externo de Instagram. Puedes cargar cada reel sin aceptar todos. <Link href="/cookies/">Más información</Link>.</p><div className={styles.choices}><label><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /> Analítica</label><label><input type="checkbox" checked={external} onChange={event => setExternal(event.target.checked)} /> Contenido externo</label></div><div className={styles.actions}><Button type="button" variant="secondary" onClick={() => save(false, false)}>Rechazar todo</Button><Button type="button" variant="secondary" onClick={() => save(analytics, external)}>Guardar preferencias</Button><Button type="button" onClick={() => save(true, true)}>Aceptar todo</Button></div></aside>;
}
