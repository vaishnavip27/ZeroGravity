"use client";

import Spline from "@splinetool/react-spline";
import Header from "./header";
import { motion } from "framer-motion";
import MyMarquee from "./marquee";
import { useState, useEffect } from "react";

const ThreeSectionPage = () => {
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    setShowSpline(true); 
  }, []);

  return (
    <main className="w-full h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[#100c08]">
    
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
      <section className="h-[150vh]  text-white bg-[#100c08]">
        <MyMarquee />
      </section>

      {/* Section 3 */}
      <section className="relative h-screen flex items-center justify-center text-white bg-[#100c08]">
        <h1 className="text-4xl font-semibold text-center">
          Start Your Journey Today
        </h1>
      </section>
    </main>
  );
};

export default ThreeSectionPage;
