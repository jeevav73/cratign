import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import MagneticButton from './MagneticButton.jsx';
import HeroCanvas from './HeroCanvas.jsx';
import { easeOutExpo } from '../utils/animations.js';

const HEADLINES = ['WE CREATE', 'DIGITAL EXPERIENCES', 'THAT MOVE PEOPLE.'];

export default function Hero({ ready }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-8 pt-24 md:px-10 md:pb-12">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: easeOutExpo }}
      >
        <HeroCanvas ready={ready} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/75 to-ink md:via-ink/45" />
      </motion.div>

      <div className="relative z-10 max-w-[92rem]">
        <motion.p
          className="font-display text-[11px] tracking-[0.32em] text-accent"
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease: easeOutExpo }}
        >
          CREATIVE DIGITAL STUDIO
        </motion.p>

        <h1 className="mt-5 font-display text-[clamp(2.3rem,6.6vw,7.2rem)] font-medium leading-[0.88] tracking-[-0.06em]">
          {HEADLINES.map((line, index) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '115%' }}
                animate={ready ? { y: '0%' } : { y: '115%' }}
                transition={{
                  delay: 0.28 + index * 0.12,
                  duration: 1.05,
                  ease: easeOutExpo,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-xl text-sm leading-relaxed text-paper-dim md:text-base"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.8, ease: easeOutExpo }}
        >
          Branding, digital products and immersive experiences for companies that want to be felt,
          not just seen.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.05, duration: 0.7, ease: easeOutExpo }}
        >
          <MagneticButton
            as={Link}
            to="/work"
            className="whitespace-nowrap rounded-full bg-accent px-7 py-4 font-display text-xs tracking-[0.22em] text-[#080808] transition-colors hover:bg-paper"
          >
            EXPLORE OUR WORK →
          </MagneticButton>
          <MagneticButton
            as={Link}
            to="/contact"
            className="whitespace-nowrap rounded-full border border-line px-7 py-4 font-display text-xs tracking-[0.22em] text-paper hover:border-accent hover:text-accent"
          >
            LET'S TALK
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 mt-10 flex items-center gap-3 font-display text-[11px] tracking-[0.28em] text-muted"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.3 }}
      >
        <ArrowDown size={14} className="motion-safe:animate-bounce" />
        SCROLL
      </motion.div>
    </section>
  );
}
