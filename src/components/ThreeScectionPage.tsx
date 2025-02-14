"use client";

import Spline from "@splinetool/react-spline";
import Header from "./header";
import { motion } from "framer-motion";
import MyMarquee from "./marquee";
import { useState, useEffect } from "react";

const ThreeSectionPage = () => {
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    setShowSpline(true); // Load Spline only on the client
  }, []);

  return (
    <main className="w-full h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[#100c08]">
      {/* Section 1 with Spline */}
      <section className="h-screen relative snap-proximity">
        {/* Place Header above Spline */}
        <div className="relative z-20">
          <Header />
        </div>

        {/* Overlay Text Behind Spline */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
          <motion.h1
            className="bg-gradient-to-b from-slate-200 to-slate-400 bg-clip-text text-transparent text-7xl md:text-6xl ultra-bold lg:text-9xl font-[900] text-center [text-shadow:_1px_1px_0_rgb(0_0_0_/_20%)]"
            initial={{ y: -100, opacity: 0 }} // Start off-screen at the top and invisible
            animate={{ y: 0, opacity: 1 }} // End in the middle and fully visible
            transition={{ duration: 1, ease: "easeOut" }} // Animation duration and easing
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
      <section className="h-[150vh] flex flex-col justify-center items-center text-white bg-[#100c08]">
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
