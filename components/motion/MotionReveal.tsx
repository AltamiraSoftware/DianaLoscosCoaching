'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function MotionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animation = node.animate([{ transform: 'translateY(16px)' }, { transform: 'translateY(0)' }], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)' });
        observer.disconnect();
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    observer.observe(node);
    return () => { observer.disconnect(); animation?.cancel(); };
  }, []);
  return <div ref={ref} className={`motion-reveal ${className}`}>{children}</div>;
}
