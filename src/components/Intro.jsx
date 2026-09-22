import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitWords } from './SplitText.jsx';

export default function Intro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="px-5 py-28 md:px-10 md:py-40" id="intro">
      <p className="font-display text-[11px] tracking-[0.28em] text-muted">01 — WHO WE ARE</p>
      <motion.h2
        style={{ y }}
        className="mt-8 max-w-6xl font-display text-[clamp(1.8rem,5.2vw,5.4rem)] font-medium leading-[1.05] tracking-[-0.045em]"
      >
        <SplitWords
          text="WE BUILD IDENTITIES, PRODUCTS AND DIGITAL EXPERIENCES FOR BRANDS THAT WANT TO MOVE FORWARD."
          highlight={['IDENTITIES', 'PRODUCTS', 'EXPERIENCES', 'FORWARD']}
        />
      </motion.h2>
    </section>
  );
}
