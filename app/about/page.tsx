"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ParticleField from "@/components/Common/ParticleField";

interface TimelineNodeProps {
  logo: string;
  institution: string;
  details: string;
  index: number;
}

const TimelineNode = ({ logo, institution, details, index }: TimelineNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <div className="relative flex flex-col items-center w-full md:w-auto">
        {/* Tooltip Card - Desktop: above */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
            scale: isHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
          className="hidden md:block absolute bottom-full mb-4 z-20 pointer-events-none"
        >
          <div className="bg-black/90 backdrop-blur-xl border border-cyan-400/30 rounded-lg px-4 py-3 shadow-lg shadow-cyan-500/20 min-w-[300px]">
            <p className="text-white font-bold text-sm mb-1">{institution}</p>
            <p className="text-gray-300 text-xs">{details}</p>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyan-400/30"></div>
          </div>
        </motion.div>

        {/* Circular Logo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (window.innerWidth < 768) {
              setIsMobileOpen(true);
            }
          }}
          whileHover={{ scale: 1.1 }}
          className="relative w-20 h-20 rounded-full bg-white border-2 border-cyan-400/50 p-3 cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50 z-10"
        >
          <Image
            src={logo}
            alt={institution}
            fill
            className="object-contain p-2 rounded-full"
            unoptimized
          />
        </motion.div>
      </div>

      {/* Mobile Modal - Centered Pop-up with Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={() => setIsMobileOpen(false)}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            
            {/* Centered Pop-up Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-black/95 backdrop-blur-xl border border-cyan-400/30 rounded-lg px-6 py-5 shadow-lg shadow-cyan-500/20 max-w-sm w-full z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white font-bold text-base mb-2">{institution}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{details}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface CertificateCardProps {
  image: string;
  title: string;
  description: string;
  credentialId?: string;
  verifyLink?: string;
  index: number;
}

const CertificateCard = ({ image, title, description, credentialId, verifyLink, index }: CertificateCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);


  // Handle body scroll lock - CRITICAL: This prevents page scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      // Get current scroll position BEFORE locking
      const scrollY = window.scrollY;
      
      // Hide header by lowering its z-index when modal is open
      const header = document.querySelector('header');
      if (header) {
        (header as HTMLElement).style.zIndex = "1";
      }
      
      // Lock the page scroll immediately using position: fixed
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      
      // Also lock html element for extra safety
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.position = "fixed";
      document.documentElement.style.width = "100%";
      document.documentElement.style.height = "100%";
      
      // Prevent all scroll events on the document
      const preventScroll = (e: Event) => {
        const target = e.target;
        // Check if target is an HTMLElement and has closest method
        if (target && target instanceof HTMLElement) {
          // Only prevent if the event is not from the modal content
          if (!target.closest('[data-modal-content]')) {
            e.preventDefault();
            e.stopPropagation();
          }
        } else {
          // If target is not an HTMLElement, prevent the event
          e.preventDefault();
          e.stopPropagation();
        }
      };
      
      const preventWheel = (e: WheelEvent) => {
        const target = e.target;
        if (target && target instanceof HTMLElement) {
          if (!target.closest('[data-modal-content]')) {
            e.preventDefault();
            e.stopPropagation();
          }
        } else {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      
      const preventKeyScroll = (e: KeyboardEvent) => {
        if ((e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "PageUp" || e.key === "PageDown" || e.key === "Home" || e.key === "End")) {
          // Check if the active element is inside the modal content
          const activeElement = document.activeElement;
          if (activeElement && activeElement instanceof HTMLElement) {
            const modalContent = activeElement.closest('[data-modal-content]');
            if (modalContent) {
              // Allow arrow keys to work inside modal - don't prevent
              // The handleKeyDown handler will take care of scrolling
              return;
            }
          }
          // Also check if modalContentRef exists and contains the active element
          if (modalContentRef.current) {
            const isInModal = activeElement && activeElement instanceof HTMLElement && 
                           (activeElement === modalContentRef.current || modalContentRef.current.contains(activeElement));
            if (isInModal) {
              // Don't prevent - let the arrow key handler do its job
              return;
            }
          }
          // If not in modal, prevent all scrolling on the main page
          e.preventDefault();
          e.stopPropagation();
        }
      };
      
      // Add event listeners to prevent scrolling
      document.addEventListener("scroll", preventScroll, { passive: false, capture: true });
      document.addEventListener("wheel", preventWheel, { passive: false, capture: true });
      document.addEventListener("keydown", preventKeyScroll, { passive: false, capture: true });
      document.addEventListener("touchmove", preventScroll, { passive: false, capture: true });
      
      // Store cleanup function
      return () => {
        // Remove event listeners
        document.removeEventListener("scroll", preventScroll, { capture: true } as EventListenerOptions);
        document.removeEventListener("wheel", preventWheel, { capture: true } as EventListenerOptions);
        document.removeEventListener("keydown", preventKeyScroll, { capture: true } as EventListenerOptions);
        document.removeEventListener("touchmove", preventScroll, { capture: true } as EventListenerOptions);
        
        // Get the scroll position that was saved
        const savedScrollY = document.body.style.top;
        
        // Restore header z-index
        const header = document.querySelector('header');
        if (header) {
          (header as HTMLElement).style.zIndex = "";
        }
        
        // Unlock the page scroll
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.height = "";
        
        document.documentElement.style.overflow = "";
        document.documentElement.style.position = "";
        document.documentElement.style.width = "";
        document.documentElement.style.height = "";
        
        // Restore scroll position
        if (savedScrollY) {
          const scrollPosition = parseInt(savedScrollY.replace("-", "")) || 0;
          window.scrollTo(0, scrollPosition);
        }
      };
    } else {
      // When modal closes, restore header z-index
      const header = document.querySelector('header');
      if (header) {
        (header as HTMLElement).style.zIndex = "";
      }
      
      // When modal closes, ensure everything is unlocked
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.position = "";
      document.documentElement.style.width = "";
      document.documentElement.style.height = "";
    }
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Prevent scroll events from reaching the body when modal is open
  const handleWheel = (e: React.WheelEvent) => {
    if (isModalOpen) {
      e.stopPropagation();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isModalOpen && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      // Only prevent if we're not inside the modal content
      const target = e.target as HTMLElement;
      if (!target.closest('[data-modal-content]')) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ scale: 1.05, y: -5 }}
        onClick={openModal}
        className="relative cursor-pointer rounded-lg overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-4 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20"
      >
        <div className="relative w-full h-48 mb-3">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded"
            unoptimized
          />
        </div>
        <h3 className="text-white text-sm font-bold line-clamp-2">{title}</h3>
      </motion.div>

      {/* Modal with Backdrop */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
            className="fixed inset-0 flex items-center justify-center overflow-hidden"
            style={{
              zIndex: 999999,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {/* Modal Content */}
            <motion.div
              ref={modalContentRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              data-modal-content
              className="bg-black/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 md:p-8 max-w-5xl w-full shadow-2xl shadow-cyan-500/20 mx-4 relative"
              style={{
                outline: "none",
              }}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-20 bg-black/50 rounded-full p-1 hover:bg-black/70"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {/* Left Column - Certificate Image */}
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>

                {/* Right Column - Content */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h2>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">{description}</p>

                    {credentialId && (
                      <div className="mb-4">
                        <p className="text-cyan-400 text-xs md:text-sm font-semibold mb-1">Credential ID:</p>
                        <p className="text-white text-xs md:text-sm font-mono break-all">{credentialId}</p>
                      </div>
                    )}
                  </div>

                  {verifyLink && (
                    <div className="mt-auto pt-4">
                      <a
                        href={verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-center w-full md:w-auto"
                      >
                        Verify
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const timelineData = [
  {
    logo: "/one.png",
    institution: "St. Joseph's School, Greater Noida",
    details: "High School (ICSE) | 2019 Secured: 83%",
  },
  {
    logo: "/two.png",
    institution: "C.P. International School, Farrukhabad",
    details: "Intermediate (PCB+CS) | 2021 Secured: 80%",
  },
  {
    logo: "/three.png",
    institution: "CSJMU, Kanpur",
    details: "BSc (Botany + Zoology) | 2025",
  },
  {
    logo: "/four.png",
    institution: "Graphic Era University, Dehradun",
    details: "BCA | 2028",
  },
];

const certificateData = [
  {
    image: "/certificate1.jpg",
    title: "IBM Full Stack Software Developer Professional Certificate",
    description: "A 12-course program covering front-end, back-end, and cloud-native technologies, including React, Node.js, Python, and Docker.",
    credentialId: "HUCC02UF0F6T",
    verifyLink: "https://www.coursera.org/account/accomplishments/professional-cert/HUCC02UF0F6T",
  },
  {
    image: "/certificate2.jpg",
    title: "Google UX Design Professional Certificate",
    description: "An in-depth program on the complete UX design process, from user empathy and research to creating wireframes and prototypes in Figma.",
    credentialId: "L5YYULUN2TVP",
    verifyLink: "https://www.coursera.org/account/accomplishments/professional-cert/L5YYULUN2TVP",
  },
  {
    image: "/certificate3.jpg",
    title: "Object-Oriented Programming (C++)",
    description: "A foundational course by SRM Institute, focusing on core OOP principles including classes, objects, inheritance, and polymorphism.",
  },
  {
    image: "/certificate4.jpg",
    title: "User Experience Design (LinkedIn Learning)",
    description: "A practical overview of UX principles, covering user-centered design, research methodologies, and the fundamentals of user interaction.",
    verifyLink: "https://www.linkedin.com/learning/certificates/8ad568b7e53a0ce65626852ac3011d2d96fbf8bb452be3e58c64f6becdb89c9c",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black" style={{ backgroundColor: "#000000" }}>
      {/* Particle Field Background */}
      <div className="fixed inset-0" style={{ zIndex: 1 }}>
        <ParticleField />
      </div>

      {/* Content */}
      <section className="relative py-20 overflow-hidden" style={{ zIndex: 10 }}>
        <div className="container relative z-10 mx-auto px-4">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
              About Me
            </h1>
          </motion.div>

          {/* Top Section - Two Column Layout */}
          <div className="flex flex-col md:flex-row gap-8 sm:gap-12 mb-12 sm:mb-20 items-center">
            {/* Left Column - Profile Picture */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center w-full md:w-auto"
            >
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 max-w-[80%] md:max-w-none">
                {/* Strong Glowing Ring/Halo - Multiple Layers */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/40 via-blue-400/40 to-cyan-400/40 blur-2xl" style={{ transform: "scale(1.2)" }} />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-teal-500/30 blur-xl" style={{ transform: "scale(1.15)" }} />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-cyan-400/20 blur-lg" style={{ transform: "scale(1.1)" }} />
                
                {/* Circular Frame */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-400/60 shadow-2xl shadow-cyan-500/50" style={{ aspectRatio: "1" }}>
                  <Image
                    src="/my-image.jpg"
                    alt="Aditya Verma"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-4 sm:mt-6">Aditya Verma</h2>
            </motion.div>

            {/* Right Column - About Me Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-white text-lg leading-relaxed text-justify">
                My journey into technology hasn&apos;t been a straight line, but it&apos;s always been my true north.
              </p>
              <p className="text-gray-300 text-base leading-relaxed text-justify">
                Based in Bareilly, Uttar Pradesh, my passion for computer science sparked early, leading me to win several tech competitions during my school days. A shift in my academic path led me to explore biology, culminating in a BSc from CSJMU. While that path taught me immense discipline, it also solidified where my real interest lies: the world of code.
              </p>
              <p className="text-gray-300 text-base leading-relaxed text-justify">
                Today, I&apos;m back to what I love, pursuing a BCA from Graphic Era University. As a self-taught enthusiast, I&apos;ve spent years learning from online resources and building a solid foundation before my formal degree. I enjoy creating unique, problem-solving projects, you can explore some of them in my projects section.
              </p>
              <p className="text-gray-300 text-base leading-relaxed text-justify">
                For me, coding is more than a career goal; it&apos;s a hobby that keeps me motivated and constantly thinking. I aspire to turn this passion into a profession as a Full-Stack Developer at a high-value company, building digital solutions that make an impact.
              </p>
              <p className="text-white text-lg leading-relaxed mt-6 text-justify">
                It&apos;s great to have you here. You can see my educational timeline below.
              </p>
            </motion.div>
          </div>

          {/* Education Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              My Education
            </h2>

            {/* Timeline Container */}
            <div className="relative py-12">
              {/* Glowing Line - Horizontal on md+, Vertical on mobile */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transform -translate-y-1/2" />
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform -translate-y-1/2 blur-sm" />
              
              {/* Vertical Line for Mobile */}
              <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent transform -translate-x-1/2" />
              <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent transform -translate-x-1/2 blur-sm" />

              {/* Timeline Nodes */}
              <div className="relative flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto px-4 gap-12 md:gap-0">
                {timelineData.map((item, index) => (
                  <TimelineNode
                    key={index}
                    logo={item.logo}
                    institution={item.institution}
                    details={item.details}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              My Certifications
            </h2>

            {/* Certificate Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {certificateData.map((cert, index) => (
                <CertificateCard
                  key={index}
                  image={cert.image}
                  title={cert.title}
                  description={cert.description}
                  credentialId={cert.credentialId}
                  verifyLink={cert.verifyLink}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
