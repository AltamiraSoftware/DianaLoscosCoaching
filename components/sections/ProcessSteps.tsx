import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { MotionReveal } from '@/components/motion/MotionReveal';

const steps = [
  { number: '01', title: 'Poner nombre', description: 'Traemos la situación a la mesa. Qué está pasando, qué pesa y qué necesitas entender mejor.' },
  { number: '02', title: 'Abrir perspectiva', description: 'Exploramos alternativas, patrones y supuestos que pueden estar limitando la decisión.' },
  { number: '03', title: 'Decidir y actuar', description: 'Traducimos la claridad en pasos concretos y revisamos lo que aprendes al ponerlos en práctica.' },
] as const;

export function ProcessSteps() {
  return <section id="proceso" className="section section-mist"><Container><MotionReveal><SectionHeading eyebrow="Cómo trabajo" title="Un proceso con espacio para pensar y dirección para avanzar."><p>Cada sesión parte de tu contexto. No hay una respuesta prefabricada; construimos preguntas útiles y acciones que tengan sentido para ti.</p></SectionHeading></MotionReveal><ol className="process-list">{steps.map(step => <li key={step.number}><span className="process-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></Container></section>;
}
