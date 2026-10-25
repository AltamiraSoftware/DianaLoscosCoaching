import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { MotionReveal } from '@/components/motion/MotionReveal';

const steps = [
  { number: '01', title: 'Poner nombre', description: 'Ordenamos el contexto, la duda y lo que importa.' },
  { number: '02', title: 'Abrir perspectiva', description: 'Miramos opciones, patrones y criterios que quizá no estaban visibles.' },
  { number: '03', title: 'Decidir y actuar', description: 'Concretamos un primer paso posible y revisable.' },
] as const;

export function ProcessSteps() {
  return <section id="proceso" className="section section-mist"><Container><MotionReveal><SectionHeading eyebrow="Cómo trabajo" title="Un proceso con espacio para pensar y dirección para avanzar."><p>Partimos de lo que ocurre en tu vida o en tu trabajo. Claridad, criterio y acción nos ayudan a comprender tu situación y elegir un siguiente paso que tenga sentido para ti.</p></SectionHeading></MotionReveal><ol className="process-list">{steps.map(step => <li key={step.number}><span className="process-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></Container></section>;
}
