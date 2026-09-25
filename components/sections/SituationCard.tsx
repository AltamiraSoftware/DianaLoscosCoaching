import Link from 'next/link';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

export function SituationCard({ number, title, description, href }: { number: string; title: string; description: string; href: string }) {
  return <Link href={href} className="situation-row"><span className="situation-number">{number}</span><span className="situation-content"><strong>{title}</strong><span>{description}</span></span><ArrowIcon diagonal /></Link>;
}
