import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo';

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const full = [{ name: 'Inicio', path: '/' }, ...items];
  return <>
    <nav aria-label="Migas de pan" className="breadcrumbs"><Container><ol>{full.map((item, index) => <li key={item.path}>{index < full.length - 1 ? <Link href={item.path}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</li>)}</ol></Container></nav>
    <JsonLd data={breadcrumbSchema(full)} />
  </>;
}
