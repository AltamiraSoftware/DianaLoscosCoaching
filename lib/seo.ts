import type { Metadata } from 'next';
import { absoluteUrl, site } from '@/lib/site';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website', locale: 'es_ES', siteName: site.name,
      title, description, url: canonical,
      images: [{ url: absoluteUrl('/opengraph-image'), width: 1200, height: 630, alt: 'Diana Loscos, coaching profesional' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [absoluteUrl('/opengraph-image')] },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org', '@type': 'Service',
    name, description, url: absoluteUrl(path),
    serviceType: 'Coaching profesional',
    provider: { '@type': 'Person', '@id': absoluteUrl('/sobre-mi/#diana'), name: site.name },
    areaServed: { '@type': 'Country', name: 'España' },
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: site.bookingUrl },
  };
}
