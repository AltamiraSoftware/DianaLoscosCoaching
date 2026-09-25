import type { Metadata, Viewport } from 'next';
import { Manrope, Newsreader } from 'next/font/google';
import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnalyticsConsent } from '@/components/layout/AnalyticsConsent';
import { JsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl, site } from '@/lib/site';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Diana Loscos | Coaching profesional', template: '%s | Diana Loscos' },
  description: site.description,
  applicationName: site.name,
  robots: { index: process.env.SITE_NOINDEX !== 'true', follow: process.env.SITE_NOINDEX !== 'true' },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#F7F3EB' };

export default function RootLayout({ children }: { children: ReactNode }) {
  const person = { '@context': 'https://schema.org', '@type': 'Person', '@id': absoluteUrl('/sobre-mi/#diana'), name: site.name, url: site.url, image: absoluteUrl('/perfil.jpg'), jobTitle: 'Coach profesional', email: site.email, sameAs: [site.bookingUrl, site.linkedinUrl, site.instagramUrl], knowsAbout: ['Coaching profesional', 'Coaching ejecutivo', 'Cambio profesional'] };
  const website = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: site.name, url: site.url, inLanguage: 'es-ES', publisher: { '@id': absoluteUrl('/sobre-mi/#diana') } };
  return <html lang="es" data-scroll-behavior="smooth" className={`${manrope.variable} ${newsreader.variable}`}><body><a className="skip-link" href="#main">Saltar al contenido</a><Header /><main id="main">{children}</main><Footer /><AnalyticsConsent /><JsonLd data={[person, website]} /></body></html>;
}
