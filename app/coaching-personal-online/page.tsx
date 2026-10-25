import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SituationCard } from '@/components/sections/SituationCard';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { ContactSection } from '@/components/sections/ContactSection';
import { Credentials } from '@/components/sections/Credentials';
import { DoctoraliaProof } from '@/components/sections/DoctoraliaProof';
import { PricingCard } from '@/components/sections/PricingCard';
import { FAQ } from '@/components/sections/FAQ';
import { CTASection, instagramReels } from '@/components/sections/CTASection';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import styles from './PersonalHero.module.css';

const path = '/coaching-personal-online/';

export const metadata: Metadata = pageMetadata(
  'Coaching personal online | Diana Loscos',
  'Coaching personal online para ganar claridad, tomar decisiones y avanzar en cambios vitales. Sesiones individuales con Diana Loscos.',
  path,
);

const personalFaqs = [
  {
    question: '¿Qué es el coaching personal?',
    answer: 'Es un espacio de conversación para comprender una situación, explorar opciones y decidir pasos posibles. Parte de lo que quieres trabajar y de tu contexto.',
  },
  {
    question: '¿En qué se diferencia de la atención psicológica?',
    answer: 'El coaching se centra en reflexión, decisiones y acciones. La atención psicológica es la vía adecuada si buscas evaluación o tratamiento de malestar clínico. El coaching no sustituye atención psicológica, médica ni psiquiátrica.',
  },
  {
    question: '¿Cuándo puede ser útil iniciar un proceso de coaching personal?',
    answer: 'Cuando quieres mirar con más perspectiva una decisión, un bloqueo o un cambio de etapa, y dedicar un espacio a definir cómo avanzar. No necesitas llegar con una respuesta cerrada.',
  },
  {
    question: '¿Cómo son las sesiones online?',
    answer: 'Las sesiones son individuales y se realizan online. Puedes consultar la disponibilidad y reservar desde Doctoralia.',
  },
  {
    question: '¿Cuántas sesiones necesito?',
    answer: 'Depende de lo que quieras trabajar. Puedes empezar con una primera sesión y valorar después si te resulta útil continuar; no hay un número de sesiones válido para todas las personas.',
  },
  {
    question: '¿Cómo puedo reservar una primera sesión?',
    answer: 'Puedes consultar la disponibilidad y realizar la reserva desde el enlace a Doctoralia de esta página.',
  },
] as const;

export default function Page() {
  return <>
    <Breadcrumbs items={[{ name: 'Coaching personal', path }]} />
    <section className={`hero ${styles.hero}`} aria-labelledby="personal-hero-title">
      <Container className={`hero-grid ${styles.layout}`}>
        <div className={`hero-copy ${styles.copy}`}>
          <p className="eyebrow">Coaching personal · Sesiones online</p>
          <h1 id="personal-hero-title">Coaching personal online</h1>
          <p className="hero-lede">Un espacio para aclarar lo que te está bloqueando, comprender qué quieres cambiar y decidir cómo avanzar.</p>
          <p className={styles.trustLine}>Psicóloga · Col. M-45396 · Coach Ejecutiva</p>
          <div className={`hero-actions ${styles.actions}`}>
            <ButtonLink href={site.bookingUrl} external event="cta_booking_click" label="coaching-personal-hero">Reservar una sesión <ArrowIcon diagonal /></ButtonLink>
          </div>
        </div>
        <figure className={`hero-portrait ${styles.portrait}`}>
          <div className="portrait-frame"><Image src="/perfil.webp" alt="Retrato de Diana Loscos" width={356} height={402} loading="eager" sizes="(max-width: 620px) 240px, (max-width: 860px) 220px, 360px" /></div>
          <figcaption><span>Diana Loscos</span><span>Coaching personal online</span></figcaption>
        </figure>
      </Container>
      <div className="hero-baseline" aria-hidden="true" />
    </section>

    <ContactSection />

    <section className="section section-mist"><Container><SectionHeading eyebrow="¿Te reconoces?" title="Situaciones que merecen una pausa para pensar."><p>El punto de partida puede ser una decisión concreta o la sensación de que algo necesita cambiar.</p></SectionHeading><div className="situation-list">
      <SituationCard number="01" title="Algo ya no encaja" description="Hay algo en tu vida que ya no encaja, pero no sabes qué cambiar." href="#que-es" />
      <SituationCard number="02" title="Una decisión importante" description="Te cuesta tomarla y das vueltas a las mismas opciones." href="#que-es" />
      <SituationCard number="03" title="Límites y relaciones" description="Quieres poner límites o relacionarte de una manera más coherente contigo." href="#que-es" />
      <SituationCard number="04" title="Dar el paso" description="Quieres avanzar, pero el miedo, la duda o el perfeccionismo te hacen posponerlo." href="#que-es" />
      <SituationCard number="05" title="Un cambio de etapa" description="Estás en un cambio personal, profesional o vital y quieres entender qué necesitas ahora." href="#que-es" />
    </div></Container></section>

    <section id="que-es" className="section section-ivory"><Container><SectionHeading eyebrow="Un espacio con límites claros" title="Qué es el coaching personal — y cuándo no es lo adecuado"><p>El coaching personal ofrece una conversación estructurada para reflexionar, ganar claridad y elegir acciones realistas. Puede ayudarte a mirar decisiones o cambios personales desde otra perspectiva; el desarrollo personal se concreta aquí en lo que tiene sentido para tu situación.</p></SectionHeading><div className="interior-grid"><div className="interior-copy"><h3>Claridad para decidir y actuar</h3><p>Si buscas coaching para tomar decisiones o coaching para cambios personales, partimos de lo que ocurre hoy, de tus criterios y de los pasos que tú quieras valorar.</p></div><aside className="interior-aside"><h3>Cuándo buscar otra atención</h3><p>El coaching no sustituye atención psicológica, médica ni psiquiátrica.</p><p>Si buscas evaluación o tratamiento de malestar clínico, acude a un profesional de atención psicológica.</p></aside></div></Container></section>

    <ProcessSteps />

    <section className="section section-ivory"><Container><SectionHeading eyebrow="Cómo son las sesiones" title="Un espacio individual adaptado a tu situación."><p>Puedes empezar con una conversación y valorar después qué necesitas. Las sesiones se centran en la situación que traes, sin un itinerario impuesto.</p></SectionHeading><div className="feature-list">
      <article><span>01</span><h3>Individuales</h3><p>Un tiempo para poner palabras a lo que vives, explorar opciones y decidir qué quieres trabajar.</p></article>
      <article><span>02</span><h3>Online</h3><p>Las sesiones de coaching personal son online, para que puedas conectarte desde donde te resulte adecuado.</p></article>
      <article><span>03</span><h3>Personalizadas y confidenciales</h3><p>La conversación parte de tu contexto y se desarrolla con respeto a tus decisiones y a tu privacidad.</p></article>
    </div></Container></section>

    <section className="section section-mist"><Container className="interior-grid"><div className="interior-copy"><p className="eyebrow">Sobre Diana</p><h2>Una conversación con criterio y cercanía.</h2><p>Psicóloga · Col. M-45396 · Coach Ejecutiva</p><p>Diana acompaña online a personas que quieren ordenar una decisión o un cambio personal. Su formación en Psicología y Coaching Ejecutivo aporta escucha y estructura al proceso de coaching; estas sesiones no se presentan como atención psicológica.</p></div><Credentials /></Container></section>

    <DoctoraliaProof />
    <PricingCard />
    <FAQ items={personalFaqs} />
    <CTASection title="Puedes empezar por una conversación sobre lo que hoy necesitas aclarar." copy="Reserva una primera sesión y valora si este espacio encaja contigo." reel={instagramReels.personal} />
  </>;
}
