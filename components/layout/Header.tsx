'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { coachingChoices, routes, site } from '@/lib/site';

const mainLinks = routes.filter(({ href }) => ['/sobre-mi/', '/opiniones/', '/contacto/'].includes(href));
const servicePaths = new Set<string>(coachingChoices.map(({ href }) => href));

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [coachingOpen, setCoachingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const coachingRef = useRef<HTMLDivElement>(null);
  const coachingToggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!coachingOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!coachingRef.current?.contains(event.target as Node)) setCoachingOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCoachingOpen(false);
        coachingToggleRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [coachingOpen]);
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="container-site header-inner">
      <Link href="/" className="brand" aria-label="Diana Loscos, ir al inicio">
        <Image className="brand-mark" src="/logo_diana_square.png" alt="" width={42} height={42} />
        <span className="brand-copy"><span className="brand-name">Diana Loscos<span className="brand-dot">.</span></span>
        <span className="brand-descriptor">Coaching profesional</span></span>
      </Link>
      <nav className="desktop-nav" aria-label="Navegación principal">
        <div ref={coachingRef} className={`nav-dropdown ${servicePaths.has(pathname) ? 'is-active' : ''}`}>
          <Link href="/coaching-profesional/" className="nav-link" aria-current={pathname === '/coaching-profesional/' ? 'page' : undefined} onClick={() => setCoachingOpen(false)}>Coaching profesional</Link>
          <button ref={coachingToggleRef} type="button" className="nav-dropdown-toggle" aria-label="Mostrar opciones de coaching profesional" aria-expanded={coachingOpen} aria-controls="coaching-navigation" onClick={() => setCoachingOpen(value => !value)}><span aria-hidden="true" className="nav-chevron" /></button>
          <div id="coaching-navigation" className={`nav-dropdown-panel ${coachingOpen ? 'is-open' : ''}`} inert={!coachingOpen}>
            <p className="nav-dropdown-heading">Encuentra tu punto de partida</p>
            {coachingChoices.map(choice => <Link key={choice.label} href={choice.href} className="nav-dropdown-link" aria-current={pathname === choice.href ? 'page' : undefined} onClick={() => setCoachingOpen(false)}><span>{choice.label}</span><small>{choice.detail}</small></Link>)}
          </div>
        </div>
        {mainLinks.map(link => <Link key={link.href} href={link.href} className="nav-link" aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}
      </nav>
      <TrackedLink href={site.bookingUrl} external event="cta_booking_click" label="header" className="button button-primary header-cta">Reservar una sesión <ArrowIcon diagonal /></TrackedLink>
      <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
    <nav id="mobile-navigation" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label="Navegación móvil" inert={!open}>
      <div className="container-site mobile-nav-inner">
        <details className="mobile-services"><summary>Coaching profesional <span aria-hidden="true" className="nav-chevron" /></summary><div className="mobile-service-choices"><Link href="/coaching-profesional/" className="mobile-nav-link" aria-current={pathname === '/coaching-profesional/' ? 'page' : undefined} onClick={() => setOpen(false)}>Ver coaching profesional <ArrowIcon diagonal /></Link>{coachingChoices.map(choice => <Link key={choice.label} href={choice.href} className="mobile-nav-link" aria-current={pathname === choice.href ? 'page' : undefined} onClick={() => setOpen(false)}>{choice.label}<ArrowIcon diagonal /></Link>)}</div></details>
        {routes.filter(link => ['/sobre-mi/', '/opiniones/', '/preguntas-frecuentes/', '/contacto/'].includes(link.href)).map(link => <Link key={link.href} href={link.href} className="mobile-nav-link" aria-current={pathname === link.href ? 'page' : undefined} onClick={() => setOpen(false)}>{link.label}<ArrowIcon diagonal /></Link>)}
        <TrackedLink href={site.bookingUrl} external event="cta_booking_click" label="mobile-menu" className="button button-primary">Reservar una sesión <ArrowIcon diagonal /></TrackedLink>
      </div>
    </nav>
  </header>;
}
