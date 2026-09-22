import { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext.jsx';

export default function CustomCursor() {
  const { enabled, cursor } = useCursor();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return undefined;
    }
    document.body.classList.add('has-custom-cursor');

    const onMove = (event) => {
      target.current = { x: event.clientX, y: event.clientY };
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.4;
      pos.current.y += (target.current.y - pos.current.y) * 0.4;
      pos.current.rx += (target.current.x - pos.current.rx) * 0.18;
      pos.current.ry += (target.current.y - pos.current.ry) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.rx}px, ${pos.current.ry}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    let frame = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  const active = cursor.variant !== 'default';

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
      <div ref={ringRef} className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`rounded-full border border-paper/60 transition-[width,height] duration-200 ease-out ${
            active ? 'h-8 w-8' : 'h-5 w-5'
          }`}
        />
      </div>
    </div>
  );
}
