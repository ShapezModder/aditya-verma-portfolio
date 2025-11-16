"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface TechStackCardProps {
  tech: {
    name: string;
    logoUrl: string;
    color: string;
    glowColor: string;
  };
  index: number;
}

const TechStackCard = ({ tech, index }: TechStackCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.1, 
        y: -10,
        transition: { duration: 0.2 }
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      {/* Glassmorphism Card */}
      <div
        className="relative p-6 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: isHovered 
            ? `0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px ${tech.glowColor}`
            : "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        {/* Mouse-following glow - desktop only */}
        <motion.div
          className="hidden md:block absolute rounded-full blur-2xl pointer-events-none"
          style={{
            width: "120px",
            height: "120px",
            background: tech.glowColor,
            x: mousePosition.x - 60,
            y: mousePosition.y - 60,
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
        
        {/* Continuous glow for mobile */}
        <motion.div
          className="md:hidden absolute rounded-full blur-2xl pointer-events-none"
          style={{
            width: "120px",
            height: "120px",
            background: tech.glowColor,
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated border glow - continuous on mobile only */}
        <motion.div
          className="md:hidden absolute inset-0 rounded-2xl"
          style={{
            border: "1px solid transparent",
          }}
          animate={{
            boxShadow: [
              `0 0 20px ${tech.glowColor}`,
              `0 0 40px ${tech.glowColor}`,
              `0 0 20px ${tech.glowColor}`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Desktop border glow - only on hover */}
        <motion.div
          className="hidden md:block absolute inset-0 rounded-2xl"
          style={{
            border: "1px solid transparent",
          }}
          animate={{
            boxShadow: isHovered
              ? [
                  `0 0 20px ${tech.glowColor}`,
                  `0 0 40px ${tech.glowColor}`,
                  `0 0 20px ${tech.glowColor}`,
                ]
              : ["0 0 0px transparent"],
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <motion.div
            className="relative w-12 h-12 mb-3 flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{
              duration: 0.3,
              rotate: {
                duration: 0.5,
                repeat: isHovered ? Infinity : 0,
                repeatType: "reverse",
              },
            }}
          >
            <Image
              src={tech.logoUrl}
              alt={tech.name}
              width={48}
              height={48}
              className={`w-full h-full object-contain transition-all duration-300 md:filter md:brightness-0 md:invert ${
                isHovered ? "md:filter-none" : ""
              }`}
              unoptimized
            />
          </motion.div>
          <span className="text-white text-sm font-bold tracking-wide">
            {tech.name}
          </span>
        </div>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={{
            x: isHovered ? "200%" : "-100%",
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
};

export default TechStackCard;

