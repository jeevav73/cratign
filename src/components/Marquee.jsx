import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery.js';

const ITEMS = [
  'BRANDING',
  'DIGITAL EXPERIENCES',
  'CREATIVE DEVELOPMENT',
  'MOTION',
  'STRATEGY',
  'IDENTITY',
];

const BASE_SPEED = 32;
const SCROLL_SPEED = 42;

export default function Marquee() {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(BASE_SPEED);
  const targetSpeedRef = useRef(BASE_SPEED);
  const hoverRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const content = [...ITEMS, ...ITEMS];

  useEffect(() => {
    if (reduced) return undefined;

    let frame;
    let last = performance.now();
    let resetTimer;

    const onScroll = () => {
      if (hoverRef.current) return;
      targetSpeedRef.current = SCROLL_SPEED;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        if (!hoverRef.current) targetSpeedRef.current = BASE_SPEED;
      }, 180);
    };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const track = trackRef.current;
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08;
      offsetRef.current += speedRef.current * dt;
      if (track) {
        const loop = track.scrollWidth / 2;
        if (loop > 0 && offsetRef.current >= loop) offsetRef.current -= loop;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resetTimer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reduced]);

  return (
    <section
      className="relative overflow-hidden border-y border-line py-6 md:py-8"
      onMouseEnter={() => {
        hoverRef.current = true;
        targetSpeedRef.current = 10;
        setHovered(true);
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
        targetSpeedRef.current = BASE_SPEED;
        setHovered(false);
      }}
      aria-label="Capabilities marquee"
    >
      <div
        className={`flex w-max gap-10 will-change-transform transition-transform duration-500 ${
          hovered ? 'scale-[1.04]' : 'scale-100'
        }`}
        style={{ transformOrigin: 'center left' }}
      >
        <div ref={trackRef} className="flex w-max gap-10">
          {content.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-10 font-display text-[clamp(1.8rem,5vw,4.4rem)] font-medium tracking-[-0.05em] whitespace-nowrap"
            >
              {item}
              <span className="text-accent">—</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
