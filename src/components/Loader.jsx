import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery.js';

export default function Loader({ onComplete }) {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(reduced ? 100 : 0);
  const [visible, setVisible] = useState(!reduced);

  useEffect(() => {
    if (reduced) {
      onComplete?.();
      return undefined;
    }

    const started = performance.now();
    const duration = 1400;
    let frame;

    const tick = (now) => {
      const t = Math.min((now - started) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 280);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, onComplete]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-6 py-8 text-paper md:px-10"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.87, 0, 0.13, 1] } }}
          role="status"
          aria-live="polite"
          aria-label="Loading Creative Studio"
        >
          <div className="flex items-start justify-between font-display text-xs tracking-[0.28em]">
            <span>CREATIVE STUDIO</span>
            <span>{String(progress).padStart(3, '0')}%</span>
          </div>
          <div>
            <p className="font-display text-[clamp(2.4rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              CREATIVE
              <br />
              STUDIO
            </p>
            <div className="mt-8 h-px w-full bg-line">
              <motion.div
                className="h-px bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
