"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, textReveal, scaleIn } from "@/lib/animations";
import TechStack from "./TechStack";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden min-h-screen flex items-center"
        style={{ zIndex: 2, background: "transparent" }}
      >

        <div className="container relative z-10 py-20" style={{ background: "transparent" }}>
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn("right", 0.2)}
              className="relative space-y-8 order-1 lg:order-none"
              style={{ zIndex: 10, background: "transparent" }}
            >
              {/* Name */}
              <motion.h1
                variants={textReveal(0.3)}
                className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Aditya Verma
                </span>
              </motion.h1>

              {/* Title */}
              <motion.div
                variants={textReveal(0.4)}
                className="relative z-10 space-y-2"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  Full-Stack Developer
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
              </motion.div>

              {/* Elevator Pitch */}
              <motion.p
                variants={textReveal(0.5)}
                className="relative z-10 text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl"
              >
                I build fast, responsive, and user-friendly web applications from the ground up. 
                Transforming ideas into digital experiences that make an impact.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={scaleIn(0.7)}
                className="relative z-10 flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/projects"
                    className="group relative inline-block overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-bold text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-cyan-500/50"
                  >
                    <span className="relative z-10">View My Projects</span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="#contact"
                    className="group relative inline-block overflow-hidden rounded-lg border-2 border-cyan-400/50 bg-transparent px-8 py-4 text-lg font-bold text-white transition-all duration-300 ease-in-out hover:border-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/30"
                  >
                    Get In Touch
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Side - Jellyfish Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative order-2 lg:order-none w-full"
              style={{ zIndex: 10, background: "transparent" }}
            >
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden" style={{ background: "transparent" }}>
                <Image
                  src="/images/jellyfish.jpg"
                  alt="Jellyfish"
                  fill
                  className="object-cover"
                  priority
                  style={{ mixBlendMode: "normal" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStack />
    </>
  );
};

export default Hero;
