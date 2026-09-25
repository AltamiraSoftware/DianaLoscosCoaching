import type { Metadata } from 'next';
import { PageIntro } from '@/components/sections/PageIntro';
import { DoctoraliaProof } from '@/components/sections/DoctoraliaProof';
import { CTASection } from '@/components/sections/CTASection';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Opiniones sobre Diana Loscos', 'Lee extractos de opiniones públicas sobre las sesiones con Diana Loscos y consulta cada reseña en Doctoralia.', '/opiniones/');
export default function Page() { return <><PageIntro eyebrow="Opiniones" title="Lo que otras personas cuentan de su experiencia." name="Opiniones" path="/opiniones/"><p>Estas frases son extractos de reseñas públicas en Doctoralia. Puedes leer el contexto completo y la fecha de cada opinión en la fuente.</p></PageIntro><DoctoraliaProof full /><CTASection title="Si quieres comprobar si este espacio encaja contigo, empecemos por hablar." copy="Reserva una sesión online y trae la situación que hoy te gustaría trabajar." /></>; }
