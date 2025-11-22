"use client";

import { motion } from "framer-motion";
import ParticleField from "@/components/Common/ParticleField";
import ProjectCard from "@/components/Projects/ProjectCard";
import { projects } from "@/components/Projects/projectsData";

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
                key={project.title}
                title={project.title}
                category={project.category}
                imagePath={project.imagePath}
                gitRepoUrl={project.gitRepoUrl}
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






