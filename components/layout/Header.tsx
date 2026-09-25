'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { routes, site } from '@/lib/site';

const mainLinks = routes.filter(({ href }) => ['/coaching-profesional/', '/cambio-profesional/', '/sobre-mi/', '/opiniones/', '/contacto/'].includes(href));

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="container-site header-inner">
      <Link href="/" className="brand" aria-label="Diana Loscos, ir al inicio">
        <Image className="brand-mark" src="/logo_diana_square.png" alt="" width={42} height={42} />
        <span className="brand-copy"><span className="brand-name">Diana Loscos<span className="brand-dot">.</span></span>
        <span className="brand-descriptor">Coaching profesional</span></span>
      </Link>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {mainLinks.map(link => <Link key={link.href} href={link.href} className="nav-link" aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}
      </nav>
      <TrackedLink href={site.bookingUrl} external event="cta_booking_click" label="header" className="button button-primary header-cta">Reservar una sesión <ArrowIcon diagonal /></TrackedLink>
      <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
    <nav id="mobile-navigation" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label="Navegación móvil" inert={!open}>
      <div className="container-site mobile-nav-inner">
        {routes.filter(link => link.href !== '/').map(link => <Link key={link.href} href={link.href} className="mobile-nav-link" aria-current={pathname === link.href ? 'page' : undefined} onClick={() => setOpen(false)}>{link.label}<ArrowIcon diagonal /></Link>)}
        <TrackedLink href={site.bookingUrl} external event="cta_booking_click" label="mobile-menu" className="button button-primary">Reservar una sesión <ArrowIcon diagonal /></TrackedLink>
      </div>
    </nav>
  </header>;
}
