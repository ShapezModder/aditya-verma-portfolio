"use client";

import { motion } from "framer-motion";

const OctopusIllustration = () => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] md:h-[600px] lg:h-[750px] pointer-events-none z-0">
      {/* Glowing background circles - multiple layers for depth */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/25 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-magenta-500/30 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/40 rounded-full blur-xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Octopus SVG */}
      <motion.svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <defs>
          <linearGradient id="octopusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="1" />
            <stop offset="30%" stopColor="#DB2777" stopOpacity="1" />
            <stop offset="70%" stopColor="#BE185D" stopOpacity="1" />
            <stop offset="100%" stopColor="#9F1239" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="1" />
            <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#D97706" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#92400E" stopOpacity="0.2" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#EC4899" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Tentacle 1 - Left */}
        <motion.path
          d="M 200 400 Q 150 350, 120 300 Q 100 250, 110 200 Q 120 150, 140 120 Q 150 100, 160 90"
          fill="url(#octopusGradient)"
          stroke="#EC4899"
          strokeWidth="4"
          filter="url(#shadow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.ellipse
          cx="160"
          cy="90"
          rx="28"
          ry="22"
          fill="url(#octopusGradient)"
          filter="url(#shadow)"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 0.5, 
            delay: 2,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 2
          }}
        />

        {/* Tentacle 2 */}
        <motion.path
          d="M 250 420 Q 200 380, 180 320 Q 160 260, 170 200 Q 180 140, 200 100 Q 210 85, 220 75"
          fill="url(#octopusGradient)"
          stroke="#EC4899"
          strokeWidth="4"
          filter="url(#shadow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.7 }}
        />
        <motion.ellipse
          cx="220"
          cy="75"
          rx="25"
          ry="20"
          fill="url(#octopusGradient)"
          filter="url(#shadow)"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 0.5, 
            delay: 2.2,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 2.2
          }}
        />

        {/* Tentacle 3 - Right */}
        <motion.path
          d="M 600 400 Q 650 350, 680 300 Q 700 250, 690 200 Q 680 150, 660 120 Q 650 100, 640 90"
          fill="url(#octopusGradient)"
          stroke="#EC4899"
          strokeWidth="4"
          filter="url(#shadow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.6 }}
        />
        <motion.ellipse
          cx="640"
          cy="90"
          rx="28"
          ry="22"
          fill="url(#octopusGradient)"
          filter="url(#shadow)"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 0.5, 
            delay: 2.1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 2.1
          }}
        />

        {/* Tentacle 4 */}
        <motion.path
          d="M 550 420 Q 600 380, 620 320 Q 640 260, 630 200 Q 620 140, 600 100 Q 590 85, 580 75"
          fill="url(#octopusGradient)"
          stroke="#EC4899"
          strokeWidth="4"
          filter="url(#shadow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        <motion.ellipse
          cx="580"
          cy="75"
          rx="25"
          ry="20"
          fill="url(#octopusGradient)"
          filter="url(#shadow)"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 0.5, 
            delay: 2.3,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 2.3
          }}
        />
        
        {/* Additional tentacles for more detail */}
        <motion.path
          d="M 300 430 Q 280 400, 270 360 Q 260 320, 265 280 Q 270 240, 280 210"
          fill="url(#octopusGradient)"
          stroke="#EC4899"
          strokeWidth="3"
          opacity="0.8"
          filter="url(#shadow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2, delay: 0.9 }}
        />
        <motion.path
          d="M 500 430 Q 520 400, 530 360 Q 540 320, 535 280 Q 530 240, 520 210"
          fill="url(#octopusGradient)"
          stroke="#EC4899"
          strokeWidth="3"
          opacity="0.8"
          filter="url(#shadow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2, delay: 1 }}
        />

        {/* Main Body */}
        <motion.ellipse
          cx="400"
          cy="350"
          rx="140"
          ry="120"
          fill="url(#octopusGradient)"
          filter="url(#shadow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: 1
          }}
          transition={{ 
            duration: 1, 
            delay: 0.3,
            scale: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        />
        
        {/* Body highlight for 3D effect */}
        <motion.ellipse
          cx="380"
          cy="330"
          rx="80"
          ry="70"
          fill="url(#octopusGradient)"
          opacity="0.6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Eye - Glowing */}
        <motion.circle
          cx="400"
          cy="330"
          r="45"
          fill="url(#eyeGlow)"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [1, 0.95, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.circle
          cx="400"
          cy="330"
          r="28"
          fill="#0F172A"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
        <motion.circle
          cx="405"
          cy="325"
          r="12"
          fill="#FBBF24"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 2, 0],
            y: [0, -2, 0]
          }}
          transition={{ 
            duration: 0.5, 
            delay: 1.7,
            scale: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            x: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            y: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5
            }
          }}
        />
        {/* Eye reflection */}
        <motion.circle
          cx="408"
          cy="322"
          r="4"
          fill="#FFFFFF"
          opacity="0.9"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.9 }}
        />

        {/* Smartphone in tentacle */}
        <motion.g
          initial={{ opacity: 0, y: 20, rotate: -10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            rotate: [-10, -5, -10]
          }}
          transition={{ 
            duration: 1, 
            delay: 1.5,
            rotate: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          filter="url(#shadow)"
        >
          <rect
            x="170"
            y="170"
            width="55"
            height="100"
            rx="10"
            fill="#0F172A"
            stroke="#EC4899"
            strokeWidth="3"
          />
          <rect
            x="175"
            y="180"
            width="45"
            height="70"
            rx="5"
            fill="#EC4899"
            opacity="0.4"
          />
          {/* Screen content */}
          <rect
            x="180"
            y="185"
            width="35"
            height="25"
            rx="3"
            fill="#1F2937"
            opacity="0.8"
          />
          <circle cx="197" cy="275" r="5" fill="#EC4899" />
          {/* Screen glow */}
          <rect
            x="175"
            y="180"
            width="45"
            height="70"
            rx="5"
            fill="none"
            stroke="#EC4899"
            strokeWidth="1"
            opacity="0.6"
          />
        </motion.g>

        {/* Suckers on tentacles - more detailed */}
        {[
          { x: 140, y: 140, r: 10 },
          { x: 200, y: 120, r: 9 },
          { x: 660, y: 140, r: 10 },
          { x: 600, y: 120, r: 9 },
          { x: 250, y: 380, r: 8 },
          { x: 550, y: 380, r: 8 },
          { x: 280, y: 300, r: 7 },
          { x: 520, y: 300, r: 7 },
          { x: 320, y: 400, r: 9 },
          { x: 480, y: 400, r: 9 },
        ].map((sucker, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={sucker.x}
              cy={sucker.y}
              r={sucker.r + 2}
              fill="#EC4899"
              opacity="0.3"
              initial={{ scale: 0 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
            <motion.circle
              cx={sucker.x}
              cy={sucker.y}
              r={sucker.r}
              fill="url(#octopusGradient)"
              opacity="0.8"
              initial={{ scale: 0 }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
            <motion.circle
              cx={sucker.x}
              cy={sucker.y}
              r={sucker.r * 0.4}
              fill="#FFFFFF"
              opacity="0.6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 2 + i * 0.1 }}
            />
          </motion.g>
        ))}
      </motion.svg>
    </div>
  );
};

export default OctopusIllustration;

