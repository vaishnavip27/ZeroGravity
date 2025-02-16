"use client";

import Spline from "@splinetool/react-spline";
import Header from "./header";
import { motion } from "framer-motion";
import MyMarquee from "./marquee";
import HeroSection from "./HeroSection";
import Footer from "./footer";
import FaqComponent from "./FaqComponent";
import { useInView } from "react-intersection-observer";
import ContactLinks from "./contact-links";
import { useState, useEffect, useCallback, useRef } from "react";
import type { SyntheticEvent } from "react";

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

  const section1Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const section4Ref = useRef<HTMLElement>(null);

  const handleScrollTo = (section: "section1" | "section3" | "section4") => {
    let ref = null;
    if (section === "section1") ref = section1Ref;
    if (section === "section3") ref = section3Ref;
    if (section === "section4") ref = section4Ref;

    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetWebGLContext = useCallback(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.remove();
      const newCanvas = document.createElement("canvas");
      canvas.parentElement?.appendChild(newCanvas);

      const gl =
        newCanvas.getContext("webgl2") ||
        newCanvas.getContext("webgl") ||
        newCanvas.getContext("experimental-webgl");

      if (gl) {
        const webGL = gl as WebGLRenderingContext;
        webGL.viewport(0, 0, newCanvas.width, newCanvas.height);
        webGL.clear(webGL.COLOR_BUFFER_BIT | webGL.DEPTH_BUFFER_BIT);

        const ext = webGL.getExtension("WEBGL_lose_context");
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
        setRetryCount((prev) => prev + 1);
        setIsLoading(true);
        setHasError(false);
        resetWebGLContext();
        setSplineKey((prev) => prev + 1);
      }, RETRY_DELAY);
    }
  }, [retryCount, resetWebGLContext]);

  useEffect(() => {
    resetWebGLContext();

    const handleContextLoss = (e: Event) => {
      e.preventDefault();
      console.warn("WebGL context lost");
      setHasError(true);
      retryLoading();
    };

    const canvas = document.querySelector("canvas");
    canvas?.addEventListener("webglcontextlost", handleContextLoss);

    return () => {
      canvas?.removeEventListener("webglcontextlost", handleContextLoss);
    };
  }, [resetWebGLContext, retryLoading]);

  const handleSplineLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    setRetryCount(0);
  }, []);

  const handleSplineError = useCallback(
    (event: SyntheticEvent<HTMLDivElement, Event>) => {
      console.error("Spline loading error:", event);
      setHasError(true);
      setIsLoading(false);
      retryLoading();
    },
    [retryLoading]
  );

  const SplineErrorFallback = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
      <div className="text-center text-white">
        <h2 className="text-xl mb-4">Unable to load 3D scene</h2>
        {retryCount < MAX_RETRIES ? (
          <div>
            <p>
              Retrying... ({retryCount + 1}/{MAX_RETRIES})
            </p>
            <p className="text-sm mt-2">
              If issues persist, try using a different browser or updating your
              graphics drivers.
            </p>
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
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"))
    );
  };

  if (typeof window !== "undefined" && !checkWebGLSupport()) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center p-4">
          <h2 className="text-xl mb-4">WebGL Not Supported</h2>
          <p>
            Your browser or device does support WebGL, which is required for 3D
            content.
          </p>
          <p className="mt-2">
            Try using a modern browser or updating your graphics drivers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[#100c08] ">
      {/* Section 1 */}
      <section ref={splineRef} className="h-screen relative snap-proximity">
        <div className="relative z-20">
          <Header onNavClick={handleScrollTo} />
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
        <HeroSection />
      </section>

      {/* Section 3 */}
      <section
        className="relative h-screen flex items-center justify-center text-white bg-[#100c08] px-20 "
        ref={section3Ref}
      >
        <FaqComponent />
      </section>

      {/* Contact Section */}
      <section ref={section4Ref}>
        <div className="px-20 py-6">
          <h1 className="text-5xl font-bold text-slate-300 mb-6">Contact</h1>
          <ContactLinks />
        </div>
      </section>

      {/* Footer Section */}
      <section className="relative h-[206px] flex items-center justify-center ">
        <Footer />
      </section>
    </main>
  );
};

export default ThreeSectionPage;
