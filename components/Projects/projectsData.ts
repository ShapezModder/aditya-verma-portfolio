// Projects Data Configuration
// To add a new project, simply copy the template object below and update the values

export interface Project {
  title: string;
  category: string;
  imagePath: string; // Path relative to /project_images/ folder
  gitRepoUrl: string;
  color: string; // Tailwind gradient classes
  glowColor: string; // RGBA color for glow effect
}

// ============================================
// PROJECT TEMPLATE - Copy this to add new projects
// ============================================
/*
{
  title: "Project Template Title",                    // ← Change: Your project name
  category: "Category: Web Design",                   // ← Change: Your project category
  imagePath: "/project_images/template-image.jpg",    // ← Change: Your image filename
  gitRepoUrl: "https://github.com/yourusername/your-repo", // ← Change: Your GitHub URL
  color: "from-cyan-400/20 to-blue-500/20",           // ← Optional: Change gradient
  glowColor: "rgba(34, 211, 238, 0.3)",              // ← Optional: Change glow color
},
*/

// ============================================
// EXISTING PROJECTS
// ============================================

export const projects: Project[] = [
  {
    title: "GhostDrop - Your files. Direct delivery. Zero trace",
    category: "Category: Real-Time Networking & P2P Systems",
    imagePath: "/project_images/ghostdrop.jpg",
    gitRepoUrl: "https://github.com/adityaverma9777/ghostdrop",
    color: "from-cyan-400/20 to-blue-500/20",
    glowColor: "rgba(34, 211, 238, 0.3)",
  },
  // Add more pexport const projects: Project[] = [
  {
    title: "Canvas2Code - From Sketch to Scale, Instantly.",
    category: "Category: Real-Time Collaborative Development Environment (CDE)",
    imagePath: "/project_images/canvas2code.jpg",
    gitRepoUrl: "https://github.com/adityaverma9777/Canvas2Code", 
    color: "from-purple-400/20 to-pink-500/20",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
  {
    title: "Fortress - Offense Driven Security.",
    category: "Category: Adversarial Security Testing, Not public.",
    imagePath: "/project_images/Foretress.png",
    gitRepoUrl: "https://enterprise-security-saas.vercel.app/", 
    color: "from-green-400/20 to-emerald-500/20",
    glowColor: "rgba(74, 222, 128, 0.3)",
  },
];

