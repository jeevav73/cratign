import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton.jsx';
import { SOCIAL_LINKS } from '../data/site.js';
import { useCursor } from '../context/CursorContext.jsx';

export default function Contact() {
  const { setCursorState } = useCursor();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-accent px-5 py-28 text-ink md:px-10 md:py-40"
    >
      <p className="font-display text-[11px] tracking-[0.28em]">07 — CONTACT</p>
      <h2 className="mt-8 font-display text-[clamp(2.4rem,8vw,8.5rem)] font-medium leading-[0.88] tracking-[-0.06em]">
        HAVE A PROJECT
        <br />
        IN MIND?
      </h2>
      <p className="mt-8 font-display text-[clamp(1.4rem,3vw,2.6rem)] tracking-[-0.03em]">
        LET'S MAKE SOMETHING REMARKABLE.
      </p>
      <div className="mt-12 flex flex-wrap items-center gap-6">
        <MagneticButton
          as={Link}
          to="/contact"
          className="rounded-full bg-ink px-8 py-4 font-display text-xs tracking-[0.22em] text-paper hover:bg-ink-soft"
        >
          START A PROJECT →
        </MagneticButton>
        <a
          href="mailto:hello@creativestudio.com"
          className="focus-ring font-display text-sm tracking-[0.08em] underline-offset-4 hover:underline"
          onMouseEnter={() => setCursorState({ variant: 'link' })}
          onMouseLeave={() => setCursorState({ variant: 'default' })}
        >
          hello@creativestudio.com
        </a>
      </div>
      <ul className="mt-16 flex flex-wrap gap-6 font-display text-xs tracking-[0.2em]">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="focus-ring hover:underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
