"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ParticleField from "@/components/Common/ParticleField";

interface ProjectCardProps {
  projectName: string;
  index: number;
  color: string;
  glowColor: string;
}

const ProjectCard = ({ projectName, index, color, glowColor }: ProjectCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
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
        className="relative p-12 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 min-h-[300px] flex items-center justify-center"
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

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span className="text-white text-2xl font-bold tracking-wide">
            {projectName}
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

const projects = [
  { 
    name: "Project 1", 
    color: "from-cyan-400/20 to-blue-500/20", 
    glowColor: "rgba(34, 211, 238, 0.3)" 
  },
  { 
    name: "Project 2", 
    color: "from-purple-400/20 to-pink-500/20", 
    glowColor: "rgba(168, 85, 247, 0.3)" 
  },
  { 
    name: "Project 3", 
    color: "from-green-400/20 to-emerald-500/20", 
    glowColor: "rgba(74, 222, 128, 0.3)" 
  },
  { 
    name: "Project 4", 
    color: "from-orange-400/20 to-red-500/20", 
    glowColor: "rgba(251, 146, 60, 0.3)" 
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-black" style={{ backgroundColor: "#000000" }}>
      {/* Particle Field Background */}
      <div className="fixed inset-0" style={{ zIndex: 1 }}>
        <ParticleField />
      </div>

      {/* Content */}
      <section className="relative py-20 overflow-hidden" style={{ zIndex: 10 }}>
        <div className="container relative z-10 mx-auto px-4">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
              Selected Works & Case Studies
            </h1>
          </motion.div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.name}
                projectName={project.name}
                index={index}
                color={project.color}
                glowColor={project.glowColor}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}






