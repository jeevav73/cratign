import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { easeOutExpo } from '../utils/animations.js';

export default function Testimonials({ items }) {
  const [index, setIndex] = useState(0);
  const current = items[index] || items[0];

  useEffect(() => {
    if (!items.length) return undefined;
    const timer = setInterval(() => {
      setIndex((value) => (value + 1) % items.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!current) {
    return (
      <section className="px-5 py-24 text-muted md:px-10">No testimonials yet.</section>
    );
  }

  return (
    <section className="px-5 py-24 md:px-10 md:py-36" id="testimonials">
      <p className="font-display text-[11px] tracking-[0.28em] text-muted">06 — VOICES</p>
      <div className="mt-10 min-h-[16rem] max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current.id}
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <p className="font-display text-[clamp(1.4rem,3.6vw,3.4rem)] font-medium leading-[1.15] tracking-[-0.04em]">
              “{current.quote}”
            </p>
            <footer className="mt-10 font-display text-xs tracking-[0.2em] text-muted">
              {current.name} — {current.role}, {current.company}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex gap-2" role="tablist" aria-label="Testimonials">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`h-1.5 w-10 rounded-full ${i === index ? 'bg-accent' : 'bg-line'}`}
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
