"use client";

import Spline from "@splinetool/react-spline";
import Header from "./header";
import { motion } from "framer-motion";
import MyMarquee from "./marquee";
import Image from "next/image";
import Footer from "./footer";
import FaqComponent from "./FaqComponent";
import { useInView } from "react-intersection-observer";
import ContactLinks from "./contact-links";
import { useState, useEffect, useCallback } from 'react';
import type { SyntheticEvent } from 'react';

const ThreeSectionPage: React.FC = () => {
  const { ref: splineRef, inView: splineInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [splineKey, setSplineKey] = useState(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000;

  // Function to reset WebGL context
  const resetWebGLContext = useCallback(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.remove();
      const newCanvas = document.createElement('canvas');
      canvas.parentElement?.appendChild(newCanvas);
      
      const gl = newCanvas.getContext('webgl2') || 
                newCanvas.getContext('webgl') || 
                newCanvas.getContext('experimental-webgl');
                
      if (gl) {
        const webGL = gl as WebGLRenderingContext;
        webGL.viewport(0, 0, newCanvas.width, newCanvas.height);
        webGL.clear(webGL.COLOR_BUFFER_BIT | webGL.DEPTH_BUFFER_BIT);
        
        const ext = webGL.getExtension('WEBGL_lose_context');
        if (ext) {
          ext.loseContext();
          setTimeout(() => ext.restoreContext(), 100);
        }
      }
    }
  }, []);

  const retryLoading = useCallback(() => {
    if (retryCount < MAX_RETRIES) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setIsLoading(true);
        setHasError(false);
        resetWebGLContext();
        setSplineKey(prev => prev + 1);
      }, RETRY_DELAY);
    }
  }, [retryCount, resetWebGLContext]);

  // Initialize WebGL context
  useEffect(() => {
    resetWebGLContext();
    
    const handleContextLoss = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost');
      setHasError(true);
      retryLoading();
    };

    const canvas = document.querySelector('canvas');
    canvas?.addEventListener('webglcontextlost', handleContextLoss);
    
    return () => {
      canvas?.removeEventListener('webglcontextlost', handleContextLoss);
    };
  }, [resetWebGLContext, retryLoading]);

  const handleSplineLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    setRetryCount(0);
  }, []);

  const handleSplineError = useCallback((event: SyntheticEvent<HTMLDivElement, Event>) => {
    console.error('Spline loading error:', event);
    setHasError(true);
    setIsLoading(false);
    retryLoading();
  }, [retryLoading]);

  const SplineErrorFallback = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
      <div className="text-center text-white">
        <h2 className="text-xl mb-4">Unable to load 3D scene</h2>
        {retryCount < MAX_RETRIES ? (
          <div>
            <p>Retrying... ({retryCount + 1}/{MAX_RETRIES})</p>
            <p className="text-sm mt-2">If issues persist, try using a different browser or updating your graphics drivers.</p>
          </div>
        ) : (
          <div>
            <p>Unable to load 3D content</p>
            <button 
              onClick={() => {
                setRetryCount(0);
                retryLoading();
              }}
              className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  );

  const checkWebGLSupport = () => {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  };

  if (typeof window !== 'undefined' && !checkWebGLSupport()) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center p-4">
          <h2 className="text-xl mb-4">WebGL Not Supported</h2>
          <p>Your browser or device does support WebGL, which is required for 3D content.</p>
          <p className="mt-2">Try using a modern browser or updating your graphics drivers.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[#100c08]">
      {/* Section 1 */}
      <section ref={splineRef} className="h-screen relative snap-proximity">
        <div className="relative z-20">
          <Header />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.h1
            className="bg-gradient-to-b from-slate-200 to-slate-700 bg-clip-text text-transparent text-7xl md:text-6xl ultra-bold lg:text-9xl font-[900] text-center [text-shadow:_1px_1px_0_rgb(0_0_0_/_20%)]"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            ZERO GRAVITY
          </motion.h1>
        </div>

        {/* Spline Scene */}
        {isLoading && splineInView && <LoadingSpinner />}
        {hasError && splineInView && <SplineErrorFallback />}
        {splineInView && (!hasError || isLoading) && (
          <Spline
            key={splineKey}
            scene="https://prod.spline.design/aDNta5nbpYMXrOQI/scene.splinecode"
            className="absolute inset-0 w-full h-full z-10"
            onLoad={handleSplineLoad}
            onError={handleSplineError}
          />
        )}
      </section>

      {/* Section 2 */}
      <section className="h-[150vh] text-white bg-[#100c08] relative overflow-hidden group">
        <MyMarquee />

        <div className="mt-12">
          <motion.div
            className="absolute top-2/4 left-20 transform -translate-y-1/2 cursor-pointer"
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: 0.1,
            }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-8xl font-black bg-gradient-to-r from-gray-300 to-gray-800 bg-clip-text text-transparent group-hover:text-transparent group-hover:-webkit-text-stroke-[1px] group-hover:-webkit-text-stroke-gray-300">
              EQUILIBRIUM
            </h1>
          </motion.div>

          <motion.div
            className="absolute top-[58%] left-20 transform -translate-y-1/2 mt-4 cursor-pointer"
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.3,
            }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-8xl font-black bg-gradient-to-r from-gray-300 to-gray-800 bg-clip-text text-transparent group-hover:text-transparent group-hover:-webkit-text-stroke-[1px] group-hover:-webkit-text-stroke-gray-300">
              MOMENTUM
            </h1>
          </motion.div>

          <motion.div
            className="absolute top-[67%] left-20 transform -translate-y-1/2 mt-4 cursor-pointer"
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            transition={{
              duration: 1.3,
              ease: "easeOut",
              delay: 0.5,
            }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-8xl font-black bg-gradient-to-r from-gray-300 via-[#FA3200] to-gray-800 bg-clip-text text-transparent group-hover:text-transparent group-hover:-webkit-text-stroke-[1px] group-hover:-webkit-text-stroke-gray-300">
              INERTIA
            </h1>
          </motion.div>

          <motion.div
            className="absolute top-1/2 right-0 transform -translate-y-1/2 pointer-events-none"
            initial={{ x: "100%" }}
            whileInView={{ x: "60px" }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: 1.4,
            }}
            viewport={{ once: true }}
          >
            <Image
              src="/flower.jpg"
              alt="Cat Image"
              className="w-[490px] h-auto"
              width={200}
              height={300}
            />
          </motion.div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="relative h-screen flex items-center justify-center text-white bg-[#100c08] px-20">
        <FaqComponent />
      </section>

      {/* Contact Section */}
      <section>
        <div className="px-20">
          <h1 className="text-5xl font-bold text-slate-300 mb-6">Contact</h1>
          <ContactLinks/>
        </div>
      </section>

      {/* Footer Section */}
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default ThreeSectionPage;