import { faqs } from '@/content/faq';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';

type FAQItem = { question: string; answer: string };

export function FAQ({ standalone = false, items = faqs }: { standalone?: boolean; items?: readonly FAQItem[] }) {
  return <section className={`section ${standalone ? 'section-ivory' : 'section-mist'}`}><Container className="faq-layout"><SectionHeading eyebrow="Lo que quizá te preguntas" title="Respuestas claras antes de empezar." /><div className="faq-list">{items.map(item => <details key={item.question}><summary><span>{item.question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></Container></section>;
}
