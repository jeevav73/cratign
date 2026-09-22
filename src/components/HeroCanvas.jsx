import { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition.js';
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery.js';

export default function HeroCanvas({ ready }) {
  const canvasRef = useRef(null);
  const mouse = useMousePosition(true);
  const mouseRef = useRef(mouse);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d', { alpha: true });
    let frame;
    let time = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const orbs = [
      { x: 0.74, y: 0.36, r: 280, color: '212,255,63', speed: 0.00035 },
      { x: 0.64, y: 0.56, r: 200, color: '255,77,28', speed: 0.0005 },
      { x: 0.86, y: 0.48, r: 150, color: '244,240,230', speed: 0.00028 },
    ];

    const draw = (now) => {
      if (!ready) {
        frame = requestAnimationFrame(draw);
        return;
      }
      time = now;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x || width * 0.7;
      const my = mouseRef.current.y || height * 0.4;
      const parallaxX = isMobile || reduced ? 0 : (mx / window.innerWidth - 0.5) * 40;
      const parallaxY = isMobile || reduced ? 0 : (my / window.innerHeight - 0.5) * 28;

      orbs.forEach((orb, i) => {
        const ox =
          orb.x * width +
          Math.sin(time * orb.speed + i) * (reduced ? 0 : 18) +
          parallaxX * (i + 1) * 0.25;
        const oy =
          orb.y * height +
          Math.cos(time * orb.speed + i * 1.3) * (reduced ? 0 : 14) +
          parallaxY * (i + 1) * 0.2;
        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        gradient.addColorStop(0, `rgba(${orb.color},0.72)`);
        gradient.addColorStop(0.45, `rgba(${orb.color},0.2)`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!isMobile) {
        ctx.strokeStyle = 'rgba(244,240,230,0.08)';
        ctx.lineWidth = 1;
        const gap = 56;
        const influence = 110;
        for (let x = 0; x <= width; x += gap) {
          ctx.beginPath();
          for (let y = 0; y <= height; y += 12) {
            const dx = x - mx;
            const dy = y - my;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = Math.max(influence - dist, 0) / influence;
            const px = x + (dx / dist) * force * -18;
            const py = y + (dy / dist) * force * -18;
            if (y === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [ready, isMobile, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50 md:opacity-100"
      aria-hidden="true"
    />
  );
}
