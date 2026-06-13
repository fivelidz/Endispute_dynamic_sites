'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isGrown, setIsGrown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 500, damping: 40 });
  const y = useSpring(rawY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const checkGrow = () => {
      const target = document.querySelector(':hover');
      if (!target) return;
      // Walk up DOM to find data-cursor="grow"
      let el: Element | null = target;
      let found = false;
      while (el) {
        if (el.getAttribute('data-cursor') === 'grow') {
          found = true;
          break;
        }
        el = el.parentElement;
      }
      setIsGrown(found);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousemove', checkGrow, { passive: true });

    const onLeave = () => setIsVisible(false);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', checkGrow);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [rawX, rawY, isVisible]);

  if (isTouch) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed z-[9999] pointer-events-none mix-blend-difference"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        top: 0,
        left: 0,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        animate={{
          width: isGrown ? 48 : 12,
          height: isGrown ? 48 : 12,
          borderRadius: isGrown ? '6px' : '50%',
          backgroundColor: isGrown ? '#fafaf7' : '#fafaf7',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        style={{
          display: 'block',
        }}
      />
    </motion.div>
  );
}
