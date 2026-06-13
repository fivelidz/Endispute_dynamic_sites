'use client';

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { cn } from '@/lib/cn';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'data-cursor'?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  type = 'button',
  disabled = false,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 200, damping: 20 });
  const y = useSpring(rawY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current || disabled) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 100;

      if (dist < maxDist) {
        // Clamp displacement to 10px max
        const factor = (1 - dist / maxDist) * strength;
        const clampedX = Math.max(-10, Math.min(10, dx * factor));
        const clampedY = Math.max(-10, Math.min(10, dy * factor));
        rawX.set(clampedX);
        rawY.set(clampedY);
      }
    },
    [rawX, rawY, disabled, strength]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cursor="grow"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={cn(className)}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}
