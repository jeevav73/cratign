import { memo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext.jsx';
import { useIsMobile } from '../hooks/useMediaQuery.js';

function ServiceRow({ service, active, onHover, onLeave, onToggle }) {
  return (
    <article
      className="border-b border-line"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <button
        type="button"
        className="group w-full text-left"
        onClick={onToggle}
        aria-expanded={active}
      >
        <div
          className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-6 transition-[background-color,padding] duration-500 md:px-10 ${
            active ? 'bg-paper text-ink md:py-10' : 'bg-transparent md:py-8'
          }`}
        >
          <span
            className={`font-display text-xs tracking-[0.22em] transition-transform duration-500 ${
              active ? 'translate-x-2 text-accent-hot' : 'text-muted'
            }`}
          >
            {service.number}
          </span>
          <span className="font-display text-[clamp(1.4rem,3.4vw,3.4rem)] font-medium tracking-[-0.04em]">
            {service.name}
          </span>
          <ArrowUpRight
            className={`transition-transform duration-500 ${active ? 'rotate-45' : ''}`}
            size={28}
            aria-hidden="true"
          />
        </div>
      </button>
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          <p
            className={`max-w-2xl px-5 pb-8 text-sm leading-relaxed md:px-10 ${
              active ? 'bg-paper text-ink/80' : 'text-paper-dim'
            }`}
          >
            {service.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function Services({ items }) {
  const [active, setActive] = useState(null);
  const [pinned, setPinned] = useState(null);
  const { setCursorState } = useCursor();
  const isMobile = useIsMobile();

  const open = (id) => {
    setActive(id);
    setCursorState({ variant: 'link' });
  };

  const close = () => {
    setActive(pinned);
    setCursorState({ variant: 'default', label: '' });
  };

  const toggle = (id) => {
    if (pinned === id) {
      setPinned(null);
      if (isMobile) setActive(null);
      return;
    }
    setPinned(id);
    setActive(id);
  };

  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="mb-10 flex items-end justify-between px-5 md:px-10">
        <h2 className="font-display text-[clamp(2.2rem,6vw,6rem)] font-medium tracking-[-0.05em]">
          WHAT WE DO
        </h2>
        <span className="hidden font-display text-xs tracking-[0.24em] text-muted md:block">
          02 — SERVICES
        </span>
      </div>
      <div className="border-t border-line">
        {items.map((service) => (
          <ServiceRow
            key={service.id}
            service={service}
            active={active === service.id}
            onHover={() => {
              if (!isMobile) open(service.id);
            }}
            onLeave={() => {
              if (!isMobile) close();
            }}
            onToggle={() => toggle(service.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(Services);
