'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon } from '@/components/ui/ChevronDownIcon';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { HeaderBrandLinks } from '@/components/layout/HeaderBrandLinks';

type Variant = 'desktop' | 'mobile';

type NavLink = { type: 'link'; label: string; href: string; detail?: string; mobileOnly?: boolean };
type NavDropdown = { type: 'dropdown'; id: string; label: string; children: readonly NavLink[] };
type NavItem = NavLink | NavDropdown;

const navigation: readonly NavItem[] = [
  { type: 'link', label: 'Inicio', href: '/' },
  {
    type: 'dropdown', id: 'coaching', label: 'Coaching profesional', children: [
      { type: 'link', label: 'Coaching profesional', href: '/coaching-profesional/', detail: 'Cambio, bloqueo y decisiones' },
      { type: 'link', label: 'Cambio profesional', href: '/cambio-profesional/', detail: 'Cuando algo ha cambiado en tu trabajo' },
      { type: 'link', label: 'Liderazgo para nuevos managers', href: '/liderazgo-nuevos-managers/', detail: 'Empiezas a liderar' },
      { type: 'link', label: 'Coaching ejecutivo', href: '/coaching-ejecutivo/', detail: 'Decisiones con responsabilidad' },
    ],
  },
  { type: 'link', label: 'Sobre mí', href: '/sobre-mi/' },
  { type: 'link', label: 'Opiniones', href: '/opiniones/' },
  { type: 'link', label: 'Preguntas frecuentes', href: '/preguntas-frecuentes/', mobileOnly: true },
  { type: 'link', label: 'Contacto', href: '/contacto/' },
];

const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';
const isRouteActive = (pathname: string, href: string) => {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  return current === target || (target !== '/' && current.startsWith(`${target}/`));
};
const isNavigationItemActive = (item: NavItem, pathname: string) => item.type === 'dropdown'
  ? item.children.some(child => isRouteActive(pathname, child.href))
  : isRouteActive(pathname, item.href);

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!openDropdown) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!dropdownRefs.current[openDropdown]?.contains(event.target as Node)) setOpenDropdown(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        triggerRefs.current[openDropdown]?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openDropdown]);

  useEffect(() => {
    const onPopState = () => {
      setOpenDropdown(null);
      setMobileOpen(false);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!mobileOpen || openDropdown) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, openDropdown]);

  const closeNavigation = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const renderNavigation = (variant: Variant) => navigation
    .filter(item => variant === 'mobile' || item.type === 'dropdown' || !item.mobileOnly)
    .map(item => {
      if (item.type === 'link') {
        const exact = normalizePath(pathname) === normalizePath(item.href);
        return <Link
          key={`${variant}-${item.href}`}
          href={item.href}
          className={variant === 'desktop' ? 'nav-link' : 'mobile-nav-link'}
          aria-current={exact ? 'page' : undefined}
          data-active={isRouteActive(pathname, item.href)}
          onClick={closeNavigation}
        >{item.label}</Link>;
      }

      const key = `${variant}-${item.id}`;
      const isOpen = openDropdown === key;
      const isActive = isNavigationItemActive(item, pathname);
      const selectedChild = item.children.find(child => isRouteActive(pathname, child.href));
      return <div
        key={key}
        ref={node => { dropdownRefs.current[key] = node; }}
        className={variant === 'desktop' ? 'nav-dropdown' : 'mobile-services'}
        data-nav-dropdown={key}
      >
        <button
          ref={node => { triggerRefs.current[key] = node; }}
          type="button"
          className={variant === 'desktop' ? 'nav-link nav-dropdown-trigger' : 'mobile-nav-link mobile-services-trigger'}
          aria-expanded={isOpen}
          aria-controls={`nav-${key}`}
          data-active={isActive}
          onClick={() => setOpenDropdown(current => current === key ? null : key)}
        >
          <span>{selectedChild?.label ?? item.label}</span>
          <ChevronDownIcon />
        </button>
        <div
          id={`nav-${key}`}
          className={variant === 'desktop' ? 'nav-dropdown-panel' : 'mobile-service-choices'}
          hidden={!isOpen}
        >
          {item.children.map(child => {
            const exact = normalizePath(pathname) === normalizePath(child.href);
            return <Link
              key={child.href}
              href={child.href}
              className={variant === 'desktop' ? 'nav-dropdown-link' : 'mobile-nav-link mobile-service-link'}
              aria-current={exact ? 'page' : undefined}
              data-active={isRouteActive(pathname, child.href)}
              onClick={closeNavigation}
            >
              <span>{child.label}</span>
              {child.detail && <small>{child.detail}</small>}
            </Link>;
          })}
        </div>
      </div>;
    });

  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="container-site header-inner">
      <Link href="/" className="brand" aria-label="Diana Loscos, ir al inicio" onClick={closeNavigation}>
        <Image className="brand-mark" src="/logo_diana_loscos.webp" alt="" width={116} height={75} />
      </Link>
      <nav className="desktop-nav" aria-label="Navegación principal">{renderNavigation('desktop')}</nav>
      <HeaderBrandLinks />
      <button
        ref={mobileToggleRef}
        type="button"
        className="menu-toggle"
        aria-expanded={mobileOpen}
        aria-controls="mobile-navigation"
        aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => { setMobileOpen(value => !value); setOpenDropdown(null); }}
      ><span /><span /></button>
    </div>
    <nav id="mobile-navigation" className={`mobile-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Navegación móvil" inert={!mobileOpen}>
      <div className="container-site mobile-nav-inner">
        {renderNavigation('mobile')}
      </div>
    </nav>
    <FloatingWhatsApp />
  </header>;
}
