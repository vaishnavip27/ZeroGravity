"use client";

import Spline from "@splinetool/react-spline";
import Header from "./header";
import { motion } from "framer-motion";

const ThreeSectionPage = () => {
  return (
    <main className="w-full h-screen snap-y snap-mandatory overflow-y-scroll bg-black">
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
        <Spline
          scene="https://prod.spline.design/aDNta5nbpYMXrOQI/scene.splinecode"
          className="absolute inset-0 w-full h-full z-10"
        />
      </section>

      {/* Section 2 */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 text-white">
        <h1 className="text-4xl font-semibold text-center">
          Explore Stunning 3D Visuals
        </h1>
      </section>

      {/* Section 3 */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <h1 className="text-4xl font-semibold text-center">
          Start Your Journey Today
        </h1>
      </section>
    </main>
  );
};

export default ThreeSectionPage;
