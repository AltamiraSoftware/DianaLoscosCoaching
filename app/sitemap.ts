import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/coaching-profesional/', '/cambio-profesional/', '/liderazgo-nuevos-managers/', '/coaching-ejecutivo/', '/sobre-mi/', '/opiniones/', '/contacto/', '/preguntas-frecuentes/', '/aviso-legal/', '/privacidad/', '/cookies/'];
  return paths.map(path => ({ url: absoluteUrl(path), lastModified: new Date('2026-09-24'), changeFrequency: path === '/' ? 'monthly' : 'yearly', priority: path === '/' ? 1 : path.startsWith('/coaching-') || path === '/cambio-profesional/' ? 0.8 : 0.5 }));
}
