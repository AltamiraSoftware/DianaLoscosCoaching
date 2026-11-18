import interiorStyles from '@/app/Interior.module.css';
import Link from 'next/link';
import { PageIntro } from '@/components/sections/PageIntro';
import { ContactSection } from '@/components/sections/ContactSection';
import { CTASection, instagramReels } from '@/components/sections/CTASection';
import { FAQ } from '@/components/sections/FAQ';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { TrackView } from '@/components/motion/TrackView';
import { serviceSchema } from '@/lib/seo';
import { site } from '@/lib/site';
import type { ServiceContent } from '@/content/services';

export function ServiceLanding({ content }: { content: ServiceContent }) {
  return <>
    <JsonLd data={serviceSchema(content.name, content.description, content.path, content.serviceType)} />
    <TrackView event="service_view" label={content.name} />
    <PageIntro eyebrow={content.eyebrow} title={content.title} name={content.name} path={content.path}><p>{content.intro}</p><ButtonLink href={site.bookingUrl} external event="cta_booking_click" label={content.path}>{content.cta}</ButtonLink></PageIntro>
    <ContactSection />
    <section className="section section-mist"><Container className={`interior-grid ${interiorStyles['interior-grid']}`}><div className={`interior-copy ${interiorStyles['interior-copy']}`}><h2>{content.sectionTitle}</h2><p>{content.sectionText}</p></div><aside className={`interior-aside ${interiorStyles['interior-aside']}`}><h3>{content.situationTitle}</h3><ul>{content.situations.map(item => <li key={item}>{item}</li>)}</ul></aside></Container></section>
    <section className="section section-ivory"><Container><div className={`interior-copy ${interiorStyles['interior-copy']}`}><h2>{content.detailTitle}</h2><p>{content.detailText}</p></div><div className={`feature-list ${interiorStyles['feature-list']}`}>{content.features.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></Container></section>
    <section className="section section-mist"><Container className={`interior-grid ${interiorStyles['interior-grid']}`}><div className={`interior-copy ${interiorStyles['interior-copy']}`}><h2>También puede interesarte</h2><p>Si tu situación tiene otra forma, explora el acompañamiento que mejor la describe.</p></div><div className={`contact-options ${interiorStyles['contact-options']}`}>{content.related.filter(item => item.href !== content.path).map(item => <Link href={item.href} key={item.href}><span>{item.label}</span>{item.text}</Link>)}</div></Container></section>
    <FAQ items={content.faq} />
    <CTASection title={content.closingTitle} copy={content.closingText} reel={instagramReels.professional} />
  </>;
}
