import { useEffect, useRef, useState } from 'react';

export function useMousePosition(enabled = true) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const frame = useRef(0);
  const latest = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return undefined;

    const onMove = (event) => {
      latest.current = { x: event.clientX, y: event.clientY };
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        setPosition(latest.current);
        frame.current = 0;
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  return position;
}
