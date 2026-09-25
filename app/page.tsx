import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { SituationCard } from '@/components/sections/SituationCard';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { DoctoraliaProof } from '@/components/sections/DoctoraliaProof';
import { PricingCard } from '@/components/sections/PricingCard';
import { FAQ } from '@/components/sections/FAQ';
import { CTASection } from '@/components/sections/CTASection';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { Container } from '@/components/ui/Container';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Coaching profesional para momentos de cambio', 'Aclara tu siguiente paso profesional con Diana Loscos. Coaching online para ordenar decisiones, cambio profesional y nuevos retos de liderazgo.', '/');

export default function Home() {
  return <>
    <Hero />
    <TrustStrip />
    <section id="para-quien" className="section section-ivory"><Container><MotionReveal><SectionHeading eyebrow="¿Te reconoces?" title="Hay momentos en los que seguir igual deja de ser una opción."><p>No hace falta tenerlo todo claro para empezar. A veces basta con saber que necesitas mirar tu situación de otra forma.</p></SectionHeading></MotionReveal><div className="situation-list"><SituationCard number="01" title="Algo ha cambiado en tu trabajo" description="Quieres dar un paso, pero todavía no sabes hacia dónde." href="/cambio-profesional/" /><SituationCard number="02" title="Te cuesta tomar una decisión" description="Das vueltas a las opciones y te falta una forma de ordenar lo importante." href="/coaching-profesional/" /><SituationCard number="03" title="Empiezas a liderar" description="Tu rol ha crecido y buscas una manera propia de ejercerlo." href="/liderazgo-nuevos-managers/" /></div></Container></section>
    <section id="que-trabajamos" className="section section-work"><Container className="work-layout"><MotionReveal><SectionHeading eyebrow="Lo que trabajamos" title="Del ruido de las ideas a una dirección propia."><p>La conversación se enfoca en tu realidad profesional: tus decisiones, relaciones, prioridades y próximos movimientos.</p></SectionHeading></MotionReveal><div id="que-es" className="work-list"><div><span>01 / Claridad</span><h3>Entender lo que pasa</h3><p>Separar hechos, expectativas y dudas para mirar tu situación con más perspectiva.</p></div><div><span>02 / Criterio</span><h3>Elegir desde lo importante</h3><p>Reconocer qué necesitas y qué opciones son coherentes con tus valores y contexto.</p></div><div><span>03 / Acción</span><h3>Dar un paso posible</h3><p>Definir una acción concreta, observar qué ocurre y ajustar el camino.</p></div></div></Container></section>
    <ProcessSteps />
    <section id="sobre-mi" className="section section-about"><Container className="about-layout"><div className="about-image"><Image src="/perfil.jpg" alt="Diana Loscos, coach profesional" width={356} height={402} loading="eager" sizes="(max-width: 760px) 75vw, 320px" /></div><div><p className="eyebrow">La persona detrás del proceso</p><h2>Hola, soy Diana.</h2><p>Me interesan las conversaciones que ayudan a mirar con honestidad lo que ocurre y a encontrar una forma de avanzar que encaje contigo.</p><p>Mi formación combina Psicología y Coaching Ejecutivo. Trabajo con personas que atraviesan cambios profesionales, decisiones difíciles o nuevas responsabilidades.</p><Link href="/sobre-mi/" className="text-link">Conoce mi enfoque <ArrowIcon diagonal /></Link></div></Container></section>
    <DoctoraliaProof />
    <section className="section section-services"><Container><SectionHeading eyebrow="Formas de empezar" title="Una conversación, distintas situaciones." /><div className="service-grid"><ServiceCard eyebrow="01 / Núcleo" title="Coaching profesional" description="Para ordenar un bloqueo, una decisión o una etapa de cambio en tu trabajo." href="/coaching-profesional/" /><ServiceCard eyebrow="02 / Transición" title="Cambio profesional" description="Para explorar hacia dónde quieres moverte y qué primer paso tiene sentido." href="/cambio-profesional/" /><ServiceCard eyebrow="03 / Responsabilidad" title="Liderazgo y coaching ejecutivo" description="Para pensar tu manera de liderar y tomar decisiones con más criterio." href="/coaching-ejecutivo/" /></div></Container></section>
    <PricingCard />
    <FAQ />
    <CTASection />
  </>;
}
