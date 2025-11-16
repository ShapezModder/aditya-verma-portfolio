import { Variants } from "framer-motion";

// Fade in animations
export const fadeIn = (direction: "up" | "down" | "left" | "right" = "up", delay = 0): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.5,
        delay,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };
};

// Scale animations
export const scaleIn = (delay = 0): Variants => {
  return {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
      },
    },
  };
};

// Stagger container for children
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

// Slide in from sides
export const slideIn = (direction: "left" | "right" | "top" | "bottom" = "left"): Variants => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };
};

// Rotate and scale animation
export const rotateScale = (delay = 0): Variants => {
  return {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay,
      },
    },
  };
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 17,
  },
};

export const hoverLift = {
  y: -10,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 17,
  },
};

// Text reveal animation
export const textReveal = (delay = 0): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };
};

// Blur fade in
export const blurFadeIn = (delay = 0): Variants => {
  return {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
      },
    },
  };
};




