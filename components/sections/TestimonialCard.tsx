import { testimonialSource } from '@/content/testimonials';
import { BrandLink } from '@/components/ui/BrandLink';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

export function TestimonialCard({ quote, author, date }: { quote: string; author: string; date: string }) {
  return <figure className="testimonial-card"><blockquote>“{quote}”</blockquote><figcaption><span>{author}</span><time>{date}</time></figcaption><BrandLink href={testimonialSource} external event="doctoralia_click" label={`opinion-${author}`}>Leer en Doctoralia <ArrowIcon diagonal /></BrandLink></figure>;
}
