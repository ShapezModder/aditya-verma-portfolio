"use client";

import { motion } from "framer-motion";
import TechStackCard from "./TechStackCard";

const techStack = [
  { 
    name: "React", 
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "from-cyan-400/20 to-blue-500/20", 
    glowColor: "rgba(34, 211, 238, 0.3)" 
  },
  { 
    name: "Next.js", 
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    color: "from-gray-100/20 to-gray-400/20", 
    glowColor: "rgba(255, 255, 255, 0.2)" 
  },
  { 
    name: "TypeScript", 
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    color: "from-blue-400/20 to-blue-600/20", 
    glowColor: "rgba(59, 130, 246, 0.3)" 
  },
  { 
    name: "Node.js", 
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    color: "from-green-400/20 to-green-600/20", 
    glowColor: "rgba(74, 222, 128, 0.3)" 
  },
  { 
    name: "Python", 
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "from-yellow-400/20 to-blue-500/20", 
    glowColor: "rgba(250, 204, 21, 0.3)" 
  },
  { 
    name: "JavaScript", 
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    color: "from-yellow-300/20 to-yellow-500/20", 
    glowColor: "rgba(234, 179, 8, 0.3)" 
  },
  { 
    name: "MongoDB", 
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    color: "from-green-500/20 to-green-700/20", 
    glowColor: "rgba(34, 197, 94, 0.3)" 
  },
  { 
    name: "PostgreSQL", 
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    color: "from-blue-500/20 to-blue-700/20", 
    glowColor: "rgba(59, 130, 246, 0.3)" 
  },
  { 
    name: "AWS", 
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    color: "from-orange-400/20 to-orange-600/20", 
    glowColor: "rgba(251, 146, 60, 0.3)" 
  },
  { 
    name: "Docker", 
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    color: "from-blue-400/20 to-cyan-500/20", 
    glowColor: "rgba(34, 211, 238, 0.3)" 
  },
  { 
    name: "Git", 
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    color: "from-orange-500/20 to-red-600/20", 
    glowColor: "rgba(239, 68, 68, 0.3)" 
  },
  { 
    name: "Tailwind", 
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    color: "from-cyan-400/20 to-teal-500/20", 
    glowColor: "rgba(20, 184, 166, 0.3)" 
  },
];

const TechStack = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-black">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Tech Stack
          </h2>
          <p className="text-gray-400 text-lg">
            Technologies I work with to build amazing experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-6">
          {techStack.map((tech, index) => (
            <TechStackCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
