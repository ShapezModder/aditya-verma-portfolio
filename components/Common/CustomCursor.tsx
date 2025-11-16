"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const CustomCursor = () => {
  const { theme } = useTheme();
  const [isHoveringInput, setIsHoveringInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Check if hovering over input elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("[contenteditable]")
      ) {
        setIsHoveringInput(true);
      } else {
        setIsHoveringInput(false);
      }
    };

    // Also check on mouse move for better detection
    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e);
      handleMouseOver(e);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Custom round cursor - shown when NOT hovering over text inputs */}
        {!isHoveringInput && (
          <motion.div
            key="round-cursor"
            className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-lg shadow-white/50" />
          </motion.div>
        )}

        {/* Custom text cursor (vertical line) - shown when hovering over text inputs */}
        {isHoveringInput && (
          <motion.div
            key="text-cursor"
            className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scaleY: isVisible ? 1 : 0,
            }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div className="w-0.5 h-6 bg-white shadow-lg shadow-white/50" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;

