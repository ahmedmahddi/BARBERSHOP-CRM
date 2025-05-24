import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if on mobile device for parallax effect
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current || isMobile) return;

      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      // Reduced movement amount for better performance and subtle effect
      const moveX = (mouseX - 0.5) * 15;
      const moveY = (mouseY - 0.5) * 15;

      parallaxRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative overflow-hidden min-h-screen pt-8 sm:pt-16 md:pt-20">
      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }
      `}</style>

      {/* Background with subtle animated gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-800/70 animate-gradient"></div>

        {/* Gold accent lines - responsive positioning */}
        <div className="absolute top-[15%] sm:top-[20%] left-0 w-full h-[1px] bg-gold-gradient from-transparent via-gold-400/30 to-transparent"></div>
        <div className="absolute top-[85%] sm:top-[80%] left-0 w-full h-[1px] bg-gold-gradient from-transparent via-gold-400/20 to-transparent"></div>

        {/* Radial glow - size responsive */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-gold-400/5 blur-[80px] sm:blur-[100px] opacity-40"></div>

        {/* Parallax elements - responsive sizing and positioning */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 transition-transform duration-200 ease-out"
        >
          <div className="absolute top-[10%] right-[5%] sm:top-[15%] sm:right-[10%] w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-gold-400/20 blur-sm"></div>
          <div className="absolute top-[40%] right-[20%] sm:top-[45%] sm:right-[25%] w-3 h-3 sm:w-6 sm:h-6 rounded-full bg-gold-400/30 blur-sm"></div>
          <div className="absolute top-[60%] left-[10%] sm:top-[65%] sm:left-[15%] w-4 h-4 sm:w-8 sm:h-8 rounded-full bg-gold-400/20 blur-sm"></div>
          <div className="absolute bottom-[15%] right-[25%] sm:bottom-[20%] sm:right-[30%] w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-gold-400/30 blur-sm"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-full relative z-10">
        <motion.div
          className="flex flex-col justify-center items-center md:items-start min-h-[500px] h-[calc(100vh-60px)] sm:h-[calc(100vh-80px)] max-w-full md:max-w-2xl px-0 sm:px-2 md:px-4"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <motion.h1
            className="text-center md:text-left text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-[1.1]"
            variants={fadeInUp}
          >
            <span className="block mb-0 sm:mb-2 text-white/90">
              Experience True
            </span>
            <motion.span
              className="block text-[2rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[7rem] tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent leading-[1.1]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
            >
              ELEGANCE
            </motion.span>
            <span className="block text-base sm:text-lg md:text-2xl lg:text-3xl font-light mt-0.5 sm:mt-2 md:mt-4 text-white/80">
              where style meets sophistication
            </span>
          </motion.h1>

          <motion.div
            className="grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-5 mt-2 mb-2 sm:my-6 md:my-10"
            variants={staggerChildren}
          >
            <motion.div
              className="relative group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 rounded-full bg-gold-gradient from-gold-400/50 to-gold-600/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Link href="/booking">
                <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-zinc-900/80 border border-gold-400 backdrop-blur-sm cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gold-gradient from-gold-400/10 to-gold-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-center z-10">
                    <div className="text-gold-400 text-xs sm:text-sm md:text-lg font-bold group-hover:text-gold-300 transition-colors">
                      BOOK
                    </div>
                    <div className="text-gold-400 text-xs sm:text-sm md:text-lg font-bold group-hover:text-gold-300 transition-colors">
                      NOW!
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              className="relative group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 rounded-full bg-zinc-700/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-zinc-900/80 border border-zinc-700 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-white text-sm sm:text-base md:text-xl font-bold group-hover:text-gold-400 transition-colors">
                    10+
                  </div>
                  <div className="text-zinc-400 text-[7px] sm:text-[10px] md:text-sm group-hover:text-gold-300 transition-colors leading-tight">
                    YEARS OF
                    <br />
                    EXCELLENCE
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 rounded-full bg-zinc-700/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-zinc-900/80 border border-zinc-700 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-white text-sm sm:text-base md:text-xl font-bold group-hover:text-gold-400 transition-colors">
                    15+
                  </div>
                  <div className="text-zinc-400 text-[7px] sm:text-[10px] md:text-sm group-hover:text-gold-300 transition-colors leading-tight">
                    MASTER
                    <br />
                    STYLISTS
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 rounded-full bg-zinc-700/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-zinc-900/80 border border-zinc-700 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-white text-sm sm:text-base md:text-xl font-bold group-hover:text-gold-400 transition-colors">
                    500+
                  </div>
                  <div className="text-zinc-400 text-[7px] sm:text-[10px] md:text-sm group-hover:text-gold-300 transition-colors leading-tight">
                    ELITE
                    <br />
                    CLIENTELE
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-2 sm:mt-6 md:mt-8 text-center md:text-left"
            variants={fadeInUp}
          >
            <p className="text-base sm:text-lg md:text-2xl flex flex-wrap justify-center md:justify-start items-center">
              <span className="text-zinc-400 font-light">
                crafting excellence since
              </span>
              <motion.span
                className="text-gold-400 font-bold italic ml-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                2013
              </motion.span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
