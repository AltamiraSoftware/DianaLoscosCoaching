import Link from 'next/link';
import { PageIntro } from '@/components/sections/PageIntro';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { CTASection } from '@/components/sections/CTASection';
import { Container } from '@/components/ui/Container';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { JsonLd } from '@/components/seo/JsonLd';
import { TrackView } from '@/components/motion/TrackView';
import { serviceSchema } from '@/lib/seo';
import { site } from '@/lib/site';
import type { ServiceContent } from '@/content/services';

export function ServiceLanding({ content }: { content: ServiceContent }) {
  return <>
    <JsonLd data={serviceSchema(content.name, content.description, content.path)} />
    <TrackView event="service_view" label={content.name} />
    <PageIntro eyebrow={content.eyebrow} title={content.title} name={content.name} path={content.path}><p>{content.intro}</p><TrackedLink href={site.bookingUrl} external event="cta_booking_click" label={content.path} className="button button-primary">Reservar una sesión <ArrowIcon diagonal /></TrackedLink></PageIntro>
    <section className="section section-mist"><Container className="interior-grid"><div className="interior-copy"><h2>{content.sectionTitle}</h2><p>{content.sectionText}</p></div><aside className="interior-aside"><h3>{content.situationTitle}</h3><ul>{content.situations.map(item => <li key={item}>{item}</li>)}</ul></aside></Container></section>
    <section className="section section-ivory"><Container><p className="eyebrow">En las sesiones</p><div className="feature-list">{content.features.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></Container></section>
    <ProcessSteps />
    <section className="section section-ivory"><Container className="interior-grid"><div className="interior-copy"><h2>También puede interesarte</h2><p>Si tu situación tiene otra forma, explora el acompañamiento que mejor la describe.</p></div><div className="contact-options"><Link href="/coaching-profesional/"><span>01</span>Coaching profesional</Link><Link href="/cambio-profesional/"><span>02</span>Cambio profesional</Link><Link href="/liderazgo-nuevos-managers/"><span>03</span>Liderazgo para nuevos managers</Link><Link href="/coaching-ejecutivo/"><span>04</span>Coaching ejecutivo</Link></div></Container></section>
    <CTASection title={content.closingTitle} copy={content.closingText} />
  </>;
}
