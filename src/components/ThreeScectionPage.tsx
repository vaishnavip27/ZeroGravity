"use client";

import Spline from "@splinetool/react-spline";
import Header from "./header";
import { motion } from "framer-motion";
import MyMarquee from "./marquee";
import { useState, useEffect } from "react";
import Image from "next/image";

// Type for a star object
interface Star {
  id: number;
  x: number;
  y: number;
}

// Helper function to generate stars
const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 140,
  }));
};

const ThreeSectionPage: React.FC = () => {
  const [showSpline, setShowSpline] = useState<boolean>(false);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setShowSpline(true);
    setStars(generateStars(80));
  }, []);

  return (
    <main className="w-full h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[#100c08]">
      {/* Section 1 */}
      <section className="h-screen relative snap-proximity">
        <div className="relative z-20">
          <Header />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
          <motion.h1
            className="bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text text-transparent text-7xl md:text-6xl ultra-bold lg:text-9xl font-[900] text-center [text-shadow:_1px_1px_0_rgb(0_0_0_/_20%)]"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            ZERO GRAVITY
          </motion.h1>
        </div>

        {/* Spline Scene */}
        {showSpline && (
          <Spline
            scene="https://prod.spline.design/aDNta5nbpYMXrOQI/scene.splinecode"
            className="absolute inset-0 w-full h-full z-10"
          />
        )}
      </section>

      {/* Section 2 */}
      <section className="h-[150vh] text-white bg-[#100c08] relative overflow-hidden group">
        <MyMarquee />

        <motion.div
          className="absolute top-1/3 left-20 transform -translate-y-1/2 cursor-pointer"
          initial={{ x: "-100%" }} // Start completely outside the viewport
          whileInView={{ x: "0%" }} // Slide into the viewport when in view
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: 0.09, // Delay for this text
          }}
          viewport={{ once: true }} // Trigger animation only once
        >
          <h1 className="text-4xl md:text-5xl lg:text-8xl font-black bg-gradient-to-r from-gray-300 to-gray-800 bg-clip-text text-transparent group-hover:text-transparent group-hover:-webkit-text-stroke-[1px] group-hover:-webkit-text-stroke-gray-300">
            EQUILIBRIUM
          </h1>
        </motion.div>

        {/* Sliding Text: "Explore the universe" */}
        <motion.div
          className="absolute top-[42%] left-20 transform -translate-y-1/2 mt-4 cursor-pointer"
          initial={{ x: "-100%" }} // Start completely outside the viewport
          whileInView={{ x: "0%" }} // Slide into the viewport when in view
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.6, // Delay for this text (slightly later)
          }}
          viewport={{ once: true }} // Trigger animation only once
        >
          <h1 className="text-4xl md:text-5xl lg:text-8xl font-black bg-gradient-to-r from-gray-300 to-gray-800 bg-clip-text text-transparent group-hover:text-transparent group-hover:-webkit-text-stroke-[1px] group-hover:-webkit-text-stroke-gray-300">
            MOMENTUM
          </h1>
        </motion.div>

        <motion.div
          className="absolute top-[52%] left-20 transform -translate-y-1/2 mt-4 cursor-pointer"
          initial={{ x: "-100%" }} // Start completely outside the viewport
          whileInView={{ x: "0%" }} // Slide into the viewport when in view
          transition={{
            duration: 1.3,
            ease: "easeOut",
            delay: 1.1, // Delay for this text (slightly later)
          }}
          viewport={{ once: true }} // Trigger animation only once
        >
          <h1 className="text-4xl md:text-5xl lg:text-8xl font-black bg-gradient-to-r from-gray-300 via-[#FA3200] to-gray-800 bg-clip-text text-transparent group-hover:text-transparent group-hover:-webkit-text-stroke-[1px] group-hover:-webkit-text-stroke-gray-300">
            INERTIA
          </h1>
        </motion.div>

        {/* Stars */}
        <div className="absolute top-1/2 mt-20 right-[-60px] transform -translate-y-1/2 pointer-events-none">
          <Image
            src="/flower.jpg" // Replace with the actual path to your image
            alt="Cat Image"
            className="w-[540px] h-auto"
            width={300}
            height={300}
          />
        </div>
      </section>

      {/* Section 3 */}
      <section className="relative h-screen flex items-center justify-center text-white bg-[#100c08]">
        <h1 className="text-4xl font-semibold text-center">
          Start Your Journey Today
        </h1>

        {/* Animated Stars */}
        <div className="absolute top-3/4 bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1/2 pointer-events-none">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute bg-white rounded-full"
              style={{
                width: "1px",
                height: "1px",
                top: `${50 + star.y}%`,
                left: `${50 + star.x}%`,
              }}
              animate={{
                x: [star.x, star.x + Math.random() * 20 - 10],
                y: [star.y, star.y + Math.random() * 20 - 10],
              }}
              transition={{
                duration: 1 + Math.random() * 1,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ThreeSectionPage;
