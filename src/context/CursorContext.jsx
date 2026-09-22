import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useIsFinePointer, useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery.js';

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const finePointer = useIsFinePointer();
  const enabled = finePointer && !isMobile && !reduced;
  const [cursor, setCursor] = useState({
    label: '',
    variant: 'default',
  });

  const setCursorState = useCallback((next) => {
    setCursor((prev) => ({ ...prev, ...next }));
  }, []);

  const value = useMemo(
    () => ({ enabled, cursor, setCursorState, reduced, isMobile }),
    [enabled, cursor, setCursorState, reduced, isMobile],
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within CursorProvider');
  }
  return context;
}
