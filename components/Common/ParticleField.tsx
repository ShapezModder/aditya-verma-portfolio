"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  glowIntensity: number;
  speedX: number;
  speedY: number;
  glowCycle: number;
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles - small, subtle dust
    const particleCount = 150;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 0.8 + 0.3, // Much smaller: 0.3-1.1px
      opacity: Math.random() * 0.5 + 0.4,
      glowIntensity: Math.random(),
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      glowCycle: Math.random() * Math.PI * 2,
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Update glow cycle
        particle.glowCycle += 0.02;
        const glow = Math.sin(particle.glowCycle) * 0.5 + 0.5;
        particle.glowIntensity = glow;

        // Draw particle with glow
        const currentOpacity = particle.opacity * (0.5 + glow * 0.5);
        const glowSize = particle.size * (1 + glow * 0.5);

        // Outer glow - smaller, subtle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowSize * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.6})`);
        gradient.addColorStop(0.5, `rgba(200, 255, 255, ${currentOpacity * 0.4})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        // Main particle - small and subtle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(currentOpacity * 1.2, 1)})`;
        ctx.fill();
        
        // Small bright center dot
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(currentOpacity * 1.5, 1)})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 1,
        mixBlendMode: "screen",
        opacity: 1,
        backgroundColor: "transparent"
      }}
    />
  );
};

export default ParticleField;

