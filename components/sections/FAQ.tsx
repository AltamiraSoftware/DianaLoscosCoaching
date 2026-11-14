'use client';

import { useId, useState } from 'react';
import { faqs } from '@/content/faq';
import { home } from '@/content/home';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import styles from './FAQ.module.css';

type FAQItem = { question: string; answer: string };

export function FAQ({ standalone = false, items = faqs }: { standalone?: boolean; items?: readonly FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefix = useId();
  return <section className={`section ${styles.section}`}><Container className={styles.layout}><div className={styles.heading}><SectionHeading eyebrow={home.faq.eyebrow} title={home.faq.title} tone="light" /></div><div className={styles.list}>{items.map((item, index) => {
    const open = openIndex === index;
    const panelId = `${prefix}-answer-${index}`;
    const buttonId = `${prefix}-question-${index}`;
    return <div className={styles.item} key={item.question}><button id={buttonId} type="button" className={styles.question} aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? null : index)}><span>{item.question}</span><span aria-hidden="true">{open ? '−' : '+'}</span></button><div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}><p>{item.answer}</p></div></div>;
  })}</div></Container>{standalone && <span className="sr-only">Preguntas frecuentes</span>}</section>;
}
