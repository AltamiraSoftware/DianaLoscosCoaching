import type { Metadata } from 'next';
import { services } from '@/content/services';
import { ServiceLanding } from '@/components/sections/ServiceLanding';
import { pageMetadata } from '@/lib/seo';
const content = services.leadership;
export const metadata: Metadata = pageMetadata(content.name, content.description, content.path);
export default function Page() { return <ServiceLanding content={content} />; }
