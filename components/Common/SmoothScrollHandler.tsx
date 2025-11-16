"use client";

import { useEffect } from "react";

const SmoothScrollHandler = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle arrow keys when not in an input/textarea
      const target = e.target as HTMLElement;
      const isInput = target instanceof HTMLInputElement;
      const isTextarea = target instanceof HTMLTextAreaElement;
      const isContentEditable = target.isContentEditable;
      
      if (
        (e.key === "ArrowDown" || e.key === "ArrowUp") &&
        !isInput &&
        !isTextarea &&
        !isContentEditable
      ) {
        // Prevent default scrolling behavior immediately
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const scrollAmount = 80; // Reduced for smoother feel
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        let targetScroll: number;
        
        if (e.key === "ArrowDown") {
          targetScroll = Math.min(
            currentScroll + scrollAmount,
            document.documentElement.scrollHeight - window.innerHeight
          );
        } else {
          targetScroll = Math.max(currentScroll - scrollAmount, 0);
        }

        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          });
        });
      }
    };

    // Use capture phase to catch event early
    window.addEventListener("keydown", handleKeyDown, { capture: true, passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, []);

  return null;
};

export default SmoothScrollHandler;

