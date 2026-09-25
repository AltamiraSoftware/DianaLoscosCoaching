import Image from 'next/image';
import type { Metadata } from 'next';
import { PageIntro } from '@/components/sections/PageIntro';
import { Credentials } from '@/components/sections/Credentials';
import { CTASection } from '@/components/sections/CTASection';
import { Container } from '@/components/ui/Container';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Sobre Diana Loscos', 'Conoce a Diana Loscos, su formación en Psicología y Coaching Ejecutivo y su forma de acompañar decisiones profesionales.', '/sobre-mi/');

export default function Page() {
  return <><PageIntro eyebrow="Sobre mí" title="Conversaciones con rigor, claridad y cercanía." name="Sobre Diana" path="/sobre-mi/"><p>Soy Diana Loscos. Acompaño a profesionales que necesitan detenerse, entender lo que viven y encontrar una dirección propia.</p></PageIntro><section id="diana" className="section section-mist"><Container className="profile-layout"><Image src="/perfil.jpg" alt="Diana Loscos, retrato" width={356} height={402} loading="eager" sizes="(max-width: 620px) 75vw, 356px" /><div className="interior-copy"><p className="eyebrow">Mi enfoque</p><h2>Escuchar también es ayudar a pensar.</h2><p>En las sesiones ponemos palabras a la situación, abrimos perspectivas y buscamos un siguiente paso que puedas llevar a la práctica. Trabajo desde el respeto a tu autonomía: las decisiones son tuyas.</p><p>Mi formación en Psicología y Coaching Ejecutivo aporta una base para sostener conversaciones estructuradas. Aquí ofrezco coaching profesional; no presento estas sesiones como psicoterapia ni como atención clínica.</p><Credentials /></div></Container></section><section className="section section-ivory"><Container className="interior-grid"><div className="interior-copy"><h2>Qué puedes esperar de una sesión</h2><p>Un espacio individual y online de 60 minutos. Empezamos por lo que hoy te preocupa y acordamos qué sería útil explorar. Al final, recogemos lo que ha cambiado en tu mirada y qué acción quieres probar.</p></div><div className="interior-aside"><h3>Lo que guía mi trabajo</h3><p>Preguntas antes que recetas. Criterio antes que prisa. Acciones acordes con tu contexto, sin promesas de transformación inmediata.</p></div></Container></section><CTASection /></>;
}
