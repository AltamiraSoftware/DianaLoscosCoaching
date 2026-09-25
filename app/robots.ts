import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: process.env.SITE_NOINDEX === 'true' ? undefined : '/', disallow: process.env.SITE_NOINDEX === 'true' ? '/' : ['/api/', '/gracias/'] }, sitemap: absoluteUrl('/sitemap.xml') };
}
