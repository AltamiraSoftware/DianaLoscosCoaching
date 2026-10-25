import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { SituationCard } from '@/components/sections/SituationCard';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { ContactSection } from '@/components/sections/ContactSection';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { DoctoraliaProof } from '@/components/sections/DoctoraliaProof';
import { PricingCard } from '@/components/sections/PricingCard';
import { FAQ } from '@/components/sections/FAQ';
import { CTASection, instagramReels } from '@/components/sections/CTASection';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { Container } from '@/components/ui/Container';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { pageMetadata } from '@/lib/seo';
import styles from './HomeServices.module.css';

export const metadata: Metadata = pageMetadata('Coaching profesional para momentos de cambio', 'Aclara tu siguiente paso profesional con Diana Loscos. Coaching online para ordenar decisiones, cambio profesional y nuevos retos de liderazgo.', '/');

export default function Home() {
  return <>
    <Hero />
    <ContactSection />
    <section id="para-quien" className="section section-ivory"><Container><MotionReveal><SectionHeading eyebrow="¿Te reconoces?" title="Hay momentos en los que seguir igual deja de ser una opción."><p>No hace falta tenerlo todo claro para empezar. A veces basta con saber que necesitas mirar tu situación de otra forma.</p></SectionHeading></MotionReveal><div className="situation-list"><SituationCard number="01" title="Algo ha cambiado en tu vida" description="Quieres entender lo que estás viviendo y qué necesitas ahora." href="/contacto/" /><SituationCard number="02" title="Estás ante una decisión" description="En lo personal o en el trabajo, buscas mirar tus opciones con más perspectiva." href="/contacto/" /><SituationCard number="03" title="Quieres avanzar en tu trabajo" description="Buscas dar un paso con intención ante un cambio profesional." href="/cambio-profesional/" /></div></Container></section>
    <ProcessSteps />
    <section id="sobre-mi" className="section section-about"><Container className="about-layout"><div className="about-image"><Image src="/perfil.webp" alt="Diana Loscos, coach profesional" width={356} height={402} loading="eager" sizes="(max-width: 760px) 75vw, 320px" /></div><div><p className="eyebrow">La persona detrás del proceso</p><h2>Hola, soy Diana.</h2><p>Me interesan las conversaciones que ayudan a mirar con honestidad lo que ocurre y a encontrar una forma de avanzar que encaje contigo.</p><p>Mi formación combina Psicología y Coaching Ejecutivo. Trabajo con personas que atraviesan cambios profesionales, decisiones difíciles o nuevas responsabilidades.</p><ButtonLink href="/sobre-mi/" variant="secondary">Conoce mi enfoque <ArrowIcon diagonal /></ButtonLink></div></Container></section>
    <DoctoraliaProof />
    <section className="section section-services"><Container><SectionHeading eyebrow="Formas de empezar" title="Una conversación, distintas situaciones." /><div className={`service-grid ${styles.grid}`}><ServiceCard eyebrow="01 / Núcleo" title="Coaching profesional" description="Para ordenar un bloqueo, una decisión o una etapa de cambio en tu trabajo." href="/coaching-profesional/" /><ServiceCard eyebrow="02 / Vida personal" title="Coaching personal" description="Para aclarar un bloqueo, una decisión o un cambio en tu vida y elegir un paso realista." href="/coaching-personal-online/" /><ServiceCard eyebrow="03 / Transición" title="Cambio profesional" description="Para explorar hacia dónde quieres moverte y qué primer paso tiene sentido." href="/cambio-profesional/" /><ServiceCard eyebrow="04 / Responsabilidad" title="Liderazgo y coaching ejecutivo" description="Para pensar tu manera de liderar y tomar decisiones con más criterio." href="/coaching-ejecutivo/" /></div></Container></section>
    <PricingCard />
    <FAQ />
    <CTASection reel={instagramReels.home} />
  </>;
}
