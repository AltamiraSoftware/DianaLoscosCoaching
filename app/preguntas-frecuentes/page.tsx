import type { Metadata } from 'next';
import { PageIntro } from '@/components/sections/PageIntro';
import { FAQ } from '@/components/sections/FAQ';
import { CTASection } from '@/components/sections/CTASection';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Preguntas frecuentes', 'Respuestas sobre las sesiones online de coaching profesional, precios, reserva y diferencia con la psicoterapia.', '/preguntas-frecuentes/');
export default function Page() { return <><PageIntro eyebrow="Antes de empezar" title="Preguntas frecuentes." name="Preguntas frecuentes" path="/preguntas-frecuentes/"><p>Información práctica para saber cómo son las sesiones y decidir si quieres reservar.</p></PageIntro><FAQ standalone /><CTASection /></>; }
