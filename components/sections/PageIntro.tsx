import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export function PageIntro({ eyebrow, title, children, name, path }: { eyebrow: string; title: string; children: ReactNode; name: string; path: string }) {
  return <><Breadcrumbs items={[{ name, path }]} /><section className="page-intro"><Container><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="page-intro-copy">{children}</div></Container></section></>;
}
