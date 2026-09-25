import { testimonialSource } from '@/content/testimonials';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

export function TestimonialCard({ quote, author, date }: { quote: string; author: string; date: string }) {
  return <figure className="testimonial-card"><blockquote>“{quote}”</blockquote><figcaption><span>{author}</span><time>{date}</time></figcaption><TrackedLink href={testimonialSource} external event="doctoralia_click" label={`opinion-${author}`} className="source-link">Leer en Doctoralia <ArrowIcon diagonal /></TrackedLink></figure>;
}
