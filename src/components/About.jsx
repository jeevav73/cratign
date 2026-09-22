import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STUDIO_STATS } from '../data/site.js';
import ProjectVisual from './ProjectVisual.jsx';
import { SplitLines } from './SplitText.jsx';

function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const start = performance.now();
    const duration = 1400;
    let frame;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const TEAM = [
  { name: 'Amara Chen', role: 'Creative Director', initials: 'AC' },
  { name: 'Leo Hart', role: 'Design Lead', initials: 'LH' },
  { name: 'Sofia Reyes', role: 'Technical Director', initials: 'SR' },
  { name: 'Jonah Blake', role: 'Motion Designer', initials: 'JB' },
];

export default function About({ compact = false }) {
  return (
    <section id="studio" className="px-5 py-20 md:px-10 md:py-32">
      <p className="font-display text-[11px] tracking-[0.28em] text-muted">04 — STUDIO</p>
      <h2 className="mt-6 max-w-5xl font-display text-[clamp(2rem,5.4vw,5.6rem)] font-medium leading-[0.95] tracking-[-0.05em]">
        <SplitLines
          lines={['WE ARE A SMALL STUDIO', 'WITH A BIG DIGITAL', 'MINDSET.']}
        />
      </h2>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-xl space-y-6 text-paper-dim">
          <p>
            Creative Studio is a design and technology practice. We partner with ambitious brands
            to build identities, products and digital environments with cultural weight.
          </p>
          <p>
            Our philosophy is simple: type should have a voice, motion should have a reason, and
            the internet should feel like a place — not a template.
          </p>
          {!compact ? (
            <p>
              Capabilities span strategy, identity, web, product and motion. We keep the team small
              so the work stays close to the people making it.
            </p>
          ) : null}
        </div>
        <div className="relative h-[22rem] overflow-hidden md:h-[28rem]">
          <motion.div
            className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/80 blur-2xl"
            animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <ProjectVisual visual="form" className="h-full w-full" />
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-10 md:grid-cols-4">
        {STUDIO_STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-[clamp(2rem,4vw,4rem)] tracking-[-0.05em] text-accent">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 font-display text-xs tracking-[0.22em] text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {!compact ? (
        <div className="mt-20">
          <h3 className="font-display text-xs tracking-[0.24em] text-muted">TEAM</h3>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((person) => (
              <li key={person.name} className="border border-line p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/5 font-display text-lg text-accent">
                  {person.initials}
                </div>
                <p className="mt-5 font-display text-xl tracking-[-0.03em]">{person.name}</p>
                <p className="text-sm text-muted">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
