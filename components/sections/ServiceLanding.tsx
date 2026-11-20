import interiorStyles from '@/app/Interior.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { ContactSection } from '@/components/sections/ContactSection';
import { Credentials } from '@/components/sections/Credentials';
import { CTASection, instagramReels } from '@/components/sections/CTASection';
import { FAQ } from '@/components/sections/FAQ';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { TrackView } from '@/components/motion/TrackView';
import { serviceSchema } from '@/lib/seo';
import { site } from '@/lib/site';
import type { ServiceContent } from '@/content/services';
import styles from './ServiceLanding.module.css';

const googleBusinessDescription = 'Soy Diana Loscos, psicóloga y coach de desarrollo personal y profesional. Acompaño online, en sesiones 1:1 de 60 minutos, a personas que han conseguido lo que se proponían y sienten que algo falta, que están ante una decisión o un cambio, o que llevan tiempo dándole vueltas a todo sin fuerzas.';

export function ServiceLanding({ content }: { content: ServiceContent }) {
  return <>
    <JsonLd data={serviceSchema(content.name, content.description, content.path, content.serviceType)} />
    <TrackView event="service_view" label={content.name} />
    <Breadcrumbs items={[{ name: content.name, path: content.path }]} />
    <section className={styles.hero} aria-labelledby="service-hero-title"><Container className={styles.heroLayout}><div className={styles.heroCopy}><p className="eyebrow">{content.eyebrow}</p><h1 id="service-hero-title">{content.title}</h1><div className={styles.heroDescription}><p>{googleBusinessDescription}</p></div><ButtonLink href={site.bookingUrl} external event="cta_booking_click" label={content.path}>{content.cta}</ButtonLink></div><figure className={styles.portrait}><Image src="/perfil.webp" alt="Diana Loscos, psicóloga y coach" width={356} height={402} priority sizes="(max-width: 860px) 84vw, 32vw" /><figcaption>Diana Loscos <span>{content.serviceType}</span></figcaption></figure></Container></section>
    <ContactSection />
    <section className="section section-mist"><Container className={styles.serviceSection}><div className={`interior-copy ${interiorStyles['interior-copy']} ${styles.sectionHeading}`}><h2>{content.sectionTitle}</h2><p>{content.sectionText}</p></div><aside className={`interior-aside ${interiorStyles['interior-aside']} ${styles.sectionCard}`}><h3>{content.situationTitle}</h3><ul>{content.situations.map(item => <li key={item}>{item}</li>)}</ul></aside></Container></section>
    <section className="section section-ivory"><Container><div className={`interior-copy ${interiorStyles['interior-copy']} ${styles.sectionHeading}`}><h2>{content.detailTitle}</h2><p>{content.detailText}</p></div><div className={`feature-list ${interiorStyles['feature-list']}`}>{content.features.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></Container></section>
    <section className="section section-ivory"><Container className={styles.aboutDiana}><figure className={styles.aboutPortrait}><Image src="/sOY-DIANA.jpeg" alt="Diana Loscos" width={1080} height={1356} sizes="(max-width: 860px) 78vw, 340px" /><figcaption>Diana Loscos <span>Psicóloga y coach</span></figcaption></figure><div className={`interior-copy ${interiorStyles['interior-copy']} ${styles.aboutCopy}`}><p className="eyebrow">Sobre Diana</p><h2>Formación para acompañar con rigor y cercanía.</h2><p>Diana combina la escucha y las preguntas propias del coaching con una formación continua que aporta estructura a cada proceso.</p><Credentials /></div></Container></section>
    <section className="section section-mist"><Container className={styles.serviceSection}><div className={`interior-copy ${interiorStyles['interior-copy']} ${styles.sectionHeading}`}><h2>También puede interesarte</h2><p>Si tu situación tiene otra forma, explora el acompañamiento que mejor la describe.</p></div><div className={`contact-options ${interiorStyles['contact-options']} ${styles.relatedCards}`}>{content.related.filter(item => item.href !== content.path).map(item => <Link href={item.href} key={item.href}><span>{item.label}</span>{item.text}</Link>)}</div></Container></section>
    <FAQ items={content.faq} center />
    <CTASection title={content.closingTitle} copy={content.closingText} reel={instagramReels.professional} />
  </>;
}
