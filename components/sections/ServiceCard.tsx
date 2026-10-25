import Link from 'next/link';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { TrackView } from '@/components/motion/TrackView';

export function ServiceCard({ eyebrow, title, description, href }: { eyebrow: string; title: string; description: string; href: string }) {
  return <Link href={href} className="service-card"><TrackView event="service_view" label={title} /><p className="eyebrow">{eyebrow}</p><h3>{title}</h3><p>{description}</p><span className="diana-text-link service-card-action">Conocer el servicio <ArrowIcon diagonal /></span></Link>;
}
