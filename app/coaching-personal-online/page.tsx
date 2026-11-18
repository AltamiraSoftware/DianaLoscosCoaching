import interiorStyles from '@/app/Interior.module.css';
import heroBase from './SharedHero.module.css';
import homeStyles from '../HomeSections.module.css';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SituationCard } from '@/components/sections/SituationCard';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ContactSection } from '@/components/sections/ContactSection';
import { Credentials } from '@/components/sections/Credentials';
import { DoctoraliaProof } from '@/components/sections/DoctoraliaProof';
import { PricingCard } from '@/components/sections/PricingCard';
import { FAQ } from '@/components/sections/FAQ';
import { CTASection, instagramReels } from '@/components/sections/CTASection';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { pageMetadata, serviceSchema } from '@/lib/seo';
import { site } from '@/lib/site';
import styles from './PersonalHero.module.css';

const path = '/coaching-personal-online/';
const description = 'Coaching personal online para afrontar cambios, poner límites y tomar decisiones. Sesiones individuales de 60 minutos con Diana Loscos.';

export const metadata: Metadata = pageMetadata(
  'Coaching personal online | Diana Loscos',
  description,
  path,
);

const personalFaqs = [
  { question: '¿Tengo que tener un objetivo claro antes de empezar?', answer: 'No. Podemos comenzar por ordenar la situación y explorar qué te gustaría trabajar. No necesitas tener una decisión tomada.' },
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
    <JsonLd data={serviceSchema('Coaching personal', description, path, 'Coaching personal online')} />
    <Breadcrumbs items={[{ name: 'Coaching personal', path }]} />
    <section className={`hero ${styles.hero} ${heroBase['hero']}`} aria-labelledby="personal-hero-title">
      <Container className={`hero-grid ${styles.layout} ${heroBase['hero-grid']}`}>
        <div className={`hero-copy ${styles.copy} ${heroBase['hero-copy']}`}>
          <p className="eyebrow">Coaching personal · Sesiones online</p>
          <h1 id="personal-hero-title">Coaching personal online para aclarar lo que necesitas cambiar</h1>
          <p className={`hero-lede ${heroBase['hero-lede']}`}>Si estás ante una decisión, te cuesta poner límites o atraviesas un cambio de etapa, podemos dedicar un espacio a entender lo que te ocurre y valorar cómo avanzar.</p>
          <p className={styles.trustLine}>Psicóloga · Col. M-45396 · Coach Ejecutiva</p>
          <div className={`hero-actions ${styles.actions} ${heroBase['hero-actions']}`}>
            <ButtonLink href={site.bookingUrl} external event="cta_booking_click" label="coaching-personal-hero">Reservar una sesión de coaching personal</ButtonLink>
          </div>
        </div>
        <figure className={`hero-portrait ${styles.portrait} ${heroBase['hero-portrait']}`}>
          <div className={`portrait-frame ${heroBase['portrait-frame']}`}><Image src="/perfil.webp" alt="Retrato de Diana Loscos" width={356} height={402} loading="eager" sizes="(max-width: 620px) 240px, (max-width: 860px) 220px, 360px" /></div>
          <figcaption><span>Diana Loscos</span><span>Coaching personal online</span></figcaption>
        </figure>
      </Container>
      <div className={`hero-baseline ${heroBase['hero-baseline']}`} aria-hidden="true" />
    </section>

    <ContactSection />

    <section className="section section-mist"><Container><SectionHeading eyebrow="¿Te reconoces?" title="Situaciones que merecen una pausa para pensar." center><p>El punto de partida puede ser una decisión concreta o la sensación de que algo necesita cambiar.</p></SectionHeading><div className={`situation-list ${homeStyles['situation-list']}`}>
      <SituationCard number="01" title="Algo ya no encaja" description="Hay algo en tu vida que ya no encaja, pero no sabes qué cambiar." href="#que-es" />
      <SituationCard number="02" title="Una decisión importante" description="Te cuesta tomarla y das vueltas a las mismas opciones." href="#que-es" />
      <SituationCard number="03" title="Límites y relaciones" description="Quieres poner límites o relacionarte de una manera más coherente contigo." href="#que-es" />
      <SituationCard number="04" title="Dar el paso" description="Quieres avanzar, pero el miedo, la duda o el perfeccionismo te hacen posponerlo." href="#que-es" />
      <SituationCard number="05" title="Un cambio de etapa" description="Estás en un cambio personal, profesional o vital y quieres entender qué necesitas ahora." href="#que-es" />
    </div></Container></section>

    <section id="que-es" className="section section-ivory"><Container><SectionHeading eyebrow="Un espacio con límites claros" title="¿Cuándo puede ayudarte el coaching personal?" center><p>Puede que lleves tiempo dando vueltas a la misma decisión, que estés priorizando las necesidades de otras personas o que notes que una etapa de tu vida ya no encaja contigo. El coaching personal ofrece un espacio de reflexión para explorar posibilidades y decidir qué paso quieres dar.</p></SectionHeading><div className={`interior-grid ${interiorStyles['interior-grid']}`}><div className={`interior-copy ${interiorStyles['interior-copy']}`}><h3>Claridad para decidir y actuar</h3><p>Si buscas coaching para tomar decisiones o coaching para cambios personales, partimos de lo que ocurre hoy, de tus criterios y de los pasos que tú quieras valorar.</p><p>Si la situación que quieres trabajar está relacionada con tu empleo, también puedes conocer el <Link className={styles.personalLink} href="/coaching-profesional/">coaching profesional</Link>.</p></div><aside className={`interior-aside ${interiorStyles['interior-aside']}`}><h2 className={styles.therapyHeading}>Coaching personal y terapia psicológica: no son lo mismo</h2><p>El coaching personal se centra en objetivos, decisiones y acciones. No sustituye la evaluación ni el tratamiento psicológico, médico o psiquiátrico.</p><p>Si buscas evaluación o tratamiento de malestar clínico, acude a un profesional de atención psicológica.</p></aside></div></Container></section>


    <section className="section section-ivory"><Container><SectionHeading eyebrow="Cómo son las sesiones" title="Cómo son las sesiones de coaching personal online" center><p>Las sesiones son individuales, online y duran 60 minutos. Trabajamos sobre una situación concreta, con preguntas y ejercicios de reflexión adaptados a lo que necesitas abordar. Puedes empezar con una primera sesión y valorar después si quieres continuar.</p></SectionHeading><div className={`feature-list ${interiorStyles['feature-list']}`}>
      <article><span>01</span><h3>Individuales</h3><p>Un tiempo para poner palabras a lo que vives, explorar opciones y decidir qué quieres trabajar.</p></article>
      <article><span>02</span><h3>Online</h3><p>Las sesiones de coaching personal son online, para que puedas conectarte desde donde te resulte adecuado.</p></article>
      <article><span>03</span><h3>Personalizadas y confidenciales</h3><p>La conversación parte de tu contexto y se desarrolla con respeto a tus decisiones y a tu privacidad.</p></article>
    </div></Container></section>

    <section className="section section-mist"><Container className={`interior-grid ${interiorStyles['interior-grid']}`}><div className={`interior-copy ${interiorStyles['interior-copy']}`}><p className="eyebrow">Sobre Diana</p><h2>Una conversación con criterio y cercanía.</h2><p>Psicóloga · Col. M-45396 · Coach Ejecutiva</p><p>Diana acompaña online a personas que quieren ordenar una decisión o un cambio personal. Su formación en Psicología y Coaching Ejecutivo aporta escucha y estructura al proceso de coaching; estas sesiones no se presentan como atención psicológica.</p></div><Credentials /></Container></section>

    <DoctoraliaProof />
    <PricingCard />
    <FAQ items={personalFaqs} />
    <CTASection title="Puedes empezar por una conversación sobre lo que hoy necesitas aclarar." copy="Reserva una primera sesión y valora si este espacio encaja contigo." reel={instagramReels.personal} />
  </>;
}
