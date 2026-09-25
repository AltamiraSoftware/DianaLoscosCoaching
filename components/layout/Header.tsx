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
  const [mobileCoachingOpen, setMobileCoachingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const coachingRef = useRef<HTMLDivElement>(null);
  const coachingToggleRef = useRef<HTMLButtonElement>(null);
  const mobileCoachingToggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!coachingOpen && !mobileCoachingOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!coachingRef.current?.contains(event.target as Node)) setCoachingOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCoachingOpen(false);
        setMobileCoachingOpen(false);
        if (coachingOpen) coachingToggleRef.current?.focus();
        else mobileCoachingToggleRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [coachingOpen, mobileCoachingOpen]);
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="container-site header-inner">
      <Link href="/" className="brand" aria-label="Diana Loscos, ir al inicio">
        <Image className="brand-mark" src="/logo_diana_square.png" alt="" width={42} height={42} />
        <span className="brand-copy"><span className="brand-name">Diana Loscos<span className="brand-dot">.</span></span>
        <span className="brand-descriptor">Coaching profesional</span></span>
      </Link>
      <nav className="desktop-nav" aria-label="Navegación principal">
        <div ref={coachingRef} className={`nav-dropdown ${servicePaths.has(pathname) ? 'is-active' : ''}`}>
          <button ref={coachingToggleRef} type="button" className="nav-link nav-dropdown-trigger" aria-expanded={coachingOpen} aria-controls="coaching-navigation" onClick={() => setCoachingOpen(value => !value)}>Coaching profesional <span aria-hidden="true" className="nav-chevron" /></button>
          <div id="coaching-navigation" className={`nav-dropdown-panel ${coachingOpen ? 'is-open' : ''}`} inert={!coachingOpen}>
            {coachingChoices.map(choice => <Link key={choice.label} href={choice.href} className="nav-dropdown-link" aria-current={pathname === choice.href ? 'page' : undefined} onClick={() => setCoachingOpen(false)}><span>{choice.label}</span><small>{choice.detail}</small></Link>)}
          </div>
        </div>
        {mainLinks.map(link => <Link key={link.href} href={link.href} className="nav-link" aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}
      </nav>
      <TrackedLink href={site.bookingUrl} external event="cta_booking_click" label="header" className="button button-primary header-cta">Reservar una sesión <ArrowIcon diagonal /></TrackedLink>
      <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => { setOpen(!open); setMobileCoachingOpen(false); }}><span /><span /></button>
    </div>
    <nav id="mobile-navigation" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label="Navegación móvil" inert={!open}>
      <div className="container-site mobile-nav-inner">
        <div className="mobile-services"><button ref={mobileCoachingToggleRef} type="button" className="mobile-nav-link mobile-services-trigger" aria-expanded={mobileCoachingOpen} aria-controls="mobile-coaching-navigation" onClick={() => setMobileCoachingOpen(value => !value)}>Coaching profesional <span aria-hidden="true" className="nav-chevron" /></button><div id="mobile-coaching-navigation" className="mobile-service-choices" hidden={!mobileCoachingOpen}>{coachingChoices.map(choice => <Link key={choice.label} href={choice.href} className="mobile-nav-link" aria-current={pathname === choice.href ? 'page' : undefined} onClick={() => { setOpen(false); setMobileCoachingOpen(false); }}>{choice.label}<ArrowIcon diagonal /></Link>)}</div></div>
        {routes.filter(link => ['/sobre-mi/', '/opiniones/', '/preguntas-frecuentes/', '/contacto/'].includes(link.href)).map(link => <Link key={link.href} href={link.href} className="mobile-nav-link" aria-current={pathname === link.href ? 'page' : undefined} onClick={() => setOpen(false)}>{link.label}<ArrowIcon diagonal /></Link>)}
        <TrackedLink href={site.bookingUrl} external event="cta_booking_click" label="mobile-menu" className="button button-primary">Reservar una sesión <ArrowIcon diagonal /></TrackedLink>
      </div>
    </nav>
  </header>;
}
