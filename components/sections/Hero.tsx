import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { ButtonLink } from '@/components/ui/Button';
import { BrandLink } from '@/components/ui/BrandLink';
import { site } from '@/lib/site';

export function Hero() {
  return <section id="inicio" className="hero" aria-labelledby="hero-title"><Container className="hero-grid">
    <div className="hero-copy"><p className="eyebrow hero-stagger hero-stagger-1">Coaching profesional · Diana Loscos</p><h1 id="hero-title" className="hero-stagger hero-stagger-2">Aclara tu siguiente <em>paso profesional.</em></h1><p className="hero-lede hero-stagger hero-stagger-3">Si estás en un momento de cambio, bloqueo o decisión, trabajamos para ordenar lo que está pasando, identificar qué te frena y convertir la reflexión en acciones concretas.</p><div className="hero-actions hero-stagger hero-stagger-4"><ButtonLink href={site.bookingUrl} external event="cta_booking_click" label="hero">Reservar una sesión <ArrowIcon diagonal /></ButtonLink><BrandLink href="/#proceso">Ver cómo trabajo <ArrowIcon /></BrandLink></div><p className="hero-note hero-stagger hero-stagger-4">Sesiones online de 60 minutos · Reserva en Doctoralia</p><p className="hero-signoff hero-stagger hero-stagger-4">¿Empezamos?</p></div>
    <figure className="hero-portrait"><div className="portrait-frame"><Image src="/perfil.webp" alt="Retrato de Diana Loscos" width={356} height={402} loading="eager" fetchPriority="high" sizes="(max-width: 860px) 72vw, 356px" /></div><figcaption><span>Diana Loscos</span><span>Coaching profesional</span></figcaption></figure>
  </Container><div className="hero-baseline" aria-hidden="true" /></section>;
}
