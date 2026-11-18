import { home } from '@/content/home';
import homeStyles from './HomeSections.module.css';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { SituationCard } from '@/components/sections/SituationCard';
import { HomeContactForm, HomeClosing } from '@/components/sections/HomeContact';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { DoctoraliaProof } from '@/components/sections/DoctoraliaProof';
import { PricingCard } from '@/components/sections/PricingCard';
import { FAQ } from '@/components/sections/FAQ';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { pageMetadata } from '@/lib/seo';
import styles from './HomeServices.module.css';

const ABOUT_PHOTO = '/perfil.webp';

export const metadata: Metadata = pageMetadata(home.seo.title, home.seo.description, '/');

export default function Home() {
  return <>
    <Hero />
    <HomeContactForm />
    <section id="para-quien" className={`section ${homeStyles.situations}`}><Container><MotionReveal><SectionHeading eyebrow={home.situations.eyebrow} title={home.situations.title} tone="light"><p>{home.situations.description}</p></SectionHeading></MotionReveal><div className={homeStyles.situationsGrid}>{home.situations.cards.map(card => <SituationCard key={card.number} {...card} homeStyle />)}</div><p className={homeStyles.situationsClosing}>{home.situations.closing}</p></Container></section>
    <Benefits />
    <section id="sobre-mi" className={`section ${homeStyles.aboutNew}`}><Container className={homeStyles.aboutNewLayout}><div className={homeStyles.aboutPortrait} data-scroll-reveal="about-photo"><Image src={ABOUT_PHOTO} alt="Diana Loscos, psicóloga y coach" width={500} height={500} sizes="(max-width: 620px) 75vw, 360px" /></div><div data-scroll-reveal="about-copy"><p className={homeStyles.aboutEyebrow}>{home.about.eyebrow}</p><h2>{home.about.title}</h2>{home.about.paragraphs.map((paragraph, index) => <p key={paragraph} className={index === 0 ? homeStyles.aboutLead : homeStyles.aboutText}>{paragraph}</p>)}<ButtonLink href={home.about.href} variant="onDark">{home.about.action}</ButtonLink></div></Container></section>
    <DoctoraliaProof />
    <section className={`section ${styles.services}`}><Container><SectionHeading eyebrow={home.services.eyebrow} title={home.services.title} tone="light"><p>{home.services.description}</p></SectionHeading><div className={`service-grid ${homeStyles['service-grid']} ${styles.grid}`}>{home.services.cards.map((card, index) => <ServiceCard key={card.number} eyebrow={card.number} title={card.title} description={card.description} href={card.href} homeStyle featured={index === 0} />)}</div></Container></section>
    <PricingCard />
    <FAQ />
    <HomeClosing />
  </>;
}
