import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { easeOutExpo } from '../utils/animations.js';

function useRevealSoon() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 60);
    return () => window.clearTimeout(id);
  }, []);
  return visible;
}

export function SplitLines({ lines, className = '', delay = 0 }) {
  const visible = useRevealSoon();
  return (
    <span className={`block ${className}`}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '108%' }}
            animate={visible ? { y: '0%' } : { y: '108%' }}
            transition={{
              duration: 0.9,
              delay: delay + index * 0.1,
              ease: easeOutExpo,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SplitWords({ text, className = '', delay = 0, highlight = [] }) {
  const words = text.split(' ');
  const visible = useRevealSoon();

  return (
    <span className={`inline ${className}`}>
      {words.map((word, index) => {
        const clean = word.replace(/[.,]/g, '');
        const isHot = highlight.includes(clean);
        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block pr-[0.28em] ${isHot ? 'text-accent' : ''}`}
              initial={{ y: '100%', opacity: 0 }}
              animate={visible ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{
                duration: 0.75,
                delay: delay + index * 0.04,
                ease: easeOutExpo,
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
