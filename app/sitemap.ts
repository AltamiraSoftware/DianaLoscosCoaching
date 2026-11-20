import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/coaching-profesional/', '/coaching-personal-online/', '/cambio-profesional/', '/liderazgo-nuevos-managers/', '/coaching-ejecutivo/', '/sobre-mi/', '/contacto/', '/preguntas-frecuentes/', '/aviso-legal/', '/privacidad/', '/cookies/'];
  return paths.map(path => ({ url: absoluteUrl(path), changeFrequency: path === '/' ? 'monthly' : 'yearly', priority: path === '/' ? 1 : path.startsWith('/coaching-') || path === '/cambio-profesional/' ? 0.8 : 0.5 }));
}
