'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

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
  const [choice, setChoice] = useState<string | null>('pending');
  useEffect(() => {
    if (!gaId) return;
    const saved = window.localStorage.getItem('analytics-consent');
    const frame = window.requestAnimationFrame(() => setChoice(saved));
    if (saved === 'accepted') loadAnalytics();
    return () => window.cancelAnimationFrame(frame);
  }, []);
  if (!gaId || choice !== null) return null;
  const choose = (value: 'accepted' | 'rejected') => {
    window.localStorage.setItem('analytics-consent', value);
    setChoice(value);
    if (value === 'accepted') loadAnalytics();
  };
  return <aside className="cookie-banner" aria-label="Preferencias de analítica"><p>¿Nos permites medir el uso de esta web para mejorarla? Solo activamos la analítica si aceptas. <Link href="/cookies/">Más información</Link>.</p><div><Button type="button" variant="secondary" onClick={() => choose('rejected')}>Rechazar</Button><Button type="button" onClick={() => choose('accepted')}>Aceptar</Button></div></aside>;
}
