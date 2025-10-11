// Animation variants for Framer Motion
// Note: Requires framer-motion package

export const questionTransition = {
  initial: { 
    opacity: 0, 
    y: 20,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

export const cardStagger = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  },
  item: {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  },
};

export const cardHover = {
  scale: 1.03,
  y: -6,
  transition: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 15,
  },
};

export const cardTap = {
  scale: 0.97,
  transition: {
    type: 'spring' as const,
    stiffness: 600,
    damping: 20,
  },
};

export const progressDot = {
  initial: { 
    scale: 0.8,
    opacity: 0.5,
  },
  animate: { 
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export const buttonHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
  },
};

export const buttonTap = {
  scale: 0.95,
  transition: {
    duration: 0.1,
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const slideUp = {
  initial: { 
    opacity: 0, 
    y: 40,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

// Timing constants
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
};

// Easing functions
export const EASING = {
  easeOut: [0.4, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  easeInOut: [0.4, 0, 0.6, 1],
  spring: { type: 'spring', stiffness: 300, damping: 30 },
};

