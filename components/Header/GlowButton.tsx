"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface GlowButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const GlowButton = ({ href, children, variant = "primary" }: GlowButtonProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current && isHovered) {
        const rect = buttonRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  const baseClasses = variant === "primary"
    ? "relative inline-block px-6 py-3 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 whitespace-nowrap border-2 border-cyan-400/60"
    : "relative inline-block px-6 py-3 rounded-lg font-semibold text-white/90 border border-white/20 overflow-hidden transition-all duration-300 whitespace-nowrap";

  return (
    <Link
      href={href}
      ref={buttonRef}
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <motion.div
        className={`absolute inset-0 ${
          variant === "primary"
            ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20"
            : "bg-white/5"
        }`}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow effect following mouse */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/40 via-blue-400/40 to-purple-400/40 blur-2xl pointer-events-none"
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
          scale: isHovered ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-lg border border-transparent"
        animate={{
          boxShadow: isHovered
            ? [
                "0 0 20px rgba(34, 211, 238, 0.3)",
                "0 0 40px rgba(34, 211, 238, 0.5)",
                "0 0 20px rgba(34, 211, 238, 0.3)",
              ]
            : "0 0 0px rgba(34, 211, 238, 0)",
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Text */}
      <span className="relative z-10">{children}</span>
    </Link>
  );
};

export default GlowButton;

