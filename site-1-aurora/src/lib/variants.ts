import type { Variants } from 'motion/react';

export const fadeUpContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  },
};

export const fadeUpItemFast: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  },
};

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};
