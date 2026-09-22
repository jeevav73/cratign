import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../context/CursorContext.jsx';

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  as: Component = 'button',
  onMouseEnter,
  onMouseLeave,
  ...props
}) {
  const ref = useRef(null);
  const { enabled, setCursorState } = useCursor();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.3 });

  const handleMove = (event) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setCursorState({ variant: 'default', label: '' });
  };

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-flex">
      <Component
        ref={ref}
        className={`focus-ring inline-flex items-center justify-center ${className}`}
        onMouseMove={handleMove}
        onMouseEnter={(event) => {
          setCursorState({ variant: 'button', label: '' });
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          reset();
          onMouseLeave?.(event);
        }}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
}
