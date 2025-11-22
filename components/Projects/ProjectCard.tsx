"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  category: string;
  imagePath: string;
  gitRepoUrl: string;
  index: number;
  color: string;
  glowColor: string;
}

const ProjectCard = ({ 
  title, 
  category, 
  imagePath, 
  gitRepoUrl, 
  index, 
  color, 
  glowColor 
}: ProjectCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
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
        className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: isHovered 
            ? `0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px ${glowColor}`
            : "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        {/* Mouse-following glow */}
        <motion.div
          className="absolute rounded-full blur-2xl pointer-events-none"
          style={{
            width: "120px",
            height: "120px",
            background: glowColor,
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

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            border: "1px solid transparent",
          }}
          animate={{
            boxShadow: isHovered
              ? [
                  `0 0 20px ${glowColor}`,
                  `0 0 40px ${glowColor}`,
                  `0 0 20px ${glowColor}`,
                ]
              : ["0 0 0px transparent"],
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imagePath}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            unoptimized
          />
          {/* Overlay gradient on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="relative z-10 flex flex-col p-6 flex-grow">
          {/* Title */}
          <h3 className="text-white text-xl font-bold tracking-wide mb-2">
            {title}
          </h3>
          
          {/* Category/Subtitle */}
          <p className="text-gray-400 text-sm mb-4">
            {category}
          </p>

          {/* Spacer to push button to bottom */}
          <div className="flex-grow" />

          {/* Git Repo Button */}
          <motion.a
            href={gitRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50">
              GIT REPO
            </div>
          </motion.a>
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

export default ProjectCard;

