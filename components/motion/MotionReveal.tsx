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
        animation = node.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 900, easing: 'cubic-bezier(.22,1,.36,1)' });
        observer.disconnect();
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    observer.observe(node);
    return () => { observer.disconnect(); animation?.cancel(); };
  }, []);
  return <div ref={ref} className={`motion-reveal ${className}`}>{children}</div>;
}
