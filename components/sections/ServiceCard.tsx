import Link from 'next/link';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { TrackView } from '@/components/motion/TrackView';

export function ServiceCard({ eyebrow, title, description, href }: { eyebrow: string; title: string; description: string; href: string }) {
  return <article className="service-card"><TrackView event="service_view" label={title} /><p className="eyebrow">{eyebrow}</p><h3>{title}</h3><p>{description}</p><Link className="text-link" href={href}>Explorar servicio <ArrowIcon diagonal /></Link></article>;
}
