import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROCESS_STEPS } from '../data/site.js';
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery.js';

export default function Process() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%']);
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const horizontal = !isMobile && !reduced;

  return (
    <section
      ref={sectionRef}
      className={horizontal ? 'relative h-[280vh] bg-ink-soft' : 'relative bg-ink-soft'}
      id="process"
    >
      <div className={horizontal ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : ''}>
        <div className="flex items-center justify-between px-5 py-8 md:px-10">
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-0.05em]">
            HOW WE WORK
          </h2>
          <span className="font-display text-xs tracking-[0.24em] text-muted">05 — PROCESS</span>
        </div>
        <div className="mx-5 mb-4 h-px bg-line md:mx-10">
          <motion.div className="h-px origin-left bg-accent" style={{ width: horizontal ? progress : '100%' }} />
        </div>
        <motion.div
          className={`flex gap-6 px-5 pb-16 md:gap-10 md:px-10 md:pb-24 ${horizontal ? 'w-max' : 'flex-col'}`}
          style={horizontal ? { x } : undefined}
        >
          {PROCESS_STEPS.map((step) => (
            <article
              key={step.number}
              className="w-full shrink-0 border border-line bg-ink p-8 md:w-[min(85vw,32rem)] md:p-12"
            >
              <p className="font-display text-accent">{step.number}</p>
              <h3 className="mt-8 font-display text-[clamp(2rem,4vw,4rem)] tracking-[-0.05em]">
                {step.name}
              </h3>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper-dim">{step.body}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
