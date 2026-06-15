'use client';

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

/**
 * MagneticButton — simplified to a CSS-only hover button.
 *
 * The previous version tracked the pointer on every mousemove and drove a
 * `useSpring` motion value to "magnetise" the button. That per-frame work
 * compounded with the custom cursor to produce visible lag. The magnetic
 * effect is replaced with a cheap CSS active/hover transition (see
 * `.btn-primary` / `.btn-ghost` and the `active:scale` utility). The component
 * keeps the same props so callers are unchanged.
 */
export default function MagneticButton({
  children,
  className,
  onClick,
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'transition-transform duration-200 ease-out active:scale-[0.97]',
        className
      )}
    >
      {children}
    </button>
  );
}
